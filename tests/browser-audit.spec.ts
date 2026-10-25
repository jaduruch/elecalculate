import { test, expect } from "@playwright/test";

test("an invalid input in another expanded calculator does not block a valid calculation", async ({
	page,
}) => {
	await page.goto("/Elektrotechnik/Gleichstrom/");
	await page.getByRole("button", { name: "Ohmsches Gesetz" }).click();
	await page.locator("#R").fill("not-a-number");
	await page
		.getByRole("button", { name: "Spannungsteiler", exact: false })
		.click();
	await page.locator("#Uin_unb").fill("12");
	await page.locator("#R1_unb").fill("1k");
	await page.locator("#R2_unb").fill("2k");
	await page.locator("[data-action=calculateUnb_Spannungsteiler]").click();
	await expect(page.locator("#result_unb")).toContainText("8 V");
});

test("closing the category menu with Escape returns keyboard focus to its toggle", async ({
	page,
}) => {
	await page.goto("/Elektrotechnik/Gleichstrom/");
	await page.getByRole("button", { name: "Menü öffnen", exact: true }).click();
	await page.getByLabel("Thema suchen", { exact: true }).focus();
	await page.keyboard.press("Escape");
	await expect(
		page.getByRole("button", { name: "Menü öffnen", exact: true }),
	).toBeFocused();
});

test("dynamic resistor-network controls calculate series and parallel and reject nonpositive values", async ({
	page,
}) => {
	const errors: string[] = [];
	page.on("pageerror", (e) => errors.push(e.message));
	await page.goto("/Elektrotechnik/Gleichstrom/");
	await page
		.getByRole("button", { name: "Serie- und Parallelschaltung", exact: false })
		.click();
	await page
		.getByRole("button", { name: "Serie Schaltung Serie", exact: true })
		.click();
	await expect(page.locator("#result_S_P")).toHaveCount(1);
	await page.locator("#r1").fill("1k");
	await page.locator("#r2").fill("2k");
	await page.locator("[data-ec-function=calculate]").click();
	await expect(page.locator("#result_S_P").first()).toContainText("3.000k");
	await page
		.getByRole("button", { name: "Parallel Schaltung Parallel", exact: true })
		.click();
	await page.locator("#r1").fill("1k");
	await page.locator("#r2").fill("1k");
	await page.locator("[data-ec-function=calculate]").click();
	await expect(page.locator("#result_S_P").first()).toContainText("500.000");
	await page.locator("#r1").fill("0");
	await page.locator("[data-ec-function=calculate]").click();
	await expect(page.getByRole("alert")).toBeVisible();
	expect(errors).toEqual([]);
});

test("calculation errors identify their input and disappear after correction", async ({
	page,
}) => {
	await page.goto("/Elektrotechnik/Gleichstrom/");
	await page.getByRole("button", { name: "Ohmsches Gesetz" }).click();
	await page.locator("#R").fill("0");
	await page.locator("#U").fill("12");
	await page.locator("[data-action=calculateParametersURI]").click();
	const input = page.locator("#R");
	await expect(input).toHaveAttribute("aria-invalid", "true");
	const errorId = await input.getAttribute("aria-describedby");
	expect(errorId).toBeTruthy();
	await expect(page.locator(`[id="${errorId}"]`)).toHaveAttribute(
		"role",
		"alert",
	);
	await input.fill("1k");
	await page.locator("[data-action=calculateParametersURI]").click();
	await expect(page.getByRole("alert")).toHaveCount(0);
	await expect(input).not.toHaveAttribute("aria-invalid", "true");
	await expect(page.locator('#result [data-result-key="I"]')).toHaveAttribute(
		"data-result-value",
		"0.012",
	);
});

test("every operational-amplifier annotation loads after clicking its related field", async ({
	page,
}) => {
	const failures: string[] = [];
	page.on("response", (r) => {
		if (r.status() >= 400) failures.push(r.url());
	});
	await page.goto("/Elektronik/OPV/");
	const modes = [
		"invertierender_Verstaerker",
		"nicht_invertierender_Verstaerker",
		"summier_Verstaerker",
		"differenz_Verstaerker",
	];
	for (const [index, target] of modes.entries()) {
		await page.locator(`[data-target="${target}"]`).click();
		const controls = page.locator(`#${target} [data-action^="updateImage"]`);
		expect(await controls.count()).toBeGreaterThan(0);
		for (let i = 0; i < (await controls.count()); i++) {
			await controls.nth(i).click();
			const image = page.locator(`#opvImage${index + 1}`);
			await expect(image).toHaveAttribute("src", /^\/Elektronik\/OPV_Bilder\//);
			await expect
				.poll(() =>
					image.evaluate(
						(node) =>
							(node as HTMLImageElement).complete &&
							(node as HTMLImageElement).naturalWidth > 0,
					),
				)
				.toBe(true);
		}
	}
	expect(failures).toEqual([]);
});

test("reset removes invalid state and the previous inductor curves", async ({
	page,
}) => {
	await page.goto("/Elektrotechnik/Spule/");
	await page.getByRole("button", { name: "RL-Glied", exact: false }).click();
	await page.locator("#R_RL").fill("10");
	await page.locator("#L_RL").fill("1");
	await page.locator("#U_RL").fill("10");
	await page.locator("#t_RL").fill("0.1");
	await page.locator("[data-action=calculateRL]").click();
	await expect(page.locator("#result_RL")).not.toBeEmpty();
	const canvases = page.locator("#voltageCanvas,#currentCanvas");
	const hasPixels = () =>
		canvases.evaluateAll((nodes) =>
			nodes.some((node) => {
				const c = node as HTMLCanvasElement;
				return c
					.getContext("2d")!
					.getImageData(0, 0, c.width, c.height)
					.data.some((value) => value !== 0);
			}),
		);
	expect(await hasPixels()).toBe(true);
	await page.locator("#R_RL").fill("invalid");
	await page.locator("[data-action=calculateRL]").click();
	await expect(page.getByRole("alert")).toBeVisible();
	await page.locator("[data-action=resetInputsRL]").click();
	await expect(page.locator("#R_RL")).toHaveValue("");
	await expect(page.locator("#result_RL")).toBeEmpty();
	await expect(page.getByRole("alert")).toHaveCount(0);
	await expect(page.locator("#R_RL")).not.toHaveAttribute(
		"aria-invalid",
		"true",
	);
	await expect.poll(hasPixels).toBe(false);
});

test("qubit operations disclose their busy state instead of dropping an accepted click", async ({
	page,
}) => {
	await page.goto("/Allgemein/Qubit/");
	await expect(page.locator(".page-body")).toHaveAttribute(
		"data-ready",
		"true",
	);
	await page.getByRole("button", { name: "H", exact: true }).click();
	await expect(
		page.getByRole("button", { name: "Measure", exact: true }),
	).toBeDisabled();
	await expect(
		page.getByRole("button", { name: "Measure", exact: true }),
	).toBeEnabled();
	await expect(page.locator("#state-prob")).toContainText("50.0%");
});

test("sinus examples calculate and the canvas export produces a real PNG", async ({
	page,
}) => {
	const errors: string[] = [];
	page.on("pageerror", (e) => errors.push(e.message));
	await page.goto("/Elektrotechnik/Wechselstrom/");
	await page.locator("[data-target=Sinus]").click();
	await expect(page.locator("#t-Sinus")).toHaveCount(1);
	await page.locator("[data-action=fillExampleValues]").last().click();
	await expect(page.locator("#up-Sinus")).toHaveValue("5");
	await expect(page.locator("#f-Sinus")).toHaveValue("1k");
	await expect(page.locator("#phi-Sinus")).toHaveValue("-45");
	await expect(page.locator("#result_Sinus")).not.toBeEmpty();
	const canvas = page.locator("#sinusCanvas");
	const dimensions = await canvas.evaluate((node) => {
		const c = node as HTMLCanvasElement;
		return { width: c.width, height: c.height };
	});
	const box = await canvas.boundingBox();
	expect(box).toBeTruthy();
	for (const method of ["canvas icon", "keyboard button"]) {
		const result = page.waitForEvent("download");
		if (method === "canvas icon")
			await canvas.click({
				position: {
					x: (box!.width * (dimensions.width - 28)) / dimensions.width,
					y: (box!.height * (dimensions.height - 28)) / dimensions.height,
				},
			});
		else {
			const exportButton = page.getByRole("button", {
				name: "Diagramm als PNG speichern",
				exact: true,
			});
			await exportButton.focus();
			await exportButton.press("Enter");
		}
		const download = await result;
		expect(download.suggestedFilename()).toBe("sinusCanvas.png");
		const stream = await download.createReadStream();
		const chunks: Buffer[] = [];
		for await (const chunk of stream!) chunks.push(chunk);
		const data = Buffer.concat(chunks);
		expect(
			data
				.subarray(0, 8)
				.equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])),
		).toBe(true);
		expect(data.length).toBeGreaterThan(1000);
		const corner = await page.evaluate(async (base64) => {
			const image = new Image();
			image.src = "data:image/png;base64," + base64;
			await image.decode();
			const copy = document.createElement("canvas");
			copy.width = image.width;
			copy.height = image.height;
			const context = copy.getContext("2d")!;
			context.drawImage(image, 0, 0);
			return Array.from(context.getImageData(0, 0, 1, 1).data);
		}, data.toString("base64"));
		expect(corner).toEqual([0, 0, 0, 255]);
	}

	expect(errors).toEqual([]);
});

test("the downloadable electrical-engineering reference remains a PDF", async ({
	page,
}) => {
	await page.goto("/Elektrotechnik/elektrotechnik/");
	const result = page.waitForEvent("download");
	await page
		.getByRole("link", { name: "PDF herunterladen", exact: true })
		.click();
	const download = await result;
	expect(download.suggestedFilename()).toBe("Elektrotechnik.pdf");
	const stream = await download.createReadStream();
	const chunks: Buffer[] = [];
	for await (const chunk of stream!) chunks.push(chunk);
	expect(Buffer.concat(chunks).subarray(0, 5).toString()).toBe("%PDF-");
});

test("calculator accordions expose the panel state to keyboard and screen-reader users", async ({
	page,
}) => {
	await page.goto("/Elektrotechnik/Gleichstrom/");
	const toggle = page.getByRole("button", { name: "Ohmsches Gesetz" });
	await expect(toggle).toHaveAttribute("aria-expanded", "false");
	await expect(toggle).toHaveAttribute("aria-controls", /\S+/);
	const target = await toggle.getAttribute("aria-controls");
	expect(target).toBeTruthy();
	await toggle.press("Enter");
	await expect(toggle).toHaveAttribute("aria-expanded", "true");
	await expect(page.locator(`[id="${target}"]`)).toBeVisible();
	await toggle.press("Space");
	await expect(toggle).toHaveAttribute("aria-expanded", "false");
	await expect(page.locator(`[id="${target}"]`)).toBeHidden();
});

test("animated simulators release their animation frames on client-side navigation", async ({
	page,
}) => {
	const errors: string[] = [];
	page.on("pageerror", (e) => errors.push(e.message));
	await page.addInitScript(() => {
		const audit = { pending: new Set<number>() };
		(window as any).__frameAudit = audit;
		const request = window.requestAnimationFrame.bind(window),
			cancel = window.cancelAnimationFrame.bind(window);
		window.requestAnimationFrame = (callback) => {
			const id = request((time) => {
				audit.pending.delete(id);
				callback(time);
			});
			audit.pending.add(id);
			return id;
		};
		window.cancelAnimationFrame = (id) => {
			audit.pending.delete(id);
			cancel(id);
		};
	});
	for (const route of [
		"/Allgemein/Qubit/",
		"/Elektrotechnik/Drehstrom_Simulator/",
	]) {
		await page.goto(route);
		await expect(page.locator(".page-body")).toHaveAttribute(
			"data-ready",
			"true",
		);
		await expect
			.poll(() =>
				page.evaluate(() => (window as any).__frameAudit.pending.size),
			)
			.toBeGreaterThan(0);
		await page
			.getByRole("navigation", { name: "Themen", exact: true })
			.getByRole("link", {
				name: route.includes("Qubit") ? "Massvorsätze" : "Gleichstrom",
				exact: true,
			})
			.click();
		await expect(page.locator(".page-body")).toHaveAttribute(
			"data-ready",
			"true",
		);
		await expect
			.poll(() =>
				page.evaluate(() => (window as any).__frameAudit.pending.size),
			)
			.toBe(0);
	}
	expect(errors).toEqual([]);
});

test("filter selection announces its active mode and hides the other modes", async ({
	page,
}) => {
	await page.goto("/Elektrotechnik/Filter/");
	const low = page.locator("[data-target=TP_RC]"),
		high = page.locator("[data-target=HP_RC]");
	await expect(low).toHaveAttribute("aria-pressed", "false");
	await low.click();
	await expect(low).toHaveAttribute("aria-pressed", "true");
	await expect(page.locator("#TP_RC")).toBeVisible();
	await high.click();
	await expect(high).toHaveAttribute("aria-pressed", "true");
	await expect(low).toHaveAttribute("aria-pressed", "false");
	await expect(page.locator("#TP_RC")).toBeHidden();
	await high.click();
	await expect(high).toHaveAttribute("aria-pressed", "false");
	await expect(page.locator("#HP_RC")).toBeHidden();
});

test("editing a plotted waveform marks the old chart stale and blocks export until recalculation", async ({
	page,
}) => {
	await page.goto("/Elektrotechnik/Wechselstrom/");
	await page.locator("[data-target=Sinus]").click();
	await page.locator("#up-Sinus").fill("5");
	await page.locator("#f-Sinus").fill("1k");
	await page.locator("#phi-Sinus").fill("0");
	await page.locator("#t-Sinus").fill("250u");
	await page.locator("[data-action=calculate_Sinus]").click();
	const sample = page.locator("#result_Sinus [data-result-key=ut]");
	await expect(sample).toBeVisible();
	expect(Number(await sample.getAttribute("data-result-value"))).toBeCloseTo(
		5,
		10,
	);
	const canvas = page.locator("#sinusCanvas"),
		exportButton = page.getByRole("button", {
			name: "Diagramm als PNG speichern",
			exact: true,
		});
	await expect(canvas).toBeVisible();
	await expect(exportButton).toBeEnabled();
	expect(
		await canvas.evaluate((node) => {
			const c = node as HTMLCanvasElement;
			return c
				.getContext("2d")!
				.getImageData(0, 0, c.width, c.height)
				.data.some((value) => value !== 0);
		}),
	).toBe(true);
	await page.locator("#up-Sinus").fill("10");
	const notice = page.getByText(/erneut berechnen/i);
	await expect(notice).toBeVisible();
	await expect(exportButton).toBeDisabled();
	await expect(canvas).toBeVisible();
	await page.locator("[data-action=calculate_Sinus]").click();
	await expect(sample).toBeVisible();
	expect(Number(await sample.getAttribute("data-result-value"))).toBeCloseTo(
		10,
		10,
	);
	await expect(notice).toBeHidden();
	await expect(exportButton).toBeEnabled();
});
