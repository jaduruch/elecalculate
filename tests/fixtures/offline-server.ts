import { renderOfflineWorker } from "../../src/lib/offline-worker";
import { renderOfflineRecoveryPage } from "../../src/lib/offline-recovery";
import { renderOfflineAcknowledgement } from "../../src/lib/offline-ack";
let version = 1;
let fail = false;
let holdAsset = false;
let releaseAsset: (() => void) | null = null;
const server = Bun.serve({
	hostname: "127.0.0.1",
	port: 0,
	async fetch(request) {
		const url = new URL(request.url);
		if (url.pathname === "/__deploy" && request.method === "POST") {
			const data = await request.json();
			version = data.version;
			fail = !!data.fail;
			holdAsset = !!data.holdAsset;
			return Response.json({ version, fail });
		}
		if (url.pathname === "/__release" && request.method === "POST") {
			holdAsset = false;
			releaseAsset?.();
			releaseAsset = null;
			return new Response("released");
		}
		if (url.pathname === "/aktualisieren.html")
			return new Response(renderOfflineRecoveryPage("audit-" + version), {
				headers: { "Content-Type": "text/html", "Cache-Control": "no-store" },
			});
		if (url.pathname === "/legacy-sw.js")
			return new Response(
				`const CACHE='elecalculate-static-legacy';self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(['/index.html','/assets/chunk-v1.js','/404.html']))));self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith((async()=>{const c=await caches.open(CACHE);const hit=await c.match(e.request,{ignoreSearch:true});if(hit)return hit;if(new URL(e.request.url).pathname==='/')return c.match('/index.html');return fetch(e.request);})());});`,
				{
					headers: {
						"Content-Type": "application/javascript",
						"Cache-Control": "no-store",
					},
				},
			);
		if (url.pathname === "/sw.js")
			return new Response(
				renderOfflineWorker("audit-" + version, [
					"/index.html",
					`/assets/chunk-v${version}.js`,
					"/404.html",
				]),
				{
					headers: {
						"Content-Type": "application/javascript",
						"Cache-Control": "no-store",
					},
				},
			);
		if (url.pathname.startsWith("/assets/chunk-v")) {
			const requested = Number(url.pathname.match(/chunk-v(\d+)\.js/)?.[1]);
			if (holdAsset && requested === version)
				await new Promise<void>((resolve) => {
					releaseAsset = resolve;
				});
			return new Response(
				requested === version && !fail
					? `export const version=${version};`
					: "missing",
				{
					status: requested === version && !fail ? 200 : 404,
					headers: { "Content-Type": "application/javascript" },
				},
			);
		}
		if (url.pathname === "/404.html")
			return new Response(
				`<!doctype html><html lang="de"><head><script>${renderOfflineAcknowledgement("audit-" + version)}</script></head><body><h1>Offline: Diese Seite gibt es nicht.</h1></body></html>`,
				{ headers: { "Content-Type": "text/html" } },
			);
		if (url.pathname === "/" || url.pathname === "/index.html")
			return new Response(
				`<!doctype html><html lang="de"><head><meta charset="utf-8"><title>Offline audit ${version}</title><meta name="elecalculate-build" content="audit-${version}"><script>${renderOfflineAcknowledgement("audit-" + version)}</script></head><body><h1>Version ${version}</h1><label>Eingabe<input id="value"></label></body></html>`,
				{
					headers: { "Content-Type": "text/html", "Cache-Control": "no-store" },
				},
			);
		return new Response("not found", { status: 404 });
	},
});
console.log(server.url.href);
