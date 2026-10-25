import { test, expect, type Page } from "@playwright/test";
async function mockInstallingUpdate(page: Page) {
	await page.addInitScript(() => {
		class Worker extends EventTarget {
			state = "installing";
			scriptURL = "/sw.js";
			postMessage(data: { type: string }) {
				if (data.type === "ELECALCULATE_ACTIVATE_UPDATE") {
					this.state = "activated";
					service.controller = this;
					service.dispatchEvent(new Event("controllerchange"));
				}
			}
		}
		const incoming = new Worker();
		const active = new Worker();
		active.state = "activated";
		const registration = Object.assign(new EventTarget(), {
			active,
			installing: incoming as Worker | null,
			waiting: null as Worker | null,
			update: async () => {},
		});
		const service = Object.assign(new EventTarget(), {
			controller: active,
			ready: Promise.resolve(registration),
			register: async () => registration,
			getRegistration: async () => registration,
		});
		Object.defineProperty(navigator, "serviceWorker", {
			configurable: true,
			value: service,
		});
		Object.assign(window, {
			offlineAudit: {
				finish() {
					registration.waiting = incoming;
					registration.installing = null;
					incoming.state = "installed";
					incoming.dispatchEvent(new Event("statechange"));
				},
				fail() {
					registration.installing = null;
					incoming.state = "redundant";
					incoming.dispatchEvent(new Event("statechange"));
				},
			},
		});
	});
}
async function finish(page: Page) {
	await page.evaluate(() => {
		(
			window as unknown as { offlineAudit: { finish: () => void } }
		).offlineAudit.finish();
	});
}

test("an active old worker is not reported as a successfully downloaded update", async ({
	page,
}) => {
	await mockInstallingUpdate(page);
	await page.goto("/Elektrotechnik/Gleichstrom/");
	await page
		.getByRole("button", { name: "Offline speichern", exact: true })
		.click();
	await expect(page.getByRole("status")).toContainText(
		"Offline-Dateien werden gespeichert.",
	);
	await expect(
		page.getByRole("button", { name: "Wird gespeichert…" }),
	).toBeDisabled();
	await finish(page);
	await expect(page.getByRole("status")).toContainText(
		"neue Offline-Version ist vollständig gespeichert",
	);
	await expect(
		page.getByRole("button", { name: "Jetzt aktualisieren" }),
	).toBeVisible();
});

test("explicit update preserves active calculator edits through reload", async ({
	page,
}) => {
	await mockInstallingUpdate(page);
	await page.goto("/Elektrotechnik/Gleichstrom/");
	await page.getByRole("button", { name: "Ohmsches Gesetz" }).click();
	await page.locator("#R").fill("2.2k");
	await page.locator("#U").fill("24");
	await finish(page);
	await Promise.all([
		page.waitForEvent("load"),
		page.getByRole("button", { name: "Jetzt aktualisieren" }).click(),
	]);
	await expect(page.locator("#R")).toBeVisible();
	await expect(page.locator("#R")).toHaveValue("2.2k");
	await expect(page.locator("#U")).toHaveValue("24");
	expect(
		await page.evaluate(() =>
			sessionStorage.getItem("elecalculate.offline-resume.v1"),
		),
	).toBeNull();
});

test("failed installation ends the pending state and never claims success", async ({
	page,
}) => {
	await mockInstallingUpdate(page);
	await page.goto("/");
	await page
		.getByRole("button", { name: "Offline speichern", exact: true })
		.click();
	await page.evaluate(() => {
		(
			window as unknown as { offlineAudit: { fail: () => void } }
		).offlineAudit.fail();
	});
	await expect(page.getByRole("status")).toContainText(
		"nicht vollständig gespeichert",
	);
	await expect(
		page.getByRole("button", { name: "Offline speichern", exact: true }),
	).toBeEnabled();
	await expect(page.getByRole("status")).not.toContainText(
		"Offline gespeichert.",
	);
});

test("an open note draft must be saved or closed before an update reload", async ({
	page,
}) => {
	await mockInstallingUpdate(page);
	await page.goto("/Elektrotechnik/Gleichstrom/");
	await page.getByRole("button", { name: "Werte merken" }).click();
	await page.getByLabel("Name", { exact: true }).fill("Ungesicherte Notiz");
	await finish(page);
	await page.getByRole("button", { name: "Jetzt aktualisieren" }).click();
	await expect(page.getByRole("status")).toContainText(
		"Notiz zuerst speichern oder schließen",
	);
	await expect(page.getByLabel("Name", { exact: true })).toHaveValue(
		"Ungesicherte Notiz",
	);
});

test("an unavailable registration cannot leave the save button pending forever", async ({
	page,
}) => {
	await mockInstallingUpdate(page);
	await page.goto("/");
	await page.clock.install();
	await page.evaluate(() => {
		navigator.serviceWorker.register = () => new Promise(() => {});
	});
	await page
		.getByRole("button", { name: "Offline speichern", exact: true })
		.click();
	await page.clock.fastForward(90001);
	await expect(page.getByRole("status")).toContainText("Zeitüberschreitung");
	await expect(
		page.getByRole("button", { name: "Offline speichern", exact: true }),
	).toBeEnabled();
});

for (const [name, record] of Object.entries({
	oversized: "x".repeat(500001),
	expired: JSON.stringify({
		route: "/Elektrotechnik/Gleichstrom",
		snapshot: { values: { R: "10k", U: "99" }, selected: [], open: ["0"] },
		createdAt: Date.now() - 25 * 60 * 60 * 1000,
	}),
	wrongRoute: JSON.stringify({
		route: "/Allgemein/Mathe",
		snapshot: { values: { R: "10k", U: "99" }, selected: [], open: ["0"] },
		createdAt: Date.now(),
	}),
}))
	test(`unsafe update resume record is discarded: ${name}`, async ({
		page,
	}) => {
		await page.addInitScript(
			(raw) => sessionStorage.setItem("elecalculate.offline-resume.v1", raw),
			record,
		);
		await page.goto("/Elektrotechnik/Gleichstrom/");
		await expect(page.locator(".page-body")).toHaveAttribute(
			"data-ready",
			"true",
		);
		await page.getByRole("button", { name: "Ohmsches Gesetz" }).click();
		await expect(page.locator("#R")).toHaveValue("");
		await expect(page.locator("#U")).toHaveValue("");
		expect(
			await page.evaluate(() =>
				sessionStorage.getItem("elecalculate.offline-resume.v1"),
			),
		).toBeNull();
	});

test("updating a page without calculator inputs does not require session storage access", async ({
	page,
}) => {
	await mockInstallingUpdate(page);
	await page.goto("/");
	await finish(page);
	await page.evaluate(() => {
		Object.defineProperty(window, "sessionStorage", {
			configurable: true,
			get() {
				throw new Error("Storage blocked");
			},
		});
	});
	await Promise.all([
		page.waitForEvent("load"),
		page.getByRole("button", { name: "Jetzt aktualisieren" }).click(),
	]);
	await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
});

test("explicit update restores the actual Qubit state and paused animation", async ({
	page,
}) => {
	await mockInstallingUpdate(page);
	await page.goto("/Allgemein/Qubit/");
	await expect(page.locator(".page-body")).toHaveAttribute(
		"data-ready",
		"true",
	);
	await page.locator("#theta-slider").fill("90");
	await page.locator("#phi-slider").fill("90");
	await page.getByRole("button", { name: "Set State", exact: true }).click();
	await expect(page.locator("#state-prob")).toContainText("50.0%");
	await page
		.getByRole("button", { name: "Animation pausieren", exact: true })
		.click();
	await finish(page);
	await Promise.all([
		page.waitForEvent("load"),
		page.getByRole("button", { name: "Jetzt aktualisieren" }).click(),
	]);
	await expect(page.locator("#state-prob")).toContainText("50.0%");
	await expect(page.locator("#state-coords")).toContainText("90.0");
	await expect(
		page.getByRole("button", { name: "Animation fortsetzen", exact: true }),
	).toHaveAttribute("aria-pressed", "true");
});

test("a mismatched simulation kind cannot apply its values to another calculator", async ({
	page,
}) => {
	await page.addInitScript(() =>
		sessionStorage.setItem(
			"elecalculate.offline-resume.v1",
			JSON.stringify({
				route: "/Elektrotechnik/Gleichstrom",
				snapshot: {
					values: { R: "10k", U: "99" },
					selected: [],
					open: ["0"],
					controller: {
						kind: "qubit",
						values: { theta: 0, phi: 0, paused: false },
					},
				},
				createdAt: Date.now(),
			}),
		),
	);
	await page.goto("/Elektrotechnik/Gleichstrom/");
	await expect(page.locator(".page-body")).toHaveAttribute(
		"data-ready",
		"true",
	);
	await page.getByRole("button", { name: "Ohmsches Gesetz" }).click();
	await expect(page.locator("#R")).toHaveValue("");
	await expect(page.locator("#U")).toHaveValue("");
	expect(
		await page.evaluate(() =>
			sessionStorage.getItem("elecalculate.offline-resume.v1"),
		),
	).toBeNull();
});

test("finite but impossible Qubit resume data is discarded without a reload error loop", async ({
	page,
}) => {
	const errors: string[] = [];
	page.on("pageerror", (error) => errors.push(error.message));
	await page.addInitScript(() =>
		sessionStorage.setItem(
			"elecalculate.offline-resume.v1",
			JSON.stringify({
				route: "/Allgemein/Qubit",
				snapshot: {
					values: { "theta-slider": "90", "phi-slider": "90" },
					selected: [],
					open: [],
					controller: {
						kind: "qubit",
						values: { theta: 42, phi: 0, paused: false },
					},
				},
				createdAt: Date.now(),
			}),
		),
	);
	await page.goto("/Allgemein/Qubit/");
	await expect(page.locator(".page-body")).toHaveAttribute(
		"data-ready",
		"true",
	);
	await expect(page.locator("#theta-slider")).toHaveValue("0");
	await expect(page.locator("#phi-slider")).toHaveValue("0");
	await expect(page.locator("#state-prob")).toContainText("100.0%");
	expect(
		await page.evaluate(() =>
			sessionStorage.getItem("elecalculate.offline-resume.v1"),
		),
	).toBeNull();
	expect(errors).toEqual([]);
});

test("an update waits for a running Qubit gate instead of saving an intermediate state", async ({
	page,
}) => {
	await page.clock.install({ time: new Date("2026-10-25T12:00:00Z") });
	await mockInstallingUpdate(page);
	await page.goto("/Allgemein/Qubit/");
	await expect(page.locator(".page-body")).toHaveAttribute(
		"data-ready",
		"true",
	);
	await finish(page);
	await page.clock.pauseAt(new Date("2026-10-25T12:01:00Z"));
	await page.getByRole("button", { name: "X", exact: true }).click();
	await expect(page.locator("#state-display")).toHaveAttribute(
		"aria-busy",
		"true",
	);
	await page.getByRole("button", { name: "Jetzt aktualisieren" }).click();
	await expect(page.getByRole("status")).toContainText("laufende Simulation");
	expect(
		await page.evaluate(() =>
			sessionStorage.getItem("elecalculate.offline-resume.v1"),
		),
	).toBeNull();
	await page.clock.runFor(1000);
	await page.clock.resume();
	await expect(page.locator("#state-display")).toHaveAttribute(
		"aria-busy",
		"false",
	);
	await Promise.all([
		page.waitForEvent("load"),
		page.getByRole("button", { name: "Jetzt aktualisieren" }).click(),
	]);
	await expect(page.locator("#theta-slider")).toHaveValue("180");
});
