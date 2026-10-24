import { createFileRoute } from "@tanstack/react-router";
import Page from "../pages/Elektrotechnik-Wechselstrom";
export const Route = createFileRoute("/Elektrotechnik/Wechselstrom")({
	validateSearch: (search: Record<string, unknown>): { notiz?: string } => ({
		notiz: typeof search.notiz === "string" ? search.notiz : undefined,
	}),
	head: () => ({ meta: [{ title: "Wechselstrom | Elecalculate" }] }),
	component: Page,
});
