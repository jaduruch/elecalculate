import { PGlite } from "@electric-sql/pglite";
import { worker } from "@electric-sql/pglite/worker";
import { migrateDatabase } from "./migrations";
async function resource(url: URL) {
	const response = await fetch(url);
	if (!response.ok)
		throw Error(
			`Datenbankdatei konnte nicht geladen werden (${response.status}).`,
		);
	return response;
}
worker({
	async init() {
		let client: PGlite | undefined;
		try {
			// Load assets explicitly: the SDK's internal Emscripten loader can otherwise
			// leave waitReady pending after a failed request, making retry impossible.
			const [pgliteWasmModule, initdbWasmModule, fsBundle] = await Promise.all([
				WebAssembly.compileStreaming(
					resource(
						new URL(
							"../../node_modules/@electric-sql/pglite/dist/pglite.wasm",
							import.meta.url,
						),
					),
				),
				WebAssembly.compileStreaming(
					resource(
						new URL(
							"../../node_modules/@electric-sql/pglite/dist/initdb.wasm",
							import.meta.url,
						),
					),
				),
				resource(
					new URL(
						"../../node_modules/@electric-sql/pglite/dist/pglite.data",
						import.meta.url,
					),
				).then((response) => response.blob()),
			]);
			client = new PGlite({
				dataDir: "idb://elecalculate-notebook-v1",
				pgliteWasmModule,
				initdbWasmModule,
				fsBundle,
			});
			await client.waitReady;
			await migrateDatabase(client);
			return client;
		} catch (error) {
			postMessage({ type: "elecalculate-notebook-error" });
			void client?.close().catch(() => {});
			throw error;
		}
	},
});
