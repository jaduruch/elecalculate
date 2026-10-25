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
	function toggleDropdown(id) {
		const allDropdowns = document.querySelectorAll(".dropdown-content");
		allDropdowns.forEach((dropdown) => {
			if (dropdown.id !== id) {
				dropdown.style.display = "none";
			}
		});
		const currentDropdown = document.getElementById(id);
		currentDropdown.style.display =
			currentDropdown.style.display === "block" ? "none" : "block";
	}
	document.querySelectorAll(".dropdown-select").forEach((selectBox) => {
		scope.listen(selectBox, "click", function (event) {
			event.stopPropagation();
			const dropdownId = this.nextElementSibling.id;
			toggleDropdown(dropdownId);
		});
	});
	document.querySelectorAll(".dropdown-content button").forEach((item) => {
		scope.listen(item, "click", function (event) {
			event.stopPropagation();
			const value = this.getAttribute("data-value");
			const colorBox =
				this.parentElement.previousElementSibling.querySelector(".color-box");
			if (this.parentElement.id === "band1Dropdown") {
				document.getElementById("band1").value = value;
				document.getElementById("band1Select").innerText = this.innerText;
			} else if (this.parentElement.id === "band2Dropdown") {
				document.getElementById("band2").value = value;
				document.getElementById("band2Select").innerText = this.innerText;
			} else if (this.parentElement.id === "band3Dropdown") {
				document.getElementById("band3").value = value;
				document.getElementById("band3Select").innerText = this.innerText;
			} else if (this.parentElement.id === "multiplierDropdown") {
				document.getElementById("multiplier").value = value;
				document.getElementById("multiplierSelect").innerText =
					`Multiplikator: ${this.innerText}`;
			} else if (this.parentElement.id === "toleranceDropdown") {
				document.getElementById("tolerance").value = value;
				document.getElementById("toleranceSelect").innerText =
					`Toleranz: ±${parseFloat(value) * 100}%`;
			}
			calculateResistance();
			this.parentElement.style.display = "none";
		});
	});
	function calculateResistance() {
		const band1 = parseInt(document.getElementById("band1").value, 10);
		const band2 = parseInt(document.getElementById("band2").value, 10);
		const band3 = parseInt(document.getElementById("band3").value, 10);
		const multiplier = parseFloat(document.getElementById("multiplier").value);
		const tolerance = parseFloat(document.getElementById("tolerance").value);
		if (!isNaN(band1) && !isNaN(band2)) {
			let resistance =
				band3 === -1 || isNaN(band3)
					? band1 * 10 + band2
					: band1 * 100 + band2 * 10 + band3;
			resistance *= multiplier;
			const tolerancePercent = tolerance * 100;
			document.getElementById("resistanceValue").innerText =
				`Widerstand: ${Number(resistance.toPrecision(12))}Ω`;
			document.getElementById("toleranceValue").innerText =
				`Toleranz: ±${tolerancePercent}%`;
		}
	}
	document.addEventListener("click", function () {
		document.querySelectorAll(".dropdown-content").forEach((dropdown) => {
			dropdown.style.display = "none";
		});
	});
	document.querySelectorAll(".dropdown-content").forEach((dropdown) => {
		scope.listen(dropdown, "click", function (event) {
			event.stopPropagation();
		});
	});
	function initializeDropdowns() {
		const dropdowns = [
			"band1Dropdown",
			"band2Dropdown",
			"band3Dropdown",
			"multiplierDropdown",
			"toleranceDropdown",
		];
		dropdowns.forEach((id) => {
			const dropdown = document.getElementById(id);
			dropdown.style.display = "none";
		});
	}
	initializeDropdowns();
	return {
		handlers: {
			toggleDropdown,
			calculateResistance,
			initializeDropdowns,
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
