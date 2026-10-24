import { createFileRoute } from "@tanstack/react-router";
import Page from "../pages/Elektrotechnik-Drehstrom";
export const Route = createFileRoute("/Elektrotechnik/Drehstrom")({
	validateSearch: (search: Record<string, unknown>): { notiz?: string } => ({
		notiz: typeof search.notiz === "string" ? search.notiz : undefined,
	}),
	head: () => ({ meta: [{ title: "Drehstrom | Elecalculate" }] }),
	component: Page,
});
