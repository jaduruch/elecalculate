import { test, expect } from "bun:test";
import { networkResistance } from "../../src/lib/resistor-network";
test("resistor networks retain precision at ordinary and extreme scales", () => {
	expect(networkResistance(1000, 2000)).toBe(3000);
	expect(networkResistance(1000, 1000, true)).toBe(500);
	expect(networkResistance(1e308, 1e308, true)).toBe(5e307);
	expect(networkResistance(1e-300, 1e-300, true)).toBe(5e-301);
	expect(networkResistance(1e308, 1, true)).toBe(1);
	expect(() => networkResistance(0, 1)).toThrow();
	expect(() => networkResistance(1e308, 1e308)).toThrow();
});
