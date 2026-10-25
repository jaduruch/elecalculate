import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { getBuildId } from "./scripts/build-id.ts";
export default defineConfig({
	define: { __ELECALCULATE_BUILD_ID__: JSON.stringify(getBuildId()) },
	plugins: [
		tailwindcss(),
		tanstackStart({
			prerender: {
				enabled: true,
				autoSubfolderIndex: true,
				autoStaticPathsDiscovery: true,
				crawlLinks: false,
				failOnError: true,
				concurrency: 4,
			},
		}),
		react(),
	],
	resolve: { tsconfigPaths: true },
	server: { host: "127.0.0.1", port: 4317, strictPort: true },
});
