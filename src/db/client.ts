import { PGliteWorker } from "@electric-sql/pglite/worker";
import { drizzle } from "drizzle-orm/pg-proxy";
import { NotebookUnavailableError } from "./errors";
let instance: ReturnType<typeof connect> | undefined;
let activeConnection: symbol | undefined;
async function withDeadline<T>(
	operation: Promise<T>,
	milliseconds: number,
): Promise<T> {
	let timer: ReturnType<typeof setTimeout> | undefined;
	try {
		return await Promise.race([
			operation,
			new Promise<never>((_resolve, reject) => {
				timer = setTimeout(
					() =>
						reject(Error("Zeitüberschreitung beim lokalen Datenbankzugriff.")),
					milliseconds,
				);
			}),
		]);
	} finally {
		if (timer !== undefined) clearTimeout(timer);
	}
}
async function connect() {
	const token = Symbol("notebook-connection");
	activeConnection = token;
	const worker = new Worker(new URL("./worker.ts", import.meta.url), {
		type: "module",
	});
	let fail: (error: Error) => void = () => {};
	const failure = new Promise<never>((_resolve, reject) => {
		fail = reject;
	});
	// A worker may fail while no query is running. Its rejection remains handled,
	// while every startup/query race still receives the same failure.
	void failure.catch(() => {});
	worker.addEventListener("error", (event) => {
		event.preventDefault();
		fail(Error("Das Datenbankmodul konnte nicht gestartet werden."));
	});
	worker.addEventListener("message", (event) => {
		if (event.data?.type === "elecalculate-notebook-error")
			fail(Error("Der lokale Datenbankspeicher konnte nicht geöffnet werden."));
	});
	// Keep the instance available during startup so failed initializations release
	// the client's BroadcastChannels and Web Locks as well as its worker.
	const client = new PGliteWorker(worker, { id: "elecalculate-notebook-v1" });
	const close = () => {
		if (activeConnection === token) {
			activeConnection = undefined;
			instance = undefined;
		}
		void client.close().catch(() => {});
		worker.terminate();
	};
	try {
		await withDeadline(Promise.race([client.waitReady, failure]), 45000);
	} catch (error) {
		close();
		throw error;
	}
	// The worker implements PostgreSQL queries, not PGlite's main-thread filesystem.
	return drizzle(async (sql, params) => {
		try {
			const result = await withDeadline(
				Promise.race([
					client.query(sql, params, { rowMode: "array" }),
					failure,
				]),
				30000,
			);
			return { rows: result.rows };
		} catch (error) {
			close();
			throw error;
		}
	});
}
export function getDatabase() {
	if (typeof window === "undefined")
		throw Error("Das lokale Notizbuch ist nur im Browser verfügbar.");
	if (!window.isSecureContext) throw new NotebookUnavailableError("insecure");
	if (
		typeof Worker === "undefined" ||
		typeof BroadcastChannel === "undefined" ||
		!navigator.locks ||
		!("indexedDB" in window) ||
		typeof crypto.randomUUID !== "function"
	)
		throw new NotebookUnavailableError("unsupported");
	try {
		if (!window.indexedDB) throw Error();
	} catch {
		throw new NotebookUnavailableError("storage");
	}
	return (instance ??= connect().catch((error) => {
		instance = undefined;
		throw error;
	}));
}
