import { createFileRoute } from "@tanstack/react-router";
import Page from "../pages/Elektrotechnik-Verstaerkung-Daempfung";
export const Route = createFileRoute("/Elektrotechnik/Verstaerkung_Daempfung")({
	validateSearch: (search: Record<string, unknown>): { notiz?: string } => ({
		notiz: typeof search.notiz === "string" ? search.notiz : undefined,
	}),
	head: () => ({
		meta: [{ title: "Verstärkung und Dämpfung | Elecalculate" }],
	}),
	component: Page,
});
