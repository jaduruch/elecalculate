import { describe, expect, test } from "bun:test";
import {
	formatPrefixNoUnit,
	formatPrefixNoUnitSquare,
	formatWithPrefix,
	formatWithPrefixsquare,
} from "../../src/lib/format-si";
import { parseInput, parseInputsquare } from "../../src/lib/si";
describe("SI display and intermediate precision", () => {
	test("keeps the familiar three-decimal ordinary display", () => {
		expect(formatWithPrefix(0.012, "A")).toBe("12.000mA");
		expect(formatWithPrefix(1000, "Ω")).toBe("1.000kΩ");
		expect(formatWithPrefix(-0.001, "A")).toBe("-1.000mA");
		expect(formatWithPrefix(0, "V")).toBe("0.000V");
	});
	test("small nonzero and large values remain scientific values, never false zero", () => {
		expect(formatWithPrefix(1e-15, "F")).toBe("1.000e-15F");
		expect(formatWithPrefix(-1e-15, "F")).toBe("-1.000e-15F");
		expect(formatWithPrefix(1e18, "Ω")).toBe("1.000e+18Ω");
		expect(formatWithPrefixsquare(1e-27, "m²")).toBe("1.000e-27 m²");
	});
	test("squared quantities apply the prefix twice rather than squaring the number", () => {
		expect(formatWithPrefixsquare(2e-6, "m²")).toBe("2.000 mm²");
		expect(formatWithPrefixsquare(2e6, "m²")).toBe("2.000 km²");
		expect(formatPrefixNoUnitSquare(2e-6)).toBe("2m");
	});
	test("rounding at a prefix boundary promotes to the next readable prefix", () => {
		expect(formatWithPrefix(999.999999, "Ω")).toBe("1.000kΩ");
		expect(formatWithPrefix(0.999999999, "V")).toBe("1.000V");
	});
	test("invalid computations are not formatted as numbers", () => {
		for (const value of [NaN, Infinity, -Infinity]) {
			expect(formatWithPrefix(value, "V")).toBe("Nicht definiert");
			expect(formatPrefixNoUnit(value)).toBe("Nicht definiert");
		}
	});
	test("intermediate formatting does not round a third to 0.333", () => {
		expect(parseInput(formatPrefixNoUnit(1 / 3))).toBeCloseTo(1 / 3, 15);
		expect(formatPrefixNoUnit(1 / 3).length).toBeGreaterThan(12);
		expect(
			parseInputsquare(formatPrefixNoUnitSquare(Math.PI * 1e-6)),
		).toBeCloseTo(Math.PI * 1e-6, 20);
	});
	test("normal and squared prefix round trips preserve at least fifteen significant digits", () => {
		for (let exponent = -300; exponent <= 300; exponent += 7)
			for (const mantissa of [
				1.234567890123456, 9.876543210987654, -1.234567890123456,
				-9.876543210987654,
			]) {
				const value = mantissa * 10 ** exponent;
				const scalar = parseInput(formatPrefixNoUnit(value));
				const area = parseInputsquare(formatPrefixNoUnitSquare(value));
				expect(Number.isFinite(scalar)).toBe(true);
				expect(Number.isFinite(area)).toBe(true);
				expect(Math.abs((scalar - value) / value)).toBeLessThan(1e-15);
				expect(Math.abs((area - value) / value)).toBeLessThan(1e-15);
			}
	});
	test("subnormal intermediate quantities do not disappear", () => {
		for (const value of [Number.MIN_VALUE, 1e-320, -1e-320]) {
			expect(parseInput(formatPrefixNoUnit(value))).toBe(value);
			expect(parseInputsquare(formatPrefixNoUnitSquare(value))).toBe(value);
		}
	});
});
