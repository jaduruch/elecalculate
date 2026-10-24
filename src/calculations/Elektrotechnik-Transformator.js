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
		let pervResult = `1`;
		let I1 = document.getElementById("I1").value;
		let I2 = document.getElementById("I2").value;
		let R1 = document.getElementById("R1").value;
		let R2 = document.getElementById("R2").value;
		let P1 = document.getElementById("P1").value;
		let P2 = document.getElementById("P2").value;
		let N1 = document.getElementById("N1").value;
		let N2 = document.getElementById("N2").value;
		let C1 = document.getElementById("C1").value;
		let C2 = document.getElementById("C2").value;
		let U1 = document.getElementById("U1").value;
		let U2 = document.getElementById("U2").value;
		let ue = document.getElementById("ue").value;
		let eta = document.getElementById("eta").value;
		while (pervResult != result) {
			pervResult = result;
			if (!ue && U1 && U2) {
				ue = formatPrefixNoUnit(parseInput(U1) / parseInput(U2));
				result += `
                        &Uuml;bersetzungsverh&auml;ltnis &uuml; = 
                        <div class ="fraction">
                            <span class="fraction-numerator">U<sub>1</sub></span><br>
                            <span>U<sub>2</sub></span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator"> ${U1}V</span><br>
                            <span>${U2}V</span>
                        </div> 
                    = ${ue}<br>`;
			}
			if (!ue && N1 && N2) {
				ue = formatPrefixNoUnit(parseInput(N1) / parseInput(N2));
				result += `
                        &Uuml;bersetzungsverh&auml;ltnis &uuml; = 
                        <div class ="fraction">
                            <span class="fraction-numerator">N<sub>1</sub></span><br>
                            <span>N<sub>2</sub></span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator"> ${N1}</span><br>
                            <span>${N2}</span>
                        </div> 
                    = ${ue}<br>`;
			}
			if (!ue && I1 && I2) {
				ue = formatPrefixNoUnit(parseInput(I2) / parseInput(I1));
				result += `
                        &Uuml;bersetzungsverh&auml;ltnis &uuml; = 
                        <div class ="fraction">
                            <span class="fraction-numerator">I<sub>2</sub></span><br>
                            <span>I<sub>1</sub></span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator"> ${I2}A</span><br>
                            <span>${I1}A</span>
                        </div> 
                    = ${ue}<br>`;
			}
			if (!ue && R1 && R2) {
				ue = formatPrefixNoUnit(Math.pow(parseInput(R1) / parseInput(R2), 0.5));
				result += `
                        &Uuml;bersetzungsverh&auml;ltnis &uuml; = 
                        &radic;(<div class ="fraction">
                            <span class="fraction-numerator">R<sub>1</sub></span><br>
                            <span>R<sub>2</sub></span>
                        </div>) 
                    =
                        &radic;(<div class ="fraction">
                            <span class="fraction-numerator"> ${R1}&Omega;</span><br>
                            <span>${R2}&Omega;</span>
                        </div>)
                    = ${ue}<br>`;
			}
			if (!ue && C1 && C2) {
				ue = formatPrefixNoUnit(Math.pow(parseInput(C1) / parseInput(C2), 0.5));
				result += `
                        &Uuml;bersetzungsverh&auml;ltnis &uuml; = 
                        &radic;(<div class ="fraction">
                            <span class="fraction-numerator">C<sub>1</sub></span><br>
                            <span>C<sub>2</sub></span>
                        </div>) 
                    =
                        &radic;(<div class ="fraction">
                            <span class="fraction-numerator"> ${C1}F</span><br>
                            <span>${C2}F</span>
                        </div>)
                    = ${ue}<br>`;
			}
			if (!I1 && ue && I2) {
				I1 = formatPrefixNoUnit(parseInput(I2) / parseInput(ue));
				result += `
                        Strom I<sub>1</sub> = 
                        <div class ="fraction">
                            <span class="fraction-numerator">I<sub>2</sub></span><br>
                            <span>&uuml;</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator"> ${I2}A</span><br>
                            <span>${ue}</span>
                        </div> 
                    = ${I1}A<br>`;
			}
			if (!I1 && U1 && R1) {
				I1 = formatPrefixNoUnit(parseInput(U1) / parseInput(R1));
				result += `
                        Strom I<sub>1</sub> = 
                        <div class ="fraction">
                            <span class="fraction-numerator">U<sub>1</sub></span><br>
                            <span>R<sub>1</sub></span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator"> ${U1}V</span><br>
                            <span>${R1}&Omega;</span>
                        </div> 
                    = ${I1}A<br>`;
			}
			if (!I1 && P1 && U1) {
				I1 = formatPrefixNoUnit(parseInput(P1) / parseInput(U1));
				result += `
                        Strom I<sub>1</sub> = 
                        <div class ="fraction">
                            <span class="fraction-numerator">P<sub>1</sub></span><br>
                            <span>U<sub>1</sub></span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator"> ${P1}W</span><br>
                            <span>${U1}V</span>
                        </div> 
                    = ${I1}A<br>`;
			}
			if (!I1 && P1 && R1) {
				I1 = formatPrefixNoUnit(Math.pow(parseInput(P1) / parseInput(R1), 0.5));
				result += `
                        Strom I<sub>1</sub> = 
                        &radic;	<div class ="fraction">
                            <span class="fraction-numerator"> P<sub>1</sub> </span><br>
                            <span>R<sub>1</sub></span>
                        </div> 
                    =
                        &radic;	 <div class ="fraction">
                            <span class="fraction-numerator">${P1}W </span><br>
                            <span>${R1}&Omega;</span>
                        </div> 
                    = ${I1}A<br>`;
			}
			if (!I2 && ue && I1) {
				I2 = formatPrefixNoUnit(parseInput(I1) * parseInput(ue));
				result += `
                        Strom I<sub>2</sub> =  
                        I<sub>1</sub> &lowast; &uuml;
                    =
                        ${I1}V &lowast; ${ue}
                    = ${I2}A<br>`;
			}
			if (!I2 && U2 && R2) {
				I2 = formatPrefixNoUnit(parseInput(U2) / parseInput(R2));
				result += `
                        Strom I<sub>2</sub> = 
                        <div class ="fraction">
                            <span class="fraction-numerator">U<sub>2</sub></span><br>
                            <span>R<sub>2</sub></span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator"> ${U2}V</span><br>
                            <span>${R2}&Omega;</span>
                        </div> 
                    = ${I2}A<br>`;
			}
			if (!I2 && P2 && U2) {
				I2 = formatPrefixNoUnit(parseInput(P2) / parseInput(U2));
				result += `
                        Strom I<sub>2</sub> = 
                        <div class ="fraction">
                            <span class="fraction-numerator">P<sub>2</sub></span><br>
                            <span>U<sub>2</sub></span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator"> ${P2}W</span><br>
                            <span>${U2}V</span>
                        </div> 
                    = ${I2}A<br>`;
			}
			if (!I2 && P2 && R2) {
				I2 = formatPrefixNoUnit(Math.pow(parseInput(P2) / parseInput(R2), 0.5));
				result += `
                        Strom I<sub>2</sub> = 
                        &radic;	<div class ="fraction">
                            <span class="fraction-numerator"> P<sub>2</sub> </span><br>
                            <span>R<sub>2</sub></span>
                        </div> 
                    =
                        &radic;	 <div class ="fraction">
                            <span class="fraction-numerator">${P2}W </span><br>
                            <span>${R2}&Omega;</span>
                        </div> 
                    = ${I2}A<br>`;
			}
			if (!U1 && ue && U2) {
				U1 = formatPrefixNoUnit(parseInput(U2) * parseInput(ue));
				result += `
                        Spannung U<sub>1</sub> = 
                        U<sub>2</sub> &lowast; &uuml;
                    =
                        ${U2}V &lowast; ${ue}
                    = ${U1}V<br>`;
			}
			if (!U1 && I1 && R1) {
				U1 = formatPrefixNoUnit(parseInput(I1) * parseInput(R1));
				result += `
                        Spannung U<sub>1</sub> = 
                        I<sub>1</sub> &lowast; R<sub>1</sub>
                    =
                        ${I1}A &lowast; ${R1}&Omega;
                    = ${U1}V<br>`;
			}
			if (!U1 && P1 && I1) {
				U1 = formatPrefixNoUnit(parseInput(P1) / parseInput(I1));
				result += `
                        Spannung U<sub>1</sub> = 
                        <div class ="fraction">
                            <span class="fraction-numerator">P<sub>1</sub></span><br>
                            <span>I<sub>1</sub></span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator"> ${P1}W</span><br>
                            <span>${I1}A</span>
                        </div> 
                    = ${U1}V<br>`;
			}
			if (!U1 && R1 && P1) {
				U1 = formatPrefixNoUnit(Math.pow(parseInput(P1) * parseInput(R1), 0.5));
				result += `
                    Spannung U<sub>1</sub> =
                        &radic; P<sub>1</sub> &lowast; R<sub>1</sub>
                    =
                        &radic; ${P1}W &lowast; ${R1}&Omega;
                    = ${U1}V<br>`;
			}
			if (!U2 && ue && U1) {
				U2 = formatPrefixNoUnit(parseInput(U1) / parseInput(ue));
				result += `
                        Spannung U<sub>2</sub> = 
                        <div class ="fraction">
                            <span class="fraction-numerator">U<sub>1</sub></span><br>
                            <span>&uuml;</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator"> ${U1}V</span><br>
                            <span>${ue}</span>
                        </div> 
                    = ${U2}V<br>`;
			}
			if (!U2 && I2 && R2) {
				U2 = formatPrefixNoUnit(parseInput(I2) * parseInput(R2));
				result += `
                        Spannung U<sub>2</sub> = 
                        I<sub>2</sub> &lowast; R<sub>2</sub>
                    =
                        ${I2}A &lowast; ${R2}&Omega;
                    = ${U2}V<br>`;
			}
			if (!U2 && P2 && I2) {
				U2 = formatPrefixNoUnit(parseInput(P2) / parseInput(I2));
				result += `
                        Spannung U<sub>2</sub> = 
                        <div class ="fraction">
                            <span class="fraction-numerator">P<sub>2</sub></span><br>
                            <span>I<sub>2</sub></span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator"> ${P2}W</span><br>
                            <span>${I2}A</span>
                        </div> 
                    = ${U2}V<br>`;
			}
			if (!U2 && R2 && P2) {
				U2 = formatPrefixNoUnit(Math.pow(parseInput(P2) * parseInput(R2), 0.5));
				result += `
                    Spannung U<sub>1</sub> =
                        &radic; P<sub>2</sub> &lowast; R<sub>2</sub>
                    =
                        &radic; ${P2}W &lowast; ${R2}&Omega;
                    = ${U2}V<br>`;
			}
			if (!P1 && P2 && eta) {
				P1 = formatPrefixNoUnit(parseInput(P2) / parseInput(eta));
				result += `
                        Leistung P<sub>1</sub> = 
                        <div class ="fraction">
                            <span class="fraction-numerator">P<sub>2</sub></span><br>
                            <span>&eta;</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator"> ${P2}W</span><br>
                            <span>${eta}</span>
                        </div> 
                    = ${P1}W<br>`;
			}
			if (!P1 && U1 && I1) {
				P1 = formatPrefixNoUnit(parseInput(U1) * parseInput(I1));
				result += `
                        Leistung P<sub>1</sub> = 
                        U<sub>1</sub> &lowast; I<sub>1</sub>
                    =
                        ${U1}V &lowast; ${I1}A
                    = ${P1}W<br>`;
			}
			if (!P1 && U1 && R1) {
				P1 = formatPrefixNoUnit(Math.pow(parseInput(U1), 2) / parseInput(R1));
				result += `
                    Leistung P<sub>1</sub> = 
                        <div class ="fraction">
                            <span class="fraction-numerator"> U<sub>1</sub><sup>2</sup> </span><br>
                            <span>R<sub>1</sub></span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator"> (${U1}V)<sup>2</sup> </span><br>
                            <span>${R1}&Omega;</span>
                        </div> 
                    = ${P1}W<br>`;
			}
			if (!P1 && I1 && R1) {
				P1 = formatPrefixNoUnit(Math.pow(parseInput(I1), 2) * parseInput(R1));
				result += `
                    Leistung P<sub>1</sub> =
                        I<sub>1</sub><sup>2</sup> &lowast; R<sub>1</sub>
                    =
                        (${I1}A)<sup>2</sup> &lowast; ${R1}&Omega;
                    = ${P1}W<br>`;
			}
			if (!P2 && P1 && eta) {
				P2 = formatPrefixNoUnit(parseInput(P1) * parseInput(eta));
				result += `
                        Leistung P<sub>2</sub> = 
                        P<sub>1</sub> &lowast; &eta;
                    =
                        ${P1}W &lowast; ${eta}
                    = ${P2}W<br>`;
			}
			if (!P2 && U2 && I2) {
				P2 = formatPrefixNoUnit(parseInput(U2) * parseInput(I2));
				result += `
                        Leistung P<sub>2</sub> = 
                        U<sub>2</sub> &lowast; I<sub>2</sub>
                    =
                        ${U2}V &lowast; ${I2}A
                    = ${P2}W<br>`;
			}
			if (!P2 && U2 && R2) {
				P2 = formatPrefixNoUnit(Math.pow(parseInput(U2), 2) / parseInput(R2));
				result += `
                    Leistung P<sub>2</sub> = 
                        <div class ="fraction">
                            <span class="fraction-numerator"> U<sub>2</sub><sup>2</sup> </span><br>
                            <span>R<sub>2</sub></span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator"> (${U2}V)<sup>2</sup> </span><br>
                            <span>${R2}&Omega;</span>
                        </div> 
                    = ${P2}W<br>`;
			}
			if (!P2 && I2 && R2) {
				P2 = formatPrefixNoUnit(Math.pow(parseInput(I2), 2) * parseInput(R2));
				result += `
                    Leistung P<sub>2</sub> =
                        I<sub>2</sub><sup>2</sup> &lowast; R<sub>2</sub>
                    =
                        (${I2}A)<sup>2</sup> &lowast; ${R2}&Omega;
                    = ${P2}W<br>`;
			}
			if (!eta && P1 && P2 && parseInput(P1) > parseInput(P2)) {
				eta = formatPrefixNoUnit(parseInput(P2) / parseInput(P1));
				result += `
                        Wirkungsgrad &eta; = 
                        <div class ="fraction">
                            <span class="fraction-numerator">P<sub>2</sub></span><br>
                            <span>P<sub>1</sub></span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator"> ${P2}W</span><br>
                            <span>${P1}W</span>
                        </div> 
                    = ${eta} = ${parseInput(eta) * 100}%<br>`;
			}
			if (!R1 && U1 && I1) {
				R1 = formatPrefixNoUnit(parseInput(U1) / parseInput(I1));
				result += `
                        Widerstand R<sub>1</sub> = 
                        <div class ="fraction">
                            <span class="fraction-numerator">U<sub>1</sub></span><br>
                            <span>I<sub>1</sub></span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator"> ${U1}V</span><br>
                            <span>${I1}A</span>
                        </div> 
                    = ${R1}&Omega;<br>`;
			}
			if (!R1 && ue && R2) {
				R1 = formatPrefixNoUnit(parseInput(R2) * Math.pow(parseInput(ue), 2));
				result += `
                        Widerstand R<sub>1</sub> = 
                        R<sub>2</sub> &lowast; &uuml;<sup>2</sup>
                    =
                        ${R2}&Omega; &lowast; ${ue}<sup>2</sup>
                    = ${R1}&Omega;<br>`;
			}
			if (!R1 && P1 && I1) {
				R1 = formatPrefixNoUnit(parseInput(P1) / Math.pow(parseInput(I1), 2));
				result += `
                        Widerstand R<sub>1</sub> = 
                        <div class ="fraction">
                            <span class="fraction-numerator">P<sub>1</sub></span><br>
                            <span>I<sub>1</sub><sup>2</sup> </span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator">  ${P1}W</span><br>
                            <span>(${I1}A)<sup>2</sup></span>
                        </div> 
                    = ${R1}&Omega;<br>`;
			}
			if (!R1 && U1 && P1) {
				R1 = formatPrefixNoUnit(Math.pow(parseInput(U1), 2) / parseInput(P1));
				result += `
                        Widerstand R<sub>1</sub> = 
                        <div class ="fraction">
                            <span class="fraction-numerator"> U<sub>1</sub><sup>2</sup> </span><br>
                            <span>P<sub>1</sub></span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator"> (${U1}V)<sup>2</sup> </span><br>
                            <span>${P1}W</span>
                        </div> 
                    = ${R1}&Omega;<br>`;
			}
			if (!R2 && U2 && I2) {
				R2 = formatPrefixNoUnit(parseInput(U2) / parseInput(I2));
				result += `
                        Widerstand R<sub>2</sub> = 
                        <div class ="fraction">
                            <span class="fraction-numerator">U<sub>2</sub></span><br>
                            <span>I<sub>2</sub></span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator"> ${U2}V</span><br>
                            <span>${I2}A</span>
                        </div> 
                    = ${R2}&Omega;<br>`;
			}
			if (!R2 && ue && R1) {
				R2 = formatPrefixNoUnit(parseInput(R1) / Math.pow(parseInput(ue), 2));
				result += `
                        Widerstand R<sub>2</sub> = 
                        <div class ="fraction">
                            <span class="fraction-numerator">R<sub>1</sub></span><br>
                            <span>&uuml;<sup>2</sup></span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator"> ${R1}&Omega;</span><br>
                            <span>${ue}<sup>2</sup></span>
                        </div> 
                    = ${R2}&Omega;<br>`;
			}
			if (!R2 && P2 && I2) {
				R2 = formatPrefixNoUnit(parseInput(P2) / Math.pow(parseInput(I2), 2));
				result += `
                        Widerstand R<sub>2</sub> = 
                        <div class ="fraction">
                            <span class="fraction-numerator">P<sub>2</sub></span><br>
                            <span>I<sub>2</sub><sup>2</sup> </span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator">  ${P2}W</span><br>
                            <span>(${I2}A)<sup>2</sup></span>
                        </div> 
                    = ${R2}&Omega;<br>`;
			}
			if (!R2 && U2 && P2) {
				R2 = formatPrefixNoUnit(Math.pow(parseInput(U2), 2) / parseInput(P2));
				result += `
                        Widerstand R<sub>2</sub> = 
                        <div class ="fraction">
                            <span class="fraction-numerator"> U<sub>2</sub><sup>2</sup> </span><br>
                            <span>P<sub>2</sub></span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator"> (${U2}V)<sup>2</sup> </span><br>
                            <span>${P2}W</span>
                        </div> 
                    = ${R2}&Omega;<br>`;
			}
			if (!C1 && ue && C2) {
				C1 = formatPrefixNoUnit(parseInput(C2) / Math.pow(parseInput(ue), 2));
				result += `
                        Kondensator C<sub>1</sub> = 
                        <div class ="fraction">
                            <span class="fraction-numerator">C<sub>2</sub></span><br>
                            <span>&uuml;<sup>2</sup></span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator"> ${C2}&Omega;</span><br>
                            <span>${ue}<sup>2</sup></span>
                        </div> 
                    = ${C1}F<br>`;
			}
			if (!C2 && ue && C1) {
				C2 = formatPrefixNoUnit(parseInput(C1) * Math.pow(parseInput(ue), 2));
				result += `
                        Kondensator C<sub>2</sub> = 
                        C<sub>1</sub> &lowast; &uuml;<sup>2</sup>
                    =
                        ${C1}&Omega; &lowast; ${ue}<sup>2</sup>
                    = ${C2}F<br>`;
			}
			if (!N1 && ue && N2) {
				N1 = formatPrefixNoUnit(parseInput(N2) * parseInput(ue));
				result += `
                        Windungszahl N<sub>1</sub> = 
                        N<sub>2</sub> &lowast; &uuml;
                    =
                        ${N2} &lowast; ${ue}
                    = ${N1}<br>`;
			}
			if (!N2 && ue && N1) {
				N2 = formatPrefixNoUnit(parseInput(N1) / parseInput(ue));
				result += `
                        Windungszahl N<sub>2</sub> = 
                        <div class ="fraction">
                            <span class="fraction-numerator">N<sub>1</sub></span><br>
                            <span>&uuml;</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator"> ${N1}</span><br>
                            <span>${ue}</span>
                        </div> 
                    = ${N2}<br>`;
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
