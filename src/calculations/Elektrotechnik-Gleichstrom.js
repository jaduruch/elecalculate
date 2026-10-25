import { parseInput, parseInputsquare } from "../lib/si";
import { setHTML } from "../lib/safe-html";
import { calculateDivider } from "../lib/divider-controller";
import { calculateOpamp } from "../lib/opamp-controller";
import { updateThreePhase, phaseSum } from "../lib/three-phase";
import { quantumGate, validateQubit } from "../lib/quantum";
import { calculateBasic } from "../lib/basic-solvers";
import { calculateNetwork } from "../lib/resistor-network";
import { convertNumericField } from "../lib/form-units";
import {
	calculatePassive,
	calculatePassiveTransient,
	calculatePassiveCapacitorAC,
} from "../lib/passive-controller";
import { drawPassivePhasors } from "../lib/passive-phasors";
import { calculateACFilter, calculateACResonator } from "../lib/ac-controller";
import { createShared } from "./shared.js";
/** Calculator presentation and reviewed domain adapters, isolated to this route's mount lifecycle. */
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
	scope.listen(document.getElementById("modeSwitch"), "change", function () {
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
		return calculateBasic(document, "ohm");
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
		return calculateNetwork(document, opv);
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
