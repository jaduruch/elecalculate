import { useCalculator } from "../lib/use-calculator";
import { createController } from "../calculations/Allgemein-Mathe.js";
export default function Page() {
	const controller = useCalculator(createController);
	return (
		<div ref={controller.root} className="page-body ">
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
						type="button"
						id="control-0"
						className="dropdown-header"
						data-action="toggleDropdown"
						onClick={(event) => {
							controller.current?.handlers.toggleDropdown?.(
								event.currentTarget,
							);
						}}
					>
						{"\n                        Kreisberechnung"}
						<span className="arrow">{"▼"}</span>
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
								<label>{"Fläche A"}</label>
								<input
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
								<label>{"Durchmesser d"}</label>
								<input
									style={{ borderColor: "var(--Laenge)" }}
									type="text"
									aria-label="Durchmesser d"
									id="d"
								/>
								<label>{"m [meter]"}</label>
							</div>
							<input
								type="button"
								defaultValue="Berechnen"
								className="Button_Berechnen"
								data-action="calculateKreis"
								onClick={(event) => {
									controller.current?.handlers.calculateKreis?.();
								}}
							/>
							<h3>{"Berechnete Ergebnisse"}</h3>
							<p id="result_Kreis" aria-live="polite"></p>
						</div>
					</div>
				</div>
				<div className="divider"></div>
				<div className="dropdown">
					<button
						type="button"
						id="control-1"
						className="dropdown-header"
						data-action="toggleDropdown"
						onClick={(event) => {
							controller.current?.handlers.toggleDropdown?.(
								event.currentTarget,
							);
						}}
					>
						{"\n                        Dreiecksberechnung "}
						<span className="arrow">{"▼"}</span>
					</button>
					<div className="dropdown-content">
						{
							" \n                        Development in progress\n                    "
						}
					</div>
				</div>
			</div>
			<br />
		</div>
	);
}
