import { z } from "zod";
import {
	capture,
	restore,
	routeSchema,
	snapshotSchema,
	SnapshotRestoreError,
} from "./notebook";
export const OFFLINE_RESUME_KEY = "elecalculate.offline-resume.v1";
const MAX_LENGTH = 500000;
const MAX_AGE = 24 * 60 * 60 * 1000;
const resumeSchema = z.object({
	route: routeSchema,
	snapshot: snapshotSchema,
	createdAt: z.number().finite(),
});

/** sessionStorage is tab-local: an update cannot apply another tab's edits. */
export function preserveOfflineResume(root: HTMLElement | null) {
	if (!root) {
		try {
			sessionStorage.removeItem(OFFLINE_RESUME_KEY);
		} catch {}
		return;
	}
	const record = resumeSchema.parse({
		route: location.pathname.replace(/\/+$/, "") || "/",
		snapshot: capture(root),
		createdAt: Date.now(),
	});
	const raw = JSON.stringify(record);
	if (raw.length > MAX_LENGTH)
		throw new Error(
			"Die Eingaben sind zu umfangreich. Bitte zuerst im Notizbuch speichern.",
		);
	sessionStorage.setItem(OFFLINE_RESUME_KEY, raw);
}

/** Restore current-route state once; corrupted state must never poison reloads. */
export function restoreOfflineResume(root: HTMLElement): boolean {
	let raw: string | null;
	try {
		raw = sessionStorage.getItem(OFFLINE_RESUME_KEY);
	} catch {
		return false;
	}
	if (!raw) return false;
	let record: z.infer<typeof resumeSchema>;
	try {
		if (raw.length > MAX_LENGTH) throw new Error();
		record = resumeSchema.parse(JSON.parse(raw));
		const age = Date.now() - record.createdAt;
		if (
			age > MAX_AGE ||
			age < -300000 ||
			record.route !== (location.pathname.replace(/\/+$/, "") || "/")
		)
			throw new Error();
	} catch {
		try {
			sessionStorage.removeItem(OFFLINE_RESUME_KEY);
		} catch {}
		return false;
	}
	let initial: z.infer<typeof snapshotSchema>;
	try {
		initial = capture(root);
	} catch {
		try {
			sessionStorage.removeItem(OFFLINE_RESUME_KEY);
		} catch {}
		return false;
	}
	// Generic JSON validation is not enough: simulation kind belongs to the page.
	if (
		record.snapshot.controller &&
		record.snapshot.controller.kind !== initial.controller?.kind
	) {
		try {
			sessionStorage.removeItem(OFFLINE_RESUME_KEY);
		} catch {}
		return false;
	}
	try {
		restore(root, record.snapshot);
	} catch (error) {
		// Notebook restoration already rolls back its fields and worked results.
		// Reapplying a snapshot after that would erase those restored results.
		if (!(error instanceof SnapshotRestoreError && error.rolledBack)) {
			try {
				restore(root, initial);
			} catch {}
		}
		try {
			sessionStorage.removeItem(OFFLINE_RESUME_KEY);
		} catch {}
		return false;
	}
	try {
		sessionStorage.removeItem(OFFLINE_RESUME_KEY);
	} catch {}
	return true;
}
