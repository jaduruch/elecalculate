import { describe, test, expect } from "bun:test";
import {
	solveEquations,
	dividerRules,
	loadedDividerRules,
} from "../../src/lib/equations";
import { parseInput, parseInputsquare } from "../../src/lib/si";
import { entrySchema, snapshotSchema } from "../../src/lib/notebook";
describe("unit and input boundaries", () => {
	test("SI prefixes, signs, decimal comma, scientific notation and micro", () => {
		expect(parseInput("4,7k")).toBe(4700);
		expect(parseInput("1M")).toBe(1e6);
		expect(parseInput("1m")).toBe(0.001);
		expect(parseInput("10µ")).toBeCloseTo(0.00001, 10);
		expect(parseInput("10μ")).toBeCloseTo(0.00001, 10);
		expect(parseInput("-.5")).toBe(-0.5);
		expect(parseInput("1e-9")).toBe(1e-9);
	});
	test("invalid values never become executable or silently parsed", () => {
		for (const value of [
			"",
			"1abc",
			"1kΩ",
			"NaN",
			"Infinity",
			"1e999",
			"<img src=x onerror=alert(1)>",
		])
			expect(parseInput(value)).toBeNaN();
	});
	test("area prefixes apply to the dimension, not the scalar", () => {
		expect(parseInputsquare("2m")).toBe(0.000002);
		expect(parseInputsquare("3k")).toBe(3000000);
	});
	test("notebook rejects unknown routes and excessive untrusted content", () => {
		expect(
			entrySchema.safeParse({
				title: "x",
				note: "",
				route: "javascript:alert(1)",
				snapshot: { values: {}, selected: [], open: [] },
			}).success,
		).toBe(false);
		expect(
			snapshotSchema.safeParse({
				values: { R: "x".repeat(1001) },
				selected: [],
				open: [],
			}).success,
		).toBe(false);
	});
});
describe("dependency solver", () => {
	test("divider solves without rounding its intermediate values", () => {
		const r = solveEquations({ Uin: 12, R1: 1000, R2: 2000 }, dividerRules);
		expect(r.values.I).toBe(0.004);
		expect(r.values.Uout).toBe(8);
		expect(r.values.U1).toBe(4);
		expect(new Set(r.steps.map((s) => s.target)).size).toBe(r.steps.length);
	});
	test("inverse divider from output and known resistor", () => {
		const r = solveEquations({ Uin: 12, Uout: 8, R1: 1000 }, dividerRules);
		expect(r.values.R2).toBe(2000);
		expect(r.values.I).toBe(0.004);
	});
	test("known current and series resistors derive the source by adding drops", () => {
		const r = solveEquations({ I: 0.004, R1: 1000, R2: 2000 }, dividerRules);
		expect(r.values.Uin).toBe(12);
		expect(r.values.U1 + r.values.Uout).toBe(r.values.Uin);
	});
	test("loaded divider obeys Kirchhoff current and voltage laws", () => {
		const r = solveEquations(
			{ Uin: 12, R1: 1000, R2: 2000, RL: 4000 },
			loadedDividerRules,
		);
		expect(r.values.Uout).toBeCloseTo(48 / 7, 12);
		expect(r.values.Iges).toBeCloseTo(r.values.IR2 + r.values.IRL, 12);
		expect(r.values.Uin).toBeCloseTo(r.values.U1 + r.values.Uout, 12);
	});
	test("empty and zero-denominator dependencies terminate", () => {
		expect(solveEquations({}, dividerRules).steps).toHaveLength(0);
		const r = solveEquations({ Uin: 10, I: 0 }, dividerRules);
		expect(r.values.Rges).toBeUndefined();
	});
});
