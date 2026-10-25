export interface QubitState {
	theta: number;
	phi: number;
}
export type QuantumGate = "X" | "Y" | "Z" | "H" | "S" | "T";
export function validateQubit(state: QubitState) {
	if (
		!Number.isFinite(state.theta) ||
		state.theta < 0 ||
		state.theta > Math.PI ||
		!Number.isFinite(state.phi)
	)
		throw Error("Ungültiger Qubit-Zustand.");
}
export function bloch(state: QubitState) {
	validateQubit(state);
	return {
		x: Math.sin(state.theta) * Math.cos(state.phi),
		y: Math.sin(state.theta) * Math.sin(state.phi),
		z: Math.cos(state.theta),
	};
}
export function quantumGate(state: QubitState, gate: QuantumGate): QubitState {
	const { x, y, z } = bloch(state);
	let a = x,
		b = y,
		c = z;
	switch (gate) {
		case "X":
			b = -y;
			c = -z;
			break;
		case "Y":
			a = -x;
			c = -z;
			break;
		case "Z":
			a = -x;
			b = -y;
			break;
		case "H":
			a = z;
			b = -y;
			c = x;
			break;
		case "S":
			a = -y;
			b = x;
			break;
		case "T":
			a = (x - y) / Math.SQRT2;
			b = (x + y) / Math.SQRT2;
			break;
		default:
			throw Error("Unbekanntes Quantengatter.");
	}
	const theta = Math.acos(Math.max(-1, Math.min(1, c)));
	const phi =
		Math.abs(Math.sin(theta)) < 1e-12
			? 0
			: (Math.atan2(b, a) + 2 * Math.PI) % (2 * Math.PI);
	return { theta, phi };
}
export function measurementProbability(state: QubitState) {
	const { z } = bloch(state);
	return Math.max(0, Math.min(1, (1 + z) / 2));
}
