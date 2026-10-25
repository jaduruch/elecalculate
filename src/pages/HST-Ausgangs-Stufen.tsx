import { useCalculator } from "../lib/use-calculator";
import { createController } from "../calculations/HST-Ausgangs-Stufen.js";
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
					"@layer source { @scope (.page-body) {\n\n    img {\n        border-width: 1.5px;\n        border-style: solid; /* Wichtig: Border-Stil hinzufügen */\n        border-color: rgb(77, 77, 77);\n        width: 100px;\n        height: auto; /* Optional: Höhe automatisch setzen */\n        border-radius: 5px;\n    }\n\n    \n} }"
				}
			</style>
			<div>
				<h1>
					<br />
					{"Ausgänge"}
				</h1>
			</div>
			<div>
				<h3>{"Invertierender Ausgang"}</h3>
				<img
					src="/Pictures/InvertierenderAusgang.png"
					alt="Invertierender Eingang Schaltsymbol"
				/>
				<br />
				<div>
					<div>
						<h3>{"Tri State"}</h3>
						<img src="/Pictures/Tristate.png" alt="Tristate Schaltsymbol" />
						<br />
						<div>
							<h3>{"Open Collector"}</h3>
							<img src="/Pictures/OpenCollector.png" alt="OC Schaltsymbol" />
							<br />
						</div>
						<div>
							<h3>{"Retardierter Ausgang"}</h3>
							<img
								src="/Pictures/RetardierterAusgang.png"
								alt="Retardierter Ausgang"
							/>
							<br />
						</div>
						<div>
							<h3>{"Treiber Baustein"}</h3>
							<img
								src="/Pictures/TreiberBaustein.png"
								alt="Retardierter Ausgang"
							/>
							<br />
						</div>
						<div>
							<h2>
								<br />
								{"Eingänge"}
							</h2>
						</div>
						<div>
							<h3>{"Invertierender Eingang"}</h3>
							<img
								src="/Pictures/InvertierenderEingang.png"
								alt="Invertierender Eingang Schaltsymbol"
							/>
							<br />
							<div>
								<h3>{"Flankengesteuerter Eingang"}</h3>
								<img
									src="/Pictures/PositiveFlanke.png"
									alt="Flankengesteuerter Eingang Schaltsymbol"
								/>
								<br />
							</div>
							<div>
								<h3>{"Negative Flanke"}</h3>
								<img
									src="/Pictures/NegativeFlanke.png"
									alt="Negativ-Flankengesteuerter Eingang"
								/>
								<br />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
