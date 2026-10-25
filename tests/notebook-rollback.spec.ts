import { test, expect } from "@playwright/test";
import { execFileSync } from "node:child_process";
import { resolve, join } from "node:path";
import { tmpdir } from "node:os";
let bundle: string;
test.beforeAll(() => {
	bundle = join(tmpdir(), `elecalculate-notebook-rollback-${process.pid}.js`);
	execFileSync(
		"bun",
		[
			"build",
			resolve("tests/fixtures/notebook-rollback.ts"),
			"--target=browser",
			"--format=iife",
			"--outfile=" + bundle,
		],
		{ stdio: "pipe" },
	);
});
test("failed snapshot restoration rolls back values, controller state and worked results", async ({
	page,
}) => {
	await page.setContent("<!doctype html><html><body></body></html>");
	await page.addScriptTag({ path: bundle });
	const error = await page.evaluate(() =>
		(
			window as unknown as { testNotebookRestore: (busy: boolean) => string }
		).testNotebookRestore(false),
	);
	expect(error).toContain("bisherige Versuch bleibt erhalten");
	await expect(page.locator("#U")).toHaveValue("12");
	await expect(page.locator("#R")).toHaveValue("1k");
	await expect(page.locator("#derived")).toHaveValue("computed");
	await expect(page.locator("#state")).toHaveText("1");
	await expect(page.locator("#result")).toHaveText("Previous worked solution");
});
test("busy restoration refuses the operation before changing any values", async ({
	page,
}) => {
	await page.setContent("<!doctype html><html><body></body></html>");
	await page.addScriptTag({ path: bundle });
	const error = await page.evaluate(() =>
		(
			window as unknown as { testNotebookRestore: (busy: boolean) => string }
		).testNotebookRestore(true),
	);
	expect(error).toContain("Simulation kurz abwarten");
	await expect(page.locator("#U")).toHaveValue("12");
	await expect(page.locator("#R")).toHaveValue("1k");
	await expect(page.locator("#state")).toHaveText("1");
	await expect(page.locator("#result")).toHaveText("Previous worked solution");
});
