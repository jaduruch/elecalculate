import { parseInput, parseInputsquare } from "./si";
import {
	solveCapacitor,
	solveInductor,
	solveTransformer,
	solveMagnetism,
	solveTransient,
	solveCapacitorAC,
	transientFactor,
	type TransientKind,
} from "./passive-models";
import type { Step, EquationIssue } from "./equations";
type DocumentAccess = Pick<Document, "getElementById">;
type ModelResult = {
	values: Record<string, number>;
	steps: Step[];
	issues: EquationIssue[];
};
const KEYS = {
	capacitor: ["I", "F", "E", "er", "A", "d", "s", "C", "U", "W", "Q", "t"],
	inductor: ["I", "L", "ur", "N", "v", "A", "Phi", "U", "Al", "l", "B", "t"],
	transformer: [
		"I1",
		"I2",
		"R1",
		"R2",
		"P1",
		"P2",
		"N1",
		"N2",
		"C1",
		"C2",
		"U1",
		"U2",
		"ue",
		"eta",
	],
	magnetism: [
		"I",
		"H",
		"Theta",
		"ur",
		"N",
		"Rm",
		"A",
		"Phi",
		"U",
		"l",
		"B",
		"t",
	],
} as const;
const UNITS: Record<string, string> = {
	I: "A",
	F: "N",
	E: "V/m",
	A: "m²",
	d: "m",
	s: "m",
	C: "F",
	U: "V",
	W: "J",
	Q: "C",
	t: "s",
	L: "H",
	v: "m/s",
	Phi: "Wb",
	Al: "H",
	l: "m",
	B: "T",
	H: "A/m",
	Theta: "A",
	Rm: "A/Wb",
	I1: "A",
	I2: "A",
	R1: "Ω",
	R2: "Ω",
	P1: "W",
	P2: "W",
	C1: "F",
	C2: "F",
	U1: "V",
	U2: "V",
	It: "A",
	Ut: "V",
	R: "Ω",
	tau: "s",
	Xc: "Ω",
	Z: "Ω",
	Qc: "var",
	P: "W",
	S: "VA",
	f: "Hz",
	Ur: "V",
	Uc: "V",
	G: "S",
	Bc: "S",
	Y: "S",
	Ir: "A",
	Ic: "A",
};
export function formatPassive(value: number, unit = "") {
	if (!Number.isFinite(value)) return "Nicht definiert";
	if (value === 0) return `0${unit ? " " + unit : ""}`;
	if (!unit || unit.includes("/") || unit === "m²")
		return `${Number(value.toPrecision(8))}${unit ? " " + unit : ""}`;
	const exponent = Math.floor(Math.log10(Math.abs(value)) / 3) * 3;
	const prefixes: Record<number, string> = {
		[-12]: "p",
		[-9]: "n",
		[-6]: "µ",
		[-3]: "m",
		0: "",
		3: "k",
		6: "M",
		9: "G",
		12: "T",
	};
	if (!(exponent in prefixes)) return `${value.toExponential(6)} ${unit}`;
	return `${Number((value / 10 ** exponent).toPrecision(8))} ${prefixes[exponent]}${unit}`;
}
function read(
	document: DocumentAccess,
	keys: readonly string[],
	suffix = "",
	squared: readonly string[] = [],
) {
	const given: Record<string, number> = {};
	for (const key of keys) {
		const node = document.getElementById(
			key + suffix,
		) as HTMLInputElement | null;
		if (!node || !node.value.trim()) continue;
		given[key] = (squared.includes(key) ? parseInputsquare : parseInput)(
			node.value,
		);
	}
	return given;
}
function message(result: ModelResult) {
	const issue = result.issues[0];
	if (!issue) return "";
	if (issue.kind === "contradiction")
		return `Die Eingaben widersprechen sich bei ${issue.target}. Bitte die bekannten Werte prüfen.`;
	if (issue.kind === "unbounded")
		return `Für ${issue.target} entsteht kein endlicher Wert. Bitte die Eingaben und Grenzfälle prüfen.`;
	return `${issue.target}: Die Eingabe liegt außerhalb des gültigen Bereichs für dieses Modell.`;
}
export function renderPassive(
	document: DocumentAccess,
	resultId: string,
	result: ModelResult,
	keys: readonly string[],
	note = "",
	units: Record<string, string> = {},
) {
	const target = document.getElementById(resultId);
	if (!target) return result;
	target.replaceChildren();
	const owner = target.ownerDocument;
	if (result.issues.length) {
		const error = owner.createElement("p");
		error.setAttribute("role", "alert");
		error.textContent = message(result);
		target.append(error);
		return result;
	}
	if (note) {
		const text = owner.createElement("p");
		text.textContent = note;
		target.append(text);
	}
	const computed = new Set(result.steps.map((s) => s.target));
	const visible = keys.filter((key) => result.values[key] !== undefined);
	if (!visible.length) {
		target.textContent = "Bitte ausreichend bekannte Werte eingeben.";
		return result;
	}
	for (const key of visible) {
		const reading = owner.createElement("p");
		reading.dataset.resultKey = key;
		reading.dataset.resultValue = String(result.values[key]);
		reading.dataset.resultOrigin = computed.has(key) ? "calculated" : "given";
		reading.textContent = `${key} = ${formatPassive(result.values[key], units[key] ?? UNITS[key] ?? "")}`;
		target.append(reading);
	}
	const steps = result.steps.filter((s) => keys.includes(s.target));
	if (steps.length) {
		const heading = owner.createElement("h3");
		heading.textContent = "Lösungsweg";
		target.append(heading);
		const list = owner.createElement("ol");
		for (const step of steps) {
			const row = owner.createElement("li");
			row.textContent = `${step.formula} = ${formatPassive(step.value, units[step.target] ?? UNITS[step.target] ?? "")}`;
			list.append(row);
		}
		target.append(list);
	} else {
		const note = owner.createElement("p");
		note.textContent =
			"Die bekannten Werte reichen für keine weitere Größe aus.";
		target.append(note);
	}
	return result;
}
export type PassiveKind = keyof typeof KEYS;
export function calculatePassive(document: DocumentAccess, kind: PassiveKind) {
	const keys = KEYS[kind];
	const given = read(
		document,
		keys,
		"",
		kind === "capacitor" || kind === "inductor" || kind === "magnetism"
			? ["A"]
			: [],
	);
	let result: ModelResult;
	let note = "";
	switch (kind) {
		case "capacitor":
			result = solveCapacitor(given);
			note =
				"Idealer Plattenkondensator. Zeitbezogene Ladung und Strom werden als Änderungen bzw. Mittelwerte verstanden.";
			break;
		case "inductor":
			result = solveInductor(given);
			note =
				"Lineare ideale Spule. U ist die induzierte Spannung nach Lenz; für Zeitformeln stehen I und Φ für Änderungen.";
			break;
		case "transformer": {
			const solved = solveTransformer(given);
			result = solved;
			note = solved.assumedIdeal
				? "Ohne bestimmbaren Wirkungsgrad wird ein idealer Transformator mit η = 1 angenommen."
				: "Spannungsübersetzung ohne Spannungsregelung, Wirkleistungen für eine rein ohmsche Ersatzlast.";
			break;
		}
		default:
			result = solveMagnetism(given);
			note =
				"Linearer magnetischer Kreis. Die Induktionsspannung folgt dem Vorzeichen nach Lenz.";
	}
	const rendered = renderPassive(document, "result", result, keys, note);
	if (
		kind === "transformer" &&
		"assumedIdeal" in result &&
		result.assumedIdeal === true
	) {
		const row = document
			.getElementById("result")
			?.querySelector<HTMLElement>('[data-result-key="eta"]');
		if (row) row.dataset.resultOrigin = "assumed";
	}
	return rendered;
}
export type DrawTransient = (
	canvasId: string,
	value: (time: number) => number,
	label: string,
	maxTime: number,
	steps: number,
	options: { color: string; tMarker?: number; markerLabel: string },
) => unknown;
function clearCanvas(document: DocumentAccess, id: string, message: string) {
	const canvas = document.getElementById(id) as HTMLCanvasElement | null;
	const ctx = canvas?.getContext("2d");
	if (!canvas || !ctx) return;
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = "#bbb";
	ctx.font = "18px Arial";
	ctx.textAlign = "center";
	ctx.fillText(message, canvas.width / 2, canvas.height / 2);
}
export function calculatePassiveTransient(
	document: DocumentAccess,
	kind: TransientKind,
	draw?: DrawTransient,
) {
	const keys = [
		"I",
		"It",
		"R",
		kind === "RC" ? "C" : "L",
		"U",
		"Ut",
		"t",
		"tau",
	];
	const given = read(document, keys, "_" + kind);
	const discharging =
		(document.getElementById("modeSwitch") as HTMLInputElement | null)
			?.checked ?? false;
	const result = solveTransient(given, kind, discharging);
	renderPassive(
		document,
		"result_" + kind,
		result,
		keys,
		kind === "RC"
			? "Spannung am Kondensator; Entladestrom mit negativem Vorzeichen."
			: "Spannung an der Spule; induzierte Entladespannung mit negativem Vorzeichen.",
	);
	if (!draw) return result;
	for (const [quantity, initial, canvas, label, color] of [
		["voltage", "U", "voltageCanvas", "Spannung (V)", "#0070C0"],
		["current", "I", "currentCanvas", "Strom (A)", "#C00000"],
	] as const) {
		const amplitude = result.values[initial],
			tau = result.values.tau;
		if (
			result.issues.length ||
			amplitude === undefined ||
			tau === undefined ||
			tau <= 0
		) {
			clearCanvas(document, canvas, "Für diese Kurve fehlen gültige Werte.");
			continue;
		}
		const wanted = Math.max(5 * tau, result.values.t ?? 0),
			maxTime = Number.isFinite(wanted) ? wanted : tau;
		draw(
			canvas,
			(time) =>
				amplitude * transientFactor(kind, discharging, quantity, time, tau),
			label,
			maxTime,
			160,
			{
				color,
				tMarker: result.values.t,
				markerLabel: quantity === "voltage" ? "u(t) = " : "i(t) = ",
			},
		);
	}
	return result;
}
export function calculatePassiveCapacitorAC(
	document: DocumentAccess,
	parallel = false,
	radians = false,
) {
	const keys = parallel
		? [
				"phi",
				"Ir",
				"Ic",
				"I",
				"G",
				"Bc",
				"Y",
				"C",
				"P",
				"Q",
				"S",
				"U",
				"f",
				"cosphi",
				"sinphi",
			]
		: [
				"phi",
				"I",
				"R",
				"Xc",
				"Z",
				"C",
				"P",
				"Qc",
				"S",
				"Ur",
				"Uc",
				"U",
				"f",
				"cosphi",
				"sinphi",
			];
	const given = read(document, keys, parallel ? "_ACp" : "_AC");
	if (given.phi !== undefined && !radians) given.phi *= Math.PI / 180;
	const result = solveCapacitorAC(given, parallel);
	const display = { ...result, values: { ...result.values } };
	if (!radians && display.values.phi !== undefined) {
		display.values.phi *= 180 / Math.PI;
		display.steps = display.steps.map((step) =>
			step.target === "phi"
				? {
						...step,
						value: (step.value * 180) / Math.PI,
						formula: `(${step.formula}) · 180/π`,
					}
				: step,
		);
	}
	renderPassive(
		document,
		parallel ? "result_Parallel_AC" : "result_Serie_AC",
		display,
		keys,
		"Effektivwerte einer idealen RC-Schaltung. Der kapazitive Phasenwinkel wird als positiver Betrag angegeben.",
		{ phi: radians ? "rad" : "°", Q: parallel ? "var" : "C" },
	);
	const target = document.getElementById(
		parallel ? "result_Parallel_AC" : "result_Serie_AC",
	);
	const raw = target?.querySelector<HTMLElement>('[data-result-key="phi"]');
	if (raw && result.values.phi !== undefined)
		raw.dataset.resultValue = String(result.values.phi);
	return result;
}
