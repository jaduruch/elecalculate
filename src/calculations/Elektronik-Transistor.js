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
	function calculateTransistorAsSwitch() {
		let result = ``;
		const IC = document.getElementById("IC").value;
		const IB = document.getElementById("IB").value;
		const RL = document.getElementById("RL").value;
		const RB = document.getElementById("RB").value;
		const USpeisung = document.getElementById("USpeisung").value;
		const UB = document.getElementById("UB").value;
		const UBE = document.getElementById("UBE").value;
		const UCE = document.getElementById("UCE").value;
		const B = document.getElementById("B").value;
		const ue = document.getElementById("ue").value;
		if (!IC) {
			if (IB && B && ue) {
				result += `
                        Kollektorstrom I<sub>C</sub> = 
                        <div class ="fraction">
                            <span class="fraction-numerator"> I<sub>B</sub> lowast; B </span><br>
                            <span>&uuml;</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator"> ${IB}A lowast; ${B}</span><br>
                            <span>${ue}</span>
                        </div> 
                    = ${formatWithPrefix((parseInput(IB) * parseInput(B)) / parseInput(ue), "A")}<br>`;
			}
			if (USpeisung && UCE && RL) {
				result += `
                        Kollektorstrom I<sub>C</sub> = 
                        <div class ="fraction">
                            <span class="fraction-numerator"> U<sub>b</sub> - U<sub>CE</sub></span><br>
                            <span>R<sub>L</sub></span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator"> ${USpeisung}V - ${UCE}V</span><br>
                            <span>${RL}&Omega;</span>
                        </div> 
                    = ${formatWithPrefix((parseInput(USpeisung) - parseInput(UCE)) / parseInput(RL), "A")}<br>`;
			}
			if (UB && UBE && B && ue && RB) {
				result += `
                        Kollektorstrom I<sub>C</sub> = 
                        <div class ="fraction">
                            <span class="fraction-numerator"> (U<sub>B</sub> - U<sub>BE</sub>) lowast; B</span><br>
                            <span>&uuml; lowast; R<sub>B</sub></span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator"> (${UB}V - ${UBE}V) lowast; ${B}</span><br>
                            <span>${ue} lowast; ${RB}&Omega;</span>
                        </div> 
                    = ${formatWithPrefix(((parseInput(UB) - parseInput(UBE)) * parseInput(B)) / parseInput(ue * parseInput(RB)), "A")}<br>`;
			}
		}
		if (!IB) {
			if (ue && IC && B) {
				result += `
                        Basisstrom I<sub>B</sub> = 
                        <div class ="fraction">
                            <span class="fraction-numerator"> I<sub>C</sub> lowast; &uuml; </span><br>
                            <span>B</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator"> ${IC}A lowast; ${ue}</span><br>
                            <span>${B}</span>
                        </div> 
                    = ${formatWithPrefix((parseInput(IC) * parseInput(ue)) / parseInput(B), "A")}<br>`;
			}
			if (UB && UBE && RB) {
				result += `
                        Basisstrom I<sub>B</sub> = 
                        <div class ="fraction">
                            <span class="fraction-numerator"> U<sub>B</sub> - U<sub>BE</sub></span><br>
                            <span>R<sub>B</sub></span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator"> ${UB}V - ${UBE}V</span><br>
                            <span>${RB}&Omega;</span>
                        </div> 
                    = ${formatWithPrefix((parseInput(UB) - parseInput(UBE)) / parseInput(RB), "A")}<br>`;
			}
		}
		if (!RL && USpeisung && UCE && IC) {
			result += `
                    Lastwiderstand R<sub>L</sub> = 
                    <div class ="fraction">
                        <span class="fraction-numerator"> U<sub>b</sub> - U<sub>CE</sub></span><br>
                        <span>I<sub>C</sub></span>
                    </div> 
                =
                    <div class ="fraction">
                        <span class="fraction-numerator"> ${USpeisung}V - ${UCE}V</span><br>
                        <span>${IC}A</span>
                    </div> 
                = ${formatWithPrefix((parseInput(USpeisung) - parseInput(UCE)) / parseInput(IC), "&Omega;")}<br>`;
		}
		if (!RB && UB && UBE && B && ue && IC) {
			result += `
                    Basiswiderstand R<sub>B</sub> = 
                    <div class ="fraction">
                        <span class="fraction-numerator"> (U<sub>B</sub> - U<sub>BE</sub>) lowast; B </span><br>
                        <span>I<sub>C</sub>lowast; &uuml;</span>
                    </div> 
                =
                    <div class ="fraction">
                        <span class="fraction-numerator"> (${UB}V - ${UBE}V) lowast; ${B} </span><br>
                        <span>${IC}Alowast; ${ue}</span>
                    </div> 
                = ${formatWithPrefix(((parseInput(UB) - parseInput(UBE)) * parseInput(B)) / (parseInput(IC) * parseInput(ue)), "&Omega;")}<br>`;
		}
		if (!USpeisung && IC && RL && UCE) {
			result += `
                            Speisespannung U<sub>b</sub> =
                            I<sub>C</sub> lowast; R<sub>L</sub> + U<sub>CE</sub>
                        =
                            ${IC}A lowast; ${RL}&Omega; + ${UCE}V
                        = ${formatWithPrefix(parseInput(IC) * parseInput(RC) + parseInput(UCE), "V")}<br>`;
		}
		if (!UB && IC && RB && ue && B && UBE) {
			if (RB && IB && UBE) {
				result += `
                            Basisspannung U<sub>B</sub> =
                            I<sub>B</sub> lowast; R<sub>B</sub> + U<sub>BE</sub>
                        =
                            ${IB}A lowast; ${RB}&Omega; + ${UBE}V
                        = ${formatWithPrefix(parseInput(IB) * parseInput(RB) + parseInput(UBE), "V")}<br>`;
			}
		}
		setHTML(document.getElementById("result"), result);
	}
	function toggleDropdown(element) {
		const dropdown = element.parentElement;
		dropdown.classList.toggle("open");
	}
	return {
		handlers: {
			calculateTransistorAsSwitch,
			toggleDropdown,
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
