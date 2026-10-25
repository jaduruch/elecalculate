import { useCallback, useEffect, useRef, useState } from "react";
import { preserveOfflineResume } from "../lib/offline-resume";
import { CaptureUnavailableError } from "../lib/notebook";

const INSTALL_TIMEOUT = 90000;
async function withTimeout<T>(operation: Promise<T>): Promise<T> {
	let timer: number | undefined;
	try {
		return await Promise.race([
			operation,
			new Promise<never>((_, reject) => {
				timer = window.setTimeout(
					() =>
						reject(
							new Error(
								"Zeitüberschreitung beim Speichern. Bitte die Verbindung prüfen und erneut versuchen.",
							),
						),
					INSTALL_TIMEOUT,
				);
			}),
		]);
	} finally {
		window.clearTimeout(timer);
	}
}

/** Waiting is deliberate: a new worker is activated only on the user's request. */
async function waitForInstallation(registration: ServiceWorkerRegistration) {
	const worker = registration.installing ?? registration.waiting;
	if (!worker || worker.state === "installed" || worker.state === "activated")
		return;
	await new Promise<void>((resolve, reject) => {
		const timer = window.setTimeout(
			() => finish(new Error("Zeitüberschreitung beim Speichern.")),
			INSTALL_TIMEOUT,
		);
		const changed = () => {
			if (worker.state === "installed" || worker.state === "activated")
				finish();
			else if (worker.state === "redundant")
				finish(
					new Error(
						"Die Offline-Dateien konnten nicht vollständig gespeichert werden.",
					),
				);
		};
		function finish(error?: Error) {
			window.clearTimeout(timer);
			worker?.removeEventListener("statechange", changed);
			error ? reject(error) : resolve();
		}
		worker.addEventListener("statechange", changed);
		changed();
	});
}

export function OfflineButton() {
	const [status, setStatus] = useState("");
	const [busy, setBusy] = useState(false);
	const [dismissed, setDismissed] = useState(false);
	const [waiting, setWaiting] = useState<ServiceWorker | null>(null);
	const mounted = useRef(true);
	const installButton = useRef<HTMLButtonElement>(null);
	const removeObservers = useRef<(() => void)[]>([]);
	const activating = useRef(false);
	const lastWaiting = useRef<ServiceWorker | null>(null);
	const activationCleanup = useRef<(() => void) | null>(null);

	const observe = useCallback((reg: ServiceWorkerRegistration) => {
		removeObservers.current.forEach((remove) => remove());
		removeObservers.current = [];
		const inspect = () => {
			if (mounted.current) {
				if (reg.waiting && reg.waiting !== lastWaiting.current)
					setDismissed(false);
				lastWaiting.current = reg.waiting;
				setWaiting(reg.waiting);
			}
		};
		const watchInstalling = () => {
			const worker = reg.installing;
			if (!worker) {
				inspect();
				return;
			}
			worker.addEventListener("statechange", inspect);
			removeObservers.current.push(() =>
				worker.removeEventListener("statechange", inspect),
			);
			inspect();
		};
		reg.addEventListener("updatefound", watchInstalling);
		removeObservers.current.push(() =>
			reg.removeEventListener("updatefound", watchInstalling),
		);
		watchInstalling();
		inspect();
	}, []);

	useEffect(() => {
		mounted.current = true;
		const acknowledge = () =>
			navigator.serviceWorker.controller?.postMessage({
				type: "ELECALCULATE_CLIENT_READY",
				build: document.querySelector<HTMLMetaElement>(
					'meta[name="elecalculate-build"]',
				)?.content,
			});
		const requested = (event: MessageEvent) => {
			if (event.data?.type === "ELECALCULATE_BUILD_REQUEST") acknowledge();
		};
		const visible = () => {
			if (document.visibilityState === "visible") acknowledge();
		};
		if ("serviceWorker" in navigator) {
			navigator.serviceWorker.addEventListener("message", requested);
			navigator.serviceWorker.addEventListener("controllerchange", acknowledge);
			window.addEventListener("pageshow", acknowledge);
			document.addEventListener("visibilitychange", visible);
			acknowledge();
			void navigator.serviceWorker
				.getRegistration("/")
				.then((reg) => {
					if (!reg || !mounted.current) return;
					observe(reg);
					// Ordinary visits also discover updates; saved apps must not stay frozen.
					void reg.update().catch(() => {});
				})
				.catch(() => {});
		}
		return () => {
			mounted.current = false;
			if ("serviceWorker" in navigator) {
				navigator.serviceWorker.removeEventListener("message", requested);
				navigator.serviceWorker.removeEventListener(
					"controllerchange",
					acknowledge,
				);
			}
			window.removeEventListener("pageshow", acknowledge);
			document.removeEventListener("visibilitychange", visible);
			removeObservers.current.forEach((remove) => remove());
			activationCleanup.current?.();
		};
	}, [observe]);

	async function install() {
		setDismissed(false);
		setBusy(true);
		setStatus("Offline-Dateien werden gespeichert.");
		try {
			if (!("serviceWorker" in navigator))
				throw new Error(
					"Dieser Browser unterstützt die Offline-Speicherung nicht.",
				);
			const reg = await withTimeout(
				navigator.serviceWorker.register("/sw.js", {
					scope: "/",
					updateViaCache: "none",
				}),
			);
			if (!mounted.current) return;
			observe(reg);
			if (!reg.installing) await withTimeout(reg.update());
			await waitForInstallation(reg);
			if (!reg.active) {
				await new Promise<void>((resolve, reject) => {
					const timer = window.setTimeout(
						() =>
							reject(
								new Error("Die Offline-Version konnte nicht aktiviert werden."),
							),
						INSTALL_TIMEOUT,
					);
					navigator.serviceWorker.ready.then(
						() => {
							clearTimeout(timer);
							resolve();
						},
						(error) => {
							clearTimeout(timer);
							reject(error);
						},
					);
				});
			}
			if (!reg.active && !reg.waiting)
				throw new Error("Die Offline-Dateien konnten nicht aktiviert werden.");
			if (!mounted.current) return;
			setWaiting(reg.waiting);
			setStatus(
				reg.waiting
					? "Eine neue Offline-Version ist vollständig gespeichert. Deine aktuelle Seite bleibt geöffnet."
					: "Offline gespeichert. Rechner und Notizbuch sind auf diesem Gerät verfügbar.",
			);
		} catch (error) {
			if (mounted.current)
				setStatus(
					error instanceof Error
						? error.message
						: "Die Offline-Speicherung ist über HTTPS oder localhost verfügbar.",
				);
		} finally {
			if (mounted.current) setBusy(false);
		}
	}

	function activateUpdate() {
		if (!waiting || activating.current) return;
		try {
			if (document.querySelector(".save-form")) {
				setStatus("Bitte die geöffnete Notiz zuerst speichern oder schließen.");
				return;
			}
			preserveOfflineResume(document.querySelector<HTMLElement>(".page-body"));
		} catch (error) {
			setStatus(
				error instanceof CaptureUnavailableError
					? error.message
					: "Die Eingaben konnten nicht für das Neuladen gesichert werden. Bitte zuerst im Notizbuch speichern.",
			);
			return;
		}
		activating.current = true;
		setDismissed(false);
		setBusy(true);
		setStatus("Neue Version wird geladen. Deine Eingaben bleiben erhalten.");
		const changed = () => {
			activationCleanup.current?.();
			window.location.reload();
		};
		navigator.serviceWorker.addEventListener("controllerchange", changed);
		waiting.postMessage({ type: "ELECALCULATE_ACTIVATE_UPDATE" });
		const timer = window.setTimeout(() => {
			activationCleanup.current?.();
			if (!mounted.current) return;
			navigator.serviceWorker.removeEventListener("controllerchange", changed);
			activating.current = false;
			setBusy(false);
			setStatus(
				"Die Aktualisierung wurde noch nicht aktiviert. Du kannst es erneut versuchen; deine Eingaben bleiben erhalten.",
			);
		}, 15000);
		activationCleanup.current = () => {
			window.clearTimeout(timer);
			navigator.serviceWorker.removeEventListener("controllerchange", changed);
			activationCleanup.current = null;
		};
	}

	return (
		<>
			<button
				ref={installButton}
				type="button"
				onClick={install}
				disabled={busy}
			>
				{busy
					? activating.current
						? "Wird aktualisiert…"
						: "Wird gespeichert…"
					: "Offline speichern"}
			</button>
			{(status || waiting) && !dismissed && (
				<div className="notification" role="status" aria-atomic="true">
					<span>
						{status ||
							(waiting
								? "Eine neue Version ist verfügbar. Deine Eingaben werden beim Aktualisieren übernommen."
								: "")}
					</span>
					{waiting && (
						<button onClick={activateUpdate} disabled={busy}>
							Jetzt aktualisieren
						</button>
					)}
					<button
						aria-label="Meldung schließen"
						onClick={() => {
							setStatus("");
							setDismissed(true);
							installButton.current?.focus();
						}}
					>
						Schließen
					</button>
				</div>
			)}
		</>
	);
}
