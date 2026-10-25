import { test, expect } from "@playwright/test";
import { spawn, type ChildProcess } from "node:child_process";
let child: ChildProcess;
let origin: string;
test.beforeAll(async () => {
	child = spawn("bun", ["tests/fixtures/offline-server.ts"], {
		cwd: process.cwd(),
		stdio: ["ignore", "pipe", "pipe"],
	});
	origin = await new Promise<string>((resolve, reject) => {
		let text = "";
		const timer = setTimeout(
			() => reject(new Error("Offline fixture startup timed out")),
			10000,
		);
		child.stdout!.on("data", (data) => {
			text += data.toString();
			const found = text.match(/http:\/\/127\.0\.0\.1:\d+\//);
			if (found) {
				clearTimeout(timer);
				resolve(found[0]);
			}
		});
		child.once("exit", (code) =>
			reject(new Error("Offline fixture exited: " + code)),
		);
	});
});
test.afterAll(() => child?.kill());
test("waiting update preserves open tabs and their old chunks, then prunes safely", async ({
	page,
	context,
	request,
}) => {
	await request.post(origin + "__deploy", { data: { version: 1 } });
	await page.goto(origin);
	await page.evaluate(async () => {
		await navigator.serviceWorker.register("/sw.js", {
			updateViaCache: "none",
		});
		await navigator.serviceWorker.ready;
	});
	await page.reload();
	await page.waitForFunction(() => !!navigator.serviceWorker.controller);
	const second = await context.newPage();
	await second.goto(origin);
	await second.locator("#value").fill("unsaved second tab");
	await page.locator("#value").fill("unsaved first tab");
	await request.post(origin + "__deploy", { data: { version: 2 } });
	await page.evaluate(async () => {
		const registration = await navigator.serviceWorker.getRegistration();
		await registration!.update();
	});
	await page.waitForFunction(
		async () => !!(await navigator.serviceWorker.getRegistration())?.waiting,
	);
	await expect(page.locator("#value")).toHaveValue("unsaved first tab");
	await expect(page.locator("h1")).toHaveText("Version 1");
	await page.evaluate(async () => {
		const registration = await navigator.serviceWorker.getRegistration();
		await new Promise<void>((resolve) => {
			navigator.serviceWorker.addEventListener(
				"controllerchange",
				() => resolve(),
				{ once: true },
			);
			registration!.waiting!.postMessage({
				type: "ELECALCULATE_ACTIVATE_UPDATE",
			});
		});
	});
	await page.reload();
	await expect(page.locator("h1")).toHaveText("Version 2");
	await expect(second.locator("#value")).toHaveValue("unsaved second tab");
	expect(
		await second.evaluate(async () => {
			const r = await fetch("/assets/chunk-v1.js");
			return { status: r.status, text: await r.text() };
		}),
	).toEqual({ status: 200, text: "export const version=1;" });
	expect(await page.evaluate(() => caches.keys())).toContain(
		"elecalculate-static-audit-1",
	);
	await second.close();
	await page.reload();
	await expect
		.poll(() => page.evaluate(() => caches.keys()))
		.not.toContain("elecalculate-static-audit-1");
	await context.setOffline(true);
	await page.reload();
	await expect(page.locator("h1")).toHaveText("Version 2");
	const missing = await page.goto(origin + "missing-page");
	expect(missing?.status()).toBe(404);
	await expect(page.locator("h1")).toContainText("Diese Seite gibt es nicht");
	await context.setOffline(false);
});
test("failed update leaves the previously complete offline generation available", async ({
	page,
	context,
	request,
}) => {
	await request.post(origin + "__deploy", { data: { version: 1 } });
	await page.goto(origin);
	await page.evaluate(async () => {
		await navigator.serviceWorker.register("/sw.js", {
			updateViaCache: "none",
		});
		await navigator.serviceWorker.ready;
	});
	await page.reload();
	await request.post(origin + "__deploy", { data: { version: 2, fail: true } });
	await page.evaluate(async () => {
		const registration = (await navigator.serviceWorker.getRegistration())!;
		await registration.update();
		await new Promise<void>((resolve) => {
			const worker = registration.installing;
			if (!worker || worker.state === "redundant") return resolve();
			worker.addEventListener("statechange", () => {
				if (worker.state === "redundant") resolve();
			});
		});
	});
	await context.setOffline(true);
	await page.reload();
	await expect(page.locator("h1")).toHaveText("Version 1");
	expect(
		await page.evaluate(
			async () => !!(await navigator.serviceWorker.getRegistration())?.waiting,
		),
	).toBe(false);
	await context.setOffline(false);
});

test("navigation during installation cannot delete the incoming complete-build cache", async ({
	page,
	request,
}) => {
	await request.post(origin + "__deploy", { data: { version: 1 } });
	await page.goto(origin);
	await page.evaluate(async () => {
		await navigator.serviceWorker.register("/sw.js", {
			updateViaCache: "none",
		});
		await navigator.serviceWorker.ready;
	});
	await page.reload();
	await request.post(origin + "__deploy", {
		data: { version: 2, holdAsset: true },
	});
	await page.evaluate(async () => {
		await (await navigator.serviceWorker.getRegistration())!.update();
	});
	await page.waitForFunction(
		async () => !!(await navigator.serviceWorker.getRegistration())?.installing,
	);
	await page.reload();
	await expect(page.locator("h1")).toHaveText("Version 1");
	await request.post(origin + "__release");
	await page.waitForFunction(
		async () => !!(await navigator.serviceWorker.getRegistration())?.waiting,
	);
	await page.evaluate(async () => {
		const reg = (await navigator.serviceWorker.getRegistration())!;
		await new Promise<void>((resolve) => {
			navigator.serviceWorker.addEventListener(
				"controllerchange",
				() => resolve(),
				{ once: true },
			);
			reg.waiting!.postMessage({ type: "ELECALCULATE_ACTIVATE_UPDATE" });
		});
	});
	await page.reload();
	await expect(page.locator("h1")).toHaveText("Version 2");
	expect(
		await page.evaluate(
			async () =>
				!!(await (
					await caches.open("elecalculate-static-audit-2")
				).match("/index.html")),
		),
	).toBe(true);
});

test("standalone recovery replaces an old cache-first worker without erasing browser records", async ({
	page,
	request,
}) => {
	await request.post(origin + "__deploy", { data: { version: 1 } });
	await page.goto(origin);
	await page.evaluate(async () => {
		await navigator.serviceWorker.register("/legacy-sw.js", { scope: "/" });
		await navigator.serviceWorker.ready;
		await new Promise<void>((resolve, reject) => {
			const db = indexedDB.open("notebook-preservation-audit", 1);
			db.onupgradeneeded = () => db.result.createObjectStore("notes");
			db.onerror = () => reject(db.error);
			db.onsuccess = () => {
				const tx = db.result.transaction("notes", "readwrite");
				tx.objectStore("notes").put("keep this note", "sentinel");
				tx.oncomplete = () => {
					db.result.close();
					resolve();
				};
			};
		});
	});
	await page.reload();
	await request.post(origin + "__deploy", { data: { version: 2 } });
	await page.reload();
	await expect(page.locator("h1")).toHaveText("Version 1");
	await page.goto(origin + "aktualisieren.html");
	await page.getByRole("button", { name: "Aktuelle Dateien laden" }).click();
	await expect(
		page.getByRole("button", { name: "Jetzt aktualisieren" }),
	).toBeVisible();
	await page.getByRole("button", { name: "Jetzt aktualisieren" }).click();
	await expect(page.locator("h1")).toHaveText("Version 2");
	expect(
		await page.evaluate(
			() =>
				new Promise((resolve, reject) => {
					const db = indexedDB.open("notebook-preservation-audit", 1);
					db.onerror = () => reject(db.error);
					db.onsuccess = () => {
						const read = db.result
							.transaction("notes")
							.objectStore("notes")
							.get("sentinel");
						read.onsuccess = () => {
							const value = read.result;
							db.result.close();
							resolve(value);
						};
					};
				}),
		),
	).toBe("keep this note");
});

test("a new tab cannot evict assets still used by the single older open tab", async ({
	page,
	context,
	request,
}) => {
	await request.post(origin + "__deploy", { data: { version: 1 } });
	await page.goto(origin);
	await page.evaluate(async () => {
		await navigator.serviceWorker.register("/sw.js", {
			updateViaCache: "none",
		});
		await navigator.serviceWorker.ready;
	});
	await page.reload();
	await page.locator("#value").fill("keep older tab");
	await request.post(origin + "__deploy", { data: { version: 2 } });
	await page.evaluate(async () => {
		await (await navigator.serviceWorker.getRegistration())!.update();
	});
	await page.waitForFunction(
		async () => !!(await navigator.serviceWorker.getRegistration())?.waiting,
	);
	await page.evaluate(async () => {
		const reg = (await navigator.serviceWorker.getRegistration())!;
		await new Promise<void>((resolve) => {
			navigator.serviceWorker.addEventListener(
				"controllerchange",
				() => resolve(),
				{ once: true },
			);
			reg.waiting!.postMessage({ type: "ELECALCULATE_ACTIVATE_UPDATE" });
		});
	});
	const fresh = await context.newPage();
	await fresh.goto(origin);
	await expect(fresh.locator("h1")).toHaveText("Version 2");
	await expect(page.locator("#value")).toHaveValue("keep older tab");
	expect(
		await page.evaluate(async () => {
			const r = await fetch("/assets/chunk-v1.js");
			return { status: r.status, text: await r.text() };
		}),
	).toEqual({ status: 200, text: "export const version=1;" });
	await page.close();
	await fresh.reload();
	await expect
		.poll(() => fresh.evaluate(() => caches.keys()))
		.not.toContain("elecalculate-static-audit-1");
	await fresh.close();
});
