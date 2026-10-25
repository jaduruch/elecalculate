import { useCalculator } from "../lib/use-calculator";
import { createController } from "../calculations/HST-Massvorsaetze-Binaer.js";
export default function Page() {
	const controller = useCalculator(createController);
	return (
		<div
			ref={controller.root}
			data-ready={controller.ready ? "true" : undefined}
			className="page-body "
		>
			<style>{"@layer source { @scope (.page-body) {\n\n} }"}</style>
			<div>
				<br />
				<h1>{"Massvorsätze Binär"}</h1>
			</div>
			<table style={{ maxWidth: "80px" }}>
				<tbody>
					<tr>
						<th>{"Wert"}</th>
						<th>{"Bezeichnung"}</th>
						<th>{"Abkürzung"}</th>
					</tr>
					<tr>
						<td>
							{"2"}
							<sup>{"0"}</sup>
						</td>
						<td>{"Eins"}</td>
						<td>{"1"}</td>
					</tr>
					<tr>
						<td>
							{"2"}
							<sup>{"10"}</sup>
						</td>
						<td>{"kilo"}</td>
						<td>{"k"}</td>
					</tr>
					<tr>
						<td>
							{"2"}
							<sup>{"20"}</sup>
						</td>
						<td>{"Mega"}</td>
						<td>{"M"}</td>
					</tr>
					<tr>
						<td>
							{"2"}
							<sup>{"30"}</sup>
						</td>
						<td>{"Giga"}</td>
						<td>{"G"}</td>
					</tr>
					<tr>
						<td>
							{"2"}
							<sup>{"40"}</sup>
						</td>
						<td>{"Tera"}</td>
						<td>{"T"}</td>
					</tr>
				</tbody>
			</table>
			<br />
		</div>
	);
}
