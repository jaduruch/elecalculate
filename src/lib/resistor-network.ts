import { parseInput } from "./si";
import { formatWithPrefix } from "./format-si";
export function networkResistance(a: number, b: number, parallel = false) {
	if (!Number.isFinite(a) || !Number.isFinite(b) || a <= 0 || b <= 0)
		throw Error("Die Widerstände müssen endlich und größer null sein.");
	const result = parallel
		? a <= b
			? a / (1 + a / b)
			: b / (1 + b / a)
		: a + b;
	if (!Number.isFinite(result) || result <= 0)
		throw Error(
			"Das Ergebnis liegt außerhalb des darstellbaren Zahlenbereichs.",
		);
	return result;
}
export function calculateNetwork(
	document: Pick<Document, "getElementById">,
	mode: string,
) {
	const output = document.getElementById("result_S_P");
	if (!output) return;
	output.replaceChildren();
	output.removeAttribute("role");
	try {
		if (!["serie_schaltung", "parallel_schaltung"].includes(mode))
			throw Error("Bitte Reihen- oder Parallelschaltung wählen.");
		const a = parseInput(
				(document.getElementById("r1") as HTMLInputElement).value,
			),
			b = parseInput((document.getElementById("r2") as HTMLInputElement).value);
		const parallel = mode === "parallel_schaltung",
			value = networkResistance(a, b, parallel);
		const reading = output.ownerDocument.createElement("span");
		reading.dataset.resultKey = "R";
		reading.dataset.resultValue = String(value);
		reading.textContent = `${parallel ? "R = R₁ · R₂ / (R₁ + R₂)" : "R = R₁ + R₂"} = ${formatWithPrefix(value, "Ω")}`;
		output.appendChild(reading);
	} catch (error) {
		delete output.dataset.resultKey;
		delete output.dataset.resultValue;
		output.setAttribute("role", "alert");
		output.textContent =
			error instanceof Error
				? error.message
				: "Die Widerstände konnten nicht berechnet werden.";
	}
}
