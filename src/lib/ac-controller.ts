import { parseInput } from "./si";
import {
	solveFilter,
	solveResonator,
	type ACResult,
	type FilterKind,
	type ResonatorKind,
	type ACValues,
} from "./ac-solvers";
const labels: Record<string, string> = {
	R: "Widerstand R",
	L: "Induktivität L",
	C: "Kapazität C",
	Q: "Güte Q",
	b: "Bandbreite b",
	f: "Signalfrequenz f",
	fr: "Resonanzfrequenz fr",
	fg: "Grenzfrequenz fg",
	XL: "Induktiver Blindwiderstand XL",
	XC: "Kapazitiver Blindwiderstand XC",
	X0: "Resonanz-Blindwiderstand X0",
	U: "Spannung U",
	UR: "Widerstandsspannung UR",
	UL: "Spulenspannung UL",
	UC: "Kondensatorspannung UC",
	I: "Gesamtstrom I",
	IR: "Widerstandsstrom IR",
	IL: "Spulenstrom IL",
	IC: "Kondensatorstrom IC",
	Uin: "Eingangsspannung Uin",
	Uout: "Ausgangsspannung Uout",
	Uc: "Kondensatorspannung Uc",
	g: "Übertragungsfaktor g",
	t: "Normierte Frequenz t",
	phi: "Phasenverschiebung φ",
	Z: "Impedanzbetrag Z",
	Y: "Admittanzbetrag Y",
};
const units: Record<string, string> = {
	R: "Ω",
	XL: "Ω",
	XC: "Ω",
	X0: "Ω",
	Z: "Ω",
	Y: "S",
	L: "H",
	C: "F",
	b: "Hz",
	f: "Hz",
	fr: "Hz",
	fg: "Hz",
	U: "V",
	UR: "V",
	UL: "V",
	UC: "V",
	I: "A",
	IR: "A",
	IL: "A",
	IC: "A",
	Uin: "V",
	Uout: "V",
	Uc: "V",
	phi: "°",
};
function format(value: number, key: string) {
	const unit = units[key] ?? "";
	if (value === 0) return `0${unit ? " " + unit : ""}`;
	if (!unit || unit === "°")
		return `${Number(value.toPrecision(7))}${unit ? " " + unit : ""}`;
	const entries: [number, string][] = [
		[1e12, "T"],
		[1e9, "G"],
		[1e6, "M"],
		[1e3, "k"],
		[1, ""],
		[1e-3, "m"],
		[1e-6, "µ"],
		[1e-9, "n"],
		[1e-12, "p"],
	];
	for (const [factor, prefix] of entries)
		if (Math.abs(value) >= factor)
			return `${Number((value / factor).toPrecision(7))} ${prefix}${unit}`;
	return `${value.toExponential(6)} ${unit}`;
}
function render(output: HTMLElement, result: ACResult) {
	output.replaceChildren();
	output.removeAttribute("role");
	const document = output.ownerDocument;
	if (result.issues.length) {
		const issue = result.issues[0];
		const name = labels[issue.target] ?? issue.target;
		output.textContent =
			issue.kind === "contradiction"
				? `Widersprüchliche Eingaben für ${name}. Bitte prüfe die bekannten Werte gegen ${issue.formula}.`
				: issue.kind === "input"
					? `${name}: Bitte einen gültigen Zahlenwert eingeben.`
					: `${name}: Aus diesen Eingaben entsteht kein physikalisch gültiger endlicher Wert. Passive Bauteile und Frequenzen müssen positiv sein; Spannungen und Ströme werden als nichtnegative Beträge angegeben.`;
		output.setAttribute("role", "alert");
		return;
	}
	for (const step of result.steps) {
		const row = document.createElement("p");
		row.dataset.resultKey = step.target;
		row.dataset.resultValue = String(step.value);
		const value = document.createElement("strong");
		value.textContent = `${labels[step.target] ?? step.target} = ${format(step.value, step.target)}`;
		row.appendChild(value);
		const formula = document.createElement("span");
		formula.style.display = "block";
		formula.textContent = step.formula;
		row.appendChild(formula);
		const substitution = document.createElement("small");
		substitution.textContent =
			"Eingesetzt: " +
			Object.entries(step.inputs)
				.map(([key, n]) => `${key} = ${format(n, key)}`)
				.join("; ");
		row.appendChild(substitution);
		output.appendChild(row);
	}
	if (!result.steps.length) {
		const text = document.createElement("p");
		text.textContent = Object.keys(result.values).length
			? "Die bekannten Werte wurden geprüft. Für weitere Ergebnisse fehlen unabhängige Eingaben."
			: "Bitte bekannte Werte eingeben.";
		output.appendChild(text);
	}
	for (const note of result.notes) {
		const p = document.createElement("p");
		p.className = "comment";
		p.textContent = note;
		output.appendChild(p);
	}
}
function read(
	document: Pick<Document, "getElementById">,
	fields: Record<string, string>,
): ACValues {
	const given: ACValues = {};
	for (const [key, id] of Object.entries(fields)) {
		const input = document.getElementById(id) as HTMLInputElement | null;
		if (input?.value.trim()) given[key] = parseInput(input.value);
	}
	return given;
}
export function calculateACFilter(
	document: Pick<Document, "getElementById">,
	kind: FilterKind,
) {
	const keys = [
		"R",
		"Uin",
		"Uout",
		"fg",
		"f",
		...(kind.endsWith("RC") ? ["XC", "C"] : ["XL", "L"]),
		...(kind === "HP_RC" ? ["Uc"] : []),
	];
	const fields = Object.fromEntries(keys.map((key) => [key, `${key}-${kind}`]));
	fields.phi = `Winkel-${kind}`;
	const output = document.getElementById(
		`result_${kind}`,
	) as HTMLElement | null;
	if (!output) return;
	render(output, solveFilter(kind, read(document, fields)));
}
export function calculateACResonator(
	document: Pick<Document, "getElementById">,
	kind: ResonatorKind,
) {
	const keys = [
		"R",
		"XL",
		"XC",
		"L",
		"Q",
		"C",
		"f",
		"b",
		...(kind === "serie" ? ["U", "UR", "UL", "UC"] : ["I", "IR", "IL", "IC"]),
	];
	const output = document.getElementById(
		kind === "serie" ? "result" : "result_parallel",
	) as HTMLElement | null;
	if (!output) return;
	render(
		output,
		solveResonator(
			kind,
			read(
				document,
				Object.fromEntries(keys.map((key) => [key, `${key}-${kind}`])),
			),
		),
	);
}
