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
	function toggleCircuit() {
		var isChecked = document.getElementById("toggleSwitch").checked;
		var circuitType = document.getElementById("circuitType");
		var starCircuit = document.getElementById("starCircuit");
		var deltaCircuit = document.getElementById("deltaCircuit");
		var neutralButton = document.getElementById("neutralButton");
		if (isChecked) {
			circuitType.innerText = "Dreieckschaltung";
			starCircuit.classList.remove("schaltung-aktiv");
			deltaCircuit.classList.add("schaltung-aktiv");
			neutralButton.style.display = "none";
		} else {
			circuitType.innerText = "Sternschaltung";
			deltaCircuit.classList.remove("schaltung-aktiv");
			starCircuit.classList.add("schaltung-aktiv");
			neutralButton.style.display = "inline-block";
		}
		updateOutputVoltage();
	}
	function toggleNeutral() {
		var starImage = document.getElementById("starImage");
		var neutralButton = document.getElementById("neutralButton");
		var isNeutralActive = neutralButton.classList.contains("active");
		if (isNeutralActive) {
			starImage.src = "/Pictures/Drehstrom_Stern_ohne_NL.jpg";
			neutralButton.innerText = "Neutralleiter Hinzufügen";
			neutralButton.classList.remove("active");
		} else {
			starImage.src = "/Pictures/Drehstrom_Stern_mit_NL.jpg";
			neutralButton.innerText = "Neutralleiter Entfernen";
			neutralButton.classList.add("active");
		}
		updateOutputVoltage();
	}
	function toggleSymmetry(type) {
		var button;
		if (type === "star") {
			button = document.getElementById("symmetryButtonStar");
		} else {
			button = document.getElementById("symmetryButtonDelta");
		}
		var isSymmetric = button.classList.contains("active");
		if (isSymmetric) {
			button.innerText = "Symmetrisch";
			button.classList.remove("active");
		} else {
			button.innerText = "Asymmetrisch";
			button.classList.add("active");
		}
		updateOutputVoltage();
	}
	document.addEventListener("DOMContentLoaded", function () {
		var neutralButton = document.getElementById("neutralButton");
		neutralButton.style.display = "inline-block";
	});
	function updateOutputVoltage() {
		return updateThreePhase(document);
	}
	scope.listen(
		document.getElementById("inputVoltage"),
		"input",
		updateOutputVoltage,
	);
	document.addEventListener("DOMContentLoaded", () => updateOutputVoltage());
	return {
		handlers: {
			toggleCircuit,
			toggleNeutral,
			toggleSymmetry,
			updateOutputVoltage,
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
