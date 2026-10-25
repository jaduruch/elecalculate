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
	const watermarkLogo = new Image();
	watermarkLogo.src = "/Pictures/favicon_no_BG.svg";
	let watermarkLoaded = false;
	watermarkLogo.onload = function () {
		watermarkLoaded = true;
	};
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
			if (sectionId === "Sinus") {
				document.getElementById("Sinus").style.display = "block";
				document.getElementById("Rechteck").style.display = "none";
				document.getElementById("Dreieck").style.display = "none";
				document.getElementById("PWM").style.display = "none";
			} else if (sectionId === "Rechteck") {
				document.getElementById("Sinus").style.display = "none";
				document.getElementById("Rechteck").style.display = "block";
				document.getElementById("Dreieck").style.display = "none";
				document.getElementById("PWM").style.display = "none";
			} else if (sectionId === "Dreieck") {
				document.getElementById("Sinus").style.display = "none";
				document.getElementById("Rechteck").style.display = "none";
				document.getElementById("Dreieck").style.display = "block";
				document.getElementById("PWM").style.display = "none";
			} else if (sectionId === "PWM") {
				document.getElementById("Sinus").style.display = "none";
				document.getElementById("Rechteck").style.display = "none";
				document.getElementById("Dreieck").style.display = "none";
				document.getElementById("PWM").style.display = "block";
			}
		}
	}
	let isRADactive = true;
	function toggleRAD() {
		convertNumericField(
			document,
			"phi-Sinus",
			isRADactive ? 180 / Math.PI : Math.PI / 180,
		);
		let button = document.getElementById("Rad-Button");
		if (isRADactive) {
			setHTML(button, "360&deg;");
			isRADactive = false;
		} else {
			setHTML(button, "2&pi;");
			isRADactive = true;
		}
	}
	let isPercent = true;
	function toggleDuty() {
		convertNumericField(document, "g-PWM", isPercent ? 0.01 : 100);
		let button = document.getElementById("Duty-Button");
		if (isPercent) {
			setHTML(button, "1");
			isPercent = false;
		} else {
			setHTML(button, "%");
			isPercent = true;
		}
	}
	function drawDownloadIcon(ctx, canvas, iconSize = 32) {
		const margin = 12;
		const x = canvas.width - iconSize - margin;
		const y = canvas.height - iconSize - margin;
		ctx.save();
		ctx.globalAlpha = 0.7;
		ctx.strokeStyle = "#fff";
		ctx.lineWidth = 2;
		ctx.lineJoin = "round";
		ctx.beginPath();
		ctx.moveTo(x + iconSize / 2, y + 8);
		ctx.lineTo(x + iconSize / 2, y + iconSize - 10);
		ctx.moveTo(x + iconSize / 2, y + iconSize - 10);
		ctx.lineTo(x + iconSize / 2 - 8, y + iconSize - 18);
		ctx.moveTo(x + iconSize / 2, y + iconSize - 10);
		ctx.lineTo(x + iconSize / 2 + 8, y + iconSize - 18);
		ctx.stroke();
		ctx.beginPath();
		ctx.rect(x + 8, y + iconSize - 10, iconSize - 16, 8);
		ctx.stroke();
		ctx.restore();
		return {
			x,
			y,
			size: iconSize,
		};
	}
	function calculate_Sinus() {
		const result = calculateBasic(document, "sinus", {
			radians: isRADactive,
		});
		const v = result.values;
		if (
			!result.errors.length &&
			Number.isFinite(v.up) &&
			Number.isFinite(v.f) &&
			v.f > 0
		)
			drawSinus(v.up, v.f, v.phi ?? 0, v.t ?? 0, 2, 8);
		else {
			const c = document.getElementById("sinusCanvas");
			if (c) c.dataset.calculated = "false";
			c?.getContext("2d")?.clearRect(0, 0, c.width, c.height);
		}
		return result;
	}
	function drawWatermark(ctx, canvas, size = 70, margin = 10) {
		if (watermarkLoaded) {
			ctx.save();
			ctx.globalAlpha = 0.15;
			ctx.drawImage(
				watermarkLogo,
				canvas.width - size - margin,
				margin,
				size,
				size,
			);
			ctx.globalAlpha = 1.0;
			ctx.restore();
		}
	}
	function exportCanvasAsPNG(canvasId) {
		const canvas = document.getElementById(canvasId);
		if (
			!canvas ||
			(canvasId === "sinusCanvas" && canvas.dataset.calculated !== "true") ||
			canvas.closest("[data-calculation-stale=true]")
		)
			return;
		const copy = document.createElement("canvas");
		copy.width = canvas.width;
		copy.height = canvas.height;
		const ctx = copy.getContext("2d");
		ctx.fillStyle = "#000";
		ctx.fillRect(0, 0, copy.width, copy.height);
		ctx.drawImage(canvas, 0, 0);
		const a = document.createElement("a");
		a.download = canvasId + ".png";
		a.href = copy.toDataURL("image/png");
		a.click();
	}
	function drawSinus(up, f, phi, tMarker, periods = 2, speed = 1) {
		const canvas = document.getElementById("sinusCanvas");
		if (!canvas) return;
		canvas.dataset.calculated = "true";
		const ctx = canvas.getContext("2d");
		const W = canvas.width,
			H = canvas.height;
		const midY = H / 2;
		const margin = 50,
			marginR = 20;
		const plotW = W - margin - marginR;
		const Tsec = 1 / f;
		const total = periods * Tsec;
		const pxPerS = plotW / total;
		const scaleY = (midY - 20) / (up === 0 ? 1 : up);
		ctx.clearRect(0, 0, W, H);
		drawAxesAndLabels(
			ctx,
			W,
			H,
			midY,
			margin,
			marginR,
			up,
			f,
			scaleY,
			pxPerS,
			periods,
			Tsec,
		);
		drawWatermark(ctx, canvas);
		const downloadIconArea = drawDownloadIcon(ctx, canvas);
		if (!canvas._downloadHandlerAdded) {
			scope.listen(canvas, "click", function (e) {
				const rect = canvas.getBoundingClientRect();
				const scaleX = canvas.width / rect.width;
				const scaleY = canvas.height / rect.height;
				const mx = (e.clientX - rect.left) * scaleX;
				const my = (e.clientY - rect.top) * scaleY;
				if (
					mx >= downloadIconArea.x &&
					mx <= downloadIconArea.x + downloadIconArea.size &&
					my >= downloadIconArea.y &&
					my <= downloadIconArea.y + downloadIconArea.size
				) {
					exportCanvasAsPNG(canvas.id);
				}
			});
			canvas._downloadHandlerAdded = true;
		}
		const sinusColor =
			getComputedStyle(document.documentElement)
				.getPropertyValue("--Spannung")
				.trim() || "#0070C0";
		ctx.strokeStyle = sinusColor;
		ctx.lineWidth = 2;
		let px = 0;
		ctx.beginPath();
		function animate() {
			if (px > plotW) {
				ctx.stroke();
				drawMarkerAndLegend(
					ctx,
					W,
					H,
					midY,
					margin,
					marginR,
					up,
					f,
					phi,
					tMarker,
					pxPerS,
					scaleY,
					periods,
				);
				return;
			}
			for (let i = 0; i < speed; i++) {
				if (px > plotW) break;
				const time = px / pxPerS;
				const angle = 2 * Math.PI * f * time + phi;
				const yVal = up * Math.sin(angle);
				const xPix = margin + px;
				const yPix = midY - yVal * scaleY;
				if (px === 0) {
					ctx.moveTo(xPix, yPix);
				} else {
					ctx.lineTo(xPix, yPix);
				}
				px++;
			}
			ctx.stroke();
			requestAnimationFrame(animate);
		}
		animate();
	}
	function drawAxesAndLabels(
		ctx,
		W,
		H,
		midY,
		margin,
		marginR,
		up,
		f,
		scaleY,
		pxPerS,
		periods,
		Tsec,
	) {
		ctx.strokeStyle = "#333";
		ctx.lineWidth = 0.5;
		for (let i = -4; i <= 4; i++) {
			const y = midY - i * (up / 4) * scaleY;
			ctx.beginPath();
			ctx.moveTo(margin, y);
			ctx.lineTo(W - marginR, y);
			ctx.stroke();
		}
		ctx.strokeStyle = "#888";
		ctx.lineWidth = 1;
		ctx.beginPath();
		ctx.moveTo(margin, midY);
		ctx.lineTo(W - marginR, midY);
		ctx.moveTo(margin, 0);
		ctx.lineTo(margin, H);
		ctx.stroke();
		ctx.fillStyle = "#888";
		ctx.font = "12px sans-serif";
		ctx.textAlign = "center";
		for (let p = 0; p <= periods; p++) {
			const x = margin + p * Tsec * pxPerS;
			ctx.beginPath();
			ctx.moveTo(x, midY - 5);
			ctx.lineTo(x, midY + 5);
			ctx.stroke();
			ctx.fillText(`${(p * Tsec * 1000).toFixed(0)}ms`, x, midY + 20);
		}
		ctx.textAlign = "right";
		for (let i = -4; i <= 4; i++) {
			if (i === 0) continue;
			const y = midY - i * (up / 4) * scaleY;
			ctx.beginPath();
			ctx.moveTo(margin - 5, y);
			ctx.lineTo(margin + 5, y);
			ctx.stroke();
			ctx.fillText(`${((i * up) / 4).toFixed(0)}V`, margin - 10, y + 4);
		}
	}
	function drawMarkerAndLegend(
		ctx,
		W,
		H,
		midY,
		margin,
		marginR,
		up,
		f,
		phi,
		tMarker,
		pxPerS,
		scaleY,
		periods,
	) {
		const total = periods * (1 / f);
		const tWrapped = ((tMarker % total) + total) % total;
		const uAtT = up * Math.sin(2 * Math.PI * f * tWrapped + phi);
		const xT = margin + tWrapped * pxPerS;
		const yT = midY - uAtT * scaleY;
		if (xT >= margin && xT <= margin + (W - margin - marginR)) {
			ctx.save();
			ctx.strokeStyle = "deeppink";
			ctx.lineWidth = 1.5;
			ctx.setLineDash([5, 5]);
			ctx.beginPath();
			ctx.moveTo(xT, midY);
			ctx.lineTo(xT, yT);
			ctx.stroke();
			ctx.beginPath();
			ctx.moveTo(margin, yT);
			ctx.lineTo(xT, yT);
			ctx.stroke();
			ctx.setLineDash([]);
			ctx.restore();
			ctx.save();
			ctx.fillStyle = "deeppink";
			ctx.font = "bold 13px sans-serif";
			ctx.textAlign = "center";
			ctx.fillText(`t = ${tWrapped.toFixed(4)} s`, xT, midY + 30);
			ctx.restore();
			ctx.save();
			ctx.fillStyle = "deeppink";
			ctx.font = "bold 13px sans-serif";
			ctx.textAlign = "left";
			ctx.fillText(`u(t) = ${uAtT.toFixed(2)} V`, xT + 8, yT - 8);
			ctx.restore();
			ctx.fillStyle = "deeppink";
			ctx.beginPath();
			ctx.arc(xT, yT, 6, 0, 2 * Math.PI);
			ctx.fill();
		}
		const lx = margin + 10,
			ly = 10;
		ctx.fillStyle = "rgba(0,0,0,0.6)";
		ctx.fillRect(lx, ly, 200, 90);
		ctx.fillStyle = "#fff";
		ctx.textAlign = "left";
		ctx.font = "12px sans-serif";
		ctx.fillText(`û = ${up.toFixed(1)} V`, lx + 8, ly + 20);
		ctx.fillText(`f = ${f.toFixed(1)} Hz`, lx + 8, ly + 38);
		ctx.fillText(`φ = ${((phi * 180) / Math.PI).toFixed(1)}°`, lx + 8, ly + 56);
		ctx.fillStyle = "deeppink";
		ctx.beginPath();
		ctx.arc(lx + 8, ly + 76, 6, 0, 2 * Math.PI);
		ctx.fill();
		ctx.fillStyle = "#fff";
		ctx.font = "12px sans-serif";
		ctx.fillText("aktueller Zeitpunkt t", lx + 20, ly + 80);
	}
	function formatNumber(value, decimals = 3) {
		if (value === null || value === undefined || isNaN(value)) return "N/A";
		return parseFloat(value).toFixed(decimals);
	}
	function fillExampleValues(exampleName) {
		const examples = {
			euroNet: {
				Ueff: "230",
				f: "50",
				t: "0.022",
				phi: "0",
			},
			functionGen: {
				up: "5",
				f: "1k",
				t: "0.00050",
				phi: "-45",
			},
		};
		const values = examples[exampleName];
		if (!values) return;
		isRADactive = false;
		document.getElementById("Rad-Button").textContent = "360°";
		for (const key of ["ut", "up", "upp", "Ueff", "f", "t", "T", "phi"])
			document.getElementById(key + "-Sinus").value = values[key] ?? "";
		return calculate_Sinus();
	}
	function calculate_Rechteck() {
		return calculateBasic(document, "rectangle");
	}
	function calculate_Dreieck() {
		return calculateBasic(document, "triangle");
	}
	function calculate_PWM() {
		return calculateBasic(document, "pwm", {
			percent: isPercent,
		});
	}
	return {
		captureState() {
			return {
				kind: "waveform-options",
				values: { radians: isRADactive, percent: isPercent },
			};
		},
		restoreState(snapshot) {
			if (
				snapshot.kind !== "waveform-options" ||
				!["radians", "percent"].every(
					(key) => typeof snapshot.values[key] === "boolean",
				)
			)
				throw Error("Ungültige gespeicherte Einheiteneinstellung.");
			if (typeof snapshot.values.radians === "boolean") {
				isRADactive = snapshot.values.radians;
				document.getElementById("Rad-Button").textContent = isRADactive
					? "2π"
					: "360°";
			}
			if (typeof snapshot.values.percent === "boolean") {
				isPercent = snapshot.values.percent;
				document.getElementById("Duty-Button").textContent = isPercent
					? "%"
					: "1";
			}
		},
		handlers: {
			toggleSelection,
			toggleRAD,
			toggleDuty,
			drawDownloadIcon,
			calculate_Sinus,
			drawWatermark,
			exportCanvasAsPNG,
			drawSinus,
			drawAxesAndLabels,
			drawMarkerAndLegend,
			formatNumber,
			fillExampleValues,
			calculate_Rechteck,
			calculate_Dreieck,
			calculate_PWM,
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
