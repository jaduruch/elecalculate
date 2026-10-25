import { useCalculator } from "../lib/use-calculator";
import { createController } from "../calculations/Elektronik-Aktiv-Filter.js";
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
						{"Activ Filter"}
					</h1>
				</div>
				<div>
					<p>
						{"Comig Soon"}
						<br />
					</p>
				</div>
				<br />
				<p className="comment">
					Dieser Fachbereich wurde im Original nicht umgesetzt. Es gibt hier
					keinen Rechner.
				</p>
			</div>
		</>
	);
}
