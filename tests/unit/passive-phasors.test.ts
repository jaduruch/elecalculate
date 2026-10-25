import { test, expect } from "bun:test";
import { phasorGeometry } from "../../src/lib/passive-phasors";
test("phasors retain a uniform scale and the physical angle", () => {
	const p = phasorGeometry(4, 3, 1000, 600);
	expect((p.corner.x - p.origin.x) / (p.tip.y - p.origin.y)).toBeCloseTo(
		4 / 3,
		12,
	);
	expect(p.angle).toBeCloseTo(Math.atan2(3, 4), 12);
	expect(p.tip.x).toBeLessThanOrEqual(p.right);
	expect(p.tip.y).toBeLessThanOrEqual(p.bottom);
});
test("capacitive series and parallel use opposite imaginary directions", () => {
	const down = phasorGeometry(4, 3, 1000, 600, 1),
		up = phasorGeometry(4, 3, 1000, 600, -1);
	expect(down.tip.y).toBeGreaterThan(down.origin.y);
	expect(up.tip.y).toBeLessThan(up.origin.y);
	expect(down.angle).toBe(up.angle);
});
test("null phasors remain zero and do not invent an angle or example", () => {
	const p = phasorGeometry(0, 0, 1000, 600);
	expect(p.tip).toEqual(p.origin);
	expect(p.angle).toBeUndefined();
});
test("subnormal, astronomical and extreme-aspect values have finite on-canvas coordinates", () => {
	for (const [a, b] of [
		[1e-320, 2e-320],
		[1e308, 1e308],
		[1e-300, 1e300],
		[1e300, 1e-300],
		[0, 1e308],
		[1e308, 0],
	])
		for (const direction of [1, -1] as const) {
			const p = phasorGeometry(a, b, 1000, 600, direction);
			for (const point of [p.origin, p.corner, p.tip]) {
				expect(Number.isFinite(point.x) && Number.isFinite(point.y)).toBe(true);
				expect(point.x).toBeGreaterThanOrEqual(0);
				expect(point.x).toBeLessThanOrEqual(1000);
				expect(point.y).toBeGreaterThanOrEqual(0);
				expect(point.y).toBeLessThanOrEqual(600);
			}
		}
});
test("invalid phasor geometry is explicitly rejected", () => {
	for (const [a, b] of [
		[NaN, 1],
		[Infinity, 1],
		[-1, 2],
	])
		expect(() => phasorGeometry(a, b, 1000, 600)).toThrow();
	expect(() => phasorGeometry(1, 2, 0, 600)).toThrow();
});
