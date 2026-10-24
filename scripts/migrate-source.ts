import { parse as parseHTML } from "parse5";
import { parse as parseJS } from "@babel/parser";
import generate from "@babel/generator";
import traverse from "@babel/traverse";
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
const sharedMethods = sharedBody
	.filter((n) => n.type === "FunctionDeclaration" && n.id)
	.map((n) => (n as any).id.name);
await writeFile(
	"src/calculations/shared.js",
	`export function createShared(scope){const {document,window,requestAnimationFrame,cancelAnimationFrame,setTimeout,clearTimeout}=scope;${sharedBody.map((n) => generate(n, { comments: false }).code).join("\n")}return {${sharedMethods.join(",")}};}`
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
				: `controller.current?.handlers.${name}?.(`,
		);
}
for (const section of ["Allgemein", "Elektrotechnik", "Elektronik", "HST"]) {
	for (const filename of (await readdir(join(source, section)))
		.filter((f) => f.endsWith(".html"))
		.sort()) {
		const file = section + "/" + filename;
		const raw = await readFile(join(source, file), "utf8");
		const dom = parseHTML(raw.replace(/<tr">/g, "<tr>")) as unknown as Node;
		const main = walk(dom, (n) => n.tagName === "main")[0];
		if (!main) throw Error("Missing main: " + file);
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
		pageCode = pageCode.replace(/PDFObject\.embed\([\s\S]*?\);/g, "");
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
		traverse(pageAST, {
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
		const program = pageAST.program.body;
		const methods = program
			.filter((n) => n.type === "FunctionDeclaration" && n.id)
			.map((n) => (n as any).id.name);
		const qubit = file.endsWith("Qubit.html");
		const controller = `import { parseInput, parseInputsquare } from '../lib/si';\nimport { setHTML } from '../lib/safe-html';\nimport { calculateDivider } from '../lib/divider-controller';\nimport { createShared } from './shared.js';\n${qubit ? "import * as THREE from 'three';\n" : ""}/** Existing calculation algorithms, isolated to this route's mount lifecycle. */\nexport function createController(scope) {\nconst {document,window,MathJax,requestAnimationFrame,cancelAnimationFrame,setTimeout,clearTimeout,setInterval,clearInterval}=scope;\nconst {${sharedMethods.filter((name) => !pageNames.has(name)).join(",")}}=createShared(scope);\n${program.map((n) => generate(n, { comments: false }).code).join("\n")}\nreturn {handlers:{${[...new Set([...methods, ...sharedMethods.filter((name) => !pageNames.has(name)), "parseInput", "parseInputsquare"])].join(",")}},dispose(){${qubit ? "if(scene)scene.traverse(obj=>{obj.geometry?.dispose();const materials=Array.isArray(obj.material)?obj.material:[obj.material];for(const m of materials)if(m){for(const value of Object.values(m))if(value?.isTexture)value.dispose();m.dispose();}});renderer?.dispose();renderer?.forceContextLoss();" : ""}}};\n}\n`;
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
					? `{${JSON.stringify(n.value.replaceAll("—", ", ").replaceAll("–", "-"))}}`
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
				tag === "div" &&
				attrs.some(
					(a) => a.name === "class" && a.value.includes("dropdown-header"),
				)
			)
				tag = "button";
			if (tag === 'tr"') tag = "tr";
			const a: string[] = [];
			const css = style(attrs.find((a) => a.name === "style")?.value ?? "");
			for (const dim of ["width", "height"]) {
				const v = attrs.find((a) => a.name === dim)?.value;
				if (v?.endsWith("%")) css[dim] = v;
			}
			if (Object.keys(css).length)
				a.push("style={" + JSON.stringify(css) + "}");
			if (tag === "button") {
				a.push('type="button"');
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
		const markup = (main.childNodes ?? []).map(jsx).join("");
		const h1 = walk(main, (n) => n.tagName === "h1")[0];
		const title = h1 ? text(h1).trim() : filename.replace(".html", "");
		const styles = walk(dom, (n) => n.tagName === "style")
			.map(text)
			.join("\n")
			.replaceAll("—", ", ")
			.replaceAll("–", "-");
		await writeFile(
			"src/pages/" + slug + ".tsx",
			`import { useCalculator } from '../lib/use-calculator';\nimport { createController } from '../calculations/${slug}.js';\nexport default function Page(){const controller=useCalculator(createController);return <div ref={controller.root} className="page-body ${qubit ? "qubit-page" : ""}"><style>{${JSON.stringify("@layer source { @scope (.page-body) {\n" + styles + "\n} }")}}</style>${markup}</div>;}\n`,
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
