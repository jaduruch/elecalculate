import { createFileRoute } from "@tanstack/react-router";
import Page from "../pages/Elektronik-elektronik";
export const Route = createFileRoute("/Elektronik/elektronik")({
	validateSearch: (search: Record<string, unknown>): { notiz?: string } => ({
		notiz: typeof search.notiz === "string" ? search.notiz : undefined,
	}),
	head: () => ({ meta: [{ title: "Elektronik | Elecalculate" }] }),
	component: Page,
});
