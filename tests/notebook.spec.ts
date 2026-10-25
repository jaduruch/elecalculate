import { test, expect } from "@playwright/test";
// A first PostgreSQL initialization has a 45-second application deadline.
// Assertions await that public lifecycle instead of treating default UI as loaded.
const NOTEBOOK_STARTUP_TIMEOUT = 45000;
test.setTimeout(60000);
async function expectRestored(page: import("@playwright/test").Page) {
	await expect(page.locator(".page-body")).toHaveAttribute(
		"data-restoring",
		"false",
		{ timeout: NOTEBOOK_STARTUP_TIMEOUT },
	);
}

test("Drizzle PostgreSQL notebook saves, reloads, restores and undoes removal", async ({
	page,
	context,
}) => {
	test.setTimeout(60000);
	const errors: string[] = [];
	page.on("pageerror", (e) => errors.push(e.message));
	await page.goto("/Elektrotechnik/Gleichstrom");
	await page.getByRole("button", { name: "Ohmsches Gesetz" }).click();
	await page.locator("#R").fill("2.2k");
	await page.locator("#U").fill("24");
	await page.getByRole("button", { name: "Werte merken" }).click();
	await page.getByLabel("Name", { exact: true }).fill("Versuch mit 24 V");
	await page.getByLabel("Notiz", { exact: true }).fill("Widerstand 2.2 kΩ");
	await page.getByRole("button", { name: "Speichern", exact: true }).click();
	await expect(page.locator(".save-status")).toContainText("gespeichert", {
		timeout: NOTEBOOK_STARTUP_TIMEOUT,
	});
	await page.getByRole("link", { name: "Notizbuch", exact: true }).click();
	await expect(
		page.getByRole("link", { name: "Versuch mit 24 V" }),
	).toBeVisible({ timeout: 15000 });
	await page.reload();
	await expect(
		page.getByRole("link", { name: "Versuch mit 24 V" }),
	).toBeVisible({ timeout: 15000 });
	const second = await context.newPage();
	await second.goto("/notizbuch");
	await expect(
		second.getByRole("link", { name: "Versuch mit 24 V" }),
	).toBeVisible({ timeout: 20000 });
	await second.close();
	await page.getByRole("link", { name: "Eingaben laden" }).click();
	await expectRestored(page);
	await expect(page.locator("#R")).toBeVisible();
	await expect(page.locator("#R")).toHaveValue("2.2k", {
		timeout: NOTEBOOK_STARTUP_TIMEOUT,
	});
	await expect(page.locator("#U")).toHaveValue("24");
	await page.getByRole("link", { name: "Notizbuch", exact: true }).click();
	await page.getByRole("button", { name: "Entfernen", exact: true }).click();
	await expect(
		page.getByRole("link", { name: "Versuch mit 24 V" }),
	).toHaveCount(0);
	await page.getByRole("button", { name: "Rückgängig" }).click();
	await expect(
		page.getByRole("link", { name: "Versuch mit 24 V" }),
	).toBeVisible();
	expect(errors).toEqual([]);
});

async function saveCurrent(
	page: import("@playwright/test").Page,
	title: string,
) {
	await page.getByRole("button", { name: "Werte merken", exact: true }).click();
	await page.getByLabel("Name", { exact: true }).fill(title);
	await page.getByRole("button", { name: "Speichern", exact: true }).click();
	await expect(page.locator(".save-status")).toContainText("gespeichert", {
		timeout: NOTEBOOK_STARTUP_TIMEOUT,
	});
}

test("saved resistor colours restore both controls and computed resistance", async ({
	page,
}) => {
	await page.goto("/Allgemein/Widerstandstabelle/");
	await page.locator("#band1Select").click();
	await page.locator('#band1Dropdown [data-value="4"]').click();
	await page.locator("#band2Select").click();
	await page.locator('#band2Dropdown [data-value="7"]').click();
	await page.locator("#multiplierSelect").click();
	await page.locator('#multiplierDropdown [data-value="100"]').click();
	await saveCurrent(page, "Farbringe 4.7 kΩ");
	await page.getByRole("link", { name: "Notizbuch", exact: true }).click();
	await page.getByRole("link", { name: "Eingaben laden", exact: true }).click();
	await expectRestored(page);
	await expect(page.locator("#resistanceValue")).toContainText("4700");
	await expect(page.locator("#band1Select")).toContainText("Gelb");
	await expect(page.locator("#band2Select")).toContainText("Violett");
});

test("saved three-phase configuration restores neutral and symmetry toggles", async ({
	page,
}) => {
	await page.goto("/Elektrotechnik/Drehstrom/");
	await page.locator("#neutralButton").click();
	await page.locator("#symmetryButtonStar").click();
	await page.locator("#inputVoltage").fill("120");
	await saveCurrent(page, "Stern mit Neutralleiter");
	await page.getByRole("link", { name: "Notizbuch", exact: true }).click();
	await page.getByRole("link", { name: "Eingaben laden", exact: true }).click();
	await expectRestored(page);
	await expect(page.locator("#neutralButton")).toContainText("Entfernen");
	await expect(page.locator("#starImage")).toHaveAttribute(
		"src",
		/Drehstrom_Stern_mit_NL/,
	);
	await expect(page.locator("#symmetryButtonStar")).toContainText(
		"Asymmetrisch",
	);
	await expect(page.locator("#inputVoltage")).toHaveValue("120");
});

test("notebook updates in an already-open second tab after another tab saves", async ({
	page,
	context,
}) => {
	await page.goto("/notizbuch/");
	await expect(
		page.getByText("Noch keine Einträge.", { exact: false }),
	).toBeVisible({ timeout: 25000 });
	const writer = await context.newPage();
	await writer.goto("/Elektrotechnik/Gleichstrom/");
	await writer.getByRole("button", { name: "Ohmsches Gesetz" }).click();
	await writer.locator("#U").fill("5");
	await writer.locator("#R").fill("1k");
	await saveCurrent(writer, "Zweiter Tab");
	await expect(
		page.getByRole("link", { name: "Zweiter Tab", exact: true }),
	).toBeVisible({ timeout: 7000 });
	await writer.close();
});

test("removed entries remain recoverable after reloading the notebook", async ({
	page,
}) => {
	await page.goto("/Elektrotechnik/Gleichstrom/");
	await saveCurrent(page, "Wiederherstellbar");
	await page.getByRole("link", { name: "Notizbuch", exact: true }).click();
	await page.getByRole("button", { name: "Entfernen", exact: true }).click();
	await expect(
		page.getByRole("link", { name: "Wiederherstellbar", exact: true }),
	).toHaveCount(0);
	await page.reload();
	await page
		.getByRole("button", { name: "Entfernte Einträge anzeigen", exact: true })
		.click();
	await expect(
		page.getByText("Wiederherstellbar", { exact: true }),
	).toBeVisible();
	await page
		.getByRole("button", { name: "Wiederherstellen", exact: true })
		.click();
	await page
		.getByRole("button", { name: "Aktive Einträge anzeigen", exact: true })
		.click();
	await expect(
		page.getByRole("link", { name: "Wiederherstellbar", exact: true }),
	).toBeVisible();
});

test("failed database initialization reports an error and can be retried", async ({
	page,
	context,
}) => {
	test.setTimeout(60000);
	await context.route("**/assets/pglite-*.wasm", (route) => route.abort());
	await page.goto("/notizbuch/");
	await expect(page.getByRole("alert")).toContainText("erneut versuchen", {
		timeout: 25000,
	});
	await context.unroute("**/assets/pglite-*.wasm");
	await page
		.getByRole("button", { name: "Erneut versuchen", exact: true })
		.click();
	await expect(
		page.getByText("Noch keine Einträge.", { exact: false }),
	).toBeVisible({ timeout: 25000 });
});

test("blank save names are validated without unhandled errors", async ({
	page,
}) => {
	const errors: string[] = [];
	page.on("pageerror", (error) => errors.push(error.message));
	await page.goto("/Elektrotechnik/Gleichstrom/");
	await page.getByRole("button", { name: "Werte merken", exact: true }).click();
	await page.getByRole("button", { name: "Speichern", exact: true }).click();
	await expect(page.getByRole("alert")).toContainText(
		"Name mit 1 bis 80 Zeichen",
	);
	expect(errors).toEqual([]);
});

test("same-route notebook selection changes replace inputs and clear stale load errors", async ({
	page,
}) => {
	await page.goto("/Elektrotechnik/Gleichstrom/");
	await page.getByRole("button", { name: "Ohmsches Gesetz" }).click();
	await page.locator("#R").fill("1k");
	await page.locator("#U").fill("12");
	await saveCurrent(page, "Erster Versuch");
	await page.locator("#R").fill("2.2k");
	await page.locator("#U").fill("24");
	await saveCurrent(page, "Zweiter Versuch");
	await page.getByRole("link", { name: "Notizbuch", exact: true }).click();
	const first = await page
		.getByRole("link", { name: "Erster Versuch", exact: true })
		.getAttribute("href");
	const second = await page
		.getByRole("link", { name: "Zweiter Versuch", exact: true })
		.getAttribute("href");
	await page.getByRole("link", { name: "Erster Versuch", exact: true }).click();
	await expectRestored(page);
	await expect(page.locator("#R")).toHaveValue("1k", {
		timeout: NOTEBOOK_STARTUP_TIMEOUT,
	});
	const changeAddress = async (href: string) =>
		page.evaluate((url) => {
			history.pushState({}, "", url);
			dispatchEvent(new PopStateEvent("popstate"));
		}, href);
	await changeAddress(
		"/Elektrotechnik/Gleichstrom/?notiz=00000000-0000-4000-8000-000000000000",
	);
	await expect(page.getByRole("alert")).toContainText("nicht gefunden");
	await changeAddress(second!);
	await expect(page.locator("#R")).toHaveValue("2.2k", {
		timeout: NOTEBOOK_STARTUP_TIMEOUT,
	});
	await expect(page.locator("#U")).toHaveValue("24");
	await expect(page.getByRole("alert")).toHaveCount(0);
	await changeAddress(first!);
	await expect(page.locator("#R")).toHaveValue("1k", {
		timeout: NOTEBOOK_STARTUP_TIMEOUT,
	});
	await expect(page.locator("#U")).toHaveValue("12");
});

test("a stalled database startup has a deadline and remains retryable", async ({
	page,
	context,
}) => {
	test.setTimeout(60000);
	let release: () => void = () => {};
	let requested: () => void = () => {};
	const held = new Promise<void>((resolve) => {
		release = resolve;
	});
	const loading = new Promise<void>((resolve) => {
		requested = resolve;
	});
	await context.route("**/assets/pglite-*.wasm", async (route) => {
		requested();
		await held;
		await route.abort().catch(() => {});
	});
	await page.clock.install();
	await page.goto("/notizbuch/");
	await loading;
	await page.clock.fastForward(46000);
	await expect(page.getByRole("alert")).toContainText("erneut versuchen");
	release();
	await context.unroute("**/assets/pglite-*.wasm");
	await page
		.getByRole("button", { name: "Erneut versuchen", exact: true })
		.click();
	await expect(
		page.getByText("Noch keine Einträge.", { exact: false }),
	).toBeVisible({ timeout: 25000 });
});

test("snapshots wait for a quantum gate to settle instead of saving intermediate state", async ({
	page,
}) => {
	test.setTimeout(90000);
	await page.clock.install({ time: new Date("2026-10-25T12:00:00Z") });
	await page.goto("/Allgemein/Qubit/");
	await expect(page.locator(".page-body")).toHaveAttribute(
		"data-ready",
		"true",
	);
	await page.clock.pauseAt(new Date("2026-10-25T12:01:00Z"));
	await page.getByRole("button", { name: "H", exact: true }).click();
	await expect(page.locator("#state-display")).toHaveAttribute(
		"aria-busy",
		"true",
	);
	await page.getByRole("button", { name: "Werte merken", exact: true }).click();
	await page.getByLabel("Name", { exact: true }).fill("Superposition");
	await page.getByRole("button", { name: "Speichern", exact: true }).click();
	await expect(page.getByRole("alert")).toContainText(
		"Simulation kurz abwarten",
	);
	await page.clock.runFor(1000);
	await page.clock.resume();
	await expect(page.locator("#state-display")).toHaveAttribute(
		"aria-busy",
		"false",
	);
	await page.getByRole("button", { name: "Speichern", exact: true }).click();
	await expect(page.locator(".save-status")).toContainText("gespeichert", {
		timeout: NOTEBOOK_STARTUP_TIMEOUT,
	});
});

const savedModes = [
	{ route: "Elektrotechnik/Wechselstrom", target: "Sinus", input: "up-Sinus" },
	{
		route: "Elektrotechnik/Wechselstrom",
		target: "Rechteck",
		input: "up-Rechteck",
	},
	{
		route: "Elektrotechnik/Wechselstrom",
		target: "Dreieck",
		input: "up-Dreieck",
	},
	{ route: "Elektrotechnik/Wechselstrom", target: "PWM", input: "up-PWM" },
	{ route: "Elektrotechnik/Kondensator", target: "Serie", input: "R_AC" },
	{ route: "Elektrotechnik/Kondensator", target: "Parallel", input: "C_ACp" },
	{ route: "Elektrotechnik/Filter", target: "HP_RC", input: "R-HP_RC" },
	{ route: "Elektrotechnik/Filter", target: "HP_RL", input: "R-HP_RL" },
	{ route: "Elektrotechnik/Filter", target: "TP_RC", input: "R-TP_RC" },
	{ route: "Elektrotechnik/Filter", target: "TP_RL", input: "R-TP_RL" },
	{
		route: "Elektronik/OPV",
		target: "invertierender_Verstaerker",
		input: "R1-1",
	},
	{
		route: "Elektronik/OPV",
		target: "nicht_invertierender_Verstaerker",
		input: "R1-2",
	},
	{ route: "Elektronik/OPV", target: "summier_Verstaerker", input: "R11-3" },
	{ route: "Elektronik/OPV", target: "differenz_Verstaerker", input: "R13-4" },
	{ route: "Elektrotechnik/Schwingkreis", target: "serie", input: "L-serie" },
	{
		route: "Elektrotechnik/Schwingkreis",
		target: "parallel",
		input: "L-parallel",
	},
] as const;
for (const mode of savedModes)
	test(`saved calculator mode ${mode.route} ${mode.target}`, async ({
		page,
	}) => {
		await page.goto("/" + mode.route + "/");
		await expect(page.locator(".page-body")).toHaveAttribute(
			"data-ready",
			"true",
		);
		await page
			.locator(".dropdown-header")
			.evaluateAll((nodes) =>
				nodes.forEach((node) => (node as HTMLElement).click()),
			);
		await page.locator(`[data-target="${mode.target}"]`).click();
		await page.locator('[id="' + mode.input + '"]').fill("5");
		const title = "Gespeichert: " + mode.target;
		await saveCurrent(page, title);
		await page.getByRole("link", { name: "Notizbuch", exact: true }).click();
		await page.getByRole("link", { name: title, exact: true }).click();
		await expectRestored(page);
		await expect(page.locator(`[data-target="${mode.target}"]`)).toHaveClass(
			/selected/,
		);
		await expect(page.locator('[id="' + mode.target + '"]')).toBeVisible();
		await expect(page.locator('[id="' + mode.input + '"]').first()).toHaveValue(
			"5",
		);
	});

for (const mode of ["serie_schaltung", "parallel_schaltung"])
	test(`saved dynamic resistor fields ${mode}`, async ({ page }) => {
		await page.goto("/Elektrotechnik/Gleichstrom/");
		await page
			.getByRole("button", { name: "Serie- und Parallelschaltung" })
			.click();
		await page
			.locator(`[data-action="selectOPV"]`)
			.nth(mode === "serie_schaltung" ? 0 : 1)
			.click();
		await page.locator("#r1").fill("1k");
		await page.locator("#r2").fill("2k");
		await saveCurrent(page, mode);
		await page.getByRole("link", { name: "Notizbuch", exact: true }).click();
		await page.getByRole("link", { name: mode, exact: true }).click();
		await expectRestored(page);
		await expect(page.locator("#r1")).toBeVisible();
		await expect(page.locator("#r1")).toHaveValue("1k");
		await expect(page.locator("#r2")).toHaveValue("2k");
	});

test("missing browser storage capabilities show an actionable notebook error", async ({
	page,
}) => {
	await page.addInitScript(() =>
		Object.defineProperty(navigator, "locks", {
			configurable: true,
			value: undefined,
		}),
	);
	await page.goto("/notizbuch/");
	await expect(page.getByRole("alert")).toContainText("aktuellen Browser");
	await expect(page.getByRole("alert")).toContainText(
		"Rechner funktionieren weiterhin",
	);
});

test("returning from another page refreshes records changed in another tab", async ({
	page,
	context,
}) => {
	await page.goto("/notizbuch/");
	await expect(
		page.getByText("Noch keine Einträge.", { exact: false }),
	).toBeVisible({ timeout: 25000 });
	await page
		.getByRole("navigation", { name: "Themen", exact: true })
		.getByRole("link", { name: "Home", exact: true })
		.click();
	const writer = await context.newPage();
	await writer.goto("/Elektrotechnik/Gleichstrom/");
	await saveCurrent(writer, "Neu während Abwesenheit");
	await page.getByRole("link", { name: "Notizbuch", exact: true }).click();
	await expect(
		page.getByRole("link", { name: "Neu während Abwesenheit", exact: true }),
	).toBeVisible({ timeout: 7000 });
	await writer.close();
});
