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
			if (sectionId === "invertierender_Verstaerker") {
				document.getElementById("invertierender_Verstaerker").style.display =
					"block";
				document.getElementById(
					"nicht_invertierender_Verstaerker",
				).style.display = "none";
				document.getElementById("summier_Verstaerker").style.display = "none";
				document.getElementById("differenz_Verstaerker").style.display = "none";
			} else if (sectionId === "nicht_invertierender_Verstaerker") {
				document.getElementById("invertierender_Verstaerker").style.display =
					"none";
				document.getElementById(
					"nicht_invertierender_Verstaerker",
				).style.display = "block";
				document.getElementById("summier_Verstaerker").style.display = "none";
				document.getElementById("differenz_Verstaerker").style.display = "none";
			} else if (sectionId === "summier_Verstaerker") {
				document.getElementById("invertierender_Verstaerker").style.display =
					"none";
				document.getElementById(
					"nicht_invertierender_Verstaerker",
				).style.display = "none";
				document.getElementById("summier_Verstaerker").style.display = "block";
				document.getElementById("differenz_Verstaerker").style.display = "none";
			} else if (sectionId === "differenz_Verstaerker") {
				document.getElementById("invertierender_Verstaerker").style.display =
					"none";
				document.getElementById(
					"nicht_invertierender_Verstaerker",
				).style.display = "none";
				document.getElementById("summier_Verstaerker").style.display = "none";
				document.getElementById("differenz_Verstaerker").style.display =
					"block";
			}
		}
	}
	function updateImage1(newSrc) {
		const imageElement = document.getElementById("opvImage1");
		if (imageElement) {
			imageElement.src = newSrc;
		}
	}
	function updateImage2(newSrc) {
		const imageElement = document.getElementById("opvImage2");
		if (imageElement) {
			imageElement.src = newSrc;
		}
	}
	function updateImage3(newSrc) {
		const imageElement = document.getElementById("opvImage3");
		if (imageElement) {
			imageElement.src = newSrc;
		}
	}
	function updateImage4(newSrc) {
		const imageElement = document.getElementById("opvImage4");
		if (imageElement) {
			imageElement.src = newSrc;
		}
	}
	function calculate_invertierender_Verstaerker() {
		let result_invertierender_Verstaerker = ``;
		const R1 = document.getElementById("R1-1").value;
		const R2 = document.getElementById("R2-1").value;
		const Uin = document.getElementById("Uin-1").value;
		const Uout = document.getElementById("Uout-1").value;
		const V = document.getElementById("V-1").value;
		if (!V) {
			if (R1 && R2) {
				result_invertierender_Verstaerker += `
                                Verst&auml;rkung V = -
                                <div class ="fraction">
                                    <span class="fraction-numerator"> R2 </span><br>
                                    <span>R1</span>
                                </div> 
                            = - 
                                <div class ="fraction">
                                    <span class="fraction-numerator"> ${R2}&Omega; </span><br>
                                    <span>${R1}&Omega;</span>
                                </div> 
                            
                            = -${formatWithPrefix(parseInput(R2) / parseInput(R1), "")}<br>`;
			}
			if (Uout && Uin) {
				result_invertierender_Verstaerker += `
                             Verst&auml;rkung V = 
                             <div class ="fraction">
                                    <span class="fraction-numerator"> -Uout </span><br>
                                    <span>Uin</span>
                                </div> 
                            =
                                <div class ="fraction">
                                    <span class="fraction-numerator"> -${Uout}V </span><br>
                                    <span>${Uin}V</span>
                                </div> 
                            = -${formatWithPrefix(parseInput(Uout) / parseInput(Uin), "")}<br>`;
			}
		}
		if (!Uin) {
			if (Uout && V) {
				result_invertierender_Verstaerker += `
                             Uin = 
                             <div class ="fraction">
                                    <span class="fraction-numerator"> -Uout </span><br>
                                    <span>V</span>
                                </div> 
                            =
                                <div class ="fraction">
                                    <span class="fraction-numerator"> -${Uout}V </span><br>
                                    <span>${V}</span>
                                </div> 
                             = -${formatWithPrefix(parseInput(Uout) / parseInput(V), "V")}<br>`;
			}
			if (Uout && R2 && R1) {
				result_invertierender_Verstaerker += `
                             Uin = 
                             <div class ="fraction">
                                    <span class="fraction-numerator"> -Uout &lowast; R1</span><br>
                                    <span>R2</span>
                                </div> 
                            =
                                <div class ="fraction">
                                    <span class="fraction-numerator"> -${Uout}V &lowast; ${R1}&Omega;</span><br>
                                    <span>${R2}&Omega;</span>
                                </div> 
                            = -${formatWithPrefix((parseInput(Uout) * parseInput(R1)) / parseInput(R2), "V")}<br>`;
			}
		}
		if (!Uout) {
			if (Uin && V) {
				result_invertierender_Verstaerker += ` 
                                Uout = -Uin &lowast; V 
                            = -${Uin}V &lowast; ${V} 
                            = -${formatWithPrefix(parseInput(Uin) * parseInput(V), "V")}<br>`;
			}
			if (Uin && R2 && R1) {
				result_invertierender_Verstaerker += ` 
                            Uout = 
                            - 
                            <div class ="fraction">
                                    <span class="fraction-numerator"> Uin &lowast; R<sub>2</sub> </span><br>
                                    <span>R<sub>1</sub></span>
                                </div> 
                            = - 
                            
                                <div class ="fraction">
                                    <span class="fraction-numerator"> ${Uin}V &lowast; ${R2}&Omega; </span><br>
                                    <span>${R1}&Omega;</span>
                                </div> 
                            = -${formatWithPrefix((parseInput(Uin) * parseInput(R2)) / parseInput(R1), "V")}<br>`;
			}
		}
		if (!R1) {
			if (R2 && V) {
				result_invertierender_Verstaerker += `
                             R1 = 
                             <div class ="fraction">
                                    <span class="fraction-numerator"> -R2 </span><br>
                                    <span>V</span>
                                </div> 
                            =
                                <div class ="fraction">
                                    <span class="fraction-numerator"> -${R2}&Omega; </span><br>
                                    <span>${V}</span>
                                </div> 
                             = -${formatWithPrefix(parseInput(R2) / parseInput(V), "&Omega;")}<br>`;
			}
			if (R2 && Uin && Uout) {
				result_invertierender_Verstaerker += `
                             R1 = 
                             <div class ="fraction">
                                    <span class="fraction-numerator"> -Uin &lowast; R2</span><br>
                                    <span>Uout</span>
                                </div> 
                            =
                                <div class ="fraction">
                                    <span class="fraction-numerator"> -${Uin}V &lowast; ${R2}&Omega; </span><br>
                                    <span>${Uout}V</span>
                                </div> 
                            = -${formatWithPrefix((parseInput(Uin) * parseInput(R2)) / parseInput(Uout), "&Omega;")}<br>`;
			}
		}
		if (!R2) {
			if (R1 && V) {
				result_invertierender_Verstaerker += `
                             R2 = 
                                -R1 &lowast; V 
                             = -${R1}&Omega; &lowast; ${V} 
                             = ${formatWithPrefix(parseInput(R1) * parseInput(V), "&Omega;")}<br>`;
			}
			if (R1 && Uout && Uin) {
				result_invertierender_Verstaerker += ` 
                            R2 = - 
                            <div class="fraction">
                                    <span class="fraction-numerator"> R1 &lowast; Uout </span><br>
                                    <span>Uin</span>
                                </div> 
                            = - 
                                <div class="fraction">
                                    <span class="fraction-numerator"> ${R1}&Omega; &lowast; ${Uout}V </span><br>
                                    <span>${Uin}V</span>
                                </div> 
                            = -${formatWithPrefix((parseInput(R1) * parseInput(Uout)) / parseInput(Uin), "&Omega;")}<br>`;
			}
		}
		setHTML(
			document.getElementById("result_invertierender_Verstaerker"),
			result_invertierender_Verstaerker,
		);
	}
	function calculate_nicht_invertierender_Verstaerker() {
		let result_nicht_invertierender_Verstaerker = ``;
		const R1 = document.getElementById("R1-2").value;
		const R2 = document.getElementById("R2-2").value;
		const Uin = document.getElementById("Uin-2").value;
		const Uout = document.getElementById("Uout-2").value;
		const V = document.getElementById("V-2").value;
		if (!V) {
			if (R1 && R2) {
				result_nicht_invertierender_Verstaerker += `
                        Verst&auml;rkung V = 1 + 
                        <div class ="fraction">
                            <span class="fraction-numerator"> R2 </span><br>
                            <span>R1</span>
                        </div> 
                    = 1 +
                        <div class ="fraction">
                            <span class="fraction-numerator"> ${R2}&Omega; </span><br>
                            <span>${R1}&Omega;</span>
                        </div> 
                    
                    = ${formatWithPrefix(1 + parseInput(R2) / parseInput(R1), "")}<br>`;
			}
			if (Uout && Uin) {
				result_nicht_invertierender_Verstaerker += `
                    Verst&auml;rkung V = 1 + 
                    <div class ="fraction">
                            <span class="fraction-numerator"> Uout </span><br>
                            <span>Uin</span>
                        </div> 
                    = 1 +
                        <div class ="fraction">
                            <span class="fraction-numerator"> ${Uout}V </span><br>
                            <span>${Uin}V</span>
                        </div> 
                    = ${formatWithPrefix(1 + parseInput(Uout) / parseInput(Uin), "")}<br>`;
			}
		}
		if (!Uin) {
			if (Uout && V) {
				result_nicht_invertierender_Verstaerker += `
                        Uin = 
                        <div class ="fraction">
                            <span class="fraction-numerator"> Uout </span><br>
                            <span>V</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator"> ${Uout}V </span><br>
                            <span>${V}</span>
                        </div> 
                        = ${formatWithPrefix(parseInput(Uout) / parseInput(V), "V")}<br>`;
			}
			if (Uout && R2 && R1) {
				result_nicht_invertierender_Verstaerker += `
                        Uin =
                        <div class ="fraction">
                            <span class="fraction-numerator">Uout &lowast; R1</span><br>
                            <span>R1 + R2</span>
                        </div>
                    = 
                        <div class ="fraction"> 
                            <span class="fraction-numerator">${Uout}V &lowast; ${R1}&Omega;</span><br>
                            <span>${R1}&Omega; + ${R2}&Omega;</span>
                        </div>
                    = ${formatWithPrefix((parseInput(Uout) + parseInput(R1)) / (parseInput(R1) + parseInput(R2)), "V")}<br>`;
			}
		}
		if (!Uout) {
			if (Uin && V) {
				result_nicht_invertierender_Verstaerker += `
                        Uout = 
                        V &lowast; Uin 
                        = ${V} &lowast; ${Uin}V
                        = ${formatWithPrefix(parseInput(V) * parseInput(Uin), "V")}<br>`;
			}
			if (Uin && R1 && R2) {
				result_nicht_invertierender_Verstaerker += `
                        Uout = Uin &lowast; (1 + 
                        <div class ="fraction">
                            <span class="fraction-numerator"> R2 </span><br>
                            <span>R1</span>
                        </div> )
                        = ${Uin}V &lowast; (1 + 
                        <div class ="fraction">
                            <span class="fraction-numerator"> ${R2}&Omega; </span><br>
                            <span>${R1}&Omega;</span>
                        </div> )
                        = ${formatWithPrefix(parseInput(Uin) * (1 + parseInput(R2) / parseInput(R1)), "V")}<br>`;
			}
		}
		if (!R1) {
			if (V && R2) {
				result_nicht_invertierender_Verstaerker += `
                        R1 = 
                        <div class ="fraction">
                            <span class="fraction-numerator"> R1 </span><br>
                            <span>V - 1</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator"> ${R2}&Omega; </span><br>
                            <span>${V} - 1</span>
                        </div> 
                        = ${formatWithPrefix(parseInput(R2) / (parseInput(V) - 1), "&Omega;")}<br>`;
			}
			if (Uin && Uout && R2) {
				result_nicht_invertierender_Verstaerker += `
                        R1 = 
                        <div class ="fraction">
                            <span class="fraction-numerator"> Uin &lowast; R2 </span><br>
                            <span>Uout - Uin</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator">${Uin}V &lowast; ${R2}&Omega; </span><br>
                            <span>${Uout} - ${Uin}</span>
                        </div> 
                        = ${formatWithPrefix((parseInput(Uin) * parseInput(R2)) / (parseInput(Uout) - parseInput(Uin)), "&Omega;")}<br>`;
			}
		}
		if (!R2) {
			if (R1 && V) {
				result_nicht_invertierender_Verstaerker += `
                        R2 = 
                        R1 &lowast; (V - 1) 
                        = ${R1}&Omega; &lowast; (${V}- 1)
                        = ${formatWithPrefix(parseInput(R1) * (parseInput(V) - 1), "&Omega;")}<br>`;
			}
			if (R1 && Uin && Uout) {
				result_nicht_invertierender_Verstaerker += `
                        R2 = R1 &lowast; ( 
                        <div class ="fraction">
                            <span class="fraction-numerator"> Uout </span><br>
                            <span>Uin</span>
                        </div> -1)
                        = ${R1}&Omega; &lowast; ( 
                        <div class ="fraction">
                            <span class="fraction-numerator"> ${Uout}V </span><br>
                            <span>${Uin}V</span>
                        </div> -1)
                        = ${formatWithPrefix(parseInput(R1) * (parseInput(Uout) / parseInput(Uin) - 1), "&Omega;")}<br>`;
			}
		}
		setHTML(
			document.getElementById("result_nicht_invertierender_Verstaerker"),
			result_nicht_invertierender_Verstaerker,
		);
	}
	function calculate_summier_Verstaeker() {
		let result_summier_Verstaerker = ``;
		const R11 = document.getElementById("R11-3").value;
		const R12 = document.getElementById("R12-3").value;
		const R2 = document.getElementById("R2-3").value;
		const Uin1 = document.getElementById("Uin1-3").value;
		const Uin2 = document.getElementById("Uin2-3").value;
		const Uout = document.getElementById("Uout-3").value;
		const V1 = document.getElementById("V1-3").value;
		const V2 = document.getElementById("V2-3").value;
		if (!Uout) {
			if (R11 && R12 && R2 && Uin1 && Uin2) {
				result_summier_Verstaerker += ` 
                    U<sub>out</sub> =  
                    - <div class="fraction">
                            <span class="fraction-numerator">R<sub>2</sub></span><br>
                            <span>R<sub>11</sub></span>
                        </div> &lowast; U<sub>in1</sub>

                    - <div class="fraction">
                            <span class="fraction-numerator">R<sub>2</sub></span><br>
                            <span>R<sub>12</sub></span>
                        </div> &lowast; U<sub>in2</sub>    
                        
                    = 
                    - <div class="fraction">
                            <span class="fraction-numerator">${R2}&Omega;</span><br>
                            <span>${R11}&Omega;</span>
                        </div> &lowast; ${Uin1}V

                    - <div class="fraction">
                            <span class="fraction-numerator">${R2}&Omega;</span><br>
                            <span>${R12}&Omega;</span>
                        </div> &lowast; ${Uin2}V   
                    = ${formatWithPrefix(-(parseInput(R2) / parseInput(R11)) * parseInput(Uin1) - (parseInput(R2) / parseInput(R12)) * parseInput(Uin2), "V")}<br>`;
			}
		}
		setHTML(
			document.getElementById("result_summier_Verstaerker"),
			result_summier_Verstaerker,
		);
	}
	function calculate_differenz_Verstaerker() {
		let result_differenz_Verstaerker = ``;
		const R11 = document.getElementById("R13-4").value;
		const R12 = document.getElementById("R24-4").value;
		const Uin1 = document.getElementById("Uin1-4").value;
		const Uin2 = document.getElementById("Uin2-4").value;
		const Uout = document.getElementById("Uout-4").value;
		const V1 = document.getElementById("V-4").value;
		result_differenz_Verstaerker = ` 
                    development in progress <br>`;
		setHTML(
			document.getElementById("result_differenz_Verstaerker"),
			result_differenz_Verstaerker,
		);
	}
	return {
		handlers: {
			toggleSelection,
			updateImage1,
			updateImage2,
			updateImage3,
			updateImage4,
			calculate_invertierender_Verstaerker,
			calculate_nicht_invertierender_Verstaerker,
			calculate_summier_Verstaeker,
			calculate_differenz_Verstaerker,
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
