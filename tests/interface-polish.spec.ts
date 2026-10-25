import { test, expect } from "@playwright/test";
import { catalog } from "../src/lib/catalog";

test("topic links use decorative vector chevrons and retain their names", async ({
	page,
}) => {
	await page.goto("/");
	const links = page.locator(".department-list li a");
	await expect(links).toHaveCount(catalog.length);
	await expect(
		links.locator("svg[aria-hidden=true][focusable=false]"),
	).toHaveCount(catalog.length);
	expect(await links.allTextContents()).not.toEqual(
		expect.arrayContaining([
			expect.stringMatching(/\p{Extended_Pictographic}/u),
		]),
	);
	await expect(
		page.getByRole("link", { name: "Aktive Filter", exact: true }).first(),
	).toBeVisible();
	await links.filter({ hasText: "Gleichstrom" }).click();
	const accordion = page.getByRole("button", {
		name: "Ohmsches Gesetz (URI)",
		exact: true,
	});
	await expect(accordion.locator(".arrow svg")).toHaveCount(1);
	await accordion.click();
	await expect(accordion).toHaveAttribute("aria-expanded", "true");
	await expect(accordion.locator(".arrow")).toHaveCSS(
		"transform",
		"matrix(-1, 0, 0, -1, 0, 0)",
	);
	await accordion.click();
	await expect(accordion).toHaveAttribute("aria-expanded", "false");
});

test("measurement stays in the simulator even during the former holiday season", async ({
	page,
}) => {
	await page.clock.setFixedTime(new Date("2027-01-01T12:00:00Z"));
	await page.addInitScript(() => {
		Math.random = () => 0.75;
	});
	await page.goto("/Allgemein/Qubit");
	await expect(page.locator(".page-body")).toHaveAttribute(
		"data-ready",
		"true",
	);
	await expect(page.locator("#easter-egg-hint")).toHaveCount(0);
	await page.getByRole("button", { name: "H", exact: true }).click();
	await expect(page.locator("#state-prob")).toContainText("50.0%");
	await page.getByRole("button", { name: "Measure", exact: true }).click();
	await expect(page.locator("#state-dirac annotation")).toContainText("1");
	await expect(
		page.getByRole("button", { name: "Reset", exact: true }),
	).toBeEnabled();
	await expect(page.locator("#quantum-new-year")).toHaveCount(0);
	await expect(page.locator('body > div[style*="z-index: 9999"]')).toHaveCount(
		0,
	);
});
