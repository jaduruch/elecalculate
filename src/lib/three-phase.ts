import { parseInput } from "./si";
export function lineVoltage(phaseVoltage: number, delta = false) {
	if (!Number.isFinite(phaseVoltage) || phaseVoltage < 0)
		throw Error("Bitte eine endliche Strangspannung ab null eingeben.");
	const value = phaseVoltage * (delta ? 1 : Math.sqrt(3));
	if (!Number.isFinite(value))
		throw Error("Die Spannung liegt außerhalb des darstellbaren Bereichs.");
	return value;
}
export function updateThreePhase(document: Pick<Document, "getElementById">) {
	const input = document.getElementById("inputVoltage") as HTMLInputElement;
	const output = document.getElementById("outputVoltage") as HTMLInputElement;
	const delta = (document.getElementById("toggleSwitch") as HTMLInputElement)
		.checked;
	let note = document.getElementById("voltage-explanation");
	if (!note) {
		note = globalThis.document.createElement("p");
		note.id = "voltage-explanation";
		note.setAttribute("role", "status");
		note.className = "comment";
		output.parentElement?.insertAdjacentElement("afterend", note);
	}
	try {
		if (!input.value.trim()) {
			output.value = "";
			note.textContent = "Bitte die Strangspannung eingeben.";
			input.removeAttribute("aria-invalid");
			return;
		}
		const value = parseInput(input.value);
		if (
			!delta &&
			document
				.getElementById("symmetryButtonStar")
				?.classList.contains("active")
		) {
			output.value = "";
			note.textContent =
				"Bei unsymmetrischen Strangspannungen lässt sich die verkettete Spannung nicht aus einem einzelnen Wert bestimmen. Die Beziehung √3 gilt für symmetrische Spannungen.";
			return;
		}
		output.value = lineVoltage(value, delta).toFixed(2);
		input.removeAttribute("aria-invalid");
		note.textContent = delta
			? "Dreieck: Die Strangspannung entspricht der verketteten Spannung (U_L = U_Strang)."
			: "Stern bei symmetrischen Spannungen: U_L = √3 · U_Strang.";
	} catch (error) {
		output.value = "";
		input.setAttribute("aria-invalid", "true");
		note.textContent =
			error instanceof Error ? error.message : "Ungültige Spannung.";
	}
}
export function phaseSum(
	angle: number,
	enabled: readonly boolean[] = [true, true, true],
	amplitude = 100,
) {
	return enabled.reduce(
		(sum, on, index) =>
			sum + (on ? amplitude * Math.sin(angle + (index * 2 * Math.PI) / 3) : 0),
		0,
	);
}
