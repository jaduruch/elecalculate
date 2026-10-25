import { useCalculator } from "../lib/use-calculator";
import { createController } from "../calculations/Elektrotechnik-Verstaerkung-Daempfung.js";
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
						"@layer source { @scope (.page-body) {\n\n        input:checked + .slider:before {\n            transform: translateX(14px);\n        }\n\n        input {\n            border: 2px solid;\n            border-radius: 3px;\n        }\n\n        input:focus {\n            outline: none; /* Entfernt den Standard-Umrandungsring */\n        }\n\n        /* Stil fuer das Formular und Layout */\n        .input-numbers {\n            display: flex;\n            flex-direction: column;\n            align-items: flex-start;\n            margin-bottom: 20px;\n            max-width: 600px; /* Setzt eine maximale Breite */\n            margin: 0 auto; /* Zentriert das Formular */\n            /*margin-left: 10px;*/\n        }\n\n        .comment{\n            font-size: smaller;\n            font-style: italic;\n            color:rgb(179, 179, 179);\n            margin-left: 10px;\n        }\n\n        .form-row {\n            display: flex;\n            align-items: center;\n            margin-bottom: 10px;\n            width: 100%;\n            margin-left: 10px;\n            \n        }\n\n        .form-row label {\n            flex: 3;\n            text-align: left;\n            margin-right: 10px;\n\n        }\n\n        h3 {\n            margin-top: 20px;\n        }\n\n        .results{\n            line-height: 2; /* Multiplikator fuer die Schriftgroesse */\n        }\n\n        .fraction\n        {\n            display: inline-block; \n            vertical-align: middle; \n            text-align: center;\n            margin-top: 1px;\n            line-height: 1.5; /* Multiplikator fuer die Schriftgroesse */\n        }\n\n        .fraction-numerator{\n            border-bottom: 1px solid;\n            padding-bottom: 0.2px; /* Sorgt fuer einen Abstand innerhalb des Elements */\n            display: inline-block; /* Macht die Anpassungen besser sichtbar */\n        }\n        img{\n            width: 80%;\n            max-width: 600px;\n        }\n    \n} }"
					}
				</style>
				<div>
					<br />
					<h1>{"Verstärkung und Dämpfung"}</h1>
				</div>
				<div className="input-numbers">
					<div className="comment">
						{
							"\n                    Werte mit Massvorsatz eingeben z.B. I = 5mA → Eingabe: 5m (nicht 5mA)"
						}
						<br />
						<br />
					</div>
					<div className="form-row">
						<label htmlFor="I1">
							{"Strom I"}
							<sub>{"1"}</sub>
						</label>
						<input
							disabled={!controller.ready}
							style={{ borderColor: "var(--Strom)" }}
							type="text"
							aria-label="Strom I1"
							id="I1"
							aria-describedby="I1-unit"
						/>
						<label id="I1-unit">{"A [Ampere]"}</label>
					</div>
					<div className="form-row">
						<label htmlFor="I2">
							{"Strom I"}
							<sub>{"2"}</sub>
						</label>
						<input
							disabled={!controller.ready}
							style={{ borderColor: "var(--Strom)" }}
							type="text"
							aria-label="Strom I2"
							id="I2"
							aria-describedby="I2-unit"
						/>
						<label id="I2-unit">{"A [Ampere]"}</label>
					</div>
					<div className="form-row">
						<label htmlFor="g">{"Verstärkungsmass g"}</label>
						<input
							disabled={!controller.ready}
							style={{ borderColor: "var(--Verstaerkungsmass)" }}
							type="text"
							aria-label="Verstärkungsmass g"
							id="g"
							aria-describedby="g-unit"
						/>
						<label id="g-unit">{"1 [dB]"}</label>
					</div>
					<div className="form-row">
						<label htmlFor="a">{"Dämpfungssmass a"}</label>
						<input
							disabled={!controller.ready}
							style={{ borderColor: "var(--Daempfungsmass)" }}
							type="text"
							aria-label="Dämpfungssmass a"
							id="a"
							aria-describedby="a-unit"
						/>
						<label id="a-unit">{"1 [dB]"}</label>
					</div>
					<div className="form-row">
						<label htmlFor="P1">
							{"Leistung P"}
							<sub>{"1"}</sub>
						</label>
						<input
							disabled={!controller.ready}
							style={{ borderColor: "var(--Leistung)" }}
							type="text"
							aria-label="Leistung P1"
							id="P1"
							aria-describedby="P1-unit"
						/>
						<label id="P1-unit">{"W [Watt]"}</label>
					</div>
					<div className="form-row">
						<label htmlFor="P2">
							{"Leistung P"}
							<sub>{"2"}</sub>
						</label>
						<input
							disabled={!controller.ready}
							style={{ borderColor: "var(--Leistung)" }}
							type="text"
							aria-label="Leistung P2"
							id="P2"
							aria-describedby="P2-unit"
						/>
						<label id="P2-unit">{"W [Watt]"}</label>
					</div>
					<div className="form-row">
						<label htmlFor="U1">
							{"Spannung U"}
							<sub>{"1"}</sub>
						</label>
						<input
							disabled={!controller.ready}
							style={{ borderColor: "var(--Spannung)" }}
							type="text"
							aria-label="Spannung U1"
							id="U1"
							aria-describedby="U1-unit"
						/>
						<label id="U1-unit">{"V [Volt]"}</label>
					</div>
					<div className="form-row">
						<label htmlFor="U2">
							{"Spannung U"}
							<sub>{"2"}</sub>
						</label>
						<input
							disabled={!controller.ready}
							style={{ borderColor: "var(--Spannung)" }}
							type="text"
							aria-label="Spannung U2"
							id="U2"
							aria-describedby="U2-unit"
						/>
						<label id="U2-unit">{"V [Volt]"}</label>
					</div>
					<div className="form-row">
						<label htmlFor="V">{"Spannungs-/Stromfaktor V"}</label>
						<input
							disabled={!controller.ready}
							style={{ borderColor: "var(--Verstaerkungsfaktor)" }}
							type="text"
							aria-label="Verstärkungsfaktor V"
							id="V"
							aria-describedby="V-unit"
						/>
						<label id="V-unit">{"1"}</label>
					</div>
					<div className="form-row">
						<label htmlFor="D">{"Spannungs-/Stromdämpfungsfaktor D"}</label>
						<input
							disabled={!controller.ready}
							style={{ borderColor: "var(--Daempfungsfaktor)" }}
							type="text"
							aria-label="Dämpfungsfaktor D"
							id="D"
							aria-describedby="D-unit"
						/>
						<label id="D-unit">{"1"}</label>
					</div>
				</div>
				<input
					disabled={!controller.ready}
					type="button"
					defaultValue="Berechnen"
					className="Button_Berechnen"
					data-action="calculateParameters"
					onClick={(event) => {
						controller.current?.invoke?.(
							"calculateParameters",
							event.currentTarget,
						);
					}}
				/>
				<h3>{"Resultate"}</h3>
				<div id="result" aria-live="polite"></div>
				<br />
				<br />
			</div>
		</>
	);
}
