import { useCalculator } from "../lib/use-calculator";
import { createController } from "../calculations/Allgemein-Massvorsaetze.js";
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
						{"Massvorsätze"}
					</h1>
				</div>
				<table style={{ maxWidth: "80px" }}>
					<tbody>
						<tr>
							<th>{"Wert "}</th>
							<th>{"Bezeichnung "}</th>
							<th>{"Präfix "}</th>
						</tr>
						<tr>
							<td>
								{"10"}
								<sup>{"24"}</sup>
							</td>
							<td>{"Yotta"}</td>
							<td>{"Y"}</td>
						</tr>
						<tr>
							<td>
								{"10"}
								<sup>{"21"}</sup>
							</td>
							<td>{"Zetta"}</td>
							<td>{"Z"}</td>
						</tr>
						<tr>
							<td>
								{"10"}
								<sup>{"18"}</sup>
							</td>
							<td>{"Exa"}</td>
							<td>{"E"}</td>
						</tr>
						<tr>
							<td>
								{"10"}
								<sup>{"15"}</sup>
							</td>
							<td>{"Peta"}</td>
							<td>{"P"}</td>
						</tr>
						<tr>
							<td>
								{"10"}
								<sup>{"12"}</sup>
							</td>
							<td>{"Tera"}</td>
							<td>{"T"}</td>
						</tr>
						<tr>
							<td>
								{"10"}
								<sup>{"9"}</sup>
							</td>
							<td>{"Giga"}</td>
							<td>{"G"}</td>
						</tr>
						<tr>
							<td>
								{"10"}
								<sup>{"6"}</sup>
							</td>
							<td>{"Mega"}</td>
							<td>{"M"}</td>
						</tr>
						<tr>
							<td>
								{"10"}
								<sup>{"3"}</sup>
							</td>
							<td>{"Kilo"}</td>
							<td>{"k"}</td>
						</tr>
						<tr>
							<td>
								{"10"}
								<sup>{"0"}</sup>
							</td>
							<td>{"Eins"}</td>
							<td>{"-"}</td>
						</tr>
						<tr>
							<td>
								{"10"}
								<sup>{"-3"}</sup>
							</td>
							<td>{"Milli"}</td>
							<td>{"m"}</td>
						</tr>
						<tr>
							<td>
								{"10"}
								<sup>{"-6"}</sup>
							</td>
							<td>{"Mikro"}</td>
							<td>{"µ"}</td>
						</tr>
						<tr>
							<td>
								{"10"}
								<sup>{"-9"}</sup>
							</td>
							<td>{"Nano"}</td>
							<td>{"n"}</td>
						</tr>
						<tr>
							<td>
								{"10"}
								<sup>{"-12"}</sup>
							</td>
							<td>{"Piko"}</td>
							<td>{"p"}</td>
						</tr>
						<tr>
							<td>
								{"10"}
								<sup>{"-15"}</sup>
							</td>
							<td>{"Femto"}</td>
							<td>{"f"}</td>
						</tr>
						<tr>
							<td>
								{"10"}
								<sup>{"-18"}</sup>
							</td>
							<td>{"Atto"}</td>
							<td>{"a"}</td>
						</tr>
						<tr>
							<td>
								{"10"}
								<sup>{"-21"}</sup>
							</td>
							<td>{"Zepto"}</td>
							<td>{"z"}</td>
						</tr>
						<tr>
							<td>
								{"10"}
								<sup>{"-24"}</sup>
							</td>
							<td>{"Yocto"}</td>
							<td>{"y"}</td>
						</tr>
					</tbody>
				</table>
				<br />
			</div>
		</>
	);
}
