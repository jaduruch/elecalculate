import { createFileRoute } from "@tanstack/react-router";
import Page from "../pages/Elektrotechnik-Drehstrom-Simulator";
export const Route = createFileRoute("/Elektrotechnik/Drehstrom_Simulator")({
	validateSearch: (search: Record<string, unknown>): { notiz?: string } => ({
		notiz: typeof search.notiz === "string" ? search.notiz : undefined,
	}),
	head: () => ({
		meta: [{ title: "Dreiphasen-Generator Simulation | Elecalculate" }],
	}),
	component: Page,
});
