import { createFileRoute } from "@tanstack/react-router";
import Page from "../pages/Allgemein-Massvorsaetze";
export const Route = createFileRoute("/Allgemein/Massvorsaetze")({
	validateSearch: (search: Record<string, unknown>): { notiz?: string } => ({
		notiz: typeof search.notiz === "string" ? search.notiz : undefined,
	}),
	head: () => ({ meta: [{ title: "Massvorsätze | Elecalculate" }] }),
	component: Page,
});
