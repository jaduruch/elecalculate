import { test, expect } from "@playwright/test";
import { catalog } from "../src/lib/catalog";
test("all pages and a fresh PostgreSQL notebook work with the network disabled", async ({
	page,
	context,
}) => {
	test.setTimeout(60000);
	const errors: string[] = [];
	page.on("pageerror", (e) => errors.push(e.message));
	await page.goto("/");
	await page
		.getByRole("button", { name: "Offline speichern", exact: true })
		.click();
	await expect(page.getByRole("status")).toContainText("Offline gespeichert", {
		timeout: 25000,
	});
	await page.reload();
	await page.waitForFunction(() => !!navigator.serviceWorker.controller);
	await context.setOffline(true);
	for (const p of catalog) {
		await page.goto("/" + p.file.replace(".html", "") + "/");
		await expect(page.locator(".page-body")).toHaveAttribute(
			"data-ready",
			"true",
		);
	}
	await page.goto("/Elektrotechnik/Gleichstrom/");
	await page.getByRole("button", { name: "Ohmsches Gesetz" }).click();
	await page.locator("#U").fill("12");
	await page.locator("#R").fill("1k");
	await page.locator('[data-action="calculateParametersURI"]').click();
	await expect(page.locator('#result [data-result-key="I"]')).toHaveAttribute(
		"data-result-value",
		"0.012",
	);
	await page.getByRole("button", { name: "Werte merken" }).click();
	await page.getByLabel("Name", { exact: true }).fill("Offline-Versuch");
	await page.getByRole("button", { name: "Speichern", exact: true }).click();
	await expect(page.getByRole("status")).toContainText("gespeichert", {
		timeout: 25000,
	});
	await page.getByRole("link", { name: "Notizbuch", exact: true }).click();
	await expect(
		page.getByRole("link", { name: "Offline-Versuch" }),
	).toBeVisible();
	await page.reload();
	await expect(page.getByRole("link", { name: "Offline-Versuch" })).toBeVisible(
		{ timeout: 15000 },
	);
	expect(errors).toEqual([]);
	await context.setOffline(false);
});
test("original .html URLs and trailing-slash reloads resolve to migrated pages", async ({
	page,
}) => {
	await page.goto("/Elektrotechnik/Gleichstrom.html");
	await expect(page).toHaveURL(/\/Elektrotechnik\/Gleichstrom\/$/);
	await expect(page.locator(".page-body")).toHaveAttribute(
		"data-ready",
		"true",
	);
	await page.reload();
	await expect(
		page.getByRole("button", { name: "Ohmsches Gesetz" }),
	).toBeVisible();
});

test("static archive host returns useful errors and rejects non-read requests", async ({
	request,
}) => {
	const missing = await request.get("/not-a-real-page/");
	expect(missing.status()).toBe(404);
	expect(await missing.text()).toContain("Diese Seite gibt es nicht.");
	const head = await request.head("/");
	expect(head.status()).toBe(200);
	expect(await head.body()).toHaveLength(0);
	const write = await request.post("/");
	expect(write.status()).toBe(405);
	expect(write.headers().allow).toBe("GET, HEAD");
	expect((await request.get("/%00")).status()).toBe(400);
	expect((await request.get("/%2e%2e%2fREADME.md")).status()).toBe(403);
});

test("first offline installation works immediately without a manual page reload", async ({
	page,
	context,
}) => {
	await page.goto("/");
	await page
		.getByRole("button", { name: "Offline speichern", exact: true })
		.click();
	await expect(page.getByRole("status")).toContainText("Offline gespeichert", {
		timeout: 25000,
	});
	expect(
		await page.evaluate(() => navigator.serviceWorker.controller?.state),
	).toBe("activated");
	await page
		.getByRole("button", { name: "Meldung schließen", exact: true })
		.click();
	await context.setOffline(true);
	await page.getByRole("link", { name: "Notizbuch", exact: true }).click();
	await expect(
		page.getByRole("heading", { name: "Notizbuch", exact: true }),
	).toBeVisible();
	await expect(
		page.getByText("Noch keine Einträge.", { exact: false }),
	).toBeVisible({ timeout: 15000 });
	await page
		.getByRole("navigation", {
			name: "Elektrotechnik im Fußbereich",
			exact: true,
		})
		.getByRole("link", { name: "Gleichstrom", exact: true })
		.click();
	await page.getByRole("button", { name: "Ohmsches Gesetz" }).click();
	await page.locator("#R").fill("1k");
	await page.locator("#U").fill("12");
	await page.getByRole("button", { name: "Werte merken" }).click();
	await page.getByLabel("Name", { exact: true }).fill("Ohne Neuladen offline");
	await page.getByRole("button", { name: "Speichern", exact: true }).click();
	await expect(page.getByRole("status")).toContainText("gespeichert");
	await page.getByRole("link", { name: "Notizbuch", exact: true }).click();
	await expect(
		page.getByRole("link", { name: "Ohne Neuladen offline", exact: true }),
	).toBeVisible();
	await page.getByRole("button", { name: "Entfernen", exact: true }).click();
	await expect(
		page.getByRole("link", { name: "Ohne Neuladen offline", exact: true }),
	).toHaveCount(0);
	await page
		.getByRole("button", {
			name: "Ohne Neuladen offline: Rückgängig",
			exact: true,
		})
		.click();
	await expect(
		page.getByRole("link", { name: "Ohne Neuladen offline", exact: true }),
	).toBeVisible();
	await context.setOffline(false);
});
