import { createFileRoute } from "@tanstack/react-router";
import Page from "../pages/Elektronik-Dioden";
export const Route = createFileRoute("/Elektronik/Dioden")({
	validateSearch: (search: Record<string, unknown>): { notiz?: string } => ({
		notiz: typeof search.notiz === "string" ? search.notiz : undefined,
	}),
	head: () => ({ meta: [{ title: "Dioden | Elecalculate" }] }),
	component: Page,
});
