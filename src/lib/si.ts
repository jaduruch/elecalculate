const factors: Record<string, number> = {
	p: 1e-12,
	n: 1e-9,
	u: 1e-6,
	µ: 1e-6,
	μ: 1e-6,
	m: 1e-3,
	c: 1e-2,
	d: 1e-1,
	k: 1e3,
	M: 1e6,
	G: 1e9,
	T: 1e12,
};
export function parseInput(value: string): number {
	const match = String(value)
		.trim()
		.replace(",", ".")
		.match(
			/^([+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?)\s*([pnuµμmcdkMGT]?)$/,
		);
	if (!match) return NaN;
	const n = Number(match[1]) * (factors[match[2]] ?? 1);
	return Number.isFinite(n) ? n : NaN;
}
export function parseInputsquare(value: string): number {
	const match = String(value)
		.trim()
		.replace(",", ".")
		.match(
			/^([+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?)\s*([pnuµμmcdkMGT]?)$/,
		);
	if (!match) return NaN;
	const n = Number(match[1]) * (factors[match[2]] ?? 1) ** 2;
	return Number.isFinite(n) ? n : NaN;
}
