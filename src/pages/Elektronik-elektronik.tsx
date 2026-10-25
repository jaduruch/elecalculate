import { useCalculator } from "../lib/use-calculator";
import { createController } from "../calculations/Elektronik-elektronik.js";
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
					{"Elektronik"}
				</h1>
			</div>
			<div>
				<p>
					{"Comming Soon"}
					<br />
				</p>
			</div>
			<br />
		</div>
	);
}
