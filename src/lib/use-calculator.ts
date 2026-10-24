import { useEffect, useRef } from "react";
import { parseInput } from "./si";
import { createScope, type Controller, type Factory } from "./controller";
export function useCalculator(factory: Factory) {
	const root = useRef<HTMLDivElement>(null);
	const controller = useRef<Controller | null>(null);
	useEffect(() => {
		const element = root.current;
		if (!element) return;
		const scope = createScope(element);
		try {
			controller.current = factory(scope);
			for (const [name, handler] of Object.entries(
				controller.current.handlers,
			)) {
				if (!/^calculate/.test(name)) continue;
				controller.current.handlers[name] = (...args: unknown[]) => {
					element.querySelector("[data-input-error]")?.remove();
					const fields = Array.from(
						element.querySelectorAll<HTMLInputElement>(
							"input[type=text],input[type=number]",
						),
					).filter(
						(input) => input.offsetParent !== null && input.value.trim(),
					);
					const invalid = fields.find(
						(input) =>
							!Number.isFinite(parseInput(input.value)) ||
							(/^R/.test(input.id) && parseInput(input.value) <= 0),
					);
					if (invalid) {
						const notice = document.createElement("p");
						notice.dataset.inputError = "true";
						notice.className = "input-error";
						notice.setAttribute("role", "alert");
						notice.textContent = `${invalid.getAttribute("aria-label") || invalid.id}: Bitte einen gültigen${/^R/.test(invalid.id) ? " positiven" : ""} Zahlenwert eingeben. SI-Präfixe wie k, m und µ sind erlaubt.`;
						invalid.insertAdjacentElement("afterend", notice);
						invalid.setAttribute("aria-invalid", "true");
						invalid.focus();
						return;
					}
					fields.forEach((input) => input.removeAttribute("aria-invalid"));
					return handler(...args);
				};
			}
			scope.listen(element, "click", ((event: Event) => {
				const target = (event.target as Element).closest<HTMLElement>(
					"[data-ec-function]",
				);
				if (!target) return;
				const name = target.dataset.ecFunction!;
				const fn = controller.current?.handlers[name];
				if (fn) fn(target.dataset.ecArg);
			}) as EventListener);
			scope.runReady();
			element.dataset.ready = "true";
			const id = new URLSearchParams(window.location.search).get("notiz");
			if (id)
				void import("./notebook")
					.then(async ({ getEntry, restore }) => {
						const entry = await getEntry(id);
						if (
							entry &&
							entry.route === window.location.pathname.replace(/\/+$/, "") &&
							element.isConnected
						)
							restore(element, entry.snapshot);
					})
					.catch((error) =>
						console.error("Notiz konnte nicht geladen werden.", error),
					);
		} catch (error) {
			scope.dispose();
			throw error;
		}
		return () => {
			scope.dispose();
			controller.current?.dispose?.();
			controller.current = null;
		};
	}, [factory]);
	return {
		root,
		get current() {
			return controller.current;
		},
	};
}
