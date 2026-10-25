import { useCalculator } from "../lib/use-calculator";
import { createController } from "../calculations/Elektronik-Transistor.js";
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
						'@layer source { @scope (.page-body) {\n\n        .slider {\n            position: absolute;\n            cursor: pointer;\n            top: 0;\n            left: 0;\n            right: 0;\n            bottom: 0;\n            background-color: #535353;\n            transition: .2s;\n            border-radius: 20px;\n        }\n\n        .slider:before {\n            position: absolute;\n            content: "";\n            height: 14px;\n            width: 14px;\n            left: 3px;\n            bottom: 3px;\n            background-color: white;\n            transition: .2s;\n            border-radius: 50%;\n        }\n\n        /*input:checked + .slider {\n            background-color: #22aca0;\n        }*/\n\n        input:checked + .slider:before {\n            transform: translateX(14px);\n        }\n\n        input {\n            border: 2px solid;\n            border-radius: 3px;\n        }\n\n        input:focus {\n            border: 3px solid;\n            outline: none; /* Entfernt den Standard-Umrandungsring */\n        }\n\n        .dropdown-container {\n            width: 800px;\n            max-width: 90%;\n            margin: 20px auto;\n            background-color: #000;\n        }\n\n        .dropdown-header {\n            display: flex;\n            justify-content: space-between;\n            align-items: center;\n            padding: 15px 20px;\n            font-size: 18px;\n            font-weight: bold;\n            cursor: pointer;\n            color: #ffffff;\n        }\n\n        .dropdown-header:hover {\n            background-color: #181818;\n        }\n\n        .dropdown-header .arrow {\n            font-size: 18px;\n            transform: rotate(0deg);\n            transition: transform 0.5s;\n        }\n\n        .dropdown.open .arrow {\n            transform: rotate(-180deg);\n        }\n\n        .dropdown-content {\n            display: none;\n            padding: 15px 20px;\n            background-color: #000000;\n            border-top: 1px solid #ddd;\n\n        }\n\n        .dropdown.open .dropdown-content {\n            display: block;\n        }\n\n        .divider {\n            border-bottom: 1px solid #ddd;\n        }\n\n        /* Stil fuer die tiefergestellten Zeichen */\n        sub {\n            vertical-align: sub;\n            font-size: smaller;\n        }\n\n        .transistorForm{\n            /*padding: 10px;*/\n            max-width: 150px;\n        }\n\n        /***************/\n        input:checked + .slider:before {\n            transform: translateX(14px);\n        }\n\n        input {\n            border: 2px solid;\n            border-radius: 3px;\n        }\n\n        input:focus {\n            border: 3px solid;\n            outline: none; /* Entfernt den Standard-Umrandungsring */\n        }\n\n        /* Stil fuer das Formular und Layout */\n        .input-numbers {\n            display: flex;\n            flex-direction: column;\n            align-items: flex-start;\n            margin-bottom: 20px;\n            max-width: 600px; /* Setzt eine maximale Breite */\n            margin: 0 auto; /* Zentriert das Formular */\n            /*margin-left: 10px;*/\n        }\n\n        .comment{\n            font-size: smaller;\n            font-style: italic;\n            color:rgb(179, 179, 179);\n            margin-left: 10px;\n        }\n\n        .form-row {\n            display: flex;\n            align-items: center;\n            margin-bottom: 10px;\n            width: 100%;\n            margin-left: 10px;\n            \n        }\n\n        .form-row label {\n            flex: 3;\n            text-align: left;\n            margin-right: 10px;\n\n        }\n\n        h3 {\n            margin-top: 20px;\n        }\n\n        .results{\n            line-height: 2; /* Multiplikator fuer die Schriftgroesse */\n        }\n\n        .fraction\n        {\n            display: inline-block; \n            vertical-align: middle; \n            text-align: center;\n            margin-top: 1px;\n            line-height: 1.5; /* Multiplikator fuer die Schriftgroesse */\n        }\n\n        .fraction-numerator{\n            border-bottom: 1px solid;\n            padding-bottom: 0.2px; /* Sorgt fuer einen Abstand innerhalb des Elements */\n            display: inline-block; /* Macht die Anpassungen besser sichtbar */\n        }\n        img{\n            width: 80%;\n            max-width: 600px;\n        }\n\n        .comment{\n            font-size: smaller;\n            font-style: italic;\n            color:rgb(179, 179, 179);\n            margin-left: 10px;\n        }\n\n    \n} }'
					}
				</style>
				<div>
					<h1>
						<br />
						{"Transistor"}
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
							{"\n                        Transistor als Schalter"}
							<span className="arrow">{"▼"}</span>
						</button>
						<div className="dropdown-content">
							<div>
								<h2>{"Schaltung"}</h2>
								<img
									style={{ maxWidth: "450px" }}
									src="/Pictures/Transistor_Schalter.png"
									alt="Transistor Schaltung"
								/>
								<div className="comment">
									{
										"\n                                Werte mit Massvorsatz eingeben z.B. I = 5mA → Eingabe: 5m (nicht 5mA)"
									}
									<br />
									<br />
								</div>
								<div className="form-row">
									<label>
										{"Kollektorstrom I"}
										<sub>{"C"}</sub>
									</label>
									<input
										disabled={!controller.ready}
										style={{ borderColor: "var(--Strom)" }}
										type="text"
										aria-label="Kollektorstrom IC"
										id="IC"
									/>
									<label>{"A [Ampere]"}</label>
								</div>
								<div className="form-row">
									<label>
										{"Basisstrom I"}
										<sub>{"B"}</sub>
									</label>
									<input
										disabled={!controller.ready}
										style={{ borderColor: "var(--Strom)" }}
										type="text"
										aria-label="Basisstrom IB"
										id="IB"
									/>
									<label>{"A [Ampere]"}</label>
								</div>
								<div className="form-row">
									<label>
										{"Lastwiderstand R"}
										<sub>{"L"}</sub>
									</label>
									<input
										disabled={!controller.ready}
										style={{ borderColor: "var(--Widerstand)" }}
										type="text"
										aria-label="Lastwiderstand RL"
										id="RL"
									/>
									<label>{"Ω [Ohm]"}</label>
								</div>
								<div className="form-row">
									<label>
										{"Widerstand R"}
										<sub>{"B"}</sub>
									</label>
									<input
										disabled={!controller.ready}
										style={{ borderColor: "var(--Widerstand)" }}
										type="text"
										aria-label="Widerstand RB"
										id="RB"
									/>
									<label>{"Ω [Ohm]"}</label>
								</div>
								<div className="form-row">
									<label>
										{"Speisespannung U"}
										<sub>{"b"}</sub>
									</label>
									<input
										disabled={!controller.ready}
										style={{ borderColor: "var(--Spannung)" }}
										type="text"
										aria-label="Speisespannung Ub"
										id="USpeisung"
									/>
									<label>{"U [Volt]"}</label>
								</div>
								<div className="form-row">
									<label>
										{"Basisspannung U"}
										<sub>{"B"}</sub>
									</label>
									<input
										disabled={!controller.ready}
										style={{ borderColor: "var(--Spannung)" }}
										type="text"
										aria-label="Basisspannung UB"
										id="UB"
									/>
									<label>{"U [Volt]"}</label>
								</div>
								<div className="form-row">
									<label>
										{"Basis-Emitter-Spannung U"}
										<sub>{"BE"}</sub>
									</label>
									<input
										disabled={!controller.ready}
										style={{ borderColor: "var(--Spannung)" }}
										type="text"
										aria-label="Basis-Emitter-Spannung UBE"
										id="UBE"
										placeholder="0.7"
									/>
									<label>{"U [Volt]"}</label>
								</div>
								<div className="form-row">
									<label>
										{"Kollektor-Emitter-Spannung U"}
										<sub>{"CE"}</sub>
									</label>
									<input
										disabled={!controller.ready}
										style={{ borderColor: "var(--Spannung)" }}
										type="text"
										aria-label="Kollektor-Emitter-Spannung UCE"
										id="UCE"
										placeholder="0.2"
									/>
									<label>{"U [Volt]"}</label>
								</div>
								<div className="form-row">
									<label>{"Basisstromverstärkung B"}</label>
									<input
										disabled={!controller.ready}
										style={{ borderColor: "var(--Verstaerkungsfaktor)" }}
										type="text"
										aria-label="Basisstromverstärkung B"
										id="B"
									/>
									<label>{"1"}</label>
								</div>
								<div className="form-row">
									<label>{"Übersteuerungsfaktor ü"}</label>
									<input
										disabled={!controller.ready}
										style={{ borderColor: "var(--Verstaerkungsfaktor)" }}
										type="text"
										aria-label="Übersteuerungsfaktor ü"
										id="ue"
										placeholder="3"
									/>
									<label>{"1"}</label>
								</div>
								<input
									disabled={!controller.ready}
									type="button"
									defaultValue="Berechnen"
									className="Button_Berechnen"
									data-action="calculateTransistorAsSwitch"
									onClick={(event) => {
										controller.current?.invoke?.(
											"calculateTransistorAsSwitch",
											event.currentTarget,
										);
									}}
								/>
								<h3>{"Berechnete Ergebnisse"}</h3>
								<div id="result" aria-live="polite"></div>
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
							{"\n                        Transistor als Verstärker "}
							<span className="arrow">{"▼"}</span>
						</button>
						<div className="dropdown-content">
							<div>
								{
									"\n                            In dieser Version nicht umgesetzt.\n                        "
								}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
