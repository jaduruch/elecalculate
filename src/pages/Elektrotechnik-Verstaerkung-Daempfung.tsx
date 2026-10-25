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
						<label>
							{"Strom I"}
							<sub>{"1"}</sub>
						</label>
						<input
							disabled={!controller.ready}
							style={{ borderColor: "var(--Strom)" }}
							type="text"
							aria-label="Strom I1"
							id="I1"
						/>
						<label>{"A [Ampere]"}</label>
					</div>
					<div className="form-row">
						<label>
							{"Strom I"}
							<sub>{"2"}</sub>
						</label>
						<input
							disabled={!controller.ready}
							style={{ borderColor: "var(--Strom)" }}
							type="text"
							aria-label="Strom I2"
							id="I2"
						/>
						<label>{"A [Ampere]"}</label>
					</div>
					<div className="form-row">
						<label>{"Verstärkungsmass g"}</label>
						<input
							disabled={!controller.ready}
							style={{ borderColor: "var(--Verstaerkungsmass)" }}
							type="text"
							aria-label="Verstärkungsmass g"
							id="g"
						/>
						<label>{"1 [dB]"}</label>
					</div>
					<div className="form-row">
						<label>{"Dämpfungssmass a"}</label>
						<input
							disabled={!controller.ready}
							style={{ borderColor: "var(--Daempfungsmass)" }}
							type="text"
							aria-label="Dämpfungssmass a"
							id="a"
						/>
						<label>{"1 [dB]"}</label>
					</div>
					<div className="form-row">
						<label>
							{"Leistung P"}
							<sub>{"1"}</sub>
						</label>
						<input
							disabled={!controller.ready}
							style={{ borderColor: "var(--Leistung)" }}
							type="text"
							aria-label="Leistung P1"
							id="P1"
						/>
						<label>{"W [Watt]"}</label>
					</div>
					<div className="form-row">
						<label>
							{"Leistung P"}
							<sub>{"2"}</sub>
						</label>
						<input
							disabled={!controller.ready}
							style={{ borderColor: "var(--Leistung)" }}
							type="text"
							aria-label="Leistung P2"
							id="P2"
						/>
						<label>{"W [Watt]"}</label>
					</div>
					<div className="form-row">
						<label>
							{"Spannung U"}
							<sub>{"1"}</sub>
						</label>
						<input
							disabled={!controller.ready}
							style={{ borderColor: "var(--Spannung)" }}
							type="text"
							aria-label="Spannung U1"
							id="U1"
						/>
						<label>{"V [Volt]"}</label>
					</div>
					<div className="form-row">
						<label>
							{"Spannung U"}
							<sub>{"2"}</sub>
						</label>
						<input
							disabled={!controller.ready}
							style={{ borderColor: "var(--Spannung)" }}
							type="text"
							aria-label="Spannung U2"
							id="U2"
						/>
						<label>{"V [Volt]"}</label>
					</div>
					<div className="form-row">
						<label>{"Spannungs-/Stromfaktor V"}</label>
						<input
							disabled={!controller.ready}
							style={{ borderColor: "var(--Verstaerkungsfaktor)" }}
							type="text"
							aria-label="Verstärkungsfaktor V"
							id="V"
						/>
						<label>{"1"}</label>
					</div>
					<div className="form-row">
						<label>{"Spannungs-/Stromdämpfungsfaktor D"}</label>
						<input
							disabled={!controller.ready}
							style={{ borderColor: "var(--Daempfungsfaktor)" }}
							type="text"
							aria-label="Dämpfungsfaktor D"
							id="D"
						/>
						<label>{"1"}</label>
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
