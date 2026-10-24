import { createFileRoute } from "@tanstack/react-router";
import Page from "../pages/Elektronik-Aktiv-Filter";
export const Route = createFileRoute("/Elektronik/Aktiv_Filter")({
	validateSearch: (search: Record<string, unknown>): { notiz?: string } => ({
		notiz: typeof search.notiz === "string" ? search.notiz : undefined,
	}),
	head: () => ({ meta: [{ title: "Activ Filter | Elecalculate" }] }),
	component: Page,
});
