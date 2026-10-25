import { useCalculator } from "../lib/use-calculator";
import { createController } from "../calculations/Elektrotechnik-Kondensator.js";
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
						{"\n                        Kondensator berechnungen"}
						<span className="arrow">{"▼"}</span>
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
								<label>{"Strom I"}</label>
								<input
									disabled={!controller.ready}
									style={{ borderColor: "var(--Strom)" }}
									type="text"
									aria-label="Strom I"
									id="I"
								/>
								<label>{"A [Ampere]"}</label>
							</div>
							<div className="form-row">
								<label>{"Kraft F"}</label>
								<input
									disabled={!controller.ready}
									style={{ borderColor: "var(--Kraft)" }}
									type="text"
									aria-label="Kraft F"
									id="F"
								/>
								<label>{"N [Newton]"}</label>
							</div>
							<div className="form-row">
								<label>{"Feldstärke E"}</label>
								<input
									disabled={!controller.ready}
									style={{ borderColor: "var(--Feldstaerke)" }}
									type="text"
									aria-label="Feldstärke E"
									id="E"
								/>
								<label>{"V/m [Volt / meter]"}</label>
							</div>
							<div className="form-row">
								<label>
									{"Dielektrizitätszahl ε"}
									<sub>{"r"}</sub>
								</label>
								<input
									disabled={!controller.ready}
									style={{ borderColor: "var(--Dielektrizitaetszahl)" }}
									type="text"
									aria-label="Dielektrizitätszahl εr"
									id="er"
								/>
								<label>{"1"}</label>
							</div>
							<div className="form-row">
								<label>{"Fläche A"}</label>
								<input
									disabled={!controller.ready}
									style={{ borderColor: "var(--Flaeche)" }}
									type="text"
									aria-label="Fläche A"
									id="A"
								/>
								<label>
									{"m"}
									<sup>{"2"}</sup>
									{" [Quadratmeter]"}
								</label>
							</div>
							<div className="form-row">
								<label>{"Plattendurchmesser D"}</label>
								<input
									disabled={!controller.ready}
									style={{ borderColor: "var(--Flaeche)" }}
									type="text"
									aria-label="Plattendurchmesser D"
									id="d"
								/>
								<label>{"m [meter]"}</label>
							</div>
							<div className="form-row">
								<label>{"Elektronenabstand s"}</label>
								<input
									disabled={!controller.ready}
									style={{ borderColor: "var(--Elektronenabstand)" }}
									type="text"
									aria-label="Elektronenabstand s"
									id="s"
								/>
								<label>{"m [meter]"}</label>
							</div>
							<div className="form-row">
								<label>{"Kapazität C"}</label>
								<input
									disabled={!controller.ready}
									style={{ borderColor: "var(--Kapazitaet)" }}
									type="text"
									aria-label="Kapazität C"
									id="C"
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
									id="U"
								/>
								<label>{"V [Volt]"}</label>
							</div>
							<div className="form-row">
								<label>{"Energie W"}</label>
								<input
									disabled={!controller.ready}
									style={{ borderColor: "var(--Energie)" }}
									type="text"
									aria-label="Energie W"
									id="W"
								/>
								<label>{"J [Joule]"}</label>
							</div>
							<div className="form-row">
								<label>{"Ladung Q"}</label>
								<input
									disabled={!controller.ready}
									style={{ borderColor: "var(--Ladung)" }}
									type="text"
									aria-label="Ladung Q"
									id="Q"
								/>
								<label>{"C [Coulomb]"}</label>
							</div>
							<div className="form-row">
								<label>{"Zeit"}</label>
								<input
									disabled={!controller.ready}
									style={{ borderColor: "var(--Zeit)" }}
									type="text"
									aria-label="Zeit"
									id="t"
								/>
								<label>{"s [sekunden]"}</label>
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
						<span className="arrow">{"▼"}</span>
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
								<label>{"Winkel φ"}</label>
								<input
									disabled={!controller.ready}
									style={{ borderColor: "var(--Winkel)" }}
									type="text"
									aria-label="Winkel φ"
									id="phi_AC"
								/>
								<label>
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
								<label>{"Gesamtstrom I"}</label>
								<input
									disabled={!controller.ready}
									style={{ borderColor: "var(--Strom)" }}
									type="text"
									aria-label="Gesamtstrom I"
									id="I_AC"
								/>
								<label>{"A [Ampere]"}</label>
							</div>
							<div className="form-row">
								<label>{"Wirkwiderstand R"}</label>
								<input
									disabled={!controller.ready}
									style={{ borderColor: "var(--Widerstand)" }}
									type="text"
									aria-label="Wirkwiderstand R"
									id="R_AC"
								/>
								<label>{"Ω[Ohm]"}</label>
							</div>
							<div className="form-row">
								<label>
									{"Blindwiderstand X"}
									<sub>{"C"}</sub>
								</label>
								<input
									disabled={!controller.ready}
									style={{ borderColor: "var(--Widerstand)" }}
									type="text"
									aria-label="Blindwiderstand XC"
									id="Xc_AC"
								/>
								<label>{"Ω [Ohm]"}</label>
							</div>
							<div className="form-row">
								<label>{"Scheinwiderstand/Impedanz Z"}</label>
								<input
									disabled={!controller.ready}
									style={{ borderColor: "var(--Widerstand)" }}
									type="text"
									aria-label="Scheinwiderstand/Impedanz Z"
									id="Z_AC"
								/>
								<label>{"Ω [Ohm]"}</label>
							</div>
							<div className="form-row">
								<label>{"Kapazität C"}</label>
								<input
									disabled={!controller.ready}
									style={{ borderColor: "var(--Kapazitaet)" }}
									type="text"
									aria-label="Kapazität C"
									id="C_AC"
								/>
								<label>{"F [Farad]"}</label>
							</div>
							<div className="form-row">
								<label>{"Wirkleistung P"}</label>
								<input
									disabled={!controller.ready}
									style={{ borderColor: "var(--Leistung)" }}
									type="text"
									aria-label="Wirkleistung P"
									id="P_AC"
								/>
								<label>{"W [Watt]"}</label>
							</div>
							<div className="form-row">
								<label>
									{"Blindleistung Q"}
									<sub>{"C"}</sub>
								</label>
								<input
									disabled={!controller.ready}
									style={{ borderColor: "var(--Leistung)" }}
									type="text"
									aria-label="Blindleistung QC"
									id="Qc_AC"
								/>
								<label>{"var"}</label>
							</div>
							<div className="form-row">
								<label>{"Scheinleistung S"}</label>
								<input
									disabled={!controller.ready}
									style={{ borderColor: "var(--Leistung)" }}
									type="text"
									aria-label="Scheinleistung S"
									id="S_AC"
								/>
								<label>{"VA [Volt × Ampere]"}</label>
							</div>
							<div className="form-row">
								<label>
									{"Wirkspannung U"}
									<sub>{"R"}</sub>
								</label>
								<input
									disabled={!controller.ready}
									style={{ borderColor: "var(--Spannung)" }}
									type="text"
									aria-label="Wirkspannung UR"
									id="Ur_AC"
								/>
								<label>{"V [Volt]"}</label>
							</div>
							<div className="form-row">
								<label>
									{"Blindspannung U"}
									<sub>{"C"}</sub>
								</label>
								<input
									disabled={!controller.ready}
									style={{ borderColor: "var(--Spannung)" }}
									type="text"
									aria-label="Blindspannung UC"
									id="Uc_AC"
								/>
								<label>{"V [Volt]"}</label>
							</div>
							<div className="form-row">
								<label>{"Gesamtspannung U"}</label>
								<input
									disabled={!controller.ready}
									style={{ borderColor: "var(--Spannung)" }}
									type="text"
									aria-label="Gesamtspannung U"
									id="U_AC"
								/>
								<label>{"V [Volt]"}</label>
							</div>
							<div className="form-row">
								<label>{"Frequenz f"}</label>
								<input
									disabled={!controller.ready}
									style={{ borderColor: "var(--Frequenz)" }}
									type="text"
									aria-label="Frequenz f"
									id="f_AC"
								/>
								<label>{"Hz [Herz]"}</label>
							</div>
							<div className="form-row">
								<label>{"Wirkfaktor cos(φ)"}</label>
								<input
									disabled={!controller.ready}
									style={{ borderColor: "var(--Daempfungsfaktor)" }}
									type="text"
									aria-label="Wirkfaktor cos(φ)"
									id="cosphi_AC"
								/>
								<label>{"1"}</label>
							</div>
							<div className="form-row">
								<label>{"Blindfaktor sin(φ)"}</label>
								<input
									disabled={!controller.ready}
									style={{ borderColor: "var(--Daempfungsfaktor)" }}
									type="text"
									aria-label="Blindfaktor sin(φ)"
									id="sinphi_AC"
								/>
								<label>{"1"}</label>
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
								<label>{"Winkel φ"}</label>
								<input
									disabled={!controller.ready}
									style={{ borderColor: "var(--Winkel)" }}
									type="text"
									aria-label="Winkel φ"
									id="phi_ACp"
								/>
								<label>
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
								<label>
									{"Wirkstrom I"}
									<sub>{"R"}</sub>
								</label>
								<input
									disabled={!controller.ready}
									style={{ borderColor: "var(--Strom)" }}
									type="text"
									aria-label="Wirkstrom IR"
									id="Ir_ACp"
								/>
								<label>{"A [Ampere]"}</label>
							</div>
							<div className="form-row">
								<label>
									{"Blindstrom I"}
									<sub>{"C"}</sub>
								</label>
								<input
									disabled={!controller.ready}
									style={{ borderColor: "var(--Strom)" }}
									type="text"
									aria-label="Blindstrom IC"
									id="Ic_ACp"
								/>
								<label>{"A [Ampere]"}</label>
							</div>
							<div className="form-row">
								<label>{"Gesamtstrom I"}</label>
								<input
									disabled={!controller.ready}
									style={{ borderColor: "var(--Strom)" }}
									type="text"
									aria-label="Gesamtstrom I"
									id="I_ACp"
								/>
								<label>{"A [Ampere]"}</label>
							</div>
							<div className="form-row">
								<label>{"Wirkleitwert G"}</label>
								<input
									disabled={!controller.ready}
									style={{ borderColor: "var(--Widerstand)" }}
									type="text"
									aria-label="Wirkleitwert G"
									id="G_ACp"
								/>
								<label>{"S [Siemens]"}</label>
							</div>
							<div className="form-row">
								<label>
									{"Blindleitwert B"}
									<sub>{"C"}</sub>
								</label>
								<input
									disabled={!controller.ready}
									style={{ borderColor: "var(--Widerstand)" }}
									type="text"
									aria-label="Blindleitwert BC"
									id="Bc_ACp"
								/>
								<label>{"S [Siemens]"}</label>
							</div>
							<div className="form-row">
								<label>{"Scheinleitwert/Admitanz Y"}</label>
								<input
									disabled={!controller.ready}
									style={{ borderColor: "var(--Widerstand)" }}
									type="text"
									aria-label="Scheinleitwert/Admitanz Y"
									id="Y_ACp"
								/>
								<label>{"S [Siemens]"}</label>
							</div>
							<div className="form-row">
								<label>{"Kapazität C"}</label>
								<input
									disabled={!controller.ready}
									style={{ borderColor: "var(--Kapazitaet)" }}
									type="text"
									aria-label="Kapazität C"
									id="C_ACp"
								/>
								<label>{"F [Farad]"}</label>
							</div>
							<div className="form-row">
								<label>{"Wirkleistung P"}</label>
								<input
									disabled={!controller.ready}
									style={{ borderColor: "var(--Leistung)" }}
									type="text"
									aria-label="Wirkleistung P"
									id="P_ACp"
								/>
								<label>{"W [Watt]"}</label>
							</div>
							<div className="form-row">
								<label>
									{"Blindleistung Q"}
									<sub>{"C"}</sub>
								</label>
								<input
									disabled={!controller.ready}
									style={{ borderColor: "var(--Leistung)" }}
									type="text"
									aria-label="Blindleistung QC"
									id="Q_ACp"
								/>
								<label>{"var"}</label>
							</div>
							<div className="form-row">
								<label>{"Scheinleistung S"}</label>
								<input
									disabled={!controller.ready}
									style={{ borderColor: "var(--Leistung)" }}
									type="text"
									aria-label="Scheinleistung S"
									id="S_ACp"
								/>
								<label>{"VA [Volt × Ampere]"}</label>
							</div>
							<div className="form-row">
								<label>{"Spannung U"}</label>
								<input
									disabled={!controller.ready}
									style={{ borderColor: "var(--Spannung)" }}
									type="text"
									aria-label="Spannung U"
									id="U_ACp"
								/>
								<label>{"V [Volt]"}</label>
							</div>
							<div className="form-row">
								<label>{"Frequenz f"}</label>
								<input
									disabled={!controller.ready}
									style={{ borderColor: "var(--Frequenz)" }}
									type="text"
									aria-label="Frequenz f"
									id="f_ACp"
								/>
								<label>{"Hz [Herz]"}</label>
							</div>
							<div className="form-row">
								<label>{"Wirkfaktor cos(φ)"}</label>
								<input
									disabled={!controller.ready}
									style={{ borderColor: "var(--Daempfungsfaktor)" }}
									type="text"
									aria-label="Wirkfaktor cos(φ)"
									id="cosphi_ACp"
								/>
								<label>{"1"}</label>
							</div>
							<div className="form-row">
								<label>{"Blindfaktor sin(φ)"}</label>
								<input
									disabled={!controller.ready}
									style={{ borderColor: "var(--Daempfungsfaktor)" }}
									type="text"
									aria-label="Blindfaktor sin(φ)"
									id="sinphi_ACp"
								/>
								<label>{"1"}</label>
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
						<span className="arrow">{"▼"}</span>
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
								<label>{"Speisungsstrom I"}</label>
								<input
									disabled={!controller.ready}
									style={{ borderColor: "var(--Strom)" }}
									type="text"
									aria-label="Speisungsstrom I"
									id="I_RC"
								/>
								<label>{"A [Ampere]"}</label>
							</div>
							<div className="form-row">
								<label>{"Momentanstrom i(t)"}</label>
								<input
									disabled={!controller.ready}
									style={{ borderColor: "var(--Strom)" }}
									type="text"
									aria-label="Momentanstrom i(t)"
									id="It_RC"
								/>
								<label>{"A [Ampere]"}</label>
							</div>
							<div className="form-row">
								<label>{"Zeitkonstante 𝝉"}</label>
								<input
									disabled={!controller.ready}
									style={{ borderColor: "var(--Zeitkonstante)" }}
									type="text"
									aria-label="Zeitkonstante 𝝉"
									id="tau_RC"
								/>
								<label>{"s [sekunden]"}</label>
							</div>
							<div className="form-row">
								<label>{"Widerstand R"}</label>
								<input
									disabled={!controller.ready}
									style={{ borderColor: "var(--Widerstand)" }}
									type="text"
									aria-label="Widerstand R"
									id="R_RC"
								/>
								<label>{"Ω [Ohm]"}</label>
							</div>
							<div className="form-row">
								<label>{"Kapazität C"}</label>
								<input
									disabled={!controller.ready}
									style={{ borderColor: "var(--Kapazitaet)" }}
									type="text"
									aria-label="Kapazität C"
									id="C_RC"
								/>
								<label>{"F [Farad]"}</label>
							</div>
							<div className="form-row">
								<label>{"Speisespannung U"}</label>
								<input
									disabled={!controller.ready}
									style={{ borderColor: "var(--Spannung)" }}
									type="text"
									aria-label="Speisespannung U"
									id="U_RC"
								/>
								<label>{"V [Volt]"}</label>
							</div>
							<div className="form-row">
								<label>{"Momentanspannung u(t)"}</label>
								<input
									disabled={!controller.ready}
									style={{ borderColor: "var(--Spannung)" }}
									type="text"
									aria-label="Momentanspannung u(t)"
									id="Ut_RC"
								/>
								<label>{"V [Volt]"}</label>
							</div>
							<div className="form-row">
								<label>{"Zeit t"}</label>
								<input
									disabled={!controller.ready}
									style={{ borderColor: "var(--Zeit)" }}
									type="text"
									aria-label="Zeit t"
									id="t_RC"
								/>
								<label>{"s [sekunden]"}</label>
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
	);
}
