import { parseInput, parseInputsquare } from "../lib/si";
import { setHTML } from "../lib/safe-html";
import { calculateDivider } from "../lib/divider-controller";
import { createShared } from "./shared.js";
/** Existing calculation algorithms, isolated to this route's mount lifecycle. */
export function createController(scope) {
	const {
		document,
		window,
		MathJax,
		requestAnimationFrame,
		cancelAnimationFrame,
		setTimeout,
		clearTimeout,
		setInterval,
		clearInterval,
	} = scope;
	const {
		changeSlide,
		showSlides,
		formatPrefixNoUnit,
		formatPrefixNoUnitSquare,
		formatWithPrefix,
		formatWithPrefixsquare,
		getlg,
		drawCurveDynamic,
		getBestSIPrefix,
		formatWithSIPrefix,
	} = createShared(scope);
	function toggleDropdown(element) {
		const dropdown = element.parentElement;
		dropdown.classList.toggle("open");
	}
	function calculateKreis() {
		let result_Kreis = ``;
		const A = document.getElementById("A").value;
		const d = document.getElementById("d").value;
		if (A && !d) {
			result_Kreis += `
                    Leiterdurchmesser d = 
                    &radic;(<div class ="fraction">
                        <span class="fraction-numerator">4 &lowast; A</span><br>
                        <span>&pi;</span>
                    </div>) 
                =
                    &radic;(<div class ="fraction">
                        <span class="fraction-numerator">4 &lowast; ${A}m<sup>2</sup> </span><br>
                        <span>&pi;</span>
                    </div>)
                = ${formatWithPrefix(Math.pow((4 * parseInputsquare(A)) / Math.PI, 0.5), "m")}<br>`;
		}
		if (d && !A) {
			result_Kreis += `
                    Fl&auml;che A = 
                    <div class ="fraction">
                        <span class="fraction-numerator">&pi; &lowast; d<sup>2</sup></span><br>
                        <span>4</span>
                    </div> 
                =
                    <div class ="fraction">
                        <span class="fraction-numerator">&pi; &lowast; (${d}m)<sup>2</sup> </span><br>
                        <span>4</span>
                    </div> 
                = ${formatWithPrefixsquare((Math.PI * Math.pow(parseInput(d), 2)) / 4, "m<sup>2</sup>")}<br>`;
		}
		setHTML(document.getElementById("result_Kreis"), result_Kreis);
	}
	return {
		handlers: {
			toggleDropdown,
			calculateKreis,
			changeSlide,
			showSlides,
			formatPrefixNoUnit,
			formatPrefixNoUnitSquare,
			formatWithPrefix,
			formatWithPrefixsquare,
			getlg,
			drawCurveDynamic,
			getBestSIPrefix,
			formatWithSIPrefix,
			parseInput,
			parseInputsquare,
		},
		dispose() {},
	};
}
