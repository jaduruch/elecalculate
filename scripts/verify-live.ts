import { chromium, webkit } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import { catalog } from "../src/lib/catalog";
import packageJSON from "../package.json";
const origin = process.env.LIVE_URL ?? "https://elecalculate.com";
const revision =
	process.env.GITHUB_SHA ??
	Bun.spawnSync(["git", "rev-parse", "HEAD"]).stdout.toString().trim();
const version = (await (
	await fetch(origin + "/version.json?verify=" + revision)
).json()) as { version: string; commit: string };
if (version.version !== packageJSON.version || version.commit !== revision)
	throw Error("Live build does not match the reviewed source revision.");
await mkdir("test-results/live", { recursive: true });
for (const [name, engine] of [
	["chromium", chromium],
	["webkit", webkit],
] as const) {
	const browser = await engine.launch();
	const context = await browser.newContext({
		viewport: { width: 1440, height: 1000 },
	});
	const page = await context.newPage();
	const errors: string[] = [];
	page.on("pageerror", (e) => errors.push(e.message));
	try {
		await page.goto(origin + "/Elektrotechnik/Gleichstrom/");
		await page.locator(".page-body[data-ready=true]").waitFor();
		await page.getByRole("button", { name: "Ohmsches Gesetz" }).click();
		await page.locator("#R").fill("1k");
		await page.locator("#U").fill("12");
		await page.locator("[data-action=calculateParametersURI]").click();
		if (
			Number(
				await page
					.locator("#result [data-result-key=I]")
					.getAttribute("data-result-value"),
			) !== 0.012
		)
			throw Error("Live Ohm result mismatch.");
		await page.evaluate(() => window.scrollTo(0, 0));
		await page.screenshot({
			path: `test-results/live/calculator-${name}.png`,
			fullPage: true,
		});
		await page
			.getByRole("button", { name: "Offline speichern", exact: true })
			.click();
		await page
			.getByRole("status")
			.filter({ hasText: "Offline gespeichert" })
			.waitFor({ timeout: 90000 });
		await context.setOffline(true);
		// Entering every prerendered subject also validates the actual public cache manifest.
		for (const subject of catalog) {
			await page.goto(origin + "/" + subject.file.replace(".html", "") + "/");
			await page.locator(".page-body[data-ready=true]").waitFor();
		}
		await page.getByRole("link", { name: "Notizbuch", exact: true }).click();
		await page
			.getByText("Noch keine Einträge.", { exact: false })
			.waitFor({ timeout: 45000 });
		if (errors.length) throw Error(errors.join("\n"));
		console.log(
			`${name}: reviewed live revision, numerical calculation, ${catalog.length} offline subjects and fresh local notebook verified.`,
		);
	} finally {
		await context.close();
		await browser.close();
	}
}
