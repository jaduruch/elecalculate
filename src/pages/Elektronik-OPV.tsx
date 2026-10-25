import { useCalculator } from "../lib/use-calculator";
import { createController } from "../calculations/Elektronik-OPV.js";
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
						'@layer source { @scope (.page-body) {\n\n        /*Slider*/\n        .switch {\n            position: relative;\n            display: inline-block;\n            width: 34px;\n            height: 20px;\n        }\n\n        .switch input {\n            opacity: 0;\n            width: 0;\n            height: 0;\n        }\n\n        .slider {\n            position: absolute;\n            cursor: pointer;\n            top: 0;\n            left: 0;\n            right: 0;\n            bottom: 0;\n            background-color: #535353;\n            transition: .2s;\n            border-radius: 20px;\n        }\n\n        .slider:before {\n            position: absolute;\n            content: "";\n            height: 14px;\n            width: 14px;\n            left: 3px;\n            bottom: 3px;\n            background-color: white;\n            transition: .2s;\n            border-radius: 50%;\n        }\n\n        input:checked + .slider:before {\n            transform: translateX(14px);\n        }\n\n\n        .opv-button {\n            position: relative;\n            width: 200px; /* Adjust as needed */\n            height: 150px; /* Adjust as needed */\n            border: 2px solid transparent; /* Initially transparent */\n            padding: 0;\n            margin: 10px;\n            background-color: transparent;\n            cursor: pointer;\n        }\n        \n        .opv-button img {\n            width: 100%;\n            height: 100%;\n            object-fit: cover;\n        }\n\n        .opv-button:hover {\n            border-color: grey; /* grey border for hovered button */\n        }\n        \n        .opv-button.selected {\n            border-color: white; /* White border for selected button */\n        }\n        \n        .opv-button span {\n            position: absolute;\n            bottom: 0;\n            left: 0;\n            width: 100%;\n            text-align: center;\n            background: rgba(0, 0, 0, 0.5);\n            color: white;\n            font-size: 14px;\n            padding: 2px 0;\n        }\n        \n        .input-container {\n            margin-top: 20px;\n            text-align: center;\n        }\n        \n        .input-container label, .input-container input, .input-container select, .input-container button {\n            display: block;\n            margin: 5px auto;\n        }\n        \n        .input-group {\n            display: flex;\n            justify-content: center;\n            align-items: center;\n        }\n        \n        .input-group input {\n            margin-right: 5px;\n        }\n        \n        .input-group select {\n            margin-left: 5px;\n        }\n\n        input {\n            border: 2px solid;\n            border-radius: 3px;\n        }\n\n        input:focus {\n            /*border: 3px solid;*/\n            outline: none; /* Entfernt den Standard-Umrandungsring */\n        }\n\n        /* Stil fuer das Formular und Layout */\n        .input-numbers {\n            display: flex;\n            flex-direction: column;\n            align-items: flex-start;\n            margin-bottom: 20px;\n            max-width: 600px; /* Setzt eine maximale Breite */\n            margin: 0 auto; /* Zentriert das Formular */\n            /*margin-left: 10px;*/\n        }\n\n        .comment{\n            font-size: smaller;\n            font-style: italic;\n            color:rgb(179, 179, 179);\n            margin-left: 10px;\n        }\n\n        .form-row {\n            display: flex;\n            align-items: center;\n            margin-bottom: 10px;\n            width: 100%;\n            margin-left: 10px;\n            \n        }\n\n        .form-row label {\n            flex: 3;\n            text-align: left;\n            margin-right: 10px;\n\n        }\n\n        h3 {\n            margin-top: 20px;\n        }\n\n        .results{\n            line-height: 2; /* Multiplikator fuer die Schriftgroesse */\n        }\n\n        .fraction\n        {\n            display: inline-block; \n            vertical-align: middle; \n            text-align: center;\n            margin-top: 1px;\n            margin-bottom: 1px;\n            line-height: 1.5; /* Multiplikator fuer die Schriftgroesse */\n        }\n\n        .fraction-numerator{\n            border-bottom: 1px solid;\n            padding-bottom: 0.2px; /* Sorgt fuer einen Abstand innerhalb des Elements */\n            display: inline-block; /* Macht die Anpassungen besser sichtbar */\n        }\n\n        .fraction-denominator {\n            border-top: 1px solid;\n        }\n    \n} }'
					}
				</style>
				<div>
					<h1>
						<br />
						{"OPV"}
					</h1>
				</div>
				<div id="opvButtons">
					<button
						disabled={!controller.ready}
						type="button"
						id="control-0"
						className="opv-button "
						data-action="toggleSelection"
						data-target="invertierender_Verstaerker"
						onClick={(event) => {
							controller.current?.invoke?.(
								"toggleSelection",
								event.currentTarget,
								event.currentTarget,
								"invertierender_Verstaerker",
							);
						}}
					>
						<img
							src="/Elektronik/OPV_Bilder/Invertierender_Verstaerker.JPG"
							alt="invertierender Verstaerker"
						/>
						<span>{"invertierender Verstärker"}</span>
					</button>
					<button
						disabled={!controller.ready}
						type="button"
						id="control-1"
						className="opv-button "
						data-action="toggleSelection"
						data-target="nicht_invertierender_Verstaerker"
						onClick={(event) => {
							controller.current?.invoke?.(
								"toggleSelection",
								event.currentTarget,
								event.currentTarget,
								"nicht_invertierender_Verstaerker",
							);
						}}
					>
						<img
							src="/Elektronik/OPV_Bilder/Nicht_Invertierender_Verstaerker.JPG"
							alt="nicht-invertierender Verstaerker"
						/>
						<span>{"nicht-invertierender Verstärker"}</span>
					</button>
					<button
						disabled={!controller.ready}
						type="button"
						id="control-2"
						className="opv-button "
						data-action="toggleSelection"
						data-target="summier_Verstaerker"
						onClick={(event) => {
							controller.current?.invoke?.(
								"toggleSelection",
								event.currentTarget,
								event.currentTarget,
								"summier_Verstaerker",
							);
						}}
					>
						<img
							src="/Elektronik/OPV_Bilder/Summier_Verstaerker.JPG"
							alt="Summier Verstaerker"
						/>
						<span>{"Summier Verstärker"}</span>
					</button>
					<button
						disabled={!controller.ready}
						type="button"
						id="control-3"
						className="opv-button "
						data-action="toggleSelection"
						data-target="differenz_Verstaerker"
						onClick={(event) => {
							controller.current?.invoke?.(
								"toggleSelection",
								event.currentTarget,
								event.currentTarget,
								"differenz_Verstaerker",
							);
						}}
					>
						<img
							src="/Elektronik/OPV_Bilder/Differenz_Verstaerker.JPG"
							alt="Differenz Verstaerker"
						/>
						<span>{"Subtrahier Verstärker"}</span>
					</button>
				</div>
				<div
					style={{ display: "none" }}
					id="invertierender_Verstaerker"
					className="input-numbers"
				>
					<h2>{"invertierender Verstärker"}</h2>
					<img
						id="opvImage1"
						src="/Elektronik/OPV_Bilder/Invertierender_Verstaerker_Beschriftet.JPG"
						alt="Invertierender Verstaerker"
						width="500"
					/>
					<div className="comment">
						{"\n                    Werte mit Massvorsatz eingeben z.B. R"}
						<sub>{"1"}</sub>
						{" = 10kΩ → Eingabe: 10k (nicht 10kΩ)"}
						<br />
						<br />
					</div>
					<div className="form-row">
						<label htmlFor="R1-1">
							{"Widerstand R"}
							<sub>{"1"}</sub>
						</label>
						<input
							disabled={!controller.ready}
							style={{ borderColor: "var(--Widerstand)" }}
							type="text"
							aria-label="Widerstand R1"
							id="R1-1"
							data-action="updateImage1"
							onClick={(event) => {
								controller.current?.invoke?.(
									"updateImage1",
									event.currentTarget,
									"/Elektronik/OPV_Bilder/Invertierender_Verstaerker_R1.JPG",
								);
							}}
							aria-describedby="R1-1-unit"
						/>
						<label id="R1-1-unit">{"Ω [Ohm]"}</label>
					</div>
					<div className="form-row">
						<label htmlFor="R2-1">
							{"Widerstand R"}
							<sub>{"2"}</sub>
						</label>
						<input
							disabled={!controller.ready}
							style={{ borderColor: "var(--Widerstand)" }}
							type="text"
							aria-label="Widerstand R2"
							id="R2-1"
							data-action="updateImage1"
							onClick={(event) => {
								controller.current?.invoke?.(
									"updateImage1",
									event.currentTarget,
									"/Elektronik/OPV_Bilder/Invertierender_Verstaerker_R2.JPG",
								);
							}}
							aria-describedby="R2-1-unit"
						/>
						<label id="R2-1-unit">{"Ω [Ohm]"}</label>
					</div>
					<div className="form-row">
						<label htmlFor="Uin-1">
							{"Spannung U"}
							<sub>{"in"}</sub>
						</label>
						<input
							disabled={!controller.ready}
							style={{ borderColor: "var(--Spannung)" }}
							type="text"
							aria-label="Spannung Uin"
							id="Uin-1"
							data-action="updateImage1"
							onClick={(event) => {
								controller.current?.invoke?.(
									"updateImage1",
									event.currentTarget,
									"/Elektronik/OPV_Bilder/Invertierender_Verstaerker_Uin.JPG",
								);
							}}
							aria-describedby="Uin-1-unit"
						/>
						<label id="Uin-1-unit">{"V [Volt]"}</label>
					</div>
					<div className="form-row">
						<label htmlFor="Uout-1">
							{"Spannung U"}
							<sub>{"out"}</sub>
						</label>
						<input
							disabled={!controller.ready}
							style={{ borderColor: "var(--Spannung)" }}
							type="text"
							aria-label="Spannung Uout"
							id="Uout-1"
							data-action="updateImage1"
							onClick={(event) => {
								controller.current?.invoke?.(
									"updateImage1",
									event.currentTarget,
									"/Elektronik/OPV_Bilder/Invertierender_Verstaerker_Uout.JPG",
								);
							}}
							aria-describedby="Uout-1-unit"
						/>
						<label id="Uout-1-unit">{"V [Volt]"}</label>
					</div>
					<div className="form-row">
						<label htmlFor="V-1">{"Verstärkung V"}</label>
						<input
							disabled={!controller.ready}
							style={{ borderColor: "var(--Verstaerkungsfaktor)" }}
							type="text"
							aria-label="Verstärkung V"
							id="V-1"
							data-action="updateImage1"
							onClick={(event) => {
								controller.current?.invoke?.(
									"updateImage1",
									event.currentTarget,
									"/Elektronik/OPV_Bilder/Invertierender_Verstaerker_Beschriftet.JPG",
								);
							}}
							aria-describedby="V-1-unit"
						/>
						<label id="V-1-unit">{"1"}</label>
					</div>
					<input
						disabled={!controller.ready}
						type="button"
						defaultValue="Berechnen"
						className="Button_Berechnen"
						data-action="calculate_invertierender_Verstaerker"
						onClick={(event) => {
							controller.current?.invoke?.(
								"calculate_invertierender_Verstaerker",
								event.currentTarget,
							);
						}}
					/>
					<h3>{"Berechnete Ergebnisse"}</h3>
					<div id="result_invertierender_Verstaerker" aria-live="polite"></div>
				</div>
				<div
					style={{ display: "none" }}
					id="nicht_invertierender_Verstaerker"
					className="input-numbers"
				>
					<h2>{"nicht-invertierender Verstärker"}</h2>
					<img
						id="opvImage2"
						src="/Elektronik/OPV_Bilder/Nicht_Invertierender_Verstaerker_Beschriftet.JPG"
						alt="Invertierender Verstaerker"
						width="500"
					/>
					<div className="comment">
						{"\n                    Werte mit Massvorsatz eingeben z.B. R"}
						<sub>{"1"}</sub>
						{" = 10kΩ → Eingabe: 10k (nicht 10kΩ)"}
						<br />
						<br />
					</div>
					<div className="form-row">
						<label htmlFor="R1-2">
							{"Widerstand R"}
							<sub>{"1"}</sub>
						</label>
						<input
							disabled={!controller.ready}
							style={{ borderColor: "var(--Widerstand)" }}
							type="text"
							aria-label="Widerstand R1"
							id="R1-2"
							data-action="updateImage2"
							onClick={(event) => {
								controller.current?.invoke?.(
									"updateImage2",
									event.currentTarget,
									"/Elektronik/OPV_Bilder/Nicht_Invertierender_Verstaerker_R1.JPG",
								);
							}}
							aria-describedby="R1-2-unit"
						/>
						<label id="R1-2-unit">{"Ω [Ohm]"}</label>
					</div>
					<div className="form-row">
						<label htmlFor="R2-2">
							{"Widerstand R"}
							<sub>{"2"}</sub>
						</label>
						<input
							disabled={!controller.ready}
							style={{ borderColor: "var(--Widerstand)" }}
							type="text"
							aria-label="Widerstand R2"
							id="R2-2"
							data-action="updateImage2"
							onClick={(event) => {
								controller.current?.invoke?.(
									"updateImage2",
									event.currentTarget,
									"/Elektronik/OPV_Bilder/Nicht_Invertierender_Verstaerker_R2.JPG",
								);
							}}
							aria-describedby="R2-2-unit"
						/>
						<label id="R2-2-unit">{"Ω [Ohm]"}</label>
					</div>
					<div className="form-row">
						<label htmlFor="Uin-2">
							{"Spannung U"}
							<sub>{"in"}</sub>
						</label>
						<input
							disabled={!controller.ready}
							style={{ borderColor: "var(--Spannung)" }}
							type="text"
							aria-label="Spannung Uin"
							id="Uin-2"
							data-action="updateImage2"
							onClick={(event) => {
								controller.current?.invoke?.(
									"updateImage2",
									event.currentTarget,
									"/Elektronik/OPV_Bilder/Nicht_Invertierender_Verstaerker_Uin.JPG",
								);
							}}
							aria-describedby="Uin-2-unit"
						/>
						<label id="Uin-2-unit">{"V [Volt]"}</label>
					</div>
					<div className="form-row">
						<label htmlFor="Uout-2">
							{"Spannung U"}
							<sub>{"out"}</sub>
						</label>
						<input
							disabled={!controller.ready}
							style={{ borderColor: "var(--Spannung)" }}
							type="text"
							aria-label="Spannung Uout"
							id="Uout-2"
							data-action="updateImage2"
							onClick={(event) => {
								controller.current?.invoke?.(
									"updateImage2",
									event.currentTarget,
									"/Elektronik/OPV_Bilder/Nicht_Invertierender_Verstaerker_Uout.JPG",
								);
							}}
							aria-describedby="Uout-2-unit"
						/>
						<label id="Uout-2-unit">{"V [Volt]"}</label>
					</div>
					<div className="form-row">
						<label htmlFor="V-2">{"Verstärkung V"}</label>
						<input
							disabled={!controller.ready}
							style={{ borderColor: "var(--Verstaerkungsfaktor)" }}
							type="text"
							aria-label="Verstärkung V"
							id="V-2"
							data-action="updateImage2"
							onClick={(event) => {
								controller.current?.invoke?.(
									"updateImage2",
									event.currentTarget,
									"/Elektronik/OPV_Bilder/Nicht_Invertierender_Verstaerker_Beschriftet.JPG",
								);
							}}
							aria-describedby="V-2-unit"
						/>
						<label id="V-2-unit">{"1"}</label>
					</div>
					<input
						disabled={!controller.ready}
						type="button"
						defaultValue="Berechnen"
						className="Button_Berechnen"
						data-action="calculate_nicht_invertierender_Verstaerker"
						onClick={(event) => {
							controller.current?.invoke?.(
								"calculate_nicht_invertierender_Verstaerker",
								event.currentTarget,
							);
						}}
					/>
					<h3>{"Berechnete Ergebnisse"}</h3>
					<div
						id="result_nicht_invertierender_Verstaerker"
						aria-live="polite"
					></div>
				</div>
				<div
					style={{ display: "none" }}
					id="summier_Verstaerker"
					className="input-numbers"
				>
					<h2>{"Summier Verstärker"}</h2>
					<img
						id="opvImage3"
						src="/Elektronik/OPV_Bilder/Summier_Verstaerker_Beschriftet.JPG"
						alt="Invertierender Verstaerker"
						width="500"
					/>
					<div className="comment">
						{"\n                    Werte mit Massvorsatz eingeben z.B. R"}
						<sub>{"11"}</sub>
						{" = 10kΩ → Eingabe: 10k (nicht 10kΩ)"}
						<br />
						<br />
					</div>
					<div className="form-row">
						<label htmlFor="R11-3">
							{"Widerstand R"}
							<sub>{"11"}</sub>
						</label>
						<input
							disabled={!controller.ready}
							style={{ borderColor: "var(--Widerstand)" }}
							type="text"
							aria-label="Widerstand R11"
							id="R11-3"
							data-action="updateImage3"
							onClick={(event) => {
								controller.current?.invoke?.(
									"updateImage3",
									event.currentTarget,
									"/Elektronik/OPV_Bilder/Summier_Verstaerker_R11.JPG",
								);
							}}
							aria-describedby="R11-3-unit"
						/>
						<label id="R11-3-unit">{"Ω [Ohm]"}</label>
					</div>
					<div className="form-row">
						<label htmlFor="R12-3">
							{"Widerstand R"}
							<sub>{"12"}</sub>
						</label>
						<input
							disabled={!controller.ready}
							style={{ borderColor: "var(--Widerstand)" }}
							type="text"
							aria-label="Widerstand R12"
							id="R12-3"
							data-action="updateImage3"
							onClick={(event) => {
								controller.current?.invoke?.(
									"updateImage3",
									event.currentTarget,
									"/Elektronik/OPV_Bilder/Summier_Verstaerker_R12.JPG",
								);
							}}
							aria-describedby="R12-3-unit"
						/>
						<label id="R12-3-unit">{"Ω [Ohm]"}</label>
					</div>
					<div className="form-row">
						<label htmlFor="R2-3">
							{"Widerstand R"}
							<sub>{"2"}</sub>
						</label>
						<input
							disabled={!controller.ready}
							style={{ borderColor: "var(--Widerstand)" }}
							type="text"
							aria-label="Widerstand R2"
							id="R2-3"
							data-action="updateImage3"
							onClick={(event) => {
								controller.current?.invoke?.(
									"updateImage3",
									event.currentTarget,
									"/Elektronik/OPV_Bilder/Summier_Verstaerker_R2.JPG",
								);
							}}
							aria-describedby="R2-3-unit"
						/>
						<label id="R2-3-unit">{"Ω [Ohm]"}</label>
					</div>
					<div className="form-row">
						<label htmlFor="Uin1-3">
							{"Spannung U"}
							<sub>{"in1"}</sub>
						</label>
						<input
							disabled={!controller.ready}
							style={{ borderColor: "var(--Spannung)" }}
							type="text"
							aria-label="Spannung Uin1"
							id="Uin1-3"
							data-action="updateImage3"
							onClick={(event) => {
								controller.current?.invoke?.(
									"updateImage3",
									event.currentTarget,
									"/Elektronik/OPV_Bilder/Summier_Verstaerker_Uin1.JPG",
								);
							}}
							aria-describedby="Uin1-3-unit"
						/>
						<label id="Uin1-3-unit">{"V [Volt]"}</label>
					</div>
					<div className="form-row">
						<label htmlFor="Uin2-3">
							{"Spannung U"}
							<sub>{"in2"}</sub>
						</label>
						<input
							disabled={!controller.ready}
							style={{ borderColor: "var(--Spannung)" }}
							type="text"
							aria-label="Spannung Uin2"
							id="Uin2-3"
							data-action="updateImage3"
							onClick={(event) => {
								controller.current?.invoke?.(
									"updateImage3",
									event.currentTarget,
									"/Elektronik/OPV_Bilder/Summier_Verstaerker_Uin2.JPG",
								);
							}}
							aria-describedby="Uin2-3-unit"
						/>
						<label id="Uin2-3-unit">{"V [Volt]"}</label>
					</div>
					<div className="form-row">
						<label htmlFor="Uout-3">
							{"Spannung U"}
							<sub>{"out"}</sub>
						</label>
						<input
							disabled={!controller.ready}
							style={{ borderColor: "var(--Spannung)" }}
							type="text"
							aria-label="Spannung Uout"
							id="Uout-3"
							data-action="updateImage3"
							onClick={(event) => {
								controller.current?.invoke?.(
									"updateImage3",
									event.currentTarget,
									"/Elektronik/OPV_Bilder/Summier_Verstaerker_Uout.JPG",
								);
							}}
							aria-describedby="Uout-3-unit"
						/>
						<label id="Uout-3-unit">{"V [Volt]"}</label>
					</div>
					<div className="form-row">
						<label htmlFor="V1-3">{"Verstärkung V1"}</label>
						<input
							disabled={!controller.ready}
							style={{ borderColor: "var(--Verstaerkungsfaktor)" }}
							type="text"
							aria-label="Verstärkung V1"
							id="V1-3"
							data-action="updateImage3"
							onClick={(event) => {
								controller.current?.invoke?.(
									"updateImage3",
									event.currentTarget,
									"/Elektronik/OPV_Bilder/Summier_Verstaerker_Beschriftet.JPG",
								);
							}}
							aria-describedby="V1-3-unit"
						/>
						<label id="V1-3-unit">{"1"}</label>
					</div>
					<div className="form-row">
						<label htmlFor="V2-3">{"Verstärkung V2"}</label>
						<input
							disabled={!controller.ready}
							style={{ borderColor: "var(--Verstaerkungsfaktor)" }}
							type="text"
							aria-label="Verstärkung V2"
							id="V2-3"
							data-action="updateImage3"
							onClick={(event) => {
								controller.current?.invoke?.(
									"updateImage3",
									event.currentTarget,
									"/Elektronik/OPV_Bilder/Summier_Verstaerker_Beschriftet.JPG",
								);
							}}
							aria-describedby="V2-3-unit"
						/>
						<label id="V2-3-unit">{"1"}</label>
					</div>
					<input
						disabled={!controller.ready}
						type="button"
						defaultValue="Berechnen"
						className="Button_Berechnen"
						data-action="calculate_summier_Verstaeker"
						onClick={(event) => {
							controller.current?.invoke?.(
								"calculate_summier_Verstaeker",
								event.currentTarget,
							);
						}}
					/>
					<h3>{"Berechnete Ergebnisse"}</h3>
					<div id="result_summier_Verstaerker" aria-live="polite"></div>
				</div>
				<div
					style={{ display: "none" }}
					id="differenz_Verstaerker"
					className="input-numbers"
				>
					<h2>{"Differenz Verstärker"}</h2>
					<img
						id="opvImage4"
						src="/Elektronik/OPV_Bilder/Differenz_Verstaerker_Beschriftet.JPG"
						alt="Invertierender Verstaerker"
						width="500"
					/>
					<div className="comment">
						{"\n                    Werte mit Massvorsatz eingeben z.B. U"}
						<sub>{"out"}</sub>
						{" = 125mV → Eingabe: 125m (nicht 125mV)"}
						<br />
						<br />
					</div>
					<div className="form-row">
						<label htmlFor="R13-4">
							{"Widerstand R"}
							<sub>{"1"}</sub>
							{"/R"}
							<sub>{"3"}</sub>
						</label>
						<input
							disabled={!controller.ready}
							style={{ borderColor: "var(--Widerstand)" }}
							type="text"
							aria-label="Widerstand R1/R3"
							id="R13-4"
							data-action="updateImage4"
							onClick={(event) => {
								controller.current?.invoke?.(
									"updateImage4",
									event.currentTarget,
									"/Elektronik/OPV_Bilder/Differenz_Verstaerker_R1_R3.JPG",
								);
							}}
							aria-describedby="R13-4-unit"
						/>
						<label id="R13-4-unit">{"Ω [Ohm]"}</label>
					</div>
					<div className="form-row">
						<label htmlFor="R24-4">{"Widerstand R2/R4"}</label>
						<input
							disabled={!controller.ready}
							style={{ borderColor: "var(--Widerstand)" }}
							type="text"
							aria-label="Widerstand R2/R4"
							id="R24-4"
							data-action="updateImage4"
							onClick={(event) => {
								controller.current?.invoke?.(
									"updateImage4",
									event.currentTarget,
									"/Elektronik/OPV_Bilder/Differenz_Verstaerker_R2_R4.JPG",
								);
							}}
							aria-describedby="R24-4-unit"
						/>
						<label id="R24-4-unit">{"Ω [Ohm]"}</label>
					</div>
					<div className="form-row">
						<label htmlFor="Uin1-4">
							{"Spannung U"}
							<sub>{"in1"}</sub>
						</label>
						<input
							disabled={!controller.ready}
							style={{ borderColor: "var(--Spannung)" }}
							type="text"
							aria-label="Spannung Uin1"
							id="Uin1-4"
							data-action="updateImage4"
							onClick={(event) => {
								controller.current?.invoke?.(
									"updateImage4",
									event.currentTarget,
									"/Elektronik/OPV_Bilder/Differenz_Verstaerker_Uin1.JPG",
								);
							}}
							aria-describedby="Uin1-4-unit"
						/>
						<label id="Uin1-4-unit">{"V [Volt]"}</label>
					</div>
					<div className="form-row">
						<label htmlFor="Uin2-4">{"Spannung Uin2"}</label>
						<input
							disabled={!controller.ready}
							style={{ borderColor: "var(--Spannung)" }}
							type="text"
							aria-label="Spannung Uin2"
							id="Uin2-4"
							data-action="updateImage4"
							onClick={(event) => {
								controller.current?.invoke?.(
									"updateImage4",
									event.currentTarget,
									"/Elektronik/OPV_Bilder/Differenz_Verstaerker_Uin2.JPG",
								);
							}}
							aria-describedby="Uin2-4-unit"
						/>
						<label id="Uin2-4-unit">{"V [Volt]"}</label>
					</div>
					<div className="form-row">
						<label htmlFor="Uout-4">
							{"Spannung U"}
							<sub>{"out"}</sub>
						</label>
						<input
							disabled={!controller.ready}
							style={{ borderColor: "var(--Spannung)" }}
							type="text"
							aria-label="Spannung Uout"
							id="Uout-4"
							data-action="updateImage4"
							onClick={(event) => {
								controller.current?.invoke?.(
									"updateImage4",
									event.currentTarget,
									"/Elektronik/OPV_Bilder/Differenz_Verstaerker_Uout.JPG",
								);
							}}
							aria-describedby="Uout-4-unit"
						/>
						<label id="Uout-4-unit">{"V [Volt]"}</label>
					</div>
					<div className="form-row">
						<label htmlFor="V-4">{"Verstärkung V"}</label>
						<input
							disabled={!controller.ready}
							style={{ borderColor: "var(--Verstaerkungsfaktor)" }}
							type="text"
							aria-label="Verstärkung V"
							id="V-4"
							data-action="updateImage4"
							onClick={(event) => {
								controller.current?.invoke?.(
									"updateImage4",
									event.currentTarget,
									"/Elektronik/OPV_Bilder/Differenz_Verstaerker_Beschriftet.JPG",
								);
							}}
							aria-describedby="V-4-unit"
						/>
						<label id="V-4-unit">{"1"}</label>
					</div>
					<input
						disabled={!controller.ready}
						type="button"
						defaultValue="Berechnen"
						className="Button_Berechnen"
						data-action="calculate_differenz_Verstaerker"
						onClick={(event) => {
							controller.current?.invoke?.(
								"calculate_differenz_Verstaerker",
								event.currentTarget,
							);
						}}
					/>
					<h3>{"Berechnete Ergebnisse"}</h3>
					<div id="result_differenz_Verstaerker" aria-live="polite"></div>
				</div>
				<br />
			</div>
		</>
	);
}
