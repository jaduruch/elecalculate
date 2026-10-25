import { test, expect } from "@playwright/test";
test("preferred resistor values and colour codes", async ({ page }) => {
	await page.goto("/Allgemein/E-Reihe");
	await page.locator("#eReiheSelect").selectOption("E96");
	await expect(page.locator("#eReiheTable td")).toHaveCount(96);
	await expect(page.locator("#eReiheTable")).toContainText("9.76");
	await page.goto("/Allgemein/Widerstandstabelle");
	await expect(page.locator("#band1Select")).toHaveAttribute(
		"aria-expanded",
		"false",
	);
	await page.locator("#band1Select").click();
	await expect(page.locator("#band1Select")).toHaveAttribute(
		"aria-expanded",
		"true",
	);
	await page.locator('#band1Dropdown [data-value="4"]').click();
	await page.locator("#band2Select").click();
	await page.locator('#band2Dropdown [data-value="7"]').click();
	await page.locator("#multiplierSelect").click();
	await page.locator('#multiplierDropdown [data-value="100"]').click();
	await expect(page.locator("#resistanceValue")).toContainText("4700");
	await page.locator("#multiplierSelect").click();
	await page.locator('#multiplierDropdown [data-value="0.1"]').click();
	await expect(page.locator("#resistanceValue")).toHaveText("Widerstand: 4.7Ω");
	await page.locator("#multiplierSelect").click();
	await page.locator('#multiplierDropdown [data-value="0.01"]').click();
	await expect(page.locator("#resistanceValue")).toHaveText(
		"Widerstand: 0.47Ω",
	);
	await page.locator("#toleranceSelect").click();
	await page.locator('#toleranceDropdown [data-value="0.05"]').click();
	await expect(page.locator("#toleranceValue")).toContainText("±5%");
});
test("three-phase switch, neutral wire and live voltage conversion", async ({
	page,
}) => {
	const errors: string[] = [];
	page.on("pageerror", (e) => errors.push(e.message));
	await page.goto("/Elektrotechnik/Drehstrom");
	await expect(page.locator("#outputVoltage")).toHaveValue("398.37");
	await page.locator("#inputVoltage").fill("230");
	await expect(page.locator("#outputVoltage")).toHaveValue("398.37");
	await page.getByLabel("Dreieckschaltung").check();
	await expect(page.locator("#circuitType")).toContainText("Dreieckschaltung");
	await expect(page.locator("#deltaCircuit")).toBeVisible();
	await page.getByLabel("Dreieckschaltung").uncheck();
	await page.locator("#neutralButton").click();
	await expect(page.locator("#starImage")).toHaveAttribute(
		"src",
		/Drehstrom_Stern_mit_NL/,
	);
	await page.locator("#neutralButton").click();
	await expect(page.locator("#starImage")).toHaveAttribute(
		"src",
		/Drehstrom_Stern_ohne_NL/,
	);
	expect(errors).toEqual([]);
});
test("qubit gates, superposition, measurement and custom state", async ({
	page,
}) => {
	const errors: string[] = [];
	page.on("pageerror", (e) => errors.push(e.message));
	await page.goto("/Allgemein/Qubit");
	await expect(page.locator(".page-body")).toHaveAttribute(
		"data-ready",
		"true",
	);
	await page.getByRole("button", { name: "X", exact: true }).click();
	await expect(page.locator("#state-prob")).toContainText("100.0%");
	await expect(page.locator("#state-dirac annotation")).toContainText("1");
	await page.getByRole("button", { name: "Reset", exact: true }).click();
	await expect(page.locator("#state-dirac annotation")).toContainText("0");
	await page.getByRole("button", { name: "H", exact: true }).click();
	await expect(page.locator("#state-prob")).toContainText("50.0%");
	await page.getByRole("button", { name: "Measure", exact: true }).click();
	await expect(page.locator("#state-prob")).toContainText("100.0%");
	const celebration = page.locator("#quantum-new-year");
	if (await celebration.isVisible()) {
		await celebration.locator("[data-ec-function=closeQuantumNewYear]").click();
		await expect(celebration).toHaveCount(0);
	}
	await page.locator("#theta-slider").fill("90");
	await page.locator("#phi-slider").fill("90");
	await page.getByRole("button", { name: "Set State", exact: true }).click();
	await expect(page.locator("#state-coords")).toContainText("90.0");
	expect(errors).toEqual([]);
});
test("glossary search and safe input boundary", async ({ page }) => {
	await page.goto("/HST/hst");
	await page.locator("#search").fill("FPGA");
	await expect(page.locator("tr:visible")).toHaveCount(1);
	await expect(page.locator("tr:visible")).toContainText("FPGA");
	await page.goto("/Elektrotechnik/Gleichstrom");
	await page.getByRole("button", { name: "Ohmsches Gesetz" }).click();
	await page.locator("#R").fill("0");
	await page.locator("#U").fill("12");
	await page.locator('[data-action="calculateParametersURI"]').click();
	await expect(page.getByRole("alert")).toContainText("positiven");
	await page
		.locator("#R")
		.fill('<img src=x onerror="document.body.innerHTML=123">');
	await page.locator('[data-action="calculateParametersURI"]').click();
	await expect(
		page.getByRole("heading", { name: "Gleichstrom", exact: true }),
	).toBeVisible();
	await expect(page.getByRole("alert")).toContainText("Zahlenwert");
});

test("original-style menu and topic bar work with pointer and keyboard", async ({
	page,
}) => {
	await page.goto("/Elektrotechnik/Gleichstrom/");
	await page.getByRole("button", { name: "Menü öffnen", exact: true }).click();
	const menu = page.getByRole("navigation", {
		name: "Fachbereiche",
		exact: true,
	});
	await expect(menu).toBeVisible();
	await menu.getByRole("link", { name: "Elektronik", exact: true }).click();
	await expect(page).toHaveURL(/\/Elektronik\/elektronik\/$/);
	await expect(menu).toBeHidden();
	await page.getByRole("button", { name: "Menü öffnen", exact: true }).click();
	await page.keyboard.press("Escape");
	await expect(menu).toBeHidden();
	await page
		.getByRole("navigation", { name: "Themen", exact: true })
		.getByRole("link", { name: "OPV", exact: true })
		.click();
	await expect(
		page.getByRole("heading", { name: "OPV", exact: true }),
	).toBeVisible();
});
