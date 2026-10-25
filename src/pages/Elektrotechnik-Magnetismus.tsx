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
						<label htmlFor="H">{"Feldstärke H"}</label>
						<input
							disabled={!controller.ready}
							style={{ borderColor: "var(--Feldstaerke)" }}
							type="text"
							aria-label="Feldstärke H"
							id="H"
							aria-describedby="H-unit"
						/>
						<label id="H-unit">{"A/m [Ampere/meter]"}</label>
					</div>
					<div className="form-row">
						<label htmlFor="Theta">{"Durchflutung Θ"}</label>
						<input
							disabled={!controller.ready}
							style={{ borderColor: "var(--Durchflutung)" }}
							type="text"
							aria-label="Durchflutung Θ"
							id="Theta"
							aria-describedby="Theta-unit"
						/>
						<label id="Theta-unit">{"A [Ampere]"}</label>
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
						<label htmlFor="Rm">
							{"Mag. Widerstand R"}
							<sub>{"m"}</sub>
						</label>
						<input
							disabled={!controller.ready}
							style={{ borderColor: "var(--Mag_Widerstand)" }}
							type="text"
							aria-label="Mag. Widerstand Rm"
							id="Rm"
							aria-describedby="Rm-unit"
						/>
						<label id="Rm-unit">{"A/Vs [Ampere/Volt sek.]"}</label>
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
						<label htmlFor="Phi">{"Mag. Fluss Φ"}</label>
						<input
							disabled={!controller.ready}
							style={{ borderColor: "var(--Mag_Fluss)" }}
							type="text"
							aria-label="Mag. Fluss Φ"
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
						<label htmlFor="B">{"Mag. Flussdichte B"}</label>
						<input
							disabled={!controller.ready}
							style={{ borderColor: "var(--Mag_Flussdichte)" }}
							type="text"
							aria-label="Mag. Flussdichte B"
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
