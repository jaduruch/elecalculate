/** Display precision is intentionally separate from values passed between equations. */
const prefixes = [
	["T", 1e12],
	["G", 1e9],
	["M", 1e6],
	["k", 1e3],
	["", 1],
	["m", 1e-3],
	["u", 1e-6],
	["n", 1e-9],
	["p", 1e-12],
] as const;
function format(
	value: number,
	unit: string,
	squared: boolean,
	intermediate: boolean,
): string {
	if (!Number.isFinite(value)) return "Nicht definiert";
	const suffix = (prefix: string) =>
		`${squared && unit ? " " : ""}${prefix}${unit}`;
	if (value === 0) return `${intermediate ? "0" : "0.000"}${suffix("")}`;
	const magnitude = Math.abs(value);
	const smallest = 1e-12 ** (squared ? 2 : 1);
	const largest = 1e12 ** (squared ? 2 : 1);
	const range = squared ? 1e6 : 1e3;
	// Scientific notation is a real nonzero value, unlike toFixed(3)'s former zero
	// fallback. Using the original SI value also avoids overflowing the mantissa.
	if (magnitude < smallest || magnitude >= largest * range)
		return `${intermediate ? String(value) : value.toExponential(3)}${suffix("")}`;
	let index = prefixes.findIndex(
		([, factor]) => magnitude >= factor ** (squared ? 2 : 1),
	);
	if (index < 0)
		return `${intermediate ? String(value) : value.toExponential(3)}${suffix("")}`;
	let [prefix, factor] = prefixes[index];
	let mantissa = value / factor ** (squared ? 2 : 1);
	if (intermediate) return `${String(mantissa)}${prefix}`;
	if (Math.abs(Number(mantissa.toFixed(3))) >= range) {
		if (index === 0) return `${value.toExponential(3)}${suffix("")}`;
		index--;
		[prefix, factor] = prefixes[index];
		mantissa = value / factor ** (squared ? 2 : 1);
	}
	return `${mantissa.toFixed(3)}${suffix(prefix)}`;
}
/** Historical plain-unit presentation, e.g. 12.000mA. */
export function formatWithPrefix(value: number, unit = "") {
	return format(value, unit, false, false);
}
/** Prefixes apply to the dimension: 2 mm² = 2 · 10⁻⁶ m². */
export function formatWithPrefixsquare(value: number, unit = "") {
	return format(value, unit, true, false);
}
/** Full-precision mantissa for intermediate calculator values, parseable by parseInput. */
export function formatPrefixNoUnit(value: number) {
	return format(value, "", false, true);
}
/** Full-precision squared-dimension value, parseable by parseInputsquare. */
export function formatPrefixNoUnitSquare(value: number) {
	return format(value, "", true, true);
}
