import { createHash } from "node:crypto";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
/** Stable across Vite's client/server passes and its route-tree regeneration. */
export function getBuildId(): string {
	const sha = process.env.GITHUB_SHA;
	if (sha && /^[a-f0-9]{40}$/i.test(sha)) return sha.toLowerCase();
	const hash = createHash("sha256");
	const visit = (directory: string) => {
		for (const entry of readdirSync(directory, { withFileTypes: true }).sort(
			(a, b) => a.name.localeCompare(b.name),
		)) {
			const path = join(directory, entry.name);
			if (
				entry.name.startsWith(".") ||
				/\.(?:tmp|bak|log)$/.test(entry.name) ||
				path === "src/routeTree.gen.ts"
			)
				continue;
			if (entry.isDirectory()) visit(path);
			else if (entry.isFile()) {
				hash.update(path);
				hash.update("\0");
				hash.update(readFileSync(path));
			}
		}
	};
	for (const file of [
		"package.json",
		"bun.lock",
		"vite.config.ts",
		"tsconfig.json",
		"CNAME",
	]) {
		hash.update(file);
		hash.update(readFileSync(file));
	}
	for (const directory of ["src", "public", "scripts", "drizzle"])
		visit(directory);
	return "local-" + hash.digest("hex").slice(0, 24);
}
