import { useCalculator } from "../lib/use-calculator";
import { createController } from "../calculations/Elektronik-FETs.js";
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
				<h1>
					<br />
					{"FET"}
				</h1>
			</div>
			<div>
				<p>
					{"In dieser Version nicht umgesetzt."}
					<br />
				</p>
			</div>
			<br />
		</div>
	);
}
