import { resolve, sep } from "node:path";
const root = resolve("dist/client");
const port = Number(process.env.PORT ?? 4317);
const server = Bun.serve({
	hostname: "127.0.0.1",
	port,
	async fetch(request) {
		const url = new URL(request.url);
		let path: string;
		try {
			path = resolve(root, "." + decodeURIComponent(url.pathname));
		} catch {
			return new Response("Bad request", { status: 400 });
		}
		if (path !== root && !path.startsWith(root + sep))
			return new Response("Forbidden", { status: 403 });
		let file = Bun.file(path);
		if (!(await file.exists()) || url.pathname.endsWith("/"))
			file = Bun.file(resolve(path, "index.html"));
		if (!(await file.exists()))
			return new Response(Bun.file(root + "/404.html"), {
				status: 404,
				headers: { "Content-Type": "text/html" },
			});
		return new Response(file, {
			headers: {
				"Cache-Control": "no-cache",
				"X-Content-Type-Options": "nosniff",
			},
		});
	},
});
console.log(`Elecalculate: ${server.url}`);
