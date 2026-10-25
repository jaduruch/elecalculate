import { test, expect, type Page } from "@playwright/test";

const scenarios = [
	{
		name: "Ohm",
		file: "Elektrotechnik/Gleichstrom",
		action: "calculateParametersURI",
		values: { U: "12", R: "1k" },
		result: "result",
		golden: "12.000mA",
	},
	{
		name: "Unbelasteter Spannungsteiler",
		file: "Elektrotechnik/Gleichstrom",
		action: "calculateUnb_Spannungsteiler",
		values: { Uin_unb: "12", R1_unb: "1k", R2_unb: "2k" },
		result: "result_unb",
	},
	{
		name: "Belasteter Spannungsteiler",
		file: "Elektrotechnik/Gleichstrom",
		target: "belastet",
		action: "calculateBel_Spannungsteiler",
		values: { Uin_bel: "12", R1_bel: "1k", R2_bel: "2k", RL_bel: "4k" },
		result: "result_bel",
	},
	{
		name: "Kreis",
		file: "Allgemein/Mathe",
		action: "calculateKreis",
		values: { d: "2" },
		result: "result_Kreis",
	},
	{
		name: "Leitfähigkeit",
		file: "Allgemein/Werkstoffe",
		action: "calculateLeitfaehigkeit",
		values: { R: "1", l: "1", A: "1" },
		result: "result_Leiter",
	},
	{
		name: "Temperaturwiderstand",
		file: "Allgemein/Werkstoffe",
		action: "calculateTemperaturwiderstand",
		values: { Rk: "100", alpha: "0.004", T: "50" },
		result: "result_Temp",
	},
	{
		name: "Stromdichte",
		file: "Allgemein/Werkstoffe",
		action: "calculateStromdichte",
		values: { I_J: "10", A_J: "2" },
		result: "result_Stromd",
	},
	{
		name: "Kondensator",
		file: "Elektrotechnik/Kondensator",
		action: "calculateCapacitorParameters",
		values: { C: "100u", U: "10" },
		result: "result",
	},
	{
		name: "RC Serie",
		file: "Elektrotechnik/Kondensator",
		target: "Serie",
		action: "calculateSerieAC",
		values: { R_AC: "1k", C_AC: "100n", U_AC: "5", f_AC: "1k" },
		result: "result_Serie_AC",
	},
	{
		name: "RC Parallel",
		file: "Elektrotechnik/Kondensator",
		target: "Parallel",
		action: "calculateParallelAC",
		values: { G_ACp: "1m", Bc_ACp: "2m", U_ACp: "5" },
		result: "result_Parallel_AC",
	},
	{
		name: "RC Ladekurve",
		file: "Elektrotechnik/Kondensator",
		action: "calculateRC",
		values: { R_RC: "1k", C_RC: "100u", U_RC: "10", t_RC: "0.1" },
		result: "result_RC",
	},
	{
		name: "Spule",
		file: "Elektrotechnik/Spule",
		action: "calculateInductorParameters",
		values: { L: "10m", I: "1", N: "100" },
		result: "result",
	},
	{
		name: "RL Ladekurve",
		file: "Elektrotechnik/Spule",
		action: "calculateRL",
		values: { R_RL: "10", L_RL: "1", U_RL: "10", t_RL: "0.1" },
		result: "result_RL",
	},
	{
		name: "Magnetismus",
		file: "Elektrotechnik/Magnetismus",
		action: "calculateParameters",
		values: { I: "1", N: "100", l: "1" },
		result: "result",
	},
	{
		name: "Transformator",
		file: "Elektrotechnik/Transformator",
		action: "calculateParameters",
		values: { N1: "1000", N2: "100", U1: "230" },
		result: "result",
	},
	{
		name: "Verstärkung",
		file: "Elektrotechnik/Verstaerkung_Daempfung",
		action: "calculateParameters",
		values: { U1: "1", U2: "10" },
		result: "result",
	},
	{
		name: "RC Hochpass",
		file: "Elektrotechnik/Filter",
		target: "HP_RC",
		action: "calculate_HP_RC",
		values: { "R-HP_RC": "1k", "C-HP_RC": "100n" },
		result: "result_HP_RC",
	},
	{
		name: "RL Hochpass",
		file: "Elektrotechnik/Filter",
		target: "HP_RL",
		action: "calculate_HP_RL",
		values: { "R-HP_RL": "1k", "L-HP_RL": "10m" },
		result: "result_HP_RL",
	},
	{
		name: "RC Tiefpass",
		file: "Elektrotechnik/Filter",
		target: "TP_RC",
		action: "calculate_TP_RC",
		values: { "R-TP_RC": "1k", "C-TP_RC": "100n" },
		result: "result_TP_RC",
	},
	{
		name: "RL Tiefpass",
		file: "Elektrotechnik/Filter",
		target: "TP_RL",
		action: "calculate_TP_RL",
		values: { "R-TP_RL": "1k", "L-TP_RL": "10m" },
		result: "result_TP_RL",
	},
	{
		name: "Schwingkreis Serie",
		file: "Elektrotechnik/Schwingkreis",
		target: "serie",
		action: "calculateSerie",
		values: { "L-serie": "10m", "C-serie": "100n" },
		result: "result",
	},
	{
		name: "Schwingkreis Parallel",
		file: "Elektrotechnik/Schwingkreis",
		target: "parallel",
		action: "calculateParallel",
		values: { "L-parallel": "10m", "C-parallel": "100n" },
		result: "result_parallel",
	},
	{
		name: "OPV invertierend",
		file: "Elektronik/OPV",
		target: "invertierender_Verstaerker",
		action: "calculate_invertierender_Verstaerker",
		values: { "R1-1": "10k", "R2-1": "100k", "Uin-1": "0.1" },
		result: "result_invertierender_Verstaerker",
	},
	{
		name: "OPV nichtinvertierend",
		file: "Elektronik/OPV",
		target: "nicht_invertierender_Verstaerker",
		action: "calculate_nicht_invertierender_Verstaerker",
		values: { "R1-2": "10k", "R2-2": "100k", "Uin-2": "0.1" },
		result: "result_nicht_invertierender_Verstaerker",
	},
	{
		name: "OPV Summierer",
		file: "Elektronik/OPV",
		target: "summier_Verstaerker",
		action: "calculate_summier_Verstaeker",
		values: {
			"R11-3": "10k",
			"R12-3": "10k",
			"R2-3": "100k",
			"Uin1-3": "0.1",
			"Uin2-3": "0.2",
		},
		result: "result_summier_Verstaerker",
	},
	{
		name: "OPV Differenz",
		file: "Elektronik/OPV",
		target: "differenz_Verstaerker",
		action: "calculate_differenz_Verstaerker",
		values: {
			"R13-4": "10k",
			"R24-4": "100k",
			"Uin1-4": "0.1",
			"Uin2-4": "0.2",
		},
		result: "result_differenz_Verstaerker",
	},
	{
		name: "Transistor",
		file: "Elektronik/Transistor",
		action: "calculateTransistorAsSwitch",
		values: {
			USpeisung: "5",
			IC: "20m",
			B: "100",
			UBE: "0.7",
			UCE: "0.2",
			ue: "3",
		},
		result: "result",
	},
	{
		name: "Sinus",
		file: "Elektrotechnik/Wechselstrom",
		target: "Sinus",
		action: "calculate_Sinus",
		values: { "up-Sinus": "5", "f-Sinus": "1k", "phi-Sinus": "0" },
		result: "result_Sinus",
	},
	{
		name: "Rechteck",
		file: "Elektrotechnik/Wechselstrom",
		target: "Rechteck",
		action: "calculate_Rechteck",
		values: { "up-Rechteck": "5" },
		result: "result_Rechteck",
	},
	{
		name: "Dreieck",
		file: "Elektrotechnik/Wechselstrom",
		target: "Dreieck",
		action: "calculate_Dreieck",
		values: { "up-Dreieck": "5" },
		result: "result_Dreieck",
	},
	{
		name: "PWM",
		file: "Elektrotechnik/Wechselstrom",
		target: "PWM",
		action: "calculate_PWM",
		values: { "up-PWM": "5", "g-PWM": "50", "f-PWM": "1k" },
		result: "result_PWM",
	},
] as const;
async function setup(
	page: Page,
	s: (typeof scenarios)[number],
	original = false,
) {
	await page
		.locator(".dropdown-header")
		.evaluateAll((nodes) =>
			nodes.forEach((n) => n instanceof HTMLElement && n.click()),
		);
	if ("target" in s && s.target === "belastet") {
		await page.locator("#modeSwitch").check();
	} else if ("target" in s) {
		const selector = original
			? `[onclick*="'${s.target}'"]`
			: `[data-target="${s.target}"]`;
		await page.locator(selector).first().click();
	}
	for (const [id, value] of Object.entries(s.values))
		await page.locator('[id="' + id + '"]').fill(value);
	const calculateButton = page.locator(
		original ? `[onclick="${s.action}()"]` : `[data-action="${s.action}"]`,
	);
	// The old mobile layout can overlap its own button. Its numeric reference
	// invokes that button directly; the migrated UI always receives a real click.
	if (original)
		await calculateButton.evaluate((node) => (node as HTMLElement).click());
	else await calculateButton.click();
	const output = page.locator('[id="' + s.result + '"]');
	await expect(output).not.toBeEmpty();
	return (
		await output.evaluate((element) => {
			const clone = element.cloneNode(true) as HTMLElement;
			clone.querySelectorAll(".katex").forEach((node) => {
				const tex = node.querySelector("annotation")?.textContent ?? "";
				node.replaceWith("\\[" + tex + "\\]");
			});
			return clone.textContent ?? "";
		})
	)
		.replace(/\s+/g, " ")
		.trim();
}

const expected: Record<string, { key: string; value: number }> = {
	Ohm: { key: "I", value: 0.012 },
	"Unbelasteter Spannungsteiler": { key: "Uout", value: 8 },
	"Belasteter Spannungsteiler": { key: "Uout", value: 48 / 7 },
	Kreis: { key: "A", value: Math.PI },
	Leitfähigkeit: { key: "p", value: 1 },
	Temperaturwiderstand: { key: "Rw", value: 120 },
	Stromdichte: { key: "J", value: 5 },
	Kondensator: { key: "Q", value: 0.001 },
	"RC Serie": { key: "Xc", value: 1 / (2 * Math.PI * 1000 * 1e-7) },
	"RC Parallel": { key: "Y", value: Math.hypot(0.001, 0.002) },
	"RC Ladekurve": { key: "Ut", value: 10 * (1 - Math.exp(-1)) },
	Spule: { key: "Phi", value: 0.0001 },
	"RL Ladekurve": { key: "It", value: 1 - Math.exp(-1) },
	Magnetismus: { key: "H", value: 100 },
	Transformator: { key: "U2", value: 23 },
	Verstärkung: { key: "g", value: 20 },
	"RC Hochpass": { key: "fg", value: 1 / (2 * Math.PI * 1000 * 1e-7) },
	"RC Tiefpass": { key: "fg", value: 1 / (2 * Math.PI * 1000 * 1e-7) },
	"RL Hochpass": { key: "fg", value: 1000 / (2 * Math.PI * 0.01) },
	"RL Tiefpass": { key: "fg", value: 1000 / (2 * Math.PI * 0.01) },
	"Schwingkreis Serie": {
		key: "fr",
		value: 1 / (2 * Math.PI * Math.sqrt(0.01 * 1e-7)),
	},
	"Schwingkreis Parallel": {
		key: "fr",
		value: 1 / (2 * Math.PI * Math.sqrt(0.01 * 1e-7)),
	},
	"OPV invertierend": { key: "Uout", value: -1 },
	"OPV nichtinvertierend": { key: "Uout", value: 1.1 },
	"OPV Summierer": { key: "Uout", value: -3 },
	"OPV Differenz": { key: "Uout", value: 1 },
	Transistor: { key: "RL", value: 240 },
	Sinus: { key: "Ueff", value: 5 / Math.SQRT2 },
	Rechteck: { key: "Ueff", value: 5 },
	Dreieck: { key: "Ueff", value: 5 / Math.sqrt(3) },
	PWM: { key: "Ueff", value: 5 / Math.SQRT2 },
};
for (const scenario of scenarios)
	test(scenario.name, async ({ page }) => {
		const errors: string[] = [];
		page.on("pageerror", (e) => errors.push(e.message));
		await page.goto("/" + scenario.file);
		await expect(page.locator(".page-body")).toHaveAttribute(
			"data-ready",
			"true",
		);
		const text = await setup(page, scenario);
		expect(text).not.toMatch(/NaN|Infinity/);
		await expect(page.getByRole("alert")).toHaveCount(0);
		const reference = expected[scenario.name];
		const reading = page.locator(
			'[id="' +
				scenario.result +
				'"] [data-result-key="' +
				reference.key +
				'"]',
		);
		await expect(reading).toHaveCount(1);
		const value = Number(await reading.getAttribute("data-result-value"));
		expect(value).toBeCloseTo(reference.value, 8);
		expect(errors).toEqual([]);
	});
