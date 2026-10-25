import { useCalculator } from "../lib/use-calculator";
import { createController } from "../calculations/Allgemein-Werkstoffe.js";
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
						<span className="arrow">{"▼"}</span>
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
								<label>
									{"Gesamtwiderstand R"}
									<sub>{"ges"}</sub>
								</label>
								<input
									disabled={!controller.ready}
									style={{ borderColor: "var(--Widerstand)" }}
									type="text"
									aria-label="Gesamtwiderstand Rges"
									id="R"
								/>
								<label>{"Ω [Ohm]"}</label>
							</div>
							<div className="form-row">
								<label>{"Leitfähigkeit χ"}</label>
								<input
									disabled={!controller.ready}
									style={{ borderColor: "gray" }}
									type="text"
									aria-label="Leitfähigkeit χ"
									id="x"
								/>
								<label>
									{"m/(Ω ∗ mm"}
									<sup>{"2"}</sup>
									{")"}
								</label>
							</div>
							<div className="form-row">
								<label>{"spezifischer Widerstand ρ"}</label>
								<input
									disabled={!controller.ready}
									style={{ borderColor: "gray" }}
									type="text"
									aria-label="spezifischer Widerstand ρ"
									id="p"
								/>
								<label>
									{"(Ω ∗ mm"}
									<sup>{"2"}</sup>
									{")/m"}
								</label>
							</div>
							<div className="form-row">
								<label>{"Leiterquerschnitt A"}</label>
								<input
									disabled={!controller.ready}
									style={{ borderColor: "var(--Flaeche)" }}
									type="text"
									aria-label="Leiterquerschnitt A"
									id="A"
								/>
								<label>
									{"m"}
									<sup>{"2"}</sup>
									{" [Quadratmeter]"}
								</label>
							</div>
							<div className="form-row">
								<label>{"Leiterdurchmesser d"}</label>
								<input
									disabled={!controller.ready}
									style={{ borderColor: "var(--Flaeche)" }}
									type="text"
									aria-label="Leiterdurchmesser d"
									id="d"
								/>
								<label>{"m [meter]"}</label>
							</div>
							<div className="form-row">
								<label>{"Leiterlänge l"}</label>
								<input
									disabled={!controller.ready}
									style={{ borderColor: "var(--Laenge)" }}
									type="text"
									aria-label="Leiterlänge l"
									id="l"
								/>
								<label>{"m [meter]"}</label>
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
						<span className="arrow">{"▼"}</span>
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
								<label>{"Kaltwiderstand R"}</label>
								<input
									disabled={!controller.ready}
									style={{ borderColor: "var(--Widerstand)" }}
									type="text"
									aria-label="Kaltwiderstand R"
									id="Rk"
								/>
								<label>{"Ω [Ohm]"}</label>
							</div>
							<div className="form-row">
								<label>
									{"Warmwiderstand R"}
									<sub>{"ϑ"}</sub>
								</label>
								<input
									disabled={!controller.ready}
									style={{ borderColor: "var(--Widerstand)" }}
									type="text"
									aria-label="Warmwiderstand Rϑ"
									id="Rw"
								/>
								<label>{"Ω [Ohm]"}</label>
							</div>
							<div className="form-row">
								<label>{"Temperaturbeiwert α"}</label>
								<input
									disabled={!controller.ready}
									style={{ borderColor: "gray" }}
									type="text"
									aria-label="Temperaturbeiwert α"
									id="alpha"
								/>
								<label>
									{"K"}
									<sup>{"-1"}</sup>
									{" [1/Klevin]"}
								</label>
							</div>
							<div className="form-row">
								<label>{"Temperaturänderung ΔT"}</label>
								<input
									disabled={!controller.ready}
									style={{ borderColor: "var(--Temperatur)" }}
									type="text"
									aria-label="Temperaturänderung ΔT"
									id="T"
								/>
								<label>{"K [Kelvin]"}</label>
							</div>
							<div className="form-row">
								<label>
									{"Warmwert T"}
									<sub>{"w"}</sub>
								</label>
								<input
									disabled={!controller.ready}
									style={{ borderColor: "var(--Temperatur)" }}
									type="text"
									aria-label="Warmwert Tw"
									id="Tw"
								/>
								<label>{"°C [Celsius]"}</label>
							</div>
							<div className="form-row">
								<label>
									{"Kaltwert T"}
									<sub>{"k"}</sub>
								</label>
								<input
									disabled={!controller.ready}
									style={{ borderColor: "var(--Temperatur)" }}
									type="text"
									aria-label="Kaltwert Tk"
									id="Tk"
								/>
								<label>{"°C [Celsius]"}</label>
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
						<span className="arrow">{"▼"}</span>
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
								<label>{"Strom I"}</label>
								<input
									disabled={!controller.ready}
									style={{ borderColor: "var(--Strom)" }}
									type="text"
									aria-label="Strom I"
									id="I_J"
								/>
								<label>{"A [Ampere]"}</label>
							</div>
							<div className="form-row">
								<label>{"Leiterdurchmesser d"}</label>
								<input
									disabled={!controller.ready}
									style={{ borderColor: "var(--Flaeche)" }}
									type="text"
									aria-label="Leiterdurchmesser d"
									id="d_J"
								/>
								<label>{"m [meter]"}</label>
							</div>
							<div className="form-row">
								<label>{"Querschnittsfläche A"}</label>
								<input
									disabled={!controller.ready}
									style={{ borderColor: "var(--Flaeche)" }}
									type="text"
									aria-label="Querschnittsfläche A"
									id="A_J"
								/>
								<label>
									{"m"}
									<sup>{"2"}</sup>
									{" [Quadratmeter]"}
								</label>
							</div>
							<div className="form-row">
								<label>{"Stromdichte J"}</label>
								<input
									disabled={!controller.ready}
									style={{ borderColor: "gray" }}
									type="text"
									aria-label="Stromdichte J"
									id="J"
								/>
								<label>
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
	);
}
