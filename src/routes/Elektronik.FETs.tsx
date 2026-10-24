import { createFileRoute } from "@tanstack/react-router";
import Page from "../pages/Elektronik-FETs";
export const Route = createFileRoute("/Elektronik/FETs")({
	validateSearch: (search: Record<string, unknown>): { notiz?: string } => ({
		notiz: typeof search.notiz === "string" ? search.notiz : undefined,
	}),
	head: () => ({ meta: [{ title: "FET | Elecalculate" }] }),
	component: Page,
});
