import { describe, test, expect } from "bun:test";
import {
	EPSILON_0,
	MU_0,
	solveCapacitor,
	solveInductor,
	solveTransient,
	solveCapacitorAC,
	solveTransformer,
	solveMagnetism,
	transientFactor,
} from "../../src/lib/passive-models";
const close = (actual: number, expected: number) =>
	expect(Math.abs(actual - expected)).toBeLessThanOrEqual(
		Math.max(1e-15, Math.abs(expected) * 1e-9),
	);
const good = (r: { issues: unknown[] }) => expect(r.issues).toEqual([]);
describe("ideal capacitor and geometry", () => {
	test("charge and energy use full SI values", () => {
		const r = solveCapacitor({ C: 100e-6, U: 10 });
		good(r);
		close(r.values.Q, 0.001);
		close(r.values.W, 0.005);
	});
	test("signed voltage has signed charge and positive energy", () => {
		const r = solveCapacitor({ C: 100e-6, U: -10 });
		good(r);
		close(r.values.Q, -0.001);
		close(r.values.W, 0.005);
	});
	test("zero voltage is known rather than missing", () => {
		const r = solveCapacitor({ C: 100e-6, U: 0 });
		good(r);
		expect(r.values.Q).toBe(0);
		expect(r.values.W).toBe(0);
	});
	test("energy and signed charge recover voltage and capacitance", () => {
		const r = solveCapacitor({ W: 0.005, Q: -0.001 });
		good(r);
		close(r.values.U, -10);
		close(r.values.C, 100e-6);
	});
	test("parallel plates and inverse area use CODATA permittivity", () => {
		const c = (2 * 8.8541878188e-12 * 0.01) / 0.001;
		const r = solveCapacitor({ er: 2, A: 0.01, s: 0.001 });
		good(r);
		close(r.values.C, c);
		const inverse = solveCapacitor({ C: c, er: 2, s: 0.001 });
		good(inverse);
		close(inverse.values.A, 0.01);
		close(inverse.values.d, Math.sqrt(0.04 / Math.PI));
	});
	test("inconsistent energy and nonphysical geometry are rejected", () => {
		expect(
			solveCapacitor({ C: 0.001, U: 10, W: 1 }).issues.length,
		).toBeGreaterThan(0);
		expect(solveCapacitor({ C: -1 }).issues.length).toBeGreaterThan(0);
		expect(solveCapacitor({ W: -1, C: 1 }).issues.length).toBeGreaterThan(0);
	});
});
describe("linear inductor and magnetic circuit", () => {
	test("flux linkage, AL and turns are consistent", () => {
		const r = solveInductor({ L: 0.01, I: 1, N: 100 });
		good(r);
		close(r.values.Phi, 0.0001);
		close(r.values.Al, 1e-6);
		const inv = solveInductor({ Al: 1e-6, L: 0.01 });
		good(inv);
		close(inv.values.N, 100);
	});
	test("solenoid geometry and moving conductor inverse", () => {
		const r = solveInductor({ ur: 1, N: 100, A: 0.01, l: 0.1 });
		good(r);
		close(r.values.L, (MU_0 * 10000 * 0.01) / 0.1);
		const moving = solveInductor({ U: 10, B: 2, l: 1 });
		good(moving);
		close(moving.values.v, 5);
	});
	test("induced voltage follows Lenz sign", () => {
		const r = solveInductor({ L: 1, I: 2, t: 0.5 });
		good(r);
		close(r.values.U, -4);
		const inv = solveInductor({ U: -4, t: 0.5, I: 2 });
		good(inv);
		close(inv.values.L, 1);
	});
	test("zero current creates zero flux, not an unknown", () => {
		const r = solveInductor({ L: 0.01, I: 0, N: 100 });
		good(r);
		expect(r.values.Phi).toBe(0);
	});
	test("magnetic path length is not misreported as a current", () => {
		const r = solveMagnetism({ Rm: 1000, ur: 100, A: 0.001 });
		good(r);
		expect(r.values.I).toBeUndefined();
		close(r.values.l, 1000 * 100 * MU_0 * 0.001);
	});
	test("Ampere and flux laws round trip", () => {
		const r = solveMagnetism({ I: 2, N: 100, l: 0.1, ur: 100, A: 0.001 });
		good(r);
		close(r.values.Theta, 200);
		close(r.values.H, 2000);
		close(r.values.B, MU_0 * 100 * 2000);
		close(r.values.Phi, MU_0 * 100 * 2000 * 0.001);
		close(r.values.Rm, 0.1 / (MU_0 * 100 * 0.001));
	});
});
describe("RC and RL transients", () => {
	for (const kind of ["RC", "RL"] as const)
		for (const discharging of [false, true])
			test(`${kind} ${discharging ? "discharge" : "charge"} at one time constant`, () => {
				const given =
					kind === "RC"
						? { R: 1000, C: 0.0001, U: 10, t: 0.1 }
						: { R: 10, L: 1, U: 10, t: 0.1 };
				const r = solveTransient(given, kind, discharging);
				good(r);
				close(r.values.tau, 0.1);
				const e = Math.exp(-1);
				const voltage =
					kind === "RC"
						? discharging
							? 10 * e
							: 10 * (1 - e)
						: discharging
							? -10 * e
							: 10 * e;
				const initialCurrent = kind === "RC" ? 0.01 : 1;
				const current =
					kind === "RC"
						? discharging
							? -initialCurrent * e
							: initialCurrent * e
						: discharging
							? initialCurrent * e
							: initialCurrent * (1 - e);
				close(r.values.Ut, voltage);
				close(r.values.It, current);
			});
	test("RC inverse time and component values work in one solve", () => {
		const r = solveTransient({ R: 1000, tau: 0.1, U: 10, Ut: 5 }, "RC");
		good(r);
		close(r.values.C, 0.0001);
		close(r.values.t, 0.1 * Math.LN2);
	});
	test("RC discharging inverse tau has the correct logarithm sign", () => {
		const r = solveTransient({ I: 1, It: -Math.exp(-2), t: 2 }, "RC", true);
		good(r);
		close(r.values.tau, 1);
	});
	test("RL inverse time and tau are correct during current rise", () => {
		const r = solveTransient({ I: 1, It: 0.5, tau: 2 }, "RL");
		good(r);
		close(r.values.t, 2 * Math.LN2);
		const inv = solveTransient({ I: 1, It: 0.5, t: 2 * Math.LN2 }, "RL");
		good(inv);
		close(inv.values.tau, 2);
	});
	test("t=0 and zero amplitude are preserved in both models", () => {
		for (const kind of ["RC", "RL"] as const)
			for (const discharging of [false, true]) {
				const r = solveTransient(
					{ R: 10, tau: 1, U: 0, t: 0 },
					kind,
					discharging,
				);
				good(r);
				expect(r.values.Ut === 0).toBe(true);
				expect(r.values.It === 0).toBe(true);
			}
	});
	test("impossible transient ratios and negative time do not produce NaN results", () => {
		expect(
			solveTransient({ U: 1, Ut: 2, t: 1 }, "RC").issues.length,
		).toBeGreaterThan(0);
		expect(
			solveTransient({ tau: 1, t: -1 }, "RL").issues.length,
		).toBeGreaterThan(0);
		expect(
			solveTransient({ I: 1, It: 1, t: 1 }, "RC", true).issues.length,
		).toBeGreaterThan(0);
	});
});
describe("RC sinusoidal networks", () => {
	test("series network reference impedances and power triangle", () => {
		const r = solveCapacitorAC({ R: 1000, C: 100e-9, f: 1000, U: 5 });
		good(r);
		const xc = 1 / (2000 * Math.PI * 100e-9),
			z = Math.hypot(1000, xc),
			i = 5 / z;
		close(r.values.Xc, xc);
		close(r.values.Z, z);
		close(r.values.I, i);
		close(r.values.P, i * i * 1000);
		close(r.values.Qc, i * i * xc);
		close(r.values.S, 5 * i);
		close(r.values.phi, Math.atan(xc / 1000));
	});
	test("parallel network admittance and currents", () => {
		const r = solveCapacitorAC({ G: 0.001, Bc: 0.002, U: 5 }, true);
		good(r);
		close(r.values.I, 5 * Math.hypot(0.001, 0.002));
		close(r.values.Ir, 0.005);
		close(r.values.Ic, 0.01);
		close(r.values.P, 0.025);
		close(r.values.Q, 0.05);
	});
	test("power and resistance/conductance recover amplitudes", () => {
		const series = solveCapacitorAC({ P: 0.1, R: 1000 });
		good(series);
		close(series.values.I, 0.01);
		const parallel = solveCapacitorAC({ P: 0.1, G: 0.001 }, true);
		good(parallel);
		close(parallel.values.U, 10);
	});
	test("phase and impedance invert to real and reactive parts", () => {
		const r = solveCapacitorAC({ phi: Math.PI / 4, Z: 1000 });
		good(r);
		close(r.values.R, 1000 / Math.sqrt(2));
		close(r.values.Xc, 1000 / Math.sqrt(2));
	});
	test("zero excitation and invalid power factors are handled", () => {
		good(solveCapacitorAC({ R: 1000, C: 1e-6, f: 1000, U: 0 }));
		expect(solveCapacitorAC({ cosphi: 1.1 }).issues.length).toBeGreaterThan(0);
		expect(
			solveCapacitorAC({ R: 2000, Z: 1000 }).issues.length,
		).toBeGreaterThan(0);
	});
	test("100 forward/inverse networks conserve complex power", () => {
		for (let n = 1; n <= 100; n++) {
			const R = 50 + n * 17,
				C = (1 + n / 10) * 1e-9,
				f = 100 + n * 113,
				U = n / 10;
			const r = solveCapacitorAC({ R, C, f, U });
			good(r);
			close(r.values.P ** 2 + r.values.Qc ** 2, r.values.S ** 2);
			const inv = solveCapacitorAC({ Xc: r.values.Xc, f, R, U });
			good(inv);
			close(inv.values.C, C);
			close(inv.values.I, r.values.I);
		}
	});
});
describe("transformer reference values", () => {
	test("voltage ratio follows turns ratio", () => {
		const r = solveTransformer({ N1: 1000, N2: 100, U1: 230 });
		good(r);
		expect(r.assumedIdeal).toBe(true);
		close(r.values.ue, 10);
		close(r.values.U2, 23);
	});
	test("capacitance reflection uses the reciprocal impedance relationship", () => {
		const r = solveTransformer({ C1: 1e-9, C2: 100e-9 });
		good(r);
		close(r.values.ue, 10);
	});
	test("lossy currents and effective resistance obey energy conservation", () => {
		const r = solveTransformer({ U1: 100, U2: 10, I1: 1, eta: 0.8 });
		good(r);
		close(r.values.I2, 8);
		close(r.values.P1, 100);
		close(r.values.P2, 80);
		close(r.values.R1, 100);
		close(r.values.R2, 1.25);
	});
	test("efficiency is inferred before making an ideal assumption", () => {
		const r = solveTransformer({ U1: 100, U2: 10, P1: 100, P2: 80 });
		good(r);
		expect(r.assumedIdeal).toBe(false);
		close(r.values.eta, 0.8);
		const currents = solveTransformer({ I1: 1, I2: 8, ue: 10 });
		good(currents);
		expect(currents.assumedIdeal).toBe(false);
		close(currents.values.eta, 0.8);
	});
	test("unity efficiency is permitted and over-unity rejected", () => {
		good(solveTransformer({ P1: 100, P2: 100 }));
		expect(
			solveTransformer({ P1: 100, P2: 101 }).issues.length,
		).toBeGreaterThan(0);
	});
});

describe("capacitive quadrants without erasing small physical components", () => {
	test("a zero series resistance is an exact capacitive endpoint", () => {
		const r = solveCapacitorAC({ R: 0, C: 100e-9, f: 1000, U: 5 });
		good(r);
		expect(r.values.R).toBe(0);
		expect(r.values.cosphi).toBe(0);
		expect(r.values.sinphi).toBe(1);
		expect(r.values.phi).toBe(Math.PI / 2);
		expect(r.values.P).toBe(0);
		close(r.values.I, 5 * 2 * Math.PI * 1000 * 100e-9);
	});
	test("zero parallel conductance is an exact capacitive endpoint", () => {
		const r = solveCapacitorAC({ G: 0, Bc: 0.002, U: 5 }, true);
		good(r);
		expect(r.values.cosphi).toBe(0);
		expect(r.values.phi).toBe(Math.PI / 2);
		expect(r.values.Ir).toBe(0);
		expect(r.values.P).toBe(0);
		close(r.values.I, 0.01);
	});
	test("zero excitation works at both exact capacitive endpoints", () => {
		for (const parallel of [false, true]) {
			const r = solveCapacitorAC(
				parallel ? { G: 0, Bc: 0.002, U: 0 } : { R: 0, Xc: 500, U: 0 },
				parallel,
			);
			good(r);
			expect(r.values.I).toBe(0);
			expect(r.values.P).toBe(0);
			expect(r.values.S).toBe(0);
			expect(r.values.cosphi).toBe(0);
			expect(r.values.phi).toBe(Math.PI / 2);
		}
	});
	test("an explicitly supplied 90 degree angle has zero cosine", () => {
		for (const parallel of [false, true]) {
			const r = solveCapacitorAC(
				parallel
					? { phi: Math.PI / 2, Y: 0.002, U: 5 }
					: { phi: Math.PI / 2, Z: 500, U: 5 },
				parallel,
			);
			good(r);
			expect(r.values.cosphi).toBe(0);
			expect(r.values[parallel ? "G" : "R"]).toBe(0);
		}
	});
	test("tiny nonzero real and reactive components are retained", () => {
		for (const tiny of [1e-12, 1e-20, 1e-100]) {
			const real = solveCapacitorAC({ R: tiny, Xc: 1, U: 1 });
			good(real);
			expect(real.values.R).toBe(tiny);
			expect(real.values.cosphi).toBeGreaterThan(0);
			const reactive = solveCapacitorAC({ R: 1, Xc: tiny, U: 1 });
			good(reactive);
			expect(reactive.values.Xc).toBe(tiny);
			expect(reactive.values.sinphi).toBeGreaterThan(0);
			expect(reactive.values.phi).toBeGreaterThan(0);
		}
	});
	test("supplied tiny nonzero angles are not clamped to zero", () => {
		const r = solveCapacitorAC({ phi: 1e-20, Z: 1, U: 1 });
		good(r);
		expect(r.values.phi).toBe(1e-20);
		expect(r.values.Xc).toBeGreaterThan(0);
		expect(r.values.sinphi).toBeGreaterThan(0);
	});
	test("contradictory supplied angle and component constraints remain rejected", () => {
		expect(
			solveCapacitorAC({ phi: Math.PI / 2, R: 1, Xc: 1 }).issues.length,
		).toBeGreaterThan(0);
		expect(
			solveCapacitorAC({ cosphi: 0.5, sinphi: 0.5 }).issues.length,
		).toBeGreaterThan(0);
		expect(
			solveCapacitorAC({ cosphi: 0.8, R: 1, Xc: 1 }).issues.length,
		).toBeGreaterThan(0);
	});
});
