import { test, expect } from "@playwright/test";

test("visible labels focus their input and units survive input-error cleanup", async ({
	page,
}) => {
	await page.goto("/Elektrotechnik/Gleichstrom");
	await page.getByRole("button", { name: "Ohmsches Gesetz" }).click();
	await page.locator('label[for="R"]').click();
	await expect(page.locator("#R")).toBeFocused();
	await expect(page.locator("#R")).toHaveAccessibleDescription("Ω [Ohm]");
	await page.locator("#R").fill("0");
	await page.locator("#U").fill("12");
	await page.locator('[data-action="calculateParametersURI"]').click();
	await expect(page.locator("#R")).toHaveAttribute("aria-invalid", "true");
	await page.locator("#R").fill("1k");
	await page.locator('[data-action="calculateParametersURI"]').click();
	await expect(page.locator("#R")).toHaveAccessibleDescription("Ω [Ohm]");
});

test("switches and sphere sliders have visible and accessible names", async ({
	page,
}) => {
	await page.goto("/Elektrotechnik/Drehstrom");
	await expect(page.locator(".switch-label")).toHaveText("Dreieckschaltung");
	await page.locator(".switch-label").click();
	await expect(
		page.getByRole("checkbox", { name: "Dreieckschaltung", exact: true }),
	).toBeChecked();
	await page.goto("/Allgemein/Qubit");
	await expect(
		page.getByRole("slider", { name: "Polar angle θ (degrees)" }),
	).toBeVisible();
	await expect(
		page.getByRole("slider", { name: "Azimuthal angle φ (degrees)" }),
	).toBeVisible();
});

test("the skip link moves keyboard focus to content and reference tables can receive focus", async ({
	page,
}) => {
	await page.goto("/Allgemein/E-Reihe");
	// Safari link-tab preferences differ; exercise activation after focusing the link.
	await page.getByRole("link", { name: "Zum Inhalt", exact: true }).focus();
	await expect(
		page.getByRole("link", { name: "Zum Inhalt", exact: true }),
	).toBeFocused();
	await page.keyboard.press("Enter");
	await expect(page.locator("#content")).toBeFocused();
	await page
		.getByRole("table", { name: "Tabelle: E-Reihe", exact: true })
		.focus();
	await expect(page.locator("#eReiheTable")).toBeFocused();
});
