import { createFileRoute } from "@tanstack/react-router";
import Page from "../pages/HST-Objekt-Orientiert";
export const Route = createFileRoute("/HST/Objekt_Orientiert")({
	validateSearch: (search: Record<string, unknown>): { notiz?: string } => ({
		notiz: typeof search.notiz === "string" ? search.notiz : undefined,
	}),
	head: () => ({
		meta: [{ title: "Objekt Orientiertes Programmieren | Elecalculate" }],
	}),
	component: Page,
});
