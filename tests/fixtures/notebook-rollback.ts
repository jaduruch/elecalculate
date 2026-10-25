import { restore } from "../../src/lib/notebook";
import {
	registerCalculatorState,
	type CalculatorSnapshot,
} from "../../src/lib/calculator-state";
const root = document.createElement("div");
root.innerHTML =
	'<input id="U" value="12"><input id="R" value="1k"><input id="derived" value="computed" readonly><div id="result">Previous worked solution</div><div id="state"></div>';
document.body.appendChild(root);
let state: CalculatorSnapshot = { kind: "test", values: { theta: 1 } };
root.addEventListener("input", () => {
	root.querySelector("#result")!.textContent = "";
});
const render = () => {
	root.querySelector("#state")!.textContent = String(state.values.theta);
};
render();
registerCalculatorState(root, {
	captureState: () => ({ kind: state.kind, values: { ...state.values } }),
	restoreState: (next) => {
		state = { kind: next.kind, values: { ...next.values } };
		render();
		if (
			next.kind !== "test" ||
			typeof next.values.theta !== "number" ||
			next.values.theta < 0
		)
			throw Error("Invalid controller state");
	},
});
(
	window as unknown as { testNotebookRestore: (busy: boolean) => string }
).testNotebookRestore = (busy: boolean) => {
	if (busy) root.querySelector("#state")!.setAttribute("aria-busy", "true");
	try {
		restore(root, {
			values: { U: "24", R: "2k", derived: "should not replace output" },
			selected: [],
			open: [],
			controller: { kind: "test", values: { theta: -1 } },
		});
		return "No error";
	} catch (error) {
		return (error as Error).message;
	}
};
