import { useCalculator } from "../lib/use-calculator";
import { createController } from "../calculations/Elektrotechnik-Kondensator.js";
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
						"@layer source { @scope (.page-body) {\n\n        /***********/\n        .img-button {\n            position: relative;\n            width: 100px; /* Adjust as needed */\n            height: 100px; /* Adjust as needed */\n            border: 2px solid transparent; /* Initially transparent */\n            padding: 0;\n            margin: 10px;\n            background-color: transparent;\n            cursor: pointer;\n        }\n        \n        .img-button img {\n            width: 100%;\n            height: 100%;\n            object-fit: cover;\n        }\n\n        .img-button:hover {\n            border-color: grey; /* grey border for hovered button */\n        }\n        \n        .img-button.selected {\n            border-color: white; /* White border for selected button */\n        }\n        \n        .img-button span {\n            position: absolute;\n            bottom: 0;\n            left: 0;\n            width: 100%;\n            text-align: center;\n            background: rgba(0, 0, 0, 0.5);\n            color: white;\n            font-size: 14px;\n            padding: 2px 0;\n        }\n        /***********/\n\n        .RAD-Button \n        {\n            background: none;\n            /*border: 1px solid var(--Winkel);\n            border-radius: 3px;\n            /*margin-top: 10px;\n            min-width: 50px;\n            height: 29px;*/\n            color: inherit;\n            padding: 0;\n            cursor: pointer;\n            flex: 3;\n            text-align: left;\n        }\n\n        .RAD-Button:hover{\n            text-decoration: underline;\n        }\n    \n} }"
					}
				</style>
				<br />
				<h1>{"Kondensatoren"}</h1>
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
							{"\n                        Kondensatorberechnungen"}
							<span className="arrow" aria-hidden="true">
								<Chevron direction="down" />
							</span>
						</button>
						<div className="dropdown-content">
							<div id="CapacitorParameter">
								<button
									disabled={!controller.ready}
									type="button"
									id="control-1"
									data-action="resetInputsCapacitorParameters"
									onClick={(event) => {
										controller.current?.invoke?.(
											"resetInputsCapacitorParameters",
											event.currentTarget,
										);
									}}
									className="Button_Berechnen"
								>
									{"Eingaben löschen"}
								</button>
								<div className="comment">
									{
										"\n                                Werte mit Massvorsatz eingeben z.B. C = 100nF → Eingabe: 100n (nicht 100nF)"
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
									<label htmlFor="F">{"Kraft F"}</label>
									<input
										disabled={!controller.ready}
										style={{ borderColor: "var(--Kraft)" }}
										type="text"
										aria-label="Kraft F"
										id="F"
										aria-describedby="F-unit"
									/>
									<label id="F-unit">{"N [Newton]"}</label>
								</div>
								<div className="form-row">
									<label htmlFor="E">{"Feldstärke E"}</label>
									<input
										disabled={!controller.ready}
										style={{ borderColor: "var(--Feldstaerke)" }}
										type="text"
										aria-label="Feldstärke E"
										id="E"
										aria-describedby="E-unit"
									/>
									<label id="E-unit">{"V/m [Volt / meter]"}</label>
								</div>
								<div className="form-row">
									<label htmlFor="er">
										{"Dielektrizitätszahl ε"}
										<sub>{"r"}</sub>
									</label>
									<input
										disabled={!controller.ready}
										style={{ borderColor: "var(--Dielektrizitaetszahl)" }}
										type="text"
										aria-label="Dielektrizitätszahl εr"
										id="er"
										aria-describedby="er-unit"
									/>
									<label id="er-unit">{"1"}</label>
								</div>
								<div className="form-row">
									<label htmlFor="A">{"Fläche A"}</label>
									<input
										disabled={!controller.ready}
										style={{ borderColor: "var(--Flaeche)" }}
										type="text"
										aria-label="Fläche A"
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
									<label htmlFor="d">{"Plattendurchmesser D"}</label>
									<input
										disabled={!controller.ready}
										style={{ borderColor: "var(--Flaeche)" }}
										type="text"
										aria-label="Plattendurchmesser D"
										id="d"
										aria-describedby="d-unit"
									/>
									<label id="d-unit">{"m [meter]"}</label>
								</div>
								<div className="form-row">
									<label htmlFor="s">{"Elektronenabstand s"}</label>
									<input
										disabled={!controller.ready}
										style={{ borderColor: "var(--Elektronenabstand)" }}
										type="text"
										aria-label="Elektronenabstand s"
										id="s"
										aria-describedby="s-unit"
									/>
									<label id="s-unit">{"m [meter]"}</label>
								</div>
								<div className="form-row">
									<label htmlFor="C">{"Kapazität C"}</label>
									<input
										disabled={!controller.ready}
										style={{ borderColor: "var(--Kapazitaet)" }}
										type="text"
										aria-label="Kapazität C"
										id="C"
										aria-describedby="C-unit"
									/>
									<label id="C-unit">{"F [Farad]"}</label>
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
									<label htmlFor="W">{"Energie W"}</label>
									<input
										disabled={!controller.ready}
										style={{ borderColor: "var(--Energie)" }}
										type="text"
										aria-label="Energie W"
										id="W"
										aria-describedby="W-unit"
									/>
									<label id="W-unit">{"J [Joule]"}</label>
								</div>
								<div className="form-row">
									<label htmlFor="Q">{"Ladung Q"}</label>
									<input
										disabled={!controller.ready}
										style={{ borderColor: "var(--Ladung)" }}
										type="text"
										aria-label="Ladung Q"
										id="Q"
										aria-describedby="Q-unit"
									/>
									<label id="Q-unit">{"C [Coulomb]"}</label>
								</div>
								<div className="form-row">
									<label htmlFor="t">{"Zeit"}</label>
									<input
										disabled={!controller.ready}
										style={{ borderColor: "var(--Zeit)" }}
										type="text"
										aria-label="Zeit"
										id="t"
										aria-describedby="t-unit"
									/>
									<label id="t-unit">{"s [sekunden]"}</label>
								</div>
								<button
									disabled={!controller.ready}
									type="button"
									id="control-2"
									data-action="calculateCapacitorParameters"
									onClick={(event) => {
										controller.current?.invoke?.(
											"calculateCapacitorParameters",
											event.currentTarget,
										);
									}}
									className="Button_Berechnen"
								>
									{"Berechnen"}
								</button>
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
							id="control-3"
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
							{"\n                        Kondensator an Wechselstrom "}
							<span className="arrow" aria-hidden="true">
								<Chevron direction="down" />
							</span>
						</button>
						<div className="dropdown-content">
							<button
								disabled={!controller.ready}
								type="button"
								id="control-4"
								className="img-button"
								data-action="toggleSelection"
								data-target="Serie"
								onClick={(event) => {
									controller.current?.invoke?.(
										"toggleSelection",
										event.currentTarget,
										event.currentTarget,
										"Serie",
									);
									controller.current?.invoke?.(
										"showExampleSerieTriangle",
										event.currentTarget,
									);
								}}
							>
								<img src="/Pictures/Serie_RC.PNG" alt="Sinus" />
								<span>{"Serie"}</span>
							</button>
							<button
								disabled={!controller.ready}
								type="button"
								id="control-5"
								className="img-button"
								data-action="toggleSelection"
								data-target="Parallel"
								onClick={(event) => {
									controller.current?.invoke?.(
										"toggleSelection",
										event.currentTarget,
										event.currentTarget,
										"Parallel",
									);
									controller.current?.invoke?.(
										"showExampleParallelTriangle",
										event.currentTarget,
									);
								}}
							>
								<img src="/Pictures/Parallel_RC.png" alt="Rechteck" />
								<span>{"Parallel"}</span>
							</button>
							<div
								style={{ display: "none" }}
								id="Serie"
								className="input-numbers"
							>
								<div className="comment">
									{
										"\n                                Werte mit Massvorsatz eingeben z.B. C = 100nF → Eingabe: 100n (nicht 100nF)"
									}
									<br />
									{
										"\n                                Mit einem Klick auf die Einheit das Winkels kann zwischen RAD und DEG umgestellt werden"
									}
									<br />
									<br />
								</div>
								<div className="form-row">
									<label htmlFor="phi_AC">{"Winkel φ"}</label>
									<input
										disabled={!controller.ready}
										style={{ borderColor: "var(--Winkel)" }}
										type="text"
										aria-label="Winkel φ"
										id="phi_AC"
										aria-describedby="phi_AC-unit"
									/>
									<label id="phi_AC-unit">
										<button
											disabled={!controller.ready}
											type="button"
											id="Rad-Button"
											className="RAD-Button"
											data-action="toggleRAD"
											onClick={(event) => {
												controller.current?.invoke?.(
													"toggleRAD",
													event.currentTarget,
												);
											}}
										>
											{"360°"}
										</button>
									</label>
								</div>
								<div className="form-row">
									<label htmlFor="I_AC">{"Gesamtstrom I"}</label>
									<input
										disabled={!controller.ready}
										style={{ borderColor: "var(--Strom)" }}
										type="text"
										aria-label="Gesamtstrom I"
										id="I_AC"
										aria-describedby="I_AC-unit"
									/>
									<label id="I_AC-unit">{"A [Ampere]"}</label>
								</div>
								<div className="form-row">
									<label htmlFor="R_AC">{"Wirkwiderstand R"}</label>
									<input
										disabled={!controller.ready}
										style={{ borderColor: "var(--Widerstand)" }}
										type="text"
										aria-label="Wirkwiderstand R"
										id="R_AC"
										aria-describedby="R_AC-unit"
									/>
									<label id="R_AC-unit">{"Ω[Ohm]"}</label>
								</div>
								<div className="form-row">
									<label htmlFor="Xc_AC">
										{"Blindwiderstand X"}
										<sub>{"C"}</sub>
									</label>
									<input
										disabled={!controller.ready}
										style={{ borderColor: "var(--Widerstand)" }}
										type="text"
										aria-label="Blindwiderstand XC"
										id="Xc_AC"
										aria-describedby="Xc_AC-unit"
									/>
									<label id="Xc_AC-unit">{"Ω [Ohm]"}</label>
								</div>
								<div className="form-row">
									<label htmlFor="Z_AC">{"Scheinwiderstand/Impedanz Z"}</label>
									<input
										disabled={!controller.ready}
										style={{ borderColor: "var(--Widerstand)" }}
										type="text"
										aria-label="Scheinwiderstand/Impedanz Z"
										id="Z_AC"
										aria-describedby="Z_AC-unit"
									/>
									<label id="Z_AC-unit">{"Ω [Ohm]"}</label>
								</div>
								<div className="form-row">
									<label htmlFor="C_AC">{"Kapazität C"}</label>
									<input
										disabled={!controller.ready}
										style={{ borderColor: "var(--Kapazitaet)" }}
										type="text"
										aria-label="Kapazität C"
										id="C_AC"
										aria-describedby="C_AC-unit"
									/>
									<label id="C_AC-unit">{"F [Farad]"}</label>
								</div>
								<div className="form-row">
									<label htmlFor="P_AC">{"Wirkleistung P"}</label>
									<input
										disabled={!controller.ready}
										style={{ borderColor: "var(--Leistung)" }}
										type="text"
										aria-label="Wirkleistung P"
										id="P_AC"
										aria-describedby="P_AC-unit"
									/>
									<label id="P_AC-unit">{"W [Watt]"}</label>
								</div>
								<div className="form-row">
									<label htmlFor="Qc_AC">
										{"Blindleistung Q"}
										<sub>{"C"}</sub>
									</label>
									<input
										disabled={!controller.ready}
										style={{ borderColor: "var(--Leistung)" }}
										type="text"
										aria-label="Blindleistung QC"
										id="Qc_AC"
										aria-describedby="Qc_AC-unit"
									/>
									<label id="Qc_AC-unit">{"var"}</label>
								</div>
								<div className="form-row">
									<label htmlFor="S_AC">{"Scheinleistung S"}</label>
									<input
										disabled={!controller.ready}
										style={{ borderColor: "var(--Leistung)" }}
										type="text"
										aria-label="Scheinleistung S"
										id="S_AC"
										aria-describedby="S_AC-unit"
									/>
									<label id="S_AC-unit">{"VA [Volt × Ampere]"}</label>
								</div>
								<div className="form-row">
									<label htmlFor="Ur_AC">
										{"Wirkspannung U"}
										<sub>{"R"}</sub>
									</label>
									<input
										disabled={!controller.ready}
										style={{ borderColor: "var(--Spannung)" }}
										type="text"
										aria-label="Wirkspannung UR"
										id="Ur_AC"
										aria-describedby="Ur_AC-unit"
									/>
									<label id="Ur_AC-unit">{"V [Volt]"}</label>
								</div>
								<div className="form-row">
									<label htmlFor="Uc_AC">
										{"Blindspannung U"}
										<sub>{"C"}</sub>
									</label>
									<input
										disabled={!controller.ready}
										style={{ borderColor: "var(--Spannung)" }}
										type="text"
										aria-label="Blindspannung UC"
										id="Uc_AC"
										aria-describedby="Uc_AC-unit"
									/>
									<label id="Uc_AC-unit">{"V [Volt]"}</label>
								</div>
								<div className="form-row">
									<label htmlFor="U_AC">{"Gesamtspannung U"}</label>
									<input
										disabled={!controller.ready}
										style={{ borderColor: "var(--Spannung)" }}
										type="text"
										aria-label="Gesamtspannung U"
										id="U_AC"
										aria-describedby="U_AC-unit"
									/>
									<label id="U_AC-unit">{"V [Volt]"}</label>
								</div>
								<div className="form-row">
									<label htmlFor="f_AC">{"Frequenz f"}</label>
									<input
										disabled={!controller.ready}
										style={{ borderColor: "var(--Frequenz)" }}
										type="text"
										aria-label="Frequenz f"
										id="f_AC"
										aria-describedby="f_AC-unit"
									/>
									<label id="f_AC-unit">{"Hz [Herz]"}</label>
								</div>
								<div className="form-row">
									<label htmlFor="cosphi_AC">{"Wirkfaktor cos(φ)"}</label>
									<input
										disabled={!controller.ready}
										style={{ borderColor: "var(--Daempfungsfaktor)" }}
										type="text"
										aria-label="Wirkfaktor cos(φ)"
										id="cosphi_AC"
										aria-describedby="cosphi_AC-unit"
									/>
									<label id="cosphi_AC-unit">{"1"}</label>
								</div>
								<div className="form-row">
									<label htmlFor="sinphi_AC">{"Blindfaktor sin(φ)"}</label>
									<input
										disabled={!controller.ready}
										style={{ borderColor: "var(--Daempfungsfaktor)" }}
										type="text"
										aria-label="Blindfaktor sin(φ)"
										id="sinphi_AC"
										aria-describedby="sinphi_AC-unit"
									/>
									<label id="sinphi_AC-unit">{"1"}</label>
								</div>
								<input
									disabled={!controller.ready}
									type="button"
									defaultValue="Berechnen"
									className="Button_Berechnen"
									data-action="calculateSerieAC"
									onClick={(event) => {
										controller.current?.invoke?.(
											"calculateSerieAC",
											event.currentTarget,
										);
									}}
								/>
								<h3>{"Berechnete Ergebnisse"}</h3>
								<div id="result_Serie_AC" aria-live="polite"></div>
								<div
									style={{
										display: "flex",
										flexDirection: "row",
										flexWrap: "wrap",
										alignItems: "flex-start",
										justifyContent: "center",
										gap: "40px",
										margin: "40px auto 0 auto",
										maxWidth: "900px",
									}}
								>
									<div
										style={{
											display: "flex",
											flexDirection: "column",
											alignItems: "center",
											flex: "1 1 300px",
										}}
									>
										<h3
											style={{
												color: "#fff",
												textAlign: "center",
												marginBottom: "10px",
											}}
										>
											{"Widerstandsdreieck"}
										</h3>
										<canvas
											style={{
												background: "#222",
												border: "1px solid #666",
												borderRadius: "16px",
												display: "block",
												maxWidth: "100%",
											}}
											id="phasorCanvasImpedance"
											width="500"
											height="400"
										></canvas>
									</div>
									<div
										style={{
											display: "flex",
											flexDirection: "column",
											alignItems: "center",
											justifyContent: "flex-start",
											flex: "1 1 260px",
										}}
									>
										<h3
											style={{
												color: "#fff",
												textAlign: "center",
												marginBottom: "10px",
											}}
										>
											{"Legende"}
										</h3>
										<div
											style={{
												background: "#222",
												color: "#fff",
												borderRadius: "16px",
												boxShadow: "0 2px 8px #0003",
												padding: "18px 24px",
												minWidth: "220px",
												maxWidth: "260px",
												fontFamily: "monospace",
												fontSize: "16px",
												boxSizing: "border-box",
												display: "flex",
												flexDirection: "column",
												justifyContent: "flex-start",
												width: "100%",
											}}
											id="phasorLegendImpedance"
										></div>
									</div>
								</div>
								<div
									style={{
										display: "flex",
										flexDirection: "row",
										flexWrap: "wrap",
										alignItems: "flex-start",
										justifyContent: "center",
										gap: "40px",
										margin: "40px auto 0 auto",
										maxWidth: "900px",
									}}
								>
									<div
										style={{
											display: "flex",
											flexDirection: "column",
											alignItems: "center",
											flex: "1 1 300px",
										}}
									>
										<h3
											style={{
												color: "#fff",
												textAlign: "center",
												marginBottom: "10px",
											}}
										>
											{"Spannungsdreieck"}
										</h3>
										<canvas
											style={{
												background: "#222",
												border: "1px solid #666",
												borderRadius: "16px",
												display: "block",
												maxWidth: "100%",
											}}
											id="phasorCanvasVoltage"
											width="500"
											height="400"
										></canvas>
									</div>
									<div
										style={{
											display: "flex",
											flexDirection: "column",
											alignItems: "center",
											justifyContent: "flex-start",
											flex: "1 1 260px",
										}}
									>
										<h3
											style={{
												color: "#fff",
												textAlign: "center",
												marginBottom: "10px",
											}}
										>
											{"Legende"}
										</h3>
										<div
											style={{
												background: "#222",
												color: "#fff",
												borderRadius: "16px",
												boxShadow: "0 2px 8px #0003",
												padding: "18px 24px",
												minWidth: "220px",
												maxWidth: "260px",
												fontFamily: "monospace",
												fontSize: "16px",
												boxSizing: "border-box",
												display: "flex",
												flexDirection: "column",
												justifyContent: "flex-start",
												width: "100%",
											}}
											id="phasorLegendVoltage"
										></div>
									</div>
								</div>
							</div>
							<div style={{ height: "40px" }}></div>
							<div
								style={{ display: "none" }}
								id="Parallel"
								className="input-numbers"
							>
								<div className="comment">
									{
										"\n                                Werte mit Massvorsatz eingeben z.B. C = 100nF → Eingabe: 100n (nicht 100nF)"
									}
									<br />
									{
										"\n                                Mit einem Klick auf die Einheit das Winkels kann zwischen RAD und DEG umgestellt werden"
									}
									<br />
									<br />
								</div>
								<div className="form-row">
									<label htmlFor="phi_ACp">{"Winkel φ"}</label>
									<input
										disabled={!controller.ready}
										style={{ borderColor: "var(--Winkel)" }}
										type="text"
										aria-label="Winkel φ"
										id="phi_ACp"
										aria-describedby="phi_ACp-unit"
									/>
									<label id="phi_ACp-unit">
										<button
											disabled={!controller.ready}
											type="button"
											id="Rad-Buttonp"
											className="RAD-Button"
											data-action="toggleRADp"
											onClick={(event) => {
												controller.current?.invoke?.(
													"toggleRADp",
													event.currentTarget,
												);
											}}
										>
											{"360°"}
										</button>
									</label>
								</div>
								<div className="form-row">
									<label htmlFor="Ir_ACp">
										{"Wirkstrom I"}
										<sub>{"R"}</sub>
									</label>
									<input
										disabled={!controller.ready}
										style={{ borderColor: "var(--Strom)" }}
										type="text"
										aria-label="Wirkstrom IR"
										id="Ir_ACp"
										aria-describedby="Ir_ACp-unit"
									/>
									<label id="Ir_ACp-unit">{"A [Ampere]"}</label>
								</div>
								<div className="form-row">
									<label htmlFor="Ic_ACp">
										{"Blindstrom I"}
										<sub>{"C"}</sub>
									</label>
									<input
										disabled={!controller.ready}
										style={{ borderColor: "var(--Strom)" }}
										type="text"
										aria-label="Blindstrom IC"
										id="Ic_ACp"
										aria-describedby="Ic_ACp-unit"
									/>
									<label id="Ic_ACp-unit">{"A [Ampere]"}</label>
								</div>
								<div className="form-row">
									<label htmlFor="I_ACp">{"Gesamtstrom I"}</label>
									<input
										disabled={!controller.ready}
										style={{ borderColor: "var(--Strom)" }}
										type="text"
										aria-label="Gesamtstrom I"
										id="I_ACp"
										aria-describedby="I_ACp-unit"
									/>
									<label id="I_ACp-unit">{"A [Ampere]"}</label>
								</div>
								<div className="form-row">
									<label htmlFor="G_ACp">{"Wirkleitwert G"}</label>
									<input
										disabled={!controller.ready}
										style={{ borderColor: "var(--Widerstand)" }}
										type="text"
										aria-label="Wirkleitwert G"
										id="G_ACp"
										aria-describedby="G_ACp-unit"
									/>
									<label id="G_ACp-unit">{"S [Siemens]"}</label>
								</div>
								<div className="form-row">
									<label htmlFor="Bc_ACp">
										{"Blindleitwert B"}
										<sub>{"C"}</sub>
									</label>
									<input
										disabled={!controller.ready}
										style={{ borderColor: "var(--Widerstand)" }}
										type="text"
										aria-label="Blindleitwert BC"
										id="Bc_ACp"
										aria-describedby="Bc_ACp-unit"
									/>
									<label id="Bc_ACp-unit">{"S [Siemens]"}</label>
								</div>
								<div className="form-row">
									<label htmlFor="Y_ACp">{"Scheinleitwert/Admitanz Y"}</label>
									<input
										disabled={!controller.ready}
										style={{ borderColor: "var(--Widerstand)" }}
										type="text"
										aria-label="Scheinleitwert/Admitanz Y"
										id="Y_ACp"
										aria-describedby="Y_ACp-unit"
									/>
									<label id="Y_ACp-unit">{"S [Siemens]"}</label>
								</div>
								<div className="form-row">
									<label htmlFor="C_ACp">{"Kapazität C"}</label>
									<input
										disabled={!controller.ready}
										style={{ borderColor: "var(--Kapazitaet)" }}
										type="text"
										aria-label="Kapazität C"
										id="C_ACp"
										aria-describedby="C_ACp-unit"
									/>
									<label id="C_ACp-unit">{"F [Farad]"}</label>
								</div>
								<div className="form-row">
									<label htmlFor="P_ACp">{"Wirkleistung P"}</label>
									<input
										disabled={!controller.ready}
										style={{ borderColor: "var(--Leistung)" }}
										type="text"
										aria-label="Wirkleistung P"
										id="P_ACp"
										aria-describedby="P_ACp-unit"
									/>
									<label id="P_ACp-unit">{"W [Watt]"}</label>
								</div>
								<div className="form-row">
									<label htmlFor="Q_ACp">
										{"Blindleistung Q"}
										<sub>{"C"}</sub>
									</label>
									<input
										disabled={!controller.ready}
										style={{ borderColor: "var(--Leistung)" }}
										type="text"
										aria-label="Blindleistung QC"
										id="Q_ACp"
										aria-describedby="Q_ACp-unit"
									/>
									<label id="Q_ACp-unit">{"var"}</label>
								</div>
								<div className="form-row">
									<label htmlFor="S_ACp">{"Scheinleistung S"}</label>
									<input
										disabled={!controller.ready}
										style={{ borderColor: "var(--Leistung)" }}
										type="text"
										aria-label="Scheinleistung S"
										id="S_ACp"
										aria-describedby="S_ACp-unit"
									/>
									<label id="S_ACp-unit">{"VA [Volt × Ampere]"}</label>
								</div>
								<div className="form-row">
									<label htmlFor="U_ACp">{"Spannung U"}</label>
									<input
										disabled={!controller.ready}
										style={{ borderColor: "var(--Spannung)" }}
										type="text"
										aria-label="Spannung U"
										id="U_ACp"
										aria-describedby="U_ACp-unit"
									/>
									<label id="U_ACp-unit">{"V [Volt]"}</label>
								</div>
								<div className="form-row">
									<label htmlFor="f_ACp">{"Frequenz f"}</label>
									<input
										disabled={!controller.ready}
										style={{ borderColor: "var(--Frequenz)" }}
										type="text"
										aria-label="Frequenz f"
										id="f_ACp"
										aria-describedby="f_ACp-unit"
									/>
									<label id="f_ACp-unit">{"Hz [Herz]"}</label>
								</div>
								<div className="form-row">
									<label htmlFor="cosphi_ACp">{"Wirkfaktor cos(φ)"}</label>
									<input
										disabled={!controller.ready}
										style={{ borderColor: "var(--Daempfungsfaktor)" }}
										type="text"
										aria-label="Wirkfaktor cos(φ)"
										id="cosphi_ACp"
										aria-describedby="cosphi_ACp-unit"
									/>
									<label id="cosphi_ACp-unit">{"1"}</label>
								</div>
								<div className="form-row">
									<label htmlFor="sinphi_ACp">{"Blindfaktor sin(φ)"}</label>
									<input
										disabled={!controller.ready}
										style={{ borderColor: "var(--Daempfungsfaktor)" }}
										type="text"
										aria-label="Blindfaktor sin(φ)"
										id="sinphi_ACp"
										aria-describedby="sinphi_ACp-unit"
									/>
									<label id="sinphi_ACp-unit">{"1"}</label>
								</div>
								<input
									disabled={!controller.ready}
									type="button"
									defaultValue="Berechnen"
									className="Button_Berechnen"
									data-action="calculateParallelAC"
									onClick={(event) => {
										controller.current?.invoke?.(
											"calculateParallelAC",
											event.currentTarget,
										);
									}}
								/>
								<h3>{"Berechnete Ergebnisse"}</h3>
								<div id="result_Parallel_AC" aria-live="polite"></div>
								<div
									style={{
										display: "flex",
										flexDirection: "column",
										alignItems: "center",
										flex: "1 1 300px",
									}}
								>
									<h3
										style={{
											color: "#fff",
											textAlign: "center",
											marginBottom: "10px",
										}}
									>
										{"Stromdreieck"}
									</h3>
									<canvas
										style={{
											background: "#222",
											border: "1px solid #666",
											borderRadius: "16px",
											display: "block",
											maxWidth: "100%",
										}}
										id="phasorCanvasCurrent"
										width="500"
										height="400"
									></canvas>
								</div>
								<div
									style={{
										display: "flex",
										flexDirection: "column",
										alignItems: "center",
										justifyContent: "flex-start",
										flex: "1 1 260px",
									}}
								>
									<h3
										style={{
											color: "#fff",
											textAlign: "center",
											marginBottom: "10px",
										}}
									>
										{"Legende"}
									</h3>
									<div
										style={{
											background: "#222",
											color: "#fff",
											borderRadius: "16px",
											boxShadow: "0 2px 8px #0003",
											padding: "18px 24px",
											minWidth: "220px",
											maxWidth: "260px",
											fontFamily: "monospace",
											fontSize: "16px",
											boxSizing: "border-box",
											display: "flex",
											flexDirection: "column",
											justifyContent: "flex-start",
											width: "100%",
										}}
										id="phasorLegendCurrent"
									></div>
								</div>
								<div
									style={{
										display: "flex",
										flexDirection: "column",
										alignItems: "center",
										flex: "1 1 300px",
									}}
								>
									<h3
										style={{
											color: "#fff",
											textAlign: "center",
											marginBottom: "10px",
										}}
									>
										{"Leitwertdreieck"}
									</h3>
									<canvas
										style={{
											background: "#222",
											border: "1px solid #666",
											borderRadius: "16px",
											display: "block",
											maxWidth: "100%",
										}}
										id="phasorCanvasAdmittance"
										width="500"
										height="400"
									></canvas>
								</div>
								<div
									style={{
										display: "flex",
										flexDirection: "column",
										alignItems: "center",
										justifyContent: "flex-start",
										flex: "1 1 260px",
									}}
								>
									<h3
										style={{
											color: "#fff",
											textAlign: "center",
											marginBottom: "10px",
										}}
									>
										{"Legende"}
									</h3>
									<div
										style={{
											background: "#222",
											color: "#fff",
											borderRadius: "16px",
											boxShadow: "0 2px 8px #0003",
											padding: "18px 24px",
											minWidth: "220px",
											maxWidth: "260px",
											fontFamily: "monospace",
											fontSize: "16px",
											boxSizing: "border-box",
											display: "flex",
											flexDirection: "column",
											justifyContent: "flex-start",
											width: "100%",
										}}
										id="phasorLegendAdmittance"
									></div>
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
							id="control-6"
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
							{"\n                        RC-Glied "}
							<span className="arrow" aria-hidden="true">
								<Chevron direction="down" />
							</span>
						</button>
						<div className="dropdown-content">
							<div>
								<label className="switch">
									<input
										disabled={!controller.ready}
										type="checkbox"
										aria-label="Entladen"
										id="modeSwitch"
									/>
									<span className="slider round"></span>
									<span className="switch-label">Entladen</span>
								</label>
								<br />
								<br />
								<span id="modeLabel">{"Laden"}</span>
							</div>
							<div id="circuitDiagram">
								<img
									style={{ width: "500px", height: "auto" }}
									id="circuitImage"
									src="/Pictures/RC_Charge.png"
									alt="Schaltbild RC Glied"
								/>
							</div>
							<div>
								<div className="comment">
									{
										"\n                                Werte mit Massvorsatz eingeben z.B. C = 100nF → Eingabe: 100n (nicht 100nF)"
									}
									<br />
									<br />
								</div>
								<div className="form-row">
									<label htmlFor="I_RC">{"Speisungsstrom I"}</label>
									<input
										disabled={!controller.ready}
										style={{ borderColor: "var(--Strom)" }}
										type="text"
										aria-label="Speisungsstrom I"
										id="I_RC"
										aria-describedby="I_RC-unit"
									/>
									<label id="I_RC-unit">{"A [Ampere]"}</label>
								</div>
								<div className="form-row">
									<label htmlFor="It_RC">{"Momentanstrom i(t)"}</label>
									<input
										disabled={!controller.ready}
										style={{ borderColor: "var(--Strom)" }}
										type="text"
										aria-label="Momentanstrom i(t)"
										id="It_RC"
										aria-describedby="It_RC-unit"
									/>
									<label id="It_RC-unit">{"A [Ampere]"}</label>
								</div>
								<div className="form-row">
									<label htmlFor="tau_RC">{"Zeitkonstante 𝝉"}</label>
									<input
										disabled={!controller.ready}
										style={{ borderColor: "var(--Zeitkonstante)" }}
										type="text"
										aria-label="Zeitkonstante 𝝉"
										id="tau_RC"
										aria-describedby="tau_RC-unit"
									/>
									<label id="tau_RC-unit">{"s [sekunden]"}</label>
								</div>
								<div className="form-row">
									<label htmlFor="R_RC">{"Widerstand R"}</label>
									<input
										disabled={!controller.ready}
										style={{ borderColor: "var(--Widerstand)" }}
										type="text"
										aria-label="Widerstand R"
										id="R_RC"
										aria-describedby="R_RC-unit"
									/>
									<label id="R_RC-unit">{"Ω [Ohm]"}</label>
								</div>
								<div className="form-row">
									<label htmlFor="C_RC">{"Kapazität C"}</label>
									<input
										disabled={!controller.ready}
										style={{ borderColor: "var(--Kapazitaet)" }}
										type="text"
										aria-label="Kapazität C"
										id="C_RC"
										aria-describedby="C_RC-unit"
									/>
									<label id="C_RC-unit">{"F [Farad]"}</label>
								</div>
								<div className="form-row">
									<label htmlFor="U_RC">{"Speisespannung U"}</label>
									<input
										disabled={!controller.ready}
										style={{ borderColor: "var(--Spannung)" }}
										type="text"
										aria-label="Speisespannung U"
										id="U_RC"
										aria-describedby="U_RC-unit"
									/>
									<label id="U_RC-unit">{"V [Volt]"}</label>
								</div>
								<div className="form-row">
									<label htmlFor="Ut_RC">{"Momentanspannung u(t)"}</label>
									<input
										disabled={!controller.ready}
										style={{ borderColor: "var(--Spannung)" }}
										type="text"
										aria-label="Momentanspannung u(t)"
										id="Ut_RC"
										aria-describedby="Ut_RC-unit"
									/>
									<label id="Ut_RC-unit">{"V [Volt]"}</label>
								</div>
								<div className="form-row">
									<label htmlFor="t_RC">{"Zeit t"}</label>
									<input
										disabled={!controller.ready}
										style={{ borderColor: "var(--Zeit)" }}
										type="text"
										aria-label="Zeit t"
										id="t_RC"
										aria-describedby="t_RC-unit"
									/>
									<label id="t_RC-unit">{"s [sekunden]"}</label>
								</div>
								<input
									disabled={!controller.ready}
									type="button"
									defaultValue="Berechnen"
									className="Button_Berechnen"
									data-action="calculateRC"
									onClick={(event) => {
										controller.current?.invoke?.(
											"calculateRC",
											event.currentTarget,
										);
									}}
								/>
								<h3>{"Berechnete Ergebnisse"}</h3>
								<div id="result_RC" aria-live="polite"></div>
							</div>
							<div
								style={{
									width: "100%",
									maxWidth: "1400px",
									margin: "40px auto 0 auto",
									display: "flex",
									flexDirection: "column",
									alignItems: "center",
									justifyContent: "center",
									padding: "0 2vw 60px 2vw",
									boxSizing: "border-box",
								}}
							>
								<h3
									style={{
										color: "#fff",
										marginBottom: "8px",
										textAlign: "center",
									}}
								>
									{"Spannungskurve"}
								</h3>
								<canvas
									style={{
										background: "#222",
										border: "1px solid #666",
										display: "block",
										margin: "20px auto",
										borderRadius: "5px",
										maxWidth: "100%",
									}}
									id="voltageCanvas"
									width="1300"
									height="400"
								></canvas>
								<h3
									style={{
										color: "#fff",
										margin: "40px 0 8px 0",
										textAlign: "center",
									}}
								>
									{"Stromkurve"}
								</h3>
								<canvas
									style={{
										background: "#222",
										border: "1px solid #666",
										display: "block",
										margin: "20px auto",
										borderRadius: "5px",
										maxWidth: "100%",
									}}
									id="currentCanvas"
									width="1300"
									height="400"
								></canvas>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
