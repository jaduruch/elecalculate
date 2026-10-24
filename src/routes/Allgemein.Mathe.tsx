import { createFileRoute } from "@tanstack/react-router";
import Page from "../pages/Allgemein-Mathe";
export const Route = createFileRoute("/Allgemein/Mathe")({
	validateSearch: (search: Record<string, unknown>): { notiz?: string } => ({
		notiz: typeof search.notiz === "string" ? search.notiz : undefined,
	}),
	head: () => ({ meta: [{ title: "Mathe | Elecalculate" }] }),
	component: Page,
});
