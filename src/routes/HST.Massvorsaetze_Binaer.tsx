import { createFileRoute } from "@tanstack/react-router";
import Page from "../pages/HST-Massvorsaetze-Binaer";
export const Route = createFileRoute("/HST/Massvorsaetze_Binaer")({
	validateSearch: (search: Record<string, unknown>): { notiz?: string } => ({
		notiz: typeof search.notiz === "string" ? search.notiz : undefined,
	}),
	head: () => ({ meta: [{ title: "Massvorsätze Binär | Elecalculate" }] }),
	component: Page,
});
