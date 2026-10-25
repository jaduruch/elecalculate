import { resolve, sep } from "node:path";
const root = resolve("dist/client");
const port = Number(process.env.PORT ?? 4317);
const server = Bun.serve({
	hostname: "127.0.0.1",
	port,
	async fetch(request) {
		if (!["GET", "HEAD"].includes(request.method))
			return new Response("Method not allowed", {
				status: 405,
				headers: { Allow: "GET, HEAD" },
			});
		const url = new URL(request.url);
		let path: string;
		try {
			const decoded = decodeURIComponent(url.pathname);
			if (decoded.includes("\0"))
				return new Response("Bad request", { status: 400 });
			path = resolve(root, "." + decoded);
		} catch {
			return new Response("Bad request", { status: 400 });
		}
		if (path !== root && !path.startsWith(root + sep))
			return new Response("Forbidden", { status: 403 });
		let file = Bun.file(path);
		if (!(await file.exists()) || url.pathname.endsWith("/"))
			file = Bun.file(resolve(path, "index.html"));
		if (!(await file.exists())) {
			const fallback = Bun.file(root + "/404.html");
			const body = (await fallback.exists())
				? fallback
				: '<!doctype html><html lang="de"><meta charset="utf-8"><title>Seite nicht gefunden</title><body style="background:#000;color:#eee;font-family:Arial"><h1>Diese Seite gibt es nicht.</h1><a href="/" style="color:inherit">Zur Themenübersicht</a></body></html>';
			return new Response(request.method === "HEAD" ? null : body, {
				status: 404,
				headers: {
					"Content-Type": "text/html; charset=utf-8",
					"Cache-Control": "no-cache",
				},
			});
		}
		return new Response(file, {
			headers: {
				"Cache-Control": "no-cache",
				"X-Content-Type-Options": "nosniff",
			},
		});
	},
});
console.log(`Elecalculate: ${server.url}`);
