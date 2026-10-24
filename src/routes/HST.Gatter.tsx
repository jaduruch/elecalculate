import { createFileRoute } from "@tanstack/react-router";
import Page from "../pages/HST-Gatter";
export const Route = createFileRoute("/HST/Gatter")({
	validateSearch: (search: Record<string, unknown>): { notiz?: string } => ({
		notiz: typeof search.notiz === "string" ? search.notiz : undefined,
	}),
	head: () => ({ meta: [{ title: "Gatter | Elecalculate" }] }),
	component: Page,
});
