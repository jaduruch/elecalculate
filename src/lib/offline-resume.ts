import { z } from "zod";
import { capture, restore, routeSchema, snapshotSchema } from "./notebook";
import { captureControllerState } from "./calculator-state";
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
	// Public capture intentionally refuses while a ?notiz load is pending.
	// Only the registered model kind is needed here; restore owns its atomic
	// prior capture and rollback, including the private pending-load bypass.
	let kind: string | undefined;
	try {
		kind = captureControllerState(root)?.kind;
	} catch {
		try {
			sessionStorage.removeItem(OFFLINE_RESUME_KEY);
		} catch {}
		return false;
	}
	if (record.snapshot.controller && record.snapshot.controller.kind !== kind) {
		try {
			sessionStorage.removeItem(OFFLINE_RESUME_KEY);
		} catch {}
		return false;
	}
	try {
		restore(root, record.snapshot);
	} catch {
		// Atomic restoration has already attempted rollback. A second public
		// capture/restore would refuse the pending state or erase worked results.
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
