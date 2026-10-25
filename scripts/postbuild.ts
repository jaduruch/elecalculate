import packageJSON from "../package.json";
import {
	readdir,
	readFile,
	writeFile,
	mkdir,
	copyFile,
} from "node:fs/promises";
import { join, relative, dirname } from "node:path";
import { createHash } from "node:crypto";
import { catalog } from "../src/lib/catalog";
import { getBuildId } from "./build-id";
import { renderOfflineAcknowledgement } from "../src/lib/offline-ack";
import { renderOfflineWorker } from "../src/lib/offline-worker";
import { renderOfflineRecoveryPage } from "../src/lib/offline-recovery";
const root = "dist/client";
const buildId = getBuildId();
for (const page of catalog) {
	const target = "/" + page.file.replace(".html", "") + "/";
	const path = join(root, page.file);
	await mkdir(dirname(path), { recursive: true });
	await writeFile(
		path,
		`<!doctype html><html lang="de"><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta http-equiv="refresh" content="0;url=${target}"><title>${page.title} | Elecalculate</title><script>location.replace(${JSON.stringify(target)}+location.search+location.hash)</script><a href="${target}">${page.title} öffnen</a></html>`,
	);
}
await writeFile(
	join(root, "aktualisieren.html"),
	renderOfflineRecoveryPage(buildId),
);
await copyFile("CNAME", join(root, "CNAME"));
await writeFile(join(root, ".nojekyll"), "");
await writeFile(
	join(root, "404.html"),
	`<!doctype html><html lang="de"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Seite nicht gefunden | Elecalculate</title><style>body{font-family:Arial,sans-serif;max-width:650px;margin:10vh auto;padding:25px;background:#000;color:#eee}a{color:#ddd}</style><script>${renderOfflineAcknowledgement(buildId)}</script></head><body><h1>Diese Seite gibt es nicht.</h1><a href="/">Zur Themenübersicht</a></body></html>`,
);
const commit =
	process.env.GITHUB_SHA ??
	Bun.spawnSync(["git", "rev-parse", "HEAD"]).stdout.toString().trim();
await writeFile(
	join(root, "version.json"),
	JSON.stringify({
		version: packageJSON.version,
		commit,
		stack: "TanStack Start / React / Drizzle / Tailwind",
		pages: catalog.length + 2,
	}),
);
await writeFile(
	join(root, "sitemap.xml"),
	'<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' +
		[
			"/",
			"/notizbuch",
			...catalog.map((p) => "/" + p.file.replace(".html", "") + "/"),
		]
			.map((p) => "<url><loc>https://elecalculate.com" + p + "</loc></url>")
			.join("") +
		"</urlset>",
);
async function list(dir: string): Promise<string[]> {
	const entries = await readdir(dir, { withFileTypes: true });
	return (
		await Promise.all(
			entries.map((e) =>
				e.isDirectory()
					? list(join(dir, e.name))
					: Promise.resolve([join(dir, e.name)]),
			),
		)
	).flat();
}
const files = (await list(root))
	.filter((p) => !p.endsWith(".map") && relative(root, p) !== "sw.js")
	.sort();
const hash = createHash("sha256");
for (const file of files) {
	hash.update(relative(root, file));
	hash.update(await readFile(file));
}
const version = hash.digest("hex").slice(0, 16);
const assets = files.map(
	(f) => "/" + relative(root, f).split("/").map(encodeURIComponent).join("/"),
);
await writeFile(
	join(root, "sw.js"),
	renderOfflineWorker(version, assets, buildId),
);

console.log(
	`Static build ${version}: ${catalog.length + 2} prerendered pages; ${assets.length} offline assets.`,
);
