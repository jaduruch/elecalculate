import { createFileRoute } from "@tanstack/react-router";
import Page from "../pages/HST-hst";
export const Route = createFileRoute("/HST/hst")({
	validateSearch: (search: Record<string, unknown>): { notiz?: string } => ({
		notiz: typeof search.notiz === "string" ? search.notiz : undefined,
	}),
	head: () => ({
		meta: [{ title: "Hard- und Softwaretechnik | Elecalculate" }],
	}),
	component: Page,
});
