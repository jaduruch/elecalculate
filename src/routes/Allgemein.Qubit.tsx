import { createFileRoute } from "@tanstack/react-router";
import Page from "../pages/Allgemein-Qubit";
export const Route = createFileRoute("/Allgemein/Qubit")({
	validateSearch: (search: Record<string, unknown>): { notiz?: string } => ({
		notiz: typeof search.notiz === "string" ? search.notiz : undefined,
	}),
	head: () => ({ meta: [{ title: "Qubit Demonstration | Elecalculate" }] }),
	component: Page,
});
