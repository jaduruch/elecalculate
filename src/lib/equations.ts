export interface Rule {
	target: string;
	inputs: string[];
	formula: string;
	solve: (values: Record<string, number>) => number;
}
export interface Step {
	target: string;
	value: number;
	formula: string;
	inputs: Record<string, number>;
}
export interface EquationIssue {
	kind: "input" | "domain" | "contradiction" | "unbounded";
	target: string;
	formula?: string;
	actual?: number;
	expected?: number;
}
export interface SolveOptions {
	positive?: readonly string[];
	relativeTolerance?: number;
	absoluteTolerance?: number;
}
export function solveEquations(
	given: Record<string, number>,
	rules: readonly Rule[],
	options: SolveOptions = {},
) {
	const values: Record<string, number> = {};
	const steps: Step[] = [];
	const issues: EquationIssue[] = [];
	const positive = new Set(options.positive ?? []);
	const addIssue = (issue: EquationIssue) => {
		if (
			!issues.some(
				(existing) =>
					existing.kind === issue.kind && existing.target === issue.target,
			)
		)
			issues.push(issue);
	};
	for (const [key, value] of Object.entries(given)) {
		if (!Number.isFinite(value))
			addIssue({ kind: "input", target: key, actual: value });
		else if (positive.has(key) && value <= 0)
			addIssue({ kind: "domain", target: key, actual: value });
		else values[key] = value;
	}
	if (issues.length) return { values, steps, issues };
	const variables = new Set(rules.map((rule) => rule.target));
	for (let pass = 0; pass <= variables.size; pass++) {
		let changed = false;
		for (const rule of rules) {
			if (
				values[rule.target] !== undefined ||
				!rule.inputs.every((key) => values[key] !== undefined)
			)
				continue;
			const value = rule.solve(values);
			if (!Number.isFinite(value)) continue;
			if (positive.has(rule.target) && value <= 0) {
				addIssue({
					kind: "domain",
					target: rule.target,
					formula: rule.formula,
					actual: value,
				});
				continue;
			}
			values[rule.target] = value;
			steps.push({
				target: rule.target,
				value,
				formula: rule.formula,
				inputs: Object.fromEntries(
					rule.inputs.map((key) => [key, values[key]]),
				),
			});
			changed = true;
		}
		if (!changed) break;
	}
	// Check every fully determined relationship, including supplied outputs. Keeping
	// the first derivation alone would silently hide inconsistent user constraints.
	const relativeTolerance = options.relativeTolerance ?? 1e-6;
	const absoluteTolerance = options.absoluteTolerance ?? 0;
	for (const rule of rules) {
		if (!rule.inputs.every((key) => values[key] !== undefined)) continue;
		const expected = rule.solve(values);
		const actual = values[rule.target];
		if (actual === undefined) {
			if (expected === Infinity || expected === -Infinity)
				addIssue({
					kind: "unbounded",
					target: rule.target,
					formula: rule.formula,
				});
			continue;
		}
		if (!Number.isFinite(expected)) continue;
		const tolerance = Math.max(
			absoluteTolerance,
			relativeTolerance * Math.max(Math.abs(actual), Math.abs(expected)),
		);
		if (Math.abs(actual - expected) > tolerance)
			addIssue({
				kind: "contradiction",
				target: rule.target,
				formula: rule.formula,
				actual,
				expected,
			});
	}
	return { values, steps, issues };
}
const rule = (
	target: string,
	inputs: string[],
	formula: string,
	solve: Rule["solve"],
): Rule => ({ target, inputs, formula, solve });
function sum(total: string, a: string, b: string): Rule[] {
	return [
		rule(total, [a, b], `${total} = ${a} + ${b}`, (v) => v[a] + v[b]),
		rule(a, [total, b], `${a} = ${total} − ${b}`, (v) => v[total] - v[b]),
		rule(b, [total, a], `${b} = ${total} − ${a}`, (v) => v[total] - v[a]),
	];
}
function product(total: string, a: string, b: string): Rule[] {
	return [
		rule(total, [a, b], `${total} = ${a} · ${b}`, (v) => v[a] * v[b]),
		rule(a, [total, b], `${a} = ${total} / ${b}`, (v) => v[total] / v[b]),
		rule(b, [total, a], `${b} = ${total} / ${a}`, (v) => v[total] / v[a]),
	];
}
const parallel = (p: string, a: string, b: string): Rule[] => [
	rule(
		p,
		[a, b],
		`${p} = ${a} · ${b} / (${a} + ${b})`,
		(v) => (v[a] * v[b]) / (v[a] + v[b]),
	),
	rule(
		a,
		[p, b],
		`${a} = ${p} · ${b} / (${b} − ${p})`,
		(v) => (v[p] * v[b]) / (v[b] - v[p]),
	),
	rule(
		b,
		[p, a],
		`${b} = ${p} · ${a} / (${a} − ${p})`,
		(v) => (v[p] * v[a]) / (v[a] - v[p]),
	),
];
export const dividerRules: readonly Rule[] = [
	...sum("Rges", "R1", "R2"),
	...sum("Uin", "U1", "Uout"),
	...product("Uin", "I", "Rges"),
	...product("U1", "I", "R1"),
	...product("Uout", "I", "R2"),
	rule(
		"R1",
		["R2", "Uin", "Uout"],
		"R1 = R2 · (Uin / Uout − 1)",
		(v) => v.R2 * (v.Uin / v.Uout - 1),
	),
	rule(
		"R2",
		["R1", "Uin", "Uout"],
		"R2 = R1 · Uout / (Uin − Uout)",
		(v) => (v.R1 * v.Uout) / (v.Uin - v.Uout),
	),
];
export const loadedDividerRules: readonly Rule[] = [
	...parallel("Rp", "R2", "RL"),
	...sum("Rges", "R1", "Rp"),
	...sum("Uin", "U1", "Uout"),
	...sum("Iges", "IR2", "IRL"),
	...product("Uin", "Iges", "Rges"),
	...product("U1", "Iges", "R1"),
	...product("Uout", "Iges", "Rp"),
	...product("Uout", "IR2", "R2"),
	...product("Uout", "IRL", "RL"),
	rule(
		"R1",
		["Rp", "Uin", "Uout"],
		"R1 = Rp · (Uin / Uout − 1)",
		(v) => v.Rp * (v.Uin / v.Uout - 1),
	),
	rule(
		"Rp",
		["R1", "Uin", "Uout"],
		"Rp = R1 · Uout / (Uin − Uout)",
		(v) => (v.R1 * v.Uout) / (v.Uin - v.Uout),
	),
];
