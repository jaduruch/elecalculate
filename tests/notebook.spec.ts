import { test, expect } from "@playwright/test";
test("Drizzle PostgreSQL notebook saves, reloads, restores and undoes removal", async ({
	page,
	context,
}) => {
	test.setTimeout(60000);
	const errors: string[] = [];
	page.on("pageerror", (e) => errors.push(e.message));
	await page.goto("/Elektrotechnik/Gleichstrom");
	await page.getByRole("button", { name: "Ohmsches Gesetz" }).click();
	await page.locator("#R").fill("2.2k");
	await page.locator("#U").fill("24");
	await page.getByRole("button", { name: "Werte merken" }).click();
	await page.getByLabel("Name", { exact: true }).fill("Versuch mit 24 V");
	await page.getByLabel("Notiz", { exact: true }).fill("Widerstand 2.2 kΩ");
	await page.getByRole("button", { name: "Speichern", exact: true }).click();
	await expect(page.getByRole("status")).toContainText("gespeichert", {
		timeout: 25000,
	});
	await page.getByRole("link", { name: "Notizbuch", exact: true }).click();
	await expect(
		page.getByRole("link", { name: "Versuch mit 24 V" }),
	).toBeVisible({ timeout: 15000 });
	await page.reload();
	await expect(
		page.getByRole("link", { name: "Versuch mit 24 V" }),
	).toBeVisible({ timeout: 15000 });
	const second = await context.newPage();
	await second.goto("/notizbuch");
	await expect(
		second.getByRole("link", { name: "Versuch mit 24 V" }),
	).toBeVisible({ timeout: 20000 });
	await second.close();
	await page.getByRole("link", { name: "Eingaben laden" }).click();
	await expect(page.locator("#R")).toBeVisible();
	await expect(page.locator("#R")).toHaveValue("2.2k");
	await expect(page.locator("#U")).toHaveValue("24");
	await page.getByRole("link", { name: "Notizbuch", exact: true }).click();
	await page.getByRole("button", { name: "Entfernen", exact: true }).click();
	await expect(
		page.getByRole("link", { name: "Versuch mit 24 V" }),
	).toHaveCount(0);
	await page.getByRole("button", { name: "Rückgängig" }).click();
	await expect(
		page.getByRole("link", { name: "Versuch mit 24 V" }),
	).toBeVisible();
	expect(errors).toEqual([]);
});
