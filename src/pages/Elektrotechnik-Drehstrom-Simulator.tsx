import { useCalculator } from "../lib/use-calculator";
import { createController } from "../calculations/Elektrotechnik-Drehstrom-Simulator.js";
export default function Page() {
	const controller = useCalculator(createController);
	return (
		<div ref={controller.root} className="page-body ">
			<style>
				{
					"@layer source { @scope (.page-body) {\n\n        canvas {\n            border: 1px solid black;\n            display: block;\n            margin: 20px auto;\n        }\n        h2 {\n            text-align: center;\n        }\n        .button-container {\n            text-align: center;\n            margin: 20px;\n        }\n        .button-container button {\n            padding: 10px 20px;\n            margin: 0 10px;\n            font-size: 16px;\n            border: none;\n            cursor: pointer;\n        }\n        .red-btn { background-color: red; color: white; }\n        .green-btn { background-color: green; color: white; }\n        .blue-btn { background-color: blue; color: white; }\n    \n} }"
				}
			</style>
			<h1>{"Dreiphasen-Generator Simulation"}</h1>
			<div className="button-container">
				<button
					type="button"
					id="control-0"
					className="red-btn"
					data-action="togglePhase"
					onClick={(event) => {
						controller.current?.handlers.togglePhase?.("red");
					}}
				>
					{"Rote Phase ein/aus"}
				</button>
				<button
					type="button"
					id="control-1"
					className="green-btn"
					data-action="togglePhase"
					onClick={(event) => {
						controller.current?.handlers.togglePhase?.("green");
					}}
				>
					{"Grüne Phase ein/aus"}
				</button>
				<button
					type="button"
					id="control-2"
					className="blue-btn"
					data-action="togglePhase"
					onClick={(event) => {
						controller.current?.handlers.togglePhase?.("blue");
					}}
				>
					{"Blaue Phase ein/aus"}
				</button>
			</div>
			<canvas id="phaseCanvas" width="800" height="400"></canvas>
		</div>
	);
}
