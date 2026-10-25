import { defineConfig, devices } from "@playwright/test";
import base from "./playwright.config";

// Separate port and artifacts allow this real-engine audit to run alongside the
// Chromium suite without either runner deleting the other's output.
export default defineConfig({
	...base,
	testDir: "./tests",
	outputDir: "test-results-webkit",
	workers: 2,
	use: { ...base.use, baseURL: "http://127.0.0.1:4321" },
	projects: [
		{
			name: "webkit-desktop",
			use: { ...devices["Desktop Safari"], browserName: "webkit" },
		},
		{
			name: "webkit-mobile",
			use: { ...devices["iPhone 13"], browserName: "webkit" },
		},
	],
	webServer: {
		command: "bun server.ts",
		env: { PORT: "4321" },
		port: 4321,
		reuseExistingServer: !process.env.CI,
	},
});
