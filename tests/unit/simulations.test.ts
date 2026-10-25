import { test, expect } from "bun:test";
import {
	quantumGate,
	bloch,
	measurementProbability,
} from "../../src/lib/quantum";
import { lineVoltage, phaseSum } from "../../src/lib/three-phase";
test("balanced three-phase sum is zero at every point, with individual phases retained", () => {
	for (let i = 0; i < 100; i++) {
		expect(phaseSum(i / 10)).toBeCloseTo(0, 10);
		expect(phaseSum(i / 10, [true, false, false])).toBeCloseTo(
			100 * Math.sin(i / 10),
			10,
		);
	}
	expect(lineVoltage(230)).toBeCloseTo(398.37168574084177, 10);
	expect(lineVoltage(230, true)).toBe(230);
	expect(lineVoltage(0)).toBe(0);
	expect(() => lineVoltage(-1)).toThrow();
});
test("quantum gate identities preserve the Bloch norm and Born probabilities", () => {
	const states = [
		{ theta: 0, phi: 0 },
		{ theta: Math.PI, phi: 0 },
		{ theta: Math.PI / 2, phi: Math.PI / 2 },
		{ theta: 0.72, phi: 1.45 },
	];
	for (const state of states) {
		for (const gate of ["X", "Y", "Z", "H"] as const) {
			const twice = quantumGate(quantumGate(state, gate), gate);
			const a = bloch(twice),
				b = bloch(state);
			expect(a.x).toBeCloseTo(b.x, 10);
			expect(a.y).toBeCloseTo(b.y, 10);
			expect(a.z).toBeCloseTo(b.z, 10);
		}
		for (const gate of ["X", "Y", "Z", "H", "S", "T"] as const) {
			const { x, y, z } = bloch(quantumGate(state, gate));
			expect(x * x + y * y + z * z).toBeCloseTo(1, 12);
		}
	}
	expect(
		measurementProbability(quantumGate({ theta: 0, phi: 0 }, "H")),
	).toBeCloseTo(0.5, 12);
	expect(
		measurementProbability(quantumGate({ theta: 0, phi: 0 }, "X")),
	).toBeCloseTo(0, 12);
});
