import { test, expect } from "@playwright/test";
test("rendered home, calculator and Qubit views", async ({ page }, info) => {
	await page.goto("/");
	await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
	await page.evaluate(() => window.scrollTo(0, 0));
	await page.screenshot({
		path: `test-results/home-${info.project.name}.png`,
		fullPage: true,
	});
	expect(
		await page.evaluate(
			() => document.documentElement.scrollWidth <= innerWidth,
		),
	).toBe(true);
	await page.goto("/Elektrotechnik/Gleichstrom");
	await page.getByRole("button", { name: "Ohmsches Gesetz" }).click();
	await page.locator("#U").fill("12");
	await page.locator("#R").fill("1k");
	await page.locator('[data-action="calculateParametersURI"]').click();
	await expect(page.locator('#result [data-result-key="I"]')).toHaveAttribute(
		"data-result-value",
		"0.012",
	);
	await page.evaluate(() => window.scrollTo(0, 0));
	await page.screenshot({
		path: `test-results/calculator-${info.project.name}.png`,
		fullPage: true,
	});
	expect(
		await page.evaluate(
			() => document.documentElement.scrollWidth <= innerWidth,
		),
	).toBe(true);
	await page.goto("/Allgemein/Qubit");
	await expect(page.locator(".page-body")).toHaveAttribute(
		"data-ready",
		"true",
	);
	await page.evaluate(() => window.scrollTo(0, 0));
	await page.screenshot({
		path: `test-results/qubit-${info.project.name}.png`,
		fullPage: true,
	});
	expect(
		await page.evaluate(
			() => document.documentElement.scrollWidth <= innerWidth,
		),
	).toBe(true);
});
