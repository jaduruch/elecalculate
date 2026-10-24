import { createFileRoute } from "@tanstack/react-router";
import Page from "../pages/Elektrotechnik-Magnetismus";
export const Route = createFileRoute("/Elektrotechnik/Magnetismus")({
	validateSearch: (search: Record<string, unknown>): { notiz?: string } => ({
		notiz: typeof search.notiz === "string" ? search.notiz : undefined,
	}),
	head: () => ({ meta: [{ title: "Magnetismus | Elecalculate" }] }),
	component: Page,
});
