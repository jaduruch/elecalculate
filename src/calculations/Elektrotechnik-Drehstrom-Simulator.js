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
			let sum = 0;
			const angleRed = (x + time) * frequency + (phaseShift1 * Math.PI) / 180;
			const angleGreen = (x + time) * frequency + (phaseShift2 * Math.PI) / 180;
			const angleBlue = (x + time) * frequency + (phaseShift3 * Math.PI) / 180;
			if (showRed) {
				sum += Math.pow(amplitude * Math.sin(angleRed), 2) / 100;
			}
			if (showGreen) {
				sum += Math.pow(amplitude * Math.sin(angleGreen), 2) / 100;
			}
			if (showBlue) {
				sum += Math.pow(amplitude * Math.sin(angleBlue), 2) / 100;
			}
			Math.pow;
			const y = centerY - sum;
			if (x === 0) {
				ctx.moveTo(x, y);
			} else {
				ctx.lineTo(x, y);
			}
		}
		ctx.stroke();
		ctx.setLineDash([]);
	}
	function animate() {
		ctx.clearRect(0, 0, width, height);
		drawWave(phaseShift1, "red", showRed);
		drawWave(phaseShift2, "green", showGreen);
		drawWave(phaseShift3, "blue", showBlue);
		drawSumWave();
		time += 1;
		requestAnimationFrame(animate);
	}
	function togglePhase(color) {
		if (color === "red") {
			showRed = !showRed;
		} else if (color === "green") {
			showGreen = !showGreen;
		} else if (color === "blue") {
			showBlue = !showBlue;
		}
	}
	animate();
	return {
		handlers: {
			drawWave,
			drawSumWave,
			animate,
			togglePhase,
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
