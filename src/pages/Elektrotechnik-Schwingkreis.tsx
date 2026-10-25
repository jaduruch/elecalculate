import { useCalculator } from "../lib/use-calculator";
import { createController } from "../calculations/Elektrotechnik-Schwingkreis.js";
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
					<label>{"Widerstand R"}</label>
					<input
						disabled={!controller.ready}
						style={{ borderColor: "var(--Widerstand)" }}
						type="text"
						aria-label="Widerstand R"
						id="R-serie"
					/>
					<label>{"Ω [Ohm]"}</label>
				</div>
				<div className="form-row">
					<label>
						{"Bildwiderstand  X"}
						<sub>{"L"}</sub>
					</label>
					<input
						disabled={!controller.ready}
						style={{ borderColor: "var(--Widerstand)" }}
						type="text"
						aria-label="Bildwiderstand  XL"
						id="XL-serie"
					/>
					<label>{"Ω [Ohm ∠ +90°]"}</label>
				</div>
				<div className="form-row">
					<label>
						{"Bildwiderstand  X"}
						<sub>{"C"}</sub>
					</label>
					<input
						disabled={!controller.ready}
						style={{ borderColor: "var(--Widerstand)" }}
						type="text"
						aria-label="Bildwiderstand  XC"
						id="XC-serie"
					/>
					<label>{"Ω [Ohm ∠ -90°]"}</label>
				</div>
				<div className="form-row">
					<label>{"Induktivität L"}</label>
					<input
						disabled={!controller.ready}
						style={{ borderColor: "var(--Induktivitaet)" }}
						type="text"
						aria-label="Induktivität L"
						id="L-serie"
					/>
					<label>{"H [Henry]"}</label>
				</div>
				<div className="form-row">
					<label>{"(Kreis) Güte Q"}</label>
					<input
						disabled={!controller.ready}
						style={{ borderColor: "var(--Guete)" }}
						type="text"
						aria-label="(Kreis) Güte Q"
						id="Q-serie"
					/>
					<label>{"1"}</label>
				</div>
				<div className="form-row">
					<label>{"Kapazität C"}</label>
					<input
						disabled={!controller.ready}
						style={{ borderColor: "var(--Kapazitaet)" }}
						type="text"
						aria-label="Kapazität C"
						id="C-serie"
					/>
					<label>{"F [Farad]"}</label>
				</div>
				<div className="form-row">
					<label>{"Spannung U"}</label>
					<input
						disabled={!controller.ready}
						style={{ borderColor: "var(--Spannung)" }}
						type="text"
						aria-label="Spannung U"
						id="U-serie"
					/>
					<label>{"V [Volt]"}</label>
				</div>
				<div className="form-row">
					<label>
						{"Spannung U"}
						<sub>{"R"}</sub>
					</label>
					<input
						disabled={!controller.ready}
						style={{ borderColor: "var(--Spannung)" }}
						type="text"
						aria-label="Spannung UR"
						id="UR-serie"
					/>
					<label>{"V [Volt] "}</label>
				</div>
				<div className="form-row">
					<label>
						{"Spannung U"}
						<sub>{"L"}</sub>
					</label>
					<input
						disabled={!controller.ready}
						style={{ borderColor: "var(--Spannung)" }}
						type="text"
						aria-label="Spannung UL"
						id="UL-serie"
					/>
					<label>{"V [Volt] "}</label>
				</div>
				<div className="form-row">
					<label>
						{"Spannung U"}
						<sub>{"C"}</sub>
					</label>
					<input
						disabled={!controller.ready}
						style={{ borderColor: "var(--Spannung)" }}
						type="text"
						aria-label="Spannung UC"
						id="UC-serie"
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
						id="f-serie"
					/>
					<label>{"Hz [Hertz] "}</label>
				</div>
				<div className="form-row">
					<label>{"Bandbreite b"}</label>
					<input
						disabled={!controller.ready}
						style={{ borderColor: "var(--Frequenz)" }}
						type="text"
						aria-label="Bandbreite b"
						id="b-serie"
					/>
					<label>{"Hz [Hertz] "}</label>
				</div>
				<input
					disabled={!controller.ready}
					type="button"
					defaultValue="Berechnen"
					className="Button_Berechnen"
					data-action="calculateSerie"
					onClick={(event) => {
						controller.current?.invoke?.("calculateSerie", event.currentTarget);
					}}
				/>
				<h3>{"Berechnete Ergebnisse"}</h3>
				<div id="result" aria-live="polite"></div>
			</div>
			<div style={{ display: "none" }} id="parallel" className="input-numbers">
				<h2>{"Parallelschwingkreis"}</h2>
				<div className="comment">
					{
						"\n                    Werte mit Massvorsatz eingeben z.B. C = 100nF → Eingabe: 100n (nicht 100nF)"
					}
					<br />
					<br />
				</div>
				<div className="form-row">
					<label>
						{"Strom I"}
						<sub>{"ges"}</sub>
					</label>
					<input
						disabled={!controller.ready}
						style={{ borderColor: "var(--Strom)" }}
						type="text"
						aria-label="Strom Iges"
						id="I-parallel"
					/>
					<label>{"A [Ampere]"}</label>
				</div>
				<div className="form-row">
					<label>
						{"Strom I"}
						<sub>{"R"}</sub>
					</label>
					<input
						disabled={!controller.ready}
						style={{ borderColor: "var(--Strom)" }}
						type="text"
						aria-label="Strom IR"
						id="IR-parallel"
					/>
					<label>{"A [Ampere]"}</label>
				</div>
				<div className="form-row">
					<label>
						{"Strom I"}
						<sub>{"L"}</sub>
					</label>
					<input
						disabled={!controller.ready}
						style={{ borderColor: "var(--Strom)" }}
						type="text"
						aria-label="Strom IL"
						id="IL-parallel"
					/>
					<label>{"A [Ampere]"}</label>
				</div>
				<div className="form-row">
					<label>
						{"Strom I"}
						<sub>{"C"}</sub>
					</label>
					<input
						disabled={!controller.ready}
						style={{ borderColor: "var(--Strom)" }}
						type="text"
						aria-label="Strom IC"
						id="IC-parallel"
					/>
					<label>{"A [Ampere]"}</label>
				</div>
				<div className="form-row">
					<label>{"Widerstand R"}</label>
					<input
						disabled={!controller.ready}
						style={{ borderColor: "var(--Widerstand)" }}
						type="text"
						aria-label="Widerstand R"
						id="R-parallel"
					/>
					<label>{"Ω [Ohm]"}</label>
				</div>
				<div className="form-row">
					<label>
						{"Bildwiderstand  X"}
						<sub>{"L"}</sub>
					</label>
					<input
						disabled={!controller.ready}
						style={{ borderColor: "var(--Widerstand)" }}
						type="text"
						aria-label="Bildwiderstand  XL"
						id="XL-parallel"
					/>
					<label>{"Ω [Ohm ∠ -90°]"}</label>
				</div>
				<div className="form-row">
					<label>
						{"Bildwiderstand  X"}
						<sub>{"C"}</sub>
					</label>
					<input
						disabled={!controller.ready}
						style={{ borderColor: "var(--Widerstand)" }}
						type="text"
						aria-label="Bildwiderstand  XC"
						id="XC-parallel"
					/>
					<label>{"Ω [Ohm ∠ +90°]"}</label>
				</div>
				<div className="form-row">
					<label>{"Induktivität L"}</label>
					<input
						disabled={!controller.ready}
						style={{ borderColor: "var(--Induktivitaet)" }}
						type="text"
						aria-label="Induktivität L"
						id="L-parallel"
					/>
					<label>{"H [Henry]"}</label>
				</div>
				<div className="form-row">
					<label>{"(Kreis) Güte Q"}</label>
					<input
						disabled={!controller.ready}
						style={{ borderColor: "var(--Guete)" }}
						type="text"
						aria-label="(Kreis) Güte Q"
						id="Q-parallel"
					/>
					<label>{"1"}</label>
				</div>
				<div className="form-row">
					<label>{"Kapazität C"}</label>
					<input
						disabled={!controller.ready}
						style={{ borderColor: "var(--Kapazitaet)" }}
						type="text"
						aria-label="Kapazität C"
						id="C-parallel"
					/>
					<label>{"F [Farad]"}</label>
				</div>
				<div className="form-row">
					<label>{"Frequenz f"}</label>
					<input
						disabled={!controller.ready}
						style={{ borderColor: "var(--Frequenz)" }}
						type="text"
						aria-label="Frequenz f"
						id="f-parallel"
					/>
					<label>{"Hz [Hertz] "}</label>
				</div>
				<div className="form-row">
					<label>{"Bandbreite b"}</label>
					<input
						disabled={!controller.ready}
						style={{ borderColor: "var(--Frequenz)" }}
						type="text"
						aria-label="Bandbreite b"
						id="b-parallel"
					/>
					<label>{"Hz [Hertz] "}</label>
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
	);
}
