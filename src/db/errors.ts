/** Controlled capability errors are safe to surface without exposing DB details. */
export class NotebookUnavailableError extends Error {
	constructor(readonly reason: "insecure" | "unsupported" | "storage") {
		super(
			reason === "insecure"
				? "Das lokale Notizbuch benötigt HTTPS. Öffne die Seite über https://elecalculate.com. Die Rechner funktionieren weiterhin."
				: reason === "unsupported"
					? "Dieser Browser unterstützt das lokale Notizbuch nicht vollständig. Bitte einen aktuellen Browser verwenden. Die Rechner funktionieren weiterhin."
					: "Der lokale Browserspeicher ist hier nicht verfügbar. Bitte den Speicherzugriff für diese Website erlauben oder einen anderen Browser verwenden.",
		);
		this.name = "NotebookUnavailableError";
	}
}
