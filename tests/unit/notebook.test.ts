import { expect, test } from "bun:test";
import {
	entrySchema,
	snapshotSchema,
	notebookError,
} from "../../src/lib/notebook";
const original = { values: { R: "1k", U: "12" }, selected: [], open: ["0"] };
test("old notebook snapshots remain readable", () => {
	expect(snapshotSchema.parse(original)).toEqual(original);
});
test("controller snapshots accept finite simulation values only", () => {
	expect(
		snapshotSchema.safeParse({
			...original,
			controller: { kind: "qubit", values: { theta: Math.PI, phi: 0 } },
		}).success,
	).toBe(true);
	for (const invalid of [Infinity, NaN])
		expect(
			snapshotSchema.safeParse({
				...original,
				controller: { kind: "qubit", values: { theta: invalid } },
			}).success,
		).toBe(false);
});
test("controller snapshots reject unbounded records", () => {
	expect(
		snapshotSchema.safeParse({
			...original,
			controller: {
				kind: "test",
				values: Object.fromEntries(
					Array.from({ length: 33 }, (_, i) => ["n" + i, i]),
				),
			},
		}).success,
	).toBe(false);
});
test("notebook canonicalizes known trailing-slash routes and rejects external URLs", () => {
	const data = {
		title: "  Circuit  ",
		note: "",
		route: "/Elektrotechnik/Gleichstrom/",
		snapshot: original,
	};
	expect(entrySchema.parse(data).route).toBe("/Elektrotechnik/Gleichstrom");
	expect(entrySchema.parse(data).title).toBe("Circuit");
	expect(
		entrySchema.safeParse({ ...data, route: "https://example.com/" }).success,
	).toBe(false);
});
test("blank names are rejected and storage details never leak into UI errors", () => {
	const data = {
		title: " ",
		note: "",
		route: "/Elektrotechnik/Gleichstrom",
		snapshot: original,
	};
	const parsed = entrySchema.safeParse(data);
	expect(parsed.success).toBe(false);
	if (!parsed.success)
		expect(notebookError(parsed.error)).toBe("Bitte einen Namen eingeben.");
	expect(notebookError(Error("SQL select private contents"))).not.toContain(
		"private contents",
	);
});

test("unsupported-browser errors give actionable safe instructions", async () => {
	const { NotebookUnavailableError } = await import("../../src/db/errors");
	expect(notebookError(new NotebookUnavailableError("insecure"))).toContain(
		"HTTPS",
	);
	expect(notebookError(new NotebookUnavailableError("unsupported"))).toContain(
		"aktuellen Browser",
	);
	expect(notebookError(new NotebookUnavailableError("storage"))).toContain(
		"Speicherzugriff",
	);
});

test("malformed notebook links fail before database access with a human-readable message", async () => {
	const { getEntry } = await import("../../src/lib/notebook");
	await expect(getEntry("invalid")).rejects.toThrow("keine gültige Kennung");
});
