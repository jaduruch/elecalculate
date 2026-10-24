import { useState } from "react";
export function OfflineButton() {
	const [status, setStatus] = useState(""),
		[busy, setBusy] = useState(false);
	async function install() {
		setBusy(true);
		setStatus("Offline-Dateien werden gespeichert.");
		try {
			if (!("serviceWorker" in navigator)) throw Error();
			await navigator.serviceWorker.register("/sw.js");
			await navigator.serviceWorker.ready;
			setStatus(
				"Offline gespeichert. Rechner und Notizbuch sind auf diesem Gerät verfügbar.",
			);
		} catch {
			setStatus(
				"Die Offline-Speicherung ist nach dem Build über HTTPS oder localhost verfügbar.",
			);
		} finally {
			setBusy(false);
		}
	}
	return (
		<>
			<button onClick={install} disabled={busy}>
				{busy ? "Wird gespeichert…" : "Offline speichern"}
			</button>
			{status && (
				<div className="notification" role="status">
					<span>{status}</span>
					<button aria-label="Meldung schließen" onClick={() => setStatus("")}>
						Schließen
					</button>
				</div>
			)}
		</>
	);
}
