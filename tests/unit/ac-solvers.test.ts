import { describe, test, expect } from "bun:test";
import {
	solveFilter,
	solveResonator,
	type FilterKind,
} from "../../src/lib/ac-solvers";
const TAU = 2 * Math.PI;
function close(actual: number, expected: number, tolerance = 1e-7) {
	expect(Number.isFinite(actual)).toBe(true);
	expect(Math.abs(actual - expected)).toBeLessThanOrEqual(
		tolerance * Math.max(Math.abs(expected), 1e-30),
	);
}
function clean(result: ReturnType<typeof solveFilter>) {
	expect(result.issues).toEqual([]);
	for (const value of Object.values(result.values))
		expect(Number.isFinite(value)).toBe(true);
}
describe("first-order RC/RL filters", () => {
	for (const kind of ["HP_RC", "TP_RC", "HP_RL", "TP_RL"] as FilterKind[]) {
		test(`${kind} cutoff is half power, signed 45°, with consistent inverse component values`, () => {
			const rc = kind.endsWith("RC"),
				hp = kind.startsWith("HP");
			const R = 1000,
				L = 0.01,
				C = 1e-7;
			const f = rc ? 1 / (TAU * R * C) : R / (TAU * L);
			const values = { R, ...(rc ? { C } : { L }), f, Uin: 5 };
			const result = solveFilter(kind, values);
			clean(result);
			close(result.values.fg, f);
			close(result.values.g, 1 / Math.sqrt(2));
			close(result.values.Uout, 5 / Math.sqrt(2));
			close(result.values.phi, hp ? 45 : -45);
			const inverse = solveFilter(kind, {
				R,
				f,
				Uin: 5,
				Uout: 5 / Math.sqrt(2),
			});
			clean(inverse);
			close(inverse.values[rc ? "C" : "L"], rc ? C : L);
		});
		test(`${kind} phase input uses degrees and reconstructs the transfer ratio`, () => {
			const hp = kind.startsWith("HP");
			const result = solveFilter(kind, {
				R: 1000,
				f: 2000,
				phi: hp ? 30 : -30,
				Uin: 4,
			});
			clean(result);
			close(
				result.values.g,
				hp ? Math.cos(Math.PI / 6) : Math.cos(Math.PI / 6),
			);
			close(result.values.Uout, 4 * Math.cos(Math.PI / 6));
		});
		test(`${kind} rejects incompatible gain and redundant component constraints`, () => {
			expect(
				solveFilter(kind, { Uin: 5, Uout: 6 }).issues.length,
			).toBeGreaterThan(0);
			const result = solveFilter(
				kind,
				kind.endsWith("RC")
					? { R: 1000, C: 1e-7, fg: 100 }
					: { R: 1000, L: 0.01, fg: 100 },
			);
			expect(result.issues.some((i) => i.kind === "contradiction")).toBe(true);
			expect(
				solveFilter(kind, { R: -1 }).issues.some((i) => i.kind === "domain"),
			).toBe(true);
		});
	}
	test("HP_RC reconstructs the orthogonal capacitor voltage and phase", () => {
		const result = solveFilter("HP_RC", { Uin: 5, Uc: 3, R: 1000, f: 1000 });
		clean(result);
		close(result.values.Uout, 4);
		close(result.values.phi, (Math.asin(0.6) * 180) / Math.PI);
		close(result.values.g, 0.8);
	});
	test("zero source voltage remains zero; it is not treated as a missing input", () => {
		for (const kind of ["HP_RC", "TP_RC", "HP_RL", "TP_RL"] as FilterKind[]) {
			const result = solveFilter(kind, {
				R: 1000,
				C: 1e-7,
				L: 0.01,
				f: 1000,
				Uin: 0,
			});
			clean(result);
			expect(result.values.Uout).toBe(0);
		}
	});
	test("wide frequency sweep obeys passive voltage limits and complementary response", () => {
		for (const ratio of [1e-4, 0.001, 0.1, 0.5, 1, 2, 10, 100, 1e4]) {
			const f = 1591.5494309189535 * ratio;
			const low = solveFilter("TP_RC", { R: 1000, C: 1e-7, f, Uin: 5 });
			const high = solveFilter("HP_RC", { R: 1000, C: 1e-7, f, Uin: 5 });
			clean(low);
			clean(high);
			close(low.values.g ** 2 + high.values.g ** 2, 1);
			expect(low.values.Uout).toBeLessThanOrEqual(5);
			expect(high.values.Uout).toBeLessThanOrEqual(5);
		}
	});
	test("empty, invalid and physically impossible phase inputs do not produce numeric output", () => {
		expect(solveFilter("HP_RC", {}).steps).toHaveLength(0);
		for (const value of [0, -1, Infinity, NaN])
			expect(solveFilter("HP_RC", { f: value }).issues.length).toBeGreaterThan(
				0,
			);
		expect(solveFilter("TP_RC", { phi: 45 }).issues.length).toBeGreaterThan(0);
		expect(solveFilter("HP_RC", { phi: -45 }).issues.length).toBeGreaterThan(0);
	});
});
describe("RLC resonance and off-resonance phasors", () => {
	test("series resistance from Q has no extraneous 2π factor", () => {
		const result = solveResonator("serie", { L: 0.01, C: 1e-7, Q: 10 });
		clean(result);
		close(result.values.R, Math.sqrt(0.01 / 1e-7) / 10);
		close(result.values.b, result.values.R / (TAU * 0.01));
	});
	test("parallel Q and bandwidth use the parallel loss resistor convention", () => {
		const result = solveResonator("parallel", { L: 0.01, C: 1e-7, R: 10000 });
		clean(result);
		close(result.values.Q, 10000 * Math.sqrt(1e-7 / 0.01));
		close(result.values.b, 1 / (TAU * 10000 * 1e-7));
		close(result.values.fr / result.values.b, result.values.Q);
	});
	test("parallel capacitance from Q,R,L uses Q/R and never f", () => {
		const result = solveResonator("parallel", { L: 0.01, Q: 10, R: 10000 });
		clean(result);
		close(result.values.C, (10 / 10000) ** 2 * 0.01);
	});
	test("capacitive reactance inverse uses XC rather than missing XL", () => {
		for (const kind of ["serie", "parallel"] as const) {
			const result = solveResonator(kind, { XC: 1000, f: 1000 });
			clean(result);
			close(result.values.C, 1 / (TAU * 1000 * 1000));
		}
	});
	test("forward/inverse resonance quantities round-trip across component scales", () => {
		for (const kind of ["serie", "parallel"] as const)
			for (const L of [1e-6, 0.01, 2])
				for (const C of [1e-10, 1e-7, 1e-3]) {
					const R = kind === "serie" ? 100 : 10000;
					const result = solveResonator(kind, { L, C, R });
					clean(result);
					close(result.values.fr, 1 / (TAU * Math.sqrt(L * C)));
					close(result.values.f, result.values.fr);
					close(result.values.XL, result.values.XC);
					close(result.values.Q, result.values.fr / result.values.b);
					const inverse = solveResonator(kind, { L, R, Q: result.values.Q });
					clean(inverse);
					close(inverse.values.C, C);
				}
	});
	test("explicit off-resonance frequency is not silently replaced by fr", () => {
		const f = 1000,
			R = 100,
			L = 0.01,
			C = 1e-7,
			U = 5;
		const XL = TAU * f * L,
			XC = 1 / (TAU * f * C),
			Z = Math.hypot(R, XL - XC);
		const result = solveResonator("serie", { f, R, L, C, U });
		clean(result);
		expect(result.values.f).toBe(f);
		close(result.values.I, U / Z);
		close(result.values.UR, (U * R) / Z);
		close(result.values.UL, (U * XL) / Z);
		close(result.values.UC, (U * XC) / Z);
		close(Math.hypot(result.values.UR, result.values.UL - result.values.UC), U);
		expect(result.notes.some((n) => n.includes("Ohne Signalfrequenz"))).toBe(
			false,
		);
	});
	test("parallel off-resonance currents obey Kirchhoff phasor addition", () => {
		const f = 1000,
			R = 10000,
			L = 0.01,
			C = 1e-7,
			I = 0.01;
		const XL = TAU * f * L,
			XC = 1 / (TAU * f * C),
			Y = Math.hypot(1 / R, 1 / XC - 1 / XL);
		const result = solveResonator("parallel", { f, R, L, C, I });
		clean(result);
		close(result.values.U, I / Y);
		close(result.values.IR, result.values.U / R);
		close(Math.hypot(result.values.IR, result.values.IL - result.values.IC), I);
	});
	test("independent nonresonant phasors do not imply a false resonance condition", () => {
		const result = solveResonator("serie", { UR: 3, UL: 8, UC: 4 });
		clean(result);
		close(result.values.U, 5);
		expect(result.values.f).toBeUndefined();
		expect(result.values.fr).toBeUndefined();
	});
	test("missing L/C can be inferred at explicitly documented resonance", () => {
		const result = solveResonator("serie", { C: 1e-7, f: 5000 });
		clean(result);
		close(result.values.L, 1 / ((TAU * 5000) ** 2 * 1e-7));
		expect(result.notes.some((n) => n.includes("Resonanzannahme"))).toBe(true);
	});
	test("zero driving voltage produces zero currents and drops", () => {
		const result = solveResonator("serie", { R: 100, L: 0.01, C: 1e-7, U: 0 });
		clean(result);
		expect(result.values.I).toBe(0);
		expect(result.values.UR).toBe(0);
		expect(result.values.UC).toBe(0);
	});
	test("contradictory resonance constraints and invalid passive components are rejected", () => {
		expect(
			solveResonator("parallel", {
				L: 0.01,
				C: 1e-7,
				R: 10000,
				Q: 1,
			}).issues.some((i) => i.kind === "contradiction"),
		).toBe(true);
		for (const n of [0, -1, NaN, Infinity])
			expect(solveResonator("serie", { L: n }).issues.length).toBeGreaterThan(
				0,
			);
	});
});

test("resonant and off-resonant circuits remain stable across broad passive component scales", () => {
	for (const kind of ["serie", "parallel"] as const)
		for (const R of [1e-6, 0.001, 1, 1000, 1e9])
			for (const L of [1e-9, 1e-3, 10])
				for (const C of [1e-12, 1e-6, 1])
					for (const f of [undefined, 1e-6, 1e9]) {
						const given = {
							R,
							L,
							C,
							...(f === undefined ? {} : { f }),
							...(kind === "serie" ? { U: 5 } : { I: 0.1 }),
						};
						const result = solveResonator(kind, given);
						clean(result);
						close(result.values.Q, result.values.fr / result.values.b);
						if (f === undefined)
							close(kind === "serie" ? result.values.Z : result.values.Z, R);
					}
});
test("impossible phasor magnitudes are rejected instead of losing a square-root domain error", () => {
	expect(
		solveResonator("serie", { U: 1, UL: 10, UC: 1 }).issues,
	).toContainEqual({ kind: "domain", target: "UR" });
	expect(
		solveResonator("parallel", { I: 1, IL: 10, IC: 1 }).issues,
	).toContainEqual({ kind: "domain", target: "IR" });
});
