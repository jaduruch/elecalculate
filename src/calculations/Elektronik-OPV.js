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
		return calculateOpamp(document, "inverting");
	}
	function calculate_nicht_invertierender_Verstaerker() {
		return calculateOpamp(document, "noninverting");
	}
	function calculate_summier_Verstaeker() {
		return calculateOpamp(document, "summing");
	}
	function calculate_differenz_Verstaerker() {
		return calculateOpamp(document, "difference");
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
