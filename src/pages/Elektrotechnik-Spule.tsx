import { useCalculator } from "../lib/use-calculator";
import { createController } from "../calculations/Elektrotechnik-Spule.js";
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
				<style>{"@layer source { @scope (.page-body) {\n\n} }"}</style>
				<br />
				<h1>{"Spulen"}</h1>
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
							{"\n                        Spulenberechnungen"}
							<span className="arrow" aria-hidden="true">
								<Chevron direction="down" />
							</span>
						</button>
						<div className="dropdown-content">
							<div id="L_Inputs">
								<div className="form-row">
									<label></label>
									<button
										disabled={!controller.ready}
										type="button"
										id="control-1"
										data-action="resetInputsL"
										onClick={(event) => {
											controller.current?.invoke?.(
												"resetInputsL",
												event.currentTarget,
											);
										}}
										className="Button_Berechnen"
									>
										{"Löschen"}
									</button>
									<label></label>
								</div>
								<div className="comment">
									{
										"\n                                Werte mit Massvorsatz eingeben z.B. L = 15μH → Eingabe: 15u (nicht 15uH)"
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
									<label htmlFor="L">{"Induktivität L"}</label>
									<input
										disabled={!controller.ready}
										style={{ borderColor: "var(--Induktivitaet)" }}
										type="text"
										aria-label="Induktivität L"
										id="L"
										aria-describedby="L-unit"
									/>
									<label id="L-unit">{"H [Henry]"}</label>
								</div>
								<div className="form-row">
									<label htmlFor="ur">
										{"Permeabilitätszahl μ"}
										<sub>{"r"}</sub>
									</label>
									<input
										disabled={!controller.ready}
										style={{ borderColor: "var(--Dielektrizitaetszahl)" }}
										type="text"
										aria-label="Permeabilitätszahl μr"
										id="ur"
										aria-describedby="ur-unit"
									/>
									<label id="ur-unit">{"1"}</label>
								</div>
								<div className="form-row">
									<label htmlFor="N">{"Windungszahl N"}</label>
									<input
										disabled={!controller.ready}
										style={{ borderColor: "var(--Windungszahl)" }}
										type="text"
										aria-label="Windungszahl N"
										id="N"
										aria-describedby="N-unit"
									/>
									<label id="N-unit">{"1"}</label>
								</div>
								<div className="form-row">
									<label htmlFor="v">{"Geschwindigkeit v"}</label>
									<input
										disabled={!controller.ready}
										style={{ borderColor: "var(--Geschwindigkeit)" }}
										type="text"
										aria-label="Geschwindigkeit v"
										id="v"
										aria-describedby="v-unit"
									/>
									<label id="v-unit">{"m/s [meter/sekunde]"}</label>
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
									<label htmlFor="Phi">{"Magnetischer Fluss Φ"}</label>
									<input
										disabled={!controller.ready}
										style={{ borderColor: "var(--Mag_Fluss)" }}
										type="text"
										aria-label="Magnetischer Fluss Φ"
										id="Phi"
										aria-describedby="Phi-unit"
									/>
									<label id="Phi-unit">{"Weber [Wb]"}</label>
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
									<label htmlFor="Al">
										{"Spulenkonstante A"}
										<sub>{"L"}</sub>
									</label>
									<input
										disabled={!controller.ready}
										style={{ borderColor: "var(--Spulenkonstante)" }}
										type="text"
										aria-label="Spulenkonstante AL"
										id="Al"
										aria-describedby="Al-unit"
									/>
									<label id="Al-unit">{"Vs/A"}</label>
								</div>
								<div className="form-row">
									<label htmlFor="l">{"Länge l"}</label>
									<input
										disabled={!controller.ready}
										style={{ borderColor: "var(--Laenge)" }}
										type="text"
										aria-label="Länge l"
										id="l"
										aria-describedby="l-unit"
									/>
									<label id="l-unit">{"m [meter]"}</label>
								</div>
								<div className="form-row">
									<label htmlFor="B">{"Magnetische Flussdichte B"}</label>
									<input
										disabled={!controller.ready}
										style={{ borderColor: "var(--Mag_Flussdichte)" }}
										type="text"
										aria-label="Magnetische Flussdichte B"
										id="B"
										aria-describedby="B-unit"
									/>
									<label id="B-unit">{"T [Tesla]"}</label>
								</div>
								<div className="form-row">
									<label htmlFor="t">{"Zeit t"}</label>
									<input
										disabled={!controller.ready}
										style={{ borderColor: "var(--Zeit)" }}
										type="text"
										aria-label="Zeit t"
										id="t"
										aria-describedby="t-unit"
									/>
									<label id="t-unit">{"s [sekunden]"}</label>
								</div>
								<div className="form-row">
									<label></label>
									<button
										disabled={!controller.ready}
										type="button"
										id="control-2"
										data-action="calculateInductorParameters"
										onClick={(event) => {
											controller.current?.invoke?.(
												"calculateInductorParameters",
												event.currentTarget,
											);
										}}
										className="Button_Berechnen"
									>
										{"Berechnen"}
									</button>
									<label></label>
								</div>
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
							{"\n                        Spule an Wechselstrom "}
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
							{"\n                        RL-Glied "}
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
									style={{ maxWidth: "500px", width: "80%", height: "auto" }}
									id="circuitImage"
									src="/Pictures/RL_Charge.png"
									alt="Schaltbild RL Glied"
								/>
							</div>
							<div id="RL_Inputs">
								<div className="form-row">
									<label></label>
									<button
										disabled={!controller.ready}
										type="button"
										id="control-5"
										data-action="resetInputsRL"
										onClick={(event) => {
											controller.current?.invoke?.(
												"resetInputsRL",
												event.currentTarget,
											);
										}}
										className="Button_Berechnen"
									>
										{"Löschen"}
									</button>
									<label></label>
								</div>
								<div className="comment">
									{
										"\n                                Werte mit Massvorsatz eingeben z.B. C = 100nF → Eingabe: 100n (nicht 100nF)"
									}
									<br />
									<br />
								</div>
								<div className="form-row">
									<label htmlFor="I_RL">{"Speisungsstrom I"}</label>
									<input
										disabled={!controller.ready}
										style={{ borderColor: "var(--Strom)" }}
										type="text"
										aria-label="Speisungsstrom I"
										id="I_RL"
										aria-describedby="I_RL-unit"
									/>
									<label id="I_RL-unit">{"A [Ampere]"}</label>
								</div>
								<div className="form-row">
									<label htmlFor="It_RL">{"Momentanstrom i(t)"}</label>
									<input
										disabled={!controller.ready}
										style={{ borderColor: "var(--Strom)" }}
										type="text"
										aria-label="Momentanstrom i(t)"
										id="It_RL"
										aria-describedby="It_RL-unit"
									/>
									<label id="It_RL-unit">{"A [Ampere]"}</label>
								</div>
								<div className="form-row">
									<label htmlFor="R_RL">{"Widerstand R"}</label>
									<input
										disabled={!controller.ready}
										style={{ borderColor: "var(--Widerstand)" }}
										type="text"
										aria-label="Widerstand R"
										id="R_RL"
										aria-describedby="R_RL-unit"
									/>
									<label id="R_RL-unit">{"Ω [Ohm]"}</label>
								</div>
								<div className="form-row">
									<label htmlFor="L_RL">{"Induktiviät L"}</label>
									<input
										disabled={!controller.ready}
										style={{ borderColor: "var(--Induktivitaet)" }}
										type="text"
										aria-label="Induktiviät L"
										id="L_RL"
										aria-describedby="L_RL-unit"
									/>
									<label id="L_RL-unit">{"H [Henry]"}</label>
								</div>
								<div className="form-row">
									<label htmlFor="U_RL">{"Speisespannung U"}</label>
									<input
										disabled={!controller.ready}
										style={{ borderColor: "var(--Spannung)" }}
										type="text"
										aria-label="Speisespannung U"
										id="U_RL"
										aria-describedby="U_RL-unit"
									/>
									<label id="U_RL-unit">{"V [Volt]"}</label>
								</div>
								<div className="form-row">
									<label htmlFor="Ut_RL">{"Momentanspannung u(t)"}</label>
									<input
										disabled={!controller.ready}
										style={{ borderColor: "var(--Spannung)" }}
										type="text"
										aria-label="Momentanspannung u(t)"
										id="Ut_RL"
										aria-describedby="Ut_RL-unit"
									/>
									<label id="Ut_RL-unit">{"V [Volt]"}</label>
								</div>
								<div className="form-row">
									<label htmlFor="t_RL">{"Zeit t"}</label>
									<input
										disabled={!controller.ready}
										style={{ borderColor: "var(--Zeit)" }}
										type="text"
										aria-label="Zeit t"
										id="t_RL"
										aria-describedby="t_RL-unit"
									/>
									<label id="t_RL-unit">{"s [sekunden]"}</label>
								</div>
								<div className="form-row">
									<label htmlFor="tau_RL">{"Zeitkonstante 𝝉"}</label>
									<input
										disabled={!controller.ready}
										style={{ borderColor: "var(--Zeit)" }}
										type="text"
										aria-label="Zeitkonstante 𝝉"
										id="tau_RL"
										aria-describedby="tau_RL-unit"
									/>
									<label id="tau_RL-unit">{"s [sekunden]"}</label>
								</div>
								<div className="form-row">
									<label></label>
									<button
										disabled={!controller.ready}
										type="button"
										id="control-6"
										data-action="calculateRL"
										onClick={(event) => {
											controller.current?.invoke?.(
												"calculateRL",
												event.currentTarget,
											);
										}}
										className="Button_Berechnen"
									>
										{"Berechnen"}
									</button>
									<label></label>
								</div>
								<h3>{"Berechnete Ergebnisse"}</h3>
								<div id="result_RL" aria-live="polite"></div>
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
