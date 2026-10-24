import { solveEquations, dividerRules, loadedDividerRules } from "./equations";
import { parseInput } from "./si";
export function calculateDivider(
	document: Pick<Document, "getElementById">,
	loaded = false,
) {
	const suffix = loaded ? "_bel" : "_unb";
	const keys = loaded
		? ["Iges", "IR2", "IRL", "R1", "R2", "RL", "Uin", "U1", "Uout"]
		: ["I", "R1", "R2", "Uin", "U1", "Uout"];
	const output = document.getElementById(loaded ? "result_bel" : "result_unb")!;
	const given: Record<string, number> = {};
	for (const key of keys) {
		const input = document.getElementById(key + suffix) as HTMLInputElement;
		if (!input.value.trim()) continue;
		const value = parseInput(input.value);
		if (!Number.isFinite(value) || (key.startsWith("R") && value <= 0)) {
			output.textContent = `${key}: Bitte einen gültigen Wert${key.startsWith("R") ? " größer null" : ""} eingeben.`;
			return;
		}
		given[key] = value;
	}
	const result = solveEquations(
		given,
		loaded ? loadedDividerRules : dividerRules,
	);
	output.replaceChildren();
	if (!result.steps.length) {
		output.textContent = "Bitte ausreichend bekannte Werte eingeben.";
		return;
	}
	for (const step of result.steps) {
		const row = globalThis.document.createElement("p");
		const unit = step.target.startsWith("R")
			? "Ω"
			: step.target.startsWith("I")
				? "A"
				: "V";
		row.textContent = `${step.formula} = ${Number(step.value.toPrecision(7))} ${unit}`;
		output.appendChild(row);
	}
}
