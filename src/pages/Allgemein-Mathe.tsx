import { useCalculator } from "../lib/use-calculator";
import { createController } from "../calculations/Allgemein-Mathe.js";
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
				<div>
					<h1>
						<br />
						{"Mathe"}
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
							{"\n                        Kreisberechnung"}
							<span className="arrow" aria-hidden="true">
								<Chevron direction="down" />
							</span>
						</button>
						<div className="dropdown-content">
							<div>
								<div className="comment">
									{
										"\n                                Werte mit Massvorsatz eingeben z.B. d = 5mm → Eingabe: 5m (nicht 5mm)"
									}
									<br />
									<br />
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
									<label htmlFor="d">{"Durchmesser d"}</label>
									<input
										disabled={!controller.ready}
										style={{ borderColor: "var(--Laenge)" }}
										type="text"
										aria-label="Durchmesser d"
										id="d"
										aria-describedby="d-unit"
									/>
									<label id="d-unit">{"m [meter]"}</label>
								</div>
								<input
									disabled={!controller.ready}
									type="button"
									defaultValue="Berechnen"
									className="Button_Berechnen"
									data-action="calculateKreis"
									onClick={(event) => {
										controller.current?.invoke?.(
											"calculateKreis",
											event.currentTarget,
										);
									}}
								/>
								<h3>{"Berechnete Ergebnisse"}</h3>
								<div id="result_Kreis" aria-live="polite"></div>
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
							{"\n                        Dreiecksberechnung "}
							<span className="arrow" aria-hidden="true">
								<Chevron direction="down" />
							</span>
						</button>
						<div className="dropdown-content">
							{
								" \n                        In dieser Version nicht umgesetzt.\n                    "
							}
						</div>
					</div>
				</div>
				<br />
			</div>
		</>
	);
}
