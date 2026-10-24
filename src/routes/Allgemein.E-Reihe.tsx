import { createFileRoute } from "@tanstack/react-router";
import Page from "../pages/Allgemein-E-Reihe";
export const Route = createFileRoute("/Allgemein/E-Reihe")({
	validateSearch: (search: Record<string, unknown>): { notiz?: string } => ({
		notiz: typeof search.notiz === "string" ? search.notiz : undefined,
	}),
	head: () => ({ meta: [{ title: "E-Reihe | Elecalculate" }] }),
	component: Page,
});
