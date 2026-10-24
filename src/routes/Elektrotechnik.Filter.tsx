import { createFileRoute } from "@tanstack/react-router";
import Page from "../pages/Elektrotechnik-Filter";
export const Route = createFileRoute("/Elektrotechnik/Filter")({
	validateSearch: (search: Record<string, unknown>): { notiz?: string } => ({
		notiz: typeof search.notiz === "string" ? search.notiz : undefined,
	}),
	head: () => ({ meta: [{ title: "Filter | Elecalculate" }] }),
	component: Page,
});
