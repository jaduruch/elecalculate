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
	function calculateParameters() {
		let result = ``;
		let prevResult = `1`;
		let I = document.getElementById("I").value;
		let H = document.getElementById("H").value;
		let Theta = document.getElementById("Theta").value;
		let ur = document.getElementById("ur").value;
		let N = document.getElementById("N").value;
		let Rm = document.getElementById("Rm").value;
		let A = document.getElementById("A").value;
		let Phi = document.getElementById("Phi").value;
		let U = document.getElementById("U").value;
		let l = document.getElementById("l").value;
		let B = document.getElementById("B").value;
		let t = document.getElementById("t").value;
		while (result != prevResult) {
			prevResult = result;
			if (!I && Theta && N) {
				I = formatPrefixNoUnit(parseInput(Theta) / parseInput(N));
				result += `
                        Strom I  = 
                        <div class ="fraction">
                            <span class="fraction-numerator">&Theta;</span><br>
                            <span>N</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator">${Theta}A</span><br>
                            <span>${N}</span>
                        </div> 
                    = ${I}A <br>`;
			}
			if (!I && Rm && ur && A) {
				I = formatPrefixNoUnit(
					parseInput(Rm) * parseInput(ur) * 1.257e-6 * parseInputsquare(A),
				);
				result += `
                        Strom I =
                        R<sub>m</sub> &lowast; &mu;<sub>r</sub> &lowast; &mu;<sub>0</sub> &lowast; A
                    =
                        ${Rm}A/VS &lowast; ${ur} &lowast; 1.257&lowast;10<sup>-6</sup>Vs/Am  ${A}m<sup>2</sup>
                    = ${I}A <br>`;
			}
			if (!I && H && l && N) {
				I = formatPrefixNoUnit((parseInput(H) * parseInput(l)) / parseInput(N));
				result += `
                        Strom I = 
                        <div class ="fraction">
                            <span class="fraction-numerator">H &lowast; l</span><br>
                            <span>N</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator"> ${H}A/m &lowast; ${l}m</span><br>
                            <span>${N}</span>
                        </div> 
                    = ${I}A <br>`;
			}
			if (!H && Theta && l) {
				H = formatPrefixNoUnit(parseInput(Theta) / parseInput(l));
				result += `
                       Feldst&auml;rke H = 
                        - <div class ="fraction">
                            <span class="fraction-numerator">&Theta;</span><br>
                            <span> l </span>
                        </div> 
                    =
                        - <div class ="fraction">
                            <span class="fraction-numerator"> ${Theta}Wb </span><br>
                            <span> ${l}m </span>
                        </div> 
                    = ${H}A/m <br>`;
			}
			if (!H && N && I && l) {
				H = formatPrefixNoUnit((parseInput(N) * parseInput(I)) / parseInput(l));
				result += `
                       Feldst&auml;rke H = 
                        <div class ="fraction">
                            <span class="fraction-numerator">N &lowast; I</span><br>
                            <span> l </span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator"> ${N} &lowast; ${I}A </span><br>
                            <span> ${l}m </span>
                        </div> 
                    = ${H}A/m <br>`;
			}
			if (!Theta && H && l) {
				Theta = formatPrefixNoUnit(parseInput(H) * parseInput(l));
				result += `
                            Durchflutung &Theta; =
                            H &lowast; l
                        =
                            ${H}A/m &lowast; ${l}m
                        = ${Theta}A <br>`;
			}
			if (!Theta && I && N) {
				Theta = formatPrefixNoUnit(parseInput(I) * parseInput(N));
				result += `
                            Durchflutung &Theta; =
                            I &lowast; N
                        =
                            ${I}A &lowast; ${N}
                        = ${Theta}A <br>`;
			}
			if (!ur && I && Rm && A) {
				ur = formatPrefixNoUnit(
					parseInput(I) / (parseInput(Rm) * 1.257e-6 * parseInputsquare(A)),
				);
				result += `
                        Mag. Widerstand R<sub>m</sub> = 
                        <div class ="fraction">
                            <span>I</span><br>
                            <span class="fraction-denumerator"> R<sub>m</sub> &lowast; &mu;<sub>0</sub> &lowast; A </span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span> ${I}A</span><br>
                            <span class="fraction-denumerator"> ${Rm}A/Vs &lowast; 1.257&lowast;10<sup>-6</sup>Vs/Am  ${A}m<sup>2</sup> </span>
                        </div> 
                    = ${ur} <br>`;
			}
			if (!N && Theta && I) {
				N = formatPrefixNoUnit(parseInput(Theta) / parseInput(I));
				result += `
                        Windungszahl N  = 
                        <div class ="fraction">
                            <span class="fraction-numerator">&Theta;</span><br>
                            <span>I</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator">${Theta}A</span><br>
                            <span>${I}A</span>
                        </div> 
                    = ${N}<br>`;
			}
			if (!N && U && t && Phi) {
				N = formatPrefixNoUnit(
					-(parseInput(U) * parseInput(t)) / parseInput(Phi),
				);
				result += `
                        Windungszahl N  = 
                        - <div class ="fraction">
                            <span class="fraction-numerator">u<sub>0</sub> &lowast; &Delta;t</span><br>
                            <span>&Delta;&Phi;</span>
                        </div> 
                    =
                        - <div class ="fraction">
                            <span class="fraction-numerator"> ${U}V &lowast; ${t}s</span><br>
                            <span>${Phi}Wb</span>
                        </div> 
                    = ${N}<br>`;
			}
			if (!N && H && l && I) {
				N = formatPrefixNoUnit((parseInput(H) * parseInput(l)) / parseInput(I));
				result += `
                        Windungszahl N  = 
                        <div class ="fraction">
                            <span class="fraction-numerator">H &lowast; l</span><br>
                            <span>I</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator"> ${H}A/m &lowast; ${l}m</span><br>
                            <span>${I}A</span>
                        </div> 
                    = ${N}<br>`;
			}
			if (!Rm && I && ur && A) {
				Rm = formatPrefixNoUnit(
					parseInput(I) / (parseInput(ur) * 1.257e-6 * parseInputsquare(A)),
				);
				result += `
                        Mag. Widerstand R<sub>m</sub> = 
                        <div class ="fraction">
                            <span>I</span><br>
                            <span class="fraction-denumerator"> &mu;<sub>r</sub> &lowast; &mu;<sub>0</sub> &lowast; A </span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span> ${I}A</span><br>
                            <span class="fraction-denumerator"> ${ur} &lowast; 1.257&lowast;10<sup>-6</sup>Vs/Am  ${A}m<sup>2</sup> </span>
                        </div> 
                    = ${Rm}A/Vs <br>`;
			}
			if (!A && I && ur && Rm) {
				A = formatPrefixNoUnitSquare(
					parseInput(I) / (parseInput(ur) * 1.257e-6 * parseInput(Rm)),
				);
				result += `
                        Fl&auml;che A = 
                        <div class ="fraction">
                            <span>I</span><br>
                            <span class="fraction-denumerator"> &mu;<sub>r</sub> &lowast; &mu;<sub>0</sub> &lowast; R<sub>m</sub> </span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span> ${I}A</span><br>
                            <span class="fraction-denumerator"> ${ur} &lowast; 1.257&lowast;10<sup>-6</sup>Vs/Am  ${Rm}A/Vs </span>
                        </div> 
                    = ${A}m<sup>2</sup> <br>`;
			}
			if (!A && Phi && B) {
				A = formatPrefixNoUnitSquare(parseInput(Phi) / parseInput(B));
				result += `
                        Strom I  = 
                        <div class ="fraction">
                            <span class="fraction-numerator">&Phi;</span><br>
                            <span>B</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator">${Phi}Wb</span><br>
                            <span>${B}T</span>
                        </div> 
                    = ${A}m<sup>2</sup> <br>`;
			}
			if (!Phi && B && A) {
				Phi = formatPrefixNoUnit(parseInput(B) * parseInputsquare(A));
				result += `
                        Mag. Fluss &Phi; =
                        B &lowast; A
                    =
                        ${B}T &lowast; ${A}m<sup>2</sup>
                    = ${Phi}Wb <br>`;
			}
			if (!Phi && U && t && N) {
				Phi = formatPrefixNoUnit(
					-(parseInput(U) * parseInput(t)) / parseInput(N),
				);
				result += `
                        Mag. Fluss &Phi; =
                        - <div class ="fraction">
                            <span class="fraction-numerator">u<sub>0</sub> &lowast; &Delta;t</span><br>
                            <span>N</span>
                        </div> 
                    =
                        - <div class ="fraction">
                            <span class="fraction-numerator"> ${U}V &lowast; ${t}s</span><br>
                            <span>${N}</span>
                        </div> 
                    = ${Phi}Wb <br>`;
			}
			if (!U && t && N && Phi) {
				U = formatPrefixNoUnit(
					-(parseInput(N) * parseInput(Phi)) / parseInput(t),
				);
				result += `
                        Induzierte Spannung u<sub>0</sub> = 
                        - <div class ="fraction">
                            <span class="fraction-numerator">N &lowast; &Delta;&Phi;</span><br>
                            <span> </span>
                        </div> 
                    =
                        - <div class ="fraction">
                            <span class="fraction-numerator"> ${N} &lowast; ${Phi}Wb</span><br>
                            <span>${t}s</span>
                        </div> 
                    = ${U}V <br>`;
			}
			if (!l && Theta && H) {
				l = formatPrefixNoUnit(parseInput(Theta) / parseInput(H));
				result += `
                       Feldlinienl&auml;nge l = 
                        <div class ="fraction">
                            <span class="fraction-numerator">&Theta;</span><br>
                            <span> H </span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator"> ${Theta}Wb </span><br>
                            <span> ${H}A/m </span>
                        </div> 
                    = ${l} <br>`;
			}
			if (!l && N && I && H) {
				l = formatPrefixNoUnit((parseInput(N) * parseInput(I)) / parseInput(H));
				result += `
                       Feldlinienl&auml;nge l = 
                        <div class ="fraction">
                            <span class="fraction-numerator">N &lowast; I</span><br>
                            <span> H </span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator"> ${N} &lowast; ${I}A </span><br>
                            <span> ${H}A/m </span>
                        </div> 
                    = ${l}m <br>`;
			}
			if (!B && ur && H) {
				B = formatPrefixNoUnit(parseInput(ur) * 1.257e-6 * parseInput(H));
				result += `
                        Mag. Flussdichte B =
                        &mu;<sub>r</sub> &lowast; &mu;<sub>0</sub> &lowast; H
                    =
                        ${ur} &lowast; 1.257&lowast;10<sup>-6</sup>Vs/Am  &lowast; ${H}A/m
                    = ${B}T <br>`;
			}
			if (!B && Phi && A) {
				B = formatPrefixNoUnit(parseInput(Phi) / parseInputsquare(A));
				result += `
                        Mag. Flussdichte B  = 
                        <div class ="fraction">
                            <span class="fraction-numerator">&Phi;</span><br>
                            <span>A</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator">${Phi}Wb</span><br>
                            <span>${A}m<sup>2</sup></span>
                        </div> 
                    = ${B}T <br>`;
			}
			if (!t && U && N && Phi) {
				t = formatPrefixNoUnit(
					-(parseInput(N) * parseInput(Phi)) / parseInput(U),
				);
				result += `
                        Zeit t = 
                        - <div class ="fraction">
                            <span class="fraction-numerator">N &lowast; &Delta;&Phi;</span><br>
                            <span> u<sub>0</sub></span>
                        </div> 
                    =
                        - <div class ="fraction">
                            <span class="fraction-numerator"> ${N} &lowast; ${Phi}Wb</span><br>
                            <span>${U}V</span>
                        </div> 
                    = ${t}s <br>`;
			}
		}
		setHTML(document.getElementById("result"), result);
	}
	function resetInputs() {
		const inputs = document.querySelectorAll(".input-numbers input");
		inputs.forEach((input) => (input.value = ""));
		setHTML(document.getElementById("result"), "");
	}
	return {
		handlers: {
			calculateParameters,
			resetInputs,
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
