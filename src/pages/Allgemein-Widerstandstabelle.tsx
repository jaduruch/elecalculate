import { useCalculator } from "../lib/use-calculator";
import { createController } from "../calculations/Allgemein-Widerstandstabelle.js";
export default function Page() {
	const controller = useCalculator(createController);
	return (
		<>
			{controller.restoring && (
				<p className="notebook-loading" role="status">
					Gespeicherte Eingaben werden geladen…
				</p>
			)}
			<div
				ref={controller.root}
				inert={controller.restoring}
				aria-busy={controller.restoring || undefined}
				data-restoring={controller.restoring ? "true" : "false"}
				data-ready={controller.ready ? "true" : undefined}
				className="page-body "
			>
				<style>
					{
						"@layer source { @scope (.page-body) {\n\n        .dropdown-container {\n            display: flex;\n            flex-direction: column;\n            align-items: center;\n            margin-top: 20px;\n        }\n        .dropdown-container div {\n            margin-bottom: 10px;\n        }\n        .dropdown-menus {\n            display: flex;\n            justify-content: space-around;\n            width: 100%;\n        }\n        .dropdown {\n            position: relative;\n            display: inline-block;\n        }\n        .dropdown-select {\n            background-color: white;\n            color: black;\n            border: 1px solid #ccc;\n            padding: 5px;\n            cursor: pointer;\n            border-radius: 4px;\n        }\n        .dropdown-content {\n            display: none;\n            position: absolute;\n            background-color: white;\n            color: black;\n            border: 1px solid #ccc;\n            z-index: 1;\n            width: 120px;\n            border-radius: 4px;\n        }\n        .dropdown-content div {\n            padding: 5px;\n            cursor: pointer;\n        }\n        .dropdown-content div:hover {\n            filter: brightness(0.75);\n        }\n        .dropdown-content div.selected {\n            background-color: lightgray;\n        }\n        .color-box {\n            display: inline-block;\n            width: 20px;\n            height: 20px;\n            vertical-align: middle;\n            margin-right: 10px;\n            border-radius: 4px;\n            /*border-width: 2px;\n            border-color:rgb(0, 37, 202);*/\n        }\n        #result {\n            margin-top: 20px;\n            text-align: center;\n        }\n\n        th, td {\n        border: 1px solid black;\n        padding: 8px;\n        text-align: left;\n        }\n        \n        td {\n        min-width: 80px; /* Replace 'value' with the desired minimum width */\n        }\n\n    \n} }"
					}
				</style>
				<div>
					<h1>
						<br />
						{"Widerstandstabelle"}
					</h1>
				</div>
				<table style={{ maxWidth: "150px" }}>
					<tbody>
						<tr>
							<th>{"Farbe"}</th>
							<th>{"Band 1"}</th>
							<th>{"Band 2"}</th>
							<th>{"Band 3"}</th>
							<th>{"Multiplikator"}</th>
							<th>{"Toleranz"}</th>
						</tr>
						<tr style={{ backgroundColor: "black", color: "white" }}>
							<td>{"Schwarz"}</td>
							<td>{"0"}</td>
							<td>{"0"}</td>
							<td>{"0"}</td>
							<td>{"*1Ω"}</td>
							<td></td>
						</tr>
						<tr style={{ backgroundColor: "rgb(139, 72, 32)", color: "white" }}>
							<td>{"Braun"}</td>
							<td>{"1"}</td>
							<td>{"1"}</td>
							<td>{"1"}</td>
							<td>{"*10Ω"}</td>
							<td>{"±1%"}</td>
						</tr>
						<tr style={{ backgroundColor: "red", color: "white" }}>
							<td>{"Rot"}</td>
							<td>{"2"}</td>
							<td>{"2"}</td>
							<td>{"2"}</td>
							<td>{"*100Ω"}</td>
							<td>{"±2%"}</td>
						</tr>
						<tr style={{ backgroundColor: "rgb(255, 145, 0)", color: "black" }}>
							<td>{"Orange"}</td>
							<td>{"3"}</td>
							<td>{"3"}</td>
							<td>{"3"}</td>
							<td>{"*1kΩ"}</td>
							<td></td>
						</tr>
						<tr style={{ backgroundColor: "rgb(255, 238, 0)", color: "black" }}>
							<td>{"Gelb"}</td>
							<td>{"4"}</td>
							<td>{"4"}</td>
							<td>{"4"}</td>
							<td>{"*10kΩ"}</td>
							<td></td>
						</tr>
						<tr
							style={{
								backgroundColor: "rgb(0, 182, 0)",
								color: "rgb(0, 0, 0)",
							}}
						>
							<td>{"Grün"}</td>
							<td>{"5"}</td>
							<td>{"5"}</td>
							<td>{"5"}</td>
							<td>{"*100kΩ"}</td>
							<td>{"±0.5%"}</td>
						</tr>
						<tr style={{ backgroundColor: "rgb(0, 37, 202)", color: "white" }}>
							<td>{"Blau"}</td>
							<td>{"6"}</td>
							<td>{"6"}</td>
							<td>{"6"}</td>
							<td>{"*1MΩ"}</td>
							<td>{"±0.25%"}</td>
						</tr>
						<tr style={{ backgroundColor: "rgb(144, 0, 201)", color: "white" }}>
							<td>{"Violett"}</td>
							<td>{"7"}</td>
							<td>{"7"}</td>
							<td>{"7"}</td>
							<td>{"*10MΩ"}</td>
							<td>{"±0.1%"}</td>
						</tr>
						<tr style={{ backgroundColor: "gray", color: "white" }}>
							<td>{"Grau"}</td>
							<td>{"8"}</td>
							<td>{"8"}</td>
							<td>{"8"}</td>
							<td>{"*100MΩ"}</td>
							<td>{"±0.05%"}</td>
						</tr>
						<tr style={{ backgroundColor: "white", color: "black" }}>
							<td>{"Weiß"}</td>
							<td>{"9"}</td>
							<td>{"9"}</td>
							<td>{"9"}</td>
							<td>{"*1GΩ"}</td>
							<td></td>
						</tr>
						<tr style={{ backgroundColor: "#b68a22", color: "white" }}>
							<td>{"Gold"}</td>
							<td></td>
							<td></td>
							<td></td>
							<td>{"*0.1Ω"}</td>
							<td>{"±5%"}</td>
						</tr>
						<tr
							style={{ backgroundColor: "rgb(207, 207, 207)", color: "black" }}
						>
							<td>{"Silber"}</td>
							<td></td>
							<td></td>
							<td></td>
							<td>{"*0.01Ω"}</td>
							<td>{"±10%"}</td>
						</tr>
					</tbody>
				</table>
				<br />
				<div className="dropdown">
					<button
						disabled={!controller.ready}
						type="button"
						id="band1Select"
						className="dropdown-select"
					>
						<span
							style={{ backgroundColor: "black" }}
							className="color-box"
						></span>
						{"\n                        Band 1\n                    "}
					</button>
					<div id="band1Dropdown" className="dropdown-content">
						<button
							disabled={!controller.ready}
							style={{ backgroundColor: "black", color: "white" }}
							type="button"
							id="control-0"
							data-value="0"
						>
							{"Schwarz"}
						</button>
						<button
							disabled={!controller.ready}
							style={{ backgroundColor: "brown", color: "white" }}
							type="button"
							id="control-1"
							data-value="1"
						>
							{"Braun"}
						</button>
						<button
							disabled={!controller.ready}
							style={{ backgroundColor: "red", color: "white" }}
							type="button"
							id="control-2"
							data-value="2"
						>
							{"Rot"}
						</button>
						<button
							disabled={!controller.ready}
							style={{ backgroundColor: "orange", color: "black" }}
							type="button"
							id="control-3"
							data-value="3"
						>
							{"Orange"}
						</button>
						<button
							disabled={!controller.ready}
							style={{ backgroundColor: "yellow", color: "black" }}
							type="button"
							id="control-4"
							data-value="4"
						>
							{"Gelb"}
						</button>
						<button
							disabled={!controller.ready}
							style={{ backgroundColor: "green", color: "white" }}
							type="button"
							id="control-5"
							data-value="5"
						>
							{"Grün"}
						</button>
						<button
							disabled={!controller.ready}
							style={{ backgroundColor: "blue", color: "white" }}
							type="button"
							id="control-6"
							data-value="6"
						>
							{"Blau"}
						</button>
						<button
							disabled={!controller.ready}
							style={{ backgroundColor: "purple", color: "white" }}
							type="button"
							id="control-7"
							data-value="7"
						>
							{"Violett"}
						</button>
						<button
							disabled={!controller.ready}
							style={{ backgroundColor: "gray", color: "white" }}
							type="button"
							id="control-8"
							data-value="8"
						>
							{"Grau"}
						</button>
						<button
							disabled={!controller.ready}
							style={{ backgroundColor: "white", color: "black" }}
							type="button"
							id="control-9"
							data-value="9"
						>
							{"Weiss"}
						</button>
					</div>
				</div>
				<div className="dropdown">
					<button
						disabled={!controller.ready}
						type="button"
						id="band2Select"
						className="dropdown-select"
					>
						<span
							style={{ backgroundColor: "rgb(0, 0, 0)" }}
							className="color-box"
						></span>
						{"\n                        Band 2\n                    "}
					</button>
					<div id="band2Dropdown" className="dropdown-content">
						<button
							disabled={!controller.ready}
							style={{ backgroundColor: "black", color: "white" }}
							type="button"
							id="control-10"
							data-value="0"
						>
							{"Schwarz"}
						</button>
						<button
							disabled={!controller.ready}
							style={{ backgroundColor: "brown", color: "white" }}
							type="button"
							id="control-11"
							data-value="1"
						>
							{"Braun"}
						</button>
						<button
							disabled={!controller.ready}
							style={{ backgroundColor: "red", color: "white" }}
							type="button"
							id="control-12"
							data-value="2"
						>
							{"Rot"}
						</button>
						<button
							disabled={!controller.ready}
							style={{ backgroundColor: "orange", color: "black" }}
							type="button"
							id="control-13"
							data-value="3"
						>
							{"Orange"}
						</button>
						<button
							disabled={!controller.ready}
							style={{ backgroundColor: "yellow", color: "black" }}
							type="button"
							id="control-14"
							data-value="4"
						>
							{"Gelb"}
						</button>
						<button
							disabled={!controller.ready}
							style={{ backgroundColor: "green", color: "white" }}
							type="button"
							id="control-15"
							data-value="5"
						>
							{"Grün"}
						</button>
						<button
							disabled={!controller.ready}
							style={{ backgroundColor: "blue", color: "white" }}
							type="button"
							id="control-16"
							data-value="6"
						>
							{"Blau"}
						</button>
						<button
							disabled={!controller.ready}
							style={{ backgroundColor: "purple", color: "white" }}
							type="button"
							id="control-17"
							data-value="7"
						>
							{"Violett"}
						</button>
						<button
							disabled={!controller.ready}
							style={{ backgroundColor: "gray", color: "white" }}
							type="button"
							id="control-18"
							data-value="8"
						>
							{"Grau"}
						</button>
						<button
							disabled={!controller.ready}
							style={{ backgroundColor: "white", color: "black" }}
							type="button"
							id="control-19"
							data-value="9"
						>
							{"Weiss"}
						</button>
					</div>
				</div>
				<div className="dropdown">
					<button
						disabled={!controller.ready}
						type="button"
						id="band3Select"
						className="dropdown-select"
					>
						<span
							style={{ backgroundColor: "black" }}
							className="color-box"
						></span>
						{"\n                        Band 3\n                    "}
					</button>
					<div id="band3Dropdown" className="dropdown-content">
						<button
							disabled={!controller.ready}
							type="button"
							id="control-20"
							data-value="-1"
							className="no-selection"
						>
							{"keine"}
						</button>
						<button
							disabled={!controller.ready}
							style={{ backgroundColor: "black", color: "white" }}
							type="button"
							id="control-21"
							data-value="0"
						>
							{"Schwarz"}
						</button>
						<button
							disabled={!controller.ready}
							style={{ backgroundColor: "brown", color: "white" }}
							type="button"
							id="control-22"
							data-value="1"
						>
							{"Braun"}
						</button>
						<button
							disabled={!controller.ready}
							style={{ backgroundColor: "red", color: "white" }}
							type="button"
							id="control-23"
							data-value="2"
						>
							{"Rot"}
						</button>
						<button
							disabled={!controller.ready}
							style={{ backgroundColor: "orange", color: "black" }}
							type="button"
							id="control-24"
							data-value="3"
						>
							{"Orange"}
						</button>
						<button
							disabled={!controller.ready}
							style={{ backgroundColor: "yellow", color: "black" }}
							type="button"
							id="control-25"
							data-value="4"
						>
							{"Gelb"}
						</button>
						<button
							disabled={!controller.ready}
							style={{ backgroundColor: "green", color: "white" }}
							type="button"
							id="control-26"
							data-value="5"
						>
							{"Grün"}
						</button>
						<button
							disabled={!controller.ready}
							style={{ backgroundColor: "blue", color: "white" }}
							type="button"
							id="control-27"
							data-value="6"
						>
							{"Blau"}
						</button>
						<button
							disabled={!controller.ready}
							style={{ backgroundColor: "purple", color: "white" }}
							type="button"
							id="control-28"
							data-value="7"
						>
							{"Violett"}
						</button>
						<button
							disabled={!controller.ready}
							style={{ backgroundColor: "gray", color: "white" }}
							type="button"
							id="control-29"
							data-value="8"
						>
							{"Grau"}
						</button>
						<button
							disabled={!controller.ready}
							style={{ backgroundColor: "white", color: "black" }}
							type="button"
							id="control-30"
							data-value="9"
						>
							{"Weiss"}
						</button>
					</div>
				</div>
				<div className="dropdown">
					<button
						disabled={!controller.ready}
						type="button"
						id="multiplierSelect"
						className="dropdown-select"
					>
						{"\n                        Multiplikator\n                    "}
					</button>
					<div id="multiplierDropdown" className="dropdown-content">
						<button
							disabled={!controller.ready}
							style={{ backgroundColor: "black", color: "white" }}
							type="button"
							id="control-31"
							data-value="1"
						>
							{"*1Ω"}
						</button>
						<button
							disabled={!controller.ready}
							style={{ backgroundColor: "brown", color: "white" }}
							type="button"
							id="control-32"
							data-value="10"
						>
							{"*10Ω"}
						</button>
						<button
							disabled={!controller.ready}
							style={{ backgroundColor: "red", color: "white" }}
							type="button"
							id="control-33"
							data-value="100"
						>
							{"*100Ω"}
						</button>
						<button
							disabled={!controller.ready}
							style={{ backgroundColor: "orange", color: "black" }}
							type="button"
							id="control-34"
							data-value="1000"
						>
							{"*1kΩ"}
						</button>
						<button
							disabled={!controller.ready}
							style={{ backgroundColor: "yellow", color: "black" }}
							type="button"
							id="control-35"
							data-value="10000"
						>
							{"*10kΩ"}
						</button>
						<button
							disabled={!controller.ready}
							style={{ backgroundColor: "green", color: "white" }}
							type="button"
							id="control-36"
							data-value="100000"
						>
							{"*100kΩ"}
						</button>
						<button
							disabled={!controller.ready}
							style={{ backgroundColor: "blue", color: "white" }}
							type="button"
							id="control-37"
							data-value="1000000"
						>
							{"*1MΩ"}
						</button>
						<button
							disabled={!controller.ready}
							style={{ backgroundColor: "purple", color: "white" }}
							type="button"
							id="control-38"
							data-value="10000000"
						>
							{"*10MΩ"}
						</button>
						<button
							disabled={!controller.ready}
							style={{ backgroundColor: "gray", color: "white" }}
							type="button"
							id="control-39"
							data-value="100000000"
						>
							{"*100MΩ"}
						</button>
						<button
							disabled={!controller.ready}
							style={{ backgroundColor: "white", color: "black" }}
							type="button"
							id="control-40"
							data-value="1000000000"
						>
							{"*1GΩ"}
						</button>
						<button
							disabled={!controller.ready}
							style={{ backgroundColor: "#b79c40", color: "#000" }}
							type="button"
							id="multiplier-gold"
							data-value="0.1"
						>
							{"Gold"}
						</button>
						<button
							disabled={!controller.ready}
							style={{ backgroundColor: "#c0c0c0", color: "#000" }}
							type="button"
							id="multiplier-silver"
							data-value="0.01"
						>
							{"Silber"}
						</button>
					</div>
				</div>
				<div className="dropdown">
					<button
						disabled={!controller.ready}
						type="button"
						id="toleranceSelect"
						className="dropdown-select"
					>
						{"\n                        Toleranz\n                    "}
					</button>
					<div id="toleranceDropdown" className="dropdown-content">
						<button
							disabled={!controller.ready}
							type="button"
							id="control-41"
							data-value="0.01"
						>
							{"±1%"}
						</button>
						<button
							disabled={!controller.ready}
							type="button"
							id="control-42"
							data-value="0.02"
						>
							{"±2%"}
						</button>
						<button
							disabled={!controller.ready}
							type="button"
							id="control-43"
							data-value="0.05"
						>
							{"±5%"}
						</button>
						<button
							disabled={!controller.ready}
							type="button"
							id="control-44"
							data-value="0.1"
						>
							{"±10%"}
						</button>
						<button
							disabled={!controller.ready}
							type="button"
							id="control-45"
							data-value="0.2"
						>
							{"±20%"}
						</button>
					</div>
				</div>
				<input
					disabled={!controller.ready}
					type="hidden"
					id="band1"
					defaultValue="0"
				/>
				<input
					disabled={!controller.ready}
					type="hidden"
					id="band2"
					defaultValue="0"
				/>
				<input
					disabled={!controller.ready}
					type="hidden"
					id="band3"
					defaultValue="-1"
				/>
				<input
					disabled={!controller.ready}
					type="hidden"
					id="multiplier"
					defaultValue="1"
				/>
				<input
					disabled={!controller.ready}
					type="hidden"
					id="tolerance"
					defaultValue="0"
				/>
				<div id="result" aria-live="polite">
					<p id="resistanceValue">{"Widerstand: 0Ω"}</p>
					<p id="toleranceValue">{"Toleranz: ±0%"}</p>
				</div>
			</div>
		</>
	);
}
