import { useCalculator } from "../lib/use-calculator";
import { createController } from "../calculations/Elektrotechnik-Transformator.js";
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
					<h1>{"Transformator"}</h1>
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
						{"\n                    Werte mit Massvorsatz eingeben z.B. I"}
						<sub>{"2"}</sub>
						{" = 5mA → Eingabe: 5m (nicht 5mA)"}
						<br />
						<br />
					</div>
					<div className="form-row">
						<label>
							{"Strom I"}
							<sub>{"1"}</sub>
						</label>
						<input
							disabled={!controller.ready}
							style={{ borderColor: "var(--Strom)" }}
							type="text"
							aria-label="Strom I1"
							id="I1"
						/>
						<label>{"A [Ampere]"}</label>
					</div>
					<div className="form-row">
						<label>
							{"Strom I"}
							<sub>{"2"}</sub>
						</label>
						<input
							disabled={!controller.ready}
							style={{ borderColor: "var(--Strom)" }}
							type="text"
							aria-label="Strom I2"
							id="I2"
						/>
						<label>{"A [Ampere]"}</label>
					</div>
					<div className="form-row">
						<label>
							{"Widerstand R"}
							<sub>{"1"}</sub>
						</label>
						<input
							disabled={!controller.ready}
							style={{ borderColor: "var(--Widerstand)" }}
							type="text"
							aria-label="Widerstand R1"
							id="R1"
						/>
						<label>{"Ω [Ohm]"}</label>
					</div>
					<div className="form-row">
						<label>
							{"Widerstand R"}
							<sub>{"2"}</sub>
						</label>
						<input
							disabled={!controller.ready}
							style={{ borderColor: "var(--Widerstand)" }}
							type="text"
							aria-label="Widerstand R2"
							id="R2"
						/>
						<label>{"Ω [Ohm]"}</label>
					</div>
					<div className="form-row">
						<label>
							{"Leistung P"}
							<sub>{"1"}</sub>
						</label>
						<input
							disabled={!controller.ready}
							style={{ borderColor: "var(--Leistung)" }}
							type="text"
							aria-label="Leistung P1"
							id="P1"
						/>
						<label>{"W [Watt]"}</label>
					</div>
					<div className="form-row">
						<label>
							{"Leistung P"}
							<sub>{"2"}</sub>
						</label>
						<input
							disabled={!controller.ready}
							style={{ borderColor: "var(--Leistung)" }}
							type="text"
							aria-label="Leistung P2"
							id="P2"
						/>
						<label>{"W [Watt]"}</label>
					</div>
					<div className="form-row">
						<label>
							{"Windungszahl N"}
							<sub>{"1"}</sub>
						</label>
						<input
							disabled={!controller.ready}
							style={{ borderColor: "var(--Windungszahl)" }}
							type="text"
							aria-label="Windungszahl N1"
							id="N1"
						/>
						<label>{"1"}</label>
					</div>
					<div className="form-row">
						<label>
							{"Windungszahl N"}
							<sub>{"2"}</sub>
						</label>
						<input
							disabled={!controller.ready}
							style={{ borderColor: "var(--Windungszahl)" }}
							type="text"
							aria-label="Windungszahl N2"
							id="N2"
						/>
						<label>{"1"}</label>
					</div>
					<div className="form-row">
						<label>{"Kapazität C1"}</label>
						<input
							disabled={!controller.ready}
							style={{ borderColor: "var(--Kapazitaet)" }}
							type="text"
							aria-label="Kapazität C1"
							id="C1"
						/>
						<label>{"F [Farad]"}</label>
					</div>
					<div className="form-row">
						<label>{"Kapazität C2"}</label>
						<input
							disabled={!controller.ready}
							style={{ borderColor: "var(--Kapazitaet)" }}
							type="text"
							aria-label="Kapazität C2"
							id="C2"
						/>
						<label>{"F [Farad]"}</label>
					</div>
					<div className="form-row">
						<label>
							{"Spannung U"}
							<sub>{"1"}</sub>
						</label>
						<input
							disabled={!controller.ready}
							style={{ borderColor: "var(--Spannung)" }}
							type="text"
							aria-label="Spannung U1"
							id="U1"
						/>
						<label>{"V [Volt]"}</label>
					</div>
					<div className="form-row">
						<label>
							{"Spannung U"}
							<sub>{"2"}</sub>
						</label>
						<input
							disabled={!controller.ready}
							style={{ borderColor: "var(--Spannung)" }}
							type="text"
							aria-label="Spannung U2"
							id="U2"
						/>
						<label>{"V [Volt]"}</label>
					</div>
					<div className="form-row">
						<label>{"Übersetzungsverhältnis ü"}</label>
						<input
							disabled={!controller.ready}
							style={{ borderColor: "var(--Verstaerkungsfaktor)" }}
							type="text"
							aria-label="Übersetzungsverhältnis ü"
							id="ue"
						/>
						<label>{"1"}</label>
					</div>
					<div className="form-row">
						<label>{"Wirkungsgrad η"}</label>
						<input
							disabled={!controller.ready}
							style={{ borderColor: "var(--Daempfungsfaktor)" }}
							type="text"
							aria-label="Wirkungsgrad η"
							id="eta"
						/>
						<label>{"1"}</label>
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
				<h3>{"Resultate"}</h3>
				<div id="result" aria-live="polite"></div>
				<br />
				<br />
			</div>
		</>
	);
}
