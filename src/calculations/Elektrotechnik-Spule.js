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
	function calculateInductorParameters() {
		return calculatePassive(document, "inductor");
	}
	function resetInputsL() {
		const container = document.getElementById("L_Inputs");
		const inputs = container.querySelectorAll("input");
		inputs.forEach((input) => (input.value = ""));
		setHTML(document.getElementById("result"), "");
	}
	scope.listen(document.getElementById("modeSwitch"), "change", function () {
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
		return calculatePassiveTransient(document, "RL", drawCurveDynamic);
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
