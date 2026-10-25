import { describe, expect, test } from "bun:test";
import {
	dividerRules,
	loadedDividerRules,
	solveEquations,
} from "../../src/lib/equations";
import { parseInput, parseInputsquare } from "../../src/lib/si";
const options = { positive: ["R1", "R2", "RL", "Rp", "Rges"] };
function combinations<T>(items: T[], count: number): T[][] {
	if (!count) return [[]];
	return items.flatMap((item, index) =>
		combinations(items.slice(index + 1), count - 1).map((rest) => [
			item,
			...rest,
		]),
	);
}
describe("independent divider audit", () => {
	test("rejects contradictions instead of silently keeping a supplied wrong output", () => {
		const result = solveEquations(
			{ Uin: 12, R1: 1000, R2: 2000, Uout: 4 },
			dividerRules,
			options,
		);
		expect(result.issues.some((issue) => issue.kind === "contradiction")).toBe(
			true,
		);
	});
	test("rejects non-finite supplied values at its own trust boundary", () => {
		for (const value of [NaN, Infinity, -Infinity])
			expect(
				solveEquations(
					{ Uin: value, R1: 1000, R2: 2000 },
					dividerRules,
					options,
				).issues[0].kind,
			).toBe("input");
	});
	test("rejects inverse inputs requiring a negative or zero resistor", () => {
		for (const Uout of [-4, 15]) {
			const result = solveEquations(
				{ Uin: 12, Uout, R1: 1000 },
				dividerRules,
				options,
			);
			expect(result.issues.some((issue) => issue.kind === "domain")).toBe(true);
			expect(result.values.R2).toBeUndefined();
		}
		expect(
			solveEquations({ R1: 0, R2: 1000, Uin: 12 }, dividerRules, options)
				.issues[0].kind,
		).toBe("domain");
	});
	test("distinguishes open-circuit divergence from an underdetermined zero-voltage case", () => {
		expect(
			solveEquations({ Uin: 12, I: 0 }, dividerRules, options).issues.some(
				(issue) => issue.kind === "unbounded",
			),
		).toBe(true);
		expect(
			solveEquations({ Uin: 0, I: 0 }, dividerRules, options).issues,
		).toEqual([]);
	});
	test("supports a reversed source with positive passive resistances", () => {
		const result = solveEquations(
			{ Uin: -12, R1: 1000, R2: 2000 },
			dividerRules,
			options,
		);
		expect(result.values.Uout).toBe(-8);
		expect(result.values.I).toBe(-0.004);
		expect(result.issues).toEqual([]);
	});
	test("allows rounded known outputs within explicit numeric tolerance", () => {
		expect(
			solveEquations(
				{ Uin: 12, R1: 1000, R2: 2000, RL: 4000, Uout: 6.857143 },
				loadedDividerRules,
				options,
			).issues,
		).toEqual([]);
	});
	test("all three-value subsets preserve the independent unladen reference solution", () => {
		const reference = { Uin: 12, U1: 4, Uout: 8, R1: 1000, R2: 2000, I: 0.004 };
		for (const keys of combinations(Object.keys(reference), 3)) {
			const given = Object.fromEntries(
				keys.map((key) => [key, reference[key as keyof typeof reference]]),
			);
			const result = solveEquations(given, dividerRules, options);
			expect(result.issues).toEqual([]);
			for (const [key, value] of Object.entries(result.values))
				if (key in reference)
					expect(value).toBeCloseTo(
						reference[key as keyof typeof reference],
						8,
					);
		}
	});
	test("all four-value subsets preserve Kirchhoff laws in the loaded reference", () => {
		const Uout = 48 / 7;
		const Iges = 12 / (1000 + (2000 * 4000) / 6000);
		const reference = {
			Uin: 12,
			U1: 12 - Uout,
			Uout,
			R1: 1000,
			R2: 2000,
			RL: 4000,
			Iges,
			IR2: Uout / 2000,
			IRL: Uout / 4000,
		};
		for (const keys of combinations(Object.keys(reference), 4)) {
			const given = Object.fromEntries(
				keys.map((key) => [key, reference[key as keyof typeof reference]]),
			);
			const result = solveEquations(given, loadedDividerRules, options);
			expect(result.issues).toEqual([]);
			for (const [key, value] of Object.entries(result.values))
				if (key in reference)
					expect(value).toBeCloseTo(
						reference[key as keyof typeof reference],
						8,
					);
		}
	});
});
describe("scientific SI input", () => {
	test("accepts both standard scientific exponent cases without changing prefix case", () => {
		expect(parseInput("2E3")).toBe(2000);
		expect(parseInput("2E-3")).toBe(0.002);
		expect(parseInput("2E3m")).toBe(2);
		expect(parseInput("2e3M")).toBe(2e9);
		expect(parseInputsquare("2E3m")).toBe(0.002);
	});
});

test("tiny SI values do not bypass relative consistency checks", () => {
	const rules = [
		{
			target: "total",
			inputs: ["a", "b"],
			formula: "total = a + b",
			solve: (v: Record<string, number>) => v.a + v.b,
		},
	];
	for (const scale of [1, 1e-9, 1e-12, 1e-15, 1e-30, 1e-100, 1e-300]) {
		expect(
			solveEquations(
				{ total: 9 * scale, a: scale, b: scale },
				rules,
			).issues.some((issue) => issue.kind === "contradiction"),
		).toBe(true);
		expect(
			solveEquations({ total: 2 * scale, a: scale, b: scale }, rules).issues,
		).toEqual([]);
	}
});
