import { useCalculator } from "../lib/use-calculator";
import { createController } from "../calculations/HST-C-Syntax.js";
import { Chevron } from "../components/chevron";
export default function Page() {
	const controller = useCalculator(createController);
	return (
		<>
			{controller.restoring && (
				<p className="notebook-loading" role="status">
					Gespeicherte Eingaben werden geladen…
				</p>
			)}
			<div
				ref={controller.root}
				inert={controller.restoring}
				aria-busy={controller.restoring || undefined}
				data-restoring={controller.restoring ? "true" : "false"}
				data-ready={controller.ready ? "true" : undefined}
				className="page-body "
			>
				<style>
					{
						'@layer source { @scope (.page-body) {\n\n\n        /* Code-Block Styling */\n        .code-block {\n            position: relative;\n            background-color: #222;\n            color: #fff;\n            font-family: "Courier New", monospace;\n            padding: 10px;\n            margin: 10px;\n            border-radius: 5px;\n            overflow-x: auto;\n            white-space: nowrap;\n            text-align: left;\n        }\n\n        /* Kopiersymbol oben rechts im Codeblock */\n        .copy-icon {\n            position: absolute;\n            top: 10px;\n            right: 10px;\n            color: white;\n            font-size: 18px;\n            cursor: pointer;\n        }\n\n        /* Hover-Effekt für das Kopiersymbol */\n        .copy-icon:hover {\n            color: #aaaaaa;\n        }\n\n        /* Syntax-Highlighting */\n        .code-keyword {\n            color: orange;\n        }\n\n        .code-condition {\n            color: white;\n        }\n\n        .code-comment {\n            color: #6a9955;\n        }\n\n        .code-brace {\n            color: #00aaff;\n        }\n\n        .explanation {\n            margin-top: 10px;\n            color: #ffffff;\n        }\n    \n} }'
					}
				</style>
				<div>
					<h1>
						<br />
						{"C Syntax"}
					</h1>
				</div>
				<div className="dropdown-container">
					<div className="dropdown">
						<button
							disabled={!controller.ready}
							type="button"
							aria-expanded="false"
							id="control-0"
							className="dropdown-header"
							data-action="toggleDropdown"
							onClick={(event) => {
								controller.current?.invoke?.(
									"toggleDropdown",
									event.currentTarget,
									event.currentTarget,
								);
							}}
						>
							{"\n                        if / else\n                        "}
							<span className="arrow" aria-hidden="true">
								<Chevron direction="down" />
							</span>
						</button>
						<div className="dropdown-content">
							<div className="code-block">
								<span className="code-keyword">{"if"}</span>
								<span className="code-condition">{"(condition)"}</span>
								<br />
								<span className="code-brace">{"{"}</span>
								<br />
								<span className="code-comment">{"// Code für wahr"}</span>
								<br />
								<span className="code-brace">{"}"}</span>
								<span className="code-keyword">{"else"}</span>
								<br />
								<span className="code-brace">{"{"}</span>
								<br />
								<span className="code-comment">{"// Code für falsch"}</span>
								<br />
								<span className="code-brace">{"}"}</span>
							</div>
							<div className="explanation">
								<strong>{"Erklärung:"}</strong>
								{" Mit "}
								<code>{"if"}</code>
								{
									" wird ein Block nur ausgeführt, wenn die Bedingung wahr ist. Andernfalls wird "
								}
								<code>{"else"}</code>
								{" ausgeführt.\n                        "}
							</div>
						</div>
					</div>
					<div className="divider"></div>
					<div className="dropdown">
						<button
							disabled={!controller.ready}
							type="button"
							aria-expanded="false"
							id="control-1"
							className="dropdown-header"
							data-action="toggleDropdown"
							onClick={(event) => {
								controller.current?.invoke?.(
									"toggleDropdown",
									event.currentTarget,
									event.currentTarget,
								);
							}}
						>
							{
								"\n                        switch case\n                        "
							}
							<span className="arrow" aria-hidden="true">
								<Chevron direction="down" />
							</span>
						</button>
						<div className="dropdown-content">
							<div className="code-block">
								<span className="code-keyword">{"switch"}</span>
								<span className="code-condition">{"(variable)"}</span>
								<br />
								<span className="code-brace">{"{"}</span>
								<br />
								<span className="code-keyword">{"case"}</span>
								{" value1:"}
								<br />
								<span className="code-comment">{"// Code für value1"}</span>
								<br />
								<span className="code-keyword">{"break"}</span>
								{";"}
								<br />
								<span className="code-keyword">{"case"}</span>
								{" value2:"}
								<br />
								<span className="code-comment">{"// Code für value2"}</span>
								<br />
								<span className="code-keyword">{"break"}</span>
								{";"}
								<br />
								<span className="code-keyword">{"default"}</span>
								{":"}
								<br />
								<span className="code-comment">
									{"// Code für alle anderen Werte"}
								</span>
								<br />
								<span className="code-brace">{"}"}</span>
							</div>
							<div className="explanation">
								<strong>{"Erklärung:"}</strong>
								<code>{"switch"}</code>
								{" prüft eine Variable gegen verschiedene Werte. Das passende "}
								<code>{"case"}</code>
								{" wird ausgeführt. "}
								<br />
								{"\n                            Wird das "}
								<code>{"break"}</code>
								{
									" weggelassen werden alle nochfolgenden cases auch ausgeführt.\n                        "
								}
							</div>
						</div>
					</div>
					<div className="divider"></div>
					<div className="dropdown">
						<button
							disabled={!controller.ready}
							type="button"
							aria-expanded="false"
							id="control-2"
							className="dropdown-header"
							data-action="toggleDropdown"
							onClick={(event) => {
								controller.current?.invoke?.(
									"toggleDropdown",
									event.currentTarget,
									event.currentTarget,
								);
							}}
						>
							{"\n                        for\n                        "}
							<span className="arrow" aria-hidden="true">
								<Chevron direction="down" />
							</span>
						</button>
						<div className="dropdown-content">
							<div className="code-block">
								<span className="code-keyword">{"for"}</span>
								<span className="code-condition">
									{"(int i = 0; i <= 10; i++)"}
								</span>
								<br />
								<span className="code-brace">{"{"}</span>
								<br />
								<span className="code-comment">
									{"// i beträgt: 0,1,2,3,4,5,6,7,8,9,10"}
								</span>
								<br />
								<span className="code-brace">{"}"}</span>
							</div>
							<div className="explanation">
								<strong>{"Erklärung:"}</strong>
								<code>{"int i = 0"}</code>
								{" erstelle eine Lokale Variable, "}
								<code>{"i <= 10"}</code>
								{" ist der Endwert, "}
								<code>{"i++"}</code>
								{
									" Zählt i bei jedem durchgang eins hoch.\n                        "
								}
							</div>
						</div>
					</div>
					<div className="divider"></div>
					<div className="dropdown">
						<button
							disabled={!controller.ready}
							type="button"
							aria-expanded="false"
							id="control-3"
							className="dropdown-header"
							data-action="toggleDropdown"
							onClick={(event) => {
								controller.current?.invoke?.(
									"toggleDropdown",
									event.currentTarget,
									event.currentTarget,
								);
							}}
						>
							{"\n                        enum\n                        "}
							<span className="arrow" aria-hidden="true">
								<Chevron direction="down" />
							</span>
						</button>
						<div className="dropdown-content">
							<div className="code-block">
								<span className="code-keyword">{"enum"}</span>
								<span className="code-condition">{" enumname"}</span>
								<br />
								<span className="code-brace">{"{"}</span>
								<br />
								{"\n                                  Mo; "}
								<span className="code-comment">
									{"// der erste Name hat den Wert 0"}
								</span>
								<br />
								{"\n                                  Di; "}
								<span className="code-comment">
									{"// der zweite Name hat den Wert 1"}
								</span>
								<br />
								{"\n                                  Do = "}
								<span className="code-keyword">{"3"}</span>
								{"; "}
								<span className="code-comment">
									{"// diesem Namen wird der Wert 3 zugeordet"}
								</span>
								<br />
								{"\n                                  Fr; "}
								<span className="code-comment">
									{"// dieser Name hat den Wert 4"}
								</span>
								<br />
								<span className="code-brace">{"}"}</span>
							</div>
							<div className="explanation">
								<strong>{"Erklärung:"}</strong>
								{" Mit einem "}
								<code>{"enum"}</code>
								{
									" (kurz für enumeration) können mehrere defines auf einmal gemacht werden ohne das jedem seperat ein Wert zugeortnet werden muss.\n                        "
								}
							</div>
						</div>
					</div>
					<div className="divider"></div>
					<div className="dropdown">
						<button
							disabled={!controller.ready}
							type="button"
							aria-expanded="false"
							id="control-4"
							className="dropdown-header"
							data-action="toggleDropdown"
							onClick={(event) => {
								controller.current?.invoke?.(
									"toggleDropdown",
									event.currentTarget,
									event.currentTarget,
								);
							}}
						>
							{
								"\n                        ternärer operator (if/else auf einer Zeile)\n                        "
							}
							<span className="arrow" aria-hidden="true">
								<Chevron direction="down" />
							</span>
						</button>
						<div className="dropdown-content">
							<div className="code-block">
								{"\n                            a == 3 ? "}
								<span className="code-comment">{"/*a ist gleich 3*/"}</span>
								{":"}
								<span className="code-comment">
									{"/*a ist nicht gleich 3*/"}
								</span>
								{";\n                            "}
							</div>
							<div className="explanation">
								<strong>{"Erklärung:"}</strong>
								{" Der ternärer operator ist wie ein "}
								<code>{"if else"}</code>
								{
									" auf einer Zeile, ist die Bedinung war wird der erste Befehl ausgeführt ansonsten der zweite Befehl.\n                        "
								}
							</div>
						</div>
					</div>
					<div className="divider"></div>
				</div>
			</div>
		</>
	);
}
