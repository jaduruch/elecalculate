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
			if (sectionId === "HP_RC") {
				document.getElementById("HP_RC").style.display = "block";
				document.getElementById("HP_RL").style.display = "none";
				document.getElementById("TP_RC").style.display = "none";
				document.getElementById("TP_RL").style.display = "none";
			} else if (sectionId === "HP_RL") {
				document.getElementById("HP_RC").style.display = "none";
				document.getElementById("HP_RL").style.display = "block";
				document.getElementById("TP_RL").style.display = "none";
				document.getElementById("TP_RC").style.display = "none";
			} else if (sectionId === "TP_RC") {
				document.getElementById("HP_RC").style.display = "none";
				document.getElementById("HP_RL").style.display = "none";
				document.getElementById("TP_RC").style.display = "block";
				document.getElementById("TP_RL").style.display = "none";
			} else if (sectionId === "TP_RL") {
				document.getElementById("HP_RC").style.display = "none";
				document.getElementById("HP_RL").style.display = "none";
				document.getElementById("TP_RC").style.display = "none";
				document.getElementById("TP_RL").style.display = "block";
			}
		}
	}
	function calculate_HP_RC() {
		let result_HP_RC = ``;
		const phi = document.getElementById("Winkel-HP_RC").value;
		const R = document.getElementById("R-HP_RC").value;
		const XC = document.getElementById("XC-HP_RC").value;
		const C = document.getElementById("C-HP_RC").value;
		const Uin = document.getElementById("Uin-HP_RC").value;
		const Uc = document.getElementById("Uc-HP_RC").value;
		const Uout = document.getElementById("Uout-HP_RC").value;
		const fg = document.getElementById("fg-HP_RC").value;
		const f = document.getElementById("f-HP_RC").value;
		if (!phi) {
			if (Uc && Uin) {
				result_HP_RC += `
                        Winkel &phi;<sub>RAD</sub> = arcsin(
                        <div class ="fraction">
                            <span>U<sub>C</sub></span><br>
                            <span class="fraction-denominator">U<sub>in</sub></span>
                        </div>)
                    =
                        <div class ="fraction">
                            <span>${Uc}V</span><br>
                            <span class="fraction-denominator">${Uin}V</span>
                        </div> 
                    = ${formatWithPrefix(Math.asin(parseInput(Uc) / parseInput(Uin)), "")}<br>
                    

                    Winkel &phi;<sub>DEG</sub> = arcsin(
                        <div class ="fraction">
                            <span>U<sub>C</sub></span><br>
                            <span class="fraction-denominator">U<sub>in</sub></span>
                        </div>)
                    =
                        <div class ="fraction">
                            <span>${Uc}V</span><br>
                            <span class="fraction-denominator">${Uin}V</span>
                        </div> 
                    = ${formatWithPrefix((Math.asin(parseInput(Uc) / parseInput(Uin)) * 180) / Math.PI, "&deg;")}<br>
                    `;
			}
		}
		if (!R) {
			if (fg && C) {
				result_HP_RC += `
                        Widerstand R = 
                        <div class ="fraction">
                            <span> 1 </span><br>
                            <span class="fraction-denominator">2&pi; &lowast; f<sub>g</sub> &lowast; C</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span>1</span><br>
                            <span class="fraction-denominator">2&pi; &lowast; ${fg}Hz &lowast; ${C}F</span>
                        </div> 
                    = ${formatWithPrefix(1 / (2 * Math.PI * parseInput(fg) * parseInput(C)), "&Omega;")}<br>`;
			}
		}
		if (!XC) {
			if (f && C) {
				result_HP_RC += `
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
		if (!C) {
			if (fg && R) {
				result_HP_RC += `
                        Kapazit&auml;t C = 
                        <div class ="fraction">
                            <span> 1 </span><br>
                            <span class="fraction-denominator">2&pi; &lowast; R &lowast; f<sub>g</sub></span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span>1</span><br>
                            <span class="fraction-denominator">2&pi; &lowast; ${R}&Omega; &lowast; ${fg}Hz</span>
                        </div> 
                    = ${formatWithPrefix(1 / (2 * Math.PI * parseInput(R) * parseInput(fg)), "F")}<br>`;
			}
		}
		if (!fg) {
			if (R && C) {
				result_HP_RC += `
                        Grenzfrequnez f<sub>g</sub> = 
                        <div class ="fraction">
                            <span> 1 </span><br>
                            <span class="fraction-denominator">2&pi; &lowast; R &lowast; C</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span>1</span><br>
                            <span class="fraction-denominator">2&pi; &lowast; ${R}&Omega; &lowast; ${C}F</span>
                        </div> 
                    = ${formatWithPrefix(1 / (2 * Math.PI * parseInput(R) * parseInput(C)), "Hz")}<br>`;
			}
		}
		setHTML(document.getElementById("result_HP_RC"), result_HP_RC);
	}
	function calculate_HP_RL() {
		let result_HP_RL = ``;
		const phi = document.getElementById("Winkel-HP_RL").value;
		const R = document.getElementById("R-HP_RL").value;
		const XL = document.getElementById("XL-HP_RL").value;
		const L = document.getElementById("L-HP_RL").value;
		const Uin = document.getElementById("Uin-HP_RL").value;
		const Uout = document.getElementById("Uout-HP_RL").value;
		const fg = document.getElementById("fg-HP_RL").value;
		const f = document.getElementById("f-HP_RL").value;
		if (!R) {
			if (fg && L) {
				result_HP_RL += `
                        Widerstand R = 
                        2&pi; &lowast; f<sub>g</sub> &lowast; L
                    =
                        2&pi; &lowast; ${fg}Hz &lowast; ${L}H
                    = ${formatWithPrefix(2 * Math.PI * parseInput(fg) * parseInput(L), "&Omega;")}<br>`;
			}
		}
		if (!XL) {
			if (f && L) {
				result_HP_RL += `
                        Blindwiderstand X<sub>L</sub> = 
                        2&pi; &lowast; f &lowast; L
                    =
                        2&pi; &lowast; ${f}Hz &lowast; ${L}H
                    = ${formatWithPrefix(2 * Math.PI * parseInput(f) * parseInput(L), "&Omega;")}<br>`;
			}
		}
		if (!L) {
			if (fg && R) {
				result_HP_RL += `
                        Induktivit&auml;t L = 
                        <div class ="fraction">
                            <span> R </span><br>
                            <span class="fraction-denominator">2&pi; &lowast; R &lowast; f<sub>g</sub></span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span>${R}&Omega;</span><br>
                            <span class="fraction-denominator">2&pi; &lowast; ${fg}Hz</span>
                        </div> 
                    = ${formatWithPrefix(parseInput(R) / (2 * Math.PI * parseInput(fg)), "F")}<br>`;
			}
		}
		if (!fg) {
			if (R && L) {
				result_HP_RL += `
                        Grenzfrequnez f<sub>g</sub> = 
                        <div class ="fraction">
                            <span> R </span><br>
                            <span class="fraction-denominator">2&pi; &lowast; R &lowast; L</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span>${R}&Omega;</span><br>
                            <span class="fraction-denominator">2&pi; &lowast; ${L}H</span>
                        </div> 
                    = ${formatWithPrefix(parseInput(R) / (2 * Math.PI * parseInput(L)), "Hz")}<br>`;
			}
		}
		setHTML(document.getElementById("result_HP_RL"), result_HP_RL);
	}
	function calculate_TP_RC() {
		let result_TP_RC = ``;
		const phi = document.getElementById("Winkel-TP_RC").value;
		const R = document.getElementById("R-TP_RC").value;
		const XC = document.getElementById("XC-TP_RC").value;
		const C = document.getElementById("C-TP_RC").value;
		const Uin = document.getElementById("Uin-TP_RC").value;
		const Uout = document.getElementById("Uout-TP_RC").value;
		const fg = document.getElementById("fg-TP_RC").value;
		const f = document.getElementById("f-TP_RC").value;
		if (!R) {
			if (fg && C) {
				result_TP_RC += `
                        Widerstand R = 
                        <div class ="fraction">
                            <span> 1 </span><br>
                            <span class="fraction-denominator">2&pi; &lowast; f<sub>g</sub> &lowast; C</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span>1</span><br>
                            <span class="fraction-denominator">2&pi; &lowast; ${fg}Hz &lowast; ${C}F</span>
                        </div> 
                    = ${formatWithPrefix(1 / (2 * Math.PI * parseInput(fg) * parseInput(C)), "&Omega;")}<br>`;
			}
			if (f && C && phi) {
				result_TP_RC += `
                        Widerstand R = 
                        <div class ="fraction">
                            <span>tan(&phi;)</span><br>
                            <span class="fraction-denominator">2&pi; &lowast; f &lowast; C</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span>tan(${phi}&deg;)</span><br>
                            <span class="fraction-denominator">2&pi; &lowast; ${f}Hz &lowast; ${C}F</span>
                        </div> 
                    = ${formatWithPrefix(Math.tan((parseInput(phi) * Math.PI) / 180) / (2 * Math.PI * parseInput(f) * parseInput(C)), "&Omega;")}<br>`;
			}
			if (XC && phi) {
				result_TP_RC += `
                        Widerstand R = tan(&phi;) &lowast; X<sub>C</sub>
                    = tan(${phi}&deg;) &lowast; ${XC}&Omega;
                    = ${formatWithPrefix(Math.tan((parseInput(phi) * Math.PI) / 180) * parseInput(XC), "&Omega;")}<br>`;
			}
		}
		if (!XC) {
			if (f && C) {
				result_TP_RC += `
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
		if (!C) {
			if (fg && R) {
				result_TP_RC += `
                        Kapazit&auml;t C = 
                        <div class ="fraction">
                            <span> 1 </span><br>
                            <span class="fraction-denominator">2&pi; &lowast; R &lowast; f<sub>g</sub></span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span>1</span><br>
                            <span class="fraction-denominator">2&pi; &lowast; ${R}&Omega; &lowast; ${fg}Hz</span>
                        </div> 
                    = ${formatWithPrefix(1 / (2 * Math.PI * parseInput(R) * parseInput(fg)), "F")}<br>`;
			}
		}
		if (!Uout) {
			if (R && C && Uin && C && f) {
				result_TP_RC += `
                        Spannung   U<sub>out</sub> = 
                        <div class ="fraction">
                            <span> U<sub>1</sub> </span><br>
                            <span class="fraction-denominator">&radic;(1 + (2&pi; &lowast; F &lowast; R &lowast; C)<sup>2</sup>)</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span>${Uin}V</span><br>
                            <span class="fraction-denominator">&radic;(1 + (2&pi; &lowast; ${f}Hz &lowast; ${R}&Omega; &lowast; ${C}F)<sup>2</sup>)</span>
                        </div> 
                    = ${formatWithPrefix(parseInput(Uin) / Math.pow(1 + Math.pow(2 * Math.PI * parseInput(f) * parseInput(R) * parseInput(C), 2), 0.5), "V")}<br>`;
			}
		}
		if (!fg) {
			if (R && C) {
				result_TP_RC += `
                        Grenzfrequnez f<sub>g</sub> = 
                        <div class ="fraction">
                            <span> 1 </span><br>
                            <span class="fraction-denominator">2&pi; &lowast; R &lowast; C</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span>1</span><br>
                            <span class="fraction-denominator">2&pi; &lowast; ${R}&Omega; &lowast; ${C}F</span>
                        </div> 
                    = ${formatWithPrefix(1 / (2 * Math.PI * parseInput(R) * parseInput(C)), "Hz")}<br>`;
			}
		}
		setHTML(document.getElementById("result_TP_RC"), result_TP_RC);
	}
	function calculate_TP_RL() {
		let result_TP_RL = ``;
		const phi = document.getElementById("Winkel-TP_RL").value;
		const R = document.getElementById("R-TP_RL").value;
		const XL = document.getElementById("XL-TP_RL").value;
		const L = document.getElementById("L-TP_RL").value;
		const Uin = document.getElementById("Uin-TP_RL").value;
		const Uout = document.getElementById("Uout-TP_RL").value;
		const fg = document.getElementById("fg-TP_RL").value;
		const f = document.getElementById("f-TP_RL").value;
		if (!R) {
			if (fg && L) {
				result_TP_RL += `
                        Widerstand R = 
                        2&pi; &lowast; f<sub>g</sub> &lowast; L
                    =
                        2&pi; &lowast; ${fg}Hz &lowast; ${L}H
                    = ${formatWithPrefix(2 * Math.PI * parseInput(fg) * parseInput(L), "&Omega;")}<br>`;
			}
		}
		if (!XL) {
			if (f && L) {
				result_TP_RL += `
                        Blindwiderstand X<sub>L</sub> = 
                        2&pi; &lowast; f &lowast; L
                    =
                        2&pi; &lowast; ${f}Hz &lowast; ${L}H
                    = ${formatWithPrefix(2 * Math.PI * parseInput(f) * parseInput(L), "&Omega;")}<br>`;
			}
		}
		if (!L) {
			if (fg && R) {
				result_TP_RL += `
                        Induktivit&auml;t L = 
                        <div class ="fraction">
                            <span> R </span><br>
                            <span class="fraction-denominator">2&pi; &lowast; R &lowast; f<sub>g</sub></span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span>${R}&Omega;</span><br>
                            <span class="fraction-denominator">2&pi; &lowast; ${fg}Hz</span>
                        </div> 
                    = ${formatWithPrefix(parseInput(R) / (2 * Math.PI * parseInput(fg)), "H")}<br>`;
			}
			if (R && Uin && Uout && f) {
				result_TP_RL += `
                        Induktivit&auml;t L = 
                        <div class ="fraction">
                            <span class="fraction-numerator"> R &lowast; &radic;(U<sub>in</sub><sup>2</sup> - U<sub>out</sub><sup>2</sup>)</span><br>
                            <span>2&pi; &lowast;  f &lowast; U<sub>out</sub></span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator">${R}&Omega; &lowast; &radic;((${Uin}V)<sup>2</sup> - (${Uout}V)<sup>2</sup>)</span><br>
                            <span>2&pi; &lowast; ${f}Hz f &lowast; ${Uout}V</span>
                        </div> 
                    = ${formatWithPrefix((parseInput(R) * Math.pow(Math.pow(parseInput(Uin), 2) - Math.pow(parseInput(Uout), 2), 0.5)) / (2 * Math.PI * parseInput(f) * parseInput(Uout)), "H")}<br>`;
			}
		}
		if (!Uin) {
			if (Uout && f && L && R) {
				result_TP_RL += `
                        Eingangsspannung U<sub>in</sub> = &radic;((U<sub>out</sub>)<sup>2</sup>
                        (<div class ="fraction">
                            <span class="fraction-numerator">U<sub>out</sub> &lowast; 2&pi; &lowast; f &lowast; L</span><br>
                            <span>R</span>
                        </div>)<sup>2</sup>)
                    = &radic;(${Uout}V)<sup>2</sup>
                        (<div class ="fraction">
                            <span class="fraction-numerator">${Uout}V &lowast; 2&pi; &lowast; ${f}Hz &lowast; ${L}H</span><br>
                            <span>${R}&Omega;</span>
                        </div>)<sup>2</sup>)
                    = ${formatWithPrefix(Math.pow(Math.pow(parseInput(Uout), 2) + Math.pow((parseInput(Uout) * 2 * Math.PI * parseInput(f) * parseInput(L)) / R, 2), 0.5), "V")}<br>`;
			}
		}
		if (!fg) {
			if (R && L) {
				result_TP_RL += `
                        Grenzfrequnez f<sub>g</sub> = 
                        <div class ="fraction">
                            <span> R </span><br>
                            <span class="fraction-denominator">2&pi; &lowast; R &lowast; L</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span>${R}&Omega;</span><br>
                            <span class="fraction-denominator">2&pi; &lowast; ${L}H</span>
                        </div> 
                    = ${formatWithPrefix(parseInput(R) / (2 * Math.PI * parseInput(L)), "Hz")}<br>`;
			}
		}
		setHTML(document.getElementById("result_TP_RL"), result_TP_RL);
	}
	return {
		handlers: {
			toggleSelection,
			calculate_HP_RC,
			calculate_HP_RL,
			calculate_TP_RC,
			calculate_TP_RL,
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
