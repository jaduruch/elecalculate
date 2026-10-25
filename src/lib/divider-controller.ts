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
		{ positive: ["R1", "R2", "RL", "Rp", "Rges"] },
	);
	output.replaceChildren();
	if (result.issues.length) {
		const issue = result.issues[0];
		output.textContent =
			issue.kind === "contradiction"
				? `Widersprüchliche Eingaben für ${issue.target}. Die bekannten Werte erfüllen ${issue.formula} nicht. Bitte Werte prüfen.`
				: issue.kind === "domain"
					? `Diese Eingaben ergeben für ${issue.target} keinen positiven Widerstand. Bitte Werte prüfen.`
					: `Aus diesen Eingaben lässt sich für ${issue.target} kein endlicher Wert berechnen. Bitte Werte prüfen.`;
		output.setAttribute("role", "alert");
		return;
	}
	output.removeAttribute("role");
	if (!result.steps.length) {
		output.textContent = "Bitte ausreichend bekannte Werte eingeben.";
		return;
	}
	for (const step of result.steps) {
		const row = output.ownerDocument.createElement("span");
		row.style.display = "block";
		row.dataset.resultKey = step.target;
		row.dataset.resultValue = String(step.value);
		const unit = step.target.startsWith("R")
			? "Ω"
			: step.target.startsWith("I")
				? "A"
				: "V";
		row.textContent = `${step.formula} = ${Number(step.value.toPrecision(7))} ${unit}`;
		const detail = output.ownerDocument.createElement("small");
		detail.style.display = "block";
		detail.textContent =
			"Eingesetzt: " +
			Object.entries(step.inputs)
				.map(([key, value]) => {
					const unit = key.startsWith("R")
						? "Ω"
						: key.startsWith("I")
							? "A"
							: key.startsWith("U") || key === "delta"
								? "V"
								: "";
					return `${key} = ${Number(value.toPrecision(8))}${unit ? " " + unit : ""}`;
				})
				.join("; ");
		row.appendChild(detail);
		output.appendChild(row);
	}
}
