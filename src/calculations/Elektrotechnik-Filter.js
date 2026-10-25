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
		return calculateACFilter(document, "HP_RC");
	}
	function calculate_HP_RL() {
		return calculateACFilter(document, "HP_RL");
	}
	function calculate_TP_RC() {
		return calculateACFilter(document, "TP_RC");
	}
	function calculate_TP_RL() {
		return calculateACFilter(document, "TP_RL");
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
