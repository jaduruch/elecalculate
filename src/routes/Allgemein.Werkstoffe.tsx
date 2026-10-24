import { createFileRoute } from "@tanstack/react-router";
import Page from "../pages/Allgemein-Werkstoffe";
export const Route = createFileRoute("/Allgemein/Werkstoffe")({
	validateSearch: (search: Record<string, unknown>): { notiz?: string } => ({
		notiz: typeof search.notiz === "string" ? search.notiz : undefined,
	}),
	head: () => ({ meta: [{ title: "Werkstoffe | Elecalculate" }] }),
	component: Page,
});
