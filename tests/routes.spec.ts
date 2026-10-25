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
		const duplicateIds = await page.locator("[id]").evaluateAll((nodes) => {
			const counts = new Map<string, number>();
			for (const node of nodes)
				counts.set(node.id, (counts.get(node.id) ?? 0) + 1);
			return Array.from(counts)
				.filter(([, count]) => count > 1)
				.map(([id]) => id);
		});
		expect(duplicateIds).toEqual([]);
		// Visible field labels are actual controls, and units remain available to
		// assistive technology rather than being disconnected decorative labels.
		const fieldLabels = await page
			.locator(".page-body .form-row")
			.evaluateAll((rows) =>
				rows.flatMap((row) => {
					const fields = row.querySelectorAll(
						":scope > input, :scope > select, :scope > textarea",
					);
					const label = row.querySelector<HTMLLabelElement>(":scope > label");
					if (
						fields.length !== 1 ||
						!label ||
						!(fields[0] as HTMLInputElement).id
					)
						return [];
					return label.control === fields[0]
						? []
						: [(fields[0] as HTMLInputElement).id];
				}),
			);
		expect(fieldLabels).toEqual([]);

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
