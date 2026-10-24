import initial from "../../drizzle/20261024232142_nosy_old_lace/migration.sql?raw";
export async function migrateDatabase(client: {
	exec: (sql: string) => Promise<unknown>;
	query: <T>(sql: string, params?: unknown[]) => Promise<{ rows: T[] }>;
	transaction: <T>(fn: (tx: any) => Promise<T>) => Promise<T>;
}) {
	await client.exec(
		"CREATE TABLE IF NOT EXISTS elecalculate_migrations (name text PRIMARY KEY, applied_at timestamptz NOT NULL DEFAULT now())",
	);
	const applied = await client.query<{ name: string }>(
		"SELECT name FROM elecalculate_migrations WHERE name = $1",
		["0001-notebook"],
	);
	if (!applied.rows.length)
		await client.transaction(async (tx) => {
			await tx.exec(initial);
			await tx.query("INSERT INTO elecalculate_migrations (name) VALUES ($1)", [
				"0001-notebook",
			]);
		});
}
