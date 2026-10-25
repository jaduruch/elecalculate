import { useCalculator } from "../lib/use-calculator";
import { createController } from "../calculations/Elektrotechnik-Drehstrom.js";
export default function Page() {
	const controller = useCalculator(createController);
	return (
		<div
			ref={controller.root}
			data-ready={controller.ready ? "true" : undefined}
			className="page-body "
		>
			<style>
				{
					'@layer source { @scope (.page-body) {\n\n        /* Styling des Umschaltbuttons */\n        .switch {\n            position: relative;\n            display: inline-block;\n            width: 60px;\n            height: 34px;\n        }\n\n        .switch input {\n            display: none;\n        }\n\n        .slider {\n            position: absolute;\n            cursor: pointer;\n            top: 0;\n            left: 0;\n            right: 0;\n            bottom: 0;\n            background-color: #ccc;\n            transition: 0.4s;\n        }\n\n        .slider:before {\n            position: absolute;\n            content: "";\n            height: 26px;\n            width: 26px;\n            left: 4px;\n            bottom: 4px;\n            background-color: white;\n            transition: 0.4s;\n        }\n\n        input:checked + .slider {\n            background-color: #7ff5be;\n        }\n\n        input:checked + .slider:before {\n            transform: translateX(26px);\n        }\n\n        .slider.round {\n            border-radius: 34px;\n        }\n\n        .slider.round:before {\n            border-radius: 50%;\n        }\n\n        /* Layout für den gesamten Inhalt */\n        .content-container {\n            display: flex;\n            justify-content: center;\n            align-items: flex-start;\n            margin-top: 20px;\n        }\n\n        /* Styling für das Eingabefeld und Label */\n        .input-container {\n            display: flex;\n            flex-direction: column;\n            margin-right: 20px;\n        }\n\n        .input-container label {\n            margin-bottom: 10px;\n            font-weight: bold;\n        }\n\n        .input-container input {\n            padding: 5px;\n            width: 100px;\n            text-align: center;\n            border: 2px solid #000;\n            background-color: #fff;\n        }\n\n        /* Styling für die Schaltungen */\n        .schaltung {\n            display: none;\n        }\n\n        .schaltung-aktiv {\n            display: block;\n            margin-top: 20px;\n            text-align: center;\n        }\n\n        /* Gemeinsames Styling der Buttons */\n        .button-container {\n            display: flex;\n            justify-content: center;\n            margin-top: 20px;\n            gap: 20px; /* Abstand zwischen den Buttons */\n        }\n\n        .custom-button {\n            padding: 10px 20px;\n            background-color: #000;\n            color: #fff;\n            border: 2px solid #fff;\n            cursor: pointer;\n            text-align: center;\n        }\n\n        .custom-button.active {\n            border-color: #fff;\n        }\n    \n} }'
				}
			</style>
			<div>
				<h1>
					<br />
					{"Drehstrom"}
				</h1>
			</div>
			<label className="switch">
				<input
					disabled={!controller.ready}
					type="checkbox"
					aria-label="Dreieckschaltung"
					id="toggleSwitch"
					data-action="toggleCircuit"
					onClick={(event) => {
						controller.current?.invoke?.("toggleCircuit", event.currentTarget);
					}}
				/>
				<span className="slider round"></span>
			</label>
			<br />
			<span id="circuitType">{"Sternschaltung"}</span>
			<div className="content-container">
				<div className="input-container">
					<label htmlFor="inputVoltage">{"Eingangsstrangspannung (V):"}</label>
					<input
						disabled={!controller.ready}
						type="number"
						aria-label="Eingangsstrangspannung (V):"
						id="inputVoltage"
						defaultValue="230"
					/>
				</div>
				<br />
				<div className="input-container">
					<label htmlFor="outputVoltage">{"Verkettete Spannung (V):"}</label>
					<input
						disabled={!controller.ready}
						type="text"
						aria-label="Verkettete Spannung (V):"
						id="outputVoltage"
						defaultValue=""
						readOnly={true}
					/>
				</div>
				<div id="starCircuit" className="schaltung schaltung-aktiv">
					<img
						src="/Pictures/Drehstrom_Stern_ohne_NL.jpg"
						alt="Sternschaltung"
						id="starImage"
					/>
					<div className="button-container">
						<button
							disabled={!controller.ready}
							type="button"
							id="neutralButton"
							className="custom-button"
							data-action="toggleNeutral"
							onClick={(event) => {
								controller.current?.invoke?.(
									"toggleNeutral",
									event.currentTarget,
								);
							}}
						>
							{"Neutralleiter Hinzufügen"}
						</button>
						<button
							disabled={!controller.ready}
							type="button"
							id="symmetryButtonStar"
							className="custom-button"
							data-action="toggleSymmetry"
							onClick={(event) => {
								controller.current?.invoke?.(
									"toggleSymmetry",
									event.currentTarget,
									"star",
								);
							}}
						>
							{"Symmetrisch"}
						</button>
					</div>
				</div>
				<div id="deltaCircuit" className="schaltung">
					<img
						src="/Pictures/Drehstrom_Dreieck.jpg"
						alt="Dreieckschaltung"
						id="deltaImage"
					/>
					<div className="button-container">
						<button
							disabled={!controller.ready}
							type="button"
							id="symmetryButtonDelta"
							className="custom-button"
							data-action="toggleSymmetry"
							onClick={(event) => {
								controller.current?.invoke?.(
									"toggleSymmetry",
									event.currentTarget,
									"delta",
								);
							}}
						>
							{"Symmetrisch"}
						</button>
					</div>
				</div>
			</div>
			<br />
			<br />
			<div>
				<footer>{"© 2024 Elecalculate"}</footer>
			</div>
		</div>
	);
}
