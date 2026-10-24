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
	function calculateInductorParameters() {
		let result = ``;
		let prevResult = `1`;
		let I = document.getElementById("I").value;
		let L = document.getElementById("L").value;
		let ur = document.getElementById("ur").value;
		let N = document.getElementById("N").value;
		let v = document.getElementById("v").value;
		let A = document.getElementById("A").value;
		let Phi = document.getElementById("Phi").value;
		let U = document.getElementById("U").value;
		let Al = document.getElementById("Al").value;
		let l = document.getElementById("l").value;
		let B = document.getElementById("B").value;
		let t = document.getElementById("t").value;
		while (prevResult != result) {
			prevResult = result;
			if (!I && Phi && N && L) {
				I = formatPrefixNoUnit(
					(parseInput(Phi) * parseInput(N)) / parseInput(L),
				);
				result += `
                        Strom I = 
                        <div class ="fraction">
                            <span class="fraction-numerator">&Phi; &lowast; N</span><br>
                            <span>L</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator"> ${Phi}Wb &lowast; ${N}</span><br>
                            <span>${L}H</span>
                        </div> 
                    = ${I}A <br>`;
			}
			if (!I && U && t && L) {
				I = formatPrefixNoUnit(
					-(parseInput(U) * parseInput(t)) / parseInput(L),
				);
				result += `
                        Strom&auml;nderung &Delta;I = 
                        <div class ="fraction">
                            <span class="fraction-numerator">-u<sub>0</sub> &lowast; &Delta;t</span><br>
                            <span>L</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator"> -${U}V &lowast; ${t}s</span><br>
                            <span>${L}H</span>
                        </div> 
                    = ${I}A <br>`;
			}
			if (!L && ur && N && A && l) {
				L = formatPrefixNoUnit(
					(parseInput(ur) *
						1.257e-6 *
						Math.pow(parseInput(N), 2) *
						parseInputsquare(A)) /
						parseInput(l),
				);
				result += `
                        Induktivit&auml;t L = 
                        <div class ="fraction">
                            <span class="fraction-numerator">&mu;<sub>r</sub> &lowast; &mu;<sub>0</sub> &lowast; N<sup>2</sup> &lowast; A</span><br>
                            <span>l</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator"> ${ur} &lowast; 1.257&lowast;10<sup>-6</sup>Vs/Am &lowast; (${N})<sup>2</sup> &lowast; ${A}m<sup>2</sup></span><br>
                            <span>${l}m</span>
                        </div> 
                    = ${L}H <br>`;
			}
			if (!L && Al && N) {
				L = formatPrefixNoUnit(parseInput(Al) * Math.pow(parseInput(N), 2));
				result += `
                        Induktivit&auml;t L =
                        A<sub>L</sub> &lowast; N<sup>2</sup>
                    =
                        ${Al}Vs/A &lowast; (${N})<sup>2</sup>
                    = ${L}H <br>`;
			}
			if (!L && Phi && N && I) {
				L = formatPrefixNoUnit(
					(parseInput(Phi) * parseInput(N)) / parseInput(I),
				);
				result += `
                        Induktivit&auml;t L = 
                        <div class ="fraction">
                            <span class="fraction-numerator">&Phi; &lowast; N</span><br>
                            <span>I</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator"> ${Phi}Wb &lowast; ${N}</span><br>
                            <span>${I}A</span>
                        </div> 
                    = ${L}H <br>`;
			}
			if (!L && U && t && I) {
				L = formatPrefixNoUnit(
					-(parseInput(U) * parseInput(t)) / parseInput(I),
				);
				result += `
                        Induktivit&auml;t L = 
                        <div class ="fraction">
                            <span class="fraction-numerator">-u<sub>0</sub> &lowast; &Delta;t</span><br>
                            <span>&Delta;I</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator"> -${U}V &lowast; ${t}s</span><br>
                            <span>&Delta;${I}A</span>
                        </div> 
                    = ${L}H <br>`;
			}
			if (!ur && L && l && A && N) {
				ur = formatPrefixNoUnit(
					(parseInput(L) * parseInput(l)) /
						(parseInputsquare(A) * 1.257e-6 * Math.pow(parseInput(N), 2)),
				);
				result += `
                        Permeabilit&auml;t &mu;<sub>r</sub> = 
                        <div class ="fraction">
                            <span>L &lowast; l</span><br>
                            <span class="fraction-denumerator">A &lowast; &mu;<sub>0</sub> &lowast; N<sup>2</sup></span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span>${L}H &lowast; ${l}m</span><br>
                            <span class="fraction-denumerator">${A}m<sup>2</sup> &lowast; 1.257&lowast;10<sup>-6</sup>Vs/Am &lowast; (${N})<sup>2</sup></span>
                        </div> 
                    = ${ur}<br>`;
			}
			if (!N && L && l && ur && A) {
				N = formatPrefixNoUnit(
					Math.pow(
						(parseInput(L) * parseInput(l)) /
							(parseInput(ur) * 1.257e-6 * parseInputsquare(A)),
						0.5,
					),
				);
				result += `
                        Windungszahl N = &radic; 
                        (<div class ="fraction">
                            <span>L &lowast; l</span><br>
                            <span class="fraction-denumerator">&mu;<sub>0</sub> &lowast; &mu;<sub>r</sub> &lowast; A</span>
                        </div>)
                    = &radic; 
                        (<div class ="fraction">
                            <span>${L}H &lowast; ${l}m</span><br>
                            <span class="fraction-denumerator">${ur} &lowast; 1.257&lowast;10<sup>-6</sup>Vs/Am &lowast; ${A}m<sup>2</sup></span>
                        </div>)
                    = ${N}<br>`;
			}
			if (!N && L && Al) {
				N = formatPrefixNoUnit(Math.pow(parseInput(L) / parseInput(Al), 0.5));
				result += `
                        Windungszahl N = &radic; 
                        (<div class ="fraction">
                            <span>L</span><br>
                            <span class="fraction-denumerator">A<sub>L</sub></span>
                        </div>)
                    = &radic;
                        (<div class ="fraction">
                            <span>${L}H</span><br>
                            <span class="fraction-denumerator">${Al}Vs/A</span>
                        </div>)
                    = ${N} <br>`;
			}
			if (!N && Phi && L && I) {
				N = formatPrefixNoUnit(
					(parseInput(L) * parseInput(I)) / parseInput(Phi),
				);
				result += `
                        Windungszahl N = 
                        <div class ="fraction">
                            <span class="fraction-numerator">L &lowast; I</span><br>
                            <span>&Phi;</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator"> ${L}H &lowast; ${I}A</span><br>
                            <span>${Phi}Wb</span>
                        </div> 
                    = ${N}<br>`;
			}
			if (!N && U && t && Phi) {
				N = formatPrefixNoUnit(
					-(parseInput(U) * parseInput(t)) / parseInput(Phi),
				);
				result += `
                        Windungszahl N  = 
                        <div class ="fraction">
                            <span class="fraction-numerator">-u<sub>0</sub> &lowast; &Delta;t</span><br>
                            <span>&Delta;&Phi;</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator"> ${U}V &lowast; ${t}s</span><br>
                            <span>${Phi}Wb</span>
                        </div> 
                    = ${N}<br>`;
			}
			if (!v && U && B && l) {
				v = formatPrefixNoUnit(parseInput(U) / (parseInput(B) * parseInput(l)));
				result += `
                        Geschwindigkeit v =  
                        <div class ="fraction">
                            <span>u<sub>0</sub></span><br>
                            <span class="fraction-denumerator">B &lowast; l</span>
                        </div>
                    = 
                        <div class ="fraction">
                            <span>${U}V</span><br>
                            <span class="fraction-denumerator">${B}T &lowast; ${l}m</span>
                        </div>
                    = ${v}m/s <br>`;
			}
			if (!A && L && l && ur && N) {
				A = formatPrefixNoUnitsquare(
					(parseInput(L) * parseInput(l)) /
						(parseInput(ur) * 1.257e-6 * Math.pow(parseInput(N), 2)),
				);
				result += `
                        Fl&auml;che A = 
                        <div class ="fraction">
                            <span>L &lowast; l</span><br>
                            <span class="fraction-denumerator">&mu;<sub>r</sub> &lowast; &mu;<sub>0</sub> &lowast; N<sup>2</sup></span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span>${L}H &lowast; ${l}m</span><br>
                            <span class="fraction-denumerator">${ur} &lowast; 1.257&lowast;10<sup>-6</sup>Vs/Am &lowast; (${N})<sup>2</sup></span>
                        </div> 
                    = ${A}m<sup>2</sup><br>`;
			}
			if (!A && Phi && B) {
				A = formatPrefixNoUnitsquare(parseInput(Phi) / parseInput(B));
				result += `
                        Fl&auml;che A = 
                        <div class ="fraction">
                            <span class="fraction-numerator">&Phi;</span><br>
                            <span>B</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator">${Phi}Wb</span><br>
                            <span>${B}T</span>
                        </div> 
                    = ${A}m<sup>2</sup><br>`;
			}
			if (!Phi && L && I && N) {
				Phi = formatPrefixNoUnit(
					(parseInput(L) * parseInput(I)) / parseInput(N),
				);
				result += `
                        Magnetischer Fluss &Phi; = 
                        <div class ="fraction">
                            <span class="fraction-numerator">L &lowast; I</span><br>
                            <span>N</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator"> ${L}H &lowast; ${I}A</span><br>
                            <span>${N}</span>
                        </div> 
                    = ${Phi}Wb <br>`;
			}
			if (!Phi && U && t && N) {
				Phi = formatPrefixNoUnit(
					-(parseInput(U) * parseInput(t)) / parseInput(N),
				);
				result += `
                        &auml;nderung des Magnetischen Flusses &Delta;&Phi; = 
                        -<div class ="fraction">
                            <span class="fraction-numerator">u<sub>0</sub> &lowast; &Delta;t</span><br>
                            <span>N</span>
                        </div> 
                    =
                        -<div class ="fraction">
                            <span class="fraction-numerator"> ${U}V &lowast; ${t}s</span><br>
                            <span>${N}</span>
                        </div> 
                    = ${Phi}Wb <br>`;
			}
			if (!U && Phi && t && N) {
				U = formatPrefixNoUnit(
					-(parseInput(N) * parseInput(Phi)) / parseInput(t),
				);
				result += `
                        Induzierte Spannung u<sub>0</sub> = 
                        -<div class ="fraction">
                            <span class="fraction-numerator">N &lowast; &Delta;Phi;</span><br>
                            <span>&Delta;t</span>
                        </div> 
                    =
                        -<div class ="fraction">
                            <span class="fraction-numerator"> ${N} &lowast; ${Phi}Wb</span><br>
                            <span>${t}s</span>
                        </div> 
                    = ${U}V <br>`;
			}
			if (!U && L && I && t) {
				U = formatPrefixNoUnit(
					-(parseInput(L) * parseInput(I)) / parseInput(t),
				);
				result += `
                        Induzierte Spannung u<sub>0</sub> = 
                        -<div class ="fraction">
                            <span class="fraction-numerator">L &lowast; &Delta;I</span><br>
                            <span>&Delta;t</span>
                        </div> 
                    =
                        -<div class ="fraction">
                            <span class="fraction-numerator"> ${L}H &lowast; ${I}A</span><br>
                            <span>${t}s</span>
                        </div> 
                    = ${U}V <br>`;
			}
			if (!U && B && l && v) {
				U = formatPrefixNoUnit(parseInput(B) * parseInput(l) * parseInput(v));
				result += `
                        Induzierte Spannung u<sub>0</sub> =
                        B &lowast; l &lowast; v
                    =
                        ${B}T &lowast; ${l}m &lowast; ${v}m/s
                    = ${U}V <br>`;
			}
			if (!Al && L && N) {
				Al = formatPrefixNoUnit(parseInput(L) / Math.pow(parseInput(N), 2));
				result += `
                        Spulenkonstante A<sub>L</sub>=  
                        <div class ="fraction">
                            <span>L</span><br>
                            <span class="fraction-denumerator">N<sup>2</sup></span>
                        </div>
                    = 
                        <div class ="fraction">
                            <span>${L}H</span><br>
                            <span class="fraction-denumerator">(${N})<sup>2</sup></span>
                        </div>
                    = ${Al}Vs/A<br>`;
			}
			if (!l && ur && N && A && L) {
				l = formatPrefixNoUnit(
					(parseInput(ur) *
						1.257e-6 *
						Math.pow(parseInput(N), 2) *
						parseInputsquare(A)) /
						parseInput(L),
				);
				result += `
                        Leiterl&auml;nge l = 
                        <div class ="fraction">
                            <span class="fraction-numerator">&mu;<sub>r</sub> &lowast; &mu;<sub>0</sub> &lowast; N<sup>2</sup> &lowast; A</span><br>
                            <span>L</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator"> ${ur} &lowast; 1.257&lowast;10<sup>-6</sup>Vs/Am &lowast; (${N})<sup>2</sup> &lowast; ${A}m<sup>2</sup></span><br>
                            <span>${L}H</span>
                        </div> 
                    = ${l}m <br>`;
			}
			if (!l && U && B && v) {
				l = formatPrefixNoUnit(parseInput(U) / (parseInput(B) * parseInput(v)));
				result += `
                        Leiterl&auml;nge l =  
                        <div class ="fraction">
                            <span>u<sub>0</sub></span><br>
                            <span class="fraction-denumerator">B &lowast; v</span>
                        </div>
                    = 
                        <div class ="fraction">
                            <span>${U}V</span><br>
                            <span class="fraction-denumerator">${B}T &lowast; ${v}m/s</span>
                        </div>
                    = ${l}m<br>`;
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
			if (!t && Phi && U && N) {
				t = formatPrefixNoUnit(
					-(parseInput(N) * parseInput(Phi)) / parseInput(U),
				);
				result += `
                        Zeit &Delta;t = 
                        -<div class ="fraction">
                            <span class="fraction-numerator">N &lowast; &Delta;Phi;</span><br>
                            <span> u<sub>0</sub></span>
                        </div> 
                    =
                        -<div class ="fraction">
                            <span class="fraction-numerator"> ${N} &lowast; ${Phi}Wb</span><br>
                            <span>${U}V</span>
                        </div> 
                    = ${t}s<br>`;
			}
			if (!t && L && U && I) {
				t = formatPrefixNoUnit(
					-(parseInput(L) * parseInput(I)) / parseInput(U),
				);
				result += `
                        Zeit &Delta;t =
                        -<div class ="fraction">
                            <span class="fraction-numerator">L &lowast; &Delta;I</span><br>
                            <span> u<sub>0</sub></span>
                        </div> 
                    =
                        -<div class ="fraction">
                            <span class="fraction-numerator"> ${L}H &lowast; ${I}A</span><br>
                            <span>${U}V</span>
                        </div> 
                    = ${t}s <br>`;
			}
		}
		setHTML(document.getElementById("result"), result);
	}
	function resetInputsL() {
		const container = document.getElementById("L_Inputs");
		const inputs = container.querySelectorAll("input");
		inputs.forEach((input) => (input.value = ""));
		setHTML(document.getElementById("result"), "");
	}
	document.getElementById("modeSwitch").addEventListener("change", function () {
		const modeLabel = document.getElementById("modeLabel");
		const circuitImage = document.getElementById("circuitImage");
		if (this.checked) {
			modeLabel.textContent = "Entladen";
			circuitImage.src = "/Pictures/RL_Discharge.png";
		} else {
			modeLabel.textContent = "Laden";
			circuitImage.src = "/Pictures/RL_Charge.png";
		}
	});
	function calculateRL() {
		let result_RL = ``;
		let prevResult_RL = `1`;
		let isDischarging = document.getElementById("modeSwitch").checked;
		let I = document.getElementById("I_RL").value;
		let It = document.getElementById("It_RL").value;
		let R = document.getElementById("R_RL").value;
		let L = document.getElementById("L_RL").value;
		let U = document.getElementById("U_RL").value;
		let Ut = document.getElementById("Ut_RL").value;
		let t = document.getElementById("t_RL").value;
		let tau = document.getElementById("tau_RL").value;
		while (prevResult_RL != result_RL) {
			prevResult_RL = result_RL;
			if (!tau && L && R) {
				tau = formatPrefixNoUnit(parseInput(L) / parseInput(R));
				result_RL += `
                        Zeitkonstante &#120649; =
                        <div class ="fraction">
                            <span class="fraction-numerator">L</span><br>
                            <span>R</span>
                        </div>
                    = <div class ="fraction">
                            <span class="fraction-numerator">${L}H</span><br>
                            <span>${R}&Omega;</span>
                        </div>
                    = ${tau}s<br>`;
			}
			if (!L && tau && R) {
				L = formatPrefixNoUnit(parseInput(tau) * parseInput(R));
				result_RL += `
                        Induktivit&auml;t L = 
                        &#120649; &lowast; R
                    =
                        ${tau}s &lowast; ${R}&Omega;
                    = ${L}H <br>`;
			}
			if (!R && L && tau) {
				R = formatPrefixNoUnit(parseInput(L) / parseInput(tau));
				result_RL += `
                        Widerstand R =
                        <div class ="fraction">
                            <span class="fraction-numerator">L</span><br>
                            <span>&#120649;</span>
                        </div>
                    = <div class ="fraction">
                            <span class="fraction-numerator">${L}H</span><br>
                            <span>${tau}s</span>
                        </div>
                    = ${R}&Omega;<br>`;
			}
			if (!U && R && I) {
				U = formatPrefixNoUnit(parseInput(R) * parseInput(I));
				result_RL += `
                        Spannung U = 
                        R &lowast; I
                    =
                        ${R}&Omega; &lowast; ${I}A
                    = ${U}V <br>`;
			}
			if (!R && U && I) {
				R = formatPrefixNoUnit(parseInput(U) / parseInput(I));
				result_RL += `
                        Widerstand R = 
                        <div class ="fraction">
                            <span class="fraction-numerator">U</span><br>
                            <span>I</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator">${U}V</span><br>
                            <span>${I}A</span>
                        </div> 
                    = ${R}&Omega; <br>`;
			}
			if (!I && U && R) {
				I = formatPrefixNoUnit(parseInput(U) / parseInput(R));
				result_RL += `
                        Strom I = 
                        <div class ="fraction">
                            <span class="fraction-numerator">U</span><br>
                            <span>R</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator">${U}V</span><br>
                            <span>${R}&Omega;</span>
                        </div> 
                    = ${I}A <br>`;
			}
			if (!isDischarging) {
				if (!U && tau && t && Ut) {
					U = formatPrefixNoUnit(
						parseInput(Ut) /
							Math.pow(Math.E, -(parseInput(t) / parseInput(tau))),
					);
					result_RL += `
                            Spannung U = 
                            <div class ="fraction">
                                <span>u(t)</span><br>
                                <div style="border-top: 1px solid white"><span>e<sup>
                                    
                                -<div class ="fraction">
                                    <span >t </span><br>
                                    <span class="fraction-denumerator"> &#120649;</span>
                                </div>
                                    
                                </sup></span></div>
                            </div>
                        = 
                            <div class ="fraction">
                                <span>${Ut}V</span><br>
                                <div style="border-top: 1px solid white"><span >e<sup>
                                    
                                -<div class ="fraction">
                                    <span >${t}s</span><br>
                                    <span class="fraction-denumerator">${tau}s</span>
                                </div>
                                    
                                </sup></span></div>
                            </div>

                        = ${U}V<br>`;
				}
				if (!Ut && U && t && tau) {
					Ut = formatPrefixNoUnit(
						parseInput(U) *
							Math.pow(Math.E, -(parseInput(t) / parseInput(tau))),
					);
					result_RL += `
                            Spannung u(t) = U &lowast; (e<sup> 
                            -<div class ="fraction">
                                <span>t</span><br>
                                <span class="fraction-denumerator"> &#120649;</span>
                            </div></sup>)
                        = ${U}V &lowast; (e<sup>
                            -<div class ="fraction">
                                <span>${t}s</span><br>
                                <span class="fraction-denumerator">${tau}s</span>
                            </div></sup>)
                        = ${Ut}V <br>`;
				}
				if (!tau && U && Ut && t) {
					tau = formatPrefixNoUnit(
						-parseInput(t) / Math.log(parseInput(Ut) / parseInput(U)),
					);
					result_RL += `
                            Zeitkonstante &#120649; = 
                            -<div class ="fraction">
                                <span>t</span><br>
                                <div style="border-top: 1px solid white"><span >ln(
                                    
                                <div class ="fraction">
                                    <span class="fraction-numerator">u(t)</span><br>
                                    <span>U</span>
                                </div>)
                                    
                                </span></div>
                            </div>
                        = 
                            -<div class ="fraction">
                                <span>t</span><br>
                                <div style="border-top: 1px solid white"><span >ln(
                                    
                                <div class ="fraction">
                                    <span class="fraction-numerator">${Ut}V</span><br>
                                    <span>${U}V</span>
                                </div>)
                                    
                                </span></div>
                            </div>

                        = ${tau}s<br>`;
				}
				if (!tau && U && Ut && t) {
					tau = formatPrefixNoUnit(
						-parseInput(t) / Math.log(1 - parseInput(It) / parseInput(I)),
					);
					result_RL += `
                            Zeitkonstante &#120649; = 
                            <div class ="fraction">
                                <span>- t</span><br>
                                <div style="border-top: 1px solid white"><span >ln(1- 
                                    
                                <div class ="fraction">
                                    <span>i(t)</span><br>
                                    <span class="fraction-denumerator">I</span>
                                </div>)
                                    
                                </span></div>
                            </div>
                        = 
                            <div class ="fraction">
                                <span>- ${t}s</span><br>
                                <div style="border-top: 1px solid white"><span >ln(1 -
                                    
                                <div class ="fraction">
                                    <span>${It}A</span><br>
                                    <span class="fraction-denumerator">${I}A</span>
                                </div>)
                                    
                                </span></div>
                            </div>

                        = ${tau}s<br>`;
				}
				if (!I && tau && t && It) {
					I = formatPrefixNoUnit(
						parseInput(It) /
							(1 - Math.pow(Math.E, -(parseInput(t) / parseInput(tau)))),
					);
					result_RL += `
                            Strom I = 
                            <div class ="fraction">
                                <span>i(t)</span><br>
                                <div style="border-top: 1px solid white"><span >1 - e<sup>
                                    
                                -<div class ="fraction">
                                    <span >t </span><br>
                                    <span class="fraction-denumerator"> &#120649;</span>
                                </div>
                                    
                                </sup></span></div>
                            </div>
                        = 
                            <div class ="fraction">
                                <span>${It}A</span><br>
                                <div style="border-top: 1px solid white"><span >1 - e<sup>
                                    
                                -<div class ="fraction">
                                    <span >${t}s</span><br>
                                    <span class="fraction-denumerator">${tau}s</span>
                                </div>
                                    
                                </sup></span></div>
                            </div>

                        = ${I}A <br>`;
				}
				if (!It && I && t && tau) {
					It = formatPrefixNoUnit(
						parseInput(I) *
							(1 - Math.pow(Math.E, -(parseInput(t) / parseInput(tau)))),
					);
					result_RL += `
                            Strom i(t) = I &lowast; (1 - e<sup> 
                            <div class ="fraction">
                                <span>- t</span><br>
                                <span class="fraction-denumerator"> &#120649;</span>
                            </div></sup>)
                        = ${I}A &lowast; (1 - e<sup>
                            <div class ="fraction">
                                <span>- ${t}s</span><br>
                                <span class="fraction-denumerator">${tau}s</span>
                            </div></sup>)
                        = ${It}A <br>`;
				}
				if (!t && tau && I && It) {
					t = formatPrefixNoUnit(
						-parseInput(tau) * Math.log(1 - parseInput(It) / parseInput(I)),
					);
					result_RL += `
                            Zeit t = - &#120649; &lowast; ln(
                            <div class ="fraction">
                                <span>i(t) </span><br>
                                <span class="fraction-denumerator">I</span>
                            </div>)
                        = - ${tau}s &lowast; ln(1 -
                            <div class ="fraction">
                                <span>${It}A</span><br>
                                <span class="fraction-denumerator">${I}A</span>
                            </div>)
                        = ${t}s <br>`;
				}
				if (!t && tau && U && Ut) {
					t = formatPrefixNoUnit(
						-parseInput(tau) * Math.log(parseInput(Ut) / parseInput(U)),
					);
					result_RL += `
                            Zeit t = - &#120649; &lowast; ln( 
                            <div class ="fraction">
                                <span class="fraction-numerator">u(t) </span><br>
                                <span>U</span>
                            </div>)
                        = - ${tau}s &lowast; ln(
                            <div class ="fraction">
                                <span class="fraction-numerator">${Ut}V</span><br>
                                <span>${U}V</span>
                            </div>)
                        = ${t}s<br>`;
				}
			} else {
				if (!U && tau && t && Ut) {
					U = formatPrefixNoUnit(
						-parseInput(Ut) /
							Math.pow(Math.E, -(parseInput(t) / parseInput(tau))),
					);
					result_RL += `
                            Spannung U = -
                            <div class ="fraction">
                                <span>u(t)</span><br>
                                <div style="border-top: 1px solid white"><span>e<sup>
                                    
                                <div class ="fraction">
                                    <span >- t</span><br>
                                    <span class="fraction-denumerator"> &#120649;</span>
                                </div>
                                    
                                </sup></span></div>
                            </div>
                        = -
                            <div class ="fraction">
                                <span>${Ut}V</span><br>
                                <div style="border-top: 1px solid white"><span >e<sup>
                                    
                                <div class ="fraction">
                                    <span >- ${t}s</span><br>
                                    <span class="fraction-denumerator">${tau}s</span>
                                </div>
                                    
                                </sup></span></div>
                            </div>

                        = ${U}V <br>`;
				}
				if (!Ut && U && t && tau) {
					Ut = formatPrefixNoUnit(
						-parseInput(U) *
							Math.pow(Math.E, -(parseInput(t) / parseInput(tau))),
					);
					result_RL += `
                            Spannung u(t) = - U &lowast; (e<sup> 
                            <div class ="fraction">
                                <span>- t</span><br>
                                <span class="fraction-denumerator"> &#120649;</span>
                            </div></sup>)
                        = - ${U}V &lowast; (e<sup>
                            <div class ="fraction">
                                <span>- ${t}s</span><br>
                                <span class="fraction-denumerator">${tau}s</span>
                            </div></sup>)
                        = ${Ut}V <br>`;
				}
				if (!tau && U && Ut && t) {
					tau = formatPrefixNoUnit(
						parseInput(t) / Math.log(parseInput(Ut) / parseInput(U)),
					);
					result_RL += `
                            Zeitkonstante &#120649; = 
                            <div class ="fraction">
                                <span>t</span><br>
                                <div style="border-top: 1px solid white"><span >ln(
                                    
                                <div class ="fraction">
                                    <span class="fraction-numerator">u(t)</span><br>
                                    <span>U</span>
                                </div>)
                                    
                                </span></div>
                            </div>
                        = 
                            <div class ="fraction">
                                <span>t</span><br>
                                <div style="border-top: 1px solid white"><span >ln(
                                    
                                <div class ="fraction">
                                    <span class="fraction-numerator">${Ut}V</span><br>
                                    <span>${U}V</span>
                                </div>)
                                    
                                </span></div>
                            </div>

                        = ${tau}s <br>`;
				}
				if (!tau && I && It && t) {
					tau = formatPrefixNoUnit(
						-parseInput(t) / Math.log(parseInput(It) / parseInput(I)),
					);
					result_RL += `
                            Zeitkonstante &#120649; = 
                            <div class ="fraction">
                                <span>- t</span><br>
                                <div style="border-top: 1px solid white"><span >ln(
                                    
                                <div class ="fraction">
                                    <span class="fraction-numerator">i(t)</span><br>
                                    <span>I</span>
                                </div>)
                                    
                                </span></div>
                            </div>
                        = 
                            <div class ="fraction">
                                <span>- t</span><br>
                                <div style="border-top: 1px solid white"><span >ln(
                                    
                                <div class ="fraction">
                                    <span class="fraction-numerator">${It}A</span><br>
                                    <span>${I}A</span>
                                </div>)
                                    
                                </span></div>
                            </div>

                        = ${tau}s <br>`;
				}
				if (!I && tau && t && It) {
					I = formatPrefixNoUnit(
						parseInput(It) /
							Math.pow(Math.E, -(parseInput(t) / parseInput(tau))),
					);
					result_RL += `
                            Strom I = 
                            <div class ="fraction">
                                <span>i(t)</span><br>
                                <div style="border-top: 1px solid white"><span >e<sup>
                                    
                                <div class ="fraction">
                                    <span >- t </span><br>
                                    <span class="fraction-denumerator"> &#120649;</span>
                                </div>
                                    
                                </sup></span></div>
                            </div>
                        = 
                            <div class ="fraction">
                                <span>${It}A</span><br>
                                <div style="border-top: 1px solid white"><span >e<sup>
                                    
                                <div class ="fraction">
                                    <span>- ${t}s</span><br>
                                    <span class="fraction-denumerator">${tau}s</span>
                                </div>
                                    
                                </sup></span></div>
                            </div>

                        = ${I}A <br>`;
				}
				if (!It && I && t && tau) {
					It = formatPrefixNoUnit(
						parseInput(I) *
							Math.pow(Math.E, -(parseInput(t) / parseInput(tau))),
					);
					result_RL += `
                            Strom i(t) = I &lowast; e<sup> 
                            <div class ="fraction">
                                <span class="fraction-numerator">- t</span><br>
                                <span> &#120649;</span>
                            </div></sup>
                        = ${I}A &lowast; e<sup>
                            <div class ="fraction">
                                <span class="fraction-numerator">- ${t}s</span><br>
                                <span>${tau}s</span>
                            </div></sup>
                        = ${It}A <br>`;
				}
				if (!t && tau && U && Ut) {
					t = formatPrefixNoUnit(
						parseInput(tau) * Math.log(parseInput(Ut) / parseInput(U)),
					);
					result_RL += `
                            Zeit t = &#120649; &lowast; ln( 
                            <div class ="fraction">
                                <span class="fraction-numerator">u(t) </span><br>
                                <span>U</span>
                            </div>)
                        = ${tau}s &lowast; ln(
                            <div class ="fraction">
                                <span class="fraction-numerator">${Ut}V</span><br>
                                <span>${U}V</span>
                            </div>)
                        = ${t}s <br>`;
				}
				if (!t && tau && I && It) {
					t = formatPrefixNoUnit(
						parseInput(tau) * Math.log(parseInput(It) / parseInput(I)),
					);
					result_RL += `
                            Zeit t = &#120649; &lowast; ln(
                            <div class ="fraction">
                                <span class="fraction-numerator">i(t) </span><br>
                                <span>I</span>
                            </div>)
                        = ${tau}s &lowast; ln(
                            <div class ="fraction">
                                <span class="fraction-numerator">${It}A</span><br>
                                <span>${I}A</span>
                            </div>)
                        = ${t}s <br>`;
				}
			}
		}
		setHTML(document.getElementById("result_RL"), result_RL);
		generate_e_curve_from_RLinputs(I, tau, U, t);
	}
	function resetInputsRL() {
		const container = document.getElementById("RL_Inputs");
		const inputs = container.querySelectorAll("input");
		inputs.forEach((input) => (input.value = ""));
		setHTML(document.getElementById("result_RL"), "");
	}
	function generate_e_curve_from_RLinputs(calcI, calcTau, calcU, calcT) {
		const I = parseInput(calcI) || 0.0001;
		const tau = parseInput(calcTau) || 0.001;
		const U = parseInput(calcU) || 1;
		const tMarker = parseInput(calcT) || 6 * tau;
		const isDischarging = document.getElementById("modeSwitch").checked;
		const maxTime = 5 * tau;
		const stepCount = 100;
		drawCurveDynamic(
			"voltageCanvas",
			(t) => (isDischarging ? -U * Math.exp(-t / tau) : U * Math.exp(-t / tau)),
			"Spannung (V)",
			maxTime,
			stepCount,
			{
				color: "#0070C0",
				tMarker: isFinite(tMarker) ? tMarker : undefined,
				markerLabel: "u(t) = ",
			},
		);
		drawCurveDynamic(
			"currentCanvas",
			(t) =>
				isDischarging ? I * Math.exp(-t / tau) : I * (1 - Math.exp(-t / tau)),
			"Strom (A)",
			maxTime,
			stepCount,
			{
				color: "#C00000",
				tMarker: isFinite(tMarker) ? tMarker : undefined,
				markerLabel: "i(t) = ",
			},
		);
	}
	function toggleDropdown(element) {
		const dropdown = element.parentElement;
		dropdown.classList.toggle("open");
	}
	return {
		handlers: {
			calculateInductorParameters,
			resetInputsL,
			calculateRL,
			resetInputsRL,
			generate_e_curve_from_RLinputs,
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
