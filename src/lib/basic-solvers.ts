import { solveEquations, type Rule, type Step } from "./equations";
import { parseInput, parseInputsquare } from "./si";

export type BasicKind =
	| "ohm"
	| "circle"
	| "conductor"
	| "temperature"
	| "density"
	| "gain"
	| "transistor"
	| "sinus"
	| "rectangle"
	| "triangle"
	| "pwm";
export interface BasicOptions {
	radians?: boolean;
	percent?: boolean;
}
export interface BasicSolution {
	values: Record<string, number>;
	steps: Step[];
	errors: string[];
	notes: string[];
}
const r = (
	target: string,
	inputs: string[],
	formula: string,
	solve: Rule["solve"],
): Rule => ({ target, inputs, formula, solve });
const product = (out: string, a: string, b: string): Rule[] => [
	r(out, [a, b], `${out} = ${a} · ${b}`, (v) => v[a] * v[b]),
	r(a, [out, b], `${a} = ${out} / ${b}`, (v) => v[out] / v[b]),
	r(b, [out, a], `${b} = ${out} / ${a}`, (v) => v[out] / v[a]),
];
const sum = (out: string, a: string, b: string): Rule[] => [
	r(out, [a, b], `${out} = ${a} + ${b}`, (v) => v[a] + v[b]),
	r(a, [out, b], `${a} = ${out} − ${b}`, (v) => v[out] - v[b]),
	r(b, [out, a], `${b} = ${out} − ${a}`, (v) => v[out] - v[a]),
];
const reciprocal = (a: string, b: string): Rule[] => [
	r(a, [b], `${a} = 1 / ${b}`, (v) => 1 / v[b]),
	r(b, [a], `${b} = 1 / ${a}`, (v) => 1 / v[a]),
];
const geometry: Rule[] = [
	r("A", ["d"], "A = π · d² / 4", (v) => (Math.PI * v.d ** 2) / 4),
	r("d", ["A"], "d = √(4A / π)", (v) => Math.sqrt((4 * v.A) / Math.PI)),
];
const period: Rule[] = reciprocal("f", "T");
function signalSine(f: number, t: number, phi: number) {
	const cycles = ((f * t) % 1) + ((phi / (2 * Math.PI)) % 1);
	if (!Number.isFinite(cycles)) return NaN;
	if (cycles % 0.5 === 0) return 0;
	return Math.sin(2 * Math.PI * cycles);
}

const ohm: Rule[] = [
	...product("U", "I", "R"),
	...product("P", "U", "I"),
	r("P", ["I", "R"], "P = I² · R", (v) => v.I ** 2 * v.R),
	r("P", ["U", "R"], "P = U² / R", (v) => v.U ** 2 / v.R),
	r(
		"I",
		["P", "R"],
		"I = √(P / R)",
		(v) => (v.U === undefined || v.U >= 0 ? 1 : -1) * Math.sqrt(v.P / v.R),
	),
	r(
		"U",
		["P", "R"],
		"U = √(P · R)",
		(v) => (v.I === undefined || v.I >= 0 ? 1 : -1) * Math.sqrt(v.P * v.R),
	),
	r("R", ["P", "I"], "R = P / I²", (v) => v.P / v.I ** 2),
	r("R", ["U", "P"], "R = U² / P", (v) => v.U ** 2 / v.P),
];
const conductor: Rule[] = [
	...geometry,
	...reciprocal("x", "p"),
	r(
		"R",
		["p", "l", "A"],
		"R = ρ · l / (A · 10⁶)",
		(v) => (v.p * v.l) / (v.A * 1e6),
	),
	r(
		"p",
		["R", "l", "A"],
		"ρ = R · A · 10⁶ / l",
		(v) => (v.R * v.A * 1e6) / v.l,
	),
	r(
		"l",
		["R", "p", "A"],
		"l = R · A · 10⁶ / ρ",
		(v) => (v.R * v.A * 1e6) / v.p,
	),
	r(
		"A",
		["R", "p", "l"],
		"A = ρ · l / (R · 10⁶)",
		(v) => (v.p * v.l) / (v.R * 1e6),
	),
];
const temperature: Rule[] = [
	...sum("Tw", "Tk", "T"),
	r(
		"Rw",
		["Rk", "alpha", "T"],
		"Rw = Rk · (1 + α · ΔT)",
		(v) => v.Rk * (1 + v.alpha * v.T),
	),
	r(
		"Rk",
		["Rw", "alpha", "T"],
		"Rk = Rw / (1 + α · ΔT)",
		(v) => v.Rw / (1 + v.alpha * v.T),
	),
	r(
		"alpha",
		["Rw", "Rk", "T"],
		"α = (Rw / Rk − 1) / ΔT",
		(v) => (v.Rw / v.Rk - 1) / v.T,
	),
	r(
		"T",
		["Rw", "Rk", "alpha"],
		"ΔT = (Rw / Rk − 1) / α",
		(v) => (v.Rw / v.Rk - 1) / v.alpha,
	),
];
const density: Rule[] = [
	...geometry,
	r("I", ["J", "A"], "I = J · A · 10⁶", (v) => v.J * v.A * 1e6),
	r("J", ["I", "A"], "J = I / (A · 10⁶)", (v) => v.I / (v.A * 1e6)),
	r("A", ["I", "J"], "A = I / (J · 10⁶)", (v) => v.I / (v.J * 1e6)),
];
const gain: Rule[] = [
	...product("U2", "U1", "V"),
	...product("I2", "I1", "V"),
	...product("P1", "U1", "I1"),
	...product("P2", "U2", "I2"),
	...reciprocal("V", "D"),
	r("g", ["V"], "g = 20 · log₁₀(V)", (v) => 20 * Math.log10(v.V)),
	r("V", ["g"], "V = 10^(g / 20)", (v) => 10 ** (v.g / 20)),
	r("a", ["g"], "a = −g", (v) => -v.g),
	r("g", ["a"], "g = −a", (v) => -v.a),
	r("P2", ["P1", "V"], "P2 = P1 · V²", (v) => v.P1 * v.V ** 2),
	r("P1", ["P2", "V"], "P1 = P2 / V²", (v) => v.P2 / v.V ** 2),
	r("V", ["P1", "P2"], "V = √(P2 / P1)", (v) => Math.sqrt(v.P2 / v.P1)),
];
const transistor: Rule[] = [
	...sum("USpeisung", "UL", "UCE"),
	...sum("UB", "URB", "UBE"),
	...product("UL", "IC", "RL"),
	...product("URB", "IB", "RB"),
	r("IC", ["IB", "B", "ue"], "IC = IB · B / ü", (v) => (v.IB * v.B) / v.ue),
	r("IB", ["IC", "B", "ue"], "IB = IC · ü / B", (v) => (v.IC * v.ue) / v.B),
	r("B", ["IC", "IB", "ue"], "B = IC · ü / IB", (v) => (v.IC * v.ue) / v.IB),
	r("ue", ["IC", "IB", "B"], "ü = IB · B / IC", (v) => (v.IB * v.B) / v.IC),
];
function amplitudes(factor: number): Rule[] {
	return [
		r("upp", ["up"], "u_pp = 2 · û", (v) => 2 * v.up),
		r("up", ["upp"], "û = u_pp / 2", (v) => v.upp / 2),
		r("Ueff", ["up"], `Ueff = û / √${factor}`, (v) => v.up / Math.sqrt(factor)),
		r(
			"up",
			["Ueff"],
			`û = Ueff · √${factor}`,
			(v) => v.Ueff * Math.sqrt(factor),
		),
	];
}
const pwm: Rule[] = [
	...period,
	r("tin", ["T", "g"], "t_in = T · g", (v) => v.T * v.g),
	r("g", ["T", "tin"], "g = t_in / T", (v) => v.tin / v.T),
	r("T", ["tin", "g"], "T = t_in / g", (v) => v.tin / v.g),
	r("Ueff", ["up", "g"], "Ueff = û · √g", (v) => v.up * Math.sqrt(v.g)),
	r("up", ["Ueff", "g"], "û = Ueff / √g", (v) => v.Ueff / Math.sqrt(v.g)),
	r("g", ["Ueff", "up"], "g = (Ueff / û)²", (v) => (v.Ueff / v.up) ** 2),
];
const models: Record<
	BasicKind,
	{
		keys: string[];
		rules: Rule[];
		positive?: string[];
		nonnegative?: string[];
		notes?: string[];
	}
> = {
	ohm: {
		keys: ["I", "R", "P", "U"],
		rules: ohm,
		positive: ["R"],
		nonnegative: ["P"],
		notes: [
			"Ohmscher, passiver Widerstand. Bei Vorgabe von Leistung und Widerstand werden positive Spannungs- und Strombeträge angenommen.",
		],
	},
	circle: { keys: ["A", "d"], rules: geometry, nonnegative: ["A", "d"] },
	conductor: {
		keys: ["R", "x", "p", "A", "d", "l"],
		rules: conductor,
		positive: ["R", "x", "p", "A", "d", "l"],
		notes: ["ρ in Ω·mm²/m und χ in m/(Ω·mm²); A wird intern in m² gerechnet."],
	},
	temperature: {
		keys: ["Rw", "Rk", "alpha", "T", "Tw", "Tk"],
		rules: temperature,
		positive: ["Rw", "Rk"],
		notes: [
			"Lineare Näherung mit konstantem Temperaturkoeffizienten; ΔT = Tw − Tk.",
		],
	},
	density: {
		keys: ["I", "d", "A", "J"],
		rules: density,
		positive: ["d", "A"],
		notes: ["J in A/mm²; A wird intern in m² gerechnet."],
	},
	gain: {
		keys: ["I1", "I2", "g", "a", "P1", "P2", "U1", "U2", "V", "D"],
		rules: gain,
		positive: ["I1", "I2", "P1", "P2", "U1", "U2", "V", "D"],
		notes: [
			"Spannungs-, Strom- und Leistungsfaktoren setzen gleiche Bezugsimpedanzen voraus. g ist die Verstärkung, a = −g die Dämpfung.",
		],
	},
	transistor: {
		keys: ["IC", "IB", "RL", "RB", "USpeisung", "UB", "UBE", "UCE", "B", "ue"],
		rules: transistor,
		positive: ["RL", "RB", "B", "ue"],
		nonnegative: ["IC", "IB", "USpeisung", "UB", "UBE", "UCE", "UL", "URB"],
		notes: [
			"Vereinfachtes NPN-Schaltermodell. UBE, UCE und Übersteuerungsfaktor sind Modellparameter; es werden keine stillen Standardwerte eingesetzt.",
		],
	},
	sinus: {
		keys: ["ut", "up", "upp", "Ueff", "f", "t", "T", "phi"],
		rules: [
			...amplitudes(2),
			...period,
			r(
				"ut",
				["up", "f", "t", "phi"],
				"u(t) = û · sin(2πft + φ)",
				(v) => v.up * signalSine(v.f, v.t, v.phi),
			),
			r("up", ["ut", "f", "t", "phi"], "û = u(t) / sin(2πft + φ)", (v) => {
				const sine = signalSine(v.f, v.t, v.phi);
				return sine === 0 ? NaN : v.ut / sine;
			}),
			r(
				"phi",
				["ut", "up", "f", "t"],
				"φ = asin(u(t) / û) − 2πft (Hauptwert)",
				(v) => Math.asin(v.ut / v.up) - 2 * Math.PI * v.f * v.t,
			),
		],
		positive: ["f", "T"],
		nonnegative: ["up", "upp", "Ueff"],
	},
	rectangle: {
		keys: ["up", "upp", "Ueff"],
		rules: amplitudes(1),
		nonnegative: ["up", "upp", "Ueff"],
		notes: ["Symmetrische Rechteckspannung zwischen −û und +û."],
	},
	triangle: {
		keys: ["up", "upp", "Ueff"],
		rules: amplitudes(3),
		nonnegative: ["up", "upp", "Ueff"],
		notes: ["Symmetrische Dreieck- oder Sägezahnspannung zwischen −û und +û."],
	},
	pwm: {
		keys: ["up", "Ueff", "f", "tin", "T", "g"],
		rules: pwm,
		positive: ["f", "T"],
		nonnegative: ["up", "Ueff", "tin", "g"],
		notes: [
			"Unipolare PWM zwischen 0 V und û. Der Tastgrad liegt zwischen 0 und 1 bzw. 0 % und 100 %.",
		],
	},
};
export function solveBasic(
	kind: BasicKind,
	given: Record<string, number>,
	options: BasicOptions = {},
): BasicSolution {
	const model = models[kind];
	const input = { ...given };
	const errors: string[] = [];
	const notes = [...(model.notes ?? [])];
	if (kind === "sinus") {
		if (input.phi !== undefined && !options.radians) input.phi *= Math.PI / 180;
		if (input.phi === undefined && input.ut === undefined) {
			input.phi = 0;
			notes.push("Ohne Phasenangabe wird φ = 0 angenommen.");
		}
	}
	if (kind === "pwm" && input.g !== undefined && options.percent)
		input.g /= 100;
	for (const key of model.nonnegative ?? [])
		if (input[key] !== undefined && input[key] < 0)
			errors.push(`${key} darf nicht negativ sein.`);
	if (kind === "pwm" && input.g !== undefined && input.g > 1)
		errors.push(
			"Der Tastgrad muss zwischen 0 und 1 bzw. 0 % und 100 % liegen.",
		);
	if (kind === "temperature")
		for (const key of ["Tw", "Tk"])
			if (input[key] !== undefined && input[key] < -273.15)
				errors.push(`${key} liegt unter dem absoluten Nullpunkt.`);
	if (kind === "transistor" && input.ue !== undefined && input.ue < 1)
		errors.push("Der Übersteuerungsfaktor ü muss mindestens 1 sein.");
	if (errors.length) return { values: input, steps: [], errors, notes };
	const rules =
		kind === "sinus" && input.phi !== undefined
			? model.rules.filter((rule) => rule.target !== "phi")
			: model.rules;
	if (
		kind === "sinus" &&
		input.up !== undefined &&
		input.ut !== undefined &&
		Math.abs(input.ut) > input.up * (1 + 1e-12)
	)
		errors.push(
			"Der Momentanwert kann die Spitzenamplitude nicht überschreiten.",
		);
	if (
		kind === "sinus" &&
		input.ut !== undefined &&
		input.f !== undefined &&
		input.t !== undefined &&
		input.phi !== undefined &&
		signalSine(input.f, input.t, input.phi) === 0 &&
		input.ut !== 0
	)
		errors.push("Am Nulldurchgang muss der Momentanwert 0 V betragen.");
	const answer = solveEquations(input, rules, {
		positive: model.positive,
	});
	for (const issue of answer.issues) {
		errors.push(
			issue.kind === "contradiction"
				? `Die Angaben widersprechen sich bei ${issue.target} (${issue.formula}).`
				: issue.kind === "unbounded"
					? `${issue.target} ist mit diesen Angaben nicht endlich bestimmbar.`
					: `${issue.target}: Die Angaben ergeben keinen gültigen Wert.`,
		);
	}
	for (const key of model.nonnegative ?? [])
		if (answer.values[key] !== undefined && answer.values[key] < 0)
			errors.push(`${key} darf nicht negativ werden.`);
	if (
		kind === "pwm" &&
		answer.values.g !== undefined &&
		answer.values.g > 1 + 1e-12
	)
		errors.push("Die Angaben ergeben einen Tastgrad über 100 %.");
	if (kind === "temperature")
		for (const key of ["Tw", "Tk"])
			if (answer.values[key] !== undefined && answer.values[key] < -273.15)
				errors.push(`${key} liegt unter dem absoluten Nullpunkt.`);
	if (
		kind === "transistor" &&
		answer.values.ue !== undefined &&
		answer.values.ue < 1
	)
		errors.push("Die Angaben ergeben einen Übersteuerungsfaktor unter 1.");
	if (
		kind === "sinus" &&
		given.phi === undefined &&
		answer.values.phi !== undefined &&
		given.ut !== undefined
	)
		notes.push(
			"Die aus einem einzelnen Momentanwert ermittelte Phase ist ein Hauptwert. Weitere sinusperiodische Lösungen sind möglich.",
		);
	return { ...answer, errors: [...new Set(errors)], notes };
}
export const basicModels = models;
export function formatBasic(value: number, unit = "", area = false): string {
	if (!Number.isFinite(value)) return "Nicht endlich bestimmbar";
	if (value === 0) return `0${unit ? " " + unit : ""}`;
	if (unit === "dB" || unit === "°C" || unit === "K" || unit === "rad")
		return `${Number(value.toPrecision(7))}${unit ? " " + unit : ""}`;
	const prefixes = [
		["T", 12],
		["G", 9],
		["M", 6],
		["k", 3],
		["", 0],
		["m", -3],
		["µ", -6],
		["n", -9],
		["p", -12],
	] as const;
	for (const [p, e] of prefixes) {
		const f = 10 ** (area ? e * 2 : e);
		if (Math.abs(value) >= f)
			return `${Number((value / f).toPrecision(7))}${unit ? " " : ""}${p}${unit}`;
	}
	return `${value.toExponential(6)}${unit ? " " + unit : ""}`;
}
const outputs: Record<BasicKind, string> = {
	ohm: "result",
	circle: "result_Kreis",
	conductor: "result_Leiter",
	temperature: "result_Temp",
	density: "result_Stromd",
	gain: "result",
	transistor: "result",
	sinus: "result_Sinus",
	rectangle: "result_Rechteck",
	triangle: "result_Dreieck",
	pwm: "result_PWM",
};
const units: Record<string, string> = {
	I: "A",
	I1: "A",
	I2: "A",
	IC: "A",
	IB: "A",
	U: "V",
	U1: "V",
	U2: "V",
	Uin: "V",
	Uout: "V",
	USpeisung: "V",
	UB: "V",
	UBE: "V",
	UCE: "V",
	UL: "V",
	URB: "V",
	ut: "V",
	up: "V",
	upp: "V",
	Ueff: "V",
	R: "Ω",
	RL: "Ω",
	RB: "Ω",
	Rw: "Ω",
	Rk: "Ω",
	P: "W",
	P1: "W",
	P2: "W",
	A: "m²",
	d: "m",
	l: "m",
	f: "Hz",
	T: "s",
	t: "s",
	tin: "s",
	phi: "rad",
	alpha: "K⁻¹",
	Tw: "°C",
	Tk: "°C",
	x: "m/(Ω·mm²)",
	p: "Ω·mm²/m",
	J: "A/mm²",
	g: "",
	a: "dB",
};
function idFor(kind: BasicKind, key: string) {
	if (kind === "density" && ["I", "d", "A"].includes(key)) return key + "_J";
	if (["sinus", "rectangle", "triangle", "pwm"].includes(kind))
		return (
			key +
			"-" +
			(
				{
					sinus: "Sinus",
					rectangle: "Rechteck",
					triangle: "Dreieck",
					pwm: "PWM",
				} as Record<string, string>
			)[kind]
		);
	return key;
}
export function calculateBasic(
	document: Pick<Document, "getElementById">,
	kind: BasicKind,
	options: BasicOptions = {},
): BasicSolution {
	const given: Record<string, number> = {};
	const output = document.getElementById(outputs[kind]);
	if (!output) throw Error("Ergebnisbereich fehlt.");
	const rawErrors: string[] = [];
	for (const key of models[kind].keys) {
		const input = document.getElementById(
			idFor(kind, key),
		) as HTMLInputElement | null;
		if (!input) throw Error(`Eingabefeld ${idFor(kind, key)} fehlt.`);
		const raw = input.value.trim();
		if (!raw) continue;
		const n = key === "A" ? parseInputsquare(raw) : parseInput(raw);
		if (!Number.isFinite(n))
			rawErrors.push(`${key}: Bitte einen gültigen Zahlenwert eingeben.`);
		else given[key] = n;
	}
	const result = rawErrors.length
		? { values: given, steps: [], errors: rawErrors, notes: [] }
		: solveBasic(kind, given, options);
	output.replaceChildren();
	const dom = output.ownerDocument;
	if (result.errors.length) {
		const p = dom.createElement("p");
		p.setAttribute("role", "alert");
		p.textContent = result.errors.join(" ");
		output.appendChild(p);
		return result;
	}
	const displayKeys = models[kind].keys.filter(
		(key) => result.values[key] !== undefined,
	);
	if (!result.steps.length && Object.keys(given).length === 0) {
		output.textContent = "Bitte ausreichend bekannte Werte eingeben.";
		return result;
	}
	for (const key of displayKeys) {
		const value = result.values[key];
		const row = dom.createElement("p");
		row.dataset.resultKey = key;
		const siValue =
			kind === "conductor" && key === "p"
				? value * 1e-6
				: kind === "conductor" && key === "x"
					? value * 1e6
					: kind === "density" && key === "J"
						? value * 1e6
						: kind === "temperature" && (key === "Tw" || key === "Tk")
							? value + 273.15
							: value;
		row.dataset.resultValue = String(siValue);
		const step = result.steps.find((s) => s.target === key);
		let unit = units[key] ?? "";
		if (kind === "gain" && key === "g") unit = "dB";
		if (kind === "temperature" && key === "T") unit = "K";
		let shown = value;
		if (kind === "pwm" && key === "g" && options.percent) {
			shown *= 100;
			unit = "%";
		}
		row.textContent = `${step?.formula ?? key} = ${formatBasic(shown, unit, key === "A")}`;
		if (step) {
			const detail = dom.createElement("small");
			detail.textContent =
				"Eingesetzt: " +
				Object.entries(step.inputs)
					.map(
						([name, n]) =>
							`${name} = ${formatBasic(n, kind === "temperature" && name === "T" ? "K" : (units[name] ?? ""), name === "A")}`,
					)
					.join("; ");
			row.appendChild(dom.createElement("br"));
			row.appendChild(detail);
		}
		output.appendChild(row);
	}
	if (result.steps.length === 0) {
		const p = dom.createElement("p");
		p.textContent =
			"Die vorhandenen Angaben sind konsistent. Für weitere Größen werden zusätzliche Werte benötigt.";
		output.appendChild(p);
	}
	for (const note of result.notes) {
		const p = dom.createElement("p");
		p.className = "comment";
		p.textContent = note;
		output.appendChild(p);
	}
	return result;
}
