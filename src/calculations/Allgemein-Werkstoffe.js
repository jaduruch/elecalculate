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
	function calculateLeitfaehigkeit() {
		let result_Leiter = ``;
		const R = document.getElementById("R").value;
		const x = document.getElementById("x").value;
		const p = document.getElementById("p").value;
		const A = document.getElementById("A").value;
		const d = document.getElementById("d").value;
		const l = document.getElementById("l").value;
		if (!R) {
			if (l && x && A) {
				result_Leiter += `
                            Widerstand R<sub>ges</sub> = 
                            <div class ="fraction">
                                <span> l </span><br>
                                <span class="fraction-denumerator">A &lowast; &chi; </span>
                            </div> 
                        =
                            <div class ="fraction">
                                <span> ${l}m </span><br>
                                <span class="fraction-denumerator">${A}m<sup>2</sup> &lowast; ${x}&m/(&Omega; &lowast; mm<sup>2</sup>)</span>
                            </div> 
                        = ${formatWithPrefix(parseInput(l) / (parseInputsquare(A) * 1e6 * parseInput(x)), "&Omega;")}<br>`;
			}
			if (l && x && d) {
				result_Leiter += `
                            Widerstand R<sub>ges</sub> = 
                            <div class ="fraction">
                                <span>4 &lowast; l </span><br>
                                <span class="fraction-denumerator">&pi; &lowast; d<sup>2</sup> &lowast; &chi;</span>
                            </div> 
                        =
                            <div class ="fraction">
                                <span>4 &lowast; ${l}m </span><br>
                                <span class="fraction-denumerator"> &pi; &lowast; (${d}m)<sup>2</sup> &lowast; ${x}&m/(&Omega; &lowast; mm<sup>2</sup></span>
                            </div> 
                        = ${formatWithPrefix((4 * parseInput(l)) / (Math.PI * Math.pow(parseInput(d), 2) * 1e6 * parseInput(x)), "&Omega;")}<br>`;
			}
			if (l && p && A) {
				result_Leiter += `
                            Widerstand R<sub>ges</sub> = 
                            <div class ="fraction">
                                <span class="fraction-numerator"> l &lowast; &rho; </span><br>
                                <span>A </span>
                            </div> 
                        =
                            <div class ="fraction">
                                <span class="fraction-numerator"> ${l}m &lowast; ${p}(&Omega; &lowast; mm<sup>2</sup>)/m</span><br>
                                <span>${A}m<sup>2</sup></span>
                            </div> 
                        = ${formatWithPrefix((parseInput(l) * parseInput(p)) / (parseInputsquare(A) * 1e6), "&Omega;")}<br>`;
			}
			if (l && p && d) {
				result_Leiter += `
                            Widerstand R<sub>ges</sub> = 
                            <div class ="fraction">
                                <span class="fraction-numerator">4 &lowast; l  &lowast; &rho;</span><br>
                                <span>&pi; &lowast; d<sup>2</sup></span>
                            </div> 
                        =
                            <div class ="fraction">
                                <span class="fraction-numerator">4 &lowast; ${l}m &lowast; ${p}(&Omega; &lowast; mm<sup>2</sup>)/m</span><br>
                                <span> &pi; &lowast; (${d}m)<sup>2</sup> </span>
                            </div> 
                        = ${formatWithPrefix((4 * parseInput(l) * parseInput(p)) / (Math.PI * Math.pow(parseInput(d), 2) * 1e6), "&Omega;")}<br>`;
			}
		}
		if (!x) {
			if (p) {
				result_Leiter += `
                            Leitf&auml;higkeit &chi; = 
                            <div class ="fraction">
                                <span> 1 </span><br>
                                <span class="fraction-denumerator">&rho;</span>
                            </div> 
                        =
                            <div class ="fraction">
                                <span>1</span><br>
                                <span class="fraction-denumerator">${p}(&Omega; &lowast; mm<sup>2</sup>)/m</span>
                            </div> 
                        = ${formatWithPrefix(1 / parseInput(p), " m/(&Omega; &lowast; mm<sup>2</sup>)")}<br>`;
			}
			if (A && l && R) {
				result_Leiter += `
                            Leitf&auml;higkeit &chi; = 
                            <div class ="fraction">
                                <span> l </span><br>
                                <span class="fraction-denumerator">A &lowast; R</span>
                            </div> 
                        =
                            <div class ="fraction">
                                <span> ${l}m </span><br>
                                <span class="fraction-denumerator">${A}m<sup>2</sup> &lowast; ${R}&Omega;</span>
                            </div> 
                        = ${formatWithPrefix(parseInput(l) / (parseInputsquare(A) * 1e6 * parseInput(R)), " m/(&Omega; &lowast; mm<sup>2</sup>)")}<br>`;
			}
			if (d && l && R) {
				result_Leiter += `
                            Leitf&auml;higkeit &chi; = 
                            <div class ="fraction">
                                <span>4 &lowast; l </span><br>
                                <span class="fraction-denumerator"&pi; &lowast; d<sup>2</sup> &lowast; R</span>
                            </div> 
                        =
                            <div class ="fraction">
                                <span>4 &lowast; ${l}m </span><br>
                                <span class="fraction-denumerator">&pi; &lowast; (${d}m)<sup>2</sup> &lowast; ${R}&Omega;</span>
                            </div> 
                        = ${formatWithPrefix((4 * parseInput(l)) / (Math.PI * Math.pow(parseInput(d), 2) * 1e6 * parseInput(R)), " m/(&Omega; &lowast; mm<sup>2</sup>)")}<br>`;
			}
		}
		if (!p) {
			if (x) {
				result_Leiter += `
                            Spezifischer Widerstand &rho; = 
                            <div class ="fraction">
                                <span> 1 </span><br>
                                <span class="fraction-denumerator">&chi;</span>
                            </div> 
                        =
                            <div class ="fraction">
                                <span>1</span><br>
                                <span class="fraction-denumerator">${x}m/(&Omega; &lowast; mm<sup>2</sup>)</span>
                            </div> 
                        = ${formatWithPrefix(1 / parseInput(x), " (&Omega; &lowast; mm<sup>2</sup>)/m")}<br>`;
			}
			if (R && A && l) {
				result_Leiter += `
                            Spezifischer Widerstand &rho; = 
                            <div class ="fraction">
                                <span>A &lowast; R</span><br>
                                <span class="fraction-denumerator">l</span>
                            </div> 
                        =
                            <div class ="fraction">
                                <span>${A}m<sup>2</sup> &lowast; ${R}&Omega;</span><br>
                                <span class="fraction-denumerator">${l}m</span>
                            </div> 
                        = ${formatWithPrefix((parseInputsquare(A) * 1e6 * parseInput(R)) / parseInput(l), " (&Omega; &lowast; mm<sup>2</sup>)/m")}<br>`;
			}
			if (R && d && l) {
				result_Leiter += `
                            Spezifischer Widerstand &rho; = 
                            <div class ="fraction">
                                <span>&pi; &lowast; d<sup>2</sup> &lowast; R</span><br>
                                <span class="fraction-denumerator">4 &lowast; l</span>
                            </div> 
                        =
                            <div class ="fraction">
                                <span>&pi; &lowast; (${d}m)<sup>2</sup> &lowast; ${R}&Omega;</span><br>
                                <span class="fraction-denumerator">4 &lowast; ${l}m</span>
                            </div> 
                        = ${formatWithPrefix((Math.PI * Math.pow(parseInput(d), 2) * 1e6 * parseInput(R)) / (4 * parseInput(l)), " (&Omega; &lowast; mm<sup>2</sup>)/m")}<br>`;
			}
		}
		if (!A) {
			if (d) {
				result_Leiter += `
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
			if (x && l && R) {
				result_Leiter += `
                        Fl&auml;che A = 
                        <div class ="fraction">
                            <span> l </span><br>
                            <span class="fraction-denumerator">&chi; &lowast; R</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span> ${l}m </span><br>
                            <span class="fraction-denumerator">${x}m/(&Omega; &lowast; mm<sup>2</sup>) &lowast; ${R}&Omega;</span>
                        </div> 
                    = ${formatWithPrefixsquare((parseInput(l) * 1e-6) / (parseInput(x) * parseInput(R)), "m<sup>2</sup>")}<br>`;
			}
			if (p && l && R) {
				result_Leiter += `
                        Fl&auml;che A = 
                        <div class ="fraction">
                            <span class="fraction-numerator">&rho; &lowast; l </span><br>
                            <span>R</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator">${p}(&Omega; &lowast; mm<sup>2</sup>)/m &lowast; ${l}m </span><br>
                            <span> ${R}&Omega;</span>
                        </div> 
                    = ${formatWithPrefixsquare((parseInput(p) * 1e-6 * parseInput(l)) / parseInput(R), "m<sup>2</sup>")}<br>`;
			}
		}
		if (!d) {
			if (A) {
				result_Leiter += `
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
			if (l && x && d) {
				result_Leiter += `
                        Leiterdurchmesser d = 
                        &radic;(<div class ="fraction">
                                <span>4 &lowast; l </span><br>
                                <span class="fraction-denumerator">&pi; &lowast; R &lowast; &chi;</span>
                            </div>)
                        =
                            &radic;(<div class ="fraction">
                                <span>4 &lowast; ${l}m </span><br>
                                <span class="fraction-denumerator"> &pi; &lowast; ${R}&Omega; &lowast; ${x}m/(&Omega; &lowast; mm<sup>2</sup></span>
                            </div>)
                        = ${formatWithPrefix(Math.pow((4 * parseInput(l) * 1e-6) / (Math.PI * parseInput(R) * parseInput(x)), 0.5), "m")}<br>`;
			}
			if (l && p && d) {
				result_Leiter += `
                        Leiterdurchmesser d = 
                        &radic;(<div class ="fraction">
                                <span class="fraction-numerator">4 &lowast; l  &lowast; &rho;</span><br>
                                <span>&pi; &lowast; R</span>
                            </div>)
                        =
                            &radic;(<div class ="fraction">
                                <span class="fraction-numerator">4 &lowast; ${l}m &lowast; ${p}(&Omega; &lowast; mm<sup>2</sup>)/m</span><br>
                                <span> &pi; &lowast; ${R}&Omega;</span>
                            </div>)
                        = ${formatWithPrefix(Math.pow((4 * parseInput(l) * parseInput(p) * 1e-6) / (Math.PI * parseInput(R)), 0.5), "m")}<br>`;
			}
		}
		if (!l) {
			if (A && R && p) {
				result_Leiter += `
                            Leiterl&auml;nge l =
                            <div class ="fraction">
                                <span class="fraction-numerator">A &lowast; R</span><br>
                                <span>&rho;</span>
                            </div> 
                        =
                            <div class ="fraction">
                                <span class="fraction-numerator">${A}m<sup>2</sup> &lowast; ${R}&Omega;</span><br>
                                <span>${p}(&Omega; &lowast; mm<sup>2</sup>)/m</span>
                            </div> 
                        = ${formatWithPrefix((parseInputsquare(A) * 1e6 * parseInput(R)) / parseInput(p), "m")}<br>`;
			}
			if (d && R && p) {
				result_Leiter += `
                        Leiterl&auml;nge l = 
                        <div class ="fraction">
                            <span class="fraction-numerator">&pi; &lowast; d<sup>2</sup> &lowast; R</span><br>
                            <span>4 &lowast; &rho;</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator"> &pi; &lowast; (${d}m)<sup>2</sup> &lowast; ${R}&Omega; </span><br>
                            <span>4 &lowast; ${p}(&Omega; &lowast; mm<sup>2</sup>)/m</span>
                        </div> 
                    = ${formatWithPrefix((Math.PI * Math.pow(parseInput(d), 2) * 1e6 * parseInput(R)) / (4 * parseInput(p)), "m")}<br>`;
			}
			if (R && x && A) {
				result_Leiter += `
                            Leiterl&auml;nge l = 
                            &chi; &lowast; R &lowast; A
                        =
                            ${x}m/(&Omega; &lowast; mm<sup>2</sup>) &lowast; ${R}&Omega; &lowast; ${A}m<sup>2</sup>
                        = ${formatWithPrefix(parseInput(x) * parseInput(R) * parseInputsquare(A) * 1e6, "m")}<br>`;
			}
			if (d && R && x) {
				result_Leiter += `
                            Leiterl&auml;nge l =
                            <div class ="fraction">
                                <span class="fraction-numerator">&pi; &lowast; d<sup>2</sup> &lowast; R &lowast; &chi;</span><br>
                                <span>4</span>
                            </div> 
                        =
                            <div class ="fraction">
                                <span class="fraction-numerator">(${d}m)<sup>2</sup> &lowast; ${R}&Omega; &lowast; ${x}m/(&Omega; &lowast; mm<sup>2</sup></span><br>
                                <span>4</span>
                            </div> 
                        = ${formatWithPrefix((Math.PI * Math.pow(parseInput(d), 2) * 1e6 * parseInput(R) * parseInput(x)) / 4, "m")}<br>`;
			}
		}
		setHTML(document.getElementById("result_Leiter"), result_Leiter);
	}
	function calculateTemperaturwiderstand() {
		let result_Temp = ``;
		const Rw = document.getElementById("Rw").value;
		const Rk = document.getElementById("Rk").value;
		const alpha = document.getElementById("alpha").value;
		const T = document.getElementById("T").value;
		const Tw = document.getElementById("Tw").value;
		const Tk = document.getElementById("Tk").value;
		if (!Rk) {
			if (Rw && alpha && T) {
				result_Temp += `
                        Kaltwiderstand R = 
                            <div class ="fraction">
                                <span class="fraction-numerator">R<sub>&thetasym;</sub></span><br>
                                <span>1 + &alpha; &lowast; &Delta;T</span>
                            </div>
                        =
                            <div class ="fraction">
                                <span class="fraction-numerator"> ${Rw}&Omega;</span><br>
                                <span>1 + ${alpha}K<sup>-1</sup> &lowast; ${T}K</span>
                            </div>
                        = ${formatWithPrefix(parseInput(Rw) / (1 + parseInput(alpha) * parseInput(T)), "&Omega;")}<br>`;
			}
		}
		if (!Rw) {
			if (Rk && alpha && T) {
				result_Temp += `
                            Warmwiderstand R<sub>&thetasym;</sub> = 
                            R &lowast; (1 + &alpha; &lowast; &Delta;T)
                        =
                            ${Rk}&Omega; &lowast; (1 + ${alpha}K<sup>-1</sup> &lowast; ${T}K)
                        = ${formatWithPrefix(parseInput(Rk) * (1 + parseInput(alpha) * parseInput(T)), "&Omega;")}<br>`;
			}
		}
		if (!alpha) {
			if (Rk && Rw && T)
				result_Temp += `
                        Temperaturbeiwert &alpha; = 
                            <div class ="fraction">
                                <span class="fraction-numerator">R<sub>&thetasym;</sub> - R</span><br>
                                <span>R &lowast; &Delta;T</span>
                            </div>
                        =
                            <div class ="fraction">
                                <span class="fraction-numerator">${Rw}&Omega; - ${Rk}&Omega;</span><br>
                                <span>${Rk}&Omega; &lowast; ${T}K</span>
                            </div>
                        = ${formatWithPrefix((parseInput(Rw) - parseInput(Rk)) / (parseInput(Rk) * parseInput(T)), "K<sup>-1</sup>")}<br>`;
		}
		if (!T) {
			if (Rw && Rk && alpha) {
				result_Temp += `
                        Temperatur&auml;nderung &Delta;T = 
                            <div class ="fraction">
                                <span class="fraction-numerator">R<sub>&thetasym;</sub> - R<sub>20</sub></span><br>
                                <span>R<sub>20</sub> &lowast; &alpha;</span>
                            </div>
                        =
                            <div class ="fraction">
                                <span class="fraction-numerator"> ${Rw}&Omega; - ${Rk}&Omega;</span><br>
                                <span>${Rk}&Omega; &lowast; ${alpha}K<sup>-1</sup></span>
                            </div>
                        = ${formatWithPrefix((parseInput(Rw) - parseInput(Rk)) / (parseInput(Rk) * parseInput(alpha)), "K")}<br>`;
			}
		}
		if (!Tw) {
			if (Rw && Rk && alpha && Tk) {
				result_Temp += `
                        Warmwert T<sub>w</sub> = 
                            <div class ="fraction">
                                <span class="fraction-numerator">R<sub>&thetasym;</sub> - R<sub>20</sub></span><br>
                                <span>R<sub>20</sub> &lowast; &alpha;</span>
                            </div> - T<sub>k</sub>
                        =
                            <div class ="fraction">
                                <span class="fraction-numerator"> ${Rw}&Omega; - ${Rk}&Omega;</span><br>
                                <span>${Rk}&Omega; &lowast; ${alpha}K<sup>-1</sup></span>
                            </div> - ${Tk}&deg;C
                        = ${formatWithPrefix((parseInput(Rw) - parseInput(Rk)) / (parseInput(Rk) * parseInput(alpha)) - parseInput(Tk), "&deg;C")}<br>`;
			}
		}
		setHTML(document.getElementById("result_Temp"), result_Temp);
	}
	function calculateStromdichte() {
		let result_Stromd = ``;
		const I = document.getElementById("I_J").value;
		const d = document.getElementById("d_J").value;
		const A = document.getElementById("A_J").value;
		const J = document.getElementById("J").value;
		if (!I) {
			if (d && J) {
				result_Stromd += `
                            Strom I = 
                            <div class ="fraction"> 
                                <span class="fraction-numerator"> d<sup>2</sup> &lowast; &pi; &lowast; J</span><br>
                                <span>4</span>
                            </div> 
                        =
                            <div class ="fraction"> 
                                <span class="fraction-numerator">(${d}m)<sup>2</sup> &lowast; &pi; &lowast; ${J}A/mm<sup>2</sup></span><br>
                                <span>4</span>
                            </div> 
                        = ${formatWithPrefix((Math.pow(parseInput(d), 2) / 4) * Math.PI * 1e6 * parseInput(J), "A")}<br>`;
			}
			if (A && J) {
				result_Stromd += `
                            Strom I = 
                            A &lowast; J
                        =
                            ${A}m<sup>2</sup> &lowast; ${J}A/mm<sup>2</sup>
                        = ${formatWithPrefix(parseInputsquare(A) * 1e6 * parseInput(J), "A")}<br>`;
			}
		}
		if (!d) {
			if (I && J) {
				result_Stromd += `
                        Durchmesser d = 
                        &radic;(<div class ="fraction"> 
                            <span> 4 &lowast; I </span><br>
                            <span class="fraction-denumerator">&pi; &lowast; J</span>
                        </div>)
                    =
                        &radic;(<div class ="fraction"> 
                            <span>4 &lowast; ${I}A </span><br>
                            <span class="fraction-denumerator">&pi; &lowast; ${J}A/mm<sup>2</sup></span>
                        </div>)
                    = ${formatWithPrefix(Math.pow((4 * parseInput(I)) / (Math.PI * parseInput(J) * 1e6), 0.5), "m")}<br>`;
			}
			if (A) {
				result_Stromd += `
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
		}
		if (!A) {
			if (d) {
				result_Stromd += `
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
			if (I && J) {
				result_Stromd += `
                            Querschnitt A = 
                            <div class ="fraction"> 
                                <span> I </span><br>
                                <span class="fraction-denumerator"> J </span>
                            </div>
                        =
                            <div class ="fraction"> 
                                <span>${I}A </span><br>
                                <span class="fraction-denumerator">${J}A/mm<sup>2</sup></span>
                            </div>
                        = ${formatWithPrefixsquare((parseInput(I) * 1e-6) / parseInput(J), "m<sup>2</sup>")}<br>`;
			}
		}
		if (!J) {
			if (I && A) {
				result_Stromd += `
                            Stromdichte J = 
                            <div class ="fraction"> 
                                <span> I </span><br>
                                <span class="fraction-denumerator"> A </span>
                            </div>
                        =
                            <div class ="fraction"> 
                                <span>${I}A </span><br>
                                <span class="fraction-denumerator">${A}m<sup>2</sup></span>
                            </div>
                        = ${formatWithPrefix(parseInput(I) / (parseInputsquare(A) * 1e6), "A/mm<sup>2</sup>")}<br>`;
			}
			if (d && I) {
				result_Stromd += `
                            Strom I = 
                            <div class ="fraction"> 
                                <span class="fraction-numerator">4 &lowast; A</span><br>
                                <span>d<sup>2</sup> &lowast; &pi;</span>
                            </div> 
                        =
                            <div class ="fraction"> 
                                <span class="fraction-numerator">4 &lowast; ${I}A</span><br>
                                <span>(${d}m)<sup>2</sup> &lowast; &pi;</span>
                            </div> 
                        = ${formatWithPrefix((4 * parseInput(I)) / (Math.pow(parseInput(d), 2) * 1e6 * Math.PI), "A/mm<sup>2</sup>")}<br>`;
			}
		}
		setHTML(document.getElementById("result_Stromd"), result_Stromd);
	}
	return {
		handlers: {
			toggleDropdown,
			calculateLeitfaehigkeit,
			calculateTemperaturwiderstand,
			calculateStromdichte,
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
