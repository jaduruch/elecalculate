export function createShared(scope) {
	const {
		document,
		window,
		requestAnimationFrame,
		cancelAnimationFrame,
		setTimeout,
		clearTimeout,
	} = scope;
	let slideIndex = 1;
	showSlides(slideIndex);
	function changeSlide(n) {
		showSlides((slideIndex += n));
	}
	function showSlides(n) {
		let slides = document.getElementsByClassName("slide");
		if (slides.length === 0) return;
		if (n > slides.length) {
			slideIndex = 1;
		}
		if (n < 1) {
			slideIndex = slides.length;
		}
		for (let i = 0; i < slides.length; i++) {
			slides[i].style.display = "none";
		}
		slides[slideIndex - 1].style.display = "block";
	}
	function formatPrefixNoUnit(value) {
		const prefixes = [
			{
				prefix: "T",
				factor: 1e12,
			},
			{
				prefix: "G",
				factor: 1e9,
			},
			{
				prefix: "M",
				factor: 1e6,
			},
			{
				prefix: "k",
				factor: 1e3,
			},
			{
				prefix: "",
				factor: 1,
			},
			{
				prefix: "m",
				factor: 1e-3,
			},
			{
				prefix: "u",
				factor: 1e-6,
			},
			{
				prefix: "n",
				factor: 1e-9,
			},
			{
				prefix: "p",
				factor: 1e-12,
			},
		];
		for (let i = 0; i < prefixes.length; i++) {
			if (Math.abs(value) >= prefixes[i].factor) {
				return (value / prefixes[i].factor).toFixed(3) + prefixes[i].prefix;
			}
		}
		return value.toFixed(3);
	}
	function formatPrefixNoUnitSquare(value) {
		const prefixes = [
			{
				prefix: "T",
				factor: 1e24,
			},
			{
				prefix: "G",
				factor: 1e18,
			},
			{
				prefix: "M",
				factor: 1e12,
			},
			{
				prefix: "k",
				factor: 1e6,
			},
			{
				prefix: "",
				factor: 1,
			},
			{
				prefix: "m",
				factor: 1e-6,
			},
			{
				prefix: "u",
				factor: 1e-12,
			},
			{
				prefix: "n",
				factor: 1e-18,
			},
			{
				prefix: "p",
				factor: 1e-24,
			},
		];
		for (let i = 0; i < prefixes.length; i++) {
			if (Math.abs(value) >= prefixes[i].factor) {
				return (value / prefixes[i].factor).toFixed(3) + prefixes[i].prefix;
			}
		}
		return value.toFixed(3);
	}
	function formatWithPrefix(value, unit) {
		const prefixes = [
			{
				prefix: "T",
				factor: 1e12,
			},
			{
				prefix: "G",
				factor: 1e9,
			},
			{
				prefix: "M",
				factor: 1e6,
			},
			{
				prefix: "k",
				factor: 1e3,
			},
			{
				prefix: "",
				factor: 1,
			},
			{
				prefix: "m",
				factor: 1e-3,
			},
			{
				prefix: "u",
				factor: 1e-6,
			},
			{
				prefix: "n",
				factor: 1e-9,
			},
			{
				prefix: "p",
				factor: 1e-12,
			},
		];
		for (let i = 0; i < prefixes.length; i++) {
			if (Math.abs(value) >= prefixes[i].factor) {
				return (
					(value / prefixes[i].factor).toFixed(3) + prefixes[i].prefix + unit
				);
			}
		}
		return value.toFixed(3) + unit;
	}
	function formatWithPrefixsquare(value, unit) {
		const prefixes = [
			{
				prefix: "T",
				factor: 1e24,
			},
			{
				prefix: "G",
				factor: 1e18,
			},
			{
				prefix: "M",
				factor: 1e12,
			},
			{
				prefix: "k",
				factor: 1e6,
			},
			{
				prefix: "",
				factor: 1,
			},
			{
				prefix: "m",
				factor: 1e-6,
			},
			{
				prefix: "u",
				factor: 1e-12,
			},
			{
				prefix: "n",
				factor: 1e-18,
			},
			{
				prefix: "p",
				factor: 1e-24,
			},
		];
		for (let i = 0; i < prefixes.length; i++) {
			if (Math.abs(value) >= prefixes[i].factor) {
				return (
					(value / prefixes[i].factor).toFixed(2) +
					" " +
					prefixes[i].prefix +
					unit
				);
			}
		}
		return value.toFixed(2) + " " + unit;
	}
	function getlg(x) {
		return Math.log(x) / Math.log(10);
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
			timeUnit = "us";
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
			if (timeUnit === "s" || timeUnit === "ms" || timeUnit === "us") {
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
				p: "u",
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
	return {
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
	};
}
