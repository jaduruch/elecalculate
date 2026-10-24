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
	let selectedButton = null;
	function toggleSelection(button, sectionId) {
		const section = document.getElementById(sectionId);
		if (selectedButton === button) {
			button.classList.remove("selected");
			section.style.display = "none";
			selectedButton = null;
		} else {
			if (selectedButton) {
				selectedButton.classList.remove("selected");
			}
			button.classList.add("selected");
			selectedButton = button;
			if (sectionId === "serie") {
				document.getElementById("serie").style.display = "block";
				document.getElementById("parallel").style.display = "none";
			} else {
				document.getElementById("parallel").style.display = "block";
				document.getElementById("serie").style.display = "none";
			}
		}
	}
	function calculateSerie() {
		let result = ``;
		const R = document.getElementById("R-serie").value;
		const XL = document.getElementById("XL-serie").value;
		const XC = document.getElementById("XC-serie").value;
		const L = document.getElementById("L-serie").value;
		const Q = document.getElementById("Q-serie").value;
		const C = document.getElementById("C-serie").value;
		const U = document.getElementById("U-serie").value;
		const UR = document.getElementById("UR-serie").value;
		const UL = document.getElementById("UL-serie").value;
		const UC = document.getElementById("UC-serie").value;
		const f = document.getElementById("f-serie").value;
		const b = document.getElementById("b-serie").value;
		if (!R) {
			if (L && C && Q) {
				result += `
                        Verlustwiderstand R<sub>v</sub> = 
                        <div class ="fraction">
                            <span> 1 </span><br>
                            <span class="fraction-denominator">Q</span>
                        </div> &lowast; &radic;(
                        <div class ="fraction">
                            <span>L</span><br>
                            <span class="fraction-denominator">C</span>
                        </div> )
                    =
                        <div class ="fraction">
                            <span> 1 </span><br>
                            <span class="fraction-denominator">${Q}</span>
                        </div> &lowast; &radic;(
                        <div class ="fraction">
                            <span>${L}H</span><br>
                            <span class="fraction-denominator">${C}F</span>
                        </div> )
                    = ${formatWithPrefix((1 / parseInput(Q)) * (2 * Math.PI * Math.pow(parseInput(L) / parseInput(C), 0.5)), "&Omega;")}<br>`;
			}
		}
		if (!XL) {
			if (f && L) {
				result += `
                    Blindwiderstand X<sub>L</sub> = 2&pi; &lowast; f &lowast; L
                =
                    2&pi; &lowast; ${f}Hz &lowast; ${L}H
                = ${formatWithPrefix(2 * Math.PI * parseInput(f) * parseInput(L), "&Omega;")}<br>`;
			}
		}
		if (!XC) {
			if (f && C) {
				result += `
                        Blindwiderstand X<sub>C</sub> = 
                        <div class ="fraction">
                            <span> 1 </span><br>
                            <span class="fraction-denominator">2&pi; &lowast; f &lowast; C</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span>1</span><br>
                            <span class="fraction-denominator">2&pi; &lowast; ${f}Hz &lowast; ${C}F</span>
                        </div> 
                    = ${formatWithPrefix(1 / (2 * Math.PI * parseInput(f) * parseInput(C)), "&Omega;")}<br>`;
			}
		}
		if (!L) {
			if (f && C) {
				result += `
                        Induktivit&auml;t L = 
                        <div class ="fraction">
                            <span> 1 </span><br>
                            <span class="fraction-denominator">(2&pi; &lowast; f)<sup>2</sup> &lowast; C</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span>1</span><br>
                            <span class="fraction-denominator">(2&pi; &lowast; ${f}Hz)<sup>2</sup> &lowast; ${C}F</span>
                        </div> 
                    = ${formatWithPrefix(1 / (Math.pow(2 * Math.PI * parseInput(f), 2) * parseInput(C)), "H")}<br>`;
			}
			if (XL && f) {
				result += `
                        Induktivit&auml;t L =
                        <div class ="fraction">
                            <span> X<sub>L</sub> </span><br>
                            <span class="fraction-denominator">2&pi; &lowast; f</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span>${XL}&Omega;</span><br>
                            <span class="fraction-denominator">2&pi; &lowast; ${f}Hz</span>
                        </div> 
                    = ${formatWithPrefix(parseInput(XL) / (2 * Math.PI * parseInput(f)), "H")}<br>`;
			}
			if (Q && R && C) {
				result += `
                    Induktivit&auml;t L = (Q &lowast; R<sub>v</sub>)<sup>2</sup> &lowast; C
                =
                    (${Q} &lowast; ${R}&Omega;)<sup>2</sup> &lowast; ${C}F
                = ${formatWithPrefix(Math.pow(parseInput(Q) * parseInput(R), 2) * parseInput(C), "H")}<br>`;
			}
		}
		if (!Q) {
			if (!UL && U) {
				result += `
                        (Kreis) G&uuml;te Q =  = 
                        <div class ="fraction">
                            <span class="fraction-numerator"> U<sub>L</sub> </span><br>
                            <span>U</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator"> ${UL}V </span><br>
                            <span>${U}V</span>
                        </div> 
                    = ${formatWithPrefix(parseInput(UL) / parseInput(U), " ")}<br>`;
			}
			if (UC && U) {
				result += `
                        (Kreis) G&uuml;te Q =  = 
                        <div class ="fraction">
                            <span class="fraction-numerator"> U<sub>C</sub> </span><br>
                            <span>U</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator"> ${UC}V </span><br>
                            <span>${U}V</span>
                        </div> 
                    = ${formatWithPrefix(parseInput(UC) / parseInput(U), " ")}<br>`;
			}
			if (XL && R) {
				result += `
                        (Kreis) G&uuml;te Q =  = 
                        <div class ="fraction">
                            <span class="fraction-numerator"> X<sub>L</sub> </span><br>
                            <span>R</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator"> ${XL}&Omega; </span><br>
                            <span>${R}&Omega;</span>
                        </div> 
                    = ${formatWithPrefix(parseInput(XL) / parseInput(R), " ")}<br>`;
			}
			if (XC && R) {
				result += `
                        (Kreis) G&uuml;te Q =  = 
                        <div class ="fraction">
                            <span class="fraction-numerator"> X<sub>C</sub> </span><br>
                            <span>R</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator"> ${XC}&Omega; </span><br>
                            <span>${R}&Omega;</span>
                        </div> 
                    = ${formatWithPrefix(parseInput(XC) / parseInput(R), " ")}<br>`;
			}
			if (L && C && R) {
				result += `
                        (Kreis) G&uuml;te Q = 
                        <div class ="fraction">
                            <span> 1 </span><br>
                            <span class="fraction-denominator">R<sub>v</sub></span>
                        </div> &lowast; &radic;(
                        <div class ="fraction">
                            <span>L</span><br>
                            <span class="fraction-denominator">C</span>
                        </div> )
                    =
                        <div class ="fraction">
                            <span> 1 </span><br>
                            <span class="fraction-denominator">${R}&Omega;</span>
                        </div> &lowast; &radic;(
                        <div class ="fraction">
                            <span>${L}H</span><br>
                            <span class="fraction-denominator">${C}F</span>
                        </div> )
                    = ${formatWithPrefix((1 / parseInput(R)) * Math.pow(parseInput(L) / parseInput(C), 0.5), "")}<br>`;
			}
			if (f && b) {
				result += `
                        (Kreis) G&uuml;te Q> =  = 
                        <div class ="fraction">
                            <span class="fraction-numerator"> f<sub>g</sub> </span><br>
                            <span>b</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator"> ${f}Hz </span><br>
                            <span>${b}Hz</span>
                        </div> 
                    = ${formatWithPrefix(parseInput(f) / parseInput(b), " ")}<br>`;
			}
		}
		if (!C) {
			if (f && L) {
				result += `
                        Kapazit&auml;t C = 
                        <div class ="fraction">
                            <span> 1 </span><br>
                            <span class="fraction-denominator">(2&pi; &lowast; f)<sup>2</sup> &lowast; L</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span>1</span><br>
                            <span class="fraction-denominator">(2&pi; &lowast; ${f}Hz)<sup>2</sup> &lowast; ${L}H</span>
                        </div> 
                    = ${formatWithPrefix(1 / (Math.pow(2 * Math.PI * parseInput(f), 2) * parseInput(L)), "F")}<br>`;
			}
			if (XC && f) {
				result += `
                        Kapazit&auml;t C = 
                        <div class ="fraction">
                            <span> 1 </span><br>
                            <span class="fraction-denominator">2&pi; &lowast; f &lowast; X<sub>C</sub></span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span>1</span><br>
                            <span class="fraction-denominator">2&pi; &lowast; ${f}Hz &lowast; ${XL}&Omega;</span>
                        </div> 
                    = ${formatWithPrefix(1 / (2 * Math.PI * parseInput(f) * parseInput(XL)), "F")}<br>`;
			}
			if (Q && R && L) {
				result += `
                        Kapazit&auml;t C = 
                        <div class ="fraction">
                            <span> L </span><br>
                            <span class="fraction-denominator">(Q &lowast; R)<sup>2</sup></span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span>${L}H</span><br>
                            <span class="fraction-denominator">(${Q} &lowast; ${R}&Omega;)<sup>2</sup></span>
                        </div> 
                    = ${formatWithPrefix(parseInput(L) / Math.pow(parseInput(Q) * parseInput(R), 2), "F")}<br>`;
			}
		}
		if (!U) {
			if (UR && UL && UC) {
				result += `
                    Spannung U<sub>ges</sub> = &radic;((U<sub>R</sub>)<sup>2</sup> + (U<sub>L</sub> - U<sub>C</sub>)<sup>2</sup>)
                    =
                        &radic;((${UR}V)<sup>2</sup> + (${UL}V - ${UC}V)<sup>2</sup>)
                    = ${formatWithPrefix(Math.pow(Math.pow(parseInput(UR), 2) + Math.pow(parseInput(UL) - parseInput(UC), 2), 0.5), "V")}<br>`;
			}
		}
		if (!f) {
			if (L && C) {
				result += `
                        Resonanzfrequenz f<sub>r</sub> = 
                        <div class ="fraction">
                            <span> 1 </span><br>
                            <span class="fraction-denominator">2&pi; &radic;(L &lowast; C)</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span>1</span><br>
                            <span class="fraction-denominator">2&pi; &radic;(${L}H &lowast; ${C}F)</span>
                        </div> 
                    = ${formatWithPrefix(1 / (2 * Math.PI * Math.pow(parseInput(L) * parseInput(C), 0.5)), "Hz")}<br>`;
			}
			if (XL && L) {
				result += `
                        Frequnez f = 
                        <div class ="fraction">
                            <span> X<sub>L</sub> </span><br>
                            <span class="fraction-denominator">2&pi; &lowast; L</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span>${XL}&Omega;</span><br>
                            <span class="fraction-denominator">2&pi; &lowast; ${L}H</span>
                        </div> 
                    = ${formatWithPrefix(parseInput(XL) / (2 * Math.PI * parseInput(L)), "Hz")}<br>`;
			}
			if (XC && C) {
				result += `
                        Blindwiderstand X<sub>C</sub> = 
                        <div class ="fraction">
                            <span> 1 </span><br>
                            <span class="fraction-denominator">2&pi; &lowast; X<sub>C</sub> &lowast; C</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span>1</span><br>
                            <span class="fraction-denominator">2&pi; &lowast; ${XC}&Omega; &lowast; ${C}F</span>
                        </div> 
                    = ${formatWithPrefix(1 / (2 * Math.PI * parseInput(XC) * parseInput(C)), "&Omega;")}<br>`;
			}
		}
		setHTML(document.getElementById("result"), result);
	}
	function calculateParallel() {
		let result_parallel = ``;
		const I = document.getElementById("I-parallel").value;
		const IR = document.getElementById("IR-parallel").value;
		const IL = document.getElementById("IL-parallel").value;
		const IC = document.getElementById("IC-parallel").value;
		const R = document.getElementById("R-parallel").value;
		const XL = document.getElementById("XL-parallel").value;
		const XC = document.getElementById("XC-parallel").value;
		const L = document.getElementById("L-parallel").value;
		const Q = document.getElementById("Q-parallel").value;
		const C = document.getElementById("C-parallel").value;
		const f = document.getElementById("f-parallel").value;
		const b = document.getElementById("b-parallel").value;
		if (!I) {
			if (IR && IL && IC) {
				result_parallel += `
                    Strom I<sub>ges</sub> = &radic;((I<sub>R</sub>)<sup>2</sup> + (I<sub>L</sub> - I<sub>C</sub>)<sup>2</sup>)
                    =
                        &radic;((${IR}A)<sup>2</sup> + (${IL}A - ${IC}A)<sup>2</sup>)
                    = ${formatWithPrefix(Math.pow(Math.pow(parseInput(IR), 2) + Math.pow(parseInput(IL) - parseInput(IC), 2), 0.5), "A")}<br>`;
			}
		}
		if (!XL) {
			if (f && L) {
				result_parallel += `
                    Blindwiderstand X<sub>L</sub> = 2&pi; &lowast; f &lowast; L
                =
                    2&pi; &lowast; ${f}Hz &lowast; ${L}H
                = ${formatWithPrefix(2 * Math.PI * parseInput(f) * parseInput(L), "&Omega;")}<br>`;
			}
		}
		if (!XC) {
			if (f && C) {
				result_parallel += `
                        Blindwiderstand X<sub>C</sub> = 
                        <div class ="fraction">
                            <span> 1 </span><br>
                            <span class="fraction-denominator">2&pi; &lowast; f &lowast; C</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span>1</span><br>
                            <span class="fraction-denominator">2&pi; &lowast; ${f}Hz &lowast; ${C}F</span>
                        </div> 
                    = ${formatWithPrefix(1 / (2 * Math.PI * parseInput(f) * parseInput(C)), "&Omega;")}<br>`;
			}
		}
		if (!L) {
			if (f && C) {
				result_parallel += `
                        Induktivit&auml;t L = 
                        <div class ="fraction">
                            <span> 1 </span><br>
                            <span class="fraction-denominator">(2&pi; &lowast; f)<sup>2</sup> &lowast; C</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span>1</span><br>
                            <span class="fraction-denominator">(2&pi; &lowast; ${f}Hz)<sup>2</sup> &lowast; ${C}F</span>
                        </div> 
                    = ${formatWithPrefix(1 / (Math.pow(2 * Math.PI * parseInput(f), 2) * parseInput(C)), "H")}<br>`;
			}
			if (XL && f) {
				result_parallel += `
                        Induktivit&auml;t L =
                        <div class ="fraction">
                            <span> X<sub>L</sub> </span><br>
                            <span class="fraction-denominator">2&pi; &lowast; f</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span>${XL}&Omega;</span><br>
                            <span class="fraction-denominator">2&pi; &lowast; ${f}Hz</span>
                        </div> 
                    = ${formatWithPrefix(parseInput(XL) / (2 * Math.PI * parseInput(f)), "H")}<br>`;
			}
		}
		if (!Q) {
			if (!IL && I) {
				result_parallel += `
                        (Kreis) G&uuml;te Q = 
                        <div class ="fraction">
                            <span class="fraction-numerator"> I<sub>L</sub> </span><br>
                            <span>I</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator"> ${IL}A </span><br>
                            <span>${I}A</span>
                        </div> 
                    = ${formatWithPrefix(parseInput(IL) / parseInput(I), " ")}<br>`;
			}
			if (!IC && I) {
				result_parallel += `
                        (Kreis) G&uuml;te Q = 
                        <div class ="fraction">
                            <span class="fraction-numerator"> I<sub>C</sub> </span><br>
                            <span>I</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator"> ${IC}A </span><br>
                            <span>${I}A</span>
                        </div> 
                    = ${formatWithPrefix(parseInput(IC) / parseInput(I), " ")}<br>`;
			}
			if (XL && R) {
				result_parallel += `
                        (Kreis) G&uuml;te Q = 
                        <div class ="fraction">
                            <span class="fraction-numerator"> R </span><br>
                            <span>X<sub>L</sub></span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator"> ${R}&Omega; </span><br>
                            <span>${XL}&Omega;</span>
                        </div> 
                    = ${formatWithPrefix(parseInput(R) / parseInput(XL), " ")}<br>`;
			}
			if (XC && R) {
				result_parallel += `
                        (Kreis) G&uuml;te Q = 
                        <div class ="fraction">
                            <span class="fraction-numerator"> R </span><br>
                            <span>X<sub>C</sub></span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator"> ${R}&Omega; </span><br>
                            <span>${XC}&Omega;</span>
                        </div> 
                    = ${formatWithPrefix(parseInput(R) / parseInput(XC), " ")}<br>`;
			}
			if (L && C && Q) {
				result_parallel += `
                        (Kreis) G&uuml;te Q = 
                        R<sub>v</sub> &lowast; &radic;(
                        <div class ="fraction">
                            <span>L</span><br>
                            <span class="fraction-denominator">C</span>
                        </div> )
                    =
                        ${R}&Omega; &lowast; &radic;(
                        <div class ="fraction">
                            <span>${L}H</span><br>
                            <span class="fraction-denominator">${C}F</span>
                        </div> )
                    = ${formatWithPrefix(parseInput(R) * (2 * Math.PI * Math.pow(parseInput(L) / parseInput(C), 0.5)), "")}<br>`;
			}
			if (L && C && b) {
				result_parallel += `
                        (Kreis) G&uuml;te Q = 
                        <div class ="fraction">
                            <span>1</span><br>
                            <span class="fraction-denominator">2&pi; &lowast; b &radic;(C &lowast; L)</span>
                        </div>
                    =
                        <div class ="fraction">
                            <span>1</span><br>
                            <span class="fraction-denominator">2&pi; &lowast; ${b}Hz &radic;(${C}F &lowast; ${L}H)</span>
                        </div> 
                    = ${formatWithPrefix(1 / (2 * Math.PI * parseInput(b) * Math.pow(parseInput(L) * parseInput(C), 0.5)), "")}<br>`;
			}
			if (f && b) {
				result_parallel += `
                        (Kreis) G&uuml;te Q = 
                        <div class ="fraction">
                            <span>f</span><br>
                            <span class="fraction-denominator">b</span>
                        </div>
                    =
                        <div class ="fraction">
                            <span>${f}Hz</span><br>
                            <span class="fraction-denominator">${b}Hz</span>
                        </div> 
                    = ${formatWithPrefix(parseInput(f) / parseInput(b), "")}<br>`;
			}
		}
		if (!C) {
			if (f && L) {
				result_parallel += `
                        Kapazit&auml;t C = 
                        <div class ="fraction">
                            <span> 1 </span><br>
                            <span class="fraction-denominator">(2&pi; &lowast; f)<sup>2</sup> &lowast; L</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span>1</span><br>
                            <span class="fraction-denominator">(2&pi; &lowast; ${f}Hz)<sup>2</sup> &lowast; ${L}H</span>
                        </div> 
                    = ${formatWithPrefix(1 / (Math.pow(2 * Math.PI * parseInput(f), 2) * parseInput(L)), "F")}<br>`;
			}
			if (XC && f) {
				result_parallel += `
                        Kapazit&auml;t C = 
                        <div class ="fraction">
                            <span> 1 </span><br>
                            <span class="fraction-denominator">2&pi; &lowast; f &lowast; X<sub>C</sub></span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span>1</span><br>
                            <span class="fraction-denominator">2&pi; &lowast; ${f}Hz &lowast; ${XL}&Omega;</span>
                        </div> 
                    = ${formatWithPrefix(1 / (2 * Math.PI * parseInput(f) * parseInput(XL)), "F")}<br>`;
			}
			if (Q && R && L) {
				result_parallel += `
                        Kapazit&auml;t C = 
                        <div class ="fraction">(
                            <span> Q </span><br>
                            <span class="fraction-denominator">R</span>
                        </div> )<sup>2</sup> &lowast; L
                    = (
                        <div class ="fraction">
                            <span>${Q}</span><br>
                            <span class="fraction-denominator">${R}&Omega;</span>
                        </div> )<sup>2</sup> &lowast; ${L}H
                    = ${formatWithPrefix(Math.pow(parseInput(Q) / parseInput(f), 2) * parseInput(L), "F")}<br>`;
			}
		}
		if (!f) {
			if (L && C) {
				result_parallel += `
                        Resonanzfrequenz f<sub>r</sub> = 
                        <div class ="fraction">
                            <span> 1 </span><br>
                            <span class="fraction-denominator">2&pi; &radic;(L &lowast; C)</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span>1</span><br>
                            <span class="fraction-denominator">2&pi; &radic;(${L}H &lowast; ${C}F)</span>
                        </div> 
                    = ${formatWithPrefix(1 / (2 * Math.PI * Math.pow(parseInput(L) * parseInput(C), 0.5)), "Hz")}<br>`;
			}
			if (XL && L) {
				result_parallel += `
                        Frequnez f = 
                        <div class ="fraction">
                            <span> X<sub>L</sub> </span><br>
                            <span class="fraction-denominator">2&pi; &lowast; L</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span>${XL}&Omega;</span><br>
                            <span class="fraction-denominator">2&pi; &lowast; ${L}H</span>
                        </div> 
                    = ${formatWithPrefix(parseInput(XL) / (2 * Math.PI * parseInput(L)), "Hz")}<br>`;
			}
			if (XC && C) {
				result_parallel += `
                        Blindwiderstand X<sub>C</sub> = 
                        <div class ="fraction">
                            <span> 1 </span><br>
                            <span class="fraction-denominator">2&pi; &lowast; X<sub>C</sub> &lowast; C</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span>1</span><br>
                            <span class="fraction-denominator">2&pi; &lowast; ${XC}&Omega; &lowast; ${C}F</span>
                        </div> 
                    = ${formatWithPrefix(1 / (2 * Math.PI * parseInput(XC) * parseInput(C)), "&Omega;")}<br>`;
			}
		}
		setHTML(document.getElementById("result_parallel"), result_parallel);
	}
	return {
		handlers: {
			toggleSelection,
			calculateSerie,
			calculateParallel,
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
