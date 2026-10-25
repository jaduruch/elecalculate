const exportsSelector =
	'[data-action="exportCanvasAsPNG"],button[aria-label$="als PNG herunterladen"]';
export function markChartsStale(context: HTMLElement) {
	if (!context.querySelector("canvas[id]")) return;
	const hasResults = Array.from(
		context.querySelectorAll<HTMLElement>("[id^=result]"),
	).some((node) => node.textContent?.trim());
	if (!hasResults && !context.hasAttribute("data-calculation-stale")) return;
	context.dataset.calculationStale = "true";
	if (!context.querySelector("[data-chart-stale]")) {
		const notice = context.ownerDocument.createElement("p");
		notice.dataset.chartStale = "true";
		notice.className = "comment";
		notice.setAttribute("role", "status");
		notice.textContent =
			"Die Diagramme zeigen noch die vorherigen Werte. Bitte mit den geänderten Eingaben erneut berechnen.";
		context.appendChild(notice);
	}
	synchronizeChartExports(context);
}
export function markChartsFresh(context: HTMLElement) {
	delete context.dataset.calculationStale;
	context
		.querySelectorAll("[data-chart-stale]")
		.forEach((node) => node.remove());
	synchronizeChartExports(context);
}
export function synchronizeChartExports(context: HTMLElement) {
	context
		.querySelectorAll<HTMLButtonElement>(exportsSelector)
		.forEach((button) => {
			const source =
				button.dataset.action === "exportCanvasAsPNG"
					? context.querySelector<HTMLCanvasElement>("#sinusCanvas")
					: null;
			button.disabled =
				!!button.closest('[data-calculation-stale="true"]') ||
				(source !== null && source.dataset.calculated !== "true");
		});
}
