/** Ideal feedback circuits, matched to the site's labelled source diagrams.
 * Reference: TI AN-31 Rev. D, figures 1-1, 1-2, 1-3 and 1-5.
 * https://www.ti.com/lit/an/snla140d/snla140d.pdf
 */
import { type EquationIssue, type Rule, solveEquations } from "./equations";
export type OpampKind = "inverting" | "noninverting" | "summing" | "difference";
const rule = (
	target: string,
	inputs: string[],
	formula: string,
	solve: Rule["solve"],
): Rule => ({ target, inputs, formula, solve });
const voltageGain: Rule[] = [
	rule("Uout", ["V", "Uin"], "Uout = V · Uin", (v) => v.V * v.Uin),
	rule("Uin", ["Uout", "V"], "Uin = Uout / V", (v) => v.Uout / v.V),
	rule("V", ["Uout", "Uin"], "V = Uout / Uin", (v) => v.Uout / v.Uin),
];
export const opampRules: Record<OpampKind, readonly Rule[]> = {
	inverting: [
		rule("V", ["R1", "R2"], "V = −R2 / R1", (v) => -v.R2 / v.R1),
		rule("R1", ["R2", "V"], "R1 = −R2 / V", (v) => -v.R2 / v.V),
		rule("R2", ["R1", "V"], "R2 = −V · R1", (v) => -v.V * v.R1),
		...voltageGain,
	],
	noninverting: [
		rule("V", ["R1", "R2"], "V = 1 + R2 / R1", (v) => 1 + v.R2 / v.R1),
		rule("R1", ["R2", "V"], "R1 = R2 / (V − 1)", (v) => v.R2 / (v.V - 1)),
		rule("R2", ["R1", "V"], "R2 = R1 · (V − 1)", (v) => v.R1 * (v.V - 1)),
		...voltageGain,
	],
	summing: [
		rule("V1", ["R11", "R2"], "V1 = −R2 / R11", (v) => -v.R2 / v.R11),
		rule("V2", ["R12", "R2"], "V2 = −R2 / R12", (v) => -v.R2 / v.R12),
		rule("R11", ["R2", "V1"], "R11 = −R2 / V1", (v) => -v.R2 / v.V1),
		rule("R12", ["R2", "V2"], "R12 = −R2 / V2", (v) => -v.R2 / v.V2),
		rule("R2", ["R11", "V1"], "R2 = −V1 · R11", (v) => -v.V1 * v.R11),
		rule("R2", ["R12", "V2"], "R2 = −V2 · R12", (v) => -v.V2 * v.R12),
		rule(
			"Uout",
			["V1", "Uin1", "V2", "Uin2"],
			"Uout = V1 · Uin1 + V2 · Uin2",
			(v) => v.V1 * v.Uin1 + v.V2 * v.Uin2,
		),
		rule(
			"Uin1",
			["Uout", "V2", "Uin2", "V1"],
			"Uin1 = (Uout − V2 · Uin2) / V1",
			(v) => (v.Uout - v.V2 * v.Uin2) / v.V1,
		),
		rule(
			"Uin2",
			["Uout", "V1", "Uin1", "V2"],
			"Uin2 = (Uout − V1 · Uin1) / V2",
			(v) => (v.Uout - v.V1 * v.Uin1) / v.V2,
		),
		rule(
			"V1",
			["Uout", "V2", "Uin1", "Uin2"],
			"V1 = (Uout − V2 · Uin2) / Uin1",
			(v) => (v.Uout - v.V2 * v.Uin2) / v.Uin1,
		),
		rule(
			"V2",
			["Uout", "V1", "Uin1", "Uin2"],
			"V2 = (Uout − V1 · Uin1) / Uin2",
			(v) => (v.Uout - v.V1 * v.Uin1) / v.Uin2,
		),
	],
	difference: [
		rule("V", ["R13", "R24"], "V = R24 / R13", (v) => v.R24 / v.R13),
		rule("R13", ["R24", "V"], "R13 = R24 / V", (v) => v.R24 / v.V),
		rule("R24", ["R13", "V"], "R24 = V · R13", (v) => v.V * v.R13),
		rule("delta", ["Uin1", "Uin2"], "ΔU = Uin2 − Uin1", (v) => v.Uin2 - v.Uin1),
		rule(
			"Uin1",
			["Uin2", "delta"],
			"Uin1 = Uin2 − ΔU",
			(v) => v.Uin2 - v.delta,
		),
		rule(
			"Uin2",
			["Uin1", "delta"],
			"Uin2 = Uin1 + ΔU",
			(v) => v.Uin1 + v.delta,
		),
		rule("Uout", ["V", "delta"], "Uout = V · ΔU", (v) => v.V * v.delta),
		rule("delta", ["Uout", "V"], "ΔU = Uout / V", (v) => v.Uout / v.V),
		rule("V", ["Uout", "delta"], "V = Uout / ΔU", (v) => v.Uout / v.delta),
	],
};
export const opampFields: Record<OpampKind, Record<string, string>> = {
	inverting: { R1: "R1-1", R2: "R2-1", Uin: "Uin-1", Uout: "Uout-1", V: "V-1" },
	noninverting: {
		R1: "R1-2",
		R2: "R2-2",
		Uin: "Uin-2",
		Uout: "Uout-2",
		V: "V-2",
	},
	summing: {
		R11: "R11-3",
		R12: "R12-3",
		R2: "R2-3",
		Uin1: "Uin1-3",
		Uin2: "Uin2-3",
		Uout: "Uout-3",
		V1: "V1-3",
		V2: "V2-3",
	},
	difference: {
		R13: "R13-4",
		R24: "R24-4",
		Uin1: "Uin1-4",
		Uin2: "Uin2-4",
		Uout: "Uout-4",
		V: "V-4",
	},
};
const gains: Record<OpampKind, string[]> = {
	inverting: ["V"],
	noninverting: ["V"],
	summing: ["V1", "V2"],
	difference: ["V"],
};
function validGain(kind: OpampKind, value: number) {
	return kind === "inverting" || kind === "summing"
		? value < 0
		: kind === "noninverting"
			? value > 1
			: value > 0;
}
export function solveOpamp(kind: OpampKind, given: Record<string, number>) {
	const physical = Object.keys(opampFields[kind]).filter((key) =>
		key.startsWith("R"),
	);
	const invalidGain = gains[kind].find(
		(key) =>
			given[key] !== undefined &&
			Number.isFinite(given[key]) &&
			!validGain(kind, given[key]),
	);
	if (invalidGain)
		return {
			values: { ...given },
			steps: [],
			issues: [
				{
					kind: "domain",
					target: invalidGain,
					actual: given[invalidGain],
				} satisfies EquationIssue,
			],
		};
	const result = solveEquations(given, opampRules[kind], {
		positive: physical,
	});
	for (const key of gains[kind])
		if (
			result.values[key] !== undefined &&
			!validGain(kind, result.values[key]) &&
			!result.issues.some(
				(issue) => issue.target === key && issue.kind === "domain",
			)
		)
			result.issues.push({
				kind: "domain",
				target: key,
				actual: result.values[key],
			});
	return result;
}
