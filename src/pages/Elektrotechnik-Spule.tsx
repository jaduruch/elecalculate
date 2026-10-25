import { useCalculator } from "../lib/use-calculator";
import { createController } from "../calculations/Elektrotechnik-Spule.js";
export default function Page() {
	const controller = useCalculator(createController);
	return (
		<div
			ref={controller.root}
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
						{"\n                        Spulen berechnungen"}
						<span className="arrow">{"▼"}</span>
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
								<label>{"Induktivität L"}</label>
								<input
									disabled={!controller.ready}
									style={{ borderColor: "var(--Induktivitaet)" }}
									type="text"
									aria-label="Induktivität L"
									id="L"
								/>
								<label>{"H [Henry]"}</label>
							</div>
							<div className="form-row">
								<label>
									{"Permeabilitätszahl μ"}
									<sub>{"r"}</sub>
								</label>
								<input
									disabled={!controller.ready}
									style={{ borderColor: "var(--Dielektrizitaetszahl)" }}
									type="text"
									aria-label="Permeabilitätszahl μr"
									id="ur"
								/>
								<label>{"1"}</label>
							</div>
							<div className="form-row">
								<label>{"Windungszahl N"}</label>
								<input
									disabled={!controller.ready}
									style={{ borderColor: "var(--Windungszahl)" }}
									type="text"
									aria-label="Windungszahl N"
									id="N"
								/>
								<label>{"1"}</label>
							</div>
							<div className="form-row">
								<label>{"Geschwindigkeit v"}</label>
								<input
									disabled={!controller.ready}
									style={{ borderColor: "var(--Geschwindigkeit)" }}
									type="text"
									aria-label="Geschwindigkeit v"
									id="v"
								/>
								<label>{"m/s [meter/sekunde]"}</label>
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
								<label>{"Magnetischer Fluss Φ"}</label>
								<input
									disabled={!controller.ready}
									style={{ borderColor: "var(--Mag_Fluss)" }}
									type="text"
									aria-label="Magnetischer Fluss Φ"
									id="Phi"
								/>
								<label>{"Weber [Wb]"}</label>
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
								<label>
									{"Spulenkonstante A"}
									<sub>{"L"}</sub>
								</label>
								<input
									disabled={!controller.ready}
									style={{ borderColor: "var(--Spulenkonstante)" }}
									type="text"
									aria-label="Spulenkonstante AL"
									id="Al"
								/>
								<label>{"Vs/A"}</label>
							</div>
							<div className="form-row">
								<label>{"Länge l"}</label>
								<input
									disabled={!controller.ready}
									style={{ borderColor: "var(--Laenge)" }}
									type="text"
									aria-label="Länge l"
									id="l"
								/>
								<label>{"m [meter]"}</label>
							</div>
							<div className="form-row">
								<label>{"Magnetische Flussdichte B"}</label>
								<input
									disabled={!controller.ready}
									style={{ borderColor: "var(--Mag_Flussdichte)" }}
									type="text"
									aria-label="Magnetische Flussdichte B"
									id="B"
								/>
								<label>{"T [Tesla]"}</label>
							</div>
							<div className="form-row">
								<label>{"Zeit t"}</label>
								<input
									disabled={!controller.ready}
									style={{ borderColor: "var(--Zeit)" }}
									type="text"
									aria-label="Zeit t"
									id="t"
								/>
								<label>{"s [sekunden]"}</label>
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
								<label>{"Speisungsstrom I"}</label>
								<input
									disabled={!controller.ready}
									style={{ borderColor: "var(--Strom)" }}
									type="text"
									aria-label="Speisungsstrom I"
									id="I_RL"
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
									id="It_RL"
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
									id="R_RL"
								/>
								<label>{"Ω [Ohm]"}</label>
							</div>
							<div className="form-row">
								<label>{"Induktiviät L"}</label>
								<input
									disabled={!controller.ready}
									style={{ borderColor: "var(--Induktivitaet)" }}
									type="text"
									aria-label="Induktiviät L"
									id="L_RL"
								/>
								<label>{"H [Henry]"}</label>
							</div>
							<div className="form-row">
								<label>{"Speisespannung U"}</label>
								<input
									disabled={!controller.ready}
									style={{ borderColor: "var(--Spannung)" }}
									type="text"
									aria-label="Speisespannung U"
									id="U_RL"
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
									id="Ut_RL"
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
									id="t_RL"
								/>
								<label>{"s [sekunden]"}</label>
							</div>
							<div className="form-row">
								<label>{"Zeitkonstante 𝝉"}</label>
								<input
									disabled={!controller.ready}
									style={{ borderColor: "var(--Zeit)" }}
									type="text"
									aria-label="Zeitkonstante 𝝉"
									id="tau_RL"
								/>
								<label>{"s [sekunden]"}</label>
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
	);
}
