import { test, expect } from "@playwright/test";

test("save disclosure returns keyboard focus and associates title errors", async ({
	page,
}) => {
	await page.goto("/Elektrotechnik/Gleichstrom");
	const toggle = page.getByRole("button", {
		name: "Werte merken",
		exact: true,
	});

	for (const tool of await page
		.locator(".site-tools > a, .site-tools > button, .notebook-save > button")
		.all()) {
		const box = await tool.boundingBox();
		expect(box!.height).toBeGreaterThanOrEqual(44);
	}
	await toggle.click();
	const editor = page.getByRole("form", { name: "Eingaben speichern" });
	const title = page.getByLabel("Name", { exact: true });
	await expect(title).toBeFocused();
	await page.getByRole("button", { name: "Speichern", exact: true }).click();
	await expect(title).toHaveAttribute("aria-invalid", "true");
	await expect(title).toHaveAccessibleDescription(
		"Name mit 1 bis 80 Zeichen eingeben.",
	);
	await title.fill("Meine Eingaben");
	await title.press("Escape");
	await expect(editor).toHaveCount(0);
	await expect(toggle).toBeFocused();
	await toggle.click();
	await expect(title).toHaveValue("Meine Eingaben");
	await page.getByRole("button", { name: "Abbrechen", exact: true }).click();
	await expect(toggle).toBeFocused();
});

test("long notebook content and its actions fit a narrow screen", async ({
	page,
}) => {
	test.setTimeout(60000);
	await page.setViewportSize({ width: 320, height: 320 });
	await page.goto("/Elektrotechnik/Gleichstrom");
	await page.getByRole("button", { name: "Werte merken", exact: true }).click();
	const title = page.getByLabel("Name", { exact: true });
	await expect(title).toHaveCSS("font-size", "16px");
	const editorBox = await page.locator(".save-form").boundingBox();
	expect(editorBox!.y + editorBox!.height).toBeLessThanOrEqual(320);
	await title.fill("L".repeat(80));
	await page.getByLabel("Notiz", { exact: true }).fill("note".repeat(125));
	await page.getByRole("button", { name: "Speichern", exact: true }).click();
	await expect(page.locator(".save-status")).toContainText("gespeichert", {
		timeout: 45000,
	});
	await expect(
		page.getByRole("button", { name: "Werte merken", exact: true }),
	).toBeFocused();
	await page.goto("/notizbuch");
	const article = page.locator(".notebook-entries article");
	await expect(article).toBeVisible({ timeout: 45000 });
	expect(
		await page.evaluate(() => document.documentElement.scrollWidth),
	).toBeLessThanOrEqual(320);
	for (const action of await article
		.locator(".notebook-entry-actions>a,.notebook-entry-actions>button")
		.all()) {
		const box = await action.boundingBox();
		expect(box?.height).toBeGreaterThanOrEqual(44);
		expect(box!.x + box!.width).toBeLessThanOrEqual(320);
	}
	await article.getByRole("button", { name: "Entfernen", exact: true }).click();
	await expect(article).toHaveCount(0);
	expect(
		await page.evaluate(() => document.documentElement.scrollWidth),
	).toBeLessThanOrEqual(320);
});

test("offline status stays within the mobile viewport with accessible actions", async ({
	page,
}) => {
	await page.setViewportSize({ width: 320, height: 680 });
	await page.addInitScript(() => {
		Object.defineProperty(navigator, "serviceWorker", {
			configurable: true,
			value: {
				controller: null,
				addEventListener() {},
				removeEventListener() {},
				getRegistration: async () => undefined,
				register: async () => {
					throw new Error(
						"Die Offline-Dateien konnten nicht vollständig gespeichert werden. Bitte die Verbindung prüfen und erneut versuchen.",
					);
				},
			},
		});
	});
	await page.goto("/");
	await page
		.getByRole("button", { name: "Offline speichern", exact: true })
		.click();
	const notice = page.locator(".notification");
	await expect(notice).toContainText("nicht vollständig");
	const box = await notice.boundingBox();
	expect(box!.x).toBeGreaterThanOrEqual(0);
	expect(box!.x + box!.width).toBeLessThanOrEqual(320);
	const close = notice.getByRole("button", { name: "Meldung schließen" });
	expect((await close.boundingBox())!.height).toBeGreaterThanOrEqual(44);
	expect(
		await page.evaluate(() => document.documentElement.scrollWidth),
	).toBeLessThanOrEqual(320);
	await close.click();
	await expect(notice).toHaveCount(0);
	await expect(
		page.getByRole("button", { name: "Offline speichern", exact: true }),
	).toBeFocused();
});
