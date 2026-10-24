import { createFileRoute } from "@tanstack/react-router";
import Page from "../pages/Elektrotechnik-elektrotechnik";
export const Route = createFileRoute("/Elektrotechnik/elektrotechnik")({
	validateSearch: (search: Record<string, unknown>): { notiz?: string } => ({
		notiz: typeof search.notiz === "string" ? search.notiz : undefined,
	}),
	head: () => ({ meta: [{ title: "Elektrotechnik | Elecalculate" }] }),
	component: Page,
});
