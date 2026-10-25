import { opampFields, solveOpamp, type OpampKind } from "./opamp";
import { parseInput } from "./si";
const outputs: Record<OpampKind, string> = {
	inverting: "result_invertierender_Verstaerker",
	noninverting: "result_nicht_invertierender_Verstaerker",
	summing: "result_summier_Verstaerker",
	difference: "result_differenz_Verstaerker",
};
function showError(output: HTMLElement, message: string) {
	output.textContent = message;
	output.setAttribute("role", "alert");
}
export function calculateOpamp(
	document: Pick<Document, "getElementById">,
	kind: OpampKind,
) {
	const output = document.getElementById(outputs[kind]);
	if (!output) return;
	const given: Record<string, number> = {};
	for (const [key, id] of Object.entries(opampFields[kind])) {
		const input = document.getElementById(id) as HTMLInputElement | null;
		if (!input?.value.trim()) continue;
		const value = parseInput(input.value);
		if (!Number.isFinite(value)) {
			showError(
				output,
				`${key}: Bitte einen gültigen Zahlenwert mit optionalem SI-Präfix eingeben.`,
			);
			return;
		}
		given[key] = value;
	}
	const result = solveOpamp(kind, given);
	output.replaceChildren();
	output.removeAttribute("role");
	if (result.issues.length) {
		const issue = result.issues[0];
		showError(
			output,
			issue.kind === "contradiction"
				? `Widersprüchliche Eingaben für ${issue.target}: ${issue.formula}. Bitte Werte prüfen.`
				: issue.kind === "domain"
					? `${issue.target}: Diese Werte passen nicht zur gewählten OPV-Schaltung. Widerstände müssen positiv sein; invertierende Verstärkungen sind negativ.`
					: `Für ${issue.target} ergibt sich aus diesen Eingaben kein endlicher Wert. Bitte Werte prüfen.`,
		);
		return;
	}
	if (!result.steps.length) {
		output.textContent =
			Object.keys(given).length === Object.keys(opampFields[kind]).length
				? "Die angegebenen Werte sind konsistent."
				: "Bitte ausreichend bekannte Werte eingeben.";
		return;
	}
	const owner = output.ownerDocument;
	for (const step of result.steps) {
		const row = owner.createElement("span");
		row.style.display = "block";
		row.dataset.resultKey = step.target;
		row.dataset.resultValue = String(step.value);
		const unit = step.target.startsWith("R")
			? "Ω"
			: step.target.startsWith("U") || step.target === "delta"
				? "V"
				: "";
		row.textContent = `${step.formula} = ${Number(step.value.toPrecision(8))}${unit ? " " + unit : ""}`;
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
	const note = owner.createElement("span");
	note.style.display = "block";
	note.style.fontSize = "12px";
	note.style.color = "#aaa";
	note.textContent =
		kind === "difference"
			? "Ideales OPV-Modell mit Gegenkopplung. R1 = R3 und R2 = R4; Versorgung und Sättigung werden nicht berücksichtigt."
			: "Ideales OPV-Modell mit Gegenkopplung. Die Verstärkung enthält das Vorzeichen; Versorgung und Sättigung werden nicht berücksichtigt.";
	output.appendChild(note);
}
