import { PGliteWorker } from "@electric-sql/pglite/worker";
import { drizzle } from "drizzle-orm/pg-proxy";
let instance: ReturnType<typeof connect> | undefined;
async function connect() {
	const client = await PGliteWorker.create(
		new Worker(new URL("./worker.ts", import.meta.url), { type: "module" }),
		{ id: "elecalculate-notebook-v1" },
	);
	// Drizzle's proxy driver targets the worker's PostgreSQL query interface without
	// pretending that a worker owns PGlite's main-thread filesystem methods.
	return drizzle(async (sql, params) => {
		const result = await client.query(sql, params, { rowMode: "array" });
		return { rows: result.rows };
	});
}
export function getDatabase() {
	if (typeof window === "undefined")
		throw Error("Das lokale Notizbuch ist nur im Browser verfügbar.");
	return (instance ??= connect().catch((error) => {
		instance = undefined;
		throw error;
	}));
}
