import { useCalculator } from "../lib/use-calculator";
import { createController } from "../calculations/Elektronik-Aktiv-Filter.js";
export default function Page() {
	const controller = useCalculator(createController);
	return (
		<div ref={controller.root} className="page-body ">
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
		</div>
	);
}
