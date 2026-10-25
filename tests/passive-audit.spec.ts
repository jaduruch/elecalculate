import { test, expect, type Page } from "@playwright/test";
async function open(page: Page, route: string) {
	await page.goto(route);
	await expect(page.locator(".page-body")).toHaveAttribute(
		"data-ready",
		"true",
	);
	await page
		.locator(".dropdown-header")
		.evaluateAll((nodes) => nodes.forEach((n) => (n as HTMLElement).click()));
}
async function fill(page: Page, values: Record<string, string>) {
	for (const [id, value] of Object.entries(values))
		await page.locator('[id="' + id + '"]').fill(value);
}
async function numeric(
	page: Page,
	container: string,
	key: string,
	value: number,
) {
	const row = page.locator(`[id="${container}"] [data-result-key="${key}"]`);
	await expect(row).toBeVisible();
	const n = Number(await row.getAttribute("data-result-value"));
	expect(Math.abs(n - value)).toBeLessThanOrEqual(
		Math.max(1e-15, Math.abs(value) * 1e-8),
	);
}
test("base capacitor, inductor, magnetism and lossy transformer physical values", async ({
	page,
}) => {
	await open(page, "/Elektrotechnik/Kondensator/");
	await fill(page, { C: "100u", U: "10" });
	await page.locator('[data-action="calculateCapacitorParameters"]').click();
	await numeric(page, "result", "Q", 0.001);
	await numeric(page, "result", "W", 0.005);
	await open(page, "/Elektrotechnik/Spule/");
	await fill(page, { L: "10m", I: "1", N: "100" });
	await page.locator('[data-action="calculateInductorParameters"]').click();
	await numeric(page, "result", "Phi", 0.0001);
	await open(page, "/Elektrotechnik/Magnetismus/");
	await fill(page, { I: "2", N: "100", l: ".1", ur: "100", A: "1e-3" });
	await page.locator('[data-action="calculateParameters"]').click();
	await numeric(page, "result", "Theta", 200);
	await numeric(page, "result", "H", 2000);
	await open(page, "/Elektrotechnik/Transformator/");
	await fill(page, { U1: "100", U2: "10", I1: "1", eta: ".8" });
	await page.locator('[data-action="calculateParameters"]').click();
	await numeric(page, "result", "I2", 8);
	await numeric(page, "result", "P2", 80);
});
test("RC transient derives tau and obeys charging/discharging current signs", async ({
	page,
}) => {
	await open(page, "/Elektrotechnik/Kondensator/");
	await fill(page, { R_RC: "1k", C_RC: "100u", U_RC: "10", t_RC: ".1" });
	await page.locator('[data-action="calculateRC"]').click();
	await numeric(page, "result_RC", "tau", 0.1);
	await numeric(page, "result_RC", "Ut", 10 * (1 - Math.exp(-1)));
	await numeric(page, "result_RC", "It", 0.01 * Math.exp(-1));
	await page.locator("#modeSwitch").check();
	await page.locator('[data-action="calculateRC"]').click();
	await numeric(page, "result_RC", "Ut", 10 * Math.exp(-1));
	await numeric(page, "result_RC", "It", -0.01 * Math.exp(-1));
});
test("RL transient keeps t=0 and correctly changes voltage sign while discharging", async ({
	page,
}) => {
	await open(page, "/Elektrotechnik/Spule/");
	await fill(page, { R_RL: "10", L_RL: "1", U_RL: "10", t_RL: "0" });
	await page.locator('[data-action="calculateRL"]').click();
	await numeric(page, "result_RL", "It", 0);
	await numeric(page, "result_RL", "Ut", 10);
	await page.locator("#modeSwitch").check();
	await page.locator("#t_RL").fill(".1");
	await page.locator('[data-action="calculateRL"]').click();
	await numeric(page, "result_RL", "It", Math.exp(-1));
	await numeric(page, "result_RL", "Ut", -10 * Math.exp(-1));
});
test("series RC phasors use solved values, expose keyboard controls and export opaque PNG", async ({
	page,
}) => {
	await open(page, "/Elektrotechnik/Kondensator/");
	await page.locator('[data-target="Serie"]').click();
	await fill(page, { R_AC: "1k", C_AC: "100n", f_AC: "1k", U_AC: "5" });
	await page.locator('[data-action="calculateSerieAC"]').click();
	const xc = 1 / (2 * Math.PI * 1000 * 100e-9),
		z = Math.hypot(1000, xc);
	await numeric(page, "result_Serie_AC", "Z", z);
	await numeric(page, "result_Serie_AC", "I", 5 / z);
	await expect(page.locator("#phasorCanvasImpedance")).toHaveAttribute(
		"data-phasor-real",
		"1000",
	);
	await expect(page.locator("#phasorCanvasVoltage")).toHaveAttribute(
		"data-phasor-magnitude",
		"5",
	);
	await expect(page.locator("#phasorCanvasImpedance")).toHaveAttribute(
		"data-phasor-example",
		"false",
	);
	const button = page.getByRole("button", {
		name: "Widerstandsdreieck: Werte ausblenden",
		exact: true,
	});
	await button.focus();
	await page.keyboard.press("Enter");
	await expect(
		page.getByRole("button", {
			name: "Widerstandsdreieck: Werte anzeigen",
			exact: true,
		}),
	).toHaveAttribute("aria-pressed", "false");
	const download = page.waitForEvent("download");
	await page
		.getByRole("button", {
			name: "Widerstandsdreieck als PNG herunterladen",
			exact: true,
		})
		.click();
	expect((await download).suggestedFilename()).toMatch(/\.png$/);
	expect(
		await page.locator("#phasorCanvasImpedance").evaluate((node) => {
			const c = node as HTMLCanvasElement;
			const data = c
				.getContext("2d")!
				.getImageData(0, 0, c.width, c.height).data;
			for (let i = 3; i < data.length; i += 4)
				if (data[i] !== 255) return false;
			return true;
		}),
	).toBe(true);
});
test("zero-excitation series/parallel phasors never invent example currents or voltages", async ({
	page,
}) => {
	await open(page, "/Elektrotechnik/Kondensator/");
	await page.locator('[data-target="Serie"]').click();
	await fill(page, { R_AC: "1k", C_AC: "100n", f_AC: "1k", U_AC: "0" });
	await page.locator('[data-action="calculateSerieAC"]').click();
	await numeric(page, "result_Serie_AC", "I", 0);
	await expect(page.locator("#phasorCanvasVoltage")).toHaveAttribute(
		"data-phasor-state",
		"zero",
	);
	await expect(page.locator("#phasorCanvasVoltage")).toHaveAttribute(
		"data-phasor-example",
		"false",
	);
	await page.locator('[data-target="Parallel"]').click();
	await fill(page, { G_ACp: "1m", Bc_ACp: "2m", U_ACp: "0" });
	await page.locator('[data-action="calculateParallelAC"]').click();
	await numeric(page, "result_Parallel_AC", "I", 0);
	await expect(page.locator("#phasorCanvasCurrent")).toHaveAttribute(
		"data-phasor-state",
		"zero",
	);
});
test("pure capacitive series branch accepts zero real resistance", async ({
	page,
}) => {
	await open(page, "/Elektrotechnik/Kondensator/");
	await page.locator('[data-target="Serie"]').click();
	await fill(page, { R_AC: "0", C_AC: "100n", f_AC: "1k", U_AC: "5" });
	await page.locator('[data-action="calculateSerieAC"]').click();
	await numeric(page, "result_Serie_AC", "R", 0);
	await numeric(page, "result_Serie_AC", "phi", Math.PI / 2);
});
