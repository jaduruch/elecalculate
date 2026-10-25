export interface CalculatorSnapshot {
	kind: string;
	values: Record<string, number | boolean>;
}
export interface StatefulCalculator {
	captureState: () => CalculatorSnapshot;
	restoreState: (snapshot: CalculatorSnapshot) => void;
}
const calculators = new WeakMap<HTMLElement, StatefulCalculator>();
export function registerCalculatorState(
	root: HTMLElement,
	calculator: StatefulCalculator,
) {
	calculators.set(root, calculator);
	return () => {
		if (calculators.get(root) === calculator) calculators.delete(root);
	};
}
export function captureControllerState(
	root: HTMLElement,
): CalculatorSnapshot | undefined {
	return calculators.get(root)?.captureState();
}
export function restoreControllerState(
	root: HTMLElement,
	state: CalculatorSnapshot | undefined,
) {
	if (state) calculators.get(root)?.restoreState(state);
}
