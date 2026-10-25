import { useCalculator } from "../lib/use-calculator";
import { createController } from "../calculations/Elektrotechnik-Schwingkreis.js";
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
						"@layer source { @scope (.page-body) {\n\n        .filter-button {\n            position: relative;\n            width: 200px; /* Adjust as needed */\n            height: 200px; /* Adjust as needed */\n            border: 2px solid transparent; /* Initially transparent */\n            padding: 0;\n            margin: 10px;\n            background-color: transparent;\n            cursor: pointer;\n        }\n        \n        .filter-button img {\n            width: 100%;\n            height: 100%;\n            object-fit: cover;\n        }\n\n        .filter-button:hover {\n            border-color: gray; /* Gray border for hovered button */\n        }\n        \n        .filter-button.selected {\n            border-color: white; /* White border for selected button */\n        }     \n        \n        .filter-button span {\n            position: absolute;\n            bottom: 0;\n            left: 0;\n            width: 100%;\n            text-align: center;\n            background: rgba(0, 0, 0, 0.5);\n            color: white;\n            font-size: 20px;\n            padding: 2px 0;\n        }\n\n        input {\n            border: 2px solid;\n            border-radius: 3px;\n        }\n\n        input:focus {\n            /*border: 3px solid;*/\n            outline: none; /* Entfernt den Standard-Umrandungsring */\n        }\n\n        /* Stil fuer das Formular und Layout */\n        .input-numbers {\n            display: flex;\n            flex-direction: column;\n            align-items: flex-start;\n            margin-bottom: 20px;\n            max-width: 600px; /* Setzt eine maximale Breite */\n            margin: 0 auto; /* Zentriert das Formular */\n            /*margin-left: 10px;*/\n        }\n\n        .comment{\n            font-size: smaller;\n            font-style: italic;\n            color:rgb(179, 179, 179);\n            margin-left: 10px;\n        }\n\n        .form-row {\n            display: flex;\n            align-items: center;\n            margin-bottom: 10px;\n            width: 100%;\n            margin-left: 10px;\n            \n        }\n\n        .form-row label {\n            flex: 3;\n            text-align: left;\n            margin-right: 10px;\n\n        }\n\n        h3 {\n            margin-top: 20px;\n        }\n\n        .results{\n            line-height: 2; /* Multiplikator fuer die Schriftgroesse */\n        }\n\n        .fraction\n        {\n            display: inline-block; \n            vertical-align: middle; \n            text-align: center;\n            margin-top: 1px;\n            margin-bottom: 1px;\n            line-height: 1.5; /* Multiplikator fuer die Schriftgroesse */\n        }\n\n        .fraction-numerator{\n            border-bottom: 1px solid;\n            padding-bottom: 0.2px; /* Sorgt fuer einen Abstand innerhalb des Elements */\n            display: inline-block; /* Macht die Anpassungen besser sichtbar */\n        }\n\n        .fraction-denominator {\n            border-top: 1px solid;\n        }\n\n        img{\n            width: 80%;\n            max-width: 600px;\n        }\n\n    \n} }"
					}
				</style>
				<p className="comment">
					f ist die Signalfrequenz. Leer gelassen wird bei Resonanz gerechnet;
					abgeleitete Resonanzannahmen stehen im Lösungsweg.
				</p>
				<div>
					<h1>
						<br />
						{"Schwingkreis"}
					</h1>
				</div>
				<div>
					<button
						disabled={!controller.ready}
						type="button"
						id="control-0"
						className="filter-button"
						data-action="toggleSelection"
						data-target="serie"
						onClick={(event) => {
							controller.current?.invoke?.(
								"toggleSelection",
								event.currentTarget,
								event.currentTarget,
								"serie",
							);
						}}
					>
						<img src="/Pictures/Serie_SW.png" alt="Serie" />
						<span>{"Serie Schwingkreis"}</span>
					</button>
					<button
						disabled={!controller.ready}
						type="button"
						id="control-1"
						className="filter-button"
						data-action="toggleSelection"
						data-target="parallel"
						onClick={(event) => {
							controller.current?.invoke?.(
								"toggleSelection",
								event.currentTarget,
								event.currentTarget,
								"parallel",
							);
						}}
					>
						<img src="/Pictures/Parallel_SW.png" alt="Parallel" />
						<span>{"Parallel Schwingkreis"}</span>
					</button>
				</div>
				<div style={{ display: "none" }} id="serie" className="input-numbers">
					<h2>{"Serienschwingkreis"}</h2>
					<div className="comment">
						{
							"\n                    Werte mit Massvorsatz eingeben z.B. C = 100nF → Eingabe: 100n (nicht 100nF)"
						}
						<br />
						<br />
					</div>
					<div className="form-row">
						<label htmlFor="R-serie">{"Widerstand R"}</label>
						<input
							disabled={!controller.ready}
							style={{ borderColor: "var(--Widerstand)" }}
							type="text"
							aria-label="Widerstand R"
							id="R-serie"
							aria-describedby="R-serie-unit"
						/>
						<label id="R-serie-unit">{"Ω [Ohm]"}</label>
					</div>
					<div className="form-row">
						<label htmlFor="XL-serie">
							{"Bildwiderstand  X"}
							<sub>{"L"}</sub>
						</label>
						<input
							disabled={!controller.ready}
							style={{ borderColor: "var(--Widerstand)" }}
							type="text"
							aria-label="Bildwiderstand  XL"
							id="XL-serie"
							aria-describedby="XL-serie-unit"
						/>
						<label id="XL-serie-unit">{"Ω [Ohm ∠ +90°]"}</label>
					</div>
					<div className="form-row">
						<label htmlFor="XC-serie">
							{"Bildwiderstand  X"}
							<sub>{"C"}</sub>
						</label>
						<input
							disabled={!controller.ready}
							style={{ borderColor: "var(--Widerstand)" }}
							type="text"
							aria-label="Bildwiderstand  XC"
							id="XC-serie"
							aria-describedby="XC-serie-unit"
						/>
						<label id="XC-serie-unit">{"Ω [Ohm ∠ -90°]"}</label>
					</div>
					<div className="form-row">
						<label htmlFor="L-serie">{"Induktivität L"}</label>
						<input
							disabled={!controller.ready}
							style={{ borderColor: "var(--Induktivitaet)" }}
							type="text"
							aria-label="Induktivität L"
							id="L-serie"
							aria-describedby="L-serie-unit"
						/>
						<label id="L-serie-unit">{"H [Henry]"}</label>
					</div>
					<div className="form-row">
						<label htmlFor="Q-serie">{"(Kreis) Güte Q"}</label>
						<input
							disabled={!controller.ready}
							style={{ borderColor: "var(--Guete)" }}
							type="text"
							aria-label="(Kreis) Güte Q"
							id="Q-serie"
							aria-describedby="Q-serie-unit"
						/>
						<label id="Q-serie-unit">{"1"}</label>
					</div>
					<div className="form-row">
						<label htmlFor="C-serie">{"Kapazität C"}</label>
						<input
							disabled={!controller.ready}
							style={{ borderColor: "var(--Kapazitaet)" }}
							type="text"
							aria-label="Kapazität C"
							id="C-serie"
							aria-describedby="C-serie-unit"
						/>
						<label id="C-serie-unit">{"F [Farad]"}</label>
					</div>
					<div className="form-row">
						<label htmlFor="U-serie">{"Spannung U"}</label>
						<input
							disabled={!controller.ready}
							style={{ borderColor: "var(--Spannung)" }}
							type="text"
							aria-label="Spannung U"
							id="U-serie"
							aria-describedby="U-serie-unit"
						/>
						<label id="U-serie-unit">{"V [Volt]"}</label>
					</div>
					<div className="form-row">
						<label htmlFor="UR-serie">
							{"Spannung U"}
							<sub>{"R"}</sub>
						</label>
						<input
							disabled={!controller.ready}
							style={{ borderColor: "var(--Spannung)" }}
							type="text"
							aria-label="Spannung UR"
							id="UR-serie"
							aria-describedby="UR-serie-unit"
						/>
						<label id="UR-serie-unit">{"V [Volt] "}</label>
					</div>
					<div className="form-row">
						<label htmlFor="UL-serie">
							{"Spannung U"}
							<sub>{"L"}</sub>
						</label>
						<input
							disabled={!controller.ready}
							style={{ borderColor: "var(--Spannung)" }}
							type="text"
							aria-label="Spannung UL"
							id="UL-serie"
							aria-describedby="UL-serie-unit"
						/>
						<label id="UL-serie-unit">{"V [Volt] "}</label>
					</div>
					<div className="form-row">
						<label htmlFor="UC-serie">
							{"Spannung U"}
							<sub>{"C"}</sub>
						</label>
						<input
							disabled={!controller.ready}
							style={{ borderColor: "var(--Spannung)" }}
							type="text"
							aria-label="Spannung UC"
							id="UC-serie"
							aria-describedby="UC-serie-unit"
						/>
						<label id="UC-serie-unit">{"V [Volt] "}</label>
					</div>
					<div className="form-row">
						<label htmlFor="f-serie">{"Frequenz f"}</label>
						<input
							disabled={!controller.ready}
							style={{ borderColor: "var(--Frequenz)" }}
							type="text"
							aria-label="Frequenz f"
							id="f-serie"
							aria-describedby="f-serie-unit"
						/>
						<label id="f-serie-unit">{"Hz [Hertz] "}</label>
					</div>
					<div className="form-row">
						<label htmlFor="b-serie">{"Bandbreite b"}</label>
						<input
							disabled={!controller.ready}
							style={{ borderColor: "var(--Frequenz)" }}
							type="text"
							aria-label="Bandbreite b"
							id="b-serie"
							aria-describedby="b-serie-unit"
						/>
						<label id="b-serie-unit">{"Hz [Hertz] "}</label>
					</div>
					<input
						disabled={!controller.ready}
						type="button"
						defaultValue="Berechnen"
						className="Button_Berechnen"
						data-action="calculateSerie"
						onClick={(event) => {
							controller.current?.invoke?.(
								"calculateSerie",
								event.currentTarget,
							);
						}}
					/>
					<h3>{"Berechnete Ergebnisse"}</h3>
					<div id="result" aria-live="polite"></div>
				</div>
				<div
					style={{ display: "none" }}
					id="parallel"
					className="input-numbers"
				>
					<h2>{"Parallelschwingkreis"}</h2>
					<div className="comment">
						{
							"\n                    Werte mit Massvorsatz eingeben z.B. C = 100nF → Eingabe: 100n (nicht 100nF)"
						}
						<br />
						<br />
					</div>
					<div className="form-row">
						<label htmlFor="I-parallel">
							{"Strom I"}
							<sub>{"ges"}</sub>
						</label>
						<input
							disabled={!controller.ready}
							style={{ borderColor: "var(--Strom)" }}
							type="text"
							aria-label="Strom Iges"
							id="I-parallel"
							aria-describedby="I-parallel-unit"
						/>
						<label id="I-parallel-unit">{"A [Ampere]"}</label>
					</div>
					<div className="form-row">
						<label htmlFor="IR-parallel">
							{"Strom I"}
							<sub>{"R"}</sub>
						</label>
						<input
							disabled={!controller.ready}
							style={{ borderColor: "var(--Strom)" }}
							type="text"
							aria-label="Strom IR"
							id="IR-parallel"
							aria-describedby="IR-parallel-unit"
						/>
						<label id="IR-parallel-unit">{"A [Ampere]"}</label>
					</div>
					<div className="form-row">
						<label htmlFor="IL-parallel">
							{"Strom I"}
							<sub>{"L"}</sub>
						</label>
						<input
							disabled={!controller.ready}
							style={{ borderColor: "var(--Strom)" }}
							type="text"
							aria-label="Strom IL"
							id="IL-parallel"
							aria-describedby="IL-parallel-unit"
						/>
						<label id="IL-parallel-unit">{"A [Ampere]"}</label>
					</div>
					<div className="form-row">
						<label htmlFor="IC-parallel">
							{"Strom I"}
							<sub>{"C"}</sub>
						</label>
						<input
							disabled={!controller.ready}
							style={{ borderColor: "var(--Strom)" }}
							type="text"
							aria-label="Strom IC"
							id="IC-parallel"
							aria-describedby="IC-parallel-unit"
						/>
						<label id="IC-parallel-unit">{"A [Ampere]"}</label>
					</div>
					<div className="form-row">
						<label htmlFor="R-parallel">{"Widerstand R"}</label>
						<input
							disabled={!controller.ready}
							style={{ borderColor: "var(--Widerstand)" }}
							type="text"
							aria-label="Widerstand R"
							id="R-parallel"
							aria-describedby="R-parallel-unit"
						/>
						<label id="R-parallel-unit">{"Ω [Ohm]"}</label>
					</div>
					<div className="form-row">
						<label htmlFor="XL-parallel">
							{"Bildwiderstand  X"}
							<sub>{"L"}</sub>
						</label>
						<input
							disabled={!controller.ready}
							style={{ borderColor: "var(--Widerstand)" }}
							type="text"
							aria-label="Bildwiderstand  XL"
							id="XL-parallel"
							aria-describedby="XL-parallel-unit"
						/>
						<label id="XL-parallel-unit">{"Ω [Ohm ∠ -90°]"}</label>
					</div>
					<div className="form-row">
						<label htmlFor="XC-parallel">
							{"Bildwiderstand  X"}
							<sub>{"C"}</sub>
						</label>
						<input
							disabled={!controller.ready}
							style={{ borderColor: "var(--Widerstand)" }}
							type="text"
							aria-label="Bildwiderstand  XC"
							id="XC-parallel"
							aria-describedby="XC-parallel-unit"
						/>
						<label id="XC-parallel-unit">{"Ω [Ohm ∠ +90°]"}</label>
					</div>
					<div className="form-row">
						<label htmlFor="L-parallel">{"Induktivität L"}</label>
						<input
							disabled={!controller.ready}
							style={{ borderColor: "var(--Induktivitaet)" }}
							type="text"
							aria-label="Induktivität L"
							id="L-parallel"
							aria-describedby="L-parallel-unit"
						/>
						<label id="L-parallel-unit">{"H [Henry]"}</label>
					</div>
					<div className="form-row">
						<label htmlFor="Q-parallel">{"(Kreis) Güte Q"}</label>
						<input
							disabled={!controller.ready}
							style={{ borderColor: "var(--Guete)" }}
							type="text"
							aria-label="(Kreis) Güte Q"
							id="Q-parallel"
							aria-describedby="Q-parallel-unit"
						/>
						<label id="Q-parallel-unit">{"1"}</label>
					</div>
					<div className="form-row">
						<label htmlFor="C-parallel">{"Kapazität C"}</label>
						<input
							disabled={!controller.ready}
							style={{ borderColor: "var(--Kapazitaet)" }}
							type="text"
							aria-label="Kapazität C"
							id="C-parallel"
							aria-describedby="C-parallel-unit"
						/>
						<label id="C-parallel-unit">{"F [Farad]"}</label>
					</div>
					<div className="form-row">
						<label htmlFor="f-parallel">{"Frequenz f"}</label>
						<input
							disabled={!controller.ready}
							style={{ borderColor: "var(--Frequenz)" }}
							type="text"
							aria-label="Frequenz f"
							id="f-parallel"
							aria-describedby="f-parallel-unit"
						/>
						<label id="f-parallel-unit">{"Hz [Hertz] "}</label>
					</div>
					<div className="form-row">
						<label htmlFor="b-parallel">{"Bandbreite b"}</label>
						<input
							disabled={!controller.ready}
							style={{ borderColor: "var(--Frequenz)" }}
							type="text"
							aria-label="Bandbreite b"
							id="b-parallel"
							aria-describedby="b-parallel-unit"
						/>
						<label id="b-parallel-unit">{"Hz [Hertz] "}</label>
					</div>
					<input
						disabled={!controller.ready}
						type="button"
						defaultValue="Berechnen"
						className="Button_Berechnen"
						data-action="calculateParallel"
						onClick={(event) => {
							controller.current?.invoke?.(
								"calculateParallel",
								event.currentTarget,
							);
						}}
					/>
					<h3>{"Berechnete Ergebnisse"}</h3>
					<div id="result_parallel" aria-live="polite"></div>
				</div>
				<br />
			</div>
		</>
	);
}
