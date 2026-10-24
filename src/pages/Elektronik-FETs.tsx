import { useCalculator } from "../lib/use-calculator";
import { createController } from "../calculations/Elektronik-FETs.js";
export default function Page() {
	const controller = useCalculator(createController);
	return (
		<div ref={controller.root} className="page-body ">
			<style>{"@layer source { @scope (.page-body) {\n\n} }"}</style>
			<div>
				<h1>
					<br />
					{"FET"}
				</h1>
			</div>
			<div>
				<p>
					{"Coming Soon"}
					<br />
				</p>
			</div>
			<br />
		</div>
	);
}
