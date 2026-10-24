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
	await expect(page.locator("#result")).toContainText("12.000mA");
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
