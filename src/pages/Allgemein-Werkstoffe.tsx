import { useCalculator } from "../lib/use-calculator";
import { createController } from "../calculations/Allgemein-Werkstoffe.js";
import { Chevron } from "../components/chevron";
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
						'@layer source { @scope (.page-body) {\n\n        input {\n            border: 2px solid;\n            border-radius: 3px;\n        }\n\n        input:focus {\n            outline: none; /* Entfernt den Standard-Umrandungsring */\n        }\n\n        .dropdown-container {\n            width: 800px;\n            max-width: 90%;\n            margin: 20px auto;\n            background-color: #000;\n        }\n\n        .dropdown-header {\n            display: flex;\n            justify-content: space-between;\n            align-items: center;\n            padding: 15px 20px;\n            font-size: 18px;\n            font-weight: bold;\n            cursor: pointer;\n            color: #ffffff;\n        }\n\n        .dropdown-header:hover {\n            background-color: #181818;\n        }\n\n        .dropdown-header .arrow {\n            font-size: 18px;\n            transform: rotate(0deg);\n            transition: transform 0.5s;\n        }\n\n        .dropdown.open .arrow {\n            transform: rotate(-180deg);\n        }\n\n        .dropdown-content {\n            display: none;\n            padding: 15px 20px;\n            background-color: #000000;\n            border-top: 1px solid #ddd;\n\n        }\n\n        .dropdown.open .dropdown-content {\n            display: block;\n        }\n\n        .divider {\n            border-bottom: 1px solid #ddd;\n        }\n\n\n        /* Stil fuer das Formular und Layout */\n        form {\n            display: flex;\n            flex-direction: column;\n            align-items: flex-start;\n            margin-bottom: 20px;\n            max-width: 700px; /* Setzt eine maximale Breite */\n            margin: 0 auto; /* Zentriert das Formular */\n        }\n\n        .form-row {\n            display: flex;\n            align-items: center;\n            margin-bottom: 10px;\n            width: 100%;\n            /*max-width: 150px;*/\n        }\n\n        .form-row label {\n            flex: 3;\n            text-align: left;\n            margin-right: 10px;\n        }\n\n        .form-row input[type="number"], .form-row select {\n            flex: 1.5;\n            margin-right: 5px;\n        }\n\n        .form-row .unit {\n            flex: 0.8;\n        }\n\n        h3 {\n            margin-top: 20px;\n        }\n\n        .results{\n            line-height: 2; /* Multiplikator fuer die Schriftgroesse */\n        }\n\n        .fraction\n        {\n            display: inline-block; \n            vertical-align: middle; \n            text-align: center;\n            margin-top: 1px;\n            line-height: 1.5; /* Multiplikator fuer die Schriftgroesse */\n        }\n\n        .fraction-numerator{\n            border-bottom: 1px solid;\n            padding-bottom: 0.2px; /* Sorgt fuer einen Abstand innerhalb des Elements */\n            display: inline-block; /* Macht die Anpassungen besser sichtbar */\n        }\n\n        .fraction-denumerator {\n            border-top: 1px solid;\n            padding-top: 0.5px;\n        }\n    \n} }'
					}
				</style>
				<div>
					<h1>
						<br />
						{"Werkstoffe"}
					</h1>
				</div>
				<div className="dropdown-container">
					<div className="dropdown">
						<button
							disabled={!controller.ready}
							type="button"
							aria-expanded="false"
							id="control-0"
							className="dropdown-header"
							data-action="toggleDropdown"
							onClick={(event) => {
								controller.current?.invoke?.(
									"toggleDropdown",
									event.currentTarget,
									event.currentTarget,
								);
							}}
						>
							{"\n                        Spezifischer Widerstand"}
							<span className="arrow" aria-hidden="true">
								<Chevron direction="down" />
							</span>
						</button>
						<div className="dropdown-content">
							<div>
								<div className="comment">
									{
										"\n                                Werte mit Massvorsatz eingeben z.B. C = 100nF → Eingabe: 100n (nicht 100nF)"
									}
									<br />
									<br />
								</div>
								<div className="form-row">
									<label htmlFor="R">
										{"Gesamtwiderstand R"}
										<sub>{"ges"}</sub>
									</label>
									<input
										disabled={!controller.ready}
										style={{ borderColor: "var(--Widerstand)" }}
										type="text"
										aria-label="Gesamtwiderstand Rges"
										id="R"
										aria-describedby="R-unit"
									/>
									<label id="R-unit">{"Ω [Ohm]"}</label>
								</div>
								<div className="form-row">
									<label htmlFor="x">{"Leitfähigkeit χ"}</label>
									<input
										disabled={!controller.ready}
										style={{ borderColor: "gray" }}
										type="text"
										aria-label="Leitfähigkeit χ"
										id="x"
										aria-describedby="x-unit"
									/>
									<label id="x-unit">
										{"m/(Ω ∗ mm"}
										<sup>{"2"}</sup>
										{")"}
									</label>
								</div>
								<div className="form-row">
									<label htmlFor="p">{"spezifischer Widerstand ρ"}</label>
									<input
										disabled={!controller.ready}
										style={{ borderColor: "gray" }}
										type="text"
										aria-label="spezifischer Widerstand ρ"
										id="p"
										aria-describedby="p-unit"
									/>
									<label id="p-unit">
										{"(Ω ∗ mm"}
										<sup>{"2"}</sup>
										{")/m"}
									</label>
								</div>
								<div className="form-row">
									<label htmlFor="A">{"Leiterquerschnitt A"}</label>
									<input
										disabled={!controller.ready}
										style={{ borderColor: "var(--Flaeche)" }}
										type="text"
										aria-label="Leiterquerschnitt A"
										id="A"
										aria-describedby="A-unit"
									/>
									<label id="A-unit">
										{"m"}
										<sup>{"2"}</sup>
										{" [Quadratmeter]"}
									</label>
								</div>
								<div className="form-row">
									<label htmlFor="d">{"Leiterdurchmesser d"}</label>
									<input
										disabled={!controller.ready}
										style={{ borderColor: "var(--Flaeche)" }}
										type="text"
										aria-label="Leiterdurchmesser d"
										id="d"
										aria-describedby="d-unit"
									/>
									<label id="d-unit">{"m [meter]"}</label>
								</div>
								<div className="form-row">
									<label htmlFor="l">{"Leiterlänge l"}</label>
									<input
										disabled={!controller.ready}
										style={{ borderColor: "var(--Laenge)" }}
										type="text"
										aria-label="Leiterlänge l"
										id="l"
										aria-describedby="l-unit"
									/>
									<label id="l-unit">{"m [meter]"}</label>
								</div>
								<input
									disabled={!controller.ready}
									type="button"
									defaultValue="Berechnen"
									className="Button_Berechnen"
									data-action="calculateLeitfaehigkeit"
									onClick={(event) => {
										controller.current?.invoke?.(
											"calculateLeitfaehigkeit",
											event.currentTarget,
										);
									}}
								/>
								<h3>{"Berechnete Ergebnisse"}</h3>
								<div id="result_Leiter" aria-live="polite"></div>
							</div>
						</div>
					</div>
					<div className="divider"></div>
					<div className="dropdown">
						<button
							disabled={!controller.ready}
							type="button"
							aria-expanded="false"
							id="control-1"
							className="dropdown-header"
							data-action="toggleDropdown"
							onClick={(event) => {
								controller.current?.invoke?.(
									"toggleDropdown",
									event.currentTarget,
									event.currentTarget,
								);
							}}
						>
							{"\n                        Temperaturabhängigkeit Widerstände "}
							<span className="arrow" aria-hidden="true">
								<Chevron direction="down" />
							</span>
						</button>
						<div className="dropdown-content">
							<div>
								<div className="comment">
									{
										"\n                                Werte mit Massvorsatz eingeben z.B. C = 100nF → Eingabe: 100n (nicht 100nF)"
									}
									<br />
									<br />
								</div>
								<div className="form-row">
									<label htmlFor="Rk">{"Kaltwiderstand R"}</label>
									<input
										disabled={!controller.ready}
										style={{ borderColor: "var(--Widerstand)" }}
										type="text"
										aria-label="Kaltwiderstand R"
										id="Rk"
										aria-describedby="Rk-unit"
									/>
									<label id="Rk-unit">{"Ω [Ohm]"}</label>
								</div>
								<div className="form-row">
									<label htmlFor="Rw">
										{"Warmwiderstand R"}
										<sub>{"ϑ"}</sub>
									</label>
									<input
										disabled={!controller.ready}
										style={{ borderColor: "var(--Widerstand)" }}
										type="text"
										aria-label="Warmwiderstand Rϑ"
										id="Rw"
										aria-describedby="Rw-unit"
									/>
									<label id="Rw-unit">{"Ω [Ohm]"}</label>
								</div>
								<div className="form-row">
									<label htmlFor="alpha">{"Temperaturbeiwert α"}</label>
									<input
										disabled={!controller.ready}
										style={{ borderColor: "gray" }}
										type="text"
										aria-label="Temperaturbeiwert α"
										id="alpha"
										aria-describedby="alpha-unit"
									/>
									<label id="alpha-unit">
										{"K"}
										<sup>{"-1"}</sup>
										{" [1/Klevin]"}
									</label>
								</div>
								<div className="form-row">
									<label htmlFor="T">{"Temperaturänderung ΔT"}</label>
									<input
										disabled={!controller.ready}
										style={{ borderColor: "var(--Temperatur)" }}
										type="text"
										aria-label="Temperaturänderung ΔT"
										id="T"
										aria-describedby="T-unit"
									/>
									<label id="T-unit">{"K [Kelvin]"}</label>
								</div>
								<div className="form-row">
									<label htmlFor="Tw">
										{"Warmwert T"}
										<sub>{"w"}</sub>
									</label>
									<input
										disabled={!controller.ready}
										style={{ borderColor: "var(--Temperatur)" }}
										type="text"
										aria-label="Warmwert Tw"
										id="Tw"
										aria-describedby="Tw-unit"
									/>
									<label id="Tw-unit">{"°C [Celsius]"}</label>
								</div>
								<div className="form-row">
									<label htmlFor="Tk">
										{"Kaltwert T"}
										<sub>{"k"}</sub>
									</label>
									<input
										disabled={!controller.ready}
										style={{ borderColor: "var(--Temperatur)" }}
										type="text"
										aria-label="Kaltwert Tk"
										id="Tk"
										aria-describedby="Tk-unit"
									/>
									<label id="Tk-unit">{"°C [Celsius]"}</label>
								</div>
								<input
									disabled={!controller.ready}
									type="button"
									defaultValue="Berechnen"
									className="Button_Berechnen"
									data-action="calculateTemperaturwiderstand"
									onClick={(event) => {
										controller.current?.invoke?.(
											"calculateTemperaturwiderstand",
											event.currentTarget,
										);
									}}
								/>
								<h3>{"Berechnete Ergebnisse"}</h3>
								<div id="result_Temp" aria-live="polite"></div>
							</div>
						</div>
					</div>
					<div className="divider"></div>
					<div className="dropdown">
						<button
							disabled={!controller.ready}
							type="button"
							aria-expanded="false"
							id="control-2"
							className="dropdown-header"
							data-action="toggleDropdown"
							onClick={(event) => {
								controller.current?.invoke?.(
									"toggleDropdown",
									event.currentTarget,
									event.currentTarget,
								);
							}}
						>
							{"\n                        Stromdichte "}
							<span className="arrow" aria-hidden="true">
								<Chevron direction="down" />
							</span>
						</button>
						<div className="dropdown-content">
							<div>
								<div className="comment">
									{
										"\n                                Werte mit Massvorsatz eingeben z.B. C = 100nF → Eingabe: 100n (nicht 100nF)"
									}
									<br />
									<br />
								</div>
								<div className="form-row">
									<label htmlFor="I_J">{"Strom I"}</label>
									<input
										disabled={!controller.ready}
										style={{ borderColor: "var(--Strom)" }}
										type="text"
										aria-label="Strom I"
										id="I_J"
										aria-describedby="I_J-unit"
									/>
									<label id="I_J-unit">{"A [Ampere]"}</label>
								</div>
								<div className="form-row">
									<label htmlFor="d_J">{"Leiterdurchmesser d"}</label>
									<input
										disabled={!controller.ready}
										style={{ borderColor: "var(--Flaeche)" }}
										type="text"
										aria-label="Leiterdurchmesser d"
										id="d_J"
										aria-describedby="d_J-unit"
									/>
									<label id="d_J-unit">{"m [meter]"}</label>
								</div>
								<div className="form-row">
									<label htmlFor="A_J">{"Querschnittsfläche A"}</label>
									<input
										disabled={!controller.ready}
										style={{ borderColor: "var(--Flaeche)" }}
										type="text"
										aria-label="Querschnittsfläche A"
										id="A_J"
										aria-describedby="A_J-unit"
									/>
									<label id="A_J-unit">
										{"m"}
										<sup>{"2"}</sup>
										{" [Quadratmeter]"}
									</label>
								</div>
								<div className="form-row">
									<label htmlFor="J">{"Stromdichte J"}</label>
									<input
										disabled={!controller.ready}
										style={{ borderColor: "gray" }}
										type="text"
										aria-label="Stromdichte J"
										id="J"
										aria-describedby="J-unit"
									/>
									<label id="J-unit">
										{"A/mm"}
										<sup>{"2"}</sup>
									</label>
								</div>
								<input
									disabled={!controller.ready}
									type="button"
									defaultValue="Berechnen"
									className="Button_Berechnen"
									data-action="calculateStromdichte"
									onClick={(event) => {
										controller.current?.invoke?.(
											"calculateStromdichte",
											event.currentTarget,
										);
									}}
								/>
								<h3>{"Berechnete Ergebnisse"}</h3>
								<div id="result_Stromd" aria-live="polite"></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
