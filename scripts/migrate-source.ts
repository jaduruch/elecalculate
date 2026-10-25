import { parse as parseHTML } from "parse5";
import { parse as parseJS } from "@babel/parser";
import generate from "@babel/generator";
import traverse from "@babel/traverse";
import {
	patchCalculationProgram,
	patchSimulationSource,
	simulationState,
} from "./calculation-patches";
import { readdir, readFile, writeFile, mkdir } from "node:fs/promises";
import { join, dirname, posix } from "node:path";
type Node = {
	nodeName: string;
	tagName?: string;
	value?: string;
	attrs?: { name: string; value: string }[];
	childNodes?: Node[];
};
const source = "migration/source";
const shared = await readFile(join(source, "scripts.js"), "utf8");
const sharedAST = parseJS(shared, { sourceType: "script" });
const sharedBody = sharedAST.program.body.filter(
	(n) =>
		!(
			n.type === "FunctionDeclaration" &&
			n.id &&
			["parseInput", "parseInputsquare", "toggleMenu"].includes(n.id.name)
		),
);
const formatterNames = [
	"formatWithPrefix",
	"formatWithPrefixsquare",
	"formatPrefixNoUnit",
	"formatPrefixNoUnitSquare",
];
const sharedFunctions = sharedBody.filter(
	(n) =>
		!(
			n.type === "FunctionDeclaration" &&
			n.id &&
			formatterNames.includes(n.id.name)
		),
);
const sharedMethods = sharedBody
	.filter((n) => n.type === "FunctionDeclaration" && n.id)
	.map((n) => (n as any).id.name);
await writeFile(
	"src/calculations/shared.js",
	`import {${formatterNames.join(",")}} from '../lib/format-si';\nexport function createShared(scope){const {document,window,requestAnimationFrame,cancelAnimationFrame,setTimeout,clearTimeout}=scope;${sharedFunctions.map((n) => generate(n, { comments: false }).code).join("\n")}return {${sharedMethods.join(",")}};}`
		.replaceAll("../Pictures/", "/Pictures/")
		.replaceAll("\u2014", ", ")
		.replaceAll("\u2013", "-"),
);
const cases: {
	file: string;
	title: string;
	category: string;
	slug: string;
	inputs: number;
	canvases: number;
	handlers: string[];
	sections: string[];
}[] = [];
const voids = new Set([
	"area",
	"base",
	"br",
	"col",
	"embed",
	"hr",
	"img",
	"input",
	"link",
	"meta",
	"param",
	"source",
	"track",
	"wbr",
]);
const names: Record<string, string> = {
	class: "className",
	for: "htmlFor",
	tabindex: "tabIndex",
	readonly: "readOnly",
	colspan: "colSpan",
	rowspan: "rowSpan",
	cellpadding: "cellPadding",
	cellspacing: "cellSpacing",
	maxlength: "maxLength",
	frameborder: "frameBorder",
	allowfullscreen: "allowFullScreen",
	autocomplete: "autoComplete",
	contenteditable: "contentEditable",
	viewbox: "viewBox",
	preserveaspectratio: "preserveAspectRatio",
	strokeWidth: "strokeWidth",
	srcset: "srcSet",
};
const events: Record<string, string> = {
	onclick: "onClick",
	onchange: "onChange",
	oninput: "onInput",
	onkeyup: "onKeyUp",
	onmouseover: "onMouseOver",
	onmouseout: "onMouseOut",
	onmouseenter: "onMouseEnter",
	onmouseleave: "onMouseLeave",
	onkeydown: "onKeyDown",
	onsubmit: "onSubmit",
};
function walk(n: Node, predicate: (n: Node) => boolean): Node[] {
	return [
		...(predicate(n) ? [n] : []),
		...(n.childNodes ?? []).flatMap((c) => walk(c, predicate)),
	];
}
function text(n: Node): string {
	return n.nodeName === "#text"
		? (n.value ?? "")
		: (n.childNodes ?? []).map(text).join("");
}
function resolveAsset(url: string, file: string) {
	url = url.replace(/R_(Serie|Parallel)\.png$/, "R_$1.svg");
	if (/^(?:https?:|data:|mailto:|tel:|#)/.test(url)) return url;
	if (url.startsWith("/")) return url;
	return (
		"/" +
		posix.normalize(posix.join(posix.dirname(file), url)).replace(/^\.\//, "")
	);
}
function style(value: string) {
	const out: Record<string, string> = {};
	for (const rule of value.split(";")) {
		const i = rule.indexOf(":");
		if (i < 0) continue;
		const name = rule.slice(0, i).trim();
		const val = rule.slice(i + 1).trim();
		if (!name || !val) continue;
		out[
			name.startsWith("--")
				? name
				: name.replace(/-([a-z])/g, (_, c) => c.toUpperCase())
		] = val;
	}
	return out;
}
function expression(code: string) {
	code = code
		.replaceAll("'OPV_Bilder/", "'/Elektronik/OPV_Bilder/")
		.replaceAll('"OPV_Bilder/', '"/Elektronik/OPV_Bilder/');
	const ast = parseJS(code, {
		allowReturnOutsideFunction: true,
		sourceType: "script",
	});
	return ast.program.body
		.map((n) => generate(n).code)
		.join("\n")
		.replace(/\bthis\b/g, "event.currentTarget")
		.replace(/(?<![.\w])([A-Za-z_$][\w$]*)\s*\(/g, (m, name) =>
			["if", "Number", "parseFloat", "parseInt"].includes(name)
				? m
				: `controller.current?.invoke?.(${JSON.stringify(name)},event.currentTarget, `,
		);
}
for (const section of ["Allgemein", "Elektrotechnik", "Elektronik", "HST"]) {
	for (const filename of (await readdir(join(source, section)))
		.filter((f) => f.endsWith(".html"))
		.sort()) {
		const file = section + "/" + filename;
		let raw = await readFile(join(source, file), "utf8");
		raw = raw
			.replaceAll("P [Watt]", "W [Watt]")
			.replaceAll("Landung Q", "Ladung Q")
			.replaceAll("[Henri]", "[Henry]")
			.replaceAll("Activ Filter", "Aktive Filter")
			.replaceAll("Stern- Dreickschaltung", "Stern-Dreieckschaltung")
			.replaceAll("Spulen berechnungen", "Spulenberechnungen")
			.replaceAll("Kondensator berechnungen", "Kondensatorberechnungen")
			.replaceAll("E-Reihe Auswählen:", "E-Reihe auswählen:");
		if (file === "Elektrotechnik/Spule.html")
			raw = raw
				.replace("C = 15&mu;H", "L = 15&mu;H")
				.replace("nicht 15uF", "nicht 15uH");
		// Keep the demonstration focused on gates, state and measurement.
		if (file === "Allgemein/Qubit.html")
			raw = raw.replace(/<div id="easter-egg-hint"[^>]*>[\s\S]*?<\/div>/, "");
		const dom = parseHTML(raw.replace(/<tr">/g, "<tr>")) as unknown as Node;
		const main = walk(dom, (n) => n.tagName === "main")[0];
		if (!main) throw Error("Missing main: " + file);
		// Connect existing visible labels and units without changing saved field IDs.
		for (const parent of walk(main, (n) => !!n.childNodes)) {
			const fields = parent.childNodes!.filter((n) =>
				["input", "select", "textarea"].includes(n.tagName ?? ""),
			);
			const labels = parent.childNodes!.filter((n) => n.tagName === "label");
			if (fields.length !== 1 || !labels.length) continue;
			const field = fields[0];
			const id = field.attrs?.find((a) => a.name === "id")?.value;
			if (!id) continue;
			const label = labels[0];
			label.attrs ??= [];
			if (!label.attrs.some((a) => a.name === "for"))
				label.attrs.push({ name: "for", value: id });
			if (
				labels.length > 1 &&
				parent.attrs?.some(
					(a) =>
						a.name === "class" && a.value.split(/\s+/).includes("form-row"),
				)
			) {
				const unit = labels.at(-1)!;
				unit.attrs ??= [];
				let unitId = unit.attrs.find((a) => a.name === "id")?.value;
				if (!unitId) {
					unitId = id + "-unit";
					unit.attrs.push({ name: "id", value: unitId });
				}
				field.attrs ??= [];
				const description = field.attrs.find(
					(a) => a.name === "aria-describedby",
				);
				if (description) description.value += " " + unitId;
				else field.attrs.push({ name: "aria-describedby", value: unitId });
			}
			if (id === "theta-slider" || id === "phi-slider")
				field.attrs!.push({
					name: "aria-label",
					value:
						id === "theta-slider"
							? "Polar angle θ (degrees)"
							: "Azimuthal angle φ (degrees)",
				});
		}

		if (file === "Elektrotechnik/Wechselstrom.html") {
			const times = walk(
				main,
				(n) =>
					n.attrs?.some((a) => a.name === "id" && a.value === "t-Sinus") ===
					true,
			);
			for (const duplicate of times.slice(1)) {
				const row = (duplicate as any).parentNode;
				const parent = row?.parentNode;
				if (parent)
					parent.childNodes = parent.childNodes.filter(
						(child: Node) => child !== row,
					);
			}
		}

		if (file === "Allgemein/Widerstandstabelle.html") {
			const options = walk(
				main,
				(n) =>
					n.attrs?.some(
						(a) => a.name === "id" && a.value === "multiplierDropdown",
					) === true,
			)[0];
			if (options)
				for (const [id, value, label, color] of [
					["multiplier-gold", "0.1", "Gold", "#b79c40"],
					["multiplier-silver", "0.01", "Silber", "#c0c0c0"],
				])
					options.childNodes!.push({
						nodeName: "div",
						tagName: "div",
						attrs: [
							{ name: "id", value: id },
							{ name: "data-value", value },
							{ name: "style", value: `background-color:${color};color:#000;` },
						],
						childNodes: [{ nodeName: "#text", value: label }],
					});
		}

		if (file === "Elektronik/OPV.html")
			for (const [id, label] of [
				["R24-4", "Widerstand R2/R4"],
				["Uin2-4", "Spannung Uin2"],
			]) {
				const input = walk(
					main,
					(n) =>
						n.attrs?.some((a) => a.name === "id" && a.value === id) === true,
				)[0];
				const row = (input as any)?.parentNode;
				const name = row?.childNodes?.find((n: Node) => n.tagName === "label");
				if (name) name.childNodes = [{ nodeName: "#text", value: label }];
			}
		const slug = (section + "-" + filename.replace(".html", "")).replaceAll(
			"_",
			"-",
		);
		const scripts = walk(
			dom,
			(n) =>
				n.tagName === "script" &&
				!n.attrs?.some((a) => a.name === "src" || a.name === "type"),
		)
			.map(text)
			.filter((s) => !s.includes("document.write"));
		let pageCode = scripts.join("\n").replaceAll("debugger;", "");
		if (file.includes("Widerstandstabelle"))
			pageCode = pageCode.replaceAll(
				".dropdown-content div",
				".dropdown-content button",
			);
		// Dynamic controls are dispatched through an explicit method name, never evaluated.
		if (file.includes("Widerstandstabelle"))
			pageCode = pageCode.replaceAll(
				"${resistance}Ω",
				"${Number(resistance.toPrecision(12))}Ω",
			);
		pageCode = pageCode
			.replace(
				/onclick="calculate\('\$\{opv\}'\)"/g,
				'data-ec-function="calculate" data-ec-arg="${opv}"',
			)
			.replace(
				/onclick="closeQuantumNewYear\(\)"/g,
				'data-ec-function="closeQuantumNewYear"',
			);
		// Resolve all dynamic image URLs from the original route, including mounted assets.
		pageCode = pageCode
			.replaceAll("../Pictures/", "/Pictures/")
			.replaceAll("'OPV_Bilder/", "'/Elektronik/OPV_Bilder/")
			.replaceAll('"OPV_Bilder/', '"/Elektronik/OPV_Bilder/');
		pageCode = pageCode.replace('<br><br><div id="result_S_P"></div>', "");
		pageCode = pageCode.replace(/PDFObject\.embed\([\s\S]*?\);/g, "");
		pageCode = patchSimulationSource(file, pageCode);
		const pageAST = parseJS(pageCode, { sourceType: "script" });
		for (let i = 0; i < pageAST.program.body.length; i++) {
			const node = pageAST.program.body[i];
			if (
				node.type === "FunctionDeclaration" &&
				node.id &&
				[
					"calculateUnb_Spannungsteiler",
					"calculateBel_Spannungsteiler",
				].includes(node.id.name)
			)
				pageAST.program.body[i] = parseJS(
					`function ${node.id.name}(){return calculateDivider(document,${node.id.name === "calculateBel_Spannungsteiler"});}`,
				).program.body[0];
		}

		const opamps: Record<string, string> = {
			calculate_invertierender_Verstaerker: "inverting",
			calculate_nicht_invertierender_Verstaerker: "noninverting",
			calculate_summier_Verstaeker: "summing",
			calculate_differenz_Verstaerker: "difference",
		};
		for (let i = 0; i < pageAST.program.body.length; i++) {
			const n = pageAST.program.body[i];
			if (n.type !== "FunctionDeclaration" || !n.id) continue;
			if (file.includes("/OPV.html") && opamps[n.id.name])
				pageAST.program.body[i] = parseJS(
					`function ${n.id.name}(){return calculateOpamp(document,${JSON.stringify(opamps[n.id.name])});}`,
				).program.body[0];
			if (
				file === "Elektrotechnik/Drehstrom.html" &&
				n.id.name === "updateOutputVoltage"
			)
				pageAST.program.body[i] = parseJS(
					"function updateOutputVoltage(){return updateThreePhase(document);}",
				).program.body[0];
			if (
				file === "Elektrotechnik/Drehstrom.html" &&
				["toggleCircuit", "toggleSymmetry", "toggleNeutral"].includes(n.id.name)
			)
				n.body.body.push(parseJS("updateOutputVoltage();").program.body[0]);
		}
		if (file === "Elektrotechnik/Drehstrom.html")
			pageAST.program.body.push(
				parseJS(
					"document.addEventListener('DOMContentLoaded',()=>updateOutputVoltage());",
				).program.body[0],
			);
		patchCalculationProgram(file, pageAST.program);
		traverse(pageAST, {
			CallExpression(path) {
				const n = path.node;
				if (
					n.callee.type === "MemberExpression" &&
					!n.callee.computed &&
					n.callee.property.type === "Identifier" &&
					n.callee.property.name === "addEventListener" &&
					!(
						n.callee.object.type === "Identifier" &&
						["window", "document"].includes(n.callee.object.name)
					)
				) {
					path.replaceWith({
						type: "CallExpression",
						callee: {
							type: "MemberExpression",
							object: { type: "Identifier", name: "scope" },
							property: { type: "Identifier", name: "listen" },
							computed: false,
						},
						arguments: [n.callee.object, ...n.arguments],
					} as any);
					path.skip();
				}
			},
			VariableDeclarator(path) {
				const n = path.node;
				if (
					file.includes("Widerstandstabelle") &&
					n.id.type === "Identifier" &&
					n.id.name === "multiplier" &&
					n.init?.type === "CallExpression" &&
					n.init.callee.type === "Identifier" &&
					n.init.callee.name === "parseInt"
				) {
					n.init.callee.name = "parseFloat";
					n.init.arguments = n.init.arguments.slice(0, 1);
				}
			},
			AssignmentExpression(path) {
				const n = path.node;
				if (
					n.left.type === "MemberExpression" &&
					!n.left.computed &&
					n.left.property.type === "Identifier" &&
					n.left.property.name === "innerHTML"
				) {
					const target = n.left.object;
					const value =
						n.operator === "+="
							? {
									type: "BinaryExpression",
									operator: "+",
									left: n.left,
									right: n.right,
								}
							: n.right;
					path.replaceWith({
						type: "CallExpression",
						callee: { type: "Identifier", name: "setHTML" },
						arguments: [target, value],
					} as any);
					path.skip();
				}
			},
		});
		const pageNames = new Set(
			pageAST.program.body.flatMap((n) =>
				n.type === "FunctionDeclaration" && n.id
					? [n.id.name]
					: n.type === "VariableDeclaration"
						? n.declarations.flatMap((d) =>
								d.id.type === "Identifier" ? [d.id.name] : [],
							)
						: [],
			),
		);
		const common = sharedAST.program.body.filter(
			(n) =>
				!(
					n.type === "FunctionDeclaration" &&
					n.id &&
					(pageNames.has(n.id.name) ||
						["parseInput", "parseInputsquare"].includes(n.id.name))
				),
		);
		if (file === "Elektrotechnik/Drehstrom_Simulator.html") {
			const toggle = pageAST.program.body.find(
				(n) => n.type === "FunctionDeclaration" && n.id?.name === "togglePhase",
			);
			if (toggle?.type === "FunctionDeclaration")
				toggle.body.body.push(
					...parseJS("syncPhaseControls();if(paused)animate();").program.body,
				);
		}
		const program = pageAST.program.body;
		const methods = program
			.filter((n) => n.type === "FunctionDeclaration" && n.id)
			.map((n) => (n as any).id.name);
		const qubit = file.endsWith("Qubit.html");
		const controller = `import { parseInput, parseInputsquare } from '../lib/si';\nimport { setHTML } from '../lib/safe-html';\nimport { calculateDivider } from '../lib/divider-controller';\nimport { calculateOpamp } from '../lib/opamp-controller';\nimport { updateThreePhase, phaseSum } from '../lib/three-phase';\nimport { quantumGate, validateQubit } from '../lib/quantum';\nimport { calculateBasic } from '../lib/basic-solvers';\nimport { calculateNetwork } from '../lib/resistor-network';\nimport { convertNumericField } from '../lib/form-units';\nimport { calculatePassive,calculatePassiveTransient,calculatePassiveCapacitorAC } from '../lib/passive-controller';\nimport { drawPassivePhasors } from '../lib/passive-phasors';\nimport { calculateACFilter,calculateACResonator } from '../lib/ac-controller';\nimport { createShared } from './shared.js';\n${qubit ? "import * as THREE from 'three';\n" : ""}/** Calculator presentation and reviewed domain adapters, isolated to this route's mount lifecycle. */\nexport function createController(scope) {\nconst {document,window,MathJax,requestAnimationFrame,cancelAnimationFrame,setTimeout,clearTimeout,setInterval,clearInterval}=scope;\nconst {${sharedMethods.filter((name) => !pageNames.has(name)).join(",")}}=createShared(scope);\n${program.map((n) => generate(n, { comments: false }).code).join("\n")}\nreturn {${simulationState(file)}handlers:{${[...new Set([...methods, ...sharedMethods.filter((name) => !pageNames.has(name)), "parseInput", "parseInputsquare"])].join(",")}},dispose(){${qubit ? "if(scene)scene.traverse(obj=>{obj.geometry?.dispose();const materials=Array.isArray(obj.material)?obj.material:[obj.material];for(const m of materials)if(m){for(const value of Object.values(m))if(value?.isTexture)value.dispose();m.dispose();}});renderer?.dispose();renderer?.forceContextLoss();" : ""}}};\n}\n`;
		await writeFile(
			"src/calculations/" + slug + ".js",
			controller
				.replaceAll("../Pictures/", "/Pictures/")
				.replaceAll("—", ", ")
				.replaceAll("–", "-"),
		);
		const handlers: string[] = [];
		let index = 0;
		let headingCount = 0;
		function jsx(n: Node): string {
			if (n.nodeName === "#text")
				return n.value?.trim()
					? `{${JSON.stringify(
							n.value
								.replaceAll("—", ", ")
								.replaceAll("–", "-")
								.replace(
									/development in progress|coming soon/gi,
									"In dieser Version nicht umgesetzt.",
								),
						)}}`
					: "";
			if (!n.tagName || ["script", "style"].includes(n.tagName)) {
				if (n.tagName === "script" && text(n).includes("document.write"))
					return '<nav className="alphabet-nav">{Array.from("ABCDEFGHIJKLMNOPQRSTUVWXYZ").map(letter=><button key={letter} onClick={()=>controller.current?.handlers.scrollToLetter?.(letter)}>{letter}</button>)}</nav>';
				return "";
			}
			let tag = n.tagName;
			if (
				file.includes("Widerstandstabelle") &&
				tag === "div" &&
				n.attrs?.some(
					(a) =>
						(a.name === "class" && a.value.includes("dropdown-select")) ||
						a.name === "data-value",
				)
			)
				tag = "button";
			if (tag === "h1" && headingCount++ > 0) tag = "h2";
			const attrs = n.attrs ?? [];
			if (
				tag === "p" &&
				attrs.some((a) => a.name === "id" && a.value.startsWith("result"))
			)
				tag = "div";
			if (
				tag === "div" &&
				attrs.some(
					(a) => a.name === "class" && a.value.includes("dropdown-header"),
				)
			)
				tag = "button";
			if (tag === 'tr"') tag = "tr";
			const a: string[] = [];
			if (tag === "table") {
				a.push("tabIndex={0}");
				if (
					!attrs.some(
						(a) => a.name === "aria-label" || a.name === "aria-labelledby",
					)
				)
					a.push(
						"aria-label=" +
							JSON.stringify(
								"Tabelle: " +
									text(walk(main, (n) => n.tagName === "h1")[0] ?? main).trim(),
							),
					);
			}

			if (
				["button", "input", "select", "textarea"].includes(tag) &&
				!attrs.some((a) => a.name === "disabled")
			)
				a.push("disabled={!controller.ready}");

			const css = style(attrs.find((a) => a.name === "style")?.value ?? "");
			for (const dim of ["width", "height"]) {
				const v = attrs.find((a) => a.name === dim)?.value;
				if (v?.endsWith("%")) css[dim] = v;
			}
			if (Object.keys(css).length)
				a.push("style={" + JSON.stringify(css) + "}");
			if (tag === "button") {
				a.push('type="button"');
				if (
					attrs.some(
						(a) => a.name === "class" && a.value.includes("dropdown-header"),
					)
				)
					a.push('aria-expanded="false"');
				if (!attrs.some((a) => a.name === "id"))
					a.push("id=" + JSON.stringify("control-" + index++));
			}
			for (const attr of attrs) {
				let name = attr.name,
					value = attr.value;
				if (name === "type" && tag === "button") continue;
				if (events[name]) {
					handlers.push(value);
					if (name === "onclick") {
						const fn = value.match(/^([A-Za-z_$][\w$]*)\s*\(/)?.[1];
						if (fn) a.push("data-action=" + JSON.stringify(fn));
						const target = value.match(
							/toggleSelection\(this,\s*['"]([^'"]+)/,
						)?.[1];
						if (target) a.push("data-target=" + JSON.stringify(target));
					}
					a.push(
						`${name === "onkeyup" && value.includes("filterGlossary") ? "onInput" : events[name]}={(event)=>{${expression(value)}}}`,
					);
					continue;
				}
				if (name.startsWith("on"))
					throw Error("Unmapped event " + name + " " + file);
				if (name === "style") continue;
				if (["src", "href"].includes(name)) {
					value = resolveAsset(value, file);
					if (value === "/index.html") value = "/";
					else if (name === "href" && value.startsWith("/"))
						value = value.replace(/\.html(?=#|$)/, "");
				}
				if (name === "width" || name === "height") {
					if (value.endsWith("%")) {
						continue;
					}
				}
				if (["checked", "selected"].includes(name)) {
					if (name === "checked") a.push("defaultChecked");
					continue;
				}
				if (
					name === "value" &&
					attrs.some((a) => a.name === "id" && a.value === "outputVoltage")
				)
					value = "";
				if (name === "value" && ["input", "textarea", "select"].includes(tag))
					name = "defaultValue";
				if (
					name === "id" &&
					tag === "input" &&
					attrs.some((a) => a.name === "type" && a.value === "checkbox")
				)
					a.push(
						"aria-label=" +
							JSON.stringify(
								value === "toggleSwitch"
									? "Dreieckschaltung"
									: file.includes("Gleichstrom")
										? "Belasteter Spannungsteiler"
										: "Entladen",
							),
					);
				if (
					name === "id" &&
					tag === "input" &&
					!attrs.some(
						(a) =>
							a.name === "type" &&
							["hidden", "button", "submit", "range", "checkbox"].includes(
								a.value,
							),
					)
				) {
					const parent = (n as any).parentNode as Node | undefined;
					const label = parent?.childNodes?.find((c) => c.tagName === "label");
					const name = label
						? text(label).trim()
						: attrs.find((a) => a.name === "placeholder")?.value;
					a.push("aria-label=" + JSON.stringify(name || value));
				}
				if (
					[
						"disabled",
						"readonly",
						"multiple",
						"required",
						"autofocus",
					].includes(name)
				) {
					a.push((names[name] ?? name) + "={true}");
					continue;
				}
				if (name === "align" || name === "border" || name === "bgcolor")
					continue;
				a.push(
					(names[name] ?? name) +
						"=" +
						JSON.stringify(value.replaceAll("—", ", ").replaceAll("–", "-")),
				);
			}
			if (tag === "select" && !attrs.some((a) => a.name === "value")) {
				const selected = walk(
					n,
					(c) =>
						c.tagName === "option" &&
						!!c.attrs?.some((a) => a.name === "selected"),
				)[0];
				if (selected) {
					const value =
						selected.attrs?.find((a) => a.name === "value")?.value ??
						text(selected);
					a.push("defaultValue=" + JSON.stringify(value));
				}
			}
			if (attrs.some((a) => a.name === "id" && a.value.startsWith("result")))
				a.push('aria-live="polite"');
			if (tag === "img" && !attrs.some((a) => a.name === "alt"))
				a.push('alt="Schaltungsabbildung"');
			let content = (n.childNodes ?? []).map(jsx).join("");
			if (
				tag === "span" &&
				attrs.some(
					(a) => a.name === "class" && a.value.split(/\s+/).includes("arrow"),
				)
			) {
				a.push('aria-hidden="true"');
				content = '<Chevron direction="down" />';
			}

			if (
				tag === "label" &&
				attrs.some(
					(a) => a.name === "class" && a.value.split(/\s+/).includes("switch"),
				) &&
				!text(n).trim()
			) {
				const field = n.childNodes?.find((child) => child.tagName === "input");
				const id = field?.attrs?.find((a) => a.name === "id")?.value;
				const label =
					id === "toggleSwitch"
						? "Dreieckschaltung"
						: file.includes("Gleichstrom")
							? "Belasteter Spannungsteiler"
							: "Entladen";
				content += `<span className="switch-label">${label}</span>`;
			}
			if (attrs.some((a) => a.name === "id" && a.value === "pdfjs-viewer"))
				content =
					'<object data="/Elektrotechnik/Elektrotechnik.pdf" type="application/pdf" title="Elektrotechnik Unterlagen">' +
					content +
					"</object>";
			return (
				"<" +
				tag +
				(a.length ? " " + a.join(" ") : "") +
				(voids.has(tag) ? " />" : ">" + content + "</" + tag + ">")
			);
		}
		let markup = (main.childNodes ?? [])
			.map(jsx)
			.join("")
			.replace(
				/(<canvas[^>]*id="sinusCanvas"[^>]*><\/canvas>)/,
				'$1<button type="button" data-action="exportCanvasAsPNG" onClick={(event)=>controller.current?.invoke?.("exportCanvasAsPNG",event.currentTarget,"sinusCanvas")}>Diagramm als PNG speichern</button>',
			);
		if (
			file === "Allgemein/Qubit.html" ||
			file === "Elektrotechnik/Drehstrom_Simulator.html"
		)
			markup =
				'<div className="simulation-controls"><button id="animation-toggle" type="button" onClick={(event)=>controller.current?.invoke?.("toggleAnimation",event.currentTarget)}>Animation pausieren</button></div>' +
				markup;
		if (file === "Elektrotechnik/Schwingkreis.html")
			markup =
				'<p className="comment">f ist die Signalfrequenz. Leer gelassen wird bei Resonanz gerechnet; abgeleitete Resonanzannahmen stehen im Lösungsweg.</p>' +
				markup;
		if (file === "Elektrotechnik/Verstaerkung_Daempfung.html")
			markup = markup
				.replace("Verstärkungsfaktor V", "Spannungs-/Stromfaktor V")
				.replace("Dämpfungsfaktor D", "Spannungs-/Stromdämpfungsfaktor D");
		if (file === "Elektronik/Aktiv_Filter.html")
			markup +=
				'<p className="comment">Dieser Fachbereich wurde im Original nicht umgesetzt. Es gibt hier keinen Rechner.</p>';
		const h1 = walk(main, (n) => n.tagName === "h1")[0];
		const title = h1 ? text(h1).trim() : filename.replace(".html", "");
		const styles = walk(dom, (n) => n.tagName === "style")
			.map(text)
			.join("\n")
			.replaceAll("—", ", ")
			.replaceAll("–", "-");
		await writeFile(
			"src/pages/" + slug + ".tsx",
			`import { useCalculator } from '../lib/use-calculator';\nimport { createController } from '../calculations/${slug}.js';\n${markup.includes("<Chevron ") ? `import { Chevron } from '../components/chevron';\n` : ""}export default function Page(){const controller=useCalculator(createController);return <>{controller.restoring&&<p className="notebook-loading" role="status">Gespeicherte Eingaben werden geladen…</p>}<div ref={controller.root} inert={controller.restoring} aria-busy={controller.restoring || undefined} data-restoring={controller.restoring ? "true" : "false"} data-ready={controller.ready ? "true" : undefined} className="page-body ${qubit ? "qubit-page" : ""}"><style>{${JSON.stringify("@layer source { @scope (.page-body) {\n" + styles + "\n} }")}}</style>${markup}</div></>;}\n`,
		);
		const route = file.replace(".html", "");
		const routeFile = route.replaceAll("/", ".");
		await writeFile(
			"src/routes/" + routeFile + ".tsx",
			`import { createFileRoute } from '@tanstack/react-router';\nimport Page from '../pages/${slug}';\nexport const Route=createFileRoute('/${route}')({validateSearch:(search:Record<string,unknown>):{notiz?:string}=>({notiz:typeof search.notiz==='string'?search.notiz:undefined}),head:()=>({meta:[{title:${JSON.stringify(title + " | Elecalculate")}}]}),component:Page});\n`,
		);
		cases.push({
			file,
			title,
			category: section,
			slug,
			inputs: walk(main, (n) => n.tagName === "input").length,
			canvases: walk(main, (n) => n.tagName === "canvas").length,
			handlers,
			sections: walk(
				main,
				(n) =>
					n.tagName === "h2" ||
					n.attrs?.some(
						(a) => a.name === "class" && a.value.includes("dropdown-header"),
					) === true,
			)
				.map(text)
				.map((t) => t.trim())
				.filter(Boolean),
		});
	}
}
await writeFile(
	"src/lib/catalog.ts",
	"export const catalog = " + JSON.stringify(cases, null, 2) + " as const;\n",
);
await writeFile(
	"migration/coverage.json",
	JSON.stringify(
		{
			sourceBranch: "development",
			sourceCommit: "79be0089b5d6a1b05f9246bb246326abc21d69f1",
			pages: cases,
		},
		null,
		2,
	),
);
console.log(
	`Migrated ${cases.length} pages, ${cases.reduce((a, p) => a + p.inputs, 0)} inputs, ${cases.reduce((a, p) => a + p.handlers.length, 0)} native React handlers.`,
);

const format = Bun.spawn(
	[
		"bunx",
		"biome",
		"format",
		"--write",
		"src/pages",
		"src/calculations",
		"src/routes",
		"src/lib/catalog.ts",
	],
	{ stdout: "ignore", stderr: "inherit" },
);
if ((await format.exited) !== 0)
	throw Error("Generated source formatting failed");
