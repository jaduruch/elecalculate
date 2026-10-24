import { createFileRoute } from "@tanstack/react-router";
import Page from "../pages/Elektronik-OPV";
export const Route = createFileRoute("/Elektronik/OPV")({
	validateSearch: (search: Record<string, unknown>): { notiz?: string } => ({
		notiz: typeof search.notiz === "string" ? search.notiz : undefined,
	}),
	head: () => ({ meta: [{ title: "OPV | Elecalculate" }] }),
	component: Page,
});
