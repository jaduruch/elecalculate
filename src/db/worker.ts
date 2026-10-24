import { PGlite } from "@electric-sql/pglite";
import { worker } from "@electric-sql/pglite/worker";
import { migrateDatabase } from "./migrations";
worker({
	async init() {
		const client = new PGlite("idb://elecalculate-notebook-v1");
		await client.waitReady;
		await migrateDatabase(client);
		return client;
	},
});
