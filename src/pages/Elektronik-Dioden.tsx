import { useCalculator } from "../lib/use-calculator";
import { createController } from "../calculations/Elektronik-Dioden.js";
export default function Page() {
	const controller = useCalculator(createController);
	return (
		<div ref={controller.root} className="page-body ">
			<style>{"@layer source { @scope (.page-body) {\n\n} }"}</style>
			<div>
				<h1>
					<br />
					{"Dioden"}
				</h1>
			</div>
			<div>
				<table style={{ maxWidth: "150px" }}>
					<tbody>
						<tr>
							<th>{"Diode"}</th>
							<th>{"Schwellspannung"}</th>
						</tr>
						<tr>
							<td>{"Germanium"}</td>
							<td>{"0.2 V"}</td>
						</tr>
						<tr>
							<td>{"Schottky"}</td>
							<td>{"0.3 V"}</td>
						</tr>
						<tr>
							<td>{"Silizium"}</td>
							<td>{"0.6 V"}</td>
						</tr>
						<tr>
							<td>{"Zener (5.1V)"}</td>
							<td>{"5.1 V"}</td>
						</tr>
						<tr>
							<th>{"LEDs"}</th>
							<th>{"Schwellspannung"}</th>
						</tr>
						<tr>
							<td>{"Rot"}</td>
							<td>{"1.8 V"}</td>
						</tr>
						<tr>
							<td>{"Grün"}</td>
							<td>{"2.0 V"}</td>
						</tr>
						<tr>
							<td>{"Gelb"}</td>
							<td>{"2.1 V"}</td>
						</tr>
						<tr>
							<td>{"Blau"}</td>
							<td>{"3.0 V"}</td>
						</tr>
						<tr>
							<td>{"Weiss"}</td>
							<td>{"2.7 V"}</td>
						</tr>
						<tr>
							<td>{"Infrarot (IR)"}</td>
							<td>{"1.2 V"}</td>
						</tr>
						<tr>
							<td>{"UV"}</td>
							<td>{"3.3 V"}</td>
						</tr>
					</tbody>
				</table>
			</div>
			<br />
		</div>
	);
}
