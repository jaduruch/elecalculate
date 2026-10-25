import { z } from "zod";
import { NotebookUnavailableError } from "../db/errors";
import { catalog } from "./catalog";
import type { FormSnapshot } from "../db/schema";
import {
	captureControllerState,
	restoreControllerState,
} from "./calculator-state";
export const snapshotSchema = z
	.object({
		values: z.record(
			z.string().max(150),
			z.union([z.string().max(1000), z.boolean()]),
		),
		selected: z.array(z.string().max(150)).max(100),
		open: z.array(z.string().max(150)).max(100),
		active: z.array(z.string().max(150)).max(100).optional(),
		controller: z
			.object({
				kind: z.string().max(100),
				values: z
					.record(
						z.string().max(100),
						z.union([z.number().finite(), z.boolean()]),
					)
					.refine((values) => Object.keys(values).length <= 32),
			})
			.optional(),
	})
	.refine((s) => Object.keys(s.values).length <= 400);
export const routeSchema = z
	.string()
	.transform((route) => route.replace(/\/+$/, ""))
	.refine(
		(route) => catalog.some((p) => "/" + p.file.replace(".html", "") === route),
		"Unbekannter Rechner",
	);
export const entrySchema = z.object({
	title: z
		.string()
		.trim()
		.min(1, "Bitte einen Namen eingeben.")
		.max(80, "Maximal 80 Zeichen."),
	note: z.string().max(500),
	route: routeSchema,
	snapshot: snapshotSchema,
});
async function storage() {
	const [{ getDatabase }, { notebook }, { desc, eq, isNull, isNotNull }] =
		await Promise.all([
			import("../db/client"),
			import("../db/schema"),
			import("drizzle-orm"),
		]);
	return { db: await getDatabase(), notebook, desc, eq, isNull, isNotNull };
}
export async function listEntries(removed = false) {
	const { db, notebook, desc, isNull, isNotNull } = await storage();
	return db
		.select()
		.from(notebook)
		.where(removed ? isNotNull(notebook.deletedAt) : isNull(notebook.deletedAt))
		.orderBy(
			removed ? desc(notebook.deletedAt) : desc(notebook.createdAt),
			desc(notebook.id),
		);
}
export async function saveEntry(value: z.input<typeof entrySchema>) {
	const data = entrySchema.parse(value);
	const { db, notebook } = await storage();
	const id = crypto.randomUUID();
	await db.insert(notebook).values({ id, ...data });
	publishNotebookChange();
	return id;
}
export async function removeEntry(id: string, restore = false) {
	z.string().uuid().parse(id);
	const { db, notebook, eq } = await storage();
	await db
		.update(notebook)
		.set({ deletedAt: restore ? null : new Date() })
		.where(eq(notebook.id, id));
	publishNotebookChange();
}
export async function getEntry(id: string) {
	if (!z.string().max(100).uuid().safeParse(id).success)
		throw Error("Der Notizbuch-Link enthält keine gültige Kennung.");
	const { db, notebook, eq } = await storage();
	const [row] = await db
		.select()
		.from(notebook)
		.where(eq(notebook.id, id))
		.limit(1);
	return row && !row.deletedAt ? row : null;
}
const changeListeners = new Set<() => void>();
let changeChannel: BroadcastChannel | undefined;
function channel() {
	if (typeof window === "undefined" || typeof BroadcastChannel === "undefined")
		return;
	if (!changeChannel) {
		try {
			changeChannel = new BroadcastChannel("elecalculate.notebook.changes.v1");
		} catch {
			return;
		}
		changeChannel.onmessage = (event) => {
			if (event.data === "changed")
				for (const listener of changeListeners) listener();
		};
	}
	return changeChannel;
}
function publishNotebookChange() {
	for (const listener of changeListeners) listener();
	if (channel()) channel()!.postMessage("changed");
	else if (typeof window !== "undefined")
		try {
			localStorage.setItem(
				"elecalculate.notebook.changed",
				crypto.randomUUID(),
			);
		} catch {
			/* Storage notifications are optional; the database write already succeeded. */
		}
}
/** Notify Query clients only after a committed database mutation, including other tabs. */
export function subscribeNotebookChanges(listener: () => void) {
	changeListeners.add(listener);
	channel();
	const storageChanged = (event: StorageEvent) => {
		if (event.key === "elecalculate.notebook.changed") listener();
	};
	if (typeof window !== "undefined")
		window.addEventListener("storage", storageChanged);
	return () => {
		changeListeners.delete(listener);
		if (typeof window !== "undefined")
			window.removeEventListener("storage", storageChanged);
	};
}
export class CaptureUnavailableError extends Error {}
export class SnapshotRestoreError extends Error {
	constructor(readonly rolledBack: boolean) {
		super(
			rolledBack
				? "Die gespeicherten Eingaben konnten nicht geladen werden. Der bisherige Versuch bleibt erhalten."
				: "Die gespeicherten Eingaben konnten nicht vollständig geladen werden. Bitte die Schaltung neu öffnen und die Eingaben prüfen.",
		);
	}
}
export function notebookError(error: unknown): string {
	if (
		error instanceof CaptureUnavailableError ||
		error instanceof SnapshotRestoreError ||
		error instanceof NotebookUnavailableError
	)
		return error.message;
	if (error instanceof z.ZodError)
		return error.issues[0]?.message ?? "Die Eingaben sind ungültig.";
	return "Das lokale Notizbuch konnte nicht gespeichert oder geöffnet werden. Bitte erneut versuchen. Deine Eingaben bleiben erhalten.";
}
export function capture(root: HTMLElement): FormSnapshot {
	if (
		root.matches('[aria-busy="true"]') ||
		root.querySelector('[aria-busy="true"]')
	)
		throw new CaptureUnavailableError(
			"Bitte die laufende Simulation kurz abwarten und danach erneut speichern oder aktualisieren.",
		);
	const values: Record<string, string | boolean> = {};
	root
		.querySelectorAll<
			HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
		>("input[id],select[id],textarea[id]")
		.forEach((el) => {
			if (
				el instanceof HTMLInputElement &&
				(["button", "submit", "file"].includes(el.type) || el.readOnly)
			)
				return;
			if (Object.hasOwn(values, el.id))
				throw new CaptureUnavailableError(
					"Mehrdeutige Eingabefelder können nicht verlustfrei gespeichert werden.",
				);
			values[el.id] =
				el instanceof HTMLInputElement &&
				["checkbox", "radio"].includes(el.type)
					? el.checked
					: el.value;
		});
	return snapshotSchema.parse({
		values,
		controller: captureControllerState(root),
		selected: Array.from(
			root.querySelectorAll<HTMLElement>("button.selected[id]"),
		).map((el) => el.id),
		active: Array.from(
			root.querySelectorAll<HTMLElement>("button.active[id][data-action]"),
		).map((el) => el.id),
		open: Array.from(root.querySelectorAll(".dropdown")).flatMap((el, index) =>
			el.classList.contains("open") ? [el.id || String(index)] : [],
		),
	});
}
export function restore(root: HTMLElement, snapshot: FormSnapshot) {
	let saved: FormSnapshot;
	try {
		saved = snapshotSchema.parse(snapshot);
	} catch {
		throw new SnapshotRestoreError(true);
	}
	// Capture can reject a currently running simulation before any fields change.
	const prior = capture(root);
	const outputs = Array.from(
		root.querySelectorAll<HTMLElement>('[id^="result"],.results'),
	).map((element) => ({
		element,
		id: element.id,
		copy: element.cloneNode(true) as HTMLElement,
	}));
	try {
		applySnapshot(root, saved);
	} catch {
		try {
			applySnapshot(root, prior);
			for (const output of outputs) {
				const target = output.id
					? root.querySelector<HTMLElement>("#" + CSS.escape(output.id))
					: output.element.isConnected
						? output.element
						: null;
				if (!target) continue;
				for (const attribute of Array.from(target.attributes))
					if (!output.copy.hasAttribute(attribute.name))
						target.removeAttribute(attribute.name);
				for (const attribute of Array.from(output.copy.attributes))
					target.setAttribute(attribute.name, attribute.value);
				target.replaceChildren(...Array.from(output.copy.childNodes));
			}
		} catch {
			throw new SnapshotRestoreError(false);
		}
		throw new SnapshotRestoreError(true);
	}
}
function applySnapshot(root: HTMLElement, saved: FormSnapshot) {
	// Reset old selectors first. These handlers may create or remove their own fields.
	const choices = Array.from(
		root.querySelectorAll<HTMLElement>(
			"button[data-target][id],button[data-action=selectOPV][id],button.opv-button[id],button.filter-button[id]",
		),
	);
	for (const choice of choices)
		if (
			choice.classList.contains("selected") &&
			!saved.selected.includes(choice.id)
		)
			choice.click();
	for (const id of saved.selected) {
		const choice = choices.find((el) => el.id === id);
		if (choice && !choice.classList.contains("selected")) choice.click();
	}
	for (const [id, value] of Object.entries(saved.values)) {
		const field = root.querySelector<
			HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
		>("#" + CSS.escape(id));
		if (!field || (field instanceof HTMLInputElement && field.readOnly))
			continue;
		if (typeof value === "boolean" && field instanceof HTMLInputElement) {
			if (field.type === "radio" && !value) field.checked = false;
			else if (field.checked !== value) field.click();
			continue;
		} else if (field instanceof HTMLInputElement && field.type === "hidden") {
			const dropdown = root.querySelector<HTMLElement>(
				"#" + CSS.escape(id + "Dropdown"),
			);
			const option = Array.from(
				dropdown?.querySelectorAll<HTMLElement>("[data-value]") ?? [],
			).find((el) => el.dataset.value === String(value));
			if (option) option.click();
			else field.value = String(value);
		} else field.value = String(value);
		field.dispatchEvent(new Event("input", { bubbles: true }));
		field.dispatchEvent(new Event("change", { bubbles: true }));
	}
	// Older snapshots did not encode toggle buttons. Their absence must not
	// reset a currently chosen neutral/symmetry setting accidentally.
	if (saved.active)
		for (const button of root.querySelectorAll<HTMLElement>(
			"button[id][data-action]",
		)) {
			const wanted = saved.active.includes(button.id);
			if (
				(button.classList.contains("active") || wanted) &&
				button.classList.contains("active") !== wanted
			)
				button.click();
		}
	if (saved.controller) restoreControllerState(root, saved.controller);
	root
		.querySelectorAll(".dropdown")
		.forEach((el, index) =>
			el.classList.toggle("open", saved.open.includes(el.id || String(index))),
		);
}
