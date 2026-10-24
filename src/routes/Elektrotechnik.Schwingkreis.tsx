import { createFileRoute } from "@tanstack/react-router";
import Page from "../pages/Elektrotechnik-Schwingkreis";
export const Route = createFileRoute("/Elektrotechnik/Schwingkreis")({
	validateSearch: (search: Record<string, unknown>): { notiz?: string } => ({
		notiz: typeof search.notiz === "string" ? search.notiz : undefined,
	}),
	head: () => ({ meta: [{ title: "Schwingkreis | Elecalculate" }] }),
	component: Page,
});
