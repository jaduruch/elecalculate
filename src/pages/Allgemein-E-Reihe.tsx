import { useCalculator } from "../lib/use-calculator";
import { createController } from "../calculations/Allgemein-E-Reihe.js";
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
				<style>
					{
						"@layer source { @scope (.page-body) {\n\n        table {\n            border-collapse: collapse;\n            /*width: 100%;*/\n            margin-top: 20px;\n        }\n        th, td {\n            border: 1px solid black;\n            padding: 10px;\n            text-align: center;\n        }\n        th {\n            background-color: black;\n            text-decoration: underline;\n            color: white;\n            font-size: 1.2em;\n        }\n        select {\n            padding: 10px;\n            font-size: 1em;\n            margin: 20px;\n            border-radius: 4px;\n        }\n        label {\n            font-weight: bold;\n            font-size: 1.2em;\n        }\n       \n    \n} }"
					}
				</style>
				<div>
					<h1>
						<br />
						{"E-Reihe"}
					</h1>
					<label htmlFor="eReiheSelect">{"E-Reihe Auswählen:"}</label>
					<select
						disabled={!controller.ready}
						id="eReiheSelect"
						onChange={(event) => {
							controller.current?.invoke?.("updateTable", event.currentTarget);
						}}
					>
						<option value="E3">{"E3"}</option>
						<option value="E6">{"E6"}</option>
						<option value="E12">{"E12"}</option>
						<option value="E24">{"E24"}</option>
						<option value="E48">{"E48"}</option>
						<option value="E96">{"E96"}</option>
					</select>
				</div>
				<div id="tableContainer">
					<table style={{ maxWidth: "80px" }} id="eReiheTable">
						<thead>
							<tr>
								<th>{"Werte:"}</th>
							</tr>
						</thead>
						<tbody></tbody>
					</table>
				</div>
				<br />
			</div>
		</>
	);
}
