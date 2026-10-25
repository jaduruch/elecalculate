import { test, expect, type Page } from "@playwright/test";
async function save(page: Page, title: string) {
	await page.getByRole("button", { name: "Werte merken", exact: true }).click();
	await page.getByLabel("Name", { exact: true }).fill(title);
	await page.getByRole("button", { name: "Speichern", exact: true }).click();
	await expect(page.locator(".save-status")).toContainText("gespeichert", {
		timeout: 25000,
	});
}
test("waveform unit switches preserve physical phase and duty, including saved modes", async ({
	page,
}) => {
	test.setTimeout(60000);
	await page.goto("/Elektrotechnik/Wechselstrom/");
	await page.locator("[data-target=Sinus]").click();
	await page.locator("#up-Sinus").fill("5");
	await page.locator("#f-Sinus").fill("1k");
	await page.locator("#phi-Sinus").fill(String(Math.PI / 2));
	await page.locator("#Rad-Button").click();
	expect(Number(await page.locator("#phi-Sinus").inputValue())).toBeCloseTo(
		90,
		10,
	);
	await save(page, "Phase in Grad");
	await page.getByRole("link", { name: "Notizbuch", exact: true }).click();
	await page.getByRole("link", { name: "Phase in Grad", exact: true }).click();
	await expect(page.locator("#Rad-Button")).toContainText("360");
	await expect(page.locator("#phi-Sinus")).toHaveValue("90");
	await page.locator("[data-action=calculate_Sinus]").click();
	expect(
		Number(
			await page
				.locator("#result_Sinus [data-result-key=phi]")
				.getAttribute("data-result-value"),
		),
	).toBeCloseTo(Math.PI / 2, 10);
	await page.locator("[data-target=PWM]").click();
	await page.locator("#up-PWM").fill("5");
	await page.locator("#g-PWM").fill("50");
	await page.locator("#Duty-Button").click();
	await expect(page.locator("#g-PWM")).toHaveValue("0.5");
	await page.locator("[data-action=calculate_PWM]").click();
	expect(
		Number(
			await page
				.locator("#result_PWM [data-result-key=Ueff]")
				.getAttribute("data-result-value"),
		),
	).toBeCloseTo(5 / Math.SQRT2, 10);
});
test("Qubit notebook preserves actual gate state and pause, not stale slider defaults", async ({
	page,
}) => {
	test.setTimeout(60000);
	await page.goto("/Allgemein/Qubit/");
	await expect(page.locator(".page-body")).toHaveAttribute(
		"data-ready",
		"true",
	);
	await page.getByRole("button", { name: "H", exact: true }).click();
	await expect(
		page.getByRole("button", { name: "Measure", exact: true }),
	).toBeEnabled();
	await expect(page.locator("#theta-slider")).toHaveValue("90");
	await page
		.getByRole("button", { name: "Animation pausieren", exact: true })
		.click();
	await save(page, "Superposition pausiert");
	await page.getByRole("link", { name: "Notizbuch", exact: true }).click();
	await page
		.getByRole("link", { name: "Superposition pausiert", exact: true })
		.click();
	await expect(page.locator("#state-prob")).toContainText("50.0%");
	await expect(page.locator("#theta-slider")).toHaveValue("90");
	await expect(
		page.getByRole("button", { name: "Animation fortsetzen", exact: true }),
	).toHaveAttribute("aria-pressed", "true");
});
test("phase simulation honours reduced motion, uses actual voltage sum and preserves toggles", async ({
	page,
}) => {
	await page.emulateMedia({ reducedMotion: "reduce" });
	await page.goto("/Elektrotechnik/Drehstrom_Simulator/");
	await expect(
		page.getByRole("button", { name: "Animation fortsetzen", exact: true }),
	).toHaveAttribute("aria-pressed", "true");
	const balanced = await page.locator("#phaseCanvas").evaluate((node) => {
		const canvas = node as HTMLCanvasElement;
		const data = canvas
			.getContext("2d")!
			.getImageData(40, canvas.height / 2 - 1, canvas.width - 80, 2).data;
		let white = 0;
		for (let i = 0; i < data.length; i += 4)
			if (data[i] > 180 && data[i + 1] > 180 && data[i + 2] > 180) white++;
		return white;
	});
	expect(balanced).toBeGreaterThan(300);
	await page
		.getByRole("button", { name: "Rote Phase ein/aus", exact: true })
		.click();
	await expect(
		page.getByRole("button", { name: "Rote Phase ein/aus", exact: true }),
	).toHaveAttribute("aria-pressed", "false");
	await save(page, "Zwei Phasen");
	await page.getByRole("link", { name: "Notizbuch", exact: true }).click();
	await page.getByRole("link", { name: "Zwei Phasen", exact: true }).click();
	await expect(
		page.getByRole("button", { name: "Rote Phase ein/aus", exact: true }),
	).toHaveAttribute("aria-pressed", "false");
});
test("invalid saved-entry links show a useful error while the calculator stays usable", async ({
	page,
}) => {
	await page.goto("/Elektrotechnik/Gleichstrom/?notiz=not-a-valid-id");
	await expect(page.getByRole("alert")).toBeVisible();
	await page
		.getByRole("button", { name: "Ohmsches Gesetz", exact: false })
		.click();
	await page.locator("#U").fill("12");
	await page.locator("#R").fill("1k");
	await page.locator("[data-action=calculateParametersURI]").click();
	await expect(page.locator("#result [data-result-key=I]")).toHaveAttribute(
		"data-result-value",
		"0.012",
	);
});

test("near-basis quantum states are displayed as approximations rather than falsely exact basis vectors", async ({
	page,
}) => {
	await page.goto("/Allgemein/Qubit/");
	await expect(page.locator(".page-body")).toHaveAttribute(
		"data-ready",
		"true",
	);
	await page.locator("#theta-slider").fill("89");
	await page.locator("#phi-slider").fill("0");
	await page.getByRole("button", { name: "Set State", exact: true }).click();
	await expect(
		page.getByRole("button", { name: "Measure", exact: true }),
	).toBeEnabled();
	await expect(page.locator("#state-dirac annotation")).toContainText("approx");
	await expect(page.locator("#state-dirac annotation")).not.toContainText("|+");
});
