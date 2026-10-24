import { z } from "zod";
import { catalog } from "./catalog";
import type { FormSnapshot } from "../db/schema";
export const snapshotSchema = z
	.object({
		values: z.record(
			z.string().max(150),
			z.union([z.string().max(1000), z.boolean()]),
		),
		selected: z.array(z.string().max(150)).max(100),
		open: z.array(z.string().max(150)).max(100),
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
	const [{ getDatabase }, { notebook }, { desc, eq, isNull }] =
		await Promise.all([
			import("../db/client"),
			import("../db/schema"),
			import("drizzle-orm"),
		]);
	return { db: await getDatabase(), notebook, desc, eq, isNull };
}
export async function listEntries() {
	const { db, notebook, desc, isNull } = await storage();
	return db
		.select()
		.from(notebook)
		.where(isNull(notebook.deletedAt))
		.orderBy(desc(notebook.createdAt));
}
export async function saveEntry(value: z.input<typeof entrySchema>) {
	const data = entrySchema.parse(value);
	const { db, notebook } = await storage();
	const id = crypto.randomUUID();
	await db.insert(notebook).values({ id, ...data });
	return id;
}
export async function removeEntry(id: string, restore = false) {
	z.string().uuid().parse(id);
	const { db, notebook, eq } = await storage();
	await db
		.update(notebook)
		.set({ deletedAt: restore ? null : new Date() })
		.where(eq(notebook.id, id));
}
export async function getEntry(id: string) {
	z.string().uuid().parse(id);
	const { db, notebook, eq } = await storage();
	const [row] = await db
		.select()
		.from(notebook)
		.where(eq(notebook.id, id))
		.limit(1);
	return row && !row.deletedAt ? row : null;
}
export function capture(root: HTMLElement): FormSnapshot {
	const values: Record<string, string | boolean> = {};
	root
		.querySelectorAll<
			HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
		>("input[id],select[id],textarea[id]")
		.forEach((el) => {
			if (
				el instanceof HTMLInputElement &&
				["button", "submit", "file"].includes(el.type)
			)
				return;
			values[el.id] =
				el instanceof HTMLInputElement &&
				["checkbox", "radio"].includes(el.type)
					? el.checked
					: el.value;
		});
	return snapshotSchema.parse({
		values,
		selected: Array.from(
			root.querySelectorAll(".selected[id],.schaltung-aktiv[id]"),
		).map((e) => e.id),
		open: Array.from(root.querySelectorAll(".dropdown")).flatMap((el, index) =>
			el.classList.contains("open") ? [el.id || String(index)] : [],
		),
	});
}
export function restore(root: HTMLElement, snapshot: FormSnapshot) {
	const values = snapshotSchema.parse(snapshot);
	for (const id of values.selected) {
		const el = root.querySelector<HTMLElement>("#" + CSS.escape(id));
		if (el && !el.classList.contains("selected")) el.click();
	}
	for (const [id, value] of Object.entries(values.values)) {
		const el = root.querySelector<
			HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
		>("#" + CSS.escape(id));
		if (!el) continue;
		if (typeof value === "boolean" && el instanceof HTMLInputElement) {
			if (el.checked !== value) el.click();
		} else el.value = String(value);
		el.dispatchEvent(new Event("input", { bubbles: true }));
		el.dispatchEvent(new Event("change", { bubbles: true }));
	}
	root
		.querySelectorAll(".dropdown")
		.forEach((el, index) =>
			el.classList.toggle("open", values.open.includes(el.id || String(index))),
		);
}
