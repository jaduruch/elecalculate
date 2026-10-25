import { solveEquations, type Rule, type EquationIssue } from "./equations";

export type FilterKind = "HP_RC" | "HP_RL" | "TP_RC" | "TP_RL";
export type ResonatorKind = "serie" | "parallel";
export type ACValues = Record<string, number>;
export type ACResult = ReturnType<typeof solveEquations> & { notes: string[] };
const TAU = 2 * Math.PI;
// At resonance subtraction of large, equal reactive magnitudes must not invent
// a residual from the last few binary rounding bits.
function difference(a: number, b: number) {
	const d = a - b;
	return Math.abs(d) <= 16 * Number.EPSILON * Math.max(Math.abs(a), Math.abs(b))
		? 0
		: d;
}
function orthogonal(total: number, other: number) {
	return Math.sqrt((total - Math.abs(other)) * (total + Math.abs(other)));
}
const r = (
	target: string,
	inputs: string[],
	formula: string,
	solve: Rule["solve"],
): Rule => ({ target, inputs, formula, solve });
const product = (total: string, a: string, b: string): Rule[] => [
	r(total, [a, b], `${total} = ${a} · ${b}`, (v) => v[a] * v[b]),
	r(a, [total, b], `${a} = ${total} / ${b}`, (v) => v[total] / v[b]),
	r(b, [total, a], `${b} = ${total} / ${a}`, (v) => v[total] / v[a]),
];
const equal = (a: string, b: string): Rule[] => [
	r(a, [b], `${a} = ${b}`, (v) => v[b]),
	r(b, [a], `${b} = ${a}`, (v) => v[a]),
];
const options = (positive: string[]) => ({
	positive,
	absoluteTolerance: 0,
	relativeTolerance: 1e-7,
});
function invalid(
	given: ACValues,
	positive: string[],
	nonnegative: string[],
	extra: EquationIssue[] = [],
): ACResult | undefined {
	const issues = [...extra];
	for (const [key, value] of Object.entries(given)) {
		if (!Number.isFinite(value)) issues.push({ kind: "input", target: key });
		else if (
			(positive.includes(key) && value <= 0) ||
			(nonnegative.includes(key) && value < 0)
		)
			issues.push({ kind: "domain", target: key, actual: value });
	}
	if (issues.length)
		return { values: { ...given }, steps: [], issues, notes: [] };
}

/** Magnitude and signed output phase of ideal first-order passive RC/RL filters. */
export function solveFilter(kind: FilterKind, given: ACValues): ACResult {
	const hp = kind.startsWith("HP");
	const rc = kind.endsWith("RC");
	const positive = ["R", "C", "L", "XC", "XL", "f", "fg", "t"];
	const extra: EquationIssue[] = [];
	if (
		given.Uin !== undefined &&
		given.Uout !== undefined &&
		given.Uout > given.Uin
	)
		extra.push({ kind: "domain", target: "Uout" });
	if (given.Uin !== undefined && given.Uc !== undefined && given.Uc > given.Uin)
		extra.push({ kind: "domain", target: "Uc" });
	if (
		given.phi !== undefined &&
		(hp
			? given.phi <= 0 || given.phi >= 90
			: given.phi >= 0 || given.phi <= -90)
	)
		extra.push({ kind: "domain", target: "phi" });
	const bad = invalid(given, positive, ["Uin", "Uout", "Uc", "g"], extra);
	if (bad) return bad;
	const rules: Rule[] = [
		r("t", ["f", "fg"], "t = f / fg", (v) => v.f / v.fg),
		r("f", ["t", "fg"], "f = t · fg", (v) => v.t * v.fg),
		r("fg", ["f", "t"], "fg = f / t", (v) => v.f / v.t),
		r("g", ["t"], hp ? "g = t / √(1 + t²)" : "g = 1 / √(1 + t²)", (v) =>
			hp ? v.t / Math.hypot(1, v.t) : 1 / Math.hypot(1, v.t),
		),
		r("t", ["g"], hp ? "t = g / √(1 − g²)" : "t = √(1 / g² − 1)", (v) =>
			hp ? v.g / Math.sqrt(1 - v.g * v.g) : Math.sqrt(1 / v.g ** 2 - 1),
		),
		r(
			"phi",
			["t"],
			hp ? "φ = atan(1 / t) · 180 / π" : "φ = −atan(t) · 180 / π",
			(v) => ((hp ? Math.atan(1 / v.t) : -Math.atan(v.t)) * 180) / Math.PI,
		),
		r(
			"t",
			["phi"],
			hp ? "t = 1 / tan(φ · π / 180)" : "t = tan(−φ · π / 180)",
			(v) =>
				hp
					? 1 / Math.tan((v.phi * Math.PI) / 180)
					: Math.tan((-v.phi * Math.PI) / 180),
		),
		...product("Uout", "g", "Uin"),
	];
	if (rc)
		rules.push(
			r("fg", ["R", "C"], "fg = 1 / (2πRC)", (v) => 1 / (TAU * v.R * v.C)),
			r("R", ["fg", "C"], "R = 1 / (2πfgC)", (v) => 1 / (TAU * v.fg * v.C)),
			r("C", ["fg", "R"], "C = 1 / (2πfgR)", (v) => 1 / (TAU * v.fg * v.R)),
			r("XC", ["f", "C"], "XC = 1 / (2πfC)", (v) => 1 / (TAU * v.f * v.C)),
			r("f", ["XC", "C"], "f = 1 / (2πXC C)", (v) => 1 / (TAU * v.XC * v.C)),
			r("C", ["XC", "f"], "C = 1 / (2πfXC)", (v) => 1 / (TAU * v.f * v.XC)),
			...product("R", "t", "XC"),
		);
	else
		rules.push(
			r("fg", ["R", "L"], "fg = R / (2πL)", (v) => v.R / (TAU * v.L)),
			r("R", ["fg", "L"], "R = 2πfgL", (v) => TAU * v.fg * v.L),
			r("L", ["fg", "R"], "L = R / (2πfg)", (v) => v.R / (TAU * v.fg)),
			r("XL", ["f", "L"], "XL = 2πfL", (v) => TAU * v.f * v.L),
			r("f", ["XL", "L"], "f = XL / (2πL)", (v) => v.XL / (TAU * v.L)),
			r("L", ["XL", "f"], "L = XL / (2πf)", (v) => v.XL / (TAU * v.f)),
			...product("XL", "t", "R"),
		);
	if (kind === "HP_RC")
		rules.push(
			r(
				"Uc",
				["Uin", "t"],
				"Uc = Uin / √(1 + t²)",
				(v) => v.Uin / Math.hypot(1, v.t),
			),
			r(
				"Uin",
				["Uc", "t"],
				"Uin = Uc · √(1 + t²)",
				(v) => v.Uc * Math.hypot(1, v.t),
			),
			r("t", ["Uin", "Uc"], "t = √((Uin / Uc)² − 1)", (v) =>
				Math.sqrt((v.Uin / v.Uc) ** 2 - 1),
			),
			r("Uin", ["Uc", "Uout"], "Uin = √(Uc² + Uout²)", (v) =>
				Math.hypot(v.Uc, v.Uout),
			),
			r("Uc", ["Uin", "Uout"], "Uc = √(Uin² − Uout²)", (v) =>
				v.Uc !== undefined ? NaN : orthogonal(v.Uin, v.Uout),
			),
			r("Uout", ["Uin", "Uc"], "Uout = √(Uin² − Uc²)", (v) =>
				v.Uout !== undefined ? NaN : orthogonal(v.Uin, v.Uc),
			),
		);
	const result = solveEquations(given, rules, options(positive));
	if (
		result.values.g !== undefined &&
		(result.values.g < 0 || result.values.g > 1)
	)
		result.issues.push({ kind: "domain", target: "g" });
	return {
		...result,
		notes: [
			`φ ist die Phase des Ausgangs relativ zum Eingang. ${hp ? "Der Hochpass hat eine positive Phase." : "Der Tiefpass hat eine negative Phase."} Das Modell gilt für ideale Bauteile bei f > 0.`,
		],
	};
}

function resonatorRules(kind: ResonatorKind): Rule[] {
	const series = kind === "serie";
	const rules: Rule[] = [
		r(
			"fr",
			["L", "C"],
			"fr = 1 / (2π√(LC))",
			(v) => 1 / (TAU * Math.sqrt(v.L * v.C)),
		),
		r(
			"L",
			["fr", "C"],
			"L = 1 / ((2πfr)² C)",
			(v) => 1 / ((TAU * v.fr) ** 2 * v.C),
		),
		r(
			"C",
			["fr", "L"],
			"C = 1 / ((2πfr)² L)",
			(v) => 1 / ((TAU * v.fr) ** 2 * v.L),
		),
		r("XL", ["f", "L"], "XL = 2πfL", (v) => TAU * v.f * v.L),
		r("f", ["XL", "L"], "f = XL / (2πL)", (v) => v.XL / (TAU * v.L)),
		r("L", ["XL", "f"], "L = XL / (2πf)", (v) => v.XL / (TAU * v.f)),
		r("XC", ["f", "C"], "XC = 1 / (2πfC)", (v) => 1 / (TAU * v.f * v.C)),
		r("f", ["XC", "C"], "f = 1 / (2πXC C)", (v) => 1 / (TAU * v.XC * v.C)),
		r("C", ["XC", "f"], "C = 1 / (2πfXC)", (v) => 1 / (TAU * v.f * v.XC)),
		...product("fr", "Q", "b"),
		r("X0", ["L", "C"], "X0 = √(L / C)", (v) => Math.sqrt(v.L / v.C)),
		r("L", ["X0", "C"], "L = X0² C", (v) => v.X0 * v.X0 * v.C),
		r("C", ["X0", "L"], "C = L / X0²", (v) => v.L / (v.X0 * v.X0)),
	];
	if (series)
		rules.push(
			...product("X0", "Q", "R"),
			r("b", ["R", "L"], "b = R / (2πL)", (v) => v.R / (TAU * v.L)),
			r("R", ["b", "L"], "R = 2πbL", (v) => TAU * v.b * v.L),
			r("L", ["R", "b"], "L = R / (2πb)", (v) => v.R / (TAU * v.b)),
			r("Z", ["R", "XL", "XC"], "Z = √(R² + (XL − XC)²)", (v) =>
				Math.hypot(v.R, difference(v.XL, v.XC)),
			),
			r("R", ["Z", "XL", "XC"], "R = √(Z² − (XL − XC)²)", (v) =>
				v.R !== undefined ? NaN : orthogonal(v.Z, difference(v.XL, v.XC)),
			),
			...product("U", "I", "Z"),
			...product("UR", "I", "R"),
			...product("UL", "I", "XL"),
			...product("UC", "I", "XC"),
			r("U", ["UR", "UL", "UC"], "U = √(UR² + (UL − UC)²)", (v) =>
				Math.hypot(v.UR, difference(v.UL, v.UC)),
			),
			r("UR", ["U", "UL", "UC"], "UR = √(U² − (UL − UC)²)", (v) =>
				v.UR !== undefined ? NaN : orthogonal(v.U, difference(v.UL, v.UC)),
			),
		);
	else
		rules.push(
			...product("R", "Q", "X0"),
			r("b", ["R", "C"], "b = 1 / (2πRC)", (v) => 1 / (TAU * v.R * v.C)),
			r("R", ["b", "C"], "R = 1 / (2πbC)", (v) => 1 / (TAU * v.b * v.C)),
			r("C", ["b", "R"], "C = 1 / (2πbR)", (v) => 1 / (TAU * v.b * v.R)),
			r("Y", ["R", "XL", "XC"], "Y = √((1 / R)² + (1 / XC − 1 / XL)²)", (v) =>
				Math.hypot(1 / v.R, difference(1 / v.XC, 1 / v.XL)),
			),
			r("Z", ["Y"], "Z = 1 / Y", (v) => 1 / v.Y),
			r("Y", ["Z"], "Y = 1 / Z", (v) => 1 / v.Z),
			...product("I", "U", "Y"),
			...product("U", "IR", "R"),
			...product("U", "IL", "XL"),
			...product("U", "IC", "XC"),
			r("I", ["IR", "IL", "IC"], "I = √(IR² + (IL − IC)²)", (v) =>
				Math.hypot(v.IR, difference(v.IL, v.IC)),
			),
			r("IR", ["I", "IL", "IC"], "IR = √(I² − (IL − IC)²)", (v) =>
				v.IR !== undefined ? NaN : orthogonal(v.I, difference(v.IL, v.IC)),
			),
		);
	return rules;
}
function resonanceRules(kind: ResonatorKind): Rule[] {
	return [
		...equal("f", "fr"),
		...equal("XL", "XC"),
		...equal("X0", "XL"),
		...(kind === "serie"
			? [...equal("U", "UR"), ...equal("UL", "UC"), ...product("UL", "Q", "U")]
			: [
					...equal("I", "IR"),
					...equal("IL", "IC"),
					...product("IL", "Q", "I"),
				]),
	];
}
function differs(a: number | undefined, b: number | undefined) {
	return (
		a !== undefined &&
		b !== undefined &&
		Math.abs(a - b) > 1e-7 * Math.max(Math.abs(a), Math.abs(b))
	);
}
/** A supplied f is the excitation frequency. If omitted, calculations default to resonance unless supplied phasors show otherwise. */
export function solveResonator(kind: ResonatorKind, given: ACValues): ACResult {
	const positive = [
		"R",
		"L",
		"C",
		"Q",
		"b",
		"f",
		"fr",
		"XL",
		"XC",
		"X0",
		"Z",
		"Y",
	];
	const magnitudes = ["I", "IR", "IL", "IC", "U", "UR", "UL", "UC"];
	const phasorIssues: EquationIssue[] = [];
	if (
		kind === "serie" &&
		given.U !== undefined &&
		given.UL !== undefined &&
		given.UC !== undefined &&
		Math.abs(difference(given.UL, given.UC)) > given.U
	)
		phasorIssues.push({ kind: "domain", target: "UR" });
	if (
		kind === "parallel" &&
		given.I !== undefined &&
		given.IL !== undefined &&
		given.IC !== undefined &&
		Math.abs(difference(given.IL, given.IC)) > given.I
	)
		phasorIssues.push({ kind: "domain", target: "IR" });
	const bad = invalid(given, positive, magnitudes, phasorIssues);
	if (bad) return bad;
	const base = resonatorRules(kind);
	let rules = base;
	let result = solveEquations(given, rules, options(positive));
	const notes: string[] = [];
	const offEvidence =
		differs(given.XL, given.XC) ||
		(kind === "serie"
			? differs(given.UL, given.UC) || differs(given.U, given.UR)
			: differs(given.IL, given.IC) || differs(given.I, given.IR));
	let assumed =
		given.f === undefined && result.values.f === undefined && !offEvidence;
	let seed = { ...given };
	if (!result.issues.length && assumed) {
		rules = [...base, ...resonanceRules(kind)];
		result = solveEquations(seed, rules, options(positive));
		notes.push("Ohne Signalfrequenz wird bei Resonanz gerechnet: f = fr.");
	}
	// Infer a missing L/C from a lone known component and f only after all independent
	// reactance, quality-factor and phasor equations have had a chance to solve it.
	if (
		!result.issues.length &&
		!offEvidence &&
		result.values.f !== undefined &&
		result.values.fr === undefined &&
		(result.values.L === undefined) !== (result.values.C === undefined)
	) {
		seed = { ...given, fr: result.values.f };
		rules = [...base, ...resonanceRules(kind)];
		result = solveEquations(seed, rules, options(positive));
		assumed = true;
		notes.push(
			"Das fehlende L oder C wurde unter der Resonanzannahme f = fr bestimmt.",
		);
	}
	if (
		!result.issues.length &&
		!assumed &&
		result.values.f !== undefined &&
		result.values.fr !== undefined &&
		!differs(result.values.f, result.values.fr)
	) {
		rules = [...base, ...resonanceRules(kind)];
		result = solveEquations(seed, rules, options(positive));
	}
	if (
		kind === "serie" &&
		given.U !== undefined &&
		given.UR !== undefined &&
		given.UR > given.U
	)
		result.issues.push({ kind: "domain", target: "UR" });
	if (
		kind === "parallel" &&
		given.I !== undefined &&
		given.IR !== undefined &&
		given.IR > given.I
	)
		result.issues.push({ kind: "domain", target: "IR" });
	notes.push(
		kind === "serie"
			? "Idealer Serien-RLC-Kreis mit Serienverlustwiderstand R."
			: "Idealer Parallel-RLC-Kreis mit parallel liegendem Verlustwiderstand R.",
	);
	return { ...result, notes };
}
