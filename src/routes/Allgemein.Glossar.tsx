import { createFileRoute } from "@tanstack/react-router";
import Page from "../pages/Allgemein-Glossar";
export const Route = createFileRoute("/Allgemein/Glossar")({
	validateSearch: (search: Record<string, unknown>): { notiz?: string } => ({
		notiz: typeof search.notiz === "string" ? search.notiz : undefined,
	}),
	head: () => ({ meta: [{ title: "Glossar | Elecalculate" }] }),
	component: Page,
});
