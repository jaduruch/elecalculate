import { createFileRoute } from "@tanstack/react-router";
import Page from "../pages/Elektrotechnik-Kondensator";
export const Route = createFileRoute("/Elektrotechnik/Kondensator")({
	validateSearch: (search: Record<string, unknown>): { notiz?: string } => ({
		notiz: typeof search.notiz === "string" ? search.notiz : undefined,
	}),
	head: () => ({ meta: [{ title: "Kondensatoren | Elecalculate" }] }),
	component: Page,
});
