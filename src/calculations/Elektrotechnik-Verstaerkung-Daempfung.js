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
		drawCurveDynamic,
		getBestSIPrefix,
		formatWithSIPrefix,
	} = createShared(scope);
	function calculateParameters() {
		let result = ``;
		const I1 = document.getElementById("I1").value;
		const I2 = document.getElementById("I2").value;
		const g = document.getElementById("g").value;
		const a = document.getElementById("a").value;
		const P1 = document.getElementById("P1").value;
		const P2 = document.getElementById("P2").value;
		const U1 = document.getElementById("U1").value;
		const U2 = document.getElementById("U2").value;
		const V = document.getElementById("V").value;
		const D = document.getElementById("D").value;
		if (!I1) {
			if (I2 && V) {
				result += `
                            Strom I<sub>1</sub> = 
                            <div class ="fraction">
                                <span class="fraction-numerator"> I<sub>2</sub> </span><br>
                                <span>V</span>
                            </div> 
                        =
                            <div class ="fraction">
                                <span class="fraction-numerator"> ${I2}A </span><br>
                                <span>${V}</span>
                            </div> 
                        = ${formatWithPrefix(parseInput(I2) / parseInput(V), "A")}<br>`;
			}
			if (I2 && D) {
				result += `
                            Strom I<sub>1</sub> = 
                            I<sub>2</sub> &times; D
                        =
                            ${I2}A &times; ${D}
                        = ${formatWithPrefix(parseInput(I2) * parseInput(D), "A")}<br>`;
			}
			if (U1 && P1) {
				result += `
                            Strom I<sub>1</sub> = 
                            <div class ="fraction">
                                <span class="fraction-numerator"> P<sub>1</sub> </span><br>
                                <span>U<sub>1</sub></span>
                            </div> 
                        =
                            <div class ="fraction">
                                <span class="fraction-numerator"> ${P1}W </span><br>
                                <span>${U1}V</span>
                            </div> 
                        = ${formatWithPrefix(parseInput(P1) / parseInput(U1), "A")}<br>`;
			}
			if (I2 && g) {
				result += `
                            Strom I<sub>1</sub> = 
                            I<sub>2</sub> &lowast; 10 <sup>(<div class ="fraction">
                                <span class="fraction-numerator"> -g </span><br>
                                <span>20</span>
                            </div>) </sup>
                        =
                            ${I2} &lowast; 10 <sup>(<div class ="fraction">
                                <span class="fraction-numerator"> -${g}dB </span><br>
                                <span>20</span>
                            </div>) </sup>
                        = ${formatWithPrefix(parseInput(I2) * Math.pow(10, -(parseInput(g) / 20)), "A")}<br>`;
			}
			if (I2 && a) {
				result += `
                            Strom I<sub>1</sub> = 
                            I<sub>2</sub> &lowast; 10 <sup>(<div class ="fraction">
                                <span class="fraction-numerator"> a </span><br>
                                <span>20</span>
                            </div>) </sup>
                        =
                            ${I2} &lowast; 10 <sup>(<div class ="fraction">
                                <span class="fraction-numerator"> ${a}dB </span><br>
                                <span>20</span>
                            </div>) </sup>
                        = ${formatWithPrefix(parseInput(I2) * Math.pow(10, parseInput(a) / 20), "A")}<br>`;
			}
		}
		if (!I2) {
			if (I1 && V) {
				result += `
                            Strom I<sub>2</sub> = 
                            I<sub>1</sub> &times; V
                        =
                            ${I1}A &times; ${V}
                        = ${formatWithPrefix(parseInput(I1) * parseInput(V), "A")}<br>`;
			}
			if (I1 && D) {
				result += `
                            Strom I<sub>2</sub> = 
                            <div class ="fraction">
                                <span class="fraction-numerator"> I<sub>1</sub> </span><br>
                                <span>D</span>
                            </div> 
                        =
                            <div class ="fraction">
                                <span class="fraction-numerator"> ${I1}A </span><br>
                                <span>${D}</span>
                            </div> 
                        = ${formatWithPrefix(parseInput(I1) / parseInput(D), "A")}<br>`;
			}
			if (U2 && P2) {
				result += `
                            Strom I<sub>1</sub> = 
                            <div class ="fraction">
                                <span class="fraction-numerator"> P<sub>2</sub> </span><br>
                                <span>U<sub>2</sub></span>
                            </div> 
                        =
                            <div class ="fraction">
                                <span class="fraction-numerator"> ${P2}W </span><br>
                                <span>${U2}V</span>
                            </div> 
                        = ${formatWithPrefix(parseInput(P2) / parseInput(U2), "A")}<br>`;
			}
			if (I1 && g) {
				result += `
                            Strom I<sub>2</sub> = 
                            I<sub>1</sub> &lowast; 10 <sup>(<div class ="fraction">
                                <span class="fraction-numerator"> g </span><br>
                                <span>20</span>
                            </div>) </sup>
                        =
                            ${I1} &lowast; 10 <sup>(<div class ="fraction">
                                <span class="fraction-numerator"> ${g}dB </span><br>
                                <span>20</span>
                            </div>) </sup>
                        = ${formatWithPrefix(parseInput(I1) * Math.pow(10, parseInput(g) / 20), "A")}<br>`;
			}
			if (I1 && a) {
				result += `
                            Strom I<sub>2</sub> = 
                            I<sub>1</sub> &lowast; 10 <sup>(<div class ="fraction">
                                <span class="fraction-numerator"> g </span><br>
                                <span>20</span>
                            </div>) </sup>
                        =
                            ${I1} &lowast; 10 <sup>(<div class ="fraction">
                                <span class="fraction-numerator"> -${a}dB </span><br>
                                <span>20</span>
                            </div>) </sup>
                        = ${formatWithPrefix(parseInput(I1) * Math.pow(10, -(parseInput(a) / 20)), "A")}<br>`;
			}
		}
		if (!g) {
			if (V) {
				result += `
                            Verst&auml;rkungsmass g = 
                            20 &times; log<sub>10</sub>(V)
                        =
                            20 &times; log<sub>10</sub>(${V})
                        = ${formatWithPrefix(20 * getlg(parseInput(V)), "dB")}<br>`;
			}
			if (D) {
				result += `
                            Verst&auml;rkungsmass g = 
                            20 &times; log<sub>10</sub> (<div class ="fraction">
                                <span class="fraction-numerator"> 1 </span><br>
                                <span>D</span> 
                            </div>)
                        =   20 &times; log<sub>10</sub>
                            (<div class ="fraction"> 
                                <span class="fraction-numerator"> 1 </span><br>
                                <span>${D}</span>   
                            </div>)
                        = ${formatWithPrefix(20 * getlg(1 / parseInput(D)), "dB")}<br>`;
			}
			if (a) {
				result += `
                            Verst&auml;rkungsmass g = 
                            - a
                         =  ${-a} dB<br>`;
			}
			if (I1 && I2) {
				result += `
                            Verst&auml;rkungsmass g<sub>I</sub> = 
                            20 &times; log<sub>10</sub> (<div class ="fraction">
                                <span class="fraction-numerator">I<sub>2</sub></span><br>
                                <span>I<sub>1</sub></span> 
                            </div>)
                        =   20 &times; log<sub>10</sub>
                            (<div class ="fraction"> 
                                <span class="fraction-numerator">${I2}A</span><br>
                                <span>${I1}A</span>   
                            </div>)
                        = ${formatWithPrefix(20 * getlg(parseInput(I2) / parseInput(I1)), "dB")}<br>`;
			}
			if (U1 && U2) {
				result += `
                            Verst&auml;rkungsmass g<sub>U</sub> = 
                            20 &times; log<sub>10</sub> (<div class ="fraction">
                                <span class="fraction-numerator">U<sub>2</sub></span><br>
                                <span>U<sub>1</sub></span> 
                            </div>)
                        =   20 &times; log<sub>10</sub>
                            (<div class ="fraction"> 
                                <span class="fraction-numerator">${U2}V</span><br>
                                <span>${U1}V</span>   
                            </div>)
                        = ${formatWithPrefix(20 * getlg(parseInput(U2) / parseInput(U1)), "dB")}<br>`;
			}
			if (P1 && P2) {
				result += `
                            Verst&auml;rkungsmass g<sub>P</sub> = 
                            10 &times; log<sub>10</sub> (<div class ="fraction">
                                <span class="fraction-numerator">P<sub>2</sub></span><br>
                                <span>P<sub>1</sub></span> 
                            </div>)
                        =   10 &times; log<sub>10</sub>
                            (<div class ="fraction"> 
                                <span class="fraction-numerator">${P2}W</span><br>
                                <span>${P1}W</span>   
                            </div>)
                        = ${formatWithPrefix(10 * getlg(parseInput(P2) / parseInput(P1)), "dB")}<br>`;
			}
		}
		if (!a) {
			if (D) {
				result += `
                            D&auml;mpfungsmass a = 
                            20 &times; log<sub>10</sub>(D)
                        =
                            20 &times; log<sub>10</sub>(${D})
                        = ${formatWithPrefix(20 * getlg(parseInput(D)), "dB")}<br>`;
			}
			if (V) {
				result += `
                            D&auml;mpfungsmass a = 
                            20 &times; log<sub>10</sub> ( <div class ="fraction">
                                <span class="fraction-numerator"> 1 </span><br>
                                <span>V</span> 
                            </div> )
                        =   20 &times; log<sub>10</sub>
                            ( <div class ="fraction"> 
                                <span class="fraction-numerator"> 1 </span><br>
                                <span>${V}</span>   
                            </div> )
                        = ${formatWithPrefix(20 * getlg(1 / parseInput(V)), "dB")}<br>`;
			}
			if (g) {
				result += `
                            D&auml;mpfungsmass a = 
                            - g
                         =  ${-g} dB<br>`;
			}
			if (I1 && I2) {
				result += `
                            D&auml;mpfungsmass a<sub>I</sub> = 
                            20 &times; log<sub>10</sub> ( <div class ="fraction">
                                <span class="fraction-numerator">I<sub>1</sub></span><br>
                                <span>I<sub>2</sub></span> 
                            </div> )
                        =   20 &times; log<sub>10</sub>
                            ( <div class ="fraction"> 
                                <span class="fraction-numerator">${I1}A</span><br>
                                <span>${I2}A</span>   
                            </div> )
                        = ${formatWithPrefix(20 * getlg(parseInput(I1) / parseInput(I2)), "dB")}<br>`;
			}
			if (U1 && U2) {
				result += `
                            D&auml;mpfungsmass a<sub>U</sub> = 
                            20 &times; log<sub>10</sub> (<div class ="fraction">
                                <span class="fraction-numerator">U<sub>1</sub></span><br>
                                <span>U<sub>2</sub></span> 
                            </div>)
                        =   20 &times; log<sub>10</sub>
                            (<div class ="fraction"> 
                                <span class="fraction-numerator">${U1}V</span><br>
                                <span>${U2}V</span>   
                            </div>)
                        = ${formatWithPrefix(20 * getlg(parseInput(U1) / parseInput(U2)), "dB")}<br>`;
			}
			if (P1 && P2) {
				result += `
                            D&auml;mpfungsmass a<sub>P</sub> = 
                            10 &times; log<sub>10</sub> (<div class ="fraction">
                                <span class="fraction-numerator">P<sub>1</sub></span><br>
                                <span>P<sub>2</sub></span> 
                            </div>)
                        =   10 &times; log<sub>10</sub>
                            (<div class ="fraction"> 
                                <span class="fraction-numerator">${P1}W</span><br>
                                <span>${P2}W</span>   
                            </div>)
                        = ${formatWithPrefix(10 * getlg(parseInput(P1) / parseInput(P2)), "dB")}<br>`;
			}
		}
		if (!U1) {
			if (U2 && V) {
				result += `
                            Spannung U<sub>1</sub> = 
                            <div class ="fraction">
                                <span class="fraction-numerator"> U<sub>2</sub> </span><br>
                                <span>V</span>
                            </div> 
                        =
                            <div class ="fraction">
                                <span class="fraction-numerator"> ${U2}V </span><br>
                                <span>${V}</span>
                            </div> 
                        = ${formatWithPrefix(parseInput(U2) / parseInput(V), "V")}<br>`;
			}
			if (U2 && D) {
				result += `
                            Spannung U<sub>1</sub> = 
                            I<sub>2</sub> &times; D
                        =
                            ${U2}V &times; ${D}
                        = ${formatWithPrefix(parseInput(U2) * parseInput(D), "V")}<br>`;
			}
			if (I1 && P1) {
				result += `
                            Spannung U<sub>1</sub> = 
                            <div class ="fraction">
                                <span class="fraction-numerator"> P<sub>1</sub> </span><br>
                                <span>I<sub>1</sub></span>
                            </div> 
                        =
                            <div class ="fraction">
                                <span class="fraction-numerator"> ${P1}W </span><br>
                                <span>${I1}A</span>
                            </div> 
                        = ${formatWithPrefix(parseInput(P1) / parseInput(I1), "V")}<br>`;
			}
		}
		if (!U2) {
			if (U1 && V) {
				result += `
                            Spannung U<sub>2</sub> = 
                            U<sub>1</sub> &times; V
                        =
                            ${U1}V &times; ${V}
                        = ${formatWithPrefix(parseInput(U1) * parseInput(V), "V")}<br>`;
			}
			if (U1 && D) {
				result += `
                            Spannung U<sub>2</sub> = 
                            <div class ="fraction">
                                <span class="fraction-numerator"> U<sub>1</sub> </span><br>
                                <span>D</span>
                            </div> 
                        =
                            <div class ="fraction">
                                <span class="fraction-numerator"> ${U1}V </span><br>
                                <span>${D}</span>
                            </div> 
                        = ${formatWithPrefix(parseInput(U1) / parseInput(D), "V")}<br>`;
			}
			if (I2 && P2) {
				result += `
                            Spannung U<sub>2</sub> = 
                            <div class ="fraction">
                                <span class="fraction-numerator"> P<sub>2</sub> </span><br>
                                <span>I<sub>2</sub></span>
                            </div> 
                        =
                            <div class ="fraction">
                                <span class="fraction-numerator"> ${P2}W </span><br>
                                <span>${I2}V</span>
                            </div> 
                        = ${formatWithPrefix(parseInput(P2) / parseInput(I2), "V")}<br>`;
			}
			if (U1 && g) {
				result += `
                            Spannung U<sub>2</sub> = 
                            U<sub>1</sub> &lowast; 10 <sup>(<div class ="fraction">
                                <span class="fraction-numerator"> g </span><br>
                                <span>20</span>
                            </div>) </sup>
                        =
                            ${U1}V &lowast; 10 <sup>(<div class ="fraction">
                                <span class="fraction-numerator"> ${g}dB </span><br>
                                <span>20</span>
                            </div>) </sup>
                        = ${formatWithPrefix(parseInput(U1) * Math.pow(10, parseInput(g) / 20), "V")}<br>`;
			}
			if (U1 && a) {
				result += `
                            Spannung U<sub>2</sub> = 
                            U<sub>1</sub> &lowast; 10 <sup>(<div class ="fraction">
                                <span class="fraction-numerator"> a </span><br>
                                <span>20</span>
                            </div>) </sup>
                        =
                            ${U1} &lowast; 10 <sup>(<div class ="fraction">
                                <span class="fraction-numerator"> -${a}dB </span><br>
                                <span>20</span>
                            </div>) </sup>
                        = ${formatWithPrefix(parseInput(U1) * Math.pow(10, -(parseInput(a) / 20)), "V")}<br>`;
			}
		}
		if (!P1) {
			if (P2 && V) {
				result += `
                            Leistung P<sub>1</sub> = 
                            <div class ="fraction">
                                <span class="fraction-numerator"> P<sub>2</sub> </span><br>
                                <span>V</span>
                            </div> 
                        =
                            <div class ="fraction">
                                <span class="fraction-numerator"> ${P2}W </span><br>
                                <span>${V}</span>
                            </div> 
                        = ${formatWithPrefix(parseInput(P2) / parseInput(V), "W")}<br>`;
			}
			if (P2 && D) {
				result += `
                            Leistung P<sub>1</sub> = 
                            P<sub>2</sub> &times; D
                        =
                            ${P2}W &times; ${D}
                        = ${formatWithPrefix(parseInput(P2) * parseInput(D), "W")}<br>`;
			}
			if (I1 && U1) {
				result += `
                            Leistung P<sub>1</sub> = 
                            U<sub>1</sub> &times; I<sub>1</sub>
                        =
                            ${U1}V &times; ${I1}A
                        = ${formatWithPrefix(parseInput(U1) * parseInput(I1), "W")}<br>`;
			}
		}
		if (!P2) {
			if (P1 && V) {
				result += `
                            Leistung P<sub>2</sub> = 
                            P<sub>1</sub> &times; V
                        =
                            ${P1}W &times; ${V}
                        = ${formatWithPrefix(parseInput(P1) * parseInput(V), "W")}<br>`;
			}
			if (P1 && D) {
				result += `
                            Leistung P<sub>2</sub> = 
                            <div class ="fraction">
                                <span class="fraction-numerator"> P<sub>1</sub> </span><br>
                                <span>D</span>
                            </div> 
                        =
                            <div class ="fraction">
                                <span class="fraction-numerator"> ${P1}W </span><br>
                                <span>${D}</span>
                            </div> 
                        = ${formatWithPrefix(parseInput(P1) / parseInput(D), "W")}<br>`;
			}
			if (I2 && U2) {
				result += `
                            Leistung P<sub>2</sub> = 
                            U<sub>2</sub> &times; I<sub>2</sub>
                        =
                            ${U2}V &times; ${I2}A
                        = ${formatWithPrefix(parseInput(U2) * parseInput(I2), "W")}<br>`;
			}
			if (P1 && g) {
				result += `
                            Leistung P<sub>2</sub> = 
                            P<sub>1</sub> &lowast; 10 <sup>(<div class ="fraction">
                                <span class="fraction-numerator"> g </span><br>
                                <span>10</span>
                            </div>) </sup>
                        =
                            ${P1}W &lowast; 10 <sup>(<div class ="fraction">
                                <span class="fraction-numerator"> ${g}dB </span><br>
                                <span>10</span>
                            </div>) </sup>
                        = ${formatWithPrefix(parseInput(P1) * Math.pow(10, parseInput(g) / 10), "W")}<br>`;
			}
			if (P1 && a) {
				result += `
                            Leistung P<sub>2</sub> = 
                            P<sub>1</sub> &lowast; 10 <sup>(<div class ="fraction">
                                <span class="fraction-numerator"> -a </span><br>
                                <span>10</span>
                            </div>) </sup>
                        =
                            ${P1}W &lowast; 10 <sup>(<div class ="fraction">
                                <span class="fraction-numerator"> ${-a}dB </span><br>
                                <span>10</span>
                            </div>) </sup>
                        = ${formatWithPrefix(parseInput(P1) * Math.pow(10, -(parseInput(a) / 10)), "W")}<br>`;
			}
		}
		if (!V) {
			if (I1 && I2) {
				result += `
                            Verst&auml;rkungsfaktor V<sub>I</sub> = 
                            <div class ="fraction">
                                <span class="fraction-numerator"> I<sub>2</sub> </span><br>
                                <span>I<sub>1</sub></span>
                            </div> 
                        =
                            <div class ="fraction">
                                <span class="fraction-numerator"> ${I2}A </span><br>
                                <span>${I1}A</span>
                            </div> 
                        = ${formatWithPrefix(parseInput(I2) / parseInput(I1), "")}<br>`;
			}
			if (U1 && U2) {
				result += `
                            Verst&auml;rkungsfaktor V<sub>U</sub> = 
                            <div class ="fraction">
                                <span class="fraction-numerator"> U<sub>2</sub> </span><br>
                                <span>U<sub>1</sub></span>
                            </div> 
                        =
                            <div class ="fraction">
                                <span class="fraction-numerator"> ${U2}V </span><br>
                                <span>${U1}V</span>
                            </div> 
                        = ${formatWithPrefix(parseInput(U2) / parseInput(U1), "")}<br>`;
			}
			if (P1 && P2) {
				result += `
                            Verst&auml;rkungsfaktor V<sub>P</sub> = 
                            <div class ="fraction">
                                <span class="fraction-numerator"> P<sub>2</sub> </span><br>
                                <span>P<sub>1</sub></span>
                            </div> 
                        =
                            <div class ="fraction">
                                <span class="fraction-numerator"> ${P2}W </span><br>
                                <span>${P1}W</span>
                            </div> 
                        = ${formatWithPrefix(parseInput(P2) / parseInput(P1), "")}<br>`;
			}
		}
		if (!D) {
			if (I1 && I2) {
				result += `
                            D&auml;mpfungsfaktor D<sub>I</sub> = 
                            <div class ="fraction">
                                <span class="fraction-numerator"> I<sub>1</sub> </span><br>
                                <span>I<sub>2</sub></span>
                            </div> 
                        =
                            <div class ="fraction">
                                <span class="fraction-numerator"> ${I1}A </span><br>
                                <span>${I2}A</span>
                            </div> 
                        = ${formatWithPrefix(parseInput(I1) / parseInput(I2), "")}<br>`;
			}
			if (U1 && U2) {
				result += `
                            D&auml;mpfungsfaktor D<sub>U</sub> = 
                            <div class ="fraction">
                                <span class="fraction-numerator"> U<sub>1</sub> </span><br>
                                <span>U<sub>2</sub></span>
                            </div> 
                        =
                            <div class ="fraction">
                                <span class="fraction-numerator"> ${U1}V </span><br>
                                <span>${U2}V</span>
                            </div> 
                        = ${formatWithPrefix(parseInput(U1) / parseInput(U2), "")}<br>`;
			}
			if (P1 && P2) {
				result += `
                            D&auml;mpfungsfaktor D<sub>P</sub> = 
                            <div class ="fraction">
                                <span class="fraction-numerator"> P<sub>1</sub> </span><br>
                                <span>P<sub>2</sub></span>
                            </div> 
                        =
                            <div class ="fraction">
                                <span class="fraction-numerator"> ${P1}W </span><br>
                                <span>${P2}W</span>
                            </div> 
                        = ${formatWithPrefix(parseInput(P1) / parseInput(P2), "")}<br>`;
			}
		}
		setHTML(document.getElementById("result"), result);
	}
	function getlg(x) {
		return Math.log(x) / Math.log(10);
	}
	return {
		handlers: {
			calculateParameters,
			getlg,
			changeSlide,
			showSlides,
			formatPrefixNoUnit,
			formatPrefixNoUnitSquare,
			formatWithPrefix,
			formatWithPrefixsquare,
			drawCurveDynamic,
			getBestSIPrefix,
			formatWithSIPrefix,
			parseInput,
			parseInputsquare,
		},
		dispose() {},
	};
}
