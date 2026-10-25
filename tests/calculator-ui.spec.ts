import { expect, test } from "@playwright/test";

test("narrow calculator fields keep readable labels, units and action buttons", async ({
	page,
}) => {
	await page.setViewportSize({ width: 320, height: 900 });
	await page.goto("/Elektrotechnik/Gleichstrom");
	await page.getByRole("button", { name: "Ohmsches Gesetz" }).click();
	const voltage = page.locator("#U");
	await expect(voltage).toHaveCSS("font-size", "16px");
	const row = voltage.locator("..");
	const labelBox = await row.locator("label").first().boundingBox();
	const fieldBox = await voltage.boundingBox();
	expect(labelBox).not.toBeNull();
	expect(fieldBox).not.toBeNull();
	expect(labelBox!.y + labelBox!.height).toBeLessThanOrEqual(fieldBox!.y);
	const calculate = page.locator('[data-action="calculateParametersURI"]');
	const actionBox = await calculate.boundingBox();
	expect(actionBox!.height).toBeGreaterThanOrEqual(44);
	expect(
		await calculate.evaluate((el) => el.scrollWidth <= el.clientWidth),
	).toBe(true);
	await voltage.fill("12");
	await page.locator("#R").fill("1k");
	await calculate.click();
	await expect(page.locator('#result [data-result-key="I"]')).toHaveAttribute(
		"data-result-value",
		"0.012",
	);
	await expect(page.locator("#result")).toHaveCSS("font-size", "14px");
});

test("narrow Qubit results and explanatory maths stay within their panels", async ({
	page,
}) => {
	await page.setViewportSize({ width: 320, height: 900 });
	await page.goto("/Allgemein/Qubit");
	await expect(page.locator(".page-body")).toHaveAttribute(
		"data-ready",
		"true",
	);
	await page.getByRole("button", { name: "H", exact: true }).click();
	await expect(page.locator("#state-prob")).toContainText("50.0%");
	const state = await page.locator(".state-line").evaluateAll((nodes) =>
		nodes.map((el) => {
			const panel = el.closest(".state-display")!.getBoundingClientRect();
			const rect = el.getBoundingClientRect();
			return {
				inside: rect.left >= panel.left && rect.right <= panel.right,
				clippedVertically: el.scrollHeight > el.clientHeight + 1,
			};
		}),
	);
	expect(state.every((line) => line.inside && !line.clippedVertically)).toBe(
		true,
	);
	await page.getByRole("button", { name: "What is a Qubit?" }).click();
	expect(
		await page.evaluate(
			() => document.documentElement.scrollWidth <= innerWidth,
		),
	).toBe(true);
	expect(
		await page
			.getByRole("button", { name: "H", exact: true })
			.evaluate((el) => el.getBoundingClientRect().height),
	).toBeGreaterThanOrEqual(44);
});

test("long C examples wrap on narrow screens and remain readable", async ({
	page,
}) => {
	await page.setViewportSize({ width: 320, height: 900 });
	await page.goto("/HST/C_Syntax");
	await expect(page.locator(".page-body")).toHaveAttribute(
		"data-ready",
		"true",
	);
	await page
		.locator(".dropdown-header")
		.evaluateAll((nodes) => nodes.forEach((el) => (el as HTMLElement).click()));
	const blocks = await page
		.locator(".code-block")
		.evaluateAll((nodes) =>
			nodes.map((el) => ({
				whiteSpace: getComputedStyle(el).whiteSpace,
				scrollWidth: el.scrollWidth,
				clientWidth: el.clientWidth,
			})),
		);
	expect(blocks.length).toBeGreaterThan(0);
	expect(
		blocks.every(
			(block) =>
				block.whiteSpace === "pre-wrap" &&
				block.scrollWidth <= block.clientWidth + 1,
		),
	).toBe(true);
});
