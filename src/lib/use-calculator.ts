import {
	markChartsFresh,
	markChartsStale,
	synchronizeChartExports,
} from "./chart-state";
import { useEffect, useRef, useState } from "react";
import { useRouterState } from "@tanstack/react-router";
import { parseInput } from "./si";
import { createScope, type Controller, type Factory } from "./controller";
import { registerCalculatorState } from "./calculator-state";
import { restoreOfflineResume } from "./offline-resume";
function calculationContext(root: HTMLElement, target: HTMLElement) {
	const group = target.closest<HTMLElement>(".input-numbers");
	if (
		group?.querySelector(
			'[data-action^="calculate"],[data-ec-function^="calculate"]',
		)
	)
		return group;
	return target.closest<HTMLElement>(".dropdown-content") ?? root;
}
function clearOutput(output: HTMLElement) {
	output.replaceChildren();
	if (output.getAttribute("role") === "alert") output.removeAttribute("role");
}
function clearValidation(root: HTMLElement) {
	root.querySelectorAll<HTMLElement>("[data-input-error]").forEach((error) => {
		root
			.querySelectorAll<HTMLElement>("[aria-describedby]")
			.forEach((input) => {
				const ids = (input.getAttribute("aria-describedby") ?? "")
					.split(/\s+/)
					.filter((id) => id && id !== error.id);
				if (ids.length) input.setAttribute("aria-describedby", ids.join(" "));
				else input.removeAttribute("aria-describedby");
			});
		error.remove();
	});
	root
		.querySelectorAll("[aria-invalid]")
		.forEach((input) => input.removeAttribute("aria-invalid"));
}
function synchronizeDisclosures(root: HTMLElement) {
	root
		.querySelectorAll<HTMLElement>('[data-target],[data-action="selectOPV"]')
		.forEach((button) => {
			button.setAttribute(
				"aria-pressed",
				String(button.classList.contains("selected")),
			);
			const target = button.dataset.target;
			if (target) button.setAttribute("aria-controls", target);
		});
	root.querySelectorAll<HTMLElement>(".dropdown-select").forEach((button) => {
		const next = button.nextElementSibling;
		const list =
			next instanceof HTMLElement && next.matches(".dropdown-content")
				? next
				: button.parentElement?.querySelector<HTMLElement>(".dropdown-content");
		if (list) {
			button.setAttribute("aria-controls", list.id);
			button.setAttribute(
				"aria-expanded",
				String(list.style.display === "block"),
			);
		}
	});
	root.querySelectorAll<HTMLElement>(".dropdown").forEach((panel, index) => {
		const button = panel.querySelector<HTMLElement>(
				":scope > .dropdown-header",
			),
			content = panel.querySelector<HTMLElement>(":scope > .dropdown-content");
		if (!button || !content) return;
		content.id ||= `calculator-panel-${index}`;
		button.setAttribute("aria-controls", content.id);
		button.setAttribute(
			"aria-expanded",
			String(panel.classList.contains("open")),
		);
	});
}
export function useCalculator(factory: Factory) {
	const [ready, setReady] = useState(false);
	const [loadedNoteKey, setLoadedNoteKey] = useState<string | null>(null);
	const root = useRef<HTMLDivElement>(null),
		controller = useRef<Controller | null>(null);
	const location = useRouterState({
		select: (s) => ({
			path: s.location.pathname,
			search: s.location.searchStr,
		}),
	});
	const requestedNote = new URLSearchParams(location.search).get("notiz");
	const noteKey = location.path + "?notiz=" + (requestedNote ?? "");
	const restoring = ready && !!requestedNote && loadedNoteKey !== noteKey;
	useEffect(() => {
		const element = root.current;
		if (!element) return;
		const scope = createScope(element);
		let unregister: (() => void) | undefined;
		function report(
			context: HTMLElement,
			message: string,
			input?: HTMLInputElement,
		) {
			const notice = document.createElement("p");
			notice.dataset.inputError = "true";
			notice.className = "input-error";
			notice.setAttribute("role", "alert");
			notice.id = `${input?.id ?? "calculation"}-validation`;
			notice.textContent = message;
			if (input) {
				input.insertAdjacentElement("afterend", notice);
				input.setAttribute("aria-invalid", "true");
				const ids = new Set(
					(input.getAttribute("aria-describedby") ?? "")
						.split(/\s+/)
						.filter(Boolean),
				);
				ids.add(notice.id);
				input.setAttribute("aria-describedby", Array.from(ids).join(" "));
				input.focus();
			} else context.appendChild(notice);
		}
		try {
			const active = factory(scope);
			controller.current = active;
			active.invoke = (name, target, ...args) => {
				const fn = active.handlers[name];
				if (!fn) return;
				const context = calculationContext(element, target);
				clearValidation(context);
				if (/^calculate/.test(name)) {
					const fields = Array.from(
						context.querySelectorAll<HTMLInputElement>(
							"input[type=text],input[type=number]",
						),
					).filter(
						(input) =>
							!input.readOnly &&
							input.offsetParent !== null &&
							input.value.trim(),
					);
					const invalid = fields.find(
						(input) =>
							!Number.isFinite(parseInput(input.value)) ||
							(/^r/i.test(input.id) &&
								input.id !== "R_AC" &&
								parseInput(input.value) <= 0),
					);
					if (invalid) {
						context
							.querySelectorAll<HTMLElement>("[id^=result]")
							.forEach((output) => clearOutput(output));
						report(
							context,
							`${invalid.getAttribute("aria-label") || invalid.id}: Bitte einen gültigen${/^r/i.test(invalid.id) ? " positiven" : ""} Zahlenwert eingeben. SI-Präfixe wie k, m und µ sind erlaubt.`,
							invalid,
						);
						return;
					}
				}
				try {
					const value = fn(...args);
					if (/^calculate/.test(name)) {
						const bad = Array.from(
							context.querySelectorAll<HTMLElement>("[id^=result]"),
						).filter((output) =>
							/\b(?:NaN|Infinity)\b/.test(output.textContent ?? ""),
						);
						if (bad.length) {
							bad.forEach((output) => clearOutput(output));
							report(
								context,
								"Diese Werte ergeben kein endliches reelles Ergebnis. Prüfe die Eingaben und die Voraussetzungen der Schaltung.",
							);
						}
					}
					if (/^(?:reset|clear)/i.test(name)) {
						clearValidation(context);
						markChartsFresh(context);
						context
							.querySelectorAll<HTMLCanvasElement>("canvas[id]")
							.forEach((canvas) =>
								canvas
									.getContext("2d")
									?.clearRect(0, 0, canvas.width, canvas.height),
							);
					}
					if (
						/^(calculate|fillExample|showExample)/.test(name) &&
						!context.querySelector('[role="alert"]') &&
						(context.querySelector("[data-result-value]") ||
							context.querySelector('canvas[data-phasor-example="true"]'))
					)
						markChartsFresh(context);
					synchronizeChartExports(context);
					synchronizeDisclosures(element);
					return value;
				} catch (error) {
					report(
						context,
						error instanceof Error
							? error.message
							: "Die Berechnung konnte nicht ausgeführt werden. Bitte Eingaben prüfen.",
					);
				}
			};
			if (active.captureState && active.restoreState)
				unregister = registerCalculatorState(element, {
					captureState: () => active.captureState!(),
					restoreState: (s) => active.restoreState!(s),
				});
			scope.listen(element, "click", ((event: Event) => {
				const target = (event.target as Element).closest<HTMLElement>(
					"[data-ec-function]",
				);
				if (target)
					active.invoke?.(
						target.dataset.ecFunction!,
						target,
						target.dataset.ecArg,
					);
			}) as EventListener);
			scope.listen(
				element,
				"input",
				((event: Event) => {
					const input = event.target;
					if (
						!(input instanceof HTMLInputElement) ||
						!["text", "number"].includes(input.type) ||
						input.readOnly
					)
						return;
					const context = calculationContext(element, input);
					markChartsStale(context);
					clearValidation(context);
					context
						.querySelectorAll<HTMLElement>("[id^=result]")
						.forEach((output) => clearOutput(output));
				}) as EventListener,
				true,
			);
			scope.listen(
				element,
				"click",
				(() => {
					scope.setTimeout(() => {
						if (element.isConnected) synchronizeDisclosures(element);
					});
				}) as EventListener,
				true,
			);
			scope.listen(element, "keydown", ((event: KeyboardEvent) => {
				if (event.key !== "Escape") return;
				const buttons = Array.from(
					element.querySelectorAll<HTMLElement>(
						'.dropdown-select[aria-expanded="true"]',
					),
				);
				if (!buttons.length) return;
				const focused =
					buttons.find((button) =>
						button.parentElement?.contains(event.target as Node),
					) ?? buttons[0];
				for (const button of buttons) {
					const list = element.querySelector<HTMLElement>(
						"#" + CSS.escape(button.getAttribute("aria-controls") ?? ""),
					);
					if (list) list.style.display = "none";
				}
				event.preventDefault();
				synchronizeDisclosures(element);
				focused.focus();
			}) as EventListener);
			scope.runReady();
			synchronizeDisclosures(element);
			setReady(true);
		} catch (error) {
			scope.dispose();
			unregister?.();
			controller.current?.dispose?.();
			controller.current = null;
			throw error;
		}
		return () => {
			unregister?.();
			scope.dispose();
			controller.current?.dispose?.();
			controller.current = null;
		};
	}, [factory]);
	useEffect(() => {
		const element = root.current;
		if (!element || !controller.current || !ready) return;
		synchronizeChartExports(element);
		element
			.querySelectorAll("[data-notebook-error],[data-notebook-warning]")
			.forEach((node) => node.remove());
		let cancelled = false;
		if (restoreOfflineResume(element)) {
			setLoadedNoteKey(noteKey);
			synchronizeDisclosures(element);
			return;
		}
		const id = new URLSearchParams(location.search).get("notiz");
		if (!id) return;
		void import("./notebook")
			.then(async ({ getEntry, restore }) => {
				const entry = await getEntry(id);
				if (cancelled || !element.isConnected) return;
				if (!entry || entry.route !== location.path.replace(/\/+$/, ""))
					throw Error(
						"Der gespeicherte Versuch wurde nicht gefunden oder gehört zu einem anderen Rechner.",
					);
				restore(element, entry.snapshot);
				if (!entry.snapshot.controller && controller.current?.captureState) {
					const notice = document.createElement("p");
					notice.dataset.notebookWarning = "true";
					notice.className = "comment";
					notice.setAttribute("role", "status");
					notice.textContent =
						"Dieser ältere Versuch enthält keine gespeicherten Einheiten- oder Simulationseinstellungen. Bitte prüfe diese vor der Berechnung.";
					element.prepend(notice);
				}
				synchronizeDisclosures(element);
			})
			.catch((error) => {
				if (cancelled || !element.isConnected) return;
				const notice = document.createElement("p");
				notice.setAttribute("role", "alert");
				notice.dataset.inputError = "true";
				notice.className = "input-error";
				notice.dataset.notebookError = "true";
				notice.textContent =
					error instanceof Error
						? error.message
						: "Gespeicherte Eingaben konnten nicht geladen werden.";
				element.prepend(notice);
			})
			.finally(() => {
				if (!cancelled && element.isConnected) setLoadedNoteKey(noteKey);
			});
		return () => {
			cancelled = true;
		};
	}, [factory, ready, location.path, location.search]);
	return {
		restoring,
		ready,
		root,
		get current() {
			return controller.current;
		},
	};
}
