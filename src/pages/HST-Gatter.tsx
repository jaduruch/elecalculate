import { useCalculator } from "../lib/use-calculator";
import { createController } from "../calculations/HST-Gatter.js";
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
					"@layer source { @scope (.page-body) {\n\n        table{\n            border-width: 1;\n            width: 120px;\n        }\n    \n} }"
				}
			</style>
			<div>
				<br />
				<h1>{"Gatter"}</h1>
			</div>
			<div>
				<h2>{"BUFFER (Identität)"}</h2>
				<table>
					<tbody>
						<tr>
							<th>{"Eingang A"}</th>
							<th>{"Ausgang Y"}</th>
						</tr>
						<tr>
							<td>{"0"}</td>
							<td>{"0"}</td>
						</tr>
						<tr>
							<td>{"1"}</td>
							<td>{"1"}</td>
						</tr>
					</tbody>
				</table>
				<h2>{"AND"}</h2>
				<table>
					<tbody>
						<tr>
							<th>{"Eingang A"}</th>
							<th>{"Eingang B"}</th>
							<th>{"Ausgang Y"}</th>
						</tr>
						<tr>
							<td>{"0"}</td>
							<td>{"0"}</td>
							<td>{"0"}</td>
						</tr>
						<tr>
							<td>{"0"}</td>
							<td>{"1"}</td>
							<td>{"0"}</td>
						</tr>
						<tr>
							<td>{"1"}</td>
							<td>{"0"}</td>
							<td>{"0"}</td>
						</tr>
						<tr>
							<td>{"1"}</td>
							<td>{"1"}</td>
							<td>{"1"}</td>
						</tr>
					</tbody>
				</table>
				<h2>{"OR"}</h2>
				<table>
					<tbody>
						<tr>
							<th>{"Eingang A"}</th>
							<th>{"Eingang B"}</th>
							<th>{"Ausgang Y"}</th>
						</tr>
						<tr>
							<td>{"0"}</td>
							<td>{"0"}</td>
							<td>{"0"}</td>
						</tr>
						<tr>
							<td>{"0"}</td>
							<td>{"1"}</td>
							<td>{"1"}</td>
						</tr>
						<tr>
							<td>{"1"}</td>
							<td>{"0"}</td>
							<td>{"1"}</td>
						</tr>
						<tr>
							<td>{"1"}</td>
							<td>{"1"}</td>
							<td>{"1"}</td>
						</tr>
					</tbody>
				</table>
				<h2>{"EXOR (XOR)"}</h2>
				<table>
					<tbody>
						<tr>
							<th>{"Eingang A"}</th>
							<th>{"Eingang B"}</th>
							<th>{"Ausgang Y"}</th>
						</tr>
						<tr>
							<td>{"0"}</td>
							<td>{"0"}</td>
							<td>{"0"}</td>
						</tr>
						<tr>
							<td>{"0"}</td>
							<td>{"1"}</td>
							<td>{"1"}</td>
						</tr>
						<tr>
							<td>{"1"}</td>
							<td>{"0"}</td>
							<td>{"1"}</td>
						</tr>
						<tr>
							<td>{"1"}</td>
							<td>{"1"}</td>
							<td>{"0"}</td>
						</tr>
					</tbody>
				</table>
			</div>
			<h2>{"NOT"}</h2>
			<table>
				<tbody>
					<tr>
						<th>{"Eingang A"}</th>
						<th>{"Ausgang Y"}</th>
					</tr>
					<tr>
						<td>{"0"}</td>
						<td>{"1"}</td>
					</tr>
					<tr>
						<td>{"1"}</td>
						<td>{"0"}</td>
					</tr>
				</tbody>
			</table>
			<h2>{"NAND"}</h2>
			<table>
				<tbody>
					<tr>
						<th>{"Eingang A"}</th>
						<th>{"Eingang B"}</th>
						<th>{"Ausgang Y"}</th>
					</tr>
					<tr>
						<td>{"0"}</td>
						<td>{"0"}</td>
						<td>{"1"}</td>
					</tr>
					<tr>
						<td>{"0"}</td>
						<td>{"1"}</td>
						<td>{"1"}</td>
					</tr>
					<tr>
						<td>{"1"}</td>
						<td>{"0"}</td>
						<td>{"1"}</td>
					</tr>
					<tr>
						<td>{"1"}</td>
						<td>{"1"}</td>
						<td>{"0"}</td>
					</tr>
				</tbody>
			</table>
			<h2>{"NOR"}</h2>
			<table>
				<tbody>
					<tr>
						<th>{"Eingang A"}</th>
						<th>{"Eingang B"}</th>
						<th>{"Ausgang Y"}</th>
					</tr>
					<tr>
						<td>{"0"}</td>
						<td>{"0"}</td>
						<td>{"1"}</td>
					</tr>
					<tr>
						<td>{"0"}</td>
						<td>{"1"}</td>
						<td>{"0"}</td>
					</tr>
					<tr>
						<td>{"1"}</td>
						<td>{"0"}</td>
						<td>{"0"}</td>
					</tr>
					<tr>
						<td>{"1"}</td>
						<td>{"1"}</td>
						<td>{"0"}</td>
					</tr>
				</tbody>
			</table>
			<h2>{"EXNOR (XNOR)"}</h2>
			<table>
				<tbody>
					<tr>
						<th>{"Eingang A"}</th>
						<th>{"Eingang B"}</th>
						<th>{"Ausgang Y"}</th>
					</tr>
					<tr>
						<td>{"0"}</td>
						<td>{"0"}</td>
						<td>{"1"}</td>
					</tr>
					<tr>
						<td>{"0"}</td>
						<td>{"1"}</td>
						<td>{"0"}</td>
					</tr>
					<tr>
						<td>{"1"}</td>
						<td>{"0"}</td>
						<td>{"0"}</td>
					</tr>
					<tr>
						<td>{"1"}</td>
						<td>{"1"}</td>
						<td>{"1"}</td>
					</tr>
				</tbody>
			</table>
			<br />
		</div>
	);
}
