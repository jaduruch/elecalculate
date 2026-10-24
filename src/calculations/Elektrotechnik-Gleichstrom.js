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
	document.getElementById("modeSwitch").addEventListener("change", function () {
		const modeLabel = document.getElementById("modeLabel");
		const circuitImage = document.getElementById("circuitImage");
		if (this.checked) {
			modeLabel.textContent = "belastet";
			circuitImage.src = "/Pictures/Spannungsteiler_belastet.png";
			document.getElementById("belastet").style.display = "block";
			document.getElementById("unbelastet").style.display = "none";
		} else {
			modeLabel.textContent = "unbelastet";
			circuitImage.src = "/Pictures/Spannungsteiler_unbelastet.png";
			document.getElementById("unbelastet").style.display = "block";
			document.getElementById("belastet").style.display = "none";
		}
	});
	function calculateParametersURI() {
		let result = ``;
		const I = document.getElementById("I").value;
		const R = document.getElementById("R").value;
		const P = document.getElementById("P").value;
		const U = document.getElementById("U").value;
		if (U && R && !I && !P) {
			result += `
                Strom I = 
                <div class ="fraction">
                    <span class="fraction-numerator"> U </span><br>
                    <span>R</span>
                </div> 
            =
                <div class ="fraction">
                    <span class="fraction-numerator"> ${U}V </span><br>
                    <span>${R}&Omega;</span>
                </div> 
            = ${formatWithPrefix(parseInput(U) / parseInput(R), "A")}<br>

            Leistung P = 
                <div class ="fraction">
                    <span class="fraction-numerator"> U<sup>2</sup> </span><br>
                    <span>R</span>
                </div> 
            =
                <div class ="fraction">
                    <span class="fraction-numerator"> (${U}V)<sup>2</sup> </span><br>
                    <span>${R}&Omega;</span>
                </div> 
            = ${formatWithPrefix(Math.pow(parseInput(U), 2) / parseInput(R), "W")}<br>`;
		}
		if (P && U && !R && !I) {
			result += `
                Strom I = 
                <div class ="fraction">
                    <span class="fraction-numerator"> P </span><br>
                    <span>U</span>
                </div> 
            =
                <div class ="fraction">
                    <span class="fraction-numerator"> ${P}W </span><br>
                    <span>${U}V</span>
                </div> 
            = ${formatWithPrefix(parseInput(P) / parseInput(U), "A")}<br>

            Widerstand R = 
                <div class ="fraction">
                    <span class="fraction-numerator"> U<sup>2</sup> </span><br>
                    <span>P</span>
                </div> 
            =
                <div class ="fraction">
                    <span class="fraction-numerator"> (${U}V)<sup>2</sup> </span><br>
                    <span>${P}W</span>
                </div> 
            = ${formatWithPrefix(Math.pow(parseInput(U), 2) / parseInput(P), "&Omega;")}<br>`;
		}
		if (P && R && !I && !U) {
			result += `
                Strom I = 
                &radic;	<div class ="fraction">
                    <span class="fraction-numerator"> P </span><br>
                    <span>R</span>
                </div> 
            =
                &radic;	 <div class ="fraction">
                    <span class="fraction-numerator">${P}W </span><br>
                    <span>${R}&Omega;</span>
                </div> 
            = ${formatWithPrefix(Math.pow(parseInput(P) / parseInput(R), 0.5), "A")}<br>


            Spannung U =
                    &radic; P &times; R
                =
                    &radic; ${P}W &times; ${R}&Omega;
                = ${formatWithPrefix(Math.pow(parseInput(P) * parseInput(R), 0.5), "V")}<br>`;
		}
		if (I && R && !P && !U) {
			result += `
                    Spannung U =
                    I &times; R
                =
                    ${I}A &times; ${R}&Omega;
                = ${formatWithPrefix(parseInput(I) * parseInput(R), "V")}<br>

                Leistung P =
                    I<sup>2</sup> &times; R
                =
                    (${I}A)<sup>2</sup> &times; ${R}&Omega;
                = ${formatWithPrefix(Math.pow(parseInput(I), 2) * parseInput(R), "W")}<br>`;
		}
		if (P && I && !R && !U) {
			result += `
                Widerstand R = 
                <div class ="fraction">
                    <span class="fraction-numerator">P</span><br>
                    <span>I<sup>2</sup> </span>
                </div> 
            =
                <div class ="fraction">
                    <span class="fraction-numerator">  ${P}W</span><br>
                    <span>(${I}A)<sup>2</sup></span>
                </div> 
            = ${formatWithPrefix(parseInput(P) / Math.pow(parseInput(I), 2), "&Omega;")}<br>

            Spannung U = 
                <div class ="fraction">
                    <span class="fraction-numerator">P</span><br>
                    <span>I</span>
                </div> 
            =
                <div class ="fraction">
                    <span class="fraction-numerator">  ${P}W</span><br>
                    <span>${I}A</span>
                </div> 
            = ${formatWithPrefix(parseInput(P) / parseInput(I), "V")}<br>`;
		}
		if (U && I && !P && !R) {
			result += `
                    Leistung P =
                    U &times; I
                =
                    ${U}V &times; ${I}A;
                = ${formatWithPrefix(parseInput(U) * parseInput(I), "W")}<br>

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
            = ${formatWithPrefix(parseInput(U) / parseInput(I), "&Omega;")}<br>`;
		}
		setHTML(document.getElementById("result"), result);
	}
	function calculateUnb_Spannungsteiler() {
		return calculateDivider(document, false);
	}
	function calculateBel_Spannungsteiler() {
		return calculateDivider(document, true);
	}
	function toggleDropdown(element) {
		const dropdown = element.parentElement;
		dropdown.classList.toggle("open");
	}
	function selectOPV(opv, button) {
		const buttonGroup = button.closest("div");
		const buttons = buttonGroup.querySelectorAll(".opv-button");
		const inputFields = document.getElementById("inputFieldsSerieParallel");
		if (button.classList.contains("selected")) {
			button.classList.remove("selected");
			setHTML(inputFields, "");
			setHTML(document.getElementById("result_S_P"), "");
		} else {
			buttons.forEach((btn) => btn.classList.remove("selected"));
			button.classList.add("selected");
			let inputHTML = "";
			switch (opv) {
				case "serie_schaltung":
				case "parallel_schaltung":
					inputHTML = `
                        <div class="form-row">
                            <label>Widerstand R<sub>1</sub></label>
                            <input type="text" id="r1" style="border-color: var(--Widerstand);">
                            <label>&Omega; [Ohm]</label>
                        </div>
                        <div class="form-row">
                            <label>Widerstand R<sub>2</sub></label>
                            <input type="text" id="r2" style="border-color: var(--Widerstand);">
                            <label>&Omega; [Ohm]</label>
                        </div>
                        <input type="button" value="Berechnen" class="Button_Berechnen" data-ec-function="calculate" data-ec-arg="${opv}">
                        <br><br><div id="result_S_P"></div>
                    `;
					break;
				default:
					inputHTML = "";
			}
			setHTML(inputFields, inputHTML);
			setHTML(document.getElementById("result_S_P"), "");
		}
	}
	function calculate(opv) {
		let result_S_P = ``;
		const r1 = document.getElementById("r1").value;
		const r2 = document.getElementById("r2").value;
		if (opv === "serie_schaltung") {
			if (r1 && r2) {
				result_S_P += `
                        R<sub>ges</sub> = 
                        R<sub>1</sub> + R<sub>2</sub>
                    =
                        ${r1}&Omega; + ${r2}&Omega;
                    = ${formatWithPrefix(parseInput(r1) + parseInput(r2), "&Omega;")}<br>`;
			}
		}
		if (opv === "parallel_schaltung") {
			if (r1 && r2) {
				result_S_P += `
                    Widerstand R<sub>ges</sub> = 
                        <div class ="fraction">
                            <span >1</span><br>
                            <span class="fraction-denumerator"><!--class="fraction-denumerator"-->
                            <div style="border-top: 1px solid white;"><div class ="fraction">
                                <span >1</span><br>
                                <span class="fraction-denumerator">R<sub>1</sub></span>
                            </div>  
                        + 
                            <div class ="fraction">
                                <span >1</span><br>
                                <span class="fraction-denumerator">R<sub>2</sub></span>
                            </div></div> </span>
                        </div> 
                    =
                    <div class ="fraction">
                        <span >1</span><br>
                        <span class="fraction-denumerator"><!--class="fraction-denumerator"-->
                        <div style="border-top: 1px solid white;"><div class ="fraction">
                            <span >1</span><br>
                            <span class="fraction-denumerator">${r1}&Omega;</span>
                        </div>  
                    + 
                        <div class ="fraction">
                            <span >1</span><br>
                            <span class="fraction-denumerator">${r2}&Omega;</span>
                        </div></div> </span>
                    </div>
                    = ${formatWithPrefix(1 / (1 / parseInput(r1) + 1 / parseInput(r2)), "&Omega;")}<br>`;
			}
		}
		setHTML(document.getElementById("result_S_P"), result_S_P);
	}
	return {
		handlers: {
			calculateParametersURI,
			calculateUnb_Spannungsteiler,
			calculateBel_Spannungsteiler,
			toggleDropdown,
			selectOPV,
			calculate,
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
