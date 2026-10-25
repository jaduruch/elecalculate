import { solveEquations, type Rule, type SolveOptions } from "./equations";
/** CODATA 2022, NIST: https://physics.nist.gov/cuu/Constants/ */
export const EPSILON_0 = 8.8541878188e-12;
export const MU_0 = 1.25663706127e-6;
export const rule = (
	target: string,
	inputs: string[],
	formula: string,
	solve: Rule["solve"],
): Rule => ({ target, inputs, formula, solve });
export function product(total: string, a: string, b: string): Rule[] {
	return [
		rule(total, [a, b], `${total} = ${a} · ${b}`, (v) => v[a] * v[b]),
		rule(a, [total, b], `${a} = ${total} / ${b}`, (v) => v[total] / v[b]),
		rule(b, [total, a], `${b} = ${total} / ${a}`, (v) => v[total] / v[a]),
	];
}
function squareProduct(
	total: string,
	a: string,
	b: string,
	factor = 1,
): Rule[] {
	return [
		rule(
			total,
			[a, b],
			`${total} = ${factor} · ${a} · ${b}²`,
			(v) => factor * v[a] * v[b] ** 2,
		),
		rule(
			a,
			[total, b],
			`${a} = ${total} / (${factor} · ${b}²)`,
			(v) => v[total] / (factor * v[b] ** 2),
		),
		rule(
			b,
			[total, a],
			`${b} = √(${total} / (${factor} · ${a}))`,
			(v) => (v[b] < 0 ? -1 : 1) * Math.sqrt(v[total] / (factor * v[a])),
		),
	];
}
function orthogonalLeg(total: number, other: number, known?: number) {
	// Validate an already known tiny component through the forward norm. Squaring
	// two nearly equal larger sides would lose it through floating cancellation.
	if (known !== undefined) {
		const reconstructed = Math.hypot(known, other);
		if (
			Math.abs(reconstructed - total) <=
			1e-6 * Math.max(Math.abs(reconstructed), Math.abs(total))
		)
			return known;
	}
	if (total === 0 && other === 0) return 0;
	const ratio = other / total;
	return total * Math.sqrt((1 - ratio) * (1 + ratio));
}
function hypotenuse(total: string, a: string, b: string): Rule[] {
	return [
		rule(total, [a, b], `${total} = √(${a}² + ${b}²)`, (v) =>
			Math.hypot(v[a], v[b]),
		),
		rule(a, [total, b], `${a} = √(${total}² − ${b}²)`, (v) =>
			orthogonalLeg(v[total], v[b], v[a]),
		),
		rule(b, [total, a], `${b} = √(${total}² − ${a}²)`, (v) =>
			orthogonalLeg(v[total], v[a], v[b]),
		),
	];
}

export function runModel(
	given: Record<string, number>,
	rules: readonly Rule[],
	positive: readonly string[] = [],
	nonnegative: readonly string[] = [],
	options: SolveOptions = {},
) {
	const result = solveEquations(given, rules, { ...options, positive });
	for (const key of nonnegative)
		if (
			result.values[key] !== undefined &&
			result.values[key] < 0 &&
			!result.issues.some((i) => i.kind === "domain" && i.target === key)
		)
			result.issues.push({
				kind: "domain",
				target: key,
				actual: result.values[key],
			});
	return result;
}
export const capacitorRules: readonly Rule[] = [
	...product("Q", "C", "U"),
	...product("Q", "I", "t"),
	...product("F", "Q", "E"),
	...product("U", "E", "s"),
	...squareProduct("W", "C", "U", 0.5),
	rule("W", ["Q", "U"], "W = Q · U / 2", (v) => (v.Q * v.U) / 2),
	rule("U", ["W", "Q"], "U = 2W / Q", (v) => (2 * v.W) / v.Q),
	rule("Q", ["W", "U"], "Q = 2W / U", (v) => (2 * v.W) / v.U),
	rule(
		"C",
		["er", "A", "s"],
		"C = ε₀ · εr · A / s",
		(v) => (EPSILON_0 * v.er * v.A) / v.s,
	),
	rule(
		"er",
		["C", "A", "s"],
		"εr = C · s / (ε₀ · A)",
		(v) => (v.C * v.s) / (EPSILON_0 * v.A),
	),
	rule(
		"A",
		["C", "er", "s"],
		"A = C · s / (ε₀ · εr)",
		(v) => (v.C * v.s) / (EPSILON_0 * v.er),
	),
	rule(
		"s",
		["C", "er", "A"],
		"s = ε₀ · εr · A / C",
		(v) => (EPSILON_0 * v.er * v.A) / v.C,
	),
	rule("A", ["d"], "A = π · d² / 4", (v) => (Math.PI * v.d ** 2) / 4),
	rule("d", ["A"], "d = √(4A / π)", (v) => Math.sqrt((4 * v.A) / Math.PI)),
];
export const solveCapacitor = (given: Record<string, number>) =>
	runModel(given, capacitorRules, ["C", "er", "A", "d", "s"], ["W", "t"]);
export const inductorRules: readonly Rule[] = [
	...squareProduct("L", "Al", "N"),
	...product("Phi", "B", "A"),
	...product("U", "B", "motion"),
	rule("motion", ["l", "v"], "l · v", (v) => v.l * v.v),
	rule("l", ["motion", "v"], "l = (l · v) / v", (v) => v.motion / v.v),
	rule("v", ["motion", "l"], "v = (l · v) / l", (v) => v.motion / v.l),
	rule("Phi", ["L", "I", "N"], "Φ = L · I / N", (v) => (v.L * v.I) / v.N),
	rule("L", ["Phi", "N", "I"], "L = Φ · N / I", (v) => (v.Phi * v.N) / v.I),
	rule("N", ["L", "I", "Phi"], "N = L · I / Φ", (v) => (v.L * v.I) / v.Phi),
	rule("I", ["Phi", "N", "L"], "I = Φ · N / L", (v) => (v.Phi * v.N) / v.L),
	rule(
		"Al",
		["ur", "A", "l"],
		"A_L = μ₀ · μr · A / l",
		(v) => (MU_0 * v.ur * v.A) / v.l,
	),
	rule(
		"ur",
		["Al", "A", "l"],
		"μr = A_L · l / (μ₀A)",
		(v) => (v.Al * v.l) / (MU_0 * v.A),
	),
	rule(
		"A",
		["Al", "ur", "l"],
		"A = A_L · l / (μ₀μr)",
		(v) => (v.Al * v.l) / (MU_0 * v.ur),
	),
	rule(
		"l",
		["Al", "ur", "A"],
		"l = μ₀μrA / A_L",
		(v) => (MU_0 * v.ur * v.A) / v.Al,
	),
	rule("U", ["L", "I", "t"], "U_ind = −L · ΔI / Δt", (v) => (-v.L * v.I) / v.t),
	rule("I", ["U", "t", "L"], "ΔI = −U_ind · Δt / L", (v) => (-v.U * v.t) / v.L),
	rule("L", ["U", "t", "I"], "L = −U_ind · Δt / ΔI", (v) => (-v.U * v.t) / v.I),
	rule("t", ["L", "I", "U"], "Δt = −L · ΔI / U_ind", (v) => (-v.L * v.I) / v.U),
	rule(
		"U",
		["N", "Phi", "t"],
		"U_ind = −N · ΔΦ/Δt",
		(v) => (-v.N * v.Phi) / v.t,
	),
	rule("Phi", ["U", "t", "N"], "ΔΦ = −U_ind Δt/N", (v) => (-v.U * v.t) / v.N),
	rule("N", ["U", "t", "Phi"], "N = −U_ind Δt/ΔΦ", (v) => (-v.U * v.t) / v.Phi),
	rule("t", ["N", "Phi", "U"], "Δt = −NΔΦ/U_ind", (v) => (-v.N * v.Phi) / v.U),
];
export const solveInductor = (given: Record<string, number>) =>
	runModel(given, inductorRules, ["L", "Al", "ur", "A", "l", "N"], ["t"]);
export type TransientKind = "RC" | "RL";
export function transientFactor(
	kind: TransientKind,
	discharging: boolean,
	quantity: "voltage" | "current",
	time: number,
	tau: number,
) {
	const decay = Math.exp(-time / tau);
	if (kind === "RC")
		return quantity === "voltage"
			? discharging
				? decay
				: -Math.expm1(-time / tau)
			: discharging
				? -decay
				: decay;
	return quantity === "voltage"
		? discharging
			? -decay
			: decay
		: discharging
			? decay
			: -Math.expm1(-time / tau);
}
function transientCurveRules(
	initial: string,
	atTime: string,
	kind: TransientKind,
	discharging: boolean,
	quantity: "voltage" | "current",
): Rule[] {
	const rising =
		(kind === "RC" && quantity === "voltage" && !discharging) ||
		(kind === "RL" && quantity === "current" && !discharging);
	const sign =
		discharging &&
		((kind === "RC" && quantity === "current") ||
			(kind === "RL" && quantity === "voltage"))
			? -1
			: 1;
	const ratio = (v: Record<string, number>) => v[atTime] / v[initial] / sign;
	const logarithm = (v: Record<string, number>) =>
		rising ? Math.log1p(-ratio(v)) : Math.log(ratio(v));
	const formula = `${atTime} = ${sign < 0 ? "−" : ""}${initial} · ${rising ? "(1 − e^(−t/τ))" : "e^(−t/τ)"}`;
	return [
		rule(
			atTime,
			[initial, "t", "tau"],
			formula,
			(v) =>
				v[initial] * transientFactor(kind, discharging, quantity, v.t, v.tau),
		),
		rule(
			initial,
			[atTime, "t", "tau"],
			`${initial} aus ${formula}`,
			(v) =>
				v[atTime] / transientFactor(kind, discharging, quantity, v.t, v.tau),
		),
		rule(
			"t",
			[initial, atTime, "tau"],
			`t = −τ · ${rising ? "ln(1 − Verhältnis)" : "ln(Verhältnis)"}`,
			(v) => -v.tau * logarithm(v),
		),
		rule(
			"tau",
			[initial, atTime, "t"],
			`τ = −t / ${rising ? "ln(1 − Verhältnis)" : "ln(Verhältnis)"}`,
			(v) => -v.t / logarithm(v),
		),
	];
}
export function solveTransient(
	given: Record<string, number>,
	kind: TransientKind,
	discharging = false,
) {
	const componentRules =
		kind === "RC"
			? product("tau", "R", "C")
			: [
					rule("tau", ["L", "R"], "τ = L / R", (v) => v.L / v.R),
					rule("L", ["tau", "R"], "L = τ · R", (v) => v.tau * v.R),
					rule("R", ["L", "tau"], "R = L / τ", (v) => v.L / v.tau),
				];
	const rules = [
		...componentRules,
		...product("U", "R", "I"),
		...transientCurveRules("U", "Ut", kind, discharging, "voltage"),
		...transientCurveRules("I", "It", kind, discharging, "current"),
	];
	const result = runModel(given, rules, ["R", "C", "L", "tau"], ["t"]);
	for (const [initial, atTime, quantity] of [
		["U", "Ut", "voltage"],
		["I", "It", "current"],
	] as const) {
		const a = result.values[initial],
			b = result.values[atTime];
		if (a === undefined || b === undefined) continue;
		const sign =
			discharging &&
			((kind === "RC" && quantity === "current") ||
				(kind === "RL" && quantity === "voltage"))
				? -1
				: 1;
		const ratio = b / a / sign;
		if ((a === 0 && b !== 0) || (a !== 0 && (ratio < 0 || ratio > 1)))
			result.issues.push({ kind: "domain", target: atTime, actual: b });
	}
	return result;
}
function phaseRules(total: string, a: string, b: string): Rule[] {
	return [
		...hypotenuse(total, a, b),
		rule("cosphi", [a, total], `cos φ = ${a}/${total}`, (v) => v[a] / v[total]),
		rule("sinphi", [b, total], `sin φ = ${b}/${total}`, (v) => v[b] / v[total]),
		rule(
			a,
			["cosphi", total],
			`${a} = cos φ · ${total}`,
			(v) => v.cosphi * v[total],
		),
		rule(
			b,
			["sinphi", total],
			`${b} = sin φ · ${total}`,
			(v) => v.sinphi * v[total],
		),
		rule(total, [a, "cosphi"], `${total} = ${a}/cos φ`, (v) => v[a] / v.cosphi),
		rule(total, [b, "sinphi"], `${total} = ${b}/sin φ`, (v) => v[b] / v.sinphi),
		rule("phi", [a, b], `φ = atan2(${b},${a})`, (v) =>
			v[a] === 0 && v[b] === 0 ? NaN : Math.atan2(v[b], v[a]),
		),
	];
}
export function capacitorACRules(
	parallel = false,
	phaseIsGiven = false,
): Rule[] {
	// Only exact supplied quadrantal angles get exact trig endpoints. For a phase
	// derived from components, retain their cos/sin ratios: atan2 can round to π/2
	// despite a genuinely nonzero real component, or cos can round to 1 near zero.
	const angle = [
		rule("cosphi", ["phi"], "cos φ", (v) =>
			!phaseIsGiven && v.cosphi !== undefined
				? v.cosphi
				: v.phi === Math.PI / 2
					? 0
					: Math.cos(v.phi),
		),
		rule("sinphi", ["phi"], "sin φ", (v) =>
			!phaseIsGiven && v.sinphi !== undefined
				? v.sinphi
				: v.phi === Math.PI / 2
					? 1
					: Math.sin(v.phi),
		),
		...(!phaseIsGiven
			? [
					rule("phi", ["cosphi"], "φ = arccos(cos φ)", (v) =>
						v.phi !== undefined ? v.phi : Math.acos(v.cosphi),
					),
					rule("phi", ["sinphi"], "φ = arcsin(sin φ)", (v) =>
						v.phi !== undefined ? v.phi : Math.asin(v.sinphi),
					),
				]
			: []),
	];

	const capacitor = parallel
		? [
				rule("Bc", ["f", "C"], "B_C = 2πfC", (v) => 2 * Math.PI * v.f * v.C),
				rule(
					"C",
					["Bc", "f"],
					"C = B_C / (2πf)",
					(v) => v.Bc / (2 * Math.PI * v.f),
				),
				rule(
					"f",
					["Bc", "C"],
					"f = B_C / (2πC)",
					(v) => v.Bc / (2 * Math.PI * v.C),
				),
			]
		: [
				rule(
					"Xc",
					["f", "C"],
					"X_C = 1 / (2πfC)",
					(v) => 1 / (2 * Math.PI * v.f * v.C),
				),
				rule(
					"C",
					["Xc", "f"],
					"C = 1 / (2πfX_C)",
					(v) => 1 / (2 * Math.PI * v.f * v.Xc),
				),
				rule(
					"f",
					["Xc", "C"],
					"f = 1 / (2πCX_C)",
					(v) => 1 / (2 * Math.PI * v.C * v.Xc),
				),
			];
	return parallel
		? [
				...capacitor,
				...angle,
				...phaseRules("Y", "G", "Bc"),
				...phaseRules("I", "Ir", "Ic"),
				...phaseRules("S", "P", "Q"),
				...product("I", "U", "Y"),
				...product("Ir", "U", "G"),
				...product("Ic", "U", "Bc"),
				...product("S", "U", "I"),
				...product("P", "U", "Ir"),
				...product("Q", "U", "Ic"),
				...squareProduct("P", "G", "U"),
				...squareProduct("Q", "Bc", "U"),
				...squareProduct("S", "Y", "U"),
			]
		: [
				...capacitor,
				...angle,
				...phaseRules("Z", "R", "Xc"),
				...phaseRules("U", "Ur", "Uc"),
				...phaseRules("S", "P", "Qc"),
				...product("U", "I", "Z"),
				...product("Ur", "I", "R"),
				...product("Uc", "I", "Xc"),
				...product("S", "U", "I"),
				...product("P", "Ur", "I"),
				...product("Qc", "Uc", "I"),
				...squareProduct("P", "R", "I"),
				...squareProduct("Qc", "Xc", "I"),
				...squareProduct("S", "Z", "I"),
			];
}
export function solveCapacitorAC(
	given: Record<string, number>,
	parallel = false,
) {
	const result = runModel(
		given,
		capacitorACRules(parallel, given.phi !== undefined),
		["C", "f", "Z", "Y"],
		parallel
			? ["G", "Bc", "I", "Ir", "Ic", "U", "P", "Q", "S"]
			: ["R", "Xc", "I", "U", "Ur", "Uc", "P", "Qc", "S"],
	);
	for (const key of ["sinphi", "cosphi"])
		if (
			result.values[key] !== undefined &&
			(result.values[key] < 0 || result.values[key] > 1)
		)
			result.issues.push({
				kind: "domain",
				target: key,
				actual: result.values[key],
			});
	if (
		result.values.phi !== undefined &&
		(result.values.phi < 0 || result.values.phi > Math.PI / 2)
	)
		result.issues.push({
			kind: "domain",
			target: "phi",
			actual: result.values.phi,
		});
	if (
		result.values.cosphi !== undefined &&
		result.values.sinphi !== undefined
	) {
		const norm = Math.hypot(result.values.cosphi, result.values.sinphi);
		if (Number.isFinite(norm) && Math.abs(norm - 1) > 1e-6)
			result.issues.push({
				kind: "contradiction",
				target: "cosphi",
				formula: "cos²φ + sin²φ = 1",
				actual: norm,
				expected: 1,
			});
	}
	return result;
}
function sideRules(side: string): Rule[] {
	const u = "U" + side,
		i = "I" + side,
		r = "R" + side,
		p = "P" + side;
	return [
		...product(u, i, r),
		...product(p, u, i),
		...squareProduct(p, r, i),
		rule(p, [u, r], `${p} = ${u}²/${r}`, (v) => v[u] ** 2 / v[r]),
		rule(u, [p, r], `${u} = √(${p}${r})`, (v) => Math.sqrt(v[p] * v[r])),
		rule(r, [u, p], `${r} = ${u}²/${p}`, (v) => v[u] ** 2 / v[p]),
	];
}
export function solveTransformer(given: Record<string, number>) {
	const base = [
		rule(
			"eta",
			["I1", "I2", "ue"],
			"η = I₂/(üI₁)",
			(v) => v.I2 / (v.ue * v.I1),
		),
		rule(
			"eta",
			["R1", "R2", "ue"],
			"η = R₁/(ü²R₂)",
			(v) => v.R1 / (v.ue ** 2 * v.R2),
		),
		...product("U1", "ue", "U2"),
		...product("N1", "ue", "N2"),
		...product("P2", "eta", "P1"),
		...sideRules("1"),
		...sideRules("2"),
		rule("ue", ["C1", "C2"], "ü = √(C₂/C₁)", (v) => Math.sqrt(v.C2 / v.C1)),
		rule("C1", ["C2", "ue"], "C₁ = C₂/ü²", (v) => v.C2 / v.ue ** 2),
		rule("C2", ["C1", "ue"], "C₂ = C₁ü²", (v) => v.C1 * v.ue ** 2),
	];
	const initial = runModel(
		given,
		base,
		["ue", "N1", "N2", "R1", "R2", "C1", "C2", "eta"],
		["U1", "U2", "I1", "I2", "P1", "P2"],
	);
	if (initial.issues.length) return { ...initial, assumedIdeal: false };
	const assumedIdeal = initial.values.eta === undefined;
	const next = { ...given, ...(assumedIdeal ? { eta: 1 } : {}) };
	const rules = [
		...base,
		rule(
			"I2",
			["I1", "ue", "eta"],
			"I₂ = η · ü · I₁",
			(v) => v.eta * v.ue * v.I1,
		),
		rule(
			"I1",
			["I2", "ue", "eta"],
			"I₁ = I₂/(ηü)",
			(v) => v.I2 / (v.eta * v.ue),
		),
		rule(
			"ue",
			["I1", "I2", "eta"],
			"ü = I₂/(ηI₁)",
			(v) => v.I2 / (v.eta * v.I1),
		),
		rule(
			"R1",
			["R2", "ue", "eta"],
			"R₁ = η · ü² · R₂",
			(v) => v.eta * v.ue ** 2 * v.R2,
		),
		rule(
			"R2",
			["R1", "ue", "eta"],
			"R₂ = R₁/(ηü²)",
			(v) => v.R1 / (v.eta * v.ue ** 2),
		),
		rule("ue", ["R1", "R2", "eta"], "ü = √(R₁/(ηR₂))", (v) =>
			Math.sqrt(v.R1 / (v.eta * v.R2)),
		),
	];
	const result = runModel(
		next,
		rules,
		["ue", "N1", "N2", "R1", "R2", "C1", "C2", "eta"],
		["U1", "U2", "I1", "I2", "P1", "P2"],
	);
	if (result.values.eta !== undefined && result.values.eta > 1)
		result.issues.push({
			kind: "domain",
			target: "eta",
			actual: result.values.eta,
		});
	return { ...result, assumedIdeal };
}
export const magnetismRules: readonly Rule[] = [
	...product("Theta", "N", "I"),
	...product("Theta", "H", "l"),
	...product("Phi", "B", "A"),
	...product("Theta", "Rm", "Phi"),
	rule("B", ["ur", "H"], "B = μ₀μrH", (v) => MU_0 * v.ur * v.H),
	rule("H", ["B", "ur"], "H = B/(μ₀μr)", (v) => v.B / (MU_0 * v.ur)),
	rule("ur", ["B", "H"], "μr = B/(μ₀H)", (v) => v.B / (MU_0 * v.H)),
	rule(
		"Rm",
		["l", "ur", "A"],
		"R_m = l/(μ₀μrA)",
		(v) => v.l / (MU_0 * v.ur * v.A),
	),
	rule(
		"l",
		["Rm", "ur", "A"],
		"l = R_m μ₀μrA",
		(v) => v.Rm * MU_0 * v.ur * v.A,
	),
	rule(
		"A",
		["l", "Rm", "ur"],
		"A = l/(R_m μ₀μr)",
		(v) => v.l / (v.Rm * MU_0 * v.ur),
	),
	rule(
		"ur",
		["l", "Rm", "A"],
		"μr = l/(R_m μ₀A)",
		(v) => v.l / (v.Rm * MU_0 * v.A),
	),
	rule(
		"U",
		["N", "Phi", "t"],
		"U_ind = −N · ΔΦ/Δt",
		(v) => (-v.N * v.Phi) / v.t,
	),
	rule("Phi", ["U", "t", "N"], "ΔΦ = −U_ind Δt/N", (v) => (-v.U * v.t) / v.N),
	rule("N", ["U", "t", "Phi"], "N = −U_ind Δt/ΔΦ", (v) => (-v.U * v.t) / v.Phi),
	rule("t", ["N", "Phi", "U"], "Δt = −NΔΦ/U_ind", (v) => (-v.N * v.Phi) / v.U),
];
export const solveMagnetism = (given: Record<string, number>) =>
	runModel(given, magnetismRules, ["ur", "N", "Rm", "A", "l"], ["t"]);
