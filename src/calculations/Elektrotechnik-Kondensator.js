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
	} = createShared(scope);
	function calculateCapacitorParameters() {
		let result = ``;
		let prevResult = `1`;
		let I = document.getElementById("I").value;
		let F = document.getElementById("F").value;
		let E = document.getElementById("E").value;
		let er = document.getElementById("er").value;
		let A = document.getElementById("A").value;
		let d = document.getElementById("d").value;
		let s = document.getElementById("s").value;
		let C = document.getElementById("C").value;
		let U = document.getElementById("U").value;
		let W = document.getElementById("W").value;
		let Q = document.getElementById("Q").value;
		let t = document.getElementById("t").value;
		while (result != prevResult) {
			prevResult = result;
			if (!I && Q && t) {
				I = formatPrefixNoUnit(parseInput(Q) / parseInput(t));
				result += `
                        Strom I = 
                        <div class ="fraction">
                            <span class="fraction-numerator"> &Delta;Q </span><br>
                            <span>&Delta;t</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator"> ${Q}C </span><br>
                            <span>${t}s</span>
                        </div> 
                    = ${I}A <br>`;
			}
			if (!F && Q && E) {
				F = formatPrefixNoUnit(parseInput(Q) * parseInput(E));
				result += `
                        Kraft F =
                        Q &lowast; E
                    =
                        ${Q}C &lowast; ${E}V/m
                    = ${F}N <br>`;
			}
			if (!E && F && Q) {
				E = formatPrefixNoUnit(parseInput(F) / parseInput(Q));
				result += `
                        Feldst&auml;rke E = 
                        <div class ="fraction">
                            <span class="fraction-numerator"> F </span><br>
                            <span>Q</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator"> ${F}N </span><br>
                            <span>${Q}C</span>
                        </div> 
                    = ${E}V/m <br>`;
			}
			if (!E && U && s) {
				E = formatPrefixNoUnit(parseInput(U) / parseInput(s));
				result += `
                        Feldst&auml;rke E = 
                        <div class ="fraction">
                            <span class="fraction-numerator"> U </span><br>
                            <span>s</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator"> ${U}V </span><br>
                            <span>${s}m</span>
                        </div> 
                    = ${E}V/m <br>`;
			}
			if (!er && C && s && A) {
				er = formatPrefixNoUnit(
					(parseInput(C) * parseInput(s)) / (parseInputsquare(A) * 8.85e-12),
				);
				result += `
                        Dielektrizit&auml;tszahl &epsilon;<sub>r</sub> = 
                        <div class ="fraction">
                            <span class="fraction-numerator"> C &lowast; s </span><br>
                            <span>A &lowast; &epsilon;<sub>0</sub></span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator"> ${C}F &lowast; ${s}m</span><br>
                            <span>${A}m<sup>2</sup> &lowast; 8.85&lowast;10<sup>-12</sup> As/Vm</span>
                        </div> 
                    = ${er}<br>`;
			}
			if (!A && C && s && er) {
				A = formatPrefixNoUnitSquare(
					(parseInput(C) * parseInput(s)) / (parseInput(er) * 8.85e-12),
				);
				result += `
                    Querschnittsfl&auml;che A =
                        <div class ="fraction">
                            <span class="fraction-numerator"> C &lowast; s </span><br>
                            <span>&epsilon;<sub>r</sub> &lowast; &epsilon;<sub>0</sub></span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator"> ${C}F &lowast; ${s}m</span><br>
                            <span>${er} &lowast; 8.85&lowast;10<sup>-12</sup> As/Vm</span>
                        </div> 
                    = ${A}m<sup>2</sup> <br>`;
			}
			if (!A && d) {
				A = formatPrefixNoUnitSquare(
					(Math.PI * Math.pow(parseInput(d), 2)) / 4,
				);
				result += `
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
                    = ${A}m<sup>2</sup> <br>`;
			}
			if (!d && A) {
				d = formatPrefixNoUnit(
					Math.pow((4 * parseInputsquare(A)) / Math.PI, 0.5),
				);
				result += `
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
                    = ${d}m <br>`;
			}
			if (!s && U && E) {
				s = formatPrefixNoUnit(parseInput(U) / parseInput(E));
				result += `
                        Elektronenabstand s = 
                        <div class ="fraction">
                            <span class="fraction-numerator"> U </span><br>
                            <span>E</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator"> ${U}V </span><br>
                            <span>${E}V/m</span>
                        </div> 
                    = ${s}m <br>`;
			}
			if (!s && er && A && C) {
				s = formatPrefixNoUnit(
					(parseInput(er) * 8.85e-12 * parseInputsquare(A)) / parseInput(C),
				);
				result += `
                        Elektronenabstand s = 
                        <div class ="fraction">
                            <span class="fraction-numerator">&epsilon;<sub>r</sub> &lowast; &epsilon;<sub>0</sub> &lowast; A </span><br>
                            <span>C</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator">${er} &lowast; 8.85&lowast;10<sup>-12</sup> As/Vm &lowast; ${A}m<sup>2</sup> </span><br>
                            <span>${C}F</span>
                        </div> 
                    = ${s}m <br>`;
			}
			if (!C && Q && U) {
				C = formatPrefixNoUnit(parseInput(Q) / parseInput(U));
				result += `
                        Kapazit&auml;t C = 
                        <div class ="fraction">
                            <span class="fraction-numerator"> Q </span><br>
                            <span>U</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator"> ${Q}C </span><br>
                            <span>${U}V</span>
                        </div> 
                    = ${C}F <br>`;
			}
			if (!C && er && A && s) {
				C = formatPrefixNoUnit(
					(parseInput(er) * 8.85e-12 * parseInputsquare(A)) / parseInput(s),
				);
				result += `
                        Kapazit&auml;t C = 
                        <div class ="fraction">
                            <span class="fraction-numerator">&epsilon;<sub>r</sub> &lowast; &epsilon;<sub>0</sub> &lowast; A </span><br>
                            <span>s</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator">${er} &lowast; 8.85&lowast;10<sup>-12</sup> As/Vm &lowast; ${A}m<sup>2</sup> </span><br>
                            <span>${s}m</span>
                        </div> 
                    = ${C}F <br>`;
			}
			if (!C && W && U) {
				C = formatPrefixNoUnit(
					(2 * parseInput(W)) / Math.pow(parseInput(U), 2),
				);
				result += `
                        Kapazit&auml;t C = 
                        <div class ="fraction">
                            <span class="fraction-numerator"> 2 &lowast; W </span><br>
                            <span>U<sup>2</sup></span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator"> 2 &lowast; ${W}J </span><br>
                            <span>(${U}V)<sup>2</sup></span>
                        </div> 
                    = ${C}F <br>`;
			}
			if (!U && E && s) {
				U = formatPrefixNoUnit(parseInput(E) * parseInput(s));
				result += `
                        Spannung U =
                        E &lowast; s
                    =
                        ${E}V/m &lowast; ${s}m
                    = ${U}V <br>`;
			}
			if (!U && Q && C) {
				U = formatPrefixNoUnit(parseInput(Q) / parseInput(C));
				result += `
                        Spannung U = 
                        <div class ="fraction">
                            <span class="fraction-numerator"> Q </span><br>
                            <span>C</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator">${Q}C </span><br>
                            <span>${C}F</span>
                        </div> 
                    = ${U}V <br>`;
			}
			if (!U && W && Q) {
				U = formatPrefixNoUnit((2 * parseInput(W)) / parseInput(Q));
				result += `
                        Spannung U = 
                        <div class ="fraction">
                            <span class="fraction-numerator"> 2 &lowast; W </span><br>
                            <span>Q</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator"> 2 &lowast; ${W}J </span><br>
                            <span>${Q}C</span>
                        </div> 
                    = ${U}V <br>`;
			}
			if (!U && W && C) {
				U = formatPrefixNoUnit(
					Math.pow((2 * parseInput(W)) / parseInput(C), 0.5),
				);
				result += `
                        Spannung U = 
                        &radic;	<div class ="fraction">
                            <span class="fraction-numerator"> 2 &lowast; W </span><br>
                            <span>C</span>
                        </div> 
                    =
                        &radic;	 <div class ="fraction">
                            <span class="fraction-numerator"> 2 &lowast; ${W}J </span><br>
                            <span>${C}F</span>
                        </div> 
                    = ${U}V<br>`;
			}
			if (!W && Q && U) {
				W = formatPrefixNoUnit((parseInput(Q) * parseInput(U)) / 2);
				result += `
                        Energie W = 
                        <div class ="fraction">
                            <span class="fraction-numerator"> Q &lowast; U </span><br>
                            <span>2</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator"> ${Q}C &lowast; ${U}V </span><br>
                            <span>2</span>
                        </div> 
                    = ${W}J<br>`;
			}
			if (!W && C && U) {
				W = formatPrefixNoUnit(
					(Math.pow(parseInput(U), 2) * parseInput(C)) / 2,
				);
				result += `
                        Energie W = 
                        <div class ="fraction">
                            <span class="fraction-numerator">C &lowast; U<sup>2</sup> </span><br>
                            <span>2</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator">${C}F &lowast; (${U}V)<sup>2</sup></span><br>
                            <span>2</span>
                        </div> 
                    = ${W}J<br>`;
			}
			if (!Q && F && E) {
				Q = formatPrefixNoUnit(parseInput(F) / parseInput(E));
				result += `
                        Ladung Q = 
                        <div class ="fraction">
                            <span class="fraction-numerator"> F </span><br>
                            <span>E</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator"> ${F}N </span><br>
                            <span>${E}V/m</span>
                        </div> 
                    = ${Q}C <br>`;
			}
			if (!Q && C && U) {
				Q = formatPrefixNoUnit(parseInput(C) * parseInput(U));
				result += `
                        Ladung Q =
                        C &lowast; U
                    =
                        ${C}F &lowast; ${U}V
                    = ${Q}C <br>`;
			}
			if (!Q && I && t) {
				Q = formatPrefixNoUnit(parseInput(I) * parseInput(t));
				result += `
                        Ladungs&auml;nderung  &Delta;Q =
                        I &lowast; &Delta;t
                    =
                        ${I}A &lowast; &Delta;${t}s
                    = ${Q}C <br>`;
			}
			if (!Q && W && U) {
				Q = formatPrefixNoUnit((2 * parseInput(W)) / parseInput(U));
				result += `
                        Ladung Q = 
                        <div class ="fraction">
                            <span class="fraction-numerator"> 2 &lowast; W </span><br>
                            <span>U</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator"> 2 &lowast; ${W}J </span><br>
                            <span>${U}V</span>
                        </div> 
                    = ${Q}C <br>`;
			}
			if (!t && I && Q) {
				t = formatPrefixNoUnit(parseInput(Q) / parseInput(I));
				result += `
                        Zeit &Delta; t = 
                        <div class ="fraction">
                            <span class="fraction-numerator"> &Delta; Q </span><br>
                            <span>I</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator"> &Delta; ${Q}C </span><br>
                            <span>${I}A</span>
                        </div> 
                    = ${t}s <br>`;
			}
		}
		setHTML(document.getElementById("result"), result);
	}
	function resetInputsCapacitorParameters() {
		const container = document.getElementById("CapacitorParameter");
		const inputs = container.querySelectorAll("input");
		inputs.forEach((input) => (input.value = ""));
		setHTML(document.getElementById("result"), "");
	}
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
			if (sectionId === "Serie") {
				document.getElementById("Serie").style.display = "block";
				document.getElementById("Parallel").style.display = "none";
			} else if (sectionId === "Parallel") {
				document.getElementById("Serie").style.display = "none";
				document.getElementById("Parallel").style.display = "block";
			}
		}
	}
	let isRADactive_Serie = false;
	function toggleRAD() {
		let button = document.getElementById("Rad-Button");
		if (isRADactive_Serie) {
			setHTML(button, "360&deg;");
			isRADactive_Serie = false;
		} else {
			setHTML(button, "2&pi;");
			isRADactive_Serie = true;
		}
	}
	function calculateSerieAC() {
		let result_Serie_AC = ``;
		const phi = document.getElementById("phi_AC").value;
		const I = document.getElementById("I_AC").value;
		const R = document.getElementById("R_AC").value;
		const Xc = document.getElementById("Xc_AC").value;
		const Z = document.getElementById("Z_AC").value;
		const C = document.getElementById("C_AC").value;
		const P = document.getElementById("P_AC").value;
		const Qc = document.getElementById("Qc_AC").value;
		const S = document.getElementById("S_AC").value;
		const Ur = document.getElementById("Ur_AC").value;
		const Uc = document.getElementById("Uc_AC").value;
		const U = document.getElementById("U_AC").value;
		const f = document.getElementById("f_AC").value;
		const cosphi = document.getElementById("cosphi_AC").value;
		const sinphi = document.getElementById("sinphi_AC").value;
		if (!phi) {
			if (Xc && Z) {
				result_Serie_AC += `
                        Winkel &phi;<sub>RAD</sub> = 
                        arcsin(<div class ="fraction">
                            <span class="fraction-numerator">X<sub>C</sub></span><br>
                            <span>Z</span>
                        </div>)
                    =
                        arcsin(<div class ="fraction">
                            <span class="fraction-numerator">${Xc}&Omega;</span><br>
                            <span>${Z}&Omega;</span>
                        </div>)
                    = ${formatWithPrefix(Math.asin(parseInput(Xc) / parseInput(Z)), "")} &rarr;

                    &phi;<sub>DEG</sub> 
                    = ${formatWithPrefix((Math.asin(parseInput(Xc) / parseInput(Z)) * 180) / Math.PI, "&deg;")}<br>`;
			}
			if (Uc && U) {
				result_Serie_AC += `
                        Winkel &phi;<sub>RAD</sub> = 
                        arcsin(<div class ="fraction">
                            <span class="fraction-numerator">U<sub>C</sub></span><br>
                            <span>U</span>
                        </div>)
                    =
                        arcsin(<div class ="fraction">
                            <span class="fraction-numerator">${Uc}V</span><br>
                            <span>${U}V</span>
                        </div>)
                    = ${formatWithPrefix(Math.asin(parseInput(Uc) / parseInput(U)), "")} &rarr;

                    &phi;<sub>DEG</sub>
                    = ${formatWithPrefix((Math.asin(parseInput(Uc) / parseInput(U)) * 180) / Math.PI, "&deg;")}<br>`;
			}
			if (R && Z) {
				result_Serie_AC += `
                        Winkel &phi;<sub>RAD</sub> = 
                        arccos(<div class ="fraction">
                            <span class="fraction-numerator">R</span><br>
                            <span>Z</span>
                        </div>)
                    =
                        arccos(<div class ="fraction">
                            <span class="fraction-numerator">${R}&Omega;</span><br>
                            <span>${Z}&Omega;</span>
                        </div>)
                    = ${formatWithPrefix(Math.acos(parseInput(R) / parseInput(Z)), "")} &rarr;

                    &phi;<sub>DEG</sub> 
                    = ${formatWithPrefix((Math.acos(parseInput(R) / parseInput(Z)) * 180) / Math.PI, "&deg;")}<br>`;
			}
			if (Ur && U) {
				result_Serie_AC += `
                        Winkel &phi;<sub>RAD</sub> = 
                        arccos(<div class ="fraction">
                            <span class="fraction-numerator">U<sub>R</sub></span><br>
                            <span>U</span>
                        </div>)
                    =
                        arccos(<div class ="fraction">
                            <span class="fraction-numerator">${Ur}V</span><br>
                            <span>${U}V</span>
                        </div>)
                    = ${formatWithPrefix(Math.acos(parseInput(Ur) / parseInput(U)), "")} &rarr;

                    &phi;<sub>DEG</sub>
                    = ${formatWithPrefix((Math.acos(parseInput(Ur) / parseInput(U)) * 180) / Math.PI, "&deg;")}<br>`;
			}
			if (Xc && R) {
				result_Serie_AC += `
                        Winkel &phi;<sub>RAD</sub> = 
                        arctan(<div class ="fraction">
                            <span class="fraction-numerator">X<sub>C</sub></span><br>
                            <span>R</span>
                        </div>)
                    =
                        arctan(<div class ="fraction">
                            <span class="fraction-numerator">${Xc}&Omega;</span><br>
                            <span>${R}&Omega;</span>
                        </div>)
                    = ${formatWithPrefix(Math.atan(parseInput(Xc) / parseInput(R)), "")} &rarr;

                    &phi;<sub>DEG</sub> 
                    = ${formatWithPrefix((Math.atan(parseInput(Xc) / parseInput(R)) * 180) / Math.PI, "&deg;")}<br>`;
			}
			if (Uc && Ur) {
				result_Serie_AC += `
                        Winkel &phi;<sub>RAD</sub> = 
                        arctan(<div class ="fraction">
                            <span class="fraction-numerator">U<sub>C</sub></span><br>
                            <span>U<sub>R</sub></span>
                        </div>)
                    =
                        arctan(<div class ="fraction">
                            <span class="fraction-numerator">${Uc}V</span><br>
                            <span>${Ur}V</span>
                        </div>)
                    = ${formatWithPrefix(Math.atan(parseInput(Uc) / parseInput(Ur)), "")} &rarr;

                    &phi;<sub>DEG</sub>
                    = ${formatWithPrefix((Math.atan(parseInput(Uc) / parseInput(Ur)) * 180) / Math.PI, "&deg;")}<br>`;
			}
			if (sinphi) {
				result_Serie_AC += `
                        Winkel &phi;<sub>RAD</sub> = 
                        arcsin(sin(&phi;))
                    =
                        arcsin(${sinphi})
                    = ${formatWithPrefix(Math.sin(parseInput(sinphi)), "")} &rarr;

                    &phi;<sub>DEG</sub>
                    = ${formatWithPrefix((Math.asin(parseInput(sinphi)) * 180) / Math.PI, "&deg;")}<br>`;
			}
			if (cosphi) {
				result_Serie_AC += `
                        Winkel &phi;<sub>RAD</sub> = 
                        arccso(cos(&phi;))
                    =
                        arcsin(${cosphi})
                    = ${formatWithPrefix(Math.cos(parseInput(cosphi)), "")} &rarr;

                    &phi;<sub>DEG</sub>
                    = ${formatWithPrefix((Math.cos(parseInput(cosphi)) * 180) / Math.PI, "&deg;")}<br>`;
			}
		}
		if (!I) {
			if (Ur && R) {
				result_Serie_AC += `
                        Strom I =
                        <div class ="fraction">
                            <span class="fraction-numerator">U<sub>R</sub></span><br>
                            <span>R</span>
                        </div>
                    = 
                        <div class ="fraction">
                            <span class="fraction-numerator">${Ur}V</span><br>
                            <span>${R}&Omega;</span>
                        </div>
                    = ${formatWithPrefix(parseInput(Ur) / parseInput(R), "A")}<br>`;
			}
			if (Uc && Xc) {
				result_Serie_AC += `
                        Strom I =
                        <div class ="fraction">
                            <span class="fraction-numerator">U<sub>C</sub></span><br>
                            <span>X<sub>C</sub></span>
                        </div>
                    = 
                        <div class ="fraction">
                            <span class="fraction-numerator">${Uc}V</span><br>
                            <span>${Xc}&Omega;</span>
                        </div>
                    = ${formatWithPrefix(parseInput(Uc) / parseInput(Xc), "A")}<br>`;
			}
			if (U && Z) {
				result_Serie_AC += `
                        Strom I =
                        <div class ="fraction">
                            <span class="fraction-numerator">U</span><br>
                            <span>Z</span>
                        </div>
                    = 
                        <div class ="fraction">
                            <span class="fraction-numerator">${U}V</span><br>
                            <span>${Z}&Omega;</span>
                        </div>
                    = ${formatWithPrefix(parseInput(U) / parseInput(Z), "A")}<br>`;
			}
		}
		if (!R) {
			if (Ur && I) {
				result_Serie_AC += `
                        Widerstand R =
                        <div class ="fraction">
                            <span class="fraction-numerator">U<sub>R</sub></span><br>
                            <span>I</span>
                        </div>
                    = 
                        <div class ="fraction">
                            <span class="fraction-numerator">${Ur}V</span><br>
                            <span>${I}A</span>
                        </div>
                    = ${formatWithPrefix(parseInput(Ur) / parseInput(I), "&Omega;")}<br>`;
			}
			if (Z && Xc) {
				result_Serie_AC += `
                        Widerstand R = 
                        &radic;(Z<sup>2</sup> - X<sub>C</sub><sup>2</sup>) = 
                        &radic;((${Z}&Omega;)<sup>2</sup> - (${Xc}&Omega;)<sup>2</sup>)
                    = ${formatWithPrefix(Math.pow(Math.pow(parseInput(Z), 2) - Math.pow(parseInput(Xc), 2), 0.5), "&Omega;")}<br>`;
			}
			if (Z && cosphi) {
				result_Serie_AC += `
                        Widerstand R = 
                        Z &lowast; cos(&phi;) = 
                        ${Z}&Omega; &lowast; ${cosphi}
                    = ${formatWithPrefix(parseInput(Z) * parseInput(cosphi), "&Omega;")}<br>`;
			}
			if (Z && phi && isRADactive_Serie) {
				result_Serie_AC += `
                        Widerstand R = 
                        Z &lowast; cos(&phi;) = 
                        ${Z}&Omega; &lowast; cos(${phi})
                    = ${formatWithPrefix(parseInput(Z) * Math.cos(parseInput(phi)), "&Omega;")}<br>`;
			}
			if (Z && phi && !isRADactive_Serie) {
				result_Serie_AC += `
                        Widerstand R = 
                        Z &lowast; cos(&phi;) = 
                        ${Z}&Omega; &lowast; cos(${phi}&deg;)
                    = ${formatWithPrefix(parseInput(Z) * Math.cos((parseInput(phi) * Math.PI) / 180), "&Omega;")}<br>`;
			}
			if (Xc && phi && isRADactive_Serie) {
				result_Serie_AC += `
                        Widerstand R =
                        <div class ="fraction">
                            <span>X<sub>c</sub></span><br>
                            <span class="fraction-denumerator">tan(&phi;)</span>
                        </div>
                    = 
                        <div class ="fraction">
                            <span>${Xc}&Omega;</span><br>
                            <span class="fraction-denumerator">tan(${phi})</span>
                        </div>
                    = ${formatWithPrefix(parseInput(Xc) / Math.tan(parseInput(phi)), "&Omega;")}<br>`;
			}
			if (Xc && phi && !isRADactive_Serie) {
				result_Serie_AC += `
                        Widerstand R =
                        <div class ="fraction">
                            <span>X<sub>c</sub></span><br>
                            <span class="fraction-denumerator">tan(&phi;)</span>
                        </div>
                    = 
                        <div class ="fraction">
                            <span>${Xc}&Omega;</span><br>
                            <span class="fraction-denumerator">tan(${phi}&deg;)</span>
                        </div>
                    = ${formatWithPrefix(parseInput(Xc) / Math.tan((parseInput(phi) * Math.PI) / 180), "&Omega;")}<br>`;
			}
		}
		if (!Xc) {
			if (Uc && I) {
				result_Serie_AC += `
                        Blindwiderstand X<sub>C</sub> =
                        <div class ="fraction">
                            <span class="fraction-numerator">U<sub>C</sub></span><br>
                            <span>I</span>
                        </div>
                    = 
                        <div class ="fraction">
                            <span class="fraction-numerator">${Uc}V</span><br>
                            <span>${I}A</span>
                        </div>
                    = ${formatWithPrefix(parseInput(Uc) / parseInput(I), "&Omega;")}<br>`;
			}
			if (Z && R) {
				result_Serie_AC += `
                        Blindwiderstand X<sub>C</sub> = 
                        &radic;(Z<sup>2</sup> - R<sup>2</sup>) = 
                        &radic;((${Z}&Omega;)<sup>2</sup> - (${R}&Omega;)<sup>2</sup>)
                    = ${formatWithPrefix(Math.pow(Math.pow(parseInput(Z), 2) - Math.pow(parseInput(R), 2), 0.5), "&Omega;")}<br>`;
			}
			if (Z && sinphi) {
				result_Serie_AC += `
                        Blindwiderstand X<sub>C</sub> = 
                        Z &lowast; sin(&phi;) = 
                        ${Z}&Omega; &lowast; ${sinphi}
                    = ${formatWithPrefix(parseInput(Z) * parseInput(sinphi), "&Omega;")}<br>`;
			}
			if (Z && phi && isRADactive_Serie) {
				result_Serie_AC += `
                        Blindwiderstand X<sub>C</sub> = 
                        Z &lowast; sin(&phi;) = 
                        ${Z}&Omega; &lowast; sin(${phi})
                    = ${formatWithPrefix(parseInput(Z) * Math.sin(parseInput(phi)), "&Omega;")}<br>`;
			}
			if (Z && phi && !isRADactive_Serie) {
				result_Serie_AC += `
                        Blindwiderstand X<sub>C</sub> = 
                        Z &lowast; sin(&phi;) = 
                        ${Z}&Omega; &lowast; sin(${phi}&deg;)
                    = ${formatWithPrefix(parseInput(Z) * Math.sin((parseInput(phi) * Math.PI) / 180), "&Omega;")}<br>`;
			}
			if (R && phi && isRADactive_Serie) {
				result_Serie_AC += `
                        Blindwiderstand X<sub>C</sub> = 
                        R &lowast; tan(&phi;) = 
                        ${R}&Omega; &lowast; tan(${phi})
                    = ${formatWithPrefix(parseInput(R) * Math.tan(parseInput(phi)), "&Omega;")}<br>`;
			}
			if (R && phi && !isRADactive_Serie) {
				result_Serie_AC += `
                        Blindwiderstand X<sub>C</sub> = 
                        R &lowast; tan(&phi;) = 
                        ${R}&Omega; &lowast; tan(${phi}&deg;)
                    = ${formatWithPrefix(parseInput(R) * Math.tan((parseInput(phi) * Math.PI) / 180), "&Omega;")}<br>`;
			}
			if (C && f) {
				result_Serie_AC += `
                        Blindwiderstand X<sub>C</sub> =
                        <div class ="fraction">
                            <span>1</span><br>
                            <span class="fraction-denumerator">2&pi; &lowast; C &lowast; f</span>
                        </div>
                    = 
                        <div class ="fraction">
                            <span>1</span><br>
                            <span class="fraction-denumerator">2&pi; &lowast; ${C}F &lowast; ${f}Hz</span>
                        </div>
                    = ${formatWithPrefix(1 / (2 * Math.PI * parseInput(C) * parseInput(f)), "&Omega;")}<br>`;
			}
		}
		if (!Z) {
			if (U && I) {
				result_Serie_AC += `
                        Scheinwiderstand Z =
                        <div class ="fraction">
                            <span class="fraction-numerator">U</span><br>
                            <span>I</span>
                        </div>
                    = 
                        <div class ="fraction">
                            <span class="fraction-numerator">${U}V</span><br>
                            <span>${I}A</span>
                        </div>
                    = ${formatWithPrefix(parseInput(U) / parseInput(I), "&Omega;")}<br>`;
			}
			if (R && Xc) {
				result_Serie_AC += `
                        Scheinwiderstand Z = 
                        &radic;(R<sup>2</sup> + X<sub>C</sub><sup>2</sup>)) = 
                        &radic;((${R}&Omega;)<sup>2</sup> + (${Xc}&Omega;)<sup>2</sup>)
                    = ${formatWithPrefix(Math.pow(Math.pow(parseInput(R), 2) + Math.pow(parseInput(Xc), 2), 0.5), "&Omega;")}<br>`;
			}
			if (R && cosphi) {
				result_Serie_AC += `
                        Scheinwiderstand Z =
                        <div class ="fraction">
                            <span>R</span><br>
                            <span class="fraction-denumerator">cos(&phi;)</span>
                        </div>
                    = 
                        <div class ="fraction">
                            <span>${R}&Omega;</span><br>
                            <span class="fraction-denumerator">${cosphi}</span>
                        </div>
                    = ${formatWithPrefix(parseInput(R) / parseInput(cosphi), "&Omega;")}<br>`;
			}
			if (R && phi && isRADactive_Serie) {
				result_Serie_AC += `
                        Scheinwiderstand Z =
                        <div class ="fraction">
                            <span>R</span><br>
                            <span class="fraction-denumerator">cos(&phi;)</span>
                        </div>
                    = 
                        <div class ="fraction">
                            <span>${R}&Omega;</span><br>
                            <span class="fraction-denumerator">cos(${phi})</span>
                        </div>
                    = ${formatWithPrefix(parseInput(R) / Math.cos(parseInput(phi)), "&Omega;")}<br>`;
			}
			if (R && phi && !isRADactive_Serie) {
				result_Serie_AC += `
                        Scheinwiderstand Z =
                        <div class ="fraction">
                            <span>R</span><br>
                            <span class="fraction-denumerator">cos(&phi;)</span>
                        </div>
                    = 
                        <div class ="fraction">
                            <span>${R}&Omega;</span><br>
                            <span class="fraction-denumerator">cos(${phi}&deg;)</span>
                        </div>
                    = ${formatWithPrefix(parseInput(R) / Math.cos((parseInput(phi) * Math.PI) / 180), "&Omega;")}<br>`;
			}
			if (Xc && sinphi) {
				result_Serie_AC += `
                        Scheinwiderstand Z =
                        <div class ="fraction">
                            <span>X<sub>C</sub></span><br>
                            <span class="fraction-denumerator">sin(&phi;)</span>
                        </div>
                    = 
                        <div class ="fraction">
                            <span>${Xc}&Omega;</span><br>
                            <span class="fraction-denumerator">${sinphi}</span>
                        </div>
                    = ${formatWithPrefix(parseInput(Xc) / parseInput(sinphi), "&Omega;")}<br>`;
			}
			if (Xc && phi && isRADactive_Serie) {
				result_Serie_AC += `
                        Scheinwiderstand Z =
                        <div class ="fraction">
                            <span>X<sub>C</sub></span><br>
                            <span class="fraction-denumerator">sin(&phi;)</span>
                        </div>
                    = 
                        <div class ="fraction">
                            <span>${Xc}&Omega;</span><br>
                            <span class="fraction-denumerator">sin(${phi})</span>
                        </div>
                    = ${formatWithPrefix(parseInput(Xc) / Math.sin(parseInput(phi)), "&Omega;")}<br>`;
			}
			if (Xc && phi && !isRADactive_Serie) {
				result_Serie_AC += `
                        Scheinwiderstand Z =
                        <div class ="fraction">
                            <span>X<sub>C</sub></span><br>
                            <span class="fraction-denumerator">sin(&phi;)</span>
                        </div>
                    = 
                        <div class ="fraction">
                            <span>${Xc}&Omega;</span><br>
                            <span class="fraction-denumerator">sin(${phi}&deg;)</span>
                        </div>
                    = ${formatWithPrefix(parseInput(Xc) / Math.sin((parseInput(phi) * Math.PI) / 180), "&Omega;")}<br>`;
			}
		}
		if (!C) {
			if (Xc && f) {
				result_Serie_AC += `
                        Kapazit&auml;t C =
                        <div class ="fraction">
                            <span>1</span><br>
                            <span class="fraction-denumerator">2&pi; &lowast; X<sub>C</sub> &lowast; f</span>
                        </div>
                    = 
                        <div class ="fraction">
                            <span>1</span><br>
                            <span class="fraction-denumerator">2&pi; &lowast; ${Xc}&Omega; &lowast; ${f}Hz</span>
                        </div>
                    = ${formatWithPrefix(1 / (2 * Math.PI * parseInput(Xc) * parseInput(f)), "F")}<br>`;
			}
		}
		if (!Ur) {
			if (R && I) {
				result_Serie_AC += `
                        Wirkspannung U<sub>R</sub> = 
                        R &lowast; I = 
                        ${R}&Omega; &lowast; ${I}A
                    = ${formatWithPrefix(parseInput(R) * parseInput(I), "V")}<br>`;
			}
			if (U && Uc) {
				result_Serie_AC += `
                        Wirkspannung U<sub>R</sub> = 
                        &radic;(U<sup>2</sup> + U<sub>C</sub><sup>2</sup>) = 
                        &radic;((${U}V)<sup>2</sup> - (${Uc}V)<sup>2</sup>)
                    = ${formatWithPrefix(Math.pow(Math.pow(parseInput(U), 2) - Math.pow(parseInput(Uc), 2), 0.5), "V")}<br>`;
			}
			if (U && cosphi) {
				result_Serie_AC += `
                        Wirkspannung U<sub>R</sub> = 
                        U &lowast; cos(&phi;) = 
                        ${U}V &lowast; ${cosphi}
                    = ${formatWithPrefix(parseInput(U) * parseInput(cosphi), "V")}<br>`;
			}
			if (U && phi && isRADactive_Serie) {
				result_Serie_AC += `
                        Wirkspannung U<sub>R</sub> = 
                        U &lowast; cos(&phi;) = 
                        ${U}V &lowast; cos(${phi})
                    = ${formatWithPrefix(parseInput(U) * Math.cos(parseInput(phi)), "V")}<br>`;
			}
			if (U && phi && !isRADactive_Serie) {
				result_Serie_AC += `
                        Wirkspannung U<sub>R</sub> = 
                        U &lowast; cos(&phi;) = 
                        ${U}V &lowast; cos(${phi}&deg;)
                    = ${formatWithPrefix(parseInput(U) * Math.cos((parseInput(phi) * Math.PI) / 180), "V")}<br>`;
			}
			if (Uc && phi && isRADactive_Serie) {
				result_Serie_AC += `
                        Wirkspannung U<sub>R</sub> =
                        <div class ="fraction">
                            <span>U<sub>c</sub></span><br>
                            <span class="fraction-denumerator">tan(&phi;)</span>
                        </div>
                    = 
                        <div class ="fraction">
                            <span>${Uc}V</span><br>
                            <span class="fraction-denumerator">tan(${phi})</span>
                        </div>
                    = ${formatWithPrefix(parseInput(Uc) / Math.tan(parseInput(phi)), "V")}<br>`;
			}
			if (Uc && phi && !isRADactive_Serie) {
				result_Serie_AC += `
                        Wirkspannung U<sub>R</sub> =
                        <div class ="fraction">
                            <span>U<sub>c</sub></span><br>
                            <span class="fraction-denumerator">tan(&phi;)</span>
                        </div>
                    = 
                        <div class ="fraction">
                            <span>${Uc}V</span><br>
                            <span class="fraction-denumerator">tan(${phi}&deg;)</span>
                        </div>
                    = ${formatWithPrefix(parseInput(Uc) / Math.tan((parseInput(phi) * Math.PI) / 180), "V")}<br>`;
			}
		}
		if (!Uc) {
			if (Xc && I) {
				result_Serie_AC += `
                        Blindspannung U<sub>C</sub> = 
                        X<sub>C>/sub> &lowast; I = 
                        ${Xc}&Omega; &lowast; ${I}A
                    = ${formatWithPrefix(parseInput(Xc) * parseInput(I), "V")}<br>`;
			}
			if (U && Ur) {
				result_Serie_AC += `
                        Blindspannung U<sub>C</sub> = 
                        &radic;(U<sup>2</sup> - U<sub>R</sub><sup>2</sup>) = 
                        &radic;((${U}V)<sup>2</sup> - (${Ur}V)<sup>2</sup>)
                    = ${formatWithPrefix(Math.pow(Math.pow(parseInput(U), 2) - Math.pow(parseInput(Ur), 2), 0.5), "V")}<br>`;
			}
			if (U && sinphi) {
				result_Serie_AC += `
                        Blindspannung U<sub>C</sub> = 
                        U &lowast; sin(&phi;) = 
                        ${U}V &lowast; ${sinphi}
                    = ${formatWithPrefix(parseInput(U) * parseInput(sinphi), "V")}<br>`;
			}
			if (U && phi && isRADactive_Serie) {
				result_Serie_AC += `
                        Blindspannung U<sub>C</sub> = 
                        U &lowast; sin(&phi;) = 
                        ${U}V &lowast; sin(${phi})
                    = ${formatWithPrefix(parseInput(U) * Math.sin(parseInput(phi)), "V")}<br>`;
			}
			if (U && phi && !isRADactive_Serie) {
				result_Serie_AC += `
                        Blindspannung U<sub>C</sub> = 
                        U &lowast; sin(&phi;) = 
                        ${U}V &lowast; sin(${phi}&deg;)
                    = ${formatWithPrefix(parseInput(U) * Math.sin((parseInput(phi) * Math.PI) / 180), "V")}<br>`;
			}
			if (Ur && phi && isRADactive_Serie) {
				result_Serie_AC += `
                        Blindspannung U<sub>C</sub> = 
                        U<sub>R</sub> &lowast; tan(&phi;) = 
                        ${Ur}V &lowast; tan(${phi})
                    = ${formatWithPrefix(parseInput(Ur) * Math.tan(parseInput(phi)), "V")}<br>`;
			}
			if (Ur && phi && !isRADactive_Serie) {
				result_Serie_AC += `
                        Blindspannung U<sub>C</sub> = 
                        U<sub>R</sub> &lowast; tan(&phi;) = 
                        ${Ur}V &lowast; tan(${phi}&deg;)
                    = ${formatWithPrefix(parseInput(Ur) * Math.tan((parseInput(phi) * Math.PI) / 180), "V")}<br>`;
			}
		}
		if (!U) {
			if (Z && I) {
				result_Serie_AC += `
                        Gesamtspannung U = 
                        Z &lowast; I = 
                        ${Z}&Omega; &lowast; ${I}A
                    = ${formatWithPrefix(parseInput(Z) * parseInput(I), "V")}<br>`;
			}
			if (Ur && Uc) {
				result_Serie_AC += `
                        Gesamtspannung U = 
                        &radic;(U<sub>R</sub><sup>2</sup> + U<sub>C</sub><sup>2</sup>)) = 
                        &radic;((${Ur}V)<sup>2</sup> + (${Uc}V)<sup>2</sup>)
                    = ${formatWithPrefix(Math.pow(Math.pow(parseInput(Ur), 2) + Math.pow(parseInput(Uc), 2), 0.5), "V")}<br>`;
			}
			if (Ur && cosphi) {
				result_Serie_AC += `
                        Gesamtspannung U =
                        <div class ="fraction">
                            <span>U<sub>R</sub></span><br>
                            <span class="fraction-denumerator">cos(&phi;)</span>
                        </div>
                    = 
                        <div class ="fraction">
                            <span>${Ur}V</span><br>
                            <span class="fraction-denumerator">${cosphi}</span>
                        </div>
                    = ${formatWithPrefix(parseInput(Ur) / parseInput(cosphi), "V")}<br>`;
			}
			if (Ur && phi && isRADactive_Serie) {
				result_Serie_AC += `
                        Gesamtspannung U =
                        <div class ="fraction">
                            <span>U<sub>R</sub></span><br>
                            <span class="fraction-denumerator">cos(&phi;)</span>
                        </div>
                    = 
                        <div class ="fraction">
                            <span>${Ur}V</span><br>
                            <span class="fraction-denumerator">cos(${phi})</span>
                        </div>
                    = ${formatWithPrefix(parseInput(Ur) / Math.cos(parseInput(phi)), "V")}<br>`;
			}
			if (Ur && phi && !isRADactive_Serie) {
				result_Serie_AC += `
                        Gesamtspannung U =
                        <div class ="fraction">
                            <span>U<sub>R</sub></span><br>
                            <span class="fraction-denumerator">cos(&phi;)</span>
                        </div>
                    = 
                        <div class ="fraction">
                            <span>${Ur}V</span><br>
                            <span class="fraction-denumerator">cos(${phi}&deg;)</span>
                        </div>
                    = ${formatWithPrefix(parseInput(Ur) / Math.cos((parseInput(phi) * Math.PI) / 180), "V")}<br>`;
			}
			if (Uc && sinphi) {
				result_Serie_AC += `
                        Gesamtspannung U =
                        <div class ="fraction">
                            <span>U<sub>C</sub></span><br>
                            <span class="fraction-denumerator">sin(&phi;)</span>
                        </div>
                    = 
                        <div class ="fraction">
                            <span>${Uc}V</span><br>
                            <span class="fraction-denumerator">${sinphi}</span>
                        </div>
                    = ${formatWithPrefix(parseInput(Uc) / parseInput(sinphi), "V")}<br>`;
			}
			if (Uc && phi && isRADactive_Serie) {
				result_Serie_AC += `
                        Gesamtspannung U =
                        <div class ="fraction">
                            <span>U<sub>C</sub></span><br>
                            <span class="fraction-denumerator">sin(&phi;)</span>
                        </div>
                    = 
                        <div class ="fraction">
                            <span>${Uc}V</span><br>
                            <span class="fraction-denumerator">sin(${phi})</span>
                        </div>
                    = ${formatWithPrefix(parseInput(Uc) / Math.sin(parseInput(phi)), "V")}<br>`;
			}
			if (Uc && phi && !isRADactive_Serie) {
				result_Serie_AC += `
                        Gesamtspannung U =
                        <div class ="fraction">
                            <span>U<sub>C</sub></span><br>
                            <span class="fraction-denumerator">sin(&phi;)</span>
                        </div>
                    = 
                        <div class ="fraction">
                            <span>${Uc}V</span><br>
                            <span class="fraction-denumerator">sin(${phi}&deg;)</span>
                        </div>
                    = ${formatWithPrefix(parseInput(Uc) / Math.sin((parseInput(phi) * Math.PI) / 180), "V")}<br>`;
			}
		}
		if (!f) {
			if (Xc && C) {
				result_Serie_AC += `
                        Frequnez f =
                        <div class ="fraction">
                            <span>1</span><br>
                            <span class="fraction-denumerator">2&pi; &lowast; X<sub>C</sub> &lowast; C</span>
                        </div>
                    = 
                        <div class ="fraction">
                            <span>1</span><br>
                            <span class="fraction-denumerator">2&pi; &lowast; ${Xc}&Omega; &lowast; ${C}F</span>
                        </div>
                    = ${formatWithPrefix(1 / (2 * Math.PI * parseInput(Xc) * parseInput(C)), "Hz")}<br>`;
			}
		}
		if (!cosphi) {
			if (R && Z) {
				result_Serie_AC += `
                        Wirkfaktor cos(&phi;) =
                        <div class ="fraction">
                            <span class="fraction-numerator">R</span><br>
                            <span>Z</span>
                        </div>
                    = 
                        <div class ="fraction">
                            <span class="fraction-numerator">${R}&Omega;</span><br>
                            <span>${Z}&Omega;</span>
                        </div>
                    = ${formatWithPrefix(parseInput(R) / parseInput(Z), "")}<br>`;
			}
			if (Ur && U) {
				result_Serie_AC += `
                        Wirkfaktor cos(&phi;) =
                        <div class ="fraction">
                            <span class="fraction-numerator">U<sub>R</sub></span><br>
                            <span>U</span>
                        </div>
                    = 
                        <div class ="fraction">
                            <span class="fraction-numerator">${Ur}V</span><br>
                            <span>${U}V</span>
                        </div>
                    = ${formatWithPrefix(parseInput(Ur) / parseInput(U), "")}<br>`;
			}
		}
		if (!sinphi) {
			if (Xc && Z) {
				result_Serie_AC += `
                        Blindfaktor sin(&phi;) =
                        <div class ="fraction">
                            <span class="fraction-numerator">X<sub>C</sub></span><br>
                            <span>Z</span>
                        </div>
                    = 
                        <div class ="fraction">
                            <span class="fraction-numerator">${Xc}&Omega;</span><br>
                            <span>${Z}&Omega;</span>
                        </div>
                    = ${formatWithPrefix(parseInput(Xc) / parseInput(Z), "")}<br>`;
			}
			if (Ur && U) {
				result_Serie_AC += `
                        Blindfaktor sin(&phi;) =
                        <div class ="fraction">
                            <span class="fraction-numerator">U<sub>C</sub></span><br>
                            <span>U</span>
                        </div>
                    = 
                        <div class ="fraction">
                            <span class="fraction-numerator">${Uc}V</span><br>
                            <span>${U}V</span>
                        </div>
                    = ${formatWithPrefix(parseInput(Uc) / parseInput(U), "")}<br>`;
			}
		}
		setHTML(document.getElementById("result_Serie_AC"), result_Serie_AC);
		drawSpannungsdreieckSerie("phasorCanvasVoltage", "phasorLegendVoltage");
		drawWiderstandsdreieckSerie(
			"phasorCanvasImpedance",
			"phasorLegendImpedance",
		);
	}
	let isRADactive_Parallel = false;
	function toggleRADp() {
		let button = document.getElementById("Rad-Buttonp");
		if (isRADactive_Parallel) {
			setHTML(button, "360&deg;");
			isRADactive_Parallel = false;
		} else {
			setHTML(button, "2&pi;");
			isRADactive_Parallel = true;
		}
	}
	document.getElementById("modeSwitch").addEventListener("change", function () {
		const modeLabel = document.getElementById("modeLabel");
		const circuitImage = document.getElementById("circuitImage");
		if (this.checked) {
			modeLabel.textContent = "Entladen";
			circuitImage.src = "/Pictures/RC_Discharge.png";
		} else {
			modeLabel.textContent = "Laden";
			circuitImage.src = "/Pictures/RC_Charge.png";
		}
	});
	function calculateParallelAC() {
		let result_Parallel_AC = ``;
		const phi = document.getElementById("phi_ACp").value;
		const Ir = document.getElementById("Ir_ACp").value;
		const Ic = document.getElementById("Ic_ACp").value;
		const I = document.getElementById("I_ACp").value;
		const G = document.getElementById("G_ACp").value;
		const Bc = document.getElementById("Bc_ACp").value;
		const Y = document.getElementById("Y_ACp").value;
		const C = document.getElementById("C_ACp").value;
		const P = document.getElementById("P_ACp").value;
		const Q = document.getElementById("Q_ACp").value;
		const S = document.getElementById("S_ACp").value;
		const U = document.getElementById("U_ACp").value;
		const f = document.getElementById("f_ACp").value;
		const cosphi = document.getElementById("cosphi_ACp").value;
		const sinphi = document.getElementById("sinphi_ACp").value;
		if (!phi) {
			if (Bc && Y) {
				result_Parallel_AC += `
                        Winkel &phi;<sub>RAD</sub> = 
                        arcsin(<div class ="fraction">
                            <span class="fraction-numerator">B<sub>C</sub></span><br>
                            <span>Y</span>
                        </div>)
                    =
                        arcsin(<div class ="fraction">
                            <span class="fraction-numerator">${Bc}S</span><br>
                            <span>${Y}S</span>
                        </div>)
                    = ${formatWithPrefix(Math.asin(parseInput(Bc) / parseInput(Y)), "")} &rarr;

                    &phi;<sub>DEG</sub> 
                    = ${formatWithPrefix((Math.asin(parseInput(Bc) / parseInput(Y)) * 180) / Math.PI, "&deg;")}<br>`;
			}
			if (Ic && I) {
				result_Parallel_AC += `
                        Winkel &phi;<sub>RAD</sub> = 
                        arcsin(<div class ="fraction">
                            <span class="fraction-numerator">I<sub>C</sub></span><br>
                            <span>I</span>
                        </div>)
                    =
                        arcsin(<div class ="fraction">
                            <span class="fraction-numerator">${Ic}A</span><br>
                            <span>${I}A</span>
                        </div>)
                    = ${formatWithPrefix(Math.asin(parseInput(Ic) / parseInput(I)), "")} &rarr;

                    &phi;<sub>DEG</sub>
                    = ${formatWithPrefix((Math.asin(parseInput(Ic) / parseInput(I)) * 180) / Math.PI, "&deg;")}<br>`;
			}
			if (G && Y) {
				result_Parallel_AC += `
                        Winkel &phi;<sub>RAD</sub> = 
                        arccos(<div class ="fraction">
                            <span class="fraction-numerator">G</span><br>
                            <span>Y</span>
                        </div>)
                    =
                        arccos(<div class ="fraction">
                            <span class="fraction-numerator">${G}S</span><br>
                            <span>${Y}S</span>
                        </div>)
                    = ${formatWithPrefix(Math.acos(parseInput(G) / parseInput(Y)), "")} &rarr;

                    &phi;<sub>DEG</sub> 
                    = ${formatWithPrefix((Math.acos(parseInput(G) / parseInput(Y)) * 180) / Math.PI, "&deg;")}<br>`;
			}
			if (Ir && I) {
				result_Parallel_AC += `
                        Winkel &phi;<sub>RAD</sub> = 
                        arccos(<div class ="fraction">
                            <span class="fraction-numerator">I<sub>R</sub></span><br>
                            <span>I</span>
                        </div>)
                    =
                        arccos(<div class ="fraction">
                            <span class="fraction-numerator">${Ir}A</span><br>
                            <span>${I}A</span>
                        </div>)
                    = ${formatWithPrefix(Math.acos(parseInput(Ir) / parseInput(I)), "")} &rarr;

                    &phi;<sub>DEG</sub>
                    = ${formatWithPrefix((Math.acos(parseInput(Ir) / parseInput(I)) * 180) / Math.PI, "&deg;")}<br>`;
			}
			if (Bc && G) {
				result_Parallel_AC += `
                        Winkel &phi;<sub>RAD</sub> = 
                        arctan(<div class ="fraction">
                            <span class="fraction-numerator">B<sub>C</sub></span><br>
                            <span>G</span>
                        </div>)
                    =
                        arctan(<div class ="fraction">
                            <span class="fraction-numerator">${Bc}S</span><br>
                            <span>${G}S</span>
                        </div>)
                    = ${formatWithPrefix(Math.atan(parseInput(Bc) / parseInput(G)), "")} &rarr;

                    &phi;<sub>DEG</sub> 
                    = ${formatWithPrefix((Math.atan(parseInput(Bc) / parseInput(G)) * 180) / Math.PI, "&deg;")}<br>`;
			}
			if (Ic && Ir) {
				result_Parallel_AC += `
                        Winkel &phi;<sub>RAD</sub> = 
                        arctan(<div class ="fraction">
                            <span class="fraction-numerator">I<sub>C</sub></span><br>
                            <span>I<sub>R</sub></span>
                        </div>)
                    =
                        arctan(<div class ="fraction">
                            <span class="fraction-numerator">${Ic}A</span><br>
                            <span>${Ir}A</span>
                        </div>)
                    = ${formatWithPrefix(Math.atan(parseInput(Ic) / parseInput(Ir)), "")} &rarr;

                    &phi;<sub>DEG</sub>
                    = ${formatWithPrefix((Math.atan(parseInput(Ic) / parseInput(Ir)) * 180) / Math.PI, "&deg;")}<br>`;
			}
			if (sinphi) {
				result_Parallel_AC += `
                        Winkel &phi;<sub>RAD</sub> = 
                        arcsin(sin(&phi;))
                    =
                        arcsin(${sinphi})
                    = ${formatWithPrefix(Math.sin(parseInput(sinphi)), "")} &rarr;

                    &phi;<sub>DEG</sub>
                    = ${formatWithPrefix((Math.asin(parseInput(sinphi)) * 180) / Math.PI, "&deg;")}<br>`;
			}
			if (cosphi) {
				result_Parallel_AC += `
                        Winkel &phi;<sub>RAD</sub> = 
                        arccso(cos(&phi;))
                    =
                        arcsin(${cosphi})
                    = ${formatWithPrefix(Math.cos(parseInput(cosphi)), "")} &rarr;

                    &phi;<sub>DEG</sub>
                    = ${formatWithPrefix((Math.cos(parseInput(cosphi)) * 180) / Math.PI, "&deg;")}<br>`;
			}
		}
		if (!Ir) {
			if (U && G) {
				result_Parallel_AC += `
                        Wirkstrom I<sub>R</sub> = 
                        U &lowast; G = 
                        ${U}V &lowast; ${G}S
                    = ${formatWithPrefix(parseInput(U) * parseInput(G), "A")}<br>`;
			}
			if (I && Ic) {
				result_Parallel_AC += `
                        Wirkstrom U<sub>R</sub> = 
                        &radic;(I<sup>2</sup> + I<sub>C</sub><sup>2</sup>) = 
                        &radic;((${I}A)<sup>2</sup> - (${Ic}A)<sup>2</sup>)
                    = ${formatWithPrefix(Math.pow(Math.pow(parseInput(I), 2) - Math.pow(parseInput(Ic), 2), 0.5), "A")}<br>`;
			}
			if (I && cosphi) {
				result_Parallel_AC += `
                        Wirkstrom I<sub>R</sub> = 
                        I &lowast; cos(&phi;) = 
                        ${I}A &lowast; ${cosphi}
                    = ${formatWithPrefix(parseInput(I) * parseInput(cosphi), "A")}<br>`;
			}
			if (I && phi && isRADactive_Parallel) {
				result_Parallel_AC += `
                        Wirkstrom I<sub>R</sub> = 
                        I &lowast; cos(&phi;) = 
                        ${I}A &lowast; cos(${phi})
                    = ${formatWithPrefix(parseInput(I) * Math.cos(parseInput(phi)), "A")}<br>`;
			}
			if (I && phi && !isRADactive_Parallel) {
				result_Parallel_AC += `
                        Wirkstrom I<sub>R</sub> = 
                        I &lowast; cos(&phi;) = 
                        ${I}A &lowast; cos(${phi}&deg;)
                    = ${formatWithPrefix(parseInput(I) * Math.cos((parseInput(phi) * Math.PI) / 180), "A")}<br>`;
			}
			if (Ic && phi && isRADactive_Parallel) {
				result_Parallel_AC += `
                        Wirkstrom I<sub>R</sub> =
                        <div class ="fraction">
                            <span>I<sub>c</sub></span><br>
                            <span class="fraction-denumerator">tan(&phi;)</span>
                        </div>
                    = 
                        <div class ="fraction">
                            <span>${Ic}A</span><br>
                            <span class="fraction-denumerator">tan(${phi})</span>
                        </div>
                    = ${formatWithPrefix(parseInput(Uc) / Math.tan(parseInput(phi)), "A")}<br>`;
			}
			if (Ic && phi && !isRADactive_Parallel) {
				result_Parallel_AC += `
                        Wirkstrom I<sub>R</sub> =
                        <div class ="fraction">
                            <span>U<sub>c</sub></span><br>
                            <span class="fraction-denumerator">tan(&phi;)</span>
                        </div>
                    = 
                        <div class ="fraction">
                            <span>${Ic}A</span><br>
                            <span class="fraction-denumerator">tan(${phi}&deg;)</span>
                        </div>
                    = ${formatWithPrefix(parseInput(Ic) / Math.tan((parseInput(phi) * Math.PI) / 180), "A")}<br>`;
			}
		}
		if (!Ic) {
			if (U && Bc) {
				result_Parallel_AC += `
                        Blindstrom I<sub>C</sub> = 
                        U &lowast; B<sub>C>/sub> = 
                        ${U}V &lowast; ${Bc}S  
                    = ${formatWithPrefix(parseInput(U) * parseInput(Bc), "A")}<br>`;
			}
			if (I && Ir) {
				result_Parallel_AC += `
                        Blindstrom I<sub>C</sub> =  
                        &radic;(I<sup>2</sup> - I<sub>R</sub><sup>2</sup>) = 
                        &radic;((${I}A)<sup>2</sup> - (${Ir}A)<sup>2</sup>)
                    = ${formatWithPrefix(Math.pow(Math.pow(parseInput(I), 2) - Math.pow(parseInput(Ir), 2), 0.5), "A")}<br>`;
			}
			if (I && sinphi) {
				result_Parallel_AC += `
                        Blindstrom I<sub>C</sub> =  
                        I &lowast; sin(&phi;) = 
                        ${I}A &lowast; ${sinphi}
                    = ${formatWithPrefix(parseInput(I) * parseInput(sinphi), "A")}<br>`;
			}
			if (I && phi && isRADactive_Parallel) {
				result_Parallel_AC += `
                        Blindstrom I<sub>C</sub> =  
                        I &lowast; sin(&phi;) = 
                        ${I}A &lowast; sin(${phi})
                    = ${formatWithPrefix(parseInput(I) * Math.sin(parseInput(phi)), "A")}<br>`;
			}
			if (I && phi && !isRADactive_Parallel) {
				result_Parallel_AC += `
                        Blindstrom I<sub>C</sub> =  
                        I &lowast; sin(&phi;) = 
                        ${I}A &lowast; sin(${phi}&deg;)
                    = ${formatWithPrefix(parseInput(I) * Math.sin((parseInput(phi) * Math.PI) / 180), "A")}<br>`;
			}
			if (Ir && phi && isRADactive_Parallel) {
				result_Parallel_AC += `
                        Blindstrom I<sub>C</sub> =  
                        I<sub>R</sub> &lowast; tan(&phi;) = 
                        ${Ir}A &lowast; tan(${phi})
                    = ${formatWithPrefix(parseInput(Ir) * Math.tan(parseInput(phi)), "A")}<br>`;
			}
			if (Ir && phi && !isRADactive_Parallel) {
				result_Parallel_AC += `
                        Blindstrom I<sub>C</sub> =  
                        I<sub>R</sub> &lowast; tan(&phi;) = 
                        ${Ir}A &lowast; tan(${phi}&deg;)
                    = ${formatWithPrefix(parseInput(Ir) * Math.tan((parseInput(phi) * Math.PI) / 180), "A")}<br>`;
			}
		}
		if (!I) {
			if (U && G) {
				result_Parallel_AC += `
                        Gesamtstrom I = 
                        U &lowast; G = 
                        ${U}V &lowast; ${G}S
                    = ${formatWithPrefix(parseInput(U) * parseInput(G), "A")}<br>`;
			}
			if (Ir && Ic) {
				result_Parallel_AC += `
                        Gesamtstrom I = 
                        &radic;(I<sub>R</sub><sup>2</sup> + I<sub>C</sub><sup>2</sup>)) = 
                        &radic;((${Ir}A)<sup>2</sup> + (${Ic}A)<sup>2</sup>)
                    = ${formatWithPrefix(Math.pow(Math.pow(parseInput(Ir), 2) + Math.pow(parseInput(Ic), 2), 0.5), "A")}<br>`;
			}
			if (Ir && cosphi) {
				result_Parallel_AC += `
                        Gesamtstrom I =
                        <div class ="fraction">
                            <span>I<sub>R</sub></span><br>
                            <span class="fraction-denumerator">cos(&phi;)</span>
                        </div>
                    = 
                        <div class ="fraction">
                            <span>${Ir}A</span><br>
                            <span class="fraction-denumerator">${cosphi}</span>
                        </div>
                    = ${formatWithPrefix(parseInput(Ir) / parseInput(cosphi), "A")}<br>`;
			}
			if (Ir && phi && isRADactive_Parallel) {
				result_Parallel_AC += `
                        Gesamtstrom I =
                        <div class ="fraction">
                            <span>I<sub>R</sub></span><br>
                            <span class="fraction-denumerator">cos(&phi;)</span>
                        </div>
                    = 
                        <div class ="fraction">
                            <span>${Ir}A</span><br>
                            <span class="fraction-denumerator">cos(${phi})</span>
                        </div>
                    = ${formatWithPrefix(parseInput(Ir) / Math.cos(parseInput(phi)), "A")}<br>`;
			}
			if (Ir && phi && !isRADactive_Parallel) {
				result_Parallel_AC += `
                        Gesamtstrom I =
                        <div class ="fraction">
                            <span>I<sub>R</sub></span><br>
                            <span class="fraction-denumerator">cos(&phi;)</span>
                        </div>
                    = 
                        <div class ="fraction">
                            <span>${Ir}A</span><br>
                            <span class="fraction-denumerator">cos(${phi}&deg;)</span>
                        </div>
                    = ${formatWithPrefix(parseInput(Ir) / Math.cos((parseInput(phi) * Math.PI) / 180), "A")}<br>`;
			}
			if (Ic && sinphi) {
				result_Parallel_AC += `
                        Gesamtstrom I =
                        <div class ="fraction">
                            <span>I<sub>C</sub></span><br>
                            <span class="fraction-denumerator">sin(&phi;)</span>
                        </div>
                    = 
                        <div class ="fraction">
                            <span>${Ic}A</span><br>
                            <span class="fraction-denumerator">${sinphi}</span>
                        </div>
                    = ${formatWithPrefix(parseInput(Ic) / parseInput(sinphi), "A")}<br>`;
			}
			if (Ic && phi && isRADactive_Parallel) {
				result_Parallel_AC += `
                        Gesamtstrom I =
                        <div class ="fraction">
                            <span>I<sub>C</sub></span><br>
                            <span class="fraction-denumerator">sin(&phi;)</span>
                        </div>
                    = 
                        <div class ="fraction">
                            <span>${Ic}A</span><br>
                            <span class="fraction-denumerator">sin(${phi})</span>
                        </div>
                    = ${formatWithPrefix(parseInput(Ic) / Math.sin(parseInput(phi)), "A")}<br>`;
			}
			if (Ic && phi && !isRADactive_Parallel) {
				result_Parallel_AC += `
                        Gesamtstrom I =
                        <div class ="fraction">
                            <span>I<sub>C</sub></span><br>
                            <span class="fraction-denumerator">sin(&phi;)</span>
                        </div>
                    = 
                        <div class ="fraction">
                            <span>${Ic}A</span><br>
                            <span class="fraction-denumerator">sin(${phi}&deg;)</span>
                        </div>
                    = ${formatWithPrefix(parseInput(Ic) / Math.sin((parseInput(phi) * Math.PI) / 180), "A")}<br>`;
			}
		}
		if (!G) {
			if (U && Ir) {
				result_Parallel_AC += `
                        Leitwert G =
                        <div class ="fraction">
                            <span class="fraction-numerator">I<sub>R</sub></span><br>
                            <span>U</span>
                        </div>
                    = 
                        <div class ="fraction">
                            <span class="fraction-numerator">${Ir}A</span><br>
                            <span>${U}V</span>
                        </div>
                    = ${formatWithPrefix(parseInput(Ir) / parseInput(U), "S")}<br>`;
			}
			if (Y && Bc) {
				result_Parallel_AC += `
                        Leitwert G = 
                        &radic;(Y<sup>2</sup> - B<sub>C</sub><sup>2</sup>) = 
                        &radic;((${Y}S)<sup>2</sup> - (${Bc}S)<sup>2</sup>)
                    = ${formatWithPrefix(Math.pow(Math.pow(parseInput(Y), 2) - Math.pow(parseInput(Bc), 2), 0.5), "S")}<br>`;
			}
			if (Y && cosphi) {
				result_Parallel_AC += `
                        Leitwert G =
                        Y &lowast; cos(&phi;) = 
                        ${Y}S &lowast; ${cosphi}
                    = ${formatWithPrefix(parseInput(Y) * parseInput(cosphi), "S")}<br>`;
			}
			if (Y && phi && isRADactive_Parallel) {
				result_Parallel_AC += `
                        Leitwert G =
                        Y &lowast; cos(&phi;) = 
                        ${Y}S &lowast; cos(${phi})
                    = ${formatWithPrefix(parseInput(Y) * Math.cos(parseInput(phi)), "S")}<br>`;
			}
			if (Y && phi && !isRADactive_Parallel) {
				result_Parallel_AC += `
                        Leitwert G = 
                        Y &lowast; cos(&phi;) = 
                        ${Y}S &lowast; cos(${phi}&deg;)
                    = ${formatWithPrefix(parseInput(Y) * Math.cos((parseInput(phi) * Math.PI) / 180), "S")}<br>`;
			}
			if (Bc && phi && isRADactive_Parallel) {
				result_Parallel_AC += `
                        Leitwert G =
                        <div class ="fraction">
                            <span>B<sub>C</sub></span><br>
                            <span class="fraction-denumerator">tan(&phi;)</span>
                        </div>
                    = 
                        <div class ="fraction">
                            <span>${Bc}S</span><br>
                            <span class="fraction-denumerator">tan(${phi})</span>
                        </div>
                    = ${formatWithPrefix(parseInput(Bc) / Math.tan(parseInput(phi)), "S")}<br>`;
			}
			if (Bc && phi && !isRADactive_Parallel) {
				result_Parallel_AC += `
                        Leitwert G =
                        <div class ="fraction">
                            <span>B<sub>C</sub></span><br>
                            <span class="fraction-denumerator">tan(&phi;)</span>
                        </div>
                    = 
                        <div class ="fraction">
                            <span>${Bc}S</span><br>
                            <span class="fraction-denumerator">tan(${phi}&deg;)</span>
                        </div>
                    = ${formatWithPrefix(parseInput(Bc) / Math.tan((parseInput(phi) * Math.PI) / 180), "S")}<br>`;
			}
		}
		if (!Bc) {
			if (U && Ic) {
				result_Parallel_AC += `
                        Blindleitwert B<sub>C</sub> =
                        <div class ="fraction">
                            <span class="fraction-numerator">I<sub>C</sub></span><br>
                            <span>U</span>
                        </div>
                    = 
                        <div class ="fraction">
                            <span class="fraction-numerator">${Ic}A</span><br>
                            <span>${U}V</span>
                        </div>
                    = ${formatWithPrefix(parseInput(Ic) / parseInput(U), "S")}<br>`;
			}
			if (Y && G) {
				result_Parallel_AC += `
                        Blindleitwert B<sub>C</sub> =
                        &radic;(Y<sup>2</sup> - G<sup>2</sup>) = 
                        &radic;((${Y}S)<sup>2</sup> - (${G}S)<sup>2</sup>)
                    = ${formatWithPrefix(Math.pow(Math.pow(parseInput(Y), 2) - Math.pow(parseInput(G), 2), 0.5), "S")}<br>`;
			}
			if (Y && sinphi) {
				result_Parallel_AC += `
                        Blindleitwert B<sub>C</sub> =
                        Y &lowast; sin(&phi;) = 
                        ${Y}S &lowast; ${sinphi}
                    = ${formatWithPrefix(parseInput(Y) * parseInput(sinphi), "S")}<br>`;
			}
			if (Y && phi && isRADactive_Parallel) {
				result_Parallel_AC += `
                        Blindleitwert B<sub>C</sub> =
                        Y &lowast; sin(&phi;) = 
                        ${Y}S &lowast; sin(${phi})
                    = ${formatWithPrefix(parseInput(Y) * Math.sin(parseInput(phi)), "S")}<br>`;
			}
			if (Y && phi && !isRADactive_Parallel) {
				result_Parallel_AC += `
                        Blindleitwert B<sub>C</sub> =
                        Y &lowast; sin(&phi;) = 
                        ${Y}S &lowast; sin(${phi}&deg;)
                    = ${formatWithPrefix(parseInput(Y) * Math.sin((parseInput(phi) * Math.PI) / 180), "S")}<br>`;
			}
			if (G && phi && isRADactive_Parallel) {
				result_Parallel_AC += `
                        Blindleitwert B<sub>C</sub> =
                        G &lowast; tan(&phi;) = 
                        ${G}S &lowast; tan(${phi})
                    = ${formatWithPrefix(parseInput(G) * Math.tan(parseInput(phi)), "S")}<br>`;
			}
			if (G && phi && !isRADactive_Parallel) {
				result_Parallel_AC += `
                        Blindleitwert B<sub>C</sub> =
                        G &lowast; tan(&phi;) = 
                        ${G}S &lowast; tan(${phi}&deg;)
                    = ${formatWithPrefix(parseInput(G) * Math.tan((parseInput(phi) * Math.PI) / 180), "S")}<br>`;
			}
			if (C && f) {
				result_Parallel_AC += `
                        Blindleitwert B<sub>C</sub> =
                        2&pi; &lowast; C &lowast; f = 
                        2&pi; &lowast; ${C}F &lowast; ${f}Hz
                    = ${formatWithPrefix(2 * Math.PI * parseInput(f) * parseInput(C), "S")}<br>`;
			}
		}
		if (!Y) {
			if (U && I) {
				result_Parallel_AC += `
                        Scheinleitwert Y =
                        <div class ="fraction">
                            <span class="fraction-numerator">I</span><br>
                            <span>U</span>
                        </div>
                    = 
                        <div class ="fraction">
                            <span class="fraction-numerator">${I}A</span><br>
                            <span>${U}V</span>
                        </div>
                    = ${formatWithPrefix(parseInput(I) / parseInput(U), "S")}<br>`;
			}
			if (G && Bc) {
				result_Parallel_AC += `
                        Scheinleitwert Y =
                        &radic;(G<sup>2</sup> + B<sub>C</sub><sup>2</sup>)) = 
                        &radic;((${G}S)<sup>2</sup> + (${Bc}S)<sup>2</sup>)
                    = ${formatWithPrefix(Math.pow(Math.pow(parseInput(G), 2) + Math.pow(parseInput(Bc), 2), 0.5), "S")}<br>`;
			}
			if (G && cosphi) {
				result_Parallel_AC += `
                        Scheinleitwert Y =
                        <div class ="fraction">
                            <span>G</span><br>
                            <span class="fraction-denumerator">cos(&phi;)</span>
                        </div>
                    = 
                        <div class ="fraction">
                            <span>${G}S</span><br>
                            <span class="fraction-denumerator">${cosphi}</span>
                        </div>
                    = ${formatWithPrefix(parseInput(G) / parseInput(cosphi), "S")}<br>`;
			}
			if (G && phi && isRADactive_Parallel) {
				result_Parallel_AC += `
                        Scheinleitwert Y =
                        <div class ="fraction">
                            <span>G</span><br>
                            <span class="fraction-denumerator">cos(&phi;)</span>
                        </div>
                    = 
                        <div class ="fraction">
                            <span>${G}S</span><br>
                            <span class="fraction-denumerator">cos(${phi})</span>
                        </div>
                    = ${formatWithPrefix(parseInput(G) / Math.cos(parseInput(phi)), "S")}<br>`;
			}
			if (G && phi && !isRADactive_Parallel) {
				result_Parallel_AC += `
                        Scheinleitwert Y =
                        <div class ="fraction">
                            <span>G</span><br>
                            <span class="fraction-denumerator">cos(&phi;)</span>
                        </div>
                    = 
                        <div class ="fraction">
                            <span>${G}S</span><br>
                            <span class="fraction-denumerator">cos(${phi}&deg;)</span>
                        </div>
                    = ${formatWithPrefix(parseInput(G) / Math.cos((parseInput(phi) * Math.PI) / 180), "S")}<br>`;
			}
			if (Bc && sinphi) {
				result_Parallel_AC += `
                        Scheinleitwert Y =
                        <div class ="fraction">
                            <span>B<sub>C</sub></span><br>
                            <span class="fraction-denumerator">sin(&phi;)</span>
                        </div>
                    = 
                        <div class ="fraction">
                            <span>${Bc}S</span><br>
                            <span class="fraction-denumerator">${sinphi}</span>
                        </div>
                    = ${formatWithPrefix(parseInput(Bc) / parseInput(sinphi), "S")}<br>`;
			}
			if (Bc && phi && isRADactive_Parallel) {
				result_Parallel_AC += `
                        Scheinleitwert Y =
                        <div class ="fraction">
                            <span>B<sub>C</sub></span><br>
                            <span class="fraction-denumerator">sin(&phi;)</span>
                        </div>
                    = 
                        <div class ="fraction">
                            <span>${Bc}S</span><br>
                            <span class="fraction-denumerator">sin(${phi})</span>
                        </div>
                    = ${formatWithPrefix(parseInput(Bc) / Math.sin(parseInput(phi)), "S")}<br>`;
			}
			if (Bc && phi && !isRADactive_Parallel) {
				result_Parallel_AC += `
                        Scheinleitwert Y =
                        <div class ="fraction">
                            <span>B<sub>C</sub></span><br>
                            <span class="fraction-denumerator">sin(&phi;)</span>
                        </div>
                    = 
                        <div class ="fraction">
                            <span>${Bc}S</span><br>
                            <span class="fraction-denumerator">sin(${phi}&deg;)</span>
                        </div>
                    = ${formatWithPrefix(parseInput(Bc) / Math.sin((parseInput(phi) * Math.PI) / 180), "S")}<br>`;
			}
		}
		if (!C) {
			if (f && Bc) {
				result_Parallel_AC += `
                        Kapazit&auml;t C =
                        <div class ="fraction">
                            <span class="fraction-numerator">B<sub>C</sub></span><br>
                            <span>2 &pi; &lowast; f</span>
                        </div>
                    = 
                        <div class ="fraction">
                            <span class="fraction-numerator">${Bc}S</span><br>
                            <span>2 &pi; &lowast; ${f}Hz</span>
                        </div>
                    = ${formatWithPrefix(parseInput(Bc) / (2 * Math.PI * parseInput(f)), "F")}<br>`;
			}
		}
		if (!U) {
			if (G && Ir) {
				result_Parallel_AC += `
                        Spannung U =
                        <div class ="fraction">
                            <span class="fraction-numerator">I<sub>R</sub></span><br>
                            <span>G</span>
                        </div>
                    = 
                        <div class ="fraction">
                            <span class="fraction-numerator">${Ir}A</span><br>
                            <span>${G}S</span>
                        </div>
                    = ${formatWithPrefix(parseInput(Ir) / parseInput(G), "V")}<br>`;
			}
			if (U && Ic) {
				result_Parallel_AC += `
                        Spannung U =
                        <div class ="fraction">
                            <span class="fraction-numerator">I<sub>C</sub></span><br>
                            <span>B<sub>C</sub></span>
                        </div>
                    = 
                        <div class ="fraction">
                            <span class="fraction-numerator">${Ic}A</span><br>
                            <span>${Bc}S</span>
                        </div>
                    = ${formatWithPrefix(parseInput(Ic) / parseInput(Bc), "V")}<br>`;
			}
			if (U && I) {
				result_Parallel_AC += `
                        Spannung U =
                        <div class ="fraction">
                            <span class="fraction-numerator">I</span><br>
                            <span>Y</span>
                        </div>
                    = 
                        <div class ="fraction">
                            <span class="fraction-numerator">${I}A</span><br>
                            <span>${Y}S</span>
                        </div>
                    = ${formatWithPrefix(parseInput(I) / parseInput(Y), "V")}<br>`;
			}
		}
		if (!f) {
			if (f && Bc) {
				result_Parallel_AC += `
                        Frequenz f =
                        <div class ="fraction">
                            <span class="fraction-numerator">B<sub>C</sub></span><br>
                            <span>2 &pi; &lowast; C</span>
                        </div>
                    = 
                        <div class ="fraction">
                            <span class="fraction-numerator">${Bc}S</span><br>
                            <span>2 &pi; &lowast; ${C}F</span>
                        </div>
                    = ${formatWithPrefix(parseInput(Bc) / (2 * Math.PI * parseInput(C)), "Hz")}<br>`;
			}
		}
		if (!cosphi) {
			if (G && Y) {
				result_Serie_AC += `
                        Wirkfaktor cos(&phi;) =
                        <div class ="fraction">
                            <span class="fraction-numerator">G</span><br>
                            <span>Y</span>
                        </div>
                    = 
                        <div class ="fraction">
                            <span class="fraction-numerator">${G}S</span><br>
                            <span>${Y}S</span>
                        </div>
                    = ${formatWithPrefix(parseInput(G) / parseInput(Y), "")}<br>`;
			}
			if (Ir && I) {
				result_Serie_AC += `
                        Wirkfaktor cos(&phi;) =
                        <div class ="fraction">
                            <span class="fraction-numerator">I<sub>R</sub></span><br>
                            <span>I</span>
                        </div>
                    = 
                        <div class ="fraction">
                            <span class="fraction-numerator">${Ir}A</span><br>
                            <span>${I}A</span>
                        </div>
                    = ${formatWithPrefix(parseInput(Ir) / parseInput(I), "")}<br>`;
			}
		}
		if (!sinphi) {
			if (Bc && Y) {
				result_Serie_AC += `
                        Blindfaktor sin(&phi;) =
                        <div class ="fraction">
                            <span class="fraction-numerator">B<sub>C</sub></span><br>
                            <span>Y</span>
                        </div>
                    = 
                        <div class ="fraction">
                            <span class="fraction-numerator">${Bc}S</span><br>
                            <span>${Y}S</span>
                        </div>
                    = ${formatWithPrefix(parseInput(Bc) / parseInput(Y), "")}<br>`;
			}
			if (Ir && I) {
				result_Serie_AC += `
                        Blindfaktor sin(&phi;) =
                        <div class ="fraction">
                            <span class="fraction-numerator">I<sub>C</sub></span><br>
                            <span>I</span>
                        </div>
                    = 
                        <div class ="fraction">
                            <span class="fraction-numerator">${Ic}A</span><br>
                            <span>${I}A</span>
                        </div>
                    = ${formatWithPrefix(parseInput(Ic) / parseInput(I), "")}<br>`;
			}
		}
		setHTML(document.getElementById("result_Parallel_AC"), result_Parallel_AC);
		drawStromdreieckParallel(
			parseInput(Ir),
			parseInput(Ic),
			parseInput(I),
			"phasorCanvasCurrent",
			"phasorLegendCurrent",
		);
		drawLeitwertdreieckParallel(
			parseInput(G),
			parseInput(Bc),
			parseInput(Y),
			"phasorCanvasAdmittance",
			"phasorLegendAdmittance",
		);
	}
	function calculateRC() {
		let result_RC = ``;
		const get = (id) => parseInput(document.getElementById(id)?.value);
		const isDischarging = document.getElementById("modeSwitch").checked;
		const I = get("I_RC");
		const It = get("It_RC");
		const tau = get("tau_RC");
		const R = get("R_RC");
		const C = get("C_RC");
		const U = get("U_RC");
		const Ut = get("Ut_RC");
		const t = get("t_RC");
		const frac = (num, den) =>
			`<div class="fraction"><span>${num}</span><br><span class="fraction-denumerator">${den}</span></div>`;
		if (!tau && R && C) {
			result_RC += `
                    Zeitkonstante &#120649; = R &lowast; C = 
                    ${R}&Omega; &lowast; ${C}F = 
                    ${formatWithPrefix(R * C, "s")}<br>`;
		}
		if (!isDischarging) {
			if (!I && tau && t && It) {
				result_RC += `
                        Strom I = ${frac("i(t)", `e<sup>-${frac("t", "&#120649;")}</sup>`)} = 
                        ${frac(`${It}A`, `e<sup>-${frac(`${t}s`, `${tau}s`)}</sup>`)} = 
                        ${formatWithPrefix(It / Math.exp(-t / tau), "A")}<br>`;
			}
			if (!It && I && t && tau) {
				result_RC += `
                        Strom i(t) = I &lowast; e<sup>-${frac("t", "&#120649;")}</sup> = 
                        ${I}A &lowast; e<sup>-${frac(`${t}s`, `${tau}s`)}</sup> = 
                        ${formatWithPrefix(I * Math.exp(-t / tau), "A")}<br>`;
			}
			if (!tau && I && It && t) {
				result_RC += `
                        Zeitkonstante &#120649; = -${frac("t", `ln(${frac("i(t)", "I")})`)} = 
                        -${frac(`${t}s`, `ln(${frac(`${It}A`, `${I}A`)})`)} = 
                        ${formatWithPrefix(-t / Math.log(It / I), "s")}<br>`;
			}
			if (!tau && U && Ut && t) {
				result_RC += `
                        Zeitkonstante &#120649; = ${frac("-t", `ln(1 - ${frac("u(t)", "U")})`)} = 
                        ${frac(`-${t}s`, `ln(1 - ${frac(`${Ut}V`, `${U}V`)})`)} = 
                        ${formatWithPrefix(-t / Math.log(1 - Ut / U), "s")}<br>`;
			}
			if (!U && tau && t && Ut) {
				result_RC += `
                        Spannung U = ${frac("u(t)", `1 - e<sup>-${frac("t", "&#120649;")}</sup>`)} = 
                        ${frac(`${Ut}V`, `1 - e<sup>-${frac(`${t}s`, `${tau}s`)}</sup>`)} = 
                        ${formatWithPrefix(Ut / (1 - Math.exp(-t / tau)), "V")}<br>`;
			}
			if (!Ut && U && t && tau) {
				result_RC += `
                        Spannung u(t) = U &lowast; (1 - e<sup>-${frac("t", "&#120649;")}</sup>) = 
                        ${U}V &lowast; (1 - e<sup>-${frac(`${t}s`, `${tau}s`)}</sup>) = 
                        ${formatWithPrefix(U * (1 - Math.exp(-t / tau)), "V")}<br>`;
			}
			if (!t && tau && U && Ut) {
				result_RC += `
                        Zeit t = -&#120649; &lowast; ln(1 - ${frac("u(t)", "U")}) = 
                        -${tau}s &lowast; ln(1 - ${frac(`${Ut}V`, `${U}V`)}) = 
                        ${formatWithPrefix(-tau * Math.log(1 - Ut / U), "s")}<br>`;
			}
			if (!t && tau && I && It) {
				result_RC += `
                        Zeit t = -&#120649; &lowast; ln(${frac("i(t)", "I")}) = 
                        -${tau}s &lowast; ln(${frac(`${It}A`, `${I}A`)}) = 
                        ${formatWithPrefix(-tau * Math.log(It / I), "s")}<br>`;
			}
		} else {
			if (!I && tau && t && It) {
				result_RC += `
                        Strom I = -${frac("i(t)", `e<sup>-${frac("t", "&#120649;")}</sup>`)} = 
                        -${frac(`${It}A`, `e<sup>-${frac(`${t}s`, `${tau}s`)}</sup>`)} = 
                        ${formatWithPrefix(-It / Math.exp(-t / tau), "A")}<br>`;
			}
			if (!It && I && t && tau) {
				result_RC += `
                        Strom i(t) = -I &lowast; e<sup>-${frac("t", "&#120649;")}</sup> = 
                        -${I}A &lowast; e<sup>-${frac(`${t}s`, `${tau}s`)}</sup> = 
                        ${formatWithPrefix(-I * Math.exp(-t / tau), "A")}<br>`;
			}
			if (!tau && I && It && t) {
				result_RC += `
                        Zeitkonstante &#120649; = ${frac("t", `ln(${frac("i(t)", "I")})`)} = 
                        ${frac(`${t}s`, `ln(${frac(`${It}A`, `${I}A`)})`)} = 
                        ${formatWithPrefix(t / Math.log(It / I), "s")}<br>`;
			}
			if (!tau && U && Ut && t) {
				result_RC += `
                        Zeitkonstante &#120649; = -${frac("t", `ln(${frac("u(t)", "U")})`)} = 
                        -${frac(`${t}s`, `ln(${frac(`${Ut}V`, `${U}V`)})`)} = 
                        ${formatWithPrefix(-t / Math.log(Ut / U), "s")}<br>`;
			}
			if (!U && tau && t && Ut) {
				result_RC += `
                        Spannung U = ${frac("u(t)", `e<sup>-${frac("t", "&#120649;")}</sup>`)} = 
                        ${frac(`${Ut}V`, `e<sup>-${frac(`${t}s`, `${tau}s`)}</sup>`)} = 
                        ${formatWithPrefix(Ut / Math.exp(-t / tau), "V")}<br>`;
			}
			if (!Ut && U && t && tau) {
				result_RC += `
                        Spannung u(t) = U &lowast; e<sup>-${frac("t", "&#120649;")}</sup> = 
                        ${U}V &lowast; e<sup>-${frac(`${t}s`, `${tau}s`)}</sup> = 
                        ${formatWithPrefix(U * Math.exp(-t / tau), "V")}<br>`;
			}
			if (!t && tau && I && It) {
				result_RC += `
                        Zeit t = &#120649; &lowast; ln(${frac("i(t)", "I")}) = 
                        ${tau}s &lowast; ln(${frac(`${It}A`, `${I}A`)}) = 
                        ${formatWithPrefix(tau * Math.log(It / I), "s")}<br>`;
			}
			if (!t && tau && U && Ut) {
				result_RC += `
                        Zeit t = -&#120649; &lowast; ln(${frac("u(t)", "U")}) = 
                        -${tau}s &lowast; ln(${frac(`${Ut}V`, `${U}V`)}) = 
                        ${formatWithPrefix(-tau * Math.log(Ut / U), "s")}<br>`;
			}
		}
		setHTML(document.getElementById("result_RC"), result_RC);
		generate_e_curve_from_RCinputs();
	}
	let phasorHoveredKey = null;
	const watermarkLogo = new Image();
	watermarkLogo.src = "/Pictures/favicon_no_BG.svg";
	let watermarkLoaded = false;
	watermarkLogo.onload = function () {
		watermarkLoaded = true;
	};
	function generate_e_curve_from_RCinputs() {
		const R = parseInput(document.getElementById("R_RC").value) || 1000;
		const C = parseInput(document.getElementById("C_RC").value) || 0.000001;
		const U = parseInput(document.getElementById("U_RC").value) || 1;
		const tMarker = parseInput(document.getElementById("t_RC").value);
		const isDischarging = document.getElementById("modeSwitch").checked;
		const tau = R * C;
		const maxTime = 5 * tau;
		const stepCount = 100;
		const I = U / R;
		drawCurveDynamic(
			"voltageCanvas",
			(t) =>
				isDischarging ? U * Math.exp(-t / tau) : U * (1 - Math.exp(-t / tau)),
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
			(t) => (isDischarging ? -I * Math.exp(-t / tau) : I * Math.exp(-t / tau)),
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
	function showCanvasWarning(canvasId, message) {
		const canvas = document.getElementById(canvasId);
		if (!canvas) return;
	}
	function drawLeitwertdreieckParallel(
		G,
		Bc,
		Y,
		canvasId = "phasorCanvasAdmittance",
		legendId = "phasorLegendAdmittance",
		isExample = false,
		missing = [],
	) {
		const canvas = document.getElementById(canvasId);
		const legendDiv = document.getElementById(legendId);
		if (!canvas || !legendDiv) return;
		const ctx = canvas.getContext("2d");
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		if (!isFinite(G) || G <= 0) missing.push("G");
		if (!isFinite(Bc) || Bc <= 0) missing.push("Bc");
		if (!isFinite(Y) || Y <= 0) missing.push("Y");
		if (missing.length > 0) {
			G = 0.2;
			Bc = 0.15;
			Y = 0.25;
			isExample = true;
		}
		{
			if (
				!isFinite(G) ||
				!isFinite(Bc) ||
				!isFinite(Y) ||
				typeof G !== "number" ||
				typeof Bc !== "number" ||
				typeof Y !== "number" ||
				G <= 0 ||
				Bc <= 0 ||
				Y <= 0
			) {
				ctx.save();
				ctx.fillStyle = "#e66";
				ctx.font = "bold 22px sans-serif";
				ctx.textAlign = "center";
				ctx.fillText(
					"Values do not form a valid triangle!",
					canvas.width / 2,
					canvas.height / 2,
				);
				ctx.restore();
				setHTML(legendDiv, "");
				return;
			}
			const pythagoras = Math.abs(Y * Y - (G * G + Bc * Bc));
			if (pythagoras > 1e-6 * (G * G + Bc * Bc + Y * Y)) {
				ctx.save();
				ctx.fillStyle = "#e66";
				ctx.font = "bold 22px sans-serif";
				ctx.textAlign = "center";
				ctx.fillText(
					"Values do not form a valid triangle!",
					canvas.width / 2,
					canvas.height / 2,
				);
				ctx.restore();
				setHTML(legendDiv, "");
				return;
			}
			const sides = [G, Bc, Y].map(Math.abs);
			const minSide = Math.min(...sides);
			const maxSide = Math.max(...sides);
			if (minSide / maxSide < 0.01) {
				ctx.save();
				ctx.fillStyle = "#e66";
				ctx.font = "bold 22px sans-serif";
				ctx.textAlign = "center";
				ctx.fillText(
					"Triangle is too sharp or too flat!",
					canvas.width / 2,
					canvas.height / 2,
				);
				ctx.restore();
				setHTML(legendDiv, "");
				return;
			}
			const phi = Math.atan2(Bc, G);
			const phiDeg = (phi * 180) / Math.PI;
			if (Math.abs(phiDeg) < 1 || Math.abs(phiDeg) > 89) {
				ctx.save();
				ctx.fillStyle = "#e66";
				ctx.font = "bold 22px sans-serif";
				ctx.textAlign = "center";
				ctx.fillText(
					"Angle is too small or too large for a valid triangle!",
					canvas.width / 2,
					canvas.height / 2,
				);
				ctx.restore();
				setHTML(legendDiv, "");
				return;
			}
		}
		const marginLeft = 80;
		const marginTop = 80;
		const marginRight = 80;
		const marginBottom = 80;
		const plotWidth = canvas.width - marginLeft - marginRight;
		const plotHeight = canvas.height - marginTop - marginBottom;
		const scale =
			0.95 * Math.min(plotWidth / Math.abs(G), plotHeight / Math.abs(Bc));
		const cx = marginLeft;
		const cy = marginTop;
		const hitboxes = [];
		ctx.save();
		ctx.strokeStyle = "#ccc";
		ctx.lineWidth = 2;
		ctx.setLineDash([6, 6]);
		ctx.beginPath();
		ctx.moveTo(0, cy);
		ctx.lineTo(canvas.width, cy);
		ctx.stroke();
		ctx.beginPath();
		ctx.moveTo(cx, 0);
		ctx.lineTo(cx, canvas.height);
		ctx.stroke();
		ctx.setLineDash([]);
		ctx.font = "bold 20px Arial";
		ctx.fillStyle = "#fff";
		ctx.textAlign = "right";
		ctx.fillText("x", canvas.width - 10, cy - 10);
		ctx.textAlign = "left";
		ctx.fillText("y", cx + 10, 24);
		ctx.restore();
		const colorG = "#00C000";
		const colorBc = "#00FF80";
		const colorY = "#008040";
		const colorPhi = "#FFFFFF";
		drawArrow(
			ctx,
			cx,
			cy,
			cx + G * scale,
			cy,
			colorG,
			phasorHoveredKey === "G" ? 6 : 3,
			phasorHoveredKey === "G",
		);
		hitboxes.push({
			type: "vector",
			key: "G",
			x1: cx,
			y1: cy,
			x2: cx + G * scale,
			y2: cy,
		});
		drawArrow(
			ctx,
			cx + G * scale,
			cy,
			cx + G * scale,
			cy + Bc * scale,
			colorBc,
			phasorHoveredKey === "Bc" ? 6 : 3,
			phasorHoveredKey === "Bc",
		);
		hitboxes.push({
			type: "vector",
			key: "Bc",
			x1: cx + G * scale,
			y1: cy,
			x2: cx + G * scale,
			y2: cy + Bc * scale,
		});
		drawArrow(
			ctx,
			cx,
			cy,
			cx + G * scale,
			cy + Bc * scale,
			colorY,
			phasorHoveredKey === "Y" ? 6 : 3,
			phasorHoveredKey === "Y",
		);
		hitboxes.push({
			type: "vector",
			key: "Y",
			x1: cx,
			y1: cy,
			x2: cx + G * scale,
			y2: cy + Bc * scale,
		});
		drawRightAngleMarker(ctx, cx + G * scale, cy, 1, 1);
		const phi = Math.atan2(Bc, G);
		ctx.save();
		ctx.strokeStyle = phasorHoveredKey === "phi" ? colorPhi : "#fff";
		ctx.lineWidth = phasorHoveredKey === "phi" ? 4 : 2;
		ctx.beginPath();
		ctx.arc(cx, cy, 36, 0, phi, false);
		ctx.stroke();
		hitboxes.push({
			type: "arc",
			key: "phi",
			cx,
			cy,
			r: 36,
			angle: phi,
		});
		ctx.restore();
		ctx.fillStyle = "#fff";
		ctx.beginPath();
		ctx.arc(cx, cy, 4, 0, 2 * Math.PI);
		ctx.fill();
		const phiDeg = (phi * 180) / Math.PI;
		const legend = [
			{
				key: "G",
				label: `G = ${formatSI(G, "S")}`,
				color: colorG,
			},
			{
				key: "Bc",
				label: `B<sub>C</sub> = ${formatSI(Bc, "S")}`,
				color: colorBc,
			},
			{
				key: "Y",
				label: `Y = ${formatSI(Y, "S")}`,
				color: colorY,
			},
			{
				key: "phi",
				label: `&phi; = ${phiDeg.toFixed(2)}°`,
				color: colorPhi,
			},
		];
		setHTML(
			legendDiv,
			(isExample
				? `<i style='color:#aaa'>
                        Beispiel-Dreieck:<br>
                        Bitte oben Werte eingeben und auf <b>Berechnen</b>!<br>
                        Fehlend/ungültig: <b>${missing.join(", ")}</b>
                    </i><br><br>`
				: "") +
				legend
					.map(
						(entry) =>
							`<div data-key="${entry.key}" style="color:${entry.color};transition:background 0.2s;">${entry.label}</div>`,
					)
					.join(""),
		);
		canvas.onmousemove = function (e) {
			const rect = canvas.getBoundingClientRect();
			const scaleX = canvas.width / rect.width;
			const scaleY = canvas.height / rect.height;
			const mx = (e.clientX - rect.left) * scaleX;
			const my = (e.clientY - rect.top) * scaleY;
			let found = null;
			for (const h of hitboxes) {
				if (h.type === "vector") {
					const dist = pointToSegment(mx, my, h.x1, h.y1, h.x2, h.y2);
					if (dist < 5) {
						found = h.key;
						break;
					}
				} else if (h.type === "arc") {
					const dx = mx - h.cx,
						dy = my - h.cy;
					const r = Math.sqrt(dx * dx + dy * dy);
					let a = Math.atan2(dy, dx);
					if (a < 0) a += 2 * Math.PI;
					let start = 0;
					let end = h.angle;
					if (end < 0) end += 2 * Math.PI;
					let inArc = false;
					if (start <= end) {
						inArc = a >= start && a <= end;
					} else {
						inArc = a >= start || a <= end;
					}
					if (Math.abs(r - h.r) < 10 && inArc) {
						found = h.key;
						break;
					}
				}
			}
			phasorHoveredKey = found;
			drawLeitwertdreieckParallel(
				G,
				Bc,
				Y,
				canvasId,
				legendId,
				isExample,
				missing,
			);
			for (const div of legendDiv.children) {
				if (div.dataset.key === found) {
					div.style.background = "#444";
					div.style.fontWeight = "bold";
				} else {
					div.style.background = "";
					div.style.fontWeight = "";
				}
			}
		};
		canvas.onmouseleave = function () {
			phasorHoveredKey = null;
			drawLeitwertdreieckParallel(
				G,
				Bc,
				Y,
				canvasId,
				legendId,
				isExample,
				missing,
			);
			for (const div of legendDiv.children) {
				div.style.background = "";
				div.style.fontWeight = "";
			}
		};
		for (const div of legendDiv.children) {
			div.onmouseenter = function () {
				phasorHoveredKey = this.dataset.key;
				drawLeitwertdreieckParallel(
					G,
					Bc,
					Y,
					canvasId,
					legendId,
					isExample,
					missing,
				);
				for (const d of legendDiv.children) {
					d.style.background = d === this ? "#444" : "";
					d.style.fontWeight = d === this ? "bold" : "";
				}
			};
			div.onmouseleave = function () {
				phasorHoveredKey = null;
				drawLeitwertdreieckParallel(
					G,
					Bc,
					Y,
					canvasId,
					legendId,
					isExample,
					missing,
				);
				for (const d of legendDiv.children) {
					d.style.background = "";
					d.style.fontWeight = "";
				}
			};
		}
		const downloadIconArea = drawDownloadIcon(ctx, canvas);
		if (!canvas._downloadHandlerAdded) {
			canvas.addEventListener("click", function (e) {
				const rect = canvas.getBoundingClientRect();
				const scaleX = canvas.width / rect.width;
				const scaleY = canvas.height / rect.height;
				const mx = (e.clientX - rect.left) * scaleX;
				const my = (e.clientY - rect.top) * scaleY;
				if (
					mx >= downloadIconArea.x &&
					mx <= downloadIconArea.x + downloadIconArea.size &&
					my >= downloadIconArea.y &&
					my <= downloadIconArea.y + downloadIconArea.size
				) {
					exportCanvasAsPNG(canvas.id);
				}
			});
			canvas._downloadHandlerAdded = true;
		}
		drawWatermark(ctx, canvas);
	}
	function drawStromdreieckParallel(
		Ir,
		Ic,
		I,
		canvasId = "phasorCanvasCurrent",
		legendId = "phasorLegendCurrent",
		isExample = false,
		missing = [],
	) {
		const canvas = document.getElementById(canvasId);
		const legendDiv = document.getElementById(legendId);
		if (!canvas || !legendDiv) return;
		const ctx = canvas.getContext("2d");
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		if (!isFinite(Ir) || Ir <= 0) missing.push("I_R");
		if (!isFinite(Ic) || Ic <= 0) missing.push("I_C");
		if (!isFinite(I) || I <= 0) missing.push("I");
		if (missing.length > 0) {
			Ir = 2.0;
			Ic = 1.5;
			I = 2.5;
			isExample = true;
		}
		{
			if (
				!isFinite(Ir) ||
				!isFinite(Ic) ||
				!isFinite(I) ||
				typeof Ir !== "number" ||
				typeof Ic !== "number" ||
				typeof I !== "number" ||
				Ir <= 0 ||
				Ic <= 0 ||
				I <= 0
			) {
				ctx.save();
				ctx.fillStyle = "#e66";
				ctx.font = "bold 22px sans-serif";
				ctx.textAlign = "center";
				ctx.fillText(
					"Values do not form a valid triangle!",
					canvas.width / 2,
					canvas.height / 2,
				);
				ctx.restore();
				setHTML(legendDiv, "");
				return;
			}
			const pythagoras = Math.abs(I * I - (Ir * Ir + Ic * Ic));
			if (pythagoras > 1e-6 * (Ir * Ir + Ic * Ic + I * I)) {
				ctx.save();
				ctx.fillStyle = "#e66";
				ctx.font = "bold 22px sans-serif";
				ctx.textAlign = "center";
				ctx.fillText(
					"Values do not form a valid triangle!",
					canvas.width / 2,
					canvas.height / 2,
				);
				ctx.restore();
				setHTML(legendDiv, "");
				return;
			}
			const sides = [Ir, Ic, I].map(Math.abs);
			const minSide = Math.min(...sides);
			const maxSide = Math.max(...sides);
			if (minSide / maxSide < 0.01) {
				ctx.save();
				ctx.fillStyle = "#e66";
				ctx.font = "bold 22px sans-serif";
				ctx.textAlign = "center";
				ctx.fillText(
					"Triangle is too sharp or too flat!",
					canvas.width / 2,
					canvas.height / 2,
				);
				ctx.restore();
				setHTML(legendDiv, "");
				return;
			}
			const phi = Math.atan2(Ic, Ir);
			const phiDeg = (phi * 180) / Math.PI;
			if (Math.abs(phiDeg) < 1 || Math.abs(phiDeg) > 89) {
				ctx.save();
				ctx.fillStyle = "#e66";
				ctx.font = "bold 22px sans-serif";
				ctx.textAlign = "center";
				ctx.fillText(
					"Angle is too small or too large for a valid triangle!",
					canvas.width / 2,
					canvas.height / 2,
				);
				ctx.restore();
				setHTML(legendDiv, "");
				return;
			}
		}
		const marginLeft = 80;
		const marginTop = 80;
		const marginRight = 80;
		const marginBottom = 80;
		const plotWidth = canvas.width - marginLeft - marginRight;
		const plotHeight = canvas.height - marginTop - marginBottom;
		const scale =
			0.95 * Math.min(plotWidth / Math.abs(Ir), plotHeight / Math.abs(Ic));
		const cx = marginLeft;
		const cy = marginTop;
		const hitboxes = [];
		ctx.save();
		ctx.strokeStyle = "#ccc";
		ctx.lineWidth = 2;
		ctx.setLineDash([6, 6]);
		ctx.beginPath();
		ctx.moveTo(0, cy);
		ctx.lineTo(canvas.width, cy);
		ctx.stroke();
		ctx.beginPath();
		ctx.moveTo(cx, 0);
		ctx.lineTo(cx, canvas.height);
		ctx.stroke();
		ctx.setLineDash([]);
		ctx.font = "bold 20px Arial";
		ctx.fillStyle = "#fff";
		ctx.textAlign = "right";
		ctx.fillText("x", canvas.width - 10, cy - 10);
		ctx.textAlign = "left";
		ctx.fillText("y", cx + 10, 24);
		ctx.restore();
		const colorIr = "#0070C0";
		const colorIc = "#00C080";
		const colorI = "#A0A0FF";
		const colorPhi = "#FFFFFF";
		drawArrow(
			ctx,
			cx,
			cy,
			cx + Ir * scale,
			cy,
			colorIr,
			phasorHoveredKey === "Ir" ? 6 : 3,
			phasorHoveredKey === "Ir",
		);
		hitboxes.push({
			type: "vector",
			key: "Ir",
			x1: cx,
			y1: cy,
			x2: cx + Ir * scale,
			y2: cy,
		});
		drawArrow(
			ctx,
			cx + Ir * scale,
			cy,
			cx + Ir * scale,
			cy + Ic * scale,
			colorIc,
			phasorHoveredKey === "Ic" ? 6 : 3,
			phasorHoveredKey === "Ic",
		);
		hitboxes.push({
			type: "vector",
			key: "Ic",
			x1: cx + Ir * scale,
			y1: cy,
			x2: cx + Ir * scale,
			y2: cy + Ic * scale,
		});
		drawArrow(
			ctx,
			cx,
			cy,
			cx + Ir * scale,
			cy + Ic * scale,
			colorI,
			phasorHoveredKey === "I" ? 6 : 3,
			phasorHoveredKey === "I",
		);
		hitboxes.push({
			type: "vector",
			key: "I",
			x1: cx,
			y1: cy,
			x2: cx + Ir * scale,
			y2: cy + Ic * scale,
		});
		drawRightAngleMarker(ctx, cx + Ir * scale, cy, 1, 1);
		const phi = Math.atan2(Ic, Ir);
		ctx.save();
		ctx.strokeStyle = phasorHoveredKey === "phi" ? colorPhi : "#fff";
		ctx.lineWidth = phasorHoveredKey === "phi" ? 4 : 2;
		ctx.beginPath();
		ctx.arc(cx, cy, 36, 0, phi, false);
		ctx.stroke();
		hitboxes.push({
			type: "arc",
			key: "phi",
			cx,
			cy,
			r: 36,
			angle: phi,
		});
		ctx.restore();
		ctx.fillStyle = "#fff";
		ctx.beginPath();
		ctx.arc(cx, cy, 4, 0, 2 * Math.PI);
		ctx.fill();
		const phiDeg = (phi * 180) / Math.PI;
		const legend = [
			{
				key: "Ir",
				label: `I<sub>R</sub> = ${formatSI(Ir, "A")}`,
				color: colorIr,
			},
			{
				key: "Ic",
				label: `I<sub>C</sub> = ${formatSI(Ic, "A")}`,
				color: colorIc,
			},
			{
				key: "I",
				label: `I = ${formatSI(I, "A")}`,
				color: colorI,
			},
			{
				key: "phi",
				label: `&phi; = ${phiDeg.toFixed(2)}°`,
				color: colorPhi,
			},
		];
		setHTML(
			legendDiv,
			(isExample
				? `<i style='color:#aaa'>
                        Beispiel-Dreieck:<br>
                        Bitte oben Werte eingeben und auf <b>Berechnen</b>!<br>
                        Fehlend/ungültig: <b>${missing.join(", ")}</b>
                    </i><br><br>`
				: "") +
				legend
					.map(
						(entry) =>
							`<div data-key="${entry.key}" style="color:${entry.color};transition:background 0.2s;">${entry.label}</div>`,
					)
					.join(""),
		);
		canvas.onmousemove = function (e) {
			const rect = canvas.getBoundingClientRect();
			const scaleX = canvas.width / rect.width;
			const scaleY = canvas.height / rect.height;
			const mx = (e.clientX - rect.left) * scaleX;
			const my = (e.clientY - rect.top) * scaleY;
			let found = null;
			for (const h of hitboxes) {
				if (h.type === "vector") {
					const dist = pointToSegment(mx, my, h.x1, h.y1, h.x2, h.y2);
					if (dist < 5) {
						found = h.key;
						break;
					}
				} else if (h.type === "arc") {
					const dx = mx - h.cx,
						dy = my - h.cy;
					const r = Math.sqrt(dx * dx + dy * dy);
					let a = Math.atan2(dy, dx);
					if (a < 0) a += 2 * Math.PI;
					let start = 0;
					let end = h.angle;
					if (end < 0) end += 2 * Math.PI;
					let inArc = false;
					if (start <= end) {
						inArc = a >= start && a <= end;
					} else {
						inArc = a >= start || a <= end;
					}
					if (Math.abs(r - h.r) < 10 && inArc) {
						found = h.key;
						break;
					}
				}
			}
			phasorHoveredKey = found;
			drawStromdreieckParallel(
				Ir,
				Ic,
				I,
				canvasId,
				legendId,
				isExample,
				missing,
			);
			for (const div of legendDiv.children) {
				if (div.dataset.key === found) {
					div.style.background = "#444";
					div.style.fontWeight = "bold";
				} else {
					div.style.background = "";
					div.style.fontWeight = "";
				}
			}
		};
		canvas.onmouseleave = function () {
			phasorHoveredKey = null;
			drawStromdreieckParallel(
				Ir,
				Ic,
				I,
				canvasId,
				legendId,
				isExample,
				missing,
			);
			for (const div of legendDiv.children) {
				div.style.background = "";
				div.style.fontWeight = "";
			}
		};
		for (const div of legendDiv.children) {
			div.onmouseenter = function () {
				phasorHoveredKey = this.dataset.key;
				drawStromdreieckParallel(
					Ir,
					Ic,
					I,
					canvasId,
					legendId,
					isExample,
					missing,
				);
				for (const d of legendDiv.children) {
					d.style.background = d === this ? "#444" : "";
					d.style.fontWeight = d === this ? "bold" : "";
				}
			};
			div.onmouseleave = function () {
				phasorHoveredKey = null;
				drawStromdreieckParallel(
					Ir,
					Ic,
					I,
					canvasId,
					legendId,
					isExample,
					missing,
				);
				for (const d of legendDiv.children) {
					d.style.background = "";
					d.style.fontWeight = "";
				}
			};
		}
		const downloadIconArea = drawDownloadIcon(ctx, canvas);
		if (!canvas._downloadHandlerAdded) {
			canvas.addEventListener("click", function (e) {
				const rect = canvas.getBoundingClientRect();
				const scaleX = canvas.width / rect.width;
				const scaleY = canvas.height / rect.height;
				const mx = (e.clientX - rect.left) * scaleX;
				const my = (e.clientY - rect.top) * scaleY;
				if (
					mx >= downloadIconArea.x &&
					mx <= downloadIconArea.x + downloadIconArea.size &&
					my >= downloadIconArea.y &&
					my <= downloadIconArea.y + downloadIconArea.size
				) {
					exportCanvasAsPNG(canvas.id);
				}
			});
			canvas._downloadHandlerAdded = true;
		}
		drawWatermark(ctx, canvas);
	}
	function drawWiderstandsdreieckSerie(
		canvasId = "phasorCanvasImpedance",
		legendId = "phasorLegendImpedance",
	) {
		const canvas = document.getElementById(canvasId);
		const legendDiv = document.getElementById(legendId);
		if (!canvas || !legendDiv) return;
		const ctx = canvas.getContext("2d");
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		let R = parseInput(document.getElementById("R_AC")?.value);
		let C = parseInput(document.getElementById("C_AC")?.value);
		let f = parseInput(document.getElementById("f_AC")?.value);
		let Xc = null,
			Z = null;
		if (document.getElementById("Xc_AC")) {
			Xc = parseInput(document.getElementById("Xc_AC").value);
		}
		if (document.getElementById("Z_AC")) {
			Z = parseInput(document.getElementById("Z_AC").value);
		}
		if (!Xc && C && f) Xc = 1 / (2 * Math.PI * f * C);
		if (!Z && R && Xc) Z = Math.sqrt(R * R + Xc * Xc);
		if (!R && Z && Xc) R = Math.sqrt(Z * Z - Xc * Xc);
		if (!Xc && Z && R) Xc = Math.sqrt(Z * Z - R * R);
		let isExample = false;
		let missing = [];
		if (!isFinite(R) || R <= 0) missing.push("R");
		if (!isFinite(Xc) || Xc <= 0) missing.push("Xc");
		if (!isFinite(Z) || Z <= 0) missing.push("Z");
		if (missing.length > 0) {
			R = 4;
			Xc = 3;
			Z = 5;
			isExample = true;
		}
		{
			if (
				!isFinite(R) ||
				!isFinite(Xc) ||
				!isFinite(Z) ||
				typeof R !== "number" ||
				typeof Xc !== "number" ||
				typeof Z !== "number" ||
				R <= 0 ||
				Xc <= 0 ||
				Z <= 0
			) {
				ctx.save();
				ctx.fillStyle = "#e66";
				ctx.font = "bold 22px sans-serif";
				ctx.textAlign = "center";
				ctx.fillText(
					"Werte ergeben kein sinnvolles Dreieck!",
					canvas.width / 2,
					canvas.height / 2,
				);
				ctx.restore();
				setHTML(legendDiv, "");
				return;
			}
			const pythagoras = Math.abs(Z * Z - (R * R + Xc * Xc));
			if (pythagoras > 1e-6 * (R * R + Xc * Xc + Z * Z)) {
				ctx.save();
				ctx.fillStyle = "#e66";
				ctx.font = "bold 22px sans-serif";
				ctx.textAlign = "center";
				ctx.fillText(
					"Werte ergeben kein sinnvolles Dreieck!",
					canvas.width / 2,
					canvas.height / 2,
				);
				ctx.restore();
				setHTML(legendDiv, "");
				return;
			}
			const sides = [R, Xc, Z].map(Math.abs);
			const minSide = Math.min(...sides);
			const maxSide = Math.max(...sides);
			if (minSide / maxSide < 0.01) {
				ctx.save();
				ctx.fillStyle = "#e66";
				ctx.font = "bold 22px sans-serif";
				ctx.textAlign = "center";
				ctx.fillText(
					"Dreieck ist zu spitz oder zu flach!",
					canvas.width / 2,
					canvas.height / 2,
				);
				ctx.restore();
				setHTML(legendDiv, "");
				return;
			}
			const phi = Math.atan2(Xc, R);
			const phiDeg = (phi * 180) / Math.PI;
			if (Math.abs(phiDeg) < 1 || Math.abs(phiDeg) > 89) {
				ctx.save();
				ctx.fillStyle = "#e66";
				ctx.font = "bold 22px sans-serif";
				ctx.textAlign = "center";
				ctx.fillText(
					"Winkel ist zu klein oder zu groß für ein sinnvolles Dreieck!",
					canvas.width / 2,
					canvas.height / 2,
				);
				ctx.restore();
				setHTML(legendDiv, "");
				return;
			}
		}
		const marginLeft = 80;
		const marginTop = 80;
		const plotWidth = canvas.width - marginLeft - 80;
		const plotHeight = canvas.height - marginTop - 80;
		const maxSide = Math.max(Math.abs(R), Math.abs(Xc), Math.abs(Z));
		const scale = 0.9 * Math.min(plotWidth / R, plotHeight / Xc);
		const cx = marginLeft;
		const cy = marginTop;
		const hitboxes = [];
		ctx.save();
		ctx.strokeStyle = "#ccc";
		ctx.lineWidth = 2;
		ctx.setLineDash([6, 6]);
		ctx.beginPath();
		ctx.moveTo(0, cy);
		ctx.lineTo(canvas.width, cy);
		ctx.stroke();
		ctx.beginPath();
		ctx.moveTo(cx, 0);
		ctx.lineTo(cx, canvas.height);
		ctx.stroke();
		ctx.setLineDash([]);
		ctx.font = "bold 20px Arial";
		ctx.fillStyle = "#fff";
		ctx.textAlign = "right";
		ctx.fillText("x", canvas.width - 10, cy - 10);
		ctx.textAlign = "left";
		ctx.fillText("y", cx + 10, 24);
		ctx.restore();
		const colorR = "#FF9515";
		const colorXc = "#ffb029";
		const colorZ = "#e15e00";
		const colorPhi = "#FFFFFF";
		drawArrow(
			ctx,
			cx,
			cy,
			cx + R * scale,
			cy,
			colorR,
			phasorHoveredKey === "R" ? 6 : 3,
			phasorHoveredKey === "R",
		);
		hitboxes.push({
			type: "vector",
			key: "R",
			x1: cx,
			y1: cy,
			x2: cx + R * scale,
			y2: cy,
		});
		drawArrow(
			ctx,
			cx + R * scale,
			cy,
			cx + R * scale,
			cy + Xc * scale,
			colorXc,
			phasorHoveredKey === "Xc" ? 6 : 3,
			phasorHoveredKey === "Xc",
		);
		hitboxes.push({
			type: "vector",
			key: "Xc",
			x1: cx + R * scale,
			y1: cy,
			x2: cx + R * scale,
			y2: cy + Xc * scale,
		});
		drawArrow(
			ctx,
			cx,
			cy,
			cx + R * scale,
			cy + Xc * scale,
			colorZ,
			phasorHoveredKey === "Z" ? 6 : 3,
			phasorHoveredKey === "Z",
		);
		hitboxes.push({
			type: "vector",
			key: "Z",
			x1: cx,
			y1: cy,
			x2: cx + R * scale,
			y2: cy + Xc * scale,
		});
		drawRightAngleMarker(ctx, cx + R * scale, cy, 1, 1);
		const phi = Math.atan2(Xc, R);
		ctx.save();
		ctx.strokeStyle = phasorHoveredKey === "phi" ? colorPhi : "#fff";
		ctx.lineWidth = phasorHoveredKey === "phi" ? 4 : 2;
		ctx.beginPath();
		ctx.arc(cx, cy, 36, 0, phi, false);
		ctx.stroke();
		hitboxes.push({
			type: "arc",
			key: "phi",
			cx,
			cy,
			r: 36,
			angle: phi,
		});
		ctx.restore();
		ctx.fillStyle = "#fff";
		ctx.beginPath();
		ctx.arc(cx, cy, 4, 0, 2 * Math.PI);
		ctx.fill();
		const phiDeg = (-phi * 180) / Math.PI;
		const legend = [
			{
				key: "R",
				label: `R = ${formatSI(R, "Ω")}`,
				color: colorR,
			},
			{
				key: "Xc",
				label: `X<sub>C</sub> = ${formatSI(Xc, "Ω")}`,
				color: colorXc,
			},
			{
				key: "Z",
				label: `Z = ${formatSI(Z, "Ω")}`,
				color: colorZ,
			},
			{
				key: "phi",
				label: `φ = ${phiDeg.toFixed(2)}°`,
				color: colorPhi,
			},
		];
		setHTML(
			legendDiv,
			(isExample
				? `<i style='color:#aaa'>
                        Beispiel-Dreieck:<br>
                        Bitte oben Werte eingeben und auf <b>Berechnen</b>!<br>
                        Fehlend/ungültig: <b>${missing.join(", ")}</b>
                    </i><br><br>`
				: "") +
				legend
					.map(
						(entry) =>
							`<div data-key="${entry.key}" style="color:${entry.color};transition:background 0.2s;">${entry.label}</div>`,
					)
					.join(""),
		);
		canvas.onmousemove = function (e) {
			const rect = canvas.getBoundingClientRect();
			const scaleX = canvas.width / rect.width;
			const scaleY = canvas.height / rect.height;
			const mx = (e.clientX - rect.left) * scaleX;
			const my = (e.clientY - rect.top) * scaleY;
			let found = null;
			for (const h of hitboxes) {
				if (h.type === "vector") {
					const dist = pointToSegment(mx, my, h.x1, h.y1, h.x2, h.y2);
					if (dist < 5) {
						found = h.key;
						break;
					}
				} else if (h.type === "arc") {
					const dx = mx - h.cx,
						dy = my - h.cy;
					const r = Math.sqrt(dx * dx + dy * dy);
					let a = Math.atan2(dy, dx);
					if (a < 0) a += 2 * Math.PI;
					let start = 0;
					let end = h.angle;
					if (end < 0) end += 2 * Math.PI;
					let inArc = false;
					if (start <= end) {
						inArc = a >= start && a <= end;
					} else {
						inArc = a >= start || a <= end;
					}
					if (Math.abs(r - h.r) < 10 && inArc) {
						found = h.key;
						break;
					}
				}
			}
			phasorHoveredKey = found;
			drawWiderstandsdreieckSerie(canvasId, legendId);
			for (const div of legendDiv.children) {
				if (div.dataset.key === found) {
					div.style.background = "#444";
					div.style.fontWeight = "bold";
				} else {
					div.style.background = "";
					div.style.fontWeight = "";
				}
			}
		};
		canvas.onmouseleave = function () {
			phasorHoveredKey = null;
			drawWiderstandsdreieckSerie(canvasId, legendId);
			for (const div of legendDiv.children) {
				div.style.background = "";
				div.style.fontWeight = "";
			}
		};
		for (const div of legendDiv.children) {
			div.onmouseenter = function () {
				phasorHoveredKey = this.dataset.key;
				drawWiderstandsdreieckSerie(canvasId, legendId);
				for (const d of legendDiv.children) {
					d.style.background = d === this ? "#444" : "";
					d.style.fontWeight = d === this ? "bold" : "";
				}
			};
			div.onmouseleave = function () {
				phasorHoveredKey = null;
				drawWiderstandsdreieckSerie(canvasId, legendId);
				for (const d of legendDiv.children) {
					d.style.background = "";
					d.style.fontWeight = "";
				}
			};
		}
		const downloadIconArea = drawDownloadIcon(ctx, canvas);
		if (!canvas._downloadHandlerAdded) {
			canvas.addEventListener("click", function (e) {
				const rect = canvas.getBoundingClientRect();
				const scaleX = canvas.width / rect.width;
				const scaleY = canvas.height / rect.height;
				const mx = (e.clientX - rect.left) * scaleX;
				const my = (e.clientY - rect.top) * scaleY;
				if (
					mx >= downloadIconArea.x &&
					mx <= downloadIconArea.x + downloadIconArea.size &&
					my >= downloadIconArea.y &&
					my <= downloadIconArea.y + downloadIconArea.size
				) {
					exportCanvasAsPNG(canvas.id);
				}
			});
			canvas._downloadHandlerAdded = true;
		}
		drawWatermark(ctx, canvas);
	}
	function drawSpannungsdreieckSerie(
		canvasId = "phasorCanvasVoltage",
		legendId = "phasorLegendVoltage",
	) {
		const canvas = document.getElementById(canvasId);
		const legendDiv = document.getElementById(legendId);
		if (!canvas || !legendDiv) return;
		const ctx = canvas.getContext("2d");
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		let R = parseInput(document.getElementById("R_AC")?.value);
		let C = parseInput(document.getElementById("C_AC")?.value);
		let f = parseInput(document.getElementById("f_AC")?.value);
		let U = parseInput(document.getElementById("U_AC")?.value);
		let Xc = parseInput(document.getElementById("Xc_AC")?.value);
		let Uc = parseInput(document.getElementById("Uc_AC")?.value);
		let Ur = parseInput(document.getElementById("Ur_AC")?.value);
		if (!Xc && C && f) Xc = 1 / (2 * Math.PI * f * C);
		if (!C && Xc && f) C = 1 / (2 * Math.PI * f * Xc);
		if (!f && Xc && C) f = 1 / (2 * Math.PI * Xc * C);
		let I = null;
		if (U && R && Xc) {
			const Z = Math.sqrt(R * R + Xc * Xc);
			I = U / Z;
		} else if (Uc && Xc) {
			I = Uc / Xc;
		} else if (Ur && R) {
			I = Ur / R;
		}
		if (!Uc && I && Xc) Uc = I * Xc;
		if (!Ur && I && R) Ur = I * R;
		if (!U && Ur !== null && Uc !== null) U = Math.sqrt(Ur * Ur + Uc * Uc);
		let phi = null;
		if (R && Xc) phi = -Math.abs(Math.atan(Xc / R));
		let isExample = false;
		let missing = [];
		if (!isFinite(R) || R <= 0) missing.push("R");
		if (!isFinite(Xc) || Xc <= 0) missing.push("Xc");
		if (!isFinite(U) || U <= 0) missing.push("U");
		if (missing.length > 0) {
			R = 4;
			Xc = 3;
			U = 10;
			const Z = Math.sqrt(R * R + Xc * Xc);
			I = U / Z;
			Ur = I * R;
			Uc = I * Xc;
			phi = -Math.atan(Xc / R);
			isExample = true;
		}
		{
			if (
				!isFinite(Ur) ||
				!isFinite(Uc) ||
				!isFinite(U) ||
				typeof Ur !== "number" ||
				typeof Uc !== "number" ||
				typeof U !== "number" ||
				Math.abs(Ur) < 1e-9 ||
				Math.abs(Uc) < 1e-9 ||
				Math.abs(U) < 1e-9
			) {
				ctx.save();
				ctx.fillStyle = "#e66";
				ctx.font = "bold 22px sans-serif";
				ctx.textAlign = "center";
				ctx.fillText(
					"Werte ergeben kein sinnvolles Dreieck!",
					canvas.width / 2,
					canvas.height / 2,
				);
				ctx.restore();
				setHTML(legendDiv, "");
				return;
			}
			const pythagoras = Math.abs(U * U - (Ur * Ur + Uc * Uc));
			if (pythagoras > 1e-6 * (Ur * Ur + Uc * Uc + U * U)) {
				ctx.save();
				ctx.fillStyle = "#e66";
				ctx.font = "bold 22px sans-serif";
				ctx.textAlign = "center";
				ctx.fillText(
					"Werte ergeben kein sinnvolles Dreieck!",
					canvas.width / 2,
					canvas.height / 2,
				);
				ctx.restore();
				setHTML(legendDiv, "");
				return;
			}
			const sides = [Ur, Uc, U].map(Math.abs);
			const minSide = Math.min(...sides);
			const maxSide = Math.max(...sides);
			if (minSide / maxSide < 0.01) {
				ctx.save();
				ctx.fillStyle = "#e66";
				ctx.font = "bold 22px sans-serif";
				ctx.textAlign = "center";
				ctx.fillText(
					"Dreieck ist zu spitz oder zu flach!",
					canvas.width / 2,
					canvas.height / 2,
				);
				ctx.restore();
				setHTML(legendDiv, "");
				return;
			}
			const phi = -Math.atan2(Uc, Ur);
			const phiDeg = (phi * 180) / Math.PI;
			if (Math.abs(phiDeg) < 1 || Math.abs(phiDeg) > 89) {
				ctx.save();
				ctx.fillStyle = "#e66";
				ctx.font = "bold 22px sans-serif";
				ctx.textAlign = "center";
				ctx.fillText(
					"Winkel ist zu klein oder zu groß für ein sinnvolles Dreieck!",
					canvas.width / 2,
					canvas.height / 2,
				);
				ctx.restore();
				setHTML(legendDiv, "");
				return;
			}
		}
		if (
			!isFinite(Ur) ||
			!isFinite(Uc) ||
			!isFinite(U) ||
			Math.abs(Ur) < 1e-9 ||
			Math.abs(Uc) < 1e-9 ||
			Math.abs(U) < 1e-9
		) {
			ctx.fillStyle = "#e66";
			ctx.font = "bold 22px sans-serif";
			ctx.textAlign = "center";
			ctx.fillText(
				"Werte ergeben kein sinnvolles Dreieck!",
				canvas.width / 2,
				canvas.height / 2,
			);
			setHTML(legendDiv, "");
			return;
		}
		const marginLeft = 80;
		const marginTop = 80;
		const marginRight = 80;
		const marginBottom = 80;
		const plotWidth = canvas.width - marginLeft - marginRight;
		const plotHeight = canvas.height - marginTop - marginBottom;
		const scale =
			0.95 * Math.min(plotWidth / Math.abs(Ur), plotHeight / Math.abs(Uc));
		const cx = marginLeft;
		const cy = marginTop;
		const hitboxes = [];
		ctx.save();
		ctx.strokeStyle = "#ccc";
		ctx.lineWidth = 2;
		ctx.setLineDash([6, 6]);
		ctx.beginPath();
		ctx.moveTo(0, cy);
		ctx.lineTo(canvas.width, cy);
		ctx.stroke();
		ctx.beginPath();
		ctx.moveTo(cx, 0);
		ctx.lineTo(cx, canvas.height);
		ctx.stroke();
		ctx.setLineDash([]);
		ctx.font = "bold 20px Arial";
		ctx.fillStyle = "#fff";
		ctx.textAlign = "right";
		ctx.fillText("x", canvas.width - 10, cy - 10);
		ctx.textAlign = "left";
		ctx.fillText("y", cx + 10, 24);
		ctx.restore();
		const colorUR = "#0070C0";
		const colorUC = "#2020FF";
		const colorU = "#A0A0FF";
		const colorI = "#C00000";
		const colorPhi = "#FFFFFF";
		drawRightAngleMarker(ctx, cx + Ur * scale, cy, 1, 1);
		const I_offset = 25;
		drawArrow(
			ctx,
			cx,
			cy - I_offset,
			cx + Ur * scale * 1.25,
			cy - I_offset,
			colorI,
			phasorHoveredKey === "I" ? 5 : 2,
			phasorHoveredKey === "I",
			true,
		);
		hitboxes.push({
			type: "vector",
			key: "I",
			x1: cx,
			y1: cy - I_offset,
			x2: cx + Ur * scale * 1.25,
			y2: cy - I_offset,
		});
		drawArrow(
			ctx,
			cx,
			cy,
			cx + Ur * scale,
			cy,
			colorUR,
			phasorHoveredKey === "UR" ? 6 : 3,
			phasorHoveredKey === "UR",
		);
		hitboxes.push({
			type: "vector",
			key: "UR",
			x1: cx,
			y1: cy,
			x2: cx + Ur * scale,
			y2: cy,
		});
		drawArrow(
			ctx,
			cx + Ur * scale,
			cy,
			cx + Ur * scale,
			cy + Uc * scale,
			colorUC,
			phasorHoveredKey === "UC" ? 6 : 3,
			phasorHoveredKey === "UC",
		);
		hitboxes.push({
			type: "vector",
			key: "UC",
			x1: cx + Ur * scale,
			y1: cy,
			x2: cx + Ur * scale,
			y2: cy + Uc * scale,
		});
		drawArrow(
			ctx,
			cx,
			cy,
			cx + Ur * scale,
			cy + Uc * scale,
			colorU,
			phasorHoveredKey === "U" ? 6 : 3,
			phasorHoveredKey === "U",
		);
		hitboxes.push({
			type: "vector",
			key: "U",
			x1: cx,
			y1: cy,
			x2: cx + Ur * scale,
			y2: cy + Uc * scale,
		});
		ctx.save();
		ctx.strokeStyle = phasorHoveredKey === "phi" ? colorPhi : "#fff";
		ctx.lineWidth = phasorHoveredKey === "phi" ? 4 : 2;
		ctx.beginPath();
		const arcAngle = Math.atan2(Uc, Ur);
		ctx.arc(cx, cy, 36, 0, arcAngle, arcAngle < 0);
		ctx.stroke();
		hitboxes.push({
			type: "arc",
			key: "phi",
			cx,
			cy,
			r: 36,
			angle: arcAngle,
		});
		ctx.restore();
		ctx.fillStyle = "#fff";
		ctx.beginPath();
		ctx.arc(cx, cy, 4, 0, 2 * Math.PI);
		ctx.fill();
		const phiDeg = (phi * 180) / Math.PI;
		const legend = [
			{
				key: "I",
				label: `I = ${formatSI(I, "A")}`,
				color: colorI,
			},
			{
				key: "U",
				label: `U = ${formatSI(U, "V")}`,
				color: colorU,
			},
			{
				key: "UR",
				label: `U<sub>R</sub> = ${formatSI(Ur, "V")}`,
				color: colorUR,
			},
			{
				key: "UC",
				label: `U<sub>C</sub> = ${formatSI(Uc, "V")}`,
				color: colorUC,
			},
			{
				key: "phi",
				label: `&phi; = ${phiDeg.toFixed(2)}°`,
				color: colorPhi,
			},
		];
		setHTML(
			legendDiv,
			(isExample
				? `<i style='color:#aaa'>
                        Beispiel-Dreieck:<br>
                        Bitte oben Werte eingeben und auf <b>Berechnen</b>!<br>
                        Fehlend/ungültig: <b>${missing.join(", ")}</b>
                    </i><br><br>`
				: "") +
				legend
					.map(
						(entry) =>
							`<div data-key="${entry.key}" style="color:${entry.color};transition:background 0.2s;">${entry.label}</div>`,
					)
					.join(""),
		);
		canvas.onmousemove = function (e) {
			const rect = canvas.getBoundingClientRect();
			const scaleX = canvas.width / rect.width;
			const scaleY = canvas.height / rect.height;
			const mx = (e.clientX - rect.left) * scaleX;
			const my = (e.clientY - rect.top) * scaleY;
			let found = null;
			for (const h of hitboxes) {
				if (h.type === "vector") {
					const dist = pointToSegment(mx, my, h.x1, h.y1, h.x2, h.y2);
					if (dist < 5) {
						found = h.key;
						break;
					}
				} else if (h.type === "arc") {
					const dx = mx - h.cx,
						dy = my - h.cy;
					const r = Math.sqrt(dx * dx + dy * dy);
					let a = Math.atan2(dy, dx);
					if (a < 0) a += 2 * Math.PI;
					let start = 0;
					let end = h.angle;
					if (end < 0) end += 2 * Math.PI;
					let inArc = false;
					if (start <= end) {
						inArc = a >= start && a <= end;
					} else {
						inArc = a >= start || a <= end;
					}
					if (Math.abs(r - h.r) < 10 && inArc) {
						found = h.key;
						break;
					}
				}
			}
			phasorHoveredKey = found;
			drawSpannungsdreieckSerie(canvasId, legendId);
			for (const div of legendDiv.children) {
				if (div.dataset.key === found) {
					div.style.background = "#444";
					div.style.fontWeight = "bold";
				} else {
					div.style.background = "";
					div.style.fontWeight = "";
				}
			}
		};
		canvas.onmouseleave = function () {
			phasorHoveredKey = null;
			drawSpannungsdreieckSerie(canvasId, legendId);
			for (const div of legendDiv.children) {
				div.style.background = "";
				div.style.fontWeight = "";
			}
		};
		for (const div of legendDiv.children) {
			div.onmouseenter = function () {
				phasorHoveredKey = this.dataset.key;
				drawSpannungsdreieckSerie(canvasId, legendId);
				for (const d of legendDiv.children) {
					d.style.background = d === this ? "#444" : "";
					d.style.fontWeight = d === this ? "bold" : "";
				}
			};
			div.onmouseleave = function () {
				phasorHoveredKey = null;
				drawSpannungsdreieckSerie(canvasId, legendId);
				for (const d of legendDiv.children) {
					d.style.background = "";
					d.style.fontWeight = "";
				}
			};
		}
		const downloadIconArea = drawDownloadIcon(ctx, canvas);
		if (!canvas._downloadHandlerAdded) {
			canvas.addEventListener("click", function (e) {
				const rect = canvas.getBoundingClientRect();
				const scaleX = canvas.width / rect.width;
				const scaleY = canvas.height / rect.height;
				const mx = (e.clientX - rect.left) * scaleX;
				const my = (e.clientY - rect.top) * scaleY;
				if (
					mx >= downloadIconArea.x &&
					mx <= downloadIconArea.x + downloadIconArea.size &&
					my >= downloadIconArea.y &&
					my <= downloadIconArea.y + downloadIconArea.size
				) {
					exportCanvasAsPNG(canvas.id);
				}
			});
			canvas._downloadHandlerAdded = true;
		}
		drawWatermark(ctx, canvas);
	}
	function showExampleSerieTriangle() {
		document.getElementById("R_AC").value = "";
		document.getElementById("C_AC").value = "";
		document.getElementById("U_AC").value = "";
		document.getElementById("f_AC").value = "";
		drawWiderstandsdreieckSerie(
			"phasorCanvasImpedance",
			"phasorLegendImpedance",
		);
		drawSpannungsdreieckSerie("phasorCanvasVoltage", "phasorLegendVoltage");
	}
	function showExampleParallelTriangle() {
		document.getElementById("G_ACp").value = "";
		document.getElementById("Bc_ACp").value = "";
		document.getElementById("Y_ACp").value = "";
		document.getElementById("Ir_ACp").value = "";
		document.getElementById("Ic_ACp").value = "";
		document.getElementById("I_ACp").value = "";
		document.getElementById("U_ACp").value = "";
		document.getElementById("f_ACp").value = "";
		document.getElementById("C_ACp").value = "";
		drawLeitwertdreieckParallel(
			0.3,
			0.4,
			0.5,
			"phasorCanvasAdmittance",
			"phasorLegendAdmittance",
			true,
			["G", "Bc", "Y"],
		);
		drawStromdreieckParallel(
			3.0,
			4.0,
			5.0,
			"phasorCanvasCurrent",
			"phasorLegendCurrent",
			true,
			["Ir", "Ic", "I"],
		);
	}
	function drawMarkerOnCurve(canvasId, t, value, maxTime, minY, maxY, color) {
		const canvas = document.getElementById(canvasId);
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		const margin = 80;
		const width = canvas.width - 2 * margin;
		const height = canvas.height - 2 * margin;
		const x = margin + (t / maxTime) * width;
		const y =
			canvas.height - margin - ((value - minY) / (maxY - minY)) * height;
		ctx.save();
		ctx.fillStyle = color;
		ctx.beginPath();
		ctx.arc(x, y, 6, 0, 2 * Math.PI);
		ctx.fill();
		ctx.restore();
	}
	function getBestSIPrefix(maxAbsValue) {
		const prefixes = [
			{
				f: 1e9,
				p: "G",
			},
			{
				f: 1e6,
				p: "M",
			},
			{
				f: 1e3,
				p: "k",
			},
			{
				f: 1,
				p: "",
			},
			{
				f: 1e-3,
				p: "m",
			},
			{
				f: 1e-6,
				p: "μ",
			},
			{
				f: 1e-9,
				p: "n",
			},
		];
		for (const { f, p } of prefixes) {
			if (maxAbsValue >= f)
				return {
					factor: f,
					prefix: p,
				};
		}
		return {
			factor: 1,
			prefix: "",
		};
	}
	function formatWithSIPrefix(value, factor, prefix, unit) {
		return (value / factor).toFixed(2) + " " + prefix + unit;
	}
	function drawCurveDynamic(
		canvasId,
		valueFunc,
		yLabel,
		maxTime,
		stepCount,
		options = {},
	) {
		const canvas = document.getElementById(canvasId);
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		const marginLeft = 90;
		const marginRight = 60;
		const marginTop = 40;
		const marginBottom = 70;
		const width = canvas.width - marginLeft - marginRight;
		const height = canvas.height - marginTop - marginBottom;
		if (!maxTime || maxTime <= 0 || typeof valueFunc !== "function") {
			ctx.fillStyle = "#e66";
			ctx.font = "bold 24px sans-serif";
			ctx.textAlign = "center";
			ctx.fillText(
				"Ungültige Eingaben - keine Kurve darstellbar!",
				canvas.width / 2,
				canvas.height / 2,
			);
			ctx.font = "16px sans-serif";
			ctx.fillStyle = "#fff";
			ctx.fillText(
				"Bitte überprüfe R, C, U und Modus.",
				canvas.width / 2,
				canvas.height / 2 + 30,
			);
			return;
		}
		let minY = Number.POSITIVE_INFINITY;
		let maxY = Number.NEGATIVE_INFINITY;
		const points = [];
		for (let i = 0; i <= stepCount; i++) {
			const t = (i / stepCount) * maxTime;
			const value = valueFunc(t);
			points.push({
				t,
				value,
			});
			if (isFinite(value)) {
				if (value < minY) minY = value;
				if (value > maxY) maxY = value;
			}
		}
		minY = Math.min(minY, 0);
		maxY = Math.max(maxY, 0);
		if (Math.abs(maxY - minY) < 1e-12) {
			maxY += 1;
			minY -= 1;
		}
		if (typeof options.minY === "number") minY = options.minY;
		if (typeof options.maxY === "number") maxY = options.maxY;
		const maxAbsY = Math.max(Math.abs(minY), Math.abs(maxY));
		const { factor: yFactor, prefix: yPrefix } = getBestSIPrefix(maxAbsY);
		ctx.save();
		ctx.strokeStyle = "rgba(255,255,255,0.10)";
		ctx.lineWidth = 1;
		for (let i = 0; i <= 10; i++) {
			const x = marginLeft + (i / 10) * width;
			ctx.beginPath();
			ctx.moveTo(x, marginTop);
			ctx.lineTo(x, canvas.height - marginBottom);
			ctx.stroke();
			const y = canvas.height - marginBottom - (i / 10) * height;
			ctx.beginPath();
			ctx.moveTo(marginLeft, y);
			ctx.lineTo(canvas.width - marginRight, y);
			ctx.stroke();
		}
		ctx.restore();
		ctx.strokeStyle = "#aaa";
		ctx.lineWidth = 2;
		ctx.beginPath();
		ctx.moveTo(marginLeft, marginTop);
		ctx.lineTo(marginLeft, canvas.height - marginBottom);
		ctx.lineTo(canvas.width - marginRight, canvas.height - marginBottom);
		ctx.stroke();
		ctx.font = "bold 22px Arial";
		ctx.fillStyle = "#fff";
		ctx.textAlign = "left";
		ctx.fillText(yLabel, marginLeft - 60, marginTop - 18);
		let timeUnit = "s",
			timeFactor = 1;
		if (maxTime < 1e-3) {
			timeUnit = "μs";
			timeFactor = 1e6;
		} else if (maxTime < 1) {
			timeUnit = "ms";
			timeFactor = 1000;
		}
		ctx.font = "bold 22px Arial";
		ctx.textAlign = "center";
		ctx.fillText(
			`Zeit (${timeUnit})`,
			marginLeft + width / 2,
			canvas.height - marginBottom + 60,
		);
		ctx.font = "16px Arial";
		ctx.textAlign = "center";
		for (let i = 0; i <= 5; i++) {
			const x = marginLeft + (i / 5) * width;
			const tVal = ((i * maxTime) / 5) * timeFactor;
			let label;
			if (timeUnit === "s" || timeUnit === "ms" || timeUnit === "μs") {
				label = tVal.toFixed(2).replace(/\.00$/, "");
			}
			ctx.fillStyle = "#fff";
			ctx.fillText(label, x, canvas.height - marginBottom + 28);
		}
		ctx.textAlign = "right";
		for (let i = 0; i <= 5; i++) {
			const value = minY + (i / 5) * (maxY - minY);
			const y =
				canvas.height -
				marginBottom -
				((value - minY) / (maxY - minY)) * height;
			ctx.fillStyle = "#fff";
			ctx.fillText(
				formatWithSIPrefix(
					value,
					yFactor,
					yPrefix,
					yLabel.includes("A") ? "A" : "V",
				),
				marginLeft - 18,
				y + 7,
			);
		}
		ctx.beginPath();
		for (let i = 0; i < points.length; i++) {
			const { t, value } = points[i];
			const x = marginLeft + (t / maxTime) * width;
			const y =
				canvas.height -
				marginBottom -
				((value - minY) / (maxY - minY)) * height;
			if (i === 0) ctx.moveTo(x, y);
			else ctx.lineTo(x, y);
		}
		ctx.strokeStyle = options.color || "#0070C0";
		ctx.lineWidth = 2.5;
		ctx.shadowColor = options.color || "#0070C0";
		ctx.shadowBlur = 4;
		ctx.stroke();
		ctx.shadowBlur = 0;
		if (
			typeof options.tMarker === "number" &&
			options.tMarker >= 0 &&
			options.tMarker <= maxTime
		) {
			const t = options.tMarker;
			const value = valueFunc(t);
			const x = marginLeft + (t / maxTime) * width;
			const y =
				canvas.height -
				marginBottom -
				((value - minY) / (maxY - minY)) * height;
			ctx.save();
			ctx.strokeStyle = "#ff69b4";
			ctx.setLineDash([6, 6]);
			ctx.lineWidth = 2;
			ctx.beginPath();
			ctx.moveTo(x, canvas.height - marginBottom);
			ctx.lineTo(x, y);
			ctx.stroke();
			ctx.beginPath();
			ctx.moveTo(marginLeft, y);
			ctx.lineTo(x, y);
			ctx.stroke();
			ctx.setLineDash([]);
			ctx.fillStyle = "#ff69b4";
			ctx.beginPath();
			ctx.arc(x, y, 10, 0, 2 * Math.PI);
			ctx.fill();
			ctx.font = "bold 24px sans-serif";
			ctx.textAlign = "left";
			ctx.fillStyle = "#ffffff";
			ctx.fillText(
				(options.markerLabel || "") +
					formatWithSIPrefix(
						value,
						yFactor,
						yPrefix,
						yLabel.includes("A") ? "A" : "V",
					),
				x + 22,
				y - 16,
			);
			ctx.restore();
		}
		const logo = new Image();
		logo.src = "/Pictures/favicon_no_BG.svg";
		logo.onload = function () {
			ctx.save();
			ctx.globalAlpha = 0.15;
			const size = 120;
			ctx.drawImage(
				logo,
				canvas.width - marginRight - size,
				marginTop + 10,
				size,
				size,
			);
			ctx.globalAlpha = 1.0;
			ctx.restore();
		};
	}
	function drawDownloadIcon(ctx, canvas, iconSize = 32) {
		const margin = 12;
		const x = canvas.width - iconSize - margin;
		const y = canvas.height - iconSize - margin;
		ctx.save();
		ctx.globalAlpha = 0.7;
		ctx.strokeStyle = "#fff";
		ctx.lineWidth = 2;
		ctx.lineJoin = "round";
		ctx.beginPath();
		ctx.moveTo(x + iconSize / 2, y + 8);
		ctx.lineTo(x + iconSize / 2, y + iconSize - 10);
		ctx.moveTo(x + iconSize / 2, y + iconSize - 10);
		ctx.lineTo(x + iconSize / 2 - 8, y + iconSize - 18);
		ctx.moveTo(x + iconSize / 2, y + iconSize - 10);
		ctx.lineTo(x + iconSize / 2 + 8, y + iconSize - 18);
		ctx.stroke();
		ctx.beginPath();
		ctx.rect(x + 8, y + iconSize - 10, iconSize - 16, 8);
		ctx.stroke();
		ctx.restore();
		return {
			x,
			y,
			size: iconSize,
		};
	}
	function pointToSegment(px, py, x1, y1, x2, y2) {
		const dx = x2 - x1,
			dy = y2 - y1;
		if (dx === 0 && dy === 0) return Math.hypot(px - x1, py - y1);
		const t = Math.max(
			0,
			Math.min(1, ((px - x1) * dx + (py - y1) * dy) / (dx * dx + dy * dy)),
		);
		const projx = x1 + t * dx,
			projy = y1 + t * dy;
		return Math.hypot(px - projx, py - projy);
	}
	function drawLabelWithSubscript(
		ctx,
		text,
		sub,
		x,
		y,
		color = "#fff",
		mainFont = "bold 20px Arial",
		subFont = "14px Arial",
	) {
		ctx.save();
		ctx.fillStyle = color;
		ctx.font = mainFont;
		ctx.textAlign = "center";
		ctx.fillText(text, x, y);
		const mainWidth = ctx.measureText(text).width;
		ctx.font = subFont;
		ctx.fillText(sub, x + mainWidth / 2 + 6, y + 8);
		ctx.restore();
	}
	function drawWatermark(ctx, canvas, size = 70, margin = 10) {
		if (watermarkLoaded) {
			ctx.save();
			ctx.globalAlpha = 0.15;
			ctx.drawImage(
				watermarkLogo,
				canvas.width - size - margin,
				margin,
				size,
				size,
			);
			ctx.globalAlpha = 1.0;
			ctx.restore();
		}
	}
	function drawRightAngleMarker(ctx, x, y, dx, dy) {
		const size = 10;
		ctx.save();
		ctx.strokeStyle = "rgba(255,255,255,0.7)";
		ctx.lineWidth = 2;
		ctx.beginPath();
		ctx.moveTo(x, y);
		ctx.lineTo(x + dx * size, y);
		ctx.lineTo(x + dx * size, y + dy * size);
		ctx.lineTo(x, y + dy * size);
		ctx.stroke();
		ctx.restore();
	}
	function formatSI(value, unit) {
		const abs = Math.abs(value);
		if (abs === 0) return "0 " + unit;
		const prefixes = [
			{
				f: 1e9,
				p: "G",
			},
			{
				f: 1e6,
				p: "M",
			},
			{
				f: 1e3,
				p: "k",
			},
			{
				f: 1,
				p: "",
			},
			{
				f: 1e-3,
				p: "m",
			},
			{
				f: 1e-6,
				p: "&mu;",
			},
			{
				f: 1e-9,
				p: "n",
			},
		];
		for (const { f, p } of prefixes) {
			if (abs >= f) return (value / f).toFixed(2) + " " + p + unit;
		}
		return value.toExponential(2) + " " + unit;
	}
	function exportCanvasAsPNG(canvasId) {
		const canvas = document.getElementById(canvasId);
		if (!canvas) return;
		const link = document.createElement("a");
		link.download = canvasId + ".png";
		link.href = canvas.toDataURL("image/png");
		link.click();
	}
	function drawArrow(
		ctx,
		x1,
		y1,
		x2,
		y2,
		color,
		width = 3,
		highlight = false,
		dashed = false,
	) {
		ctx.save();
		ctx.strokeStyle = color;
		ctx.fillStyle = color;
		ctx.lineWidth = width;
		if (dashed) {
			ctx.setLineDash([8, 6]);
		}
		if (highlight) {
			ctx.shadowColor = color;
			ctx.shadowBlur = 16;
		}
		ctx.beginPath();
		ctx.moveTo(x1, y1);
		ctx.lineTo(x2, y2);
		ctx.stroke();
		ctx.setLineDash([]);
		ctx.shadowBlur = 0;
		const headlen = 14;
		const angle = Math.atan2(y2 - y1, x2 - x1);
		ctx.beginPath();
		ctx.moveTo(x2, y2);
		ctx.lineTo(
			x2 - headlen * Math.cos(angle - Math.PI / 7),
			y2 - headlen * Math.sin(angle - Math.PI / 7),
		);
		ctx.lineTo(
			x2 - headlen * Math.cos(angle + Math.PI / 7),
			y2 - headlen * Math.sin(angle + Math.PI / 7),
		);
		ctx.lineTo(x2, y2);
		ctx.fill();
		ctx.restore();
	}
	function toggleDropdown(element) {
		const dropdown = element.parentElement;
		dropdown.classList.toggle("open");
	}
	return {
		handlers: {
			calculateCapacitorParameters,
			resetInputsCapacitorParameters,
			toggleSelection,
			toggleRAD,
			calculateSerieAC,
			toggleRADp,
			calculateParallelAC,
			calculateRC,
			generate_e_curve_from_RCinputs,
			showCanvasWarning,
			drawLeitwertdreieckParallel,
			drawStromdreieckParallel,
			drawWiderstandsdreieckSerie,
			drawSpannungsdreieckSerie,
			showExampleSerieTriangle,
			showExampleParallelTriangle,
			drawMarkerOnCurve,
			getBestSIPrefix,
			formatWithSIPrefix,
			drawCurveDynamic,
			drawDownloadIcon,
			pointToSegment,
			drawLabelWithSubscript,
			drawWatermark,
			drawRightAngleMarker,
			formatSI,
			exportCanvasAsPNG,
			drawArrow,
			toggleDropdown,
			changeSlide,
			showSlides,
			formatPrefixNoUnit,
			formatPrefixNoUnitSquare,
			formatWithPrefix,
			formatWithPrefixsquare,
			getlg,
			parseInput,
			parseInputsquare,
		},
		dispose() {},
	};
}
