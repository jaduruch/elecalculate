import { test, expect } from "@playwright/test";

test("the current topic stays visible on direct visits and route changes", async ({
	page,
}) => {
	await page.goto("/Elektrotechnik/Drehstrom_Simulator/");
	const strip = page.getByRole("navigation", { name: "Themen", exact: true });
	const current = strip.locator('[aria-current="page"]');
	await expect(current).toHaveText("Dreiphasen-Generator Simulation");
	await expect
		.poll(async () => {
			const bar = await strip.boundingBox();
			const item = await current.boundingBox();
			return (
				!!bar &&
				!!item &&
				item.x >= bar.x - 1 &&
				item.x + item.width <= bar.x + bar.width + 1
			);
		})
		.toBe(true);
	await page.getByRole("button", { name: "Menü öffnen", exact: true }).click();
	await page.locator("#topic-search").fill("Qubit");
	await page
		.locator(".menu-search-results")
		.getByRole("link", { name: "Qubit Demonstration", exact: true })
		.click();
	await expect(
		page.getByRole("navigation", { name: "Fachbereiche", exact: true }),
	).toBeHidden();
	await expect(current).toHaveText("Qubit Demonstration");
	await expect
		.poll(async () => {
			const bar = await strip.boundingBox();
			const item = await current.boundingBox();
			return (
				!!bar &&
				!!item &&
				item.x >= bar.x - 1 &&
				item.x + item.width <= bar.x + bar.width + 1
			);
		})
		.toBe(true);
});

test("category search explains empty results and keeps keyboard focus in the open menu", async ({
	page,
}) => {
	await page.goto("/");
	const toggle = page.getByRole("button", { name: "Menü öffnen", exact: true });
	await expect
		.poll(async () => (await toggle.boundingBox())?.width)
		.toBeGreaterThanOrEqual(44);
	await toggle.click();
	const search = page.getByRole("searchbox", { name: "Thema suchen" });
	await search.fill("zzzzxyz");
	await expect(page.locator(".menu-search-status")).toHaveText(
		"Keine Themen gefunden.",
	);
	await expect(page.locator(".menu-search-results a")).toHaveCount(0);
	await expect(page.locator("body")).toHaveCSS("overflow", "hidden");
	await expect(page.locator(".site")).toHaveAttribute("inert", "");
	await expect(page.locator(".topic-strip")).toHaveAttribute("inert", "");
	await page.keyboard.press("Tab");
	await expect(
		page.getByRole("button", { name: "Menü schließen", exact: true }).first(),
	).toBeFocused();
	await page.keyboard.press("Tab");
	await expect(
		page
			.getByRole("navigation", { name: "Fachbereiche", exact: true })
			.getByRole("link", { name: "Home", exact: true }),
	).toBeFocused();
	await page.keyboard.press("Shift+Tab");
	await expect(
		page.getByRole("button", { name: "Menü schließen", exact: true }).first(),
	).toBeFocused();
	await page.keyboard.press("Escape");
	await expect(toggle).toBeFocused();
	await expect(
		page.getByRole("navigation", { name: "Fachbereiche", exact: true }),
	).toBeHidden();
	expect(
		await page.locator("body").evaluate((element) => element.style.overflow),
	).toBe("");
	await toggle.click();
	await search.fill("  Qubit  ");
	await expect(page.locator(".menu-search-status")).toHaveText(
		"1 Thema gefunden",
	);
	await expect(page.locator(".menu-search-results a")).toHaveCount(1);
});
