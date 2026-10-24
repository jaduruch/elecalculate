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
		selectBox.addEventListener("click", function (event) {
			event.stopPropagation();
			const dropdownId = this.nextElementSibling.id;
			toggleDropdown(dropdownId);
		});
	});
	document.querySelectorAll(".dropdown-content button").forEach((item) => {
		item.addEventListener("click", function (event) {
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
		const multiplier = parseInt(
			document.getElementById("multiplier").value,
			10,
		);
		const tolerance = parseFloat(document.getElementById("tolerance").value);
		if (!isNaN(band1) && !isNaN(band2)) {
			let resistance =
				band3 === -1 || isNaN(band3)
					? band1 * 10 + band2
					: band1 * 100 + band2 * 10 + band3;
			resistance *= multiplier;
			const tolerancePercent = tolerance * 100;
			document.getElementById("resistanceValue").innerText =
				`Widerstand: ${resistance}Ω`;
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
		dropdown.addEventListener("click", function (event) {
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
