import { describe, expect, test } from "bun:test";
import { solveOpamp, type OpampKind } from "../../src/lib/opamp";
function close(
	kind: OpampKind,
	given: Record<string, number>,
	expected: Record<string, number>,
) {
	const result = solveOpamp(kind, given);
	expect(result.issues).toEqual([]);
	for (const [key, value] of Object.entries(expected))
		expect(result.values[key]).toBeCloseTo(value, 10);
	return result;
}
describe("independent ideal OPV reference values", () => {
	test("inverter gain and output carry the physical negative sign", () => {
		close(
			"inverting",
			{ R1: 10000, R2: 100000, Uin: 0.1 },
			{ V: -10, Uout: -1 },
		);
	});
	test("inverter infers signed gain from measured voltages", () => {
		close("inverting", { Uin: 0.1, Uout: -1 }, { V: -10 });
	});
	test("inverter inverse voltage and resistor equations preserve signs", () => {
		close(
			"inverting",
			{ V: -10, Uout: -1, R1: 10000 },
			{ Uin: 0.1, R2: 100000 },
		);
		close("inverting", { V: -10, R2: 100000 }, { R1: 10000 });
	});
	test("negative input produces a positive inverter output", () => {
		close(
			"inverting",
			{ R1: 10000, R2: 100000, Uin: -0.1 },
			{ V: -10, Uout: 1 },
		);
	});
	test("noninverting measured gain is the output/input ratio", () => {
		close("noninverting", { Uin: 1, Uout: 11 }, { V: 11 });
	});
	test("noninverting inverse input uses multiplication, never adds unlike units", () => {
		close("noninverting", { R1: 1000, R2: 10000, Uout: 11 }, { V: 11, Uin: 1 });
	});
	test("noninverting feedback resistors and source are reversible", () => {
		close(
			"noninverting",
			{ V: 11, R1: 1000, Uin: 0.1 },
			{ R2: 10000, Uout: 1.1 },
		);
		close("noninverting", { V: 11, R2: 10000 }, { R1: 1000 });
	});
	test("summing amplifier uses independently weighted signed gains", () => {
		close(
			"summing",
			{ R11: 10000, R12: 20000, R2: 100000, Uin1: 0.1, Uin2: 0.2 },
			{ V1: -10, V2: -5, Uout: -2 },
		);
	});
	test("summing inverse source and feedback calculations work", () => {
		close(
			"summing",
			{ V1: -10, V2: -5, Uin1: 0.1, Uout: -2, R11: 10000 },
			{ Uin2: 0.2, R2: 100000, R12: 20000 },
		);
	});
	test("summing zero-valued inputs are valid known values", () => {
		close(
			"summing",
			{ R11: 10000, R12: 10000, R2: 100000, Uin1: 0, Uin2: 0 },
			{ Uout: 0, V1: -10, V2: -10 },
		);
	});
	test("difference amplifier uses the source diagram polarity and matched pairs", () => {
		close(
			"difference",
			{ R13: 10000, R24: 100000, Uin1: 0.1, Uin2: 0.2 },
			{ V: 10, Uout: 1 },
		);
	});
	test("difference amplifier suppresses equal common-mode inputs", () => {
		close(
			"difference",
			{ R13: 10000, R24: 100000, Uin1: 3, Uin2: 3 },
			{ Uout: 0, V: 10 },
		);
	});
	test("difference amplifier inverse values reconstruct the unknown input", () => {
		close(
			"difference",
			{ V: 10, Uout: 1, Uin1: 0.1, R13: 10000 },
			{ Uin2: 0.2, R24: 100000 },
		);
	});
	test("rejects physically incompatible gain domains", () => {
		for (const [kind, V] of [
			["inverting", 10],
			["inverting", 0],
			["noninverting", 1],
			["noninverting", 0.5],
			["difference", -1],
		] as const)
			expect(
				solveOpamp(kind, { V }).issues.some((issue) => issue.kind === "domain"),
			).toBe(true);
		expect(solveOpamp("summing", { V1: 1 }).issues[0].kind).toBe("domain");
	});
	test("rejects inconsistent supplied results and nonfinite inputs", () => {
		expect(
			solveOpamp("inverting", { R1: 1000, R2: 10000, Uin: 1, Uout: 10 }).issues
				.length,
		).toBeGreaterThan(0);
		expect(solveOpamp("noninverting", { Uin: Infinity }).issues[0].kind).toBe(
			"input",
		);
	});
	test("rejects zero or negative feedback resistors", () => {
		for (const value of [0, -100])
			expect(
				solveOpamp("inverting", { R1: value, R2: 1000 }).issues[0].kind,
			).toBe("domain");
	});
});

function subsets<T>(items: T[], size: number): T[][] {
	if (!size) return [[]];
	return items.flatMap((item, index) =>
		subsets(items.slice(index + 1), size - 1).map((rest) => [item, ...rest]),
	);
}
describe("overdetermined and inverse OPV cross-checks", () => {
	const references: {
		kind: OpampKind;
		known: number;
		values: Record<string, number>;
	}[] = [
		{
			kind: "inverting",
			known: 3,
			values: { R1: 10000, R2: 100000, Uin: 0.1, Uout: -1, V: -10 },
		},
		{
			kind: "noninverting",
			known: 3,
			values: { R1: 10000, R2: 100000, Uin: 0.1, Uout: 1.1, V: 11 },
		},
		{
			kind: "summing",
			known: 5,
			values: {
				R11: 10000,
				R12: 20000,
				R2: 100000,
				Uin1: 0.1,
				Uin2: 0.2,
				Uout: -2,
				V1: -10,
				V2: -5,
			},
		},
		{
			kind: "difference",
			known: 4,
			values: { R13: 10000, R24: 100000, Uin1: 0.1, Uin2: 0.2, Uout: 1, V: 10 },
		},
	];
	for (const reference of references)
		test(`${reference.kind}: every known-value subset agrees with the independent circuit`, () => {
			for (const keys of subsets(
				Object.keys(reference.values),
				reference.known,
			)) {
				const given = Object.fromEntries(
					keys.map((key) => [key, reference.values[key]]),
				);
				const result = solveOpamp(reference.kind, given);
				expect(result.issues).toEqual([]);
				for (const [key, value] of Object.entries(result.values))
					if (key in reference.values)
						expect(value).toBeCloseTo(reference.values[key], 7);
			}
		});
});
