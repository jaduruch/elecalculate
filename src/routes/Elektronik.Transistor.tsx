import { createFileRoute } from "@tanstack/react-router";
import Page from "../pages/Elektronik-Transistor";
export const Route = createFileRoute("/Elektronik/Transistor")({
	validateSearch: (search: Record<string, unknown>): { notiz?: string } => ({
		notiz: typeof search.notiz === "string" ? search.notiz : undefined,
	}),
	head: () => ({ meta: [{ title: "Transistor | Elecalculate" }] }),
	component: Page,
});
