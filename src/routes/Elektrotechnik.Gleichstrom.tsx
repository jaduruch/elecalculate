import { createFileRoute } from "@tanstack/react-router";
import Page from "../pages/Elektrotechnik-Gleichstrom";
export const Route = createFileRoute("/Elektrotechnik/Gleichstrom")({
	validateSearch: (search: Record<string, unknown>): { notiz?: string } => ({
		notiz: typeof search.notiz === "string" ? search.notiz : undefined,
	}),
	head: () => ({ meta: [{ title: "Gleichstrom | Elecalculate" }] }),
	component: Page,
});
