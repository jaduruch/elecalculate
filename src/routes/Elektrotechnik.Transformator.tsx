import { createFileRoute } from "@tanstack/react-router";
import Page from "../pages/Elektrotechnik-Transformator";
export const Route = createFileRoute("/Elektrotechnik/Transformator")({
	validateSearch: (search: Record<string, unknown>): { notiz?: string } => ({
		notiz: typeof search.notiz === "string" ? search.notiz : undefined,
	}),
	head: () => ({ meta: [{ title: "Transformator | Elecalculate" }] }),
	component: Page,
});
