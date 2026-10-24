import { createFileRoute } from "@tanstack/react-router";
import Page from "../pages/HST-C-Syntax";
export const Route = createFileRoute("/HST/C_Syntax")({
	validateSearch: (search: Record<string, unknown>): { notiz?: string } => ({
		notiz: typeof search.notiz === "string" ? search.notiz : undefined,
	}),
	head: () => ({ meta: [{ title: "C Syntax | Elecalculate" }] }),
	component: Page,
});
