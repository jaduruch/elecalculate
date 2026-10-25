import { parseInput } from "./si";
/** Changing display units must preserve the physical value already entered. */
export function convertNumericField(
	document: Pick<Document, "getElementById">,
	id: string,
	factor: number,
) {
	const input = document.getElementById(id) as HTMLInputElement | null;
	if (!input?.value.trim()) return;
	const value = parseInput(input.value);
	if (!Number.isFinite(value)) return;
	const next = value * factor;
	if (!Number.isFinite(next))
		throw Error(
			"Die Umrechnung überschreitet den darstellbaren Zahlenbereich.",
		);
	input.value = String(Number(next.toPrecision(15)));
	input.dispatchEvent(new Event("input", { bubbles: true }));
}
