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
			if (sectionId === "serie") {
				document.getElementById("serie").style.display = "block";
				document.getElementById("parallel").style.display = "none";
			} else {
				document.getElementById("parallel").style.display = "block";
				document.getElementById("serie").style.display = "none";
			}
		}
	}
	function calculateSerie() {
		return calculateACResonator(document, "serie");
	}
	function calculateParallel() {
		return calculateACResonator(document, "parallel");
	}
	return {
		handlers: {
			toggleSelection,
			calculateSerie,
			calculateParallel,
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
