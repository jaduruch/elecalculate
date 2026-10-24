import { createFileRoute } from "@tanstack/react-router";
import Page from "../pages/Allgemein-Widerstandstabelle";
export const Route = createFileRoute("/Allgemein/Widerstandstabelle")({
	validateSearch: (search: Record<string, unknown>): { notiz?: string } => ({
		notiz: typeof search.notiz === "string" ? search.notiz : undefined,
	}),
	head: () => ({ meta: [{ title: "Widerstandstabelle | Elecalculate" }] }),
	component: Page,
});
