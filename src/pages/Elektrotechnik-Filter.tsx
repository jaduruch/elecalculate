import { useCalculator } from "../lib/use-calculator";
import { createController } from "../calculations/Elektrotechnik-Filter.js";
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
						"@layer source { @scope (.page-body) {\n\n        .filter-button {\n            position: relative;\n            width: 150px; /* Adjust as needed */\n            height: 100px; /* Adjust as needed */\n            border: 2px solid transparent; /* Initially transparent */\n            padding: 0;\n            margin: 10px;\n            background-color: transparent;\n            cursor: pointer;\n        }\n        \n        .filter-button img {\n            width: 100%;\n            height: 100%;\n            object-fit: cover;\n        }\n \n        .filter-button:hover {\n            border-color: gray; /* Gray border for hovered button */\n        }\n        \n        .filter-button.selected {\n            border-color: white; /* White border for selected button */\n        }     \n        \n        .filter-button span {\n            position: absolute;\n            bottom: 0;\n            left: 0;\n            width: 100%;\n            text-align: center;\n            background: rgba(0, 0, 0, 0.5);\n            color: white;\n            font-size: 14px;\n            padding: 2px 0;\n        }\n        \n        input {\n            border: 2px solid;\n            border-radius: 3px;\n        }\n\n        input:focus {\n            /*border: 3px solid;*/\n            outline: none; /* Entfernt den Standard-Umrandungsring */\n        }\n\n        /* Stil fuer das Formular und Layout */\n        .input-numbers {\n            display: flex;\n            flex-direction: column;\n            align-items: flex-start;\n            margin-bottom: 20px;\n            max-width: 800px; /* Setzt eine maximale Breite */\n            margin: 0 auto; /* Zentriert das Formular */\n            /*margin-left: 10px;*/\n        }\n\n        .comment{\n            font-size: smaller;\n            font-style: italic;\n            color:rgb(179, 179, 179);\n            margin-left: 10px;\n        }\n\n        .form-row {\n            display: flex;\n            align-items: center;\n            margin-bottom: 10px;\n            width: 100%;\n            margin-left: 10px;\n            \n        }\n\n        .form-row label {\n            flex: 3;\n            text-align: left;\n            margin-right: 10px;\n\n        }\n\n        h3 {\n            margin-top: 20px;\n        }\n\n        .results{\n            line-height: 2; /* Multiplikator fuer die Schriftgroesse */\n        }\n\n        .fraction\n        {\n            display: inline-block; \n            vertical-align: middle; \n            text-align: center;\n            margin-top: 1px;\n            margin-bottom: 1px;\n            line-height: 1.5; /* Multiplikator fuer die Schriftgroesse */\n        }\n\n        .fraction-numerator{\n            border-bottom: 1px solid;\n            padding-bottom: 0.2px; /* Sorgt fuer einen Abstand innerhalb des Elements */\n            display: inline-block; /* Macht die Anpassungen besser sichtbar */\n        }\n\n        .fraction-denominator {\n            border-top: 1px solid;\n        }\n\n        img{\n            width: 80%;\n            max-width: 600px;\n        }\n    \n} }"
					}
				</style>
				<div>
					<br />
					<h1>{"Filter"}</h1>
				</div>
				<div>
					<button
						disabled={!controller.ready}
						type="button"
						id="control-0"
						className="filter-button"
						data-action="toggleSelection"
						data-target="HP_RC"
						onClick={(event) => {
							controller.current?.invoke?.(
								"toggleSelection",
								event.currentTarget,
								event.currentTarget,
								"HP_RC",
							);
						}}
					>
						<img src="/Pictures/HP_RC_Schematic.png" alt="Hochpass RC" />
						<span>{"Hochpass RC"}</span>
					</button>
					<button
						disabled={!controller.ready}
						type="button"
						id="control-1"
						className="filter-button"
						data-action="toggleSelection"
						data-target="HP_RL"
						onClick={(event) => {
							controller.current?.invoke?.(
								"toggleSelection",
								event.currentTarget,
								event.currentTarget,
								"HP_RL",
							);
						}}
					>
						<img src="/Pictures/HP_RL_Schematic.png" alt="Hochpass RL" />
						<span>{"Hochpass RL"}</span>
					</button>
					<button
						disabled={!controller.ready}
						type="button"
						id="control-2"
						className="filter-button"
						data-action="toggleSelection"
						data-target="TP_RC"
						onClick={(event) => {
							controller.current?.invoke?.(
								"toggleSelection",
								event.currentTarget,
								event.currentTarget,
								"TP_RC",
							);
						}}
					>
						<img src="/Pictures/TP_RC_Schematic.png" alt="Tiefpass RC" />
						<span>{"Tiefpass RC"}</span>
					</button>
					<button
						disabled={!controller.ready}
						type="button"
						id="control-3"
						className="filter-button"
						data-action="toggleSelection"
						data-target="TP_RL"
						onClick={(event) => {
							controller.current?.invoke?.(
								"toggleSelection",
								event.currentTarget,
								event.currentTarget,
								"TP_RL",
							);
						}}
					>
						<img src="/Pictures/TP_RL_Schematic.png" alt="Tiefpass RL" />
						<span>{"Tiefpass RL"}</span>
					</button>
				</div>
				<div style={{ display: "none" }} id="HP_RC" className="input-numbers">
					<h2>{"Hochpass RC"}</h2>
					<div className="comment">
						{
							"\n                    Werte mit Massvorsatz eingeben z.B. C = 100nF → Eingabe: 100n (nicht 100nF)"
						}
						<br />
						<br />
					</div>
					<div className="form-row">
						<label htmlFor="Winkel-HP_RC">{"Winkel φ"}</label>
						<input
							disabled={!controller.ready}
							style={{ borderColor: "var(--Winkel)" }}
							type="text"
							aria-label="Winkel φ"
							id="Winkel-HP_RC"
							aria-describedby="Winkel-HP_RC-unit"
						/>
						<label id="Winkel-HP_RC-unit">{"° [Grad]"}</label>
					</div>
					<div className="form-row">
						<label htmlFor="R-HP_RC">{"Widerstand R"}</label>
						<input
							disabled={!controller.ready}
							style={{ borderColor: "var(--Widerstand)" }}
							type="text"
							aria-label="Widerstand R"
							id="R-HP_RC"
							aria-describedby="R-HP_RC-unit"
						/>
						<label id="R-HP_RC-unit">{"Ω [Ohm]"}</label>
					</div>
					<div className="form-row">
						<label htmlFor="XC-HP_RC">
							{"Bildwiderstand  X"}
							<sub>{"C"}</sub>
						</label>
						<input
							disabled={!controller.ready}
							style={{ borderColor: "var(--Widerstand)" }}
							type="text"
							aria-label="Bildwiderstand  XC"
							id="XC-HP_RC"
							aria-describedby="XC-HP_RC-unit"
						/>
						<label id="XC-HP_RC-unit">{"Ω [Ohm ∠ -90°]"}</label>
					</div>
					<div className="form-row">
						<label htmlFor="a-HP_RC">{"Dämpfungssmass a"}</label>
						<input
							disabled={!controller.ready}
							style={{ borderColor: "var(--Daempfungsmass)" }}
							type="text"
							aria-label="Dämpfungssmass a"
							id="a-HP_RC"
							aria-describedby="a-HP_RC-unit"
						/>
						<label id="a-HP_RC-unit">{"1 [dB]"}</label>
					</div>
					<div className="form-row">
						<label htmlFor="C-HP_RC">{"Kapazität C"}</label>
						<input
							disabled={!controller.ready}
							style={{ borderColor: "var(--Kapazitaet)" }}
							type="text"
							aria-label="Kapazität C"
							id="C-HP_RC"
							aria-describedby="C-HP_RC-unit"
						/>
						<label id="C-HP_RC-unit">{"F [Farad]"}</label>
					</div>
					<div className="form-row">
						<label htmlFor="Uin-HP_RC">
							{"Spannung U"}
							<sub>{"in"}</sub>
						</label>
						<input
							disabled={!controller.ready}
							style={{ borderColor: "var(--Spannung)" }}
							type="text"
							aria-label="Spannung Uin"
							id="Uin-HP_RC"
							aria-describedby="Uin-HP_RC-unit"
						/>
						<label id="Uin-HP_RC-unit">{"V [Volt]"}</label>
					</div>
					<div className="form-row">
						<label htmlFor="Uc-HP_RC">
							{"Spannung U"}
							<sub>{"C"}</sub>
						</label>
						<input
							disabled={!controller.ready}
							style={{ borderColor: "var(--Spannung)" }}
							type="text"
							aria-label="Spannung UC"
							id="Uc-HP_RC"
							aria-describedby="Uc-HP_RC-unit"
						/>
						<label id="Uc-HP_RC-unit">{"V [Volt]"}</label>
					</div>
					<div className="form-row">
						<label htmlFor="Uout-HP_RC">
							{"Spannung U"}
							<sub>{"out"}</sub>
						</label>
						<input
							disabled={!controller.ready}
							style={{ borderColor: "var(--Spannung)" }}
							type="text"
							aria-label="Spannung Uout"
							id="Uout-HP_RC"
							aria-describedby="Uout-HP_RC-unit"
						/>
						<label id="Uout-HP_RC-unit">{"V [Volt] "}</label>
					</div>
					<div className="form-row">
						<label htmlFor="fg-HP_RC">
							{"Grenzfrequenz f"}
							<sub>{"g"}</sub>
						</label>
						<input
							disabled={!controller.ready}
							style={{ borderColor: "var(--Frequenz)" }}
							type="text"
							aria-label="Grenzfrequenz fg"
							id="fg-HP_RC"
							aria-describedby="fg-HP_RC-unit"
						/>
						<label id="fg-HP_RC-unit">{"Hz [Hertz] "}</label>
					</div>
					<div className="form-row">
						<label htmlFor="f-HP_RC">{"Frequenz f"}</label>
						<input
							disabled={!controller.ready}
							style={{ borderColor: "var(--Frequenz)" }}
							type="text"
							aria-label="Frequenz f"
							id="f-HP_RC"
							aria-describedby="f-HP_RC-unit"
						/>
						<label id="f-HP_RC-unit">{"Hz [Hertz] "}</label>
					</div>
					<input
						disabled={!controller.ready}
						type="button"
						defaultValue="Berechnen"
						className="Button_Berechnen"
						data-action="calculate_HP_RC"
						onClick={(event) => {
							controller.current?.invoke?.(
								"calculate_HP_RC",
								event.currentTarget,
							);
						}}
					/>
					<h3>{"Berechnete Ergebnisse"}</h3>
					<div id="result_HP_RC" aria-live="polite"></div>
				</div>
				<div style={{ display: "none" }} id="HP_RL" className="input-numbers">
					<h2>{"Hochpass RL"}</h2>
					<div className="comment">
						{
							"\n                    Werte mit Massvorsatz eingeben z.B. C = 100nF → Eingabe: 100n (nicht 100nF)"
						}
						<br />
						<br />
					</div>
					<div className="form-row">
						<label htmlFor="Winkel-HP_RL">{"Winkel φ"}</label>
						<input
							disabled={!controller.ready}
							style={{ borderColor: "var(--Winkel)" }}
							type="text"
							aria-label="Winkel φ"
							id="Winkel-HP_RL"
							aria-describedby="Winkel-HP_RL-unit"
						/>
						<label id="Winkel-HP_RL-unit">{"° [Grad]"}</label>
					</div>
					<div className="form-row">
						<label htmlFor="R-HP_RL">{"Widerstand R"}</label>
						<input
							disabled={!controller.ready}
							style={{ borderColor: "var(--Widerstand)" }}
							type="text"
							aria-label="Widerstand R"
							id="R-HP_RL"
							aria-describedby="R-HP_RL-unit"
						/>
						<label id="R-HP_RL-unit">{"Ω [Ohm]"}</label>
					</div>
					<div className="form-row">
						<label htmlFor="XL-HP_RL">
							{"Bildwiderstand  X"}
							<sub>{"L"}</sub>
						</label>
						<input
							disabled={!controller.ready}
							style={{ borderColor: "var(--Widerstand)" }}
							type="text"
							aria-label="Bildwiderstand  XL"
							id="XL-HP_RL"
							aria-describedby="XL-HP_RL-unit"
						/>
						<label id="XL-HP_RL-unit">{"Ω [Ohm ∠ +90°]"}</label>
					</div>
					<div className="form-row">
						<label htmlFor="a-HP_RL">{"Dämpfungssmass a"}</label>
						<input
							disabled={!controller.ready}
							style={{ borderColor: "var(--Daempfungsmass)" }}
							type="text"
							aria-label="Dämpfungssmass a"
							id="a-HP_RL"
							aria-describedby="a-HP_RL-unit"
						/>
						<label id="a-HP_RL-unit">{"1 [dB]"}</label>
					</div>
					<div className="form-row">
						<label htmlFor="L-HP_RL">{"Induktivität L"}</label>
						<input
							disabled={!controller.ready}
							style={{ borderColor: "var(--Induktivitaet)" }}
							type="text"
							aria-label="Induktivität L"
							id="L-HP_RL"
							aria-describedby="L-HP_RL-unit"
						/>
						<label id="L-HP_RL-unit">{"H [Henry]"}</label>
					</div>
					<div className="form-row">
						<label htmlFor="Uin-HP_RL">
							{"Spannung U"}
							<sub>{"in"}</sub>
						</label>
						<input
							disabled={!controller.ready}
							style={{ borderColor: "var(--Spannung)" }}
							type="text"
							aria-label="Spannung Uin"
							id="Uin-HP_RL"
							aria-describedby="Uin-HP_RL-unit"
						/>
						<label id="Uin-HP_RL-unit">{"V [Volt]"}</label>
					</div>
					<div className="form-row">
						<label htmlFor="Uout-HP_RL">
							{"Spannung U"}
							<sub>{"out"}</sub>
						</label>
						<input
							disabled={!controller.ready}
							style={{ borderColor: "var(--Spannung)" }}
							type="text"
							aria-label="Spannung Uout"
							id="Uout-HP_RL"
							aria-describedby="Uout-HP_RL-unit"
						/>
						<label id="Uout-HP_RL-unit">{"V [Volt] "}</label>
					</div>
					<div className="form-row">
						<label htmlFor="fg-HP_RL">
							{"Grenzfrequenz f"}
							<sub>{"g"}</sub>
						</label>
						<input
							disabled={!controller.ready}
							style={{ borderColor: "var(--Frequenz)" }}
							type="text"
							aria-label="Grenzfrequenz fg"
							id="fg-HP_RL"
							aria-describedby="fg-HP_RL-unit"
						/>
						<label id="fg-HP_RL-unit">{"Hz [Hertz] "}</label>
					</div>
					<div className="form-row">
						<label htmlFor="f-HP_RL">{"Frequenz f"}</label>
						<input
							disabled={!controller.ready}
							style={{ borderColor: "var(--Frequenz)" }}
							type="text"
							aria-label="Frequenz f"
							id="f-HP_RL"
							aria-describedby="f-HP_RL-unit"
						/>
						<label id="f-HP_RL-unit">{"Hz [Hertz] "}</label>
					</div>
					<input
						disabled={!controller.ready}
						type="button"
						defaultValue="Berechnen"
						className="Button_Berechnen"
						data-action="calculate_HP_RL"
						onClick={(event) => {
							controller.current?.invoke?.(
								"calculate_HP_RL",
								event.currentTarget,
							);
						}}
					/>
					<h3>{"Berechnete Ergebnisse"}</h3>
					<div id="result_HP_RL" aria-live="polite"></div>
				</div>
				<div style={{ display: "none" }} id="TP_RC" className="input-numbers">
					<h2>{"Tiefpass RC"}</h2>
					<div className="comment">
						{
							"\n                    Werte mit Massvorsatz eingeben z.B. C = 100nF → Eingabe: 100n (nicht 100nF)"
						}
						<br />
						<br />
					</div>
					<div className="form-row">
						<label htmlFor="Winkel-TP_RC">{"Winkel φ"}</label>
						<input
							disabled={!controller.ready}
							style={{ borderColor: "var(--Winkel)" }}
							type="text"
							aria-label="Winkel φ"
							id="Winkel-TP_RC"
							aria-describedby="Winkel-TP_RC-unit"
						/>
						<label id="Winkel-TP_RC-unit">{"° [Grad]"}</label>
					</div>
					<div className="form-row">
						<label htmlFor="R-TP_RC">{"Widerstand R"}</label>
						<input
							disabled={!controller.ready}
							style={{ borderColor: "var(--Widerstand)" }}
							type="text"
							aria-label="Widerstand R"
							id="R-TP_RC"
							aria-describedby="R-TP_RC-unit"
						/>
						<label id="R-TP_RC-unit">{"Ω [Ohm]"}</label>
					</div>
					<div className="form-row">
						<label htmlFor="XC-TP_RC">
							{"Bildwiderstand  X"}
							<sub>{"C"}</sub>
						</label>
						<input
							disabled={!controller.ready}
							style={{ borderColor: "var(--Widerstand)" }}
							type="text"
							aria-label="Bildwiderstand  XC"
							id="XC-TP_RC"
							aria-describedby="XC-TP_RC-unit"
						/>
						<label id="XC-TP_RC-unit">{"Ω [Ohm ∠ -90°]"}</label>
					</div>
					<div className="form-row">
						<label htmlFor="a-TP_RC">{"Dämpfungssmass a"}</label>
						<input
							disabled={!controller.ready}
							style={{ borderColor: "var(--Daempfungsmass)" }}
							type="text"
							aria-label="Dämpfungssmass a"
							id="a-TP_RC"
							aria-describedby="a-TP_RC-unit"
						/>
						<label id="a-TP_RC-unit">{"1 [dB]"}</label>
					</div>
					<div className="form-row">
						<label htmlFor="C-TP_RC">{"Kapazität C"}</label>
						<input
							disabled={!controller.ready}
							style={{ borderColor: "var(--Kapazitaet)" }}
							type="text"
							aria-label="Kapazität C"
							id="C-TP_RC"
							aria-describedby="C-TP_RC-unit"
						/>
						<label id="C-TP_RC-unit">{"F [Farad]"}</label>
					</div>
					<div className="form-row">
						<label htmlFor="Uin-TP_RC">
							{"Spannung U"}
							<sub>{"in"}</sub>
						</label>
						<input
							disabled={!controller.ready}
							style={{ borderColor: "var(--Spannung)" }}
							type="text"
							aria-label="Spannung Uin"
							id="Uin-TP_RC"
							aria-describedby="Uin-TP_RC-unit"
						/>
						<label id="Uin-TP_RC-unit">{"V [Volt]"}</label>
					</div>
					<div className="form-row">
						<label htmlFor="Uout-TP_RC">
							{"Spannung U"}
							<sub>{"out"}</sub>
						</label>
						<input
							disabled={!controller.ready}
							style={{ borderColor: "var(--Spannung)" }}
							type="text"
							aria-label="Spannung Uout"
							id="Uout-TP_RC"
							aria-describedby="Uout-TP_RC-unit"
						/>
						<label id="Uout-TP_RC-unit">{"V [Volt] "}</label>
					</div>
					<div className="form-row">
						<label htmlFor="fg-TP_RC">
							{"Grenzfrequenz f"}
							<sub>{"g"}</sub>
						</label>
						<input
							disabled={!controller.ready}
							style={{ borderColor: "var(--Frequenz)" }}
							type="text"
							aria-label="Grenzfrequenz fg"
							id="fg-TP_RC"
							aria-describedby="fg-TP_RC-unit"
						/>
						<label id="fg-TP_RC-unit">{"Hz [Hertz] "}</label>
					</div>
					<div className="form-row">
						<label htmlFor="f-TP_RC">{"Frequenz f"}</label>
						<input
							disabled={!controller.ready}
							style={{ borderColor: "var(--Frequenz)" }}
							type="text"
							aria-label="Frequenz f"
							id="f-TP_RC"
							aria-describedby="f-TP_RC-unit"
						/>
						<label id="f-TP_RC-unit">{"Hz [Hertz] "}</label>
					</div>
					<input
						disabled={!controller.ready}
						type="button"
						defaultValue="Berechnen"
						className="Button_Berechnen"
						data-action="calculate_TP_RC"
						onClick={(event) => {
							controller.current?.invoke?.(
								"calculate_TP_RC",
								event.currentTarget,
							);
						}}
					/>
					<h3>{"Berechnete Ergebnisse"}</h3>
					<div id="result_TP_RC" aria-live="polite"></div>
				</div>
				<div style={{ display: "none" }} id="TP_RL" className="input-numbers">
					<h2>{"Tiefpass RL"}</h2>
					<div className="comment">
						{
							"\n                    Werte mit Massvorsatz eingeben z.B. C = 100nF → Eingabe: 100n (nicht 100nF)"
						}
						<br />
						<br />
					</div>
					<div className="form-row">
						<label htmlFor="Winkel-TP_RL">{"Winkel φ"}</label>
						<input
							disabled={!controller.ready}
							style={{ borderColor: "var(--Winkel)" }}
							type="text"
							aria-label="Winkel φ"
							id="Winkel-TP_RL"
							aria-describedby="Winkel-TP_RL-unit"
						/>
						<label id="Winkel-TP_RL-unit">{"° [Grad]"}</label>
					</div>
					<div className="form-row">
						<label htmlFor="R-TP_RL">{"Widerstand R"}</label>
						<input
							disabled={!controller.ready}
							style={{ borderColor: "var(--Widerstand)" }}
							type="text"
							aria-label="Widerstand R"
							id="R-TP_RL"
							aria-describedby="R-TP_RL-unit"
						/>
						<label id="R-TP_RL-unit">{"Ω [Ohm]"}</label>
					</div>
					<div className="form-row">
						<label htmlFor="XL-TP_RL">
							{"Bildwiderstand  X"}
							<sub>{"L"}</sub>
						</label>
						<input
							disabled={!controller.ready}
							style={{ borderColor: "var(--Widerstand)" }}
							type="text"
							aria-label="Bildwiderstand  XL"
							id="XL-TP_RL"
							aria-describedby="XL-TP_RL-unit"
						/>
						<label id="XL-TP_RL-unit">{"Ω [Ohm ∠ +90°]"}</label>
					</div>
					<div className="form-row">
						<label htmlFor="a-TP_RL">{"Dämpfungssmass a"}</label>
						<input
							disabled={!controller.ready}
							style={{ borderColor: "var(--Daempfungsmass)" }}
							type="text"
							aria-label="Dämpfungssmass a"
							id="a-TP_RL"
							aria-describedby="a-TP_RL-unit"
						/>
						<label id="a-TP_RL-unit">{"1 [dB]"}</label>
					</div>
					<div className="form-row">
						<label htmlFor="L-TP_RL">{"Induktivität L"}</label>
						<input
							disabled={!controller.ready}
							style={{ borderColor: "var(--Induktivitaet)" }}
							type="text"
							aria-label="Induktivität L"
							id="L-TP_RL"
							aria-describedby="L-TP_RL-unit"
						/>
						<label id="L-TP_RL-unit">{"H [Henry]"}</label>
					</div>
					<div className="form-row">
						<label htmlFor="Uin-TP_RL">
							{"Spannung U"}
							<sub>{"in"}</sub>
						</label>
						<input
							disabled={!controller.ready}
							style={{ borderColor: "var(--Spannung)" }}
							type="text"
							aria-label="Spannung Uin"
							id="Uin-TP_RL"
							aria-describedby="Uin-TP_RL-unit"
						/>
						<label id="Uin-TP_RL-unit">{"V [Volt]"}</label>
					</div>
					<div className="form-row">
						<label htmlFor="Uout-TP_RL">
							{"Spannung U"}
							<sub>{"out"}</sub>
						</label>
						<input
							disabled={!controller.ready}
							style={{ borderColor: "var(--Spannung)" }}
							type="text"
							aria-label="Spannung Uout"
							id="Uout-TP_RL"
							aria-describedby="Uout-TP_RL-unit"
						/>
						<label id="Uout-TP_RL-unit">{"V [Volt] "}</label>
					</div>
					<div className="form-row">
						<label htmlFor="fg-TP_RL">
							{"Grenzfrequenz f"}
							<sub>{"g"}</sub>
						</label>
						<input
							disabled={!controller.ready}
							style={{ borderColor: "var(--Frequenz)" }}
							type="text"
							aria-label="Grenzfrequenz fg"
							id="fg-TP_RL"
							aria-describedby="fg-TP_RL-unit"
						/>
						<label id="fg-TP_RL-unit">{"Hz [Hertz] "}</label>
					</div>
					<div className="form-row">
						<label htmlFor="f-TP_RL">{"Frequenz f"}</label>
						<input
							disabled={!controller.ready}
							style={{ borderColor: "var(--Frequenz)" }}
							type="text"
							aria-label="Frequenz f"
							id="f-TP_RL"
							aria-describedby="f-TP_RL-unit"
						/>
						<label id="f-TP_RL-unit">{"Hz [Hertz] "}</label>
					</div>
					<input
						disabled={!controller.ready}
						type="button"
						defaultValue="Berechnen"
						className="Button_Berechnen"
						data-action="calculate_TP_RL"
						onClick={(event) => {
							controller.current?.invoke?.(
								"calculate_TP_RL",
								event.currentTarget,
							);
						}}
					/>
					<h3>{"Berechnete Ergebnisse"}</h3>
					<div id="result_TP_RL" aria-live="polite"></div>
				</div>
				<br />
			</div>
		</>
	);
}
