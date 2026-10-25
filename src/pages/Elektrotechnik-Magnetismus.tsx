import { useCalculator } from "../lib/use-calculator";
import { createController } from "../calculations/Elektrotechnik-Magnetismus.js";
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
				<div>
					<h1>{"Magnetismus"}</h1>
				</div>
				<div className="input-numbers">
					<div className="form-row">
						<label></label>
						<button
							disabled={!controller.ready}
							type="button"
							id="control-0"
							data-action="resetInputs"
							onClick={(event) => {
								controller.current?.invoke?.(
									"resetInputs",
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
							"\n                    Werte mit Massvorsatz eingeben z.B. I = 5mA → Eingabe: 5m (nicht 5mA)"
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
						<label>{"Feldstärke H"}</label>
						<input
							disabled={!controller.ready}
							style={{ borderColor: "var(--Feldstaerke)" }}
							type="text"
							aria-label="Feldstärke H"
							id="H"
						/>
						<label>{"A/m [Ampere/meter]"}</label>
					</div>
					<div className="form-row">
						<label>{"Durchflutung Θ"}</label>
						<input
							disabled={!controller.ready}
							style={{ borderColor: "var(--Durchflutung)" }}
							type="text"
							aria-label="Durchflutung Θ"
							id="Theta"
						/>
						<label>{"A [Ampere]"}</label>
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
						<label>
							{"Mag. Widerstand R"}
							<sub>{"m"}</sub>
						</label>
						<input
							disabled={!controller.ready}
							style={{ borderColor: "var(--Mag_Widerstand)" }}
							type="text"
							aria-label="Mag. Widerstand Rm"
							id="Rm"
						/>
						<label>{"A/Vs [Ampere/Volt sek.]"}</label>
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
						<label>{"Mag. Fluss Φ"}</label>
						<input
							disabled={!controller.ready}
							style={{ borderColor: "var(--Mag_Fluss)" }}
							type="text"
							aria-label="Mag. Fluss Φ"
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
						<label>{"Mag. Flussdichte B"}</label>
						<input
							disabled={!controller.ready}
							style={{ borderColor: "var(--Mag_Flussdichte)" }}
							type="text"
							aria-label="Mag. Flussdichte B"
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
							id="control-1"
							data-action="calculateParameters"
							onClick={(event) => {
								controller.current?.invoke?.(
									"calculateParameters",
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
		</>
	);
}
