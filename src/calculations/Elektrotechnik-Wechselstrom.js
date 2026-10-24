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
		let result_Sinus = "";
		const ut = parseInput(document.getElementById("ut-Sinus").value);
		let up = parseInput(document.getElementById("up-Sinus").value);
		const upp = parseInput(document.getElementById("upp-Sinus").value);
		const Ueff = parseInput(document.getElementById("Ueff-Sinus").value);
		const f = parseInput(document.getElementById("f-Sinus").value);
		const t = parseInput(document.getElementById("t-Sinus").value);
		const T = parseInput(document.getElementById("T-Sinus").value);
		const phi = parseInput(document.getElementById("phi-Sinus").value);
		let phi_rad = phi;
		if (phi && !isRADactive) {
			phi_rad = phi * (Math.PI / 180);
		}
		if (!ut) {
			if (up && f && t) {
				const calculated_ut =
					up * Math.sin(2 * Math.PI * f * t + (phi_rad || 0));
				result_Sinus += `
                        \\[
                        u(t) = \\hat{u} \\cdot \\sin(2\\pi f t + \\varphi) \\\\
                        = ${up}\\,\\mathrm{V} \\cdot \\sin(2\\pi \\cdot ${f}\\,\\mathrm{Hz} \\cdot ${t}\\,\\mathrm{s} + ${formatNumber(phi_rad, 3)}\\,\\mathrm{rad}) \\\\
                        = ${formatNumber(calculated_ut, 3)}\\,\\mathrm{V}
                        \\]
                    `;
			}
		}
		if (!up) {
			if (ut && f && t) {
				up = ut / Math.sin(2 * Math.PI * f * t + (phi_rad || 0));
				result_Sinus += `
                        \\[
                        \\hat{u} = \\frac{u(t)}{\\sin(2\\pi f t + \\varphi)} \\\\
                        = \\frac{${formatNumber(ut, 3)}\\,\\mathrm{V}}{\\sin(2\\pi \\cdot ${f}\\,\\mathrm{Hz} \\cdot ${t}\\,\\mathrm{s} + ${formatNumber(phi_rad, 3)}\\,\\mathrm{rad})} \\\\
                        = ${formatNumber(up, 3)}\\,\\mathrm{V}
                        \\]
                    `;
			} else if (upp) {
				up = upp / 2;
				result_Sinus += `
                        \\[
                        \\hat{u} = \\frac{u_{pp}}{2} \\\\
                        = \\frac{${formatNumber(upp, 3)}\\,\\mathrm{V}}{2} \\\\
                        = ${formatNumber(up, 3)}\\,\\mathrm{V}
                        \\]
                    `;
			} else if (Ueff) {
				up = Ueff * Math.sqrt(2);
				result_Sinus += `
                        \\[
                        \\hat{u} = U_{\\mathrm{eff}} \\cdot \\sqrt{2} \\\\
                        = ${formatNumber(Ueff, 3)}\\,\\mathrm{V} \\cdot \\sqrt{2} \\\\
                        = ${formatNumber(up, 3)}\\,\\mathrm{V}
                        \\]
                    `;
			}
		}
		let calculated_upp = upp;
		if (!upp) {
			if (up) {
				calculated_upp = up * 2;
				result_Sinus += `
                        \\[
                        u_{pp} = \\hat{u} \\cdot 2 \\\\
                        = ${formatNumber(up, 3)}\\,\\mathrm{V} \\cdot 2 \\\\
                        = ${formatNumber(calculated_upp, 3)}\\,\\mathrm{V}
                        \\]
                    `;
			} else if (Ueff) {
				calculated_upp = Ueff * 2 * Math.sqrt(2);
				result_Sinus += `
                        \\[
                        u_{pp} = U_{\\mathrm{eff}} \\cdot 2 \\cdot \\sqrt{2} \\\\
                        = ${formatNumber(Ueff, 3)}\\,\\mathrm{V} \\cdot 2 \\cdot \\sqrt{2} \\\\
                        = ${formatNumber(calculated_upp, 3)}\\,\\mathrm{V}
                        \\]
                    `;
			}
		}
		let calculated_Ueff = Ueff;
		if (!Ueff) {
			if (up) {
				calculated_Ueff = up / Math.sqrt(2);
				result_Sinus += `
                        \\[
                        U_{\\mathrm{eff}} = \\frac{\\hat{u}}{\\sqrt{2}} \\\\
                        = \\frac{${formatNumber(up, 3)}\\,\\mathrm{V}}{\\sqrt{2}} \\\\
                        = ${formatNumber(calculated_Ueff, 3)}\\,\\mathrm{V}
                        \\]
                    `;
			} else if (upp) {
				calculated_Ueff = upp / (2 * Math.sqrt(2));
				result_Sinus += `
                        \\[
                        U_{\\mathrm{eff}} = \\frac{u_{pp}}{2 \\cdot \\sqrt{2}} \\\\
                        = \\frac{${formatNumber(upp, 3)}\\,\\mathrm{V}}{2 \\cdot \\sqrt{2}} \\\\
                        = ${formatNumber(calculated_Ueff, 3)}\\,\\mathrm{V}
                        \\]
                    `;
			}
		}
		let calculated_f = f;
		if (!f) {
			if (T) {
				calculated_f = 1 / T;
				result_Sinus += `
                        \\[
                        f = \\frac{1}{T} \\\\
                        = \\frac{1}{${formatNumber(T, 3)}\\,\\mathrm{s}} \\\\
                        = ${formatNumber(calculated_f, 3)}\\,\\mathrm{Hz}
                        \\]
                    `;
			}
		}
		let calculated_T = T;
		if (!T) {
			if (f) {
				calculated_T = 1 / f;
				result_Sinus += `
                        \\[
                        T = \\frac{1}{f} \\\\
                        = \\frac{1}{${formatNumber(f, 3)}\\,\\mathrm{Hz}} \\\\
                        = ${formatNumber(calculated_T * 1000, 3)}\\,\\mathrm{ms}
                        \\]
                    `;
			}
		}
		let calculated_phi_rad = phi_rad;
		let calculated_phi_deg = phi;
		if (!phi) {
			if (ut && up && f && t) {
				const angle = Math.asin(ut / up);
				calculated_phi_rad = angle - 2 * Math.PI * f * t;
				calculated_phi_deg = calculated_phi_rad * (180 / Math.PI);
				result_Sinus += `
                        \\[
                        \\varphi = \\arcsin\\left(\\frac{u(t)}{\\hat{u}}\\right) - 2\\pi f t \\\\
                        = \\arcsin\\left(\\frac{${formatNumber(ut, 3)}\\,\\mathrm{V}}{${formatNumber(up, 3)}\\,\\mathrm{V}}\\right) - 2\\pi \\cdot ${formatNumber(f, 3)}\\,\\mathrm{Hz} \\cdot ${formatNumber(t, 3)}\\,\\mathrm{s} \\\\
                        = ${formatNumber(calculated_phi_rad, 3)}\\,\\mathrm{rad} = ${formatNumber(calculated_phi_deg, 3)}\\,\\mathrm{°}
                        \\]
                    `;
			}
		}
		setHTML(document.getElementById("result_Sinus"), result_Sinus);
		MathJax.typeset();
		drawSinus(
			up || calculated_Ueff * Math.sqrt(2),
			calculated_f || f,
			calculated_phi_rad || phi_rad,
			t || 0,
			2,
			8,
		);
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
		if (!canvas) return;
		const link = document.createElement("a");
		link.download = canvasId + ".png";
		link.href = canvas.toDataURL("image/png");
		link.click();
	}
	function drawSinus(up, f, phi, tMarker, periods = 2, speed = 1) {
		const canvas = document.getElementById("sinusCanvas");
		if (!canvas) return;
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
		const scaleY = (midY - 20) / up;
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
			canvas.addEventListener("click", function (e) {
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
				ut: "",
				up: "",
				upp: "",
				Ueff: "230",
				f: "50",
				t: "0.022",
				T: "",
				phi: "0",
				angleUnit: "deg",
			},
			functionGen: {
				ut: "",
				up: "5",
				upp: "",
				Ueff: "",
				f: "1k",
				t: "0.00050",
				T: "",
				phi: "-45",
				angleUnit: "deg",
			},
		};
		const values = examples[exampleName];
		if (!values) return;
		document.getElementById("ut-Sinus").value = values.ut;
		document.getElementById("up-Sinus").value = values.up;
		document.getElementById("upp-Sinus").value = values.upp;
		document.getElementById("Ueff-Sinus").value = values.Ueff;
		document.getElementById("f-Sinus").value = values.f;
		document.getElementById("t-Sinus").value = values.t;
		document.getElementById("T-Sinus").value = values.T;
		document.getElementById("phi-Sinus").value = values.phi;
		if (values.angleUnit === "deg" && isRADactive) {
			toggleRAD();
		} else if (values.angleUnit === "rad" && !isRADactive) {
			toggleRAD();
		}
		calculate_Sinus();
	}
	function calculate_Rechteck() {
		let result_Rechteck = ``;
		const up = document.getElementById("up-Rechteck").value;
		const upp = document.getElementById("upp-Rechteck").value;
		const Ueff = document.getElementById("Ueff-Rechteck").value;
		if (!up) {
			if (upp) {
				result_Rechteck += `
                        Peakspannung &ucirc; =
                        <div class="fraction">
                            <span>u<sub>pp</sub></span><br>
                            <span class="fraction-denominator">2</span>
                        </div>
                        = <div class="fraction">
                            <span>${upp}V</span><br>
                            <span class="fraction-denominator">2</span>
                        </div>
                        = ${formatWithPrefix(parseInput(upp) / 2, "V")}<br>`;
			}
			if (Ueff) {
				result_Rechteck += `
                        Peakspannung &ucirc; = U<sub>eff</sub>
                        = ${Ueff}V<br>`;
			}
		}
		if (!upp) {
			if (up) {
				result_Rechteck += `
                        Peak-Peakspannung u<sub>pp</sub> = 2 &lowast; &ucirc;
                        = 2 &lowast; ${up}V
                        = ${formatWithPrefix(2 * parseInput(up), "V")}<br>`;
			}
			if (Ueff) {
				result_Rechteck += `
                        Peak-Peakspannung u<sub>pp</sub> = 2 &lowast; U<sub>eff</sub>
                        = 2 &lowast; ${Ueff}V
                        = ${formatWithPrefix(2 * parseInput(Ueff), "V")}<br>`;
			}
		}
		if (!Ueff) {
			if (up) {
				result_Rechteck += `
                        Effektivspannung U<sub>eff</sub> = &ucirc;
                        = ${up}V<br>`;
			}
			if (upp) {
				result_Rechteck += `
                        Effektivspannung U<sub>eff</sub> =
                        <div class="fraction">
                            <span>u<sub>pp</sub></span><br>
                            <span class="fraction-denominator">2</span>
                        </div>
                        = <div class="fraction">
                            <span>${upp}V</span><br>
                            <span class="fraction-denominator">2</span>
                        </div>
                        = ${formatWithPrefix(parseInput(upp) / 2, "V")}<br>`;
			}
		}
		setHTML(document.getElementById("result_Rechteck"), result_Rechteck);
	}
	function calculate_Dreieck() {
		let result_Dreieck = ``;
		const Ueff = document.getElementById("Ueff-Dreieck").value;
		const up = document.getElementById("up-Dreieck").value;
		const upp = document.getElementById("upp-Dreieck").value;
		if (!up) {
			if (upp) {
				result_Dreieck += `
                        Peakspannung &ucirc; = 
                        <div class ="fraction">
                            <span> u<sub>pp</sub> </span><br>
                            <span class="fraction-denominator">2</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span>${upp}V<br>
                            <span class="fraction-denominator">2</span>
                        </div> 
                    = ${formatWithPrefix(parseInput(upp) / 2, "V")}<br>`;
			}
			if (Ueff) {
				result_Dreieck += `
                        Peakspannung &ucirc; = U<sub>eff</sub> &lowast; &radic;3
                    =
                        ${Ueff}V &lowast; &radic;3
                    = ${formatWithPrefix(parseInput(Ueff) * Math.pow(3, 0.5), "V")}<br>`;
			}
		}
		if (!upp) {
			if (up) {
				result_Dreieck += `
                        Peak-Peakspannung u<sub>pp</sub> =  u<sub>p</sub> &lowast; 2 
                    =
                        ${up}V &lowast; 2 
                    = ${formatWithPrefix(parseInput(up) * 2, "V")}<br>`;
			}
			if (Ueff) {
				result_Dreieck += `
                        Peak-Peakspannung u<sub>pp</sub> =  U<sub>eff</sub> &lowast; 2 &lowast; &radic;3
                    =
                        ${Ueff}V &lowast; 2 &lowast; &radic;3
                    = ${formatWithPrefix(parseInput(Ueff) * 2 * Math.pow(3, 0.5), "V")}<br>`;
			}
		}
		if (!Ueff) {
			if (up) {
				result_Dreieck += `
                        Effektivspannung U<sub>eff</sub> = 
                        <div class ="fraction">
                            <span> &ucirc; </span><br>
                            <span class="fraction-denominator">&radic;3</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span>${up}V<br>
                            <span class="fraction-denominator">&radic;3</span>
                        </div> 
                    = ${formatWithPrefix(parseInput(up) / Math.pow(3, 0.5), "V")}<br>`;
			}
			if (upp) {
				result_Dreieck += `
                        Effektivspannung U<sub>eff</sub> = 
                        <div class ="fraction">
                            <span> u<sub>pp</sub> </span><br>
                            <span class="fraction-denominator">2 &lowast; &radic;3</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span>${upp}V<br>
                            <span class="fraction-denominator">2 &lowast; &radic;3</span>
                        </div> 
                    = ${formatWithPrefix(parseInput(upp) / (2 * Math.pow(3, 0.5)), "V")}<br>`;
			}
		}
		setHTML(document.getElementById("result_Dreieck"), result_Dreieck);
	}
	function calculate_PWM() {
		let result_PWM = ``;
		const up = document.getElementById("up-PWM").value;
		const Ueff = document.getElementById("Ueff-PWM").value;
		const f = document.getElementById("f-PWM").value;
		const tin = document.getElementById("tin-PWM").value;
		const T = document.getElementById("T-PWM").value;
		const g = document.getElementById("g-PWM").value;
		if (!up) {
			if (up && g && isPercent) {
				result_PWM += `
                        Effektivspannung U<sub>eff</sub> = 
                        <div class ="fraction">
                            <span> U<sub>eff</sub> </span><br>
                            <span class="fraction-denominator">&radic;g</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span>${Ueff}V<br>
                            <span class="fraction-denominator">&radic;${g}%</span>
                        </div> 
                    = ${formatWithPrefix(parseInput(Ueff) / Math.pow(parseInput(g) / 100, 0.5), "V")}<br>`;
			}
			if (up && g && !isPercent) {
				result_PWM += `
                        Effektivspannung U<sub>eff</sub> = 
                        <div class ="fraction">
                            <span> U<sub>eff</sub> </span><br>
                            <span class="fraction-denominator">&radic;g</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span>${Ueff}V<br>
                            <span class="fraction-denominator">&radic;${g}</span>
                        </div> 
                    = ${formatWithPrefix(parseInput(Ueff) / Math.pow(parseInput(g), 0.5), "V")}<br>`;
			}
		}
		if (!Ueff) {
			if (up && g && isPercent) {
				result_PWM += `
                    Effektivspannung U<sub>eff</sub> = &ucirc; &lowast; &radic;g
                =
                    ${up}V &lowast; &radic;${g}%
                = ${formatWithPrefix(parseInput(up) * Math.pow(parseInput(g) / 100, 0.5), "V")}<br>`;
			}
			if (up && g && !isPercent) {
				result_PWM += `
                    Effektivspannung U<sub>eff</sub> = &ucirc; &lowast; &radic;g
                =
                    ${up}V &lowast; &radic;${g}
                = ${formatWithPrefix(parseInput(up) * Math.pow(parseInput(g), 0.5), "V")}<br>`;
			}
		}
		if (!f) {
			if (T) {
				result_PWM += `
                        Frequnez f = 
                        <div class ="fraction">
                            <span> 1 </span><br>
                            <span class="fraction-denominator">T</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span>1<br>
                            <span class="fraction-denominator">${T}s</span>
                        </div> 
                    = ${formatWithPrefix(1 / parseInput(T), "Hz")}<br>`;
			}
		}
		if (!tin) {
			if (T && g && isPercent) {
				result_PWM += `
                    Impulsdauer t<sub>in</sub> = T &lowast; g
                =
                    ${T}s &lowast; ${g}%
                = ${formatWithPrefix((parseInput(T) * parseInput(g)) / 100, "s")}<br>`;
			}
			if (T && g && !isPercent) {
				result_PWM += `
                    Impulsdauer t<sub>in</sub> = T &lowast; g
                =
                    ${T}s &lowast; ${g}
                = ${formatWithPrefix(parseInput(T) * parseInput(g), "s")}<br>`;
			}
			if (f && g && isPercent) {
				result_PWM += `
                        Impulsdauer t<sub>in</sub> = 
                        <div class ="fraction">
                            <span> g </span><br>
                            <span class="fraction-denominator">f</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span>${g}%<br>
                            <span class="fraction-denominator">${f}Hz</span>
                        </div> 
                = ${formatWithPrefix(parseInput(g) / (parseInput(f) * 100), "s")}<br>`;
			}
			if (f && g && !isPercent) {
				result_PWM += `
                        Impulsdauer t<sub>in</sub> = 
                        <div class ="fraction">
                            <span> g </span><br>
                            <span class="fraction-denominator">f</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span>${g}<br>
                            <span class="fraction-denominator">${f}Hz</span>
                        </div> 
                = ${formatWithPrefix(parseInput(g) / parseInput(f), "s")}<br>`;
			}
		}
		if (!T) {
			if (f) {
				result_PWM += `
                        Periodendauer T = 
                        <div class ="fraction">
                            <span> 1 </span><br>
                            <span class="fraction-denominator">f</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span>1<br>
                            <span class="fraction-denominator">${f}Hz</span>
                        </div> 
                    = ${formatWithPrefix(1 / parseInput(f), "s")}<br>`;
			}
			if (tin && g && isPercent) {
				result_PWM += `
                        Periodenzeit = 
                        <div class ="fraction">
                            <span> t<sub>in</sub> </span><br>
                            <span class="fraction-denominator">g</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span>${tin}s<br>
                            <span class="fraction-denominator">${g}%</span>
                        </div> 
                    = ${formatWithPrefix(parseInput(tin) / (parseInput(g) / 100), "s")}<br>`;
			}
			if (tin && g && !isPercent) {
				result_PWM += `
                        Periodenzeit = 
                        <div class ="fraction">
                            <span> t<sub>in</sub> </span><br>
                            <span class="fraction-denominator">g</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span>${tin}s<br>
                            <span class="fraction-denominator">${g}</span>
                        </div> 
                    = ${formatWithPrefix(parseInput(tin) / parseInput(g), "s")}<br>`;
			}
		}
		if (!g) {
			if (tin && T) {
				result_PWM += `
                        Duty-Cycle g = 
                        <div class ="fraction">
                            <span> t<sub>in</sub> </span><br>
                            <span class="fraction-denominator">T</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span>${tin}s<br>
                            <span class="fraction-denominator">${T}s</span>
                        </div> 
                    = ${formatWithPrefix(parseInput(tin) / parseInput(T), "")}
                    = ${formatWithPrefix((parseInput(tin) * 100) / parseInput(T), "%")}<br>`;
			}
			if (Ueff && up) {
				result_PWM += `
                        Duty-Cycle g = 
                        (<div class ="fraction">
                            <span> U<sub>eff</sub> </span><br>
                            <span class="fraction-denominator">&ucirc;</span>
                        </div>)<sup>2</sup>
                    =
                        (<div class ="fraction">
                            <span>${Ueff}V<br>
                            <span class="fraction-denominator">${up}V</span>
                        </div>)<sup>2</sup>
                    = ${formatWithPrefix(Math.pow(parseInput(Ueff) / parseInput(up), 2), "")}
                    = ${formatWithPrefix(100 * Math.pow(parseInput(Ueff) / parseInput(up), 2), "%")}<br>`;
			}
		}
		setHTML(document.getElementById("result_PWM"), result_PWM);
	}
	return {
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
