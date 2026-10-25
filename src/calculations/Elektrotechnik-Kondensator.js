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
	} = createShared(scope);
	function calculateCapacitorParameters() {
		return calculatePassive(document, "capacitor");
	}
	function resetInputsCapacitorParameters() {
		const container = document.getElementById("CapacitorParameter");
		const inputs = container.querySelectorAll("input");
		inputs.forEach((input) => (input.value = ""));
		setHTML(document.getElementById("result"), "");
	}
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
			if (sectionId === "Serie") {
				document.getElementById("Serie").style.display = "block";
				document.getElementById("Parallel").style.display = "none";
			} else if (sectionId === "Parallel") {
				document.getElementById("Serie").style.display = "none";
				document.getElementById("Parallel").style.display = "block";
			}
		}
	}
	let isRADactive_Serie = false;
	function toggleRAD() {
		convertNumericField(
			document,
			"phi_AC",
			isRADactive_Serie ? 180 / Math.PI : Math.PI / 180,
		);
		let button = document.getElementById("Rad-Button");
		if (isRADactive_Serie) {
			setHTML(button, "360&deg;");
			isRADactive_Serie = false;
		} else {
			setHTML(button, "2&pi;");
			isRADactive_Serie = true;
		}
	}
	function calculateSerieAC() {
		const result = calculatePassiveCapacitorAC(
			document,
			false,
			isRADactive_Serie,
		);
		drawPassivePhasors(document, result, false);
		return result;
	}
	let isRADactive_Parallel = false;
	function toggleRADp() {
		convertNumericField(
			document,
			"phi_ACp",
			isRADactive_Parallel ? 180 / Math.PI : Math.PI / 180,
		);
		let button = document.getElementById("Rad-Buttonp");
		if (isRADactive_Parallel) {
			setHTML(button, "360&deg;");
			isRADactive_Parallel = false;
		} else {
			setHTML(button, "2&pi;");
			isRADactive_Parallel = true;
		}
	}
	scope.listen(document.getElementById("modeSwitch"), "change", function () {
		const modeLabel = document.getElementById("modeLabel");
		const circuitImage = document.getElementById("circuitImage");
		if (this.checked) {
			modeLabel.textContent = "Entladen";
			circuitImage.src = "/Pictures/RC_Discharge.png";
		} else {
			modeLabel.textContent = "Laden";
			circuitImage.src = "/Pictures/RC_Charge.png";
		}
	});
	function calculateParallelAC() {
		const result = calculatePassiveCapacitorAC(
			document,
			true,
			isRADactive_Parallel,
		);
		drawPassivePhasors(document, result, true);
		return result;
	}
	function calculateRC() {
		return calculatePassiveTransient(document, "RC", drawCurveDynamic);
	}
	let phasorHoveredKey = null;
	const watermarkLogo = new Image();
	watermarkLogo.src = "/Pictures/favicon_no_BG.svg";
	let watermarkLoaded = false;
	watermarkLogo.onload = function () {
		watermarkLoaded = true;
	};
	function generate_e_curve_from_RCinputs() {
		const R = parseInput(document.getElementById("R_RC").value) || 1000;
		const C = parseInput(document.getElementById("C_RC").value) || 0.000001;
		const U = parseInput(document.getElementById("U_RC").value) || 1;
		const tMarker = parseInput(document.getElementById("t_RC").value);
		const isDischarging = document.getElementById("modeSwitch").checked;
		const tau = R * C;
		const maxTime = 5 * tau;
		const stepCount = 100;
		const I = U / R;
		drawCurveDynamic(
			"voltageCanvas",
			(t) =>
				isDischarging ? U * Math.exp(-t / tau) : U * (1 - Math.exp(-t / tau)),
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
			(t) => (isDischarging ? -I * Math.exp(-t / tau) : I * Math.exp(-t / tau)),
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
	function showCanvasWarning(canvasId, message) {
		const canvas = document.getElementById(canvasId);
		if (!canvas) return;
	}
	function drawLeitwertdreieckParallel(
		G,
		Bc,
		Y,
		canvasId = "phasorCanvasAdmittance",
		legendId = "phasorLegendAdmittance",
		isExample = false,
		missing = [],
	) {
		return calculateParallelAC();
	}
	function drawStromdreieckParallel(
		Ir,
		Ic,
		I,
		canvasId = "phasorCanvasCurrent",
		legendId = "phasorLegendCurrent",
		isExample = false,
		missing = [],
	) {
		return calculateParallelAC();
	}
	function drawWiderstandsdreieckSerie(
		canvasId = "phasorCanvasImpedance",
		legendId = "phasorLegendImpedance",
	) {
		return calculateSerieAC();
	}
	function drawSpannungsdreieckSerie(
		canvasId = "phasorCanvasVoltage",
		legendId = "phasorLegendVoltage",
	) {
		return calculateSerieAC();
	}
	function showExampleSerieTriangle() {
		if (
			Array.from(
				document.getElementById("Serie").querySelectorAll("input"),
			).some((input) => input.value.trim())
		)
			return calculateSerieAC();
		return drawPassivePhasors(
			document,
			{
				values: {
					R: 4,
					Xc: 3,
					Z: 5,
					Ur: 8,
					Uc: 6,
					U: 10,
				},
				issues: [],
			},
			false,
			true,
		);
	}
	function showExampleParallelTriangle() {
		if (
			Array.from(
				document.getElementById("Parallel").querySelectorAll("input"),
			).some((input) => input.value.trim())
		)
			return calculateParallelAC();
		return drawPassivePhasors(
			document,
			{
				values: {
					G: 0.3,
					Bc: 0.4,
					Y: 0.5,
					Ir: 3,
					Ic: 4,
					I: 5,
				},
				issues: [],
			},
			true,
			true,
		);
	}
	function drawMarkerOnCurve(canvasId, t, value, maxTime, minY, maxY, color) {
		const canvas = document.getElementById(canvasId);
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		const margin = 80;
		const width = canvas.width - 2 * margin;
		const height = canvas.height - 2 * margin;
		const x = margin + (t / maxTime) * width;
		const y =
			canvas.height - margin - ((value - minY) / (maxY - minY)) * height;
		ctx.save();
		ctx.fillStyle = color;
		ctx.beginPath();
		ctx.arc(x, y, 6, 0, 2 * Math.PI);
		ctx.fill();
		ctx.restore();
	}
	function getBestSIPrefix(maxAbsValue) {
		const prefixes = [
			{
				f: 1e9,
				p: "G",
			},
			{
				f: 1e6,
				p: "M",
			},
			{
				f: 1e3,
				p: "k",
			},
			{
				f: 1,
				p: "",
			},
			{
				f: 1e-3,
				p: "m",
			},
			{
				f: 1e-6,
				p: "μ",
			},
			{
				f: 1e-9,
				p: "n",
			},
		];
		for (const { f, p } of prefixes) {
			if (maxAbsValue >= f)
				return {
					factor: f,
					prefix: p,
				};
		}
		return {
			factor: 1,
			prefix: "",
		};
	}
	function formatWithSIPrefix(value, factor, prefix, unit) {
		return (value / factor).toFixed(2) + " " + prefix + unit;
	}
	function drawCurveDynamic(
		canvasId,
		valueFunc,
		yLabel,
		maxTime,
		stepCount,
		options = {},
	) {
		const canvas = document.getElementById(canvasId);
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		const marginLeft = 90;
		const marginRight = 60;
		const marginTop = 40;
		const marginBottom = 70;
		const width = canvas.width - marginLeft - marginRight;
		const height = canvas.height - marginTop - marginBottom;
		if (!maxTime || maxTime <= 0 || typeof valueFunc !== "function") {
			ctx.fillStyle = "#e66";
			ctx.font = "bold 24px sans-serif";
			ctx.textAlign = "center";
			ctx.fillText(
				"Ungültige Eingaben - keine Kurve darstellbar!",
				canvas.width / 2,
				canvas.height / 2,
			);
			ctx.font = "16px sans-serif";
			ctx.fillStyle = "#fff";
			ctx.fillText(
				"Bitte überprüfe R, C, U und Modus.",
				canvas.width / 2,
				canvas.height / 2 + 30,
			);
			return;
		}
		let minY = Number.POSITIVE_INFINITY;
		let maxY = Number.NEGATIVE_INFINITY;
		const points = [];
		for (let i = 0; i <= stepCount; i++) {
			const t = (i / stepCount) * maxTime;
			const value = valueFunc(t);
			points.push({
				t,
				value,
			});
			if (isFinite(value)) {
				if (value < minY) minY = value;
				if (value > maxY) maxY = value;
			}
		}
		minY = Math.min(minY, 0);
		maxY = Math.max(maxY, 0);
		if (Math.abs(maxY - minY) < 1e-12) {
			maxY += 1;
			minY -= 1;
		}
		if (typeof options.minY === "number") minY = options.minY;
		if (typeof options.maxY === "number") maxY = options.maxY;
		const maxAbsY = Math.max(Math.abs(minY), Math.abs(maxY));
		const { factor: yFactor, prefix: yPrefix } = getBestSIPrefix(maxAbsY);
		ctx.save();
		ctx.strokeStyle = "rgba(255,255,255,0.10)";
		ctx.lineWidth = 1;
		for (let i = 0; i <= 10; i++) {
			const x = marginLeft + (i / 10) * width;
			ctx.beginPath();
			ctx.moveTo(x, marginTop);
			ctx.lineTo(x, canvas.height - marginBottom);
			ctx.stroke();
			const y = canvas.height - marginBottom - (i / 10) * height;
			ctx.beginPath();
			ctx.moveTo(marginLeft, y);
			ctx.lineTo(canvas.width - marginRight, y);
			ctx.stroke();
		}
		ctx.restore();
		ctx.strokeStyle = "#aaa";
		ctx.lineWidth = 2;
		ctx.beginPath();
		ctx.moveTo(marginLeft, marginTop);
		ctx.lineTo(marginLeft, canvas.height - marginBottom);
		ctx.lineTo(canvas.width - marginRight, canvas.height - marginBottom);
		ctx.stroke();
		ctx.font = "bold 22px Arial";
		ctx.fillStyle = "#fff";
		ctx.textAlign = "left";
		ctx.fillText(yLabel, marginLeft - 60, marginTop - 18);
		let timeUnit = "s",
			timeFactor = 1;
		if (maxTime < 1e-3) {
			timeUnit = "μs";
			timeFactor = 1e6;
		} else if (maxTime < 1) {
			timeUnit = "ms";
			timeFactor = 1000;
		}
		ctx.font = "bold 22px Arial";
		ctx.textAlign = "center";
		ctx.fillText(
			`Zeit (${timeUnit})`,
			marginLeft + width / 2,
			canvas.height - marginBottom + 60,
		);
		ctx.font = "16px Arial";
		ctx.textAlign = "center";
		for (let i = 0; i <= 5; i++) {
			const x = marginLeft + (i / 5) * width;
			const tVal = ((i * maxTime) / 5) * timeFactor;
			let label;
			if (timeUnit === "s" || timeUnit === "ms" || timeUnit === "μs") {
				label = tVal.toFixed(2).replace(/\.00$/, "");
			}
			ctx.fillStyle = "#fff";
			ctx.fillText(label, x, canvas.height - marginBottom + 28);
		}
		ctx.textAlign = "right";
		for (let i = 0; i <= 5; i++) {
			const value = minY + (i / 5) * (maxY - minY);
			const y =
				canvas.height -
				marginBottom -
				((value - minY) / (maxY - minY)) * height;
			ctx.fillStyle = "#fff";
			ctx.fillText(
				formatWithSIPrefix(
					value,
					yFactor,
					yPrefix,
					yLabel.includes("A") ? "A" : "V",
				),
				marginLeft - 18,
				y + 7,
			);
		}
		ctx.beginPath();
		for (let i = 0; i < points.length; i++) {
			const { t, value } = points[i];
			const x = marginLeft + (t / maxTime) * width;
			const y =
				canvas.height -
				marginBottom -
				((value - minY) / (maxY - minY)) * height;
			if (i === 0) ctx.moveTo(x, y);
			else ctx.lineTo(x, y);
		}
		ctx.strokeStyle = options.color || "#0070C0";
		ctx.lineWidth = 2.5;
		ctx.shadowColor = options.color || "#0070C0";
		ctx.shadowBlur = 4;
		ctx.stroke();
		ctx.shadowBlur = 0;
		if (
			typeof options.tMarker === "number" &&
			options.tMarker >= 0 &&
			options.tMarker <= maxTime
		) {
			const t = options.tMarker;
			const value = valueFunc(t);
			const x = marginLeft + (t / maxTime) * width;
			const y =
				canvas.height -
				marginBottom -
				((value - minY) / (maxY - minY)) * height;
			ctx.save();
			ctx.strokeStyle = "#ff69b4";
			ctx.setLineDash([6, 6]);
			ctx.lineWidth = 2;
			ctx.beginPath();
			ctx.moveTo(x, canvas.height - marginBottom);
			ctx.lineTo(x, y);
			ctx.stroke();
			ctx.beginPath();
			ctx.moveTo(marginLeft, y);
			ctx.lineTo(x, y);
			ctx.stroke();
			ctx.setLineDash([]);
			ctx.fillStyle = "#ff69b4";
			ctx.beginPath();
			ctx.arc(x, y, 10, 0, 2 * Math.PI);
			ctx.fill();
			ctx.font = "bold 24px sans-serif";
			ctx.textAlign = "left";
			ctx.fillStyle = "#ffffff";
			ctx.fillText(
				(options.markerLabel || "") +
					formatWithSIPrefix(
						value,
						yFactor,
						yPrefix,
						yLabel.includes("A") ? "A" : "V",
					),
				x + 22,
				y - 16,
			);
			ctx.restore();
		}
		const logo = new Image();
		logo.src = "/Pictures/favicon_no_BG.svg";
		logo.onload = function () {
			ctx.save();
			ctx.globalAlpha = 0.15;
			const size = 120;
			ctx.drawImage(
				logo,
				canvas.width - marginRight - size,
				marginTop + 10,
				size,
				size,
			);
			ctx.globalAlpha = 1.0;
			ctx.restore();
		};
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
	function pointToSegment(px, py, x1, y1, x2, y2) {
		const dx = x2 - x1,
			dy = y2 - y1;
		if (dx === 0 && dy === 0) return Math.hypot(px - x1, py - y1);
		const t = Math.max(
			0,
			Math.min(1, ((px - x1) * dx + (py - y1) * dy) / (dx * dx + dy * dy)),
		);
		const projx = x1 + t * dx,
			projy = y1 + t * dy;
		return Math.hypot(px - projx, py - projy);
	}
	function drawLabelWithSubscript(
		ctx,
		text,
		sub,
		x,
		y,
		color = "#fff",
		mainFont = "bold 20px Arial",
		subFont = "14px Arial",
	) {
		ctx.save();
		ctx.fillStyle = color;
		ctx.font = mainFont;
		ctx.textAlign = "center";
		ctx.fillText(text, x, y);
		const mainWidth = ctx.measureText(text).width;
		ctx.font = subFont;
		ctx.fillText(sub, x + mainWidth / 2 + 6, y + 8);
		ctx.restore();
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
	function drawRightAngleMarker(ctx, x, y, dx, dy) {
		const size = 10;
		ctx.save();
		ctx.strokeStyle = "rgba(255,255,255,0.7)";
		ctx.lineWidth = 2;
		ctx.beginPath();
		ctx.moveTo(x, y);
		ctx.lineTo(x + dx * size, y);
		ctx.lineTo(x + dx * size, y + dy * size);
		ctx.lineTo(x, y + dy * size);
		ctx.stroke();
		ctx.restore();
	}
	function formatSI(value, unit) {
		const abs = Math.abs(value);
		if (abs === 0) return "0 " + unit;
		const prefixes = [
			{
				f: 1e9,
				p: "G",
			},
			{
				f: 1e6,
				p: "M",
			},
			{
				f: 1e3,
				p: "k",
			},
			{
				f: 1,
				p: "",
			},
			{
				f: 1e-3,
				p: "m",
			},
			{
				f: 1e-6,
				p: "&mu;",
			},
			{
				f: 1e-9,
				p: "n",
			},
		];
		for (const { f, p } of prefixes) {
			if (abs >= f) return (value / f).toFixed(2) + " " + p + unit;
		}
		return value.toExponential(2) + " " + unit;
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
	function drawArrow(
		ctx,
		x1,
		y1,
		x2,
		y2,
		color,
		width = 3,
		highlight = false,
		dashed = false,
	) {
		ctx.save();
		ctx.strokeStyle = color;
		ctx.fillStyle = color;
		ctx.lineWidth = width;
		if (dashed) {
			ctx.setLineDash([8, 6]);
		}
		if (highlight) {
			ctx.shadowColor = color;
			ctx.shadowBlur = 16;
		}
		ctx.beginPath();
		ctx.moveTo(x1, y1);
		ctx.lineTo(x2, y2);
		ctx.stroke();
		ctx.setLineDash([]);
		ctx.shadowBlur = 0;
		const headlen = 14;
		const angle = Math.atan2(y2 - y1, x2 - x1);
		ctx.beginPath();
		ctx.moveTo(x2, y2);
		ctx.lineTo(
			x2 - headlen * Math.cos(angle - Math.PI / 7),
			y2 - headlen * Math.sin(angle - Math.PI / 7),
		);
		ctx.lineTo(
			x2 - headlen * Math.cos(angle + Math.PI / 7),
			y2 - headlen * Math.sin(angle + Math.PI / 7),
		);
		ctx.lineTo(x2, y2);
		ctx.fill();
		ctx.restore();
	}
	function toggleDropdown(element) {
		const dropdown = element.parentElement;
		dropdown.classList.toggle("open");
	}
	return {
		captureState() {
			return {
				kind: "capacitor-options",
				values: {
					seriesRadians: isRADactive_Serie,
					parallelRadians: isRADactive_Parallel,
				},
			};
		},
		restoreState(snapshot) {
			if (
				snapshot.kind !== "capacitor-options" ||
				!["seriesRadians", "parallelRadians"].every(
					(key) => typeof snapshot.values[key] === "boolean",
				)
			)
				throw Error("Ungültige gespeicherte Einheiteneinstellung.");
			if (typeof snapshot.values.seriesRadians === "boolean") {
				isRADactive_Serie = snapshot.values.seriesRadians;
				document.getElementById("Rad-Button").textContent = isRADactive_Serie
					? "2π"
					: "360°";
			}
			if (typeof snapshot.values.parallelRadians === "boolean") {
				isRADactive_Parallel = snapshot.values.parallelRadians;
				document.getElementById("Rad-Buttonp").textContent =
					isRADactive_Parallel ? "2π" : "360°";
			}
		},
		handlers: {
			calculateCapacitorParameters,
			resetInputsCapacitorParameters,
			toggleSelection,
			toggleRAD,
			calculateSerieAC,
			toggleRADp,
			calculateParallelAC,
			calculateRC,
			generate_e_curve_from_RCinputs,
			showCanvasWarning,
			drawLeitwertdreieckParallel,
			drawStromdreieckParallel,
			drawWiderstandsdreieckSerie,
			drawSpannungsdreieckSerie,
			showExampleSerieTriangle,
			showExampleParallelTriangle,
			drawMarkerOnCurve,
			getBestSIPrefix,
			formatWithSIPrefix,
			drawCurveDynamic,
			drawDownloadIcon,
			pointToSegment,
			drawLabelWithSubscript,
			drawWatermark,
			drawRightAngleMarker,
			formatSI,
			exportCanvasAsPNG,
			drawArrow,
			toggleDropdown,
			changeSlide,
			showSlides,
			formatPrefixNoUnit,
			formatPrefixNoUnitSquare,
			formatWithPrefix,
			formatWithPrefixsquare,
			getlg,
			parseInput,
			parseInputsquare,
		},
		dispose() {},
	};
}
