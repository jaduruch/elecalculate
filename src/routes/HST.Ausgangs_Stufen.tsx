import { createFileRoute } from "@tanstack/react-router";
import Page from "../pages/HST-Ausgangs-Stufen";
export const Route = createFileRoute("/HST/Ausgangs_Stufen")({
	validateSearch: (search: Record<string, unknown>): { notiz?: string } => ({
		notiz: typeof search.notiz === "string" ? search.notiz : undefined,
	}),
	head: () => ({ meta: [{ title: "Ausgänge | Elecalculate" }] }),
	component: Page,
});
