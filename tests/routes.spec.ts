import { test, expect } from "@playwright/test";
import { catalog } from "../src/lib/catalog";
for (const entry of catalog)
	test(entry.file, async ({ page }) => {
		const errors: string[] = [];
		page.on("pageerror", (e) => errors.push(e.message));
		await page.goto("/" + entry.file.replace(".html", ""));
		await expect(page.locator(".page-body")).toHaveAttribute(
			"data-ready",
			"true",
		);
		await expect(page.locator("h1").first()).toContainText(entry.title);
		await expect(page.locator(".page-body input")).toHaveCount(entry.inputs);
		if (entry.canvases > 0)
			expect(
				await page.locator(".page-body canvas").count(),
			).toBeGreaterThanOrEqual(entry.canvases);
		expect(errors).toEqual([]);
		await expect
			.poll(() =>
				page
					.locator(".page-body img")
					.evaluateAll((images) =>
						images
							.filter(
								(image) =>
									!(image as HTMLImageElement).complete ||
									!(image as HTMLImageElement).naturalWidth,
							)
							.map((image) => image.getAttribute("src")),
					),
			)
			.toEqual([]);
		expect(
			await page.evaluate(
				() => document.documentElement.scrollWidth <= window.innerWidth,
			),
		).toBe(true);
	});
