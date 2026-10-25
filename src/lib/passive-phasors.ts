interface PhasorResult {
	values: Record<string, number>;
	issues?: readonly unknown[];
}
type DocumentAccess = Pick<Document, "getElementById">;
interface Diagram {
	canvas: string;
	legend: string;
	name: string;
	keys: readonly [string, string, string];
	labels: readonly [string, string, string];
	unit: string;
	direction: 1 | -1;
}
const diagrams: Record<"series" | "parallel", readonly Diagram[]> = {
	series: [
		{
			canvas: "phasorCanvasImpedance",
			legend: "phasorLegendImpedance",
			name: "Widerstandsdreieck",
			keys: ["R", "Xc", "Z"],
			labels: ["R", "X_C", "Z"],
			unit: "Ω",
			direction: 1,
		},
		{
			canvas: "phasorCanvasVoltage",
			legend: "phasorLegendVoltage",
			name: "Spannungsdreieck",
			keys: ["Ur", "Uc", "U"],
			labels: ["U_R", "U_C", "U"],
			unit: "V",
			direction: 1,
		},
	],
	parallel: [
		{
			canvas: "phasorCanvasAdmittance",
			legend: "phasorLegendAdmittance",
			name: "Leitwertdreieck",
			keys: ["G", "Bc", "Y"],
			labels: ["G", "B_C", "Y"],
			unit: "S",
			direction: -1,
		},
		{
			canvas: "phasorCanvasCurrent",
			legend: "phasorLegendCurrent",
			name: "Stromdreieck",
			keys: ["Ir", "Ic", "I"],
			labels: ["I_R", "I_C", "I"],
			unit: "A",
			direction: -1,
		},
	],
};
interface ViewState {
	values: boolean;
	angle: boolean;
}
const states = new WeakMap<HTMLCanvasElement, ViewState>();
const human = (value: number, unit: string) =>
	`${Number(value.toPrecision(7))} ${unit}`;
function arrow(
	ctx: CanvasRenderingContext2D,
	x1: number,
	y1: number,
	x2: number,
	y2: number,
	color: string,
) {
	ctx.strokeStyle = color;
	ctx.fillStyle = color;
	ctx.lineWidth = 3;
	ctx.beginPath();
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	ctx.stroke();
	const length = Math.hypot(x2 - x1, y2 - y1);
	if (length < 8) return;
	const angle = Math.atan2(y2 - y1, x2 - x1),
		head = Math.min(13, length / 3);
	ctx.beginPath();
	ctx.moveTo(x2, y2);
	ctx.lineTo(
		x2 - head * Math.cos(angle - 0.4),
		y2 - head * Math.sin(angle - 0.4),
	);
	ctx.lineTo(
		x2 - head * Math.cos(angle + 0.4),
		y2 - head * Math.sin(angle + 0.4),
	);
	ctx.closePath();
	ctx.fill();
}
export function phasorGeometry(
	real: number,
	reactive: number,
	width: number,
	height: number,
	direction: 1 | -1 = 1,
) {
	if (
		!Number.isFinite(real) ||
		!Number.isFinite(reactive) ||
		real < 0 ||
		reactive < 0 ||
		!Number.isFinite(width) ||
		!Number.isFinite(height) ||
		width <= 0 ||
		height <= 0
	)
		throw new Error("Ungültige Zeiger-Geometrie.");
	const left = Math.min(90, width * 0.15),
		right = width - Math.min(100, width * 0.15),
		top = Math.min(85, height * 0.2),
		bottom = height - top;
	const origin = { x: left, y: direction === 1 ? top : bottom };
	const maximum = Math.max(real, reactive);
	const nx = maximum === 0 ? 0 : real / maximum,
		ny = maximum === 0 ? 0 : reactive / maximum;
	const scale =
		maximum === 0
			? 0
			: Math.min(
					(right - left) / Math.max(nx, 1e-300),
					(bottom - top) / Math.max(ny, 1e-300),
				);
	const corner = { x: left + nx * scale, y: origin.y };
	const tip = { x: corner.x, y: origin.y + direction * ny * scale };
	return {
		left,
		right,
		top,
		bottom,
		origin,
		corner,
		tip,
		scale,
		nx,
		ny,
		angle: maximum === 0 ? undefined : Math.atan2(reactive, real),
	};
}
function paint(
	canvas: HTMLCanvasElement,
	diagram: Diagram,
	numbers: readonly [number, number, number],
	state: ViewState,
	example: boolean,
) {
	const ctx = canvas.getContext("2d");
	if (!ctx) return;
	const [real, reactive, magnitude] = numbers;
	const w = canvas.width,
		h = canvas.height;
	ctx.fillStyle = "#000";
	ctx.fillRect(0, 0, w, h);
	const { left, right, top, bottom, origin, corner, tip, scale, nx, ny } =
		phasorGeometry(real, reactive, w, h, diagram.direction);
	const max = Math.max(real, reactive, magnitude);
	ctx.font = "bold 21px Arial";
	ctx.fillStyle = "#eee";
	ctx.textAlign = "left";
	ctx.fillText(diagram.name, left, 35);
	if (example) {
		ctx.font = "15px Arial";
		ctx.fillStyle = "#aaa";
		ctx.fillText("Beispiel, keine berechneten Eingabewerte", left, 59);
	}
	ctx.strokeStyle = "#555";
	ctx.lineWidth = 1;
	ctx.beginPath();
	ctx.moveTo(left - 20, origin.y);
	ctx.lineTo(right + 35, origin.y);
	ctx.moveTo(left, top - 20);
	ctx.lineTo(left, bottom + 20);
	ctx.stroke();
	if (max === 0) {
		ctx.fillStyle = "#ddd";
		ctx.beginPath();
		ctx.arc(left, origin.y, 4, 0, Math.PI * 2);
		ctx.fill();
		ctx.font = "18px Arial";
		ctx.fillText(
			"Nullsignal: alle Komponenten sind 0.",
			left + 25,
			origin.y + diagram.direction * 30,
		);
		return;
	}
	// Normalize before scaling. This remains finite for subnormal and near-overflow
	// SI values, and keeps one common scale on both axes without distorting angles.

	arrow(ctx, origin.x, origin.y, corner.x, corner.y, "#ff9515");
	arrow(ctx, corner.x, corner.y, tip.x, tip.y, "#34a7b6");
	arrow(ctx, origin.x, origin.y, tip.x, tip.y, "#ddd");
	if (nx * scale > 20 && ny * scale > 20) {
		ctx.strokeStyle = "#777";
		ctx.lineWidth = 1;
		const dy = diagram.direction * 14;
		ctx.beginPath();
		ctx.moveTo(corner.x - 14, corner.y);
		ctx.lineTo(corner.x - 14, corner.y + dy);
		ctx.lineTo(corner.x, corner.y + dy);
		ctx.stroke();
	}
	const labels = diagram.labels.map((label, i) =>
		state.values ? `${label} = ${human(numbers[i], diagram.unit)}` : label,
	);
	ctx.font = "17px Arial";
	ctx.textAlign = "center";
	ctx.fillStyle = "#ff9515";
	ctx.fillText(
		labels[0],
		Math.min(right - 65, Math.max(left + 65, (origin.x + corner.x) / 2)),
		origin.y - diagram.direction * 22,
	);
	ctx.fillStyle = "#34a7b6";
	ctx.textAlign = "left";
	const labelX = Math.min(w - 220, corner.x + 20);
	ctx.fillText(
		labels[1],
		Math.max(left + 30, labelX),
		Math.max(top + 28, Math.min(bottom - 10, (corner.y + tip.y) / 2)),
	);
	ctx.fillStyle = "#ddd";
	ctx.textAlign = "left";
	ctx.fillText(labels[2], left + 30, h - 28);
	if (state.angle) {
		const phi = Math.atan2(reactive, real),
			radius = Math.min(55, Math.max(18, Math.min(nx * scale, ny * scale) / 3));
		ctx.strokeStyle = "#d8b568";
		ctx.lineWidth = 2;
		ctx.beginPath();
		if (diagram.direction === 1) ctx.arc(left, origin.y, radius, 0, phi);
		else ctx.arc(left, origin.y, radius, -phi, 0);
		ctx.stroke();
		ctx.font = "16px Arial";
		ctx.fillStyle = "#d8b568";
		ctx.fillText(
			`φ = ${Number(((phi * 180) / Math.PI).toPrecision(6))}°`,
			left + 75,
			origin.y + diagram.direction * 38,
		);
	}
}
function warning(canvas: HTMLCanvasElement, legend: HTMLElement, text: string) {
	const ctx = canvas.getContext("2d");
	if (ctx) {
		ctx.fillStyle = "#000";
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		ctx.fillStyle = "#bbb";
		ctx.font = "18px Arial";
		ctx.textAlign = "center";
		ctx.fillText(text, canvas.width / 2, canvas.height / 2);
	}
	legend.replaceChildren();
	const p = legend.ownerDocument.createElement("p");
	p.textContent = text;
	legend.append(p);
}
export function drawPassivePhasors(
	document: DocumentAccess,
	result: PhasorResult,
	parallel = false,
	example = false,
) {
	for (const diagram of diagrams[parallel ? "parallel" : "series"]) {
		const canvas = document.getElementById(
			diagram.canvas,
		) as HTMLCanvasElement | null;
		const legend = document.getElementById(diagram.legend);
		if (!canvas || !legend) continue;
		canvas.setAttribute("role", "img");
		canvas.setAttribute("aria-label", diagram.name);
		canvas.dataset.phasorExample = String(example);
		delete canvas.dataset.phasorReal;
		delete canvas.dataset.phasorReactive;
		delete canvas.dataset.phasorMagnitude;
		const values = diagram.keys.map((key) => result.values[key]);
		if (result.issues?.length) {
			canvas.dataset.phasorState = "invalid";
			warning(canvas, legend, "Ungültige Eingaben. Kein berechnetes Diagramm.");
			continue;
		}
		if (values.some((value) => value === undefined)) {
			canvas.dataset.phasorState = "insufficient";
			warning(
				canvas,
				legend,
				`Für dieses Diagramm fehlen ${diagram.labels.filter((_, i) => values[i] === undefined).join(", ")}.`,
			);
			continue;
		}
		const [real, reactive, magnitude] = values;
		const expected = Math.hypot(real, reactive);
		const consistent =
			expected === 0
				? magnitude === 0
				: Math.abs(magnitude / expected - 1) <= 1e-6;
		if (
			values.some((value) => !Number.isFinite(value) || value < 0) ||
			!consistent
		) {
			canvas.dataset.phasorState = "invalid";
			warning(
				canvas,
				legend,
				"Die Werte bilden kein gültiges rechtwinkliges Dreieck.",
			);
			continue;
		}
		const tuple = [real, reactive, magnitude] as const;
		canvas.dataset.phasorState = magnitude === 0 ? "zero" : "ready";
		canvas.dataset.phasorReal = String(real);
		canvas.dataset.phasorReactive = String(reactive);
		canvas.dataset.phasorMagnitude = String(magnitude);
		const state = states.get(canvas) ?? { values: true, angle: true };
		states.set(canvas, state);
		const draw = () => paint(canvas, diagram, tuple, state, example);
		draw();
		legend.replaceChildren();
		const owner = legend.ownerDocument;
		const description = owner.createElement("p");
		description.textContent =
			(example ? "Beispiel. " : "Berechnete Werte. ") +
			diagram.labels
				.map((label, i) => `${label} = ${human(tuple[i], diagram.unit)}`)
				.join("; ");
		legend.append(description);
		const phase = owner.createElement("p");
		phase.textContent =
			magnitude === 0
				? "Bei einem Nullsignal ist kein Phasenwinkel bestimmbar."
				: `Kapazitiver Winkel: ${parallel ? "+" : "−"}${Number(((Math.atan2(reactive, real) * 180) / Math.PI).toPrecision(7))}°. Beide Achsen verwenden denselben Maßstab.`;
		legend.append(phase);
		for (const [key, label] of [
			["values", "Werte"],
			["angle", "Winkel"],
		] as const) {
			const button = owner.createElement("button");
			button.type = "button";
			button.setAttribute("aria-label", `${diagram.name}: ${label} anzeigen`);
			const refresh = () => {
				button.textContent = `${label} ${state[key] ? "ausblenden" : "anzeigen"}`;
				button.setAttribute(
					"aria-label",
					`${diagram.name}: ${label} ${state[key] ? "ausblenden" : "anzeigen"}`,
				);
				button.setAttribute("aria-pressed", String(state[key]));
			};
			refresh();
			button.addEventListener("click", () => {
				state[key] = !state[key];
				refresh();
				draw();
			});
			legend.append(button);
		}
		const download = owner.createElement("button");
		download.type = "button";
		download.textContent = "PNG herunterladen";
		download.setAttribute(
			"aria-label",
			`${diagram.name} als PNG herunterladen`,
		);
		download.addEventListener("click", () => {
			canvas.toBlob((blob) => {
				if (!blob) return;
				const url = URL.createObjectURL(blob);
				const a = owner.createElement("a");
				a.href = url;
				a.download = `elecalculate-${diagram.canvas}.png`;
				a.click();
				setTimeout(() => URL.revokeObjectURL(url), 1000);
			}, "image/png");
		});
		legend.append(download);
	}
}
