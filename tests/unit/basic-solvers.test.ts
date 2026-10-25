import { describe, test, expect } from "bun:test";
import { solveBasic, formatBasic } from "../../src/lib/basic-solvers";
describe("independent basic calculator physics", () => {
	test("Ohm handles every pair, zero and signed current", () => {
		for (const given of [
			{ U: 12, R: 1000 },
			{ I: 0.012, R: 1000 },
			{ P: 0.144, R: 1000 },
			{ P: 0.144, I: 0.012 },
			{ P: 0.144, U: 12 },
			{ U: 12, I: 0.012 },
		]) {
			const r = solveBasic("ohm", given);
			expect(r.errors).toEqual([]);
			expect(r.values.U).toBeCloseTo(12, 10);
			expect(r.values.I).toBeCloseTo(0.012, 10);
			expect(r.values.P).toBeCloseTo(0.144, 10);
			expect(r.values.R).toBeCloseTo(1000, 8);
		}
		const zero = solveBasic("ohm", { U: 0, R: 1000 });
		expect(zero.errors).toEqual([]);
		expect(zero.values.I).toBe(0);
		expect(zero.values.P).toBe(0);
		expect(solveBasic("ohm", { I: -0.012, R: 1000 }).values.U).toBe(-12);
	});
	test("Ohm catches contradictory and impossible values", () => {
		expect(
			solveBasic("ohm", { U: 12, R: 1000, I: 0.5 }).errors.length,
		).toBeGreaterThan(0);
		expect(solveBasic("ohm", { R: 0, U: 12 }).errors.length).toBeGreaterThan(0);
		expect(solveBasic("ohm", { R: 1000, P: -1 }).errors.length).toBeGreaterThan(
			0,
		);
	});
	test("circle preserves area dimensions and degeneracy", () => {
		const r = solveBasic("circle", { d: 0.002 });
		expect(r.values.A).toBeCloseTo(Math.PI * 1e-6, 15);
		expect(solveBasic("circle", { A: r.values.A }).values.d).toBeCloseTo(
			0.002,
			12,
		);
		expect(solveBasic("circle", { d: 0 }).values.A).toBe(0);
		expect(formatBasic(2e-6, "m²", true)).toBe("2 mm²");
		expect(solveBasic("circle", { A: -1 }).errors.length).toBeGreaterThan(0);
	});
	test("copper conductor resolves conductivity and geometry without unit drift", () => {
		const r = solveBasic("conductor", { p: 0.0178, l: 10, A: 1e-6 });
		expect(r.errors).toEqual([]);
		expect(r.values.R).toBeCloseTo(0.178, 12);
		expect(r.values.x).toBeCloseTo(1 / 0.0178, 12);
		expect(r.values.d).toBeCloseTo(Math.sqrt(4e-6 / Math.PI), 15);
		const inverse = solveBasic("conductor", { R: 0.178, l: 10, x: 1 / 0.0178 });
		expect(inverse.values.A).toBeCloseTo(1e-6, 15);
	});
	test("temperature absolute inverse adds cold temperature, accepts zero delta", () => {
		const r = solveBasic("temperature", {
			Rk: 100,
			Rw: 120,
			alpha: 0.004,
			Tk: 20,
		});
		expect(r.errors).toEqual([]);
		expect(r.values.T).toBeCloseTo(50, 10);
		expect(r.values.Tw).toBeCloseTo(70, 10);
		const z = solveBasic("temperature", { Rk: 100, alpha: 0, T: 0, Tk: 20 });
		expect(z.errors).toEqual([]);
		expect(z.values.Rw).toBe(100);
		expect(z.values.Tw).toBe(20);
		expect(
			solveBasic("temperature", { Tk: -274 }).errors.length,
		).toBeGreaterThan(0);
	});
	test("current density handles metric area and signed flow", () => {
		const r = solveBasic("density", { I: 10, A: 2e-6 });
		expect(r.errors).toEqual([]);
		expect(r.values.J).toBe(5);
		expect(solveBasic("density", { I: -10, A: 2e-6 }).values.J).toBe(-5);
		expect(solveBasic("density", { I: 10, J: 5 }).values.A).toBeCloseTo(
			2e-6,
			15,
		);
	});
	test("gain dB zero is a known value and gains chain correctly", () => {
		const unity = solveBasic("gain", { g: 0, U1: 2 });
		expect(unity.errors).toEqual([]);
		expect(unity.values.V).toBe(1);
		expect(unity.values.U2).toBe(2);
		expect(unity.values.a).toBe(-0);
		const power = solveBasic("gain", { P1: 1, P2: 100 });
		expect(power.errors).toEqual([]);
		expect(power.values.V).toBe(10);
		expect(power.values.g).toBe(20);
		expect(solveBasic("gain", { a: 20, U1: 10 }).values.U2).toBeCloseTo(1, 12);
	});
	test("transistor supply inverse uses RL and numeric SI products", () => {
		const r = solveBasic("transistor", { IC: 0.02, RL: 240, UCE: 0.2 });
		expect(r.errors).toEqual([]);
		expect(r.values.USpeisung).toBeCloseTo(5, 12);
		const base = solveBasic("transistor", {
			UB: 5,
			UBE: 0.7,
			RB: 10000,
			B: 100,
			ue: 3,
		});
		expect(base.errors).toEqual([]);
		expect(base.values.IB).toBeCloseTo(0.00043, 12);
		expect(base.values.IC).toBeCloseTo((0.00043 * 100) / 3, 12);
		expect(
			solveBasic("transistor", { UB: 0.1, UBE: 0.7, RB: 1000 }).errors.length,
		).toBeGreaterThan(0);
	});
});
describe("waveform and duty-cycle boundaries", () => {
	test("RMS and peak conversions round-trip with zero amplitudes", () => {
		for (const [k, f] of [
			["rectangle", 1],
			["triangle", 3],
			["sinus", 2],
		] as const) {
			const r = solveBasic(k, { up: 5 });
			expect(r.errors).toEqual([]);
			expect(r.values.Ueff).toBeCloseTo(5 / Math.sqrt(f), 12);
			expect(r.values.upp).toBe(10);
			expect(solveBasic(k, { Ueff: 5 / Math.sqrt(f) }).values.up).toBeCloseTo(
				5,
				12,
			);
			expect(solveBasic(k, { up: 0 }).values.Ueff).toBe(0);
		}
	});
	test("sinus computes zero time and zero phase and reciprocal period", () => {
		const r = solveBasic("sinus", { up: 5, f: 1000, t: 0, phi: 0 });
		expect(r.errors).toEqual([]);
		expect(r.values.ut).toBe(0);
		expect(r.values.T).toBe(0.001);
		const radians = solveBasic(
			"sinus",
			{ up: 5, f: 1000, t: 0, phi: Math.PI / 2 },
			{ radians: true },
		);
		expect(radians.values.ut).toBeCloseTo(5, 12);
		const deg = solveBasic("sinus", { up: 5, f: 1000, t: 0, phi: 90 });
		expect(deg.values.ut).toBeCloseTo(5, 12);
	});
	test("sinus inverse principal phase and impossible instantaneous magnitude", () => {
		const r = solveBasic("sinus", { up: 5, ut: 5, f: 1000, t: 0 });
		expect(r.errors).toEqual([]);
		expect(r.values.phi).toBeCloseTo(Math.PI / 2, 12);
		expect(r.notes.join(" ")).toContain("Hauptwert");
		expect(
			solveBasic("sinus", { up: 5, ut: 10, f: 1000, t: 0, phi: 0 }).errors
				.length,
		).toBeGreaterThan(0);
	});
	test("PWM inverse peak, duty percent, zero and full scale", () => {
		const inv = solveBasic("pwm", { Ueff: 2.5, g: 0.25, f: 1000 });
		expect(inv.errors).toEqual([]);
		expect(inv.values.up).toBe(5);
		expect(inv.values.tin).toBe(0.00025);
		expect(
			solveBasic("pwm", { up: 5, g: 25 }, { percent: true }).values.Ueff,
		).toBe(2.5);
		const zero = solveBasic("pwm", { up: 5, g: 0, f: 1000 });
		expect(zero.errors).toEqual([]);
		expect(zero.values.Ueff).toBe(0);
		expect(zero.values.tin).toBe(0);
		expect(solveBasic("pwm", { up: 5, g: 1 }).values.Ueff).toBe(5);
		expect(solveBasic("pwm", { up: 5, g: 1.1 }).errors.length).toBeGreaterThan(
			0,
		);
		expect(
			solveBasic("pwm", { up: 5, g: 0, Ueff: 2 }).errors.length,
		).toBeGreaterThan(0);
	});
});

test("signed Ohm and full-cycle sinus phase are not falsely contradictory", () => {
	expect(solveBasic("ohm", { I: -0.012, R: 1000 }).errors).toEqual([]);
	for (const phi of [0, 90, 180, 270, 360, -90]) {
		const r = solveBasic("sinus", { up: 5, f: 1000, t: 0, phi });
		expect(r.errors).toEqual([]);
	}
	const zero = solveBasic("sinus", { up: 5, f: 1000, t: 0, phi: 0, ut: 0 });
	expect(zero.errors).toEqual([]);
	expect(zero.values.up).toBe(5);
	expect(
		solveBasic("sinus", { ut: 1, f: 1000, t: 0, phi: 0 }).errors.length,
	).toBeGreaterThan(0);
});

test("positive forward and inverse scales remain consistent across ordinary component magnitudes", () => {
	for (let i = 1; i <= 60; i++) {
		const voltage = i / 7,
			resistance = 10 ** ((i % 10) - 3),
			current = voltage / resistance,
			power = voltage * current;
		for (const givens of [
			{ U: voltage, R: resistance },
			{ P: power, I: current },
			{ P: power, U: voltage },
		]) {
			const solved = solveBasic("ohm", givens);
			expect(solved.errors).toEqual([]);
			expect(solved.values.R / resistance).toBeCloseTo(1, 10);
			expect(solved.values.I / current).toBeCloseTo(1, 10);
		}
		const duty = (i % 11) / 10;
		const f = i * 321;
		const pwm = solveBasic("pwm", { up: voltage, g: duty, f });
		expect(pwm.errors).toEqual([]);
		expect(pwm.values.Ueff).toBeCloseTo(voltage * Math.sqrt(duty), 10);
		expect(pwm.values.tin).toBeCloseTo(duty / f, 12);
	}
});

test("derived temperature and overdrive limits are validated too", () => {
	expect(
		solveBasic("temperature", { Tk: 20, T: -320, Rk: 100, alpha: 0 }).errors
			.length,
	).toBeGreaterThan(0);
	expect(
		solveBasic("transistor", { IB: 0.001, IC: 1, B: 100 }).errors.length,
	).toBeGreaterThan(0);
});

test("sinus zero crossing normalization preserves genuine tiny phases and amplitudes", () => {
	for (const phi of [0, 180, 360, -180])
		expect(
			solveBasic("sinus", { up: 5, f: 1000, t: 0, phi, ut: 0 }).errors,
		).toEqual([]);
	const tiny = solveBasic(
		"sinus",
		{ up: 2, f: 1000, t: 0, phi: 1e-15 },
		{ radians: true },
	);
	expect(tiny.errors).toEqual([]);
	expect(tiny.values.ut / 2e-15).toBeCloseTo(1, 12);
	expect(
		solveBasic("sinus", { up: 1e-15, ut: 2e-15 }).errors.length,
	).toBeGreaterThan(0);
});
