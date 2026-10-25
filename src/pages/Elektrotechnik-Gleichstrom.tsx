import { useCalculator } from "../lib/use-calculator";
import { createController } from "../calculations/Elektrotechnik-Gleichstrom.js";
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
						'@layer source { @scope (.page-body) {\n\n        .switch {\n            position: relative;\n            display: inline-block;\n            width: 34px;\n            height: 20px;\n        }\n\n        .switch input {\n            opacity: 0;\n            width: 0;\n            height: 0;\n        }\n\n        .slider {\n            position: absolute;\n            cursor: pointer;\n            top: 0;\n            left: 0;\n            right: 0;\n            bottom: 0;\n            background-color: #535353;\n            transition: .2s;\n            border-radius: 20px;\n        }\n\n        .slider:before {\n            position: absolute;\n            content: "";\n            height: 14px;\n            width: 14px;\n            left: 3px;\n            bottom: 3px;\n            background-color: white;\n            transition: .2s;\n            border-radius: 50%;\n        }\n\n        /*input:checked + .slider {\n            background-color: #22aca0;\n        }*/\n\n        input:checked + .slider:before {\n            transform: translateX(14px);\n        }\n\n        input {\n            border: 2px solid;\n            border-radius: 3px;\n        }\n\n        input:focus {\n            outline: none; /* Entfernt den Standard-Umrandungsring */\n        }\n\n  \n\n        .dropdown-container {\n            width: 800px;\n            max-width: 90%;\n            margin: 20px auto;\n            background-color: #000;\n        }\n\n        .dropdown-header {\n            display: flex;\n            justify-content: space-between;\n            align-items: center;\n            padding: 15px 20px;\n            font-size: 18px;\n            font-weight: bold;\n            cursor: pointer;\n            color: #ffffff;\n        }\n\n        .dropdown-header:hover {\n            background-color: #181818;\n        }\n\n        .dropdown-header .arrow {\n            font-size: 18px;\n            transform: rotate(0deg);\n            transition: transform 0.5s;\n        }\n\n        .dropdown.open .arrow {\n            transform: rotate(-180deg);\n        }\n\n        .dropdown-content {\n            display: none;\n            padding: 15px 20px;\n            background-color: #000000;\n            border-top: 1px solid #ddd;\n\n        }\n\n        .dropdown.open .dropdown-content {\n            display: block;\n        }\n\n        .divider {\n            border-bottom: 1px solid #ddd;\n        }\n\n\n        /* Stil fuer das Formular und Layout */\n        form {\n            display: flex;\n            flex-direction: column;\n            align-items: flex-start;\n            margin-bottom: 20px;\n            max-width: 700px; /* Setzt eine maximale Breite */\n            margin: 0 auto; /* Zentriert das Formular */\n        }\n\n        .form-row {\n            display: flex;\n            align-items: center;\n            margin-bottom: 10px;\n            width: 100%;\n            /*max-width: 150px;*/\n        }\n\n        .form-row label {\n            flex: 3;\n            text-align: left;\n            margin-right: 10px;\n        }\n\n        .form-row input[type="number"], .form-row select {\n            flex: 1.5;\n            margin-right: 5px;\n        }\n\n        .form-row .unit {\n            flex: 0.8;\n        }\n\n\n        .opv-button {\n            position: relative;\n            width: 150px; /* Adjust as needed */\n            height: 150px; /* Adjust as needed */\n            border: 2px solid transparent; /* Initially transparent */\n            padding: 0;\n            margin: 10px;\n            background-color: transparent;\n            cursor: pointer;\n        }\n        \n        .opv-button img {\n            width: 100%;\n            height: 100%;\n            object-fit: cover;\n        }\n\n        .opv-button:hover {\n            border-color: grey; /* grey border for hovered button */\n        }\n        \n        .opv-button.selected {\n            border-color: white; /* White border for selected button */\n        }\n        \n        .opv-button span {\n            position: absolute;\n            bottom: 0;\n            left: 0;\n            width: 100%;\n            text-align: center;\n            background: rgba(0, 0, 0, 0.5);\n            color: white;\n            font-size: 14px;\n            padding: 2px 0;\n        }\n        \n        .input-container {\n            margin-top: 20px;\n            text-align: center;\n        }\n        \n        .input-container label, .input-container input, .input-container select, .input-container button {\n            display: block;\n            margin: 5px auto;\n        }\n        \n        .input-group {\n            display: flex;\n            justify-content: center;\n            align-items: center;\n        }\n        \n        .input-group input {\n            margin-right: 5px;\n        }\n        \n        .input-group select {\n            margin-left: 5px;\n        }\n\n    \n} }'
					}
				</style>
				<br />
				<h1>{"Gleichstrom"}</h1>
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
							{"\n                        Ohmsches Gesetz (URI)"}
							<span className="arrow" aria-hidden="true">
								<Chevron direction="down" />
							</span>
						</button>
						<div className="dropdown-content">
							<div>
								<img
									style={{ maxWidth: "400px", width: "80%" }}
									src="/Pictures/Gliechstrom_Schematic.jpg"
									alt="Schema Gleichstromtechnik"
								/>
							</div>
							<div className="input-numbers">
								<div className="comment">
									{
										"\n                                    Werte mit Massvorsatz eingeben z.B. I = 5mA → Eingabe: 5m (nicht 5mA)"
									}
									<br />
									<br />
								</div>
								<div className="form-row">
									<label htmlFor="I">{"Strom I"}</label>
									<input
										disabled={!controller.ready}
										style={{ borderColor: "var(--Strom)" }}
										type="text"
										aria-label="Strom I"
										id="I"
										aria-describedby="I-unit"
									/>
									<label id="I-unit">{"A [Ampere]"}</label>
								</div>
								<div className="form-row">
									<label htmlFor="R">{"Widerstand R"}</label>
									<input
										disabled={!controller.ready}
										style={{ borderColor: "var(--Widerstand)" }}
										type="text"
										aria-label="Widerstand R"
										id="R"
										aria-describedby="R-unit"
									/>
									<label id="R-unit">{"Ω [Ohm]"}</label>
								</div>
								<div className="form-row">
									<label htmlFor="P">{"Leistung P"}</label>
									<input
										disabled={!controller.ready}
										style={{ borderColor: "var(--Leistung)" }}
										type="text"
										aria-label="Leistung P"
										id="P"
										aria-describedby="P-unit"
									/>
									<label id="P-unit">{"W [Watt]"}</label>
								</div>
								<div className="form-row">
									<label htmlFor="U">{"Spannung U"}</label>
									<input
										disabled={!controller.ready}
										style={{ borderColor: "var(--Spannung)" }}
										type="text"
										aria-label="Spannung U"
										id="U"
										aria-describedby="U-unit"
									/>
									<label id="U-unit">{"V [Volt]"}</label>
								</div>
								<div className="form-row">
									<label></label>
									<button
										disabled={!controller.ready}
										type="button"
										id="control-1"
										data-action="calculateParametersURI"
										onClick={(event) => {
											controller.current?.invoke?.(
												"calculateParametersURI",
												event.currentTarget,
											);
										}}
										className="Button_Berechnen"
									>
										{"Berechnen"}
									</button>
									<label></label>
								</div>
							</div>
							<div id="result" aria-live="polite"></div>
							<br />
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
							{"\n                        Spannungsteiler "}
							<span className="arrow" aria-hidden="true">
								<Chevron direction="down" />
							</span>
						</button>
						<div className="dropdown-content">
							<label className="switch">
								<input
									disabled={!controller.ready}
									type="checkbox"
									aria-label="Belasteter Spannungsteiler"
									id="modeSwitch"
								/>
								<span className="slider round"></span>
								<span className="switch-label">Belasteter Spannungsteiler</span>
							</label>
							<br />
							<br />
							<span id="modeLabel">{"unbelastet"}</span>
							<br />
							<div id="circuitDiagram">
								<img
									style={{ maxWidth: "400px", width: "80%", height: "auto" }}
									id="circuitImage"
									src="/Pictures/Spannungsteiler_unbelastet.png"
									alt="Schaltung unbelastet"
								/>
								<div
									style={{ display: "block" }}
									id="unbelastet"
									className="input-numbers"
								>
									<div className="comment">
										{
											"\n                                    Werte mit Massvorsatz eingeben z.B. I = 5mA → Eingabe: 5m (nicht 5mA)"
										}
										<br />
										<br />
									</div>
									<div className="form-row">
										<label htmlFor="I_unb">{"Strom I"}</label>
										<input
											disabled={!controller.ready}
											style={{ borderColor: "var(--Strom)" }}
											type="text"
											aria-label="Strom I"
											id="I_unb"
											aria-describedby="I_unb-unit"
										/>
										<label id="I_unb-unit">{"A [Ampere]"}</label>
									</div>
									<div className="form-row">
										<label htmlFor="R1_unb">
											{"Widerstand R"}
											<sub>{"1"}</sub>
										</label>
										<input
											disabled={!controller.ready}
											style={{ borderColor: "var(--Widerstand)" }}
											type="text"
											aria-label="Widerstand R1"
											id="R1_unb"
											aria-describedby="R1_unb-unit"
										/>
										<label id="R1_unb-unit">{"Ω [Ohm]"}</label>
									</div>
									<div className="form-row">
										<label htmlFor="R2_unb">
											{"Widerstand R"}
											<sub>{"2"}</sub>
										</label>
										<input
											disabled={!controller.ready}
											style={{ borderColor: "var(--Widerstand)" }}
											type="text"
											aria-label="Widerstand R2"
											id="R2_unb"
											aria-describedby="R2_unb-unit"
										/>
										<label id="R2_unb-unit">{"Ω [Ohm]"}</label>
									</div>
									<div className="form-row">
										<label htmlFor="Uin_unb">
											{"Spannung U"}
											<sub>{"in"}</sub>
										</label>
										<input
											disabled={!controller.ready}
											style={{ borderColor: "var(--Spannung)" }}
											type="text"
											aria-label="Spannung Uin"
											id="Uin_unb"
											aria-describedby="Uin_unb-unit"
										/>
										<label id="Uin_unb-unit">{"V [Volt]"}</label>
									</div>
									<div className="form-row">
										<label htmlFor="U1_unb">
											{"Spannung U"}
											<sub>{"1"}</sub>
										</label>
										<input
											disabled={!controller.ready}
											style={{ borderColor: "var(--Spannung)" }}
											type="text"
											aria-label="Spannung U1"
											id="U1_unb"
											aria-describedby="U1_unb-unit"
										/>
										<label id="U1_unb-unit">{"V [Volt]"}</label>
									</div>
									<div className="form-row">
										<label htmlFor="Uout_unb">
											{"Spannung U"}
											<sub>{"out"}</sub>
										</label>
										<input
											disabled={!controller.ready}
											style={{ borderColor: "var(--Spannung)" }}
											type="text"
											aria-label="Spannung Uout"
											id="Uout_unb"
											aria-describedby="Uout_unb-unit"
										/>
										<label id="Uout_unb-unit">{"V [Volt]"}</label>
									</div>
									<div className="form-row">
										<label></label>
										<button
											disabled={!controller.ready}
											type="button"
											id="control-3"
											data-action="calculateUnb_Spannungsteiler"
											onClick={(event) => {
												controller.current?.invoke?.(
													"calculateUnb_Spannungsteiler",
													event.currentTarget,
												);
											}}
											className="Button_Berechnen"
										>
											{"Berechnen"}
										</button>
										<label></label>
									</div>
									<div id="result_unb" aria-live="polite"></div>
									<br />
								</div>
								<div
									style={{ display: "none" }}
									id="belastet"
									className="input-numbers"
								>
									<div className="comment">
										{
											"\n                                    Werte mit Massvorsatz eingeben z.B. I = 5mA → Eingabe: 5m (nicht 5mA)"
										}
										<br />
										<br />
									</div>
									<div className="form-row">
										<label htmlFor="Iges_bel">
											{"Strom I"}
											<sub>{"ges"}</sub>
										</label>
										<input
											disabled={!controller.ready}
											style={{ borderColor: "var(--Strom)" }}
											type="text"
											aria-label="Strom Iges"
											id="Iges_bel"
											aria-describedby="Iges_bel-unit"
										/>
										<label id="Iges_bel-unit">{"A [Ampere]"}</label>
									</div>
									<div className="form-row">
										<label htmlFor="IR2_bel">
											{"Strom I"}
											<sub>{"R2"}</sub>
										</label>
										<input
											disabled={!controller.ready}
											style={{ borderColor: "var(--Strom)" }}
											type="text"
											aria-label="Strom IR2"
											id="IR2_bel"
											aria-describedby="IR2_bel-unit"
										/>
										<label id="IR2_bel-unit">{"A [Ampere]"}</label>
									</div>
									<div className="form-row">
										<label htmlFor="IRL_bel">
											{"Strom I"}
											<sub>{"RL"}</sub>
										</label>
										<input
											disabled={!controller.ready}
											style={{ borderColor: "var(--Strom)" }}
											type="text"
											aria-label="Strom IRL"
											id="IRL_bel"
											aria-describedby="IRL_bel-unit"
										/>
										<label id="IRL_bel-unit">{"A [Ampere]"}</label>
									</div>
									<div className="form-row">
										<label htmlFor="R1_bel">
											{"Widerstand R"}
											<sub>{"1"}</sub>
										</label>
										<input
											disabled={!controller.ready}
											style={{ borderColor: "var(--Widerstand)" }}
											type="text"
											aria-label="Widerstand R1"
											id="R1_bel"
											aria-describedby="R1_bel-unit"
										/>
										<label id="R1_bel-unit">{"Ω [Ohm]"}</label>
									</div>
									<div className="form-row">
										<label htmlFor="R2_bel">
											{"Widerstand R"}
											<sub>{"2"}</sub>
										</label>
										<input
											disabled={!controller.ready}
											style={{ borderColor: "var(--Widerstand)" }}
											type="text"
											aria-label="Widerstand R2"
											id="R2_bel"
											aria-describedby="R2_bel-unit"
										/>
										<label id="R2_bel-unit">{"Ω [Ohm]"}</label>
									</div>
									<div className="form-row">
										<label htmlFor="RL_bel">
											{"Widerstand R"}
											<sub>{"L"}</sub>
										</label>
										<input
											disabled={!controller.ready}
											style={{ borderColor: "var(--Widerstand)" }}
											type="text"
											aria-label="Widerstand RL"
											id="RL_bel"
											aria-describedby="RL_bel-unit"
										/>
										<label id="RL_bel-unit">{"Ω [Ohm]"}</label>
									</div>
									<div className="form-row">
										<label htmlFor="Uin_bel">
											{"Spannung U"}
											<sub>{"in"}</sub>
										</label>
										<input
											disabled={!controller.ready}
											style={{ borderColor: "var(--Spannung)" }}
											type="text"
											aria-label="Spannung Uin"
											id="Uin_bel"
											aria-describedby="Uin_bel-unit"
										/>
										<label id="Uin_bel-unit">{"V [Volt]"}</label>
									</div>
									<div className="form-row">
										<label htmlFor="U1_bel">
											{"Spannung U"}
											<sub>{"1"}</sub>
										</label>
										<input
											disabled={!controller.ready}
											style={{ borderColor: "var(--Spannung)" }}
											type="text"
											aria-label="Spannung U1"
											id="U1_bel"
											aria-describedby="U1_bel-unit"
										/>
										<label id="U1_bel-unit">{"V [Volt]"}</label>
									</div>
									<div className="form-row">
										<label htmlFor="Uout_bel">
											{"Spannung U"}
											<sub>{"out"}</sub>
										</label>
										<input
											disabled={!controller.ready}
											style={{ borderColor: "var(--Spannung)" }}
											type="text"
											aria-label="Spannung Uout"
											id="Uout_bel"
											aria-describedby="Uout_bel-unit"
										/>
										<label id="Uout_bel-unit">{"V [Volt]"}</label>
									</div>
									<input
										disabled={!controller.ready}
										type="button"
										defaultValue="Berechnen"
										className="Button_Berechnen"
										data-action="calculateBel_Spannungsteiler"
										onClick={(event) => {
											controller.current?.invoke?.(
												"calculateBel_Spannungsteiler",
												event.currentTarget,
											);
										}}
									/>
									<div id="result_bel" aria-live="polite"></div>
									<br />
								</div>
							</div>
						</div>
					</div>
					<div className="divider"></div>
					<div className="dropdown">
						<button
							disabled={!controller.ready}
							type="button"
							aria-expanded="false"
							id="control-4"
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
							{"\n                        Serie- und Parallelschaltung "}
							<span className="arrow" aria-hidden="true">
								<Chevron direction="down" />
							</span>
						</button>
						<div className="dropdown-content">
							<div>
								<button
									disabled={!controller.ready}
									type="button"
									id="control-5"
									className="opv-button"
									data-action="selectOPV"
									onClick={(event) => {
										controller.current?.invoke?.(
											"selectOPV",
											event.currentTarget,
											"serie_schaltung",
											event.currentTarget,
										);
									}}
								>
									<img src="/Pictures/R_Serie.svg" alt="Serie Schaltung" />
									<span>{"Serie"}</span>
								</button>
								<button
									disabled={!controller.ready}
									type="button"
									id="control-6"
									className="opv-button"
									data-action="selectOPV"
									onClick={(event) => {
										controller.current?.invoke?.(
											"selectOPV",
											event.currentTarget,
											"parallel_schaltung",
											event.currentTarget,
										);
									}}
								>
									<img
										src="/Pictures/R_Parallel.svg"
										alt="Parallel Schaltung"
									/>
									<span>{"Parallel"}</span>
								</button>
							</div>
							<div id="inputFieldsSerieParallel"></div>
							<div id="result_S_P" aria-live="polite"></div>
							<br />
						</div>
					</div>
					<div className="divider"></div>
					<div className="dropdown">
						<button
							disabled={!controller.ready}
							type="button"
							aria-expanded="false"
							id="control-7"
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
							{"\n                        Stern-Dreieckschaltung "}
							<span className="arrow" aria-hidden="true">
								<Chevron direction="down" />
							</span>
						</button>
						<div className="dropdown-content">
							<div>
								{
									"\n                            In dieser Version nicht umgesetzt.\n                        "
								}
							</div>
						</div>
					</div>
					<div className="divider"></div>
				</div>
			</div>
		</>
	);
}
