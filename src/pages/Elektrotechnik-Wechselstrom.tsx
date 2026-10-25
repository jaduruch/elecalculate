import { useCalculator } from "../lib/use-calculator";
import { createController } from "../calculations/Elektrotechnik-Wechselstrom.js";
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
					"@layer source { @scope (.page-body) {\n\n        \n        /***********/\n        .img-button {\n            position: relative;\n            width: 100px; /* Adjust as needed */\n            height: 100px; /* Adjust as needed */\n            border: 2px solid transparent; /* Initially transparent */\n            padding: 0;\n            margin: 10px;\n            background-color: transparent;\n            cursor: pointer;\n        }\n        \n        .img-button img {\n            width: 100%;\n            height: 100%;\n            object-fit: cover;\n        }\n\n        .img-button:hover {\n            border-color: grey; /* grey border for hovered button */\n        }\n        \n        .img-button.selected {\n            border-color: white; /* White border for selected button */\n        }\n        \n        .img-button span {\n            position: absolute;\n            bottom: 0;\n            left: 0;\n            width: 100%;\n            text-align: center;\n            background: rgba(0, 0, 0, 0.5);\n            color: white;\n            font-size: 14px;\n            padding: 2px 0;\n        }\n        /***********/\n        \n        input {\n            border: 2px solid;\n            border-radius: 3px;\n        }\n\n        input:focus {\n            /*border: 3px solid;*/\n            outline: none; /* Entfernt den Standard-Umrandungsring */\n        }\n\n        /* Stil fuer das Formular und Layout */\n        .input-numbers {\n            display: flex;\n            flex-direction: column;\n            align-items: flex-start;\n            margin-bottom: 20px;\n            max-width: 600px; /* Setzt eine maximale Breite */\n            margin: 0 auto; /* Zentriert das Formular */\n            /*margin-left: 10px;*/\n        }\n\n        .RAD-Button \n        {\n            background: none;\n            /*border: 1px solid var(--Winkel);\n            border-radius: 3px;\n            /*margin-top: 10px;\n            min-width: 50px;\n            height: 29px;*/\n            color: inherit;\n            padding: 0;\n            cursor: pointer;\n            flex: 3;\n            text-align: left;\n        }\n\n        .RAD-Button:hover{\n            text-decoration: underline;\n        }\n\n\n        .form-row {\n            display: flex;\n            align-items: center;\n            margin-bottom: 10px;\n            width: 100%;\n            margin-left: 10px;\n            \n        }\n\n        .form-row label {\n            flex: 3;\n            text-align: left;\n            margin-right: 10px;\n\n        }\n\n        h3 {\n            margin-top: 20px;\n        }\n\n        .results{\n            line-height: 2; /* Multiplikator fuer die Schriftgroesse */\n        }\n\n        .fraction\n        {\n            display: inline-block; \n            vertical-align: middle; \n            text-align: center;\n            margin-top: 1px;\n            margin-bottom: 1px;\n            line-height: 1.5; /* Multiplikator fuer die Schriftgroesse */\n        }\n\n        .fraction-numerator{\n            border-bottom: 1px solid;\n            padding-bottom: 0.2px; /* Sorgt fuer einen Abstand innerhalb des Elements */\n            display: inline-block; /* Macht die Anpassungen besser sichtbar */\n        }\n\n        .fraction-denominator {\n            border-top: 1px solid;\n        }\n\n        img{\n            width: 80%;\n            max-width: 600px;\n        }\n    \n} }"
				}
			</style>
			<div>
				<h1>
					<br />
					{"Wechselstrom"}
				</h1>
			</div>
			<div>
				<button
					disabled={!controller.ready}
					type="button"
					id="control-0"
					className="img-button"
					data-action="toggleSelection"
					data-target="Sinus"
					onClick={(event) => {
						controller.current?.invoke?.(
							"toggleSelection",
							event.currentTarget,
							event.currentTarget,
							"Sinus",
						);
					}}
				>
					<img src="/Pictures/Sinus.jpg" alt="Sinus" />
					<span>{"Sinus"}</span>
				</button>
				<button
					disabled={!controller.ready}
					type="button"
					id="control-1"
					className="img-button"
					data-action="toggleSelection"
					data-target="Rechteck"
					onClick={(event) => {
						controller.current?.invoke?.(
							"toggleSelection",
							event.currentTarget,
							event.currentTarget,
							"Rechteck",
						);
					}}
				>
					<img src="/Pictures/Rechteck.jpg" alt="Rechteck" />
					<span>{"Rechteck"}</span>
				</button>
				<button
					disabled={!controller.ready}
					type="button"
					id="control-2"
					className="img-button"
					data-action="toggleSelection"
					data-target="Dreieck"
					onClick={(event) => {
						controller.current?.invoke?.(
							"toggleSelection",
							event.currentTarget,
							event.currentTarget,
							"Dreieck",
						);
					}}
				>
					<img src="/Pictures/Dreieck.jpg" alt="Dreieck" />
					<span>{"Dreieck"}</span>
				</button>
				<button
					disabled={!controller.ready}
					type="button"
					id="control-3"
					className="img-button"
					data-action="toggleSelection"
					data-target="PWM"
					onClick={(event) => {
						controller.current?.invoke?.(
							"toggleSelection",
							event.currentTarget,
							event.currentTarget,
							"PWM",
						);
					}}
				>
					<img src="/Pictures/PWM.jpg" alt="PWM" />
					<span>{"PWM"}</span>
				</button>
			</div>
			<div style={{ display: "none" }} id="Sinus" className="input-numbers">
				<h2>{"Sinus"}</h2>
				<div className="comment">
					{"\n                    Werte mit Massvorsatz eingeben z.B. U"}
					<sub>{"eff"}</sub>
					{" = 20mV → Eingabe: 20m (nicht 20mV)"}
					<br />
					{
						"\n                    Mit einem Klick auf die Einheit das Winkels kann zwischen RAD und DEG umgestellt werden"
					}
					<br />
				</div>
				<div className="form-row">
					<label>{"Momentanwert u(t)"}</label>
					<input
						disabled={!controller.ready}
						style={{ borderColor: "var(--Spannung)" }}
						type="text"
						aria-label="Momentanwert u(t)"
						id="ut-Sinus"
					/>
					<label>{"V [Volt]"}</label>
				</div>
				<div className="form-row">
					<label>
						{"Peakspannung u"}
						<sub>{"p"}</sub>
						{" / û"}
					</label>
					<input
						disabled={!controller.ready}
						style={{ borderColor: "var(--Spannung)" }}
						type="text"
						aria-label="Peakspannung up / û"
						id="up-Sinus"
					/>
					<label>{"V [Volt] "}</label>
				</div>
				<div className="form-row">
					<label>
						{"Peak-Peakspannung u"}
						<sub>{"pp"}</sub>
					</label>
					<input
						disabled={!controller.ready}
						style={{ borderColor: "var(--Spannung)" }}
						type="text"
						aria-label="Peak-Peakspannung upp"
						id="upp-Sinus"
					/>
					<label>{"V [Volt] "}</label>
				</div>
				<div className="form-row">
					<label>
						{"Effektivspannung U"}
						<sub>{"eff"}</sub>
					</label>
					<input
						disabled={!controller.ready}
						style={{ borderColor: "var(--Spannung)" }}
						type="text"
						aria-label="Effektivspannung Ueff"
						id="Ueff-Sinus"
					/>
					<label>{"V [Volt] "}</label>
				</div>
				<div className="form-row">
					<label>{"Frequenz f"}</label>
					<input
						disabled={!controller.ready}
						style={{ borderColor: "var(--Frequenz)" }}
						type="text"
						aria-label="Frequenz f"
						id="f-Sinus"
					/>
					<label>{"Hz [Hertz] "}</label>
				</div>
				<div className="form-row">
					<label>{"aktueller Zeitpunkt t"}</label>
					<input
						disabled={!controller.ready}
						style={{ borderColor: "var(--Zeit)" }}
						type="text"
						aria-label="aktueller Zeitpunkt t"
						id="t-Sinus"
					/>
					<label>{"s [sekunden] "}</label>
				</div>
				<div className="form-row">
					<label>{"Periodendauer T"}</label>
					<input
						disabled={!controller.ready}
						style={{ borderColor: "var(--Zeit)" }}
						type="text"
						aria-label="Periodendauer T"
						id="T-Sinus"
					/>
					<label>{"s [sekunden] "}</label>
				</div>
				<div className="form-row">
					<label>{"Phasenverschiebung φ (Sinusgenerator)"}</label>
					<input
						disabled={!controller.ready}
						style={{ borderColor: "var(--Winkel)" }}
						type="text"
						aria-label="Phasenverschiebung φ (Sinusgenerator)"
						id="phi-Sinus"
					/>
					<label>
						<button
							disabled={!controller.ready}
							type="button"
							id="Rad-Button"
							className="RAD-Button"
							data-action="toggleRAD"
							onClick={(event) => {
								controller.current?.invoke?.("toggleRAD", event.currentTarget);
							}}
						>
							{"2π"}
						</button>
					</label>
				</div>
				<div className="examples-section">
					<h4>{"Beispiele aus der Praxis:"}</h4>
					<div className="example">
						<span>{"Europäisches Stromnetz (Haushalt)"}</span>
						<button
							disabled={!controller.ready}
							type="button"
							id="control-4"
							data-action="fillExampleValues"
							onClick={(event) => {
								controller.current?.invoke?.(
									"fillExampleValues",
									event.currentTarget,
									"euroNet",
								);
							}}
						>
							{"Werte übernehmen"}
						</button>
					</div>
					<div className="example">
						<span>{"Typisches Funktionsgenerator-Signal"}</span>
						<button
							disabled={!controller.ready}
							type="button"
							id="control-5"
							data-action="fillExampleValues"
							onClick={(event) => {
								controller.current?.invoke?.(
									"fillExampleValues",
									event.currentTarget,
									"functionGen",
								);
							}}
						>
							{"Werte übernehmen"}
						</button>
					</div>
				</div>
				<input
					disabled={!controller.ready}
					type="button"
					defaultValue="Berechnen"
					className="Button_Berechnen"
					data-action="calculate_Sinus"
					onClick={(event) => {
						controller.current?.invoke?.(
							"calculate_Sinus",
							event.currentTarget,
						);
					}}
				/>
				<h3>{"Berechnete Ergebnisse"}</h3>
				<div id="result_Sinus" aria-live="polite"></div>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					<div
						style={{
							fontWeight: "bold",
							color: "#fff",
							padding: "6px 0",
							width: "100%",
							textAlign: "center",
							maxWidth: "1200px",
						}}
					>
						<h3>{"Grafische Sinuskurve:"}</h3>
					</div>
					<div
						style={{ display: "flex", justifyContent: "center", width: "100%" }}
					>
						<canvas
							style={{
								background: "#222",
								border: "1px solid #666",
								display: "block",
								margin: "10px auto",
							}}
							id="sinusCanvas"
							width="1200"
							height="400"
						></canvas>
						<button
							type="button"
							data-action="exportCanvasAsPNG"
							onClick={(event) =>
								controller.current?.invoke?.(
									"exportCanvasAsPNG",
									event.currentTarget,
									"sinusCanvas",
								)
							}
						>
							Diagramm als PNG speichern
						</button>
					</div>
				</div>
			</div>
			<div style={{ display: "none" }} id="Rechteck" className="input-numbers">
				<h2>{"Rechteck"}</h2>
				<div className="comment">
					{"\n                    Werte mit Massvorsatz eingeben z.B. U"}
					<sub>{"eff"}</sub>
					{" = 20mV → Eingabe: 20m (nicht 20mV)"}
					<br />
					<br />
				</div>
				<div className="form-row">
					<label>
						{"Peakspannung u"}
						<sub>{"p"}</sub>
						{" / û"}
					</label>
					<input
						disabled={!controller.ready}
						style={{ borderColor: "var(--Spannung)" }}
						type="text"
						aria-label="Peakspannung up / û"
						id="up-Rechteck"
					/>
					<label>{"V [Volt]"}</label>
				</div>
				<div className="form-row">
					<label>
						{"Peak-Peakspannung u"}
						<sub>{"pp"}</sub>
					</label>
					<input
						disabled={!controller.ready}
						style={{ borderColor: "var(--Spannung)" }}
						type="text"
						aria-label="Peak-Peakspannung upp"
						id="upp-Rechteck"
					/>
					<label>{"V [Volt] "}</label>
				</div>
				<div className="form-row">
					<label>
						{"Effektivspannung U"}
						<sub>{"eff"}</sub>
					</label>
					<input
						disabled={!controller.ready}
						style={{ borderColor: "var(--Spannung)" }}
						type="text"
						aria-label="Effektivspannung Ueff"
						id="Ueff-Rechteck"
					/>
					<label>{"V [Volt] "}</label>
				</div>
				<input
					disabled={!controller.ready}
					type="button"
					defaultValue="Berechnen"
					className="Button_Berechnen"
					data-action="calculate_Rechteck"
					onClick={(event) => {
						controller.current?.invoke?.(
							"calculate_Rechteck",
							event.currentTarget,
						);
					}}
				/>
				<h3>{"Berechnete Ergebnisse"}</h3>
				<div id="result_Rechteck" aria-live="polite"></div>
			</div>
			<div style={{ display: "none" }} id="Dreieck" className="input-numbers">
				<h2>{"Dreieck / Sägezahn"}</h2>
				<div className="comment">
					{"\n                    Werte mit Massvorsatz eingeben z.B. U"}
					<sub>{"eff"}</sub>
					{" = 20mV → Eingabe: 20m (nicht 20mV)"}
					<br />
					<br />
				</div>
				<div className="form-row">
					<label>
						{"Peakspannung u"}
						<sub>{"p"}</sub>
						{" / û"}
					</label>
					<input
						disabled={!controller.ready}
						style={{ borderColor: "var(--Spannung)" }}
						type="text"
						aria-label="Peakspannung up / û"
						id="up-Dreieck"
					/>
					<label>{"V [Volt] "}</label>
				</div>
				<div className="form-row">
					<label>
						{"Peak-Peakspannung u"}
						<sub>{"pp"}</sub>
					</label>
					<input
						disabled={!controller.ready}
						style={{ borderColor: "var(--Spannung)" }}
						type="text"
						aria-label="Peak-Peakspannung upp"
						id="upp-Dreieck"
					/>
					<label>{"V [Volt] "}</label>
				</div>
				<div className="form-row">
					<label>
						{"Effektivspannung U"}
						<sub>{"eff"}</sub>
					</label>
					<input
						disabled={!controller.ready}
						style={{ borderColor: "var(--Spannung)" }}
						type="text"
						aria-label="Effektivspannung Ueff"
						id="Ueff-Dreieck"
					/>
					<label>{"V [Volt] "}</label>
				</div>
				<input
					disabled={!controller.ready}
					type="button"
					defaultValue="Berechnen"
					className="Button_Berechnen"
					data-action="calculate_Dreieck"
					onClick={(event) => {
						controller.current?.invoke?.(
							"calculate_Dreieck",
							event.currentTarget,
						);
					}}
				/>
				<h3>{"Berechnete Ergebnisse"}</h3>
				<div id="result_Dreieck" aria-live="polite"></div>
			</div>
			<div style={{ display: "none" }} id="PWM" className="input-numbers">
				<h2>{"PWM"}</h2>
				<div className="comment">
					{"\n                    Werte mit Massvorsatz eingeben z.B. U"}
					<sub>{"eff"}</sub>
					{" = 20mV → Eingabe: 20m (nicht 20mV)"}
					<br />
					{
						"\n                    Mit einem Klick auf die Einheit das Duty-Cycles kann zwischen % und ganzzahlig umgestellt werden"
					}
					<br />
				</div>
				<div className="form-row">
					<label>
						{"Peakspannung u"}
						<sub>{"p"}</sub>
						{" / û"}
					</label>
					<input
						disabled={!controller.ready}
						style={{ borderColor: "var(--Spannung)" }}
						type="text"
						aria-label="Peakspannung up / û"
						id="up-PWM"
					/>
					<label>{"V [Volt]"}</label>
				</div>
				<div className="form-row">
					<label>
						{"Effektivspannung U"}
						<sub>{"eff"}</sub>
					</label>
					<input
						disabled={!controller.ready}
						style={{ borderColor: "var(--Spannung)" }}
						type="text"
						aria-label="Effektivspannung Ueff"
						id="Ueff-PWM"
					/>
					<label>{"V [Volt] "}</label>
				</div>
				<div className="form-row">
					<label>{"Frequenz f"}</label>
					<input
						disabled={!controller.ready}
						style={{ borderColor: "var(--Frequenz)" }}
						type="text"
						aria-label="Frequenz f"
						id="f-PWM"
					/>
					<label>{"Hz [Hertz] "}</label>
				</div>
				<div className="form-row">
					<label>
						{"Impulsdauer t"}
						<sub>{"in"}</sub>
					</label>
					<input
						disabled={!controller.ready}
						style={{ borderColor: "var(--Zeit)" }}
						type="text"
						aria-label="Impulsdauer tin"
						id="tin-PWM"
					/>
					<label>{"s [sekunden] "}</label>
				</div>
				<div className="form-row">
					<label>{"Periodendauer T"}</label>
					<input
						disabled={!controller.ready}
						style={{ borderColor: "var(--Zeit)" }}
						type="text"
						aria-label="Periodendauer T"
						id="T-PWM"
					/>
					<label>{"s [sekunden] "}</label>
				</div>
				<div className="form-row">
					<label>{"Duty-Cycle g"}</label>
					<input
						disabled={!controller.ready}
						style={{ borderColor: "gray" }}
						type="text"
						aria-label="Duty-Cycle g"
						id="g-PWM"
					/>
					<label>
						<button
							disabled={!controller.ready}
							type="button"
							id="Duty-Button"
							className="RAD-Button"
							data-action="toggleDuty"
							onClick={(event) => {
								controller.current?.invoke?.("toggleDuty", event.currentTarget);
							}}
						>
							{"%"}
						</button>
					</label>
				</div>
				<input
					disabled={!controller.ready}
					type="button"
					defaultValue="Berechnen"
					className="Button_Berechnen"
					data-action="calculate_PWM"
					onClick={(event) => {
						controller.current?.invoke?.("calculate_PWM", event.currentTarget);
					}}
				/>
				<h3>{"Berechnete Ergebnisse"}</h3>
				<div id="result_PWM" aria-live="polite"></div>
			</div>
			<br />
		</div>
	);
}
