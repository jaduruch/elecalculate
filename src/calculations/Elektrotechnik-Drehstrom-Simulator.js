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
	const canvas = document.getElementById("phaseCanvas");
	const ctx = canvas.getContext("2d");
	const width = canvas.width;
	const height = canvas.height;
	const centerY = height / 2;
	const amplitude = 100;
	const frequency = 0.05;
	let phaseShift1 = 0;
	let phaseShift2 = 120;
	let phaseShift3 = 240;
	let time = 0;
	let paused = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
	let frame = 0;
	let showRed = true;
	let showGreen = true;
	let showBlue = true;
	function drawWave(phaseShift, color, isVisible) {
		if (!isVisible) return;
		ctx.beginPath();
		ctx.strokeStyle = color;
		ctx.lineWidth = 2;
		for (let x = 0; x < width; x++) {
			const angle = (x + time) * frequency + (phaseShift * Math.PI) / 180;
			const y = centerY + amplitude * Math.sin(angle);
			if (x === 0) {
				ctx.moveTo(x, y);
			} else {
				ctx.lineTo(x, y);
			}
		}
		ctx.stroke();
	}
	function drawSumWave() {
		ctx.beginPath();
		ctx.strokeStyle = "white";
		ctx.lineWidth = 2;
		for (let x = 0; x < width; x++) {
			const sum = phaseSum(
				(x + time) * frequency,
				[showRed, showGreen, showBlue],
				amplitude,
			);
			const y = centerY + sum;
			if (x === 0) ctx.moveTo(x, y);
			else ctx.lineTo(x, y);
		}
		ctx.stroke();
	}
	function animate() {
		ctx.clearRect(0, 0, width, height);
		drawWave(phaseShift1, "red", showRed);
		drawWave(phaseShift2, "green", showGreen);
		drawWave(phaseShift3, "blue", showBlue);
		drawSumWave();
		if (!paused) time = (time + 1) % ((2 * Math.PI) / frequency);
		if (!paused) frame = requestAnimationFrame(animate);
	}
	function togglePhase(color) {
		if (color === "red") {
			showRed = !showRed;
		} else if (color === "green") {
			showGreen = !showGreen;
		} else if (color === "blue") {
			showBlue = !showBlue;
		}
		syncPhaseControls();
		if (paused) animate();
	}
	animate();
	function syncPhaseControls() {
		for (const color of ["red", "green", "blue"]) {
			const on =
				color === "red" ? showRed : color === "green" ? showGreen : showBlue;
			document
				.querySelector("." + color + "-btn")
				?.setAttribute("aria-pressed", String(on));
		}
		const b = document.getElementById("animation-toggle");
		b.textContent = paused ? "Animation fortsetzen" : "Animation pausieren";
		b.setAttribute("aria-pressed", String(paused));
	}
	function toggleAnimation() {
		paused = !paused;
		if (paused) cancelAnimationFrame(frame);
		else animate();
		syncPhaseControls();
	}
	document.addEventListener("DOMContentLoaded", () => syncPhaseControls());
	return {
		captureState() {
			return {
				kind: "threephase-simulator",
				values: {
					red: showRed,
					green: showGreen,
					blue: showBlue,
					time,
					paused,
				},
			};
		},
		restoreState(snapshot) {
			if (
				snapshot.kind !== "threephase-simulator" ||
				!["red", "green", "blue", "paused"].every(
					(key) => typeof snapshot.values[key] === "boolean",
				) ||
				!Number.isFinite(snapshot.values.time) ||
				Number(snapshot.values.time) < 0
			)
				throw Error("Ungültiger gespeicherter Simulationstyp.");
			cancelAnimationFrame(frame);
			showRed = !!snapshot.values.red;
			showGreen = !!snapshot.values.green;
			showBlue = !!snapshot.values.blue;
			time = Number.isFinite(snapshot.values.time)
				? Number(snapshot.values.time)
				: 0;
			paused = !!snapshot.values.paused;
			syncPhaseControls();
			animate();
		},
		handlers: {
			drawWave,
			drawSumWave,
			animate,
			togglePhase,
			syncPhaseControls,
			toggleAnimation,
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
