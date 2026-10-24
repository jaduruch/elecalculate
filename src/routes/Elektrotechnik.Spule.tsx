import { createFileRoute } from "@tanstack/react-router";
import Page from "../pages/Elektrotechnik-Spule";
export const Route = createFileRoute("/Elektrotechnik/Spule")({
	validateSearch: (search: Record<string, unknown>): { notiz?: string } => ({
		notiz: typeof search.notiz === "string" ? search.notiz : undefined,
	}),
	head: () => ({ meta: [{ title: "Spulen | Elecalculate" }] }),
	component: Page,
});
