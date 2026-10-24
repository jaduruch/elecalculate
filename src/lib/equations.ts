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
export function solveEquations(
	given: Record<string, number>,
	rules: readonly Rule[],
) {
	const values = { ...given };
	const steps: Step[] = [];
	const variables = new Set(rules.map((r) => r.target));
	for (let pass = 0; pass <= variables.size; pass++) {
		let changed = false;
		for (const rule of rules) {
			if (
				values[rule.target] !== undefined ||
				!rule.inputs.every((k) => values[k] !== undefined)
			)
				continue;
			const n = rule.solve(values);
			if (!Number.isFinite(n)) continue;
			values[rule.target] = n;
			steps.push({
				target: rule.target,
				value: n,
				formula: rule.formula,
				inputs: Object.fromEntries(rule.inputs.map((k) => [k, values[k]])),
			});
			changed = true;
		}
		if (!changed) break;
	}
	return { values, steps };
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
