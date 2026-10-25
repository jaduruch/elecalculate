import { useCalculator } from "../lib/use-calculator";
import { createController } from "../calculations/HST-Objekt-Orientiert.js";
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
						"@layer source { @scope (.page-body) {\n\n        /* Lokales Syntax-Highlighting für C++ */\n        code {\n            font-family: Consolas, monospace;\n            background-color: #1e1e1e;\n            color: #f8f8f2;\n            padding: 0.5em;\n            display: block;\n            border-radius: 5px;\n            overflow-x: auto;\n            text-align: left;\n        }\n\n        .keyword {\n            color: #569cd6;\n        }\n\n        .type {\n            color: #4ec9b0;\n        }\n\n        .function {\n            color: #dcdcaa;\n        }\n\n        .string {\n            color: #ce9178;\n        }\n\n        .bracket {\n            color: #ffd000;\n        }\n\n        .error{\n            color: red;\n        }\n\n        .comment {\n            color: #6a9955;\n            font-style: italic;\n        }\n    \n} }"
					}
				</style>
				<div>
					<br />
					<h1>{"Objekt Orientiertes Programmieren"}</h1>
				</div>
				<div>
					{
						"\n                Die Code Beispiele sind alle in der Sprache C++\n            "
					}
				</div>
				<br />
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
							{"\n                    Erklärung Begriffe\n                    "}
							<span className="arrow" aria-hidden="true">
								<Chevron direction="down" />
							</span>
						</button>
						<div className="dropdown-content">
							<table
								tabIndex={0}
								aria-label="Tabelle: Objekt Orientiertes Programmieren"
							>
								<tbody>
									<tr>
										<th>{"Begriff"}</th>
										<th>{"Beschreibung"}</th>
									</tr>
									<tr>
										<td>{"Initialisieren"}</td>
										<td>
											{"Einen Anfangswert in den Attributen speichern"}
											<br />
											<br />
											<code>{"int x = 5;"}</code>
										</td>
									</tr>
									<tr>
										<td>{"Instanziieren"}</td>
										<td>
											{"Ein neues Objekt im RAM erstellen"}
											<br />
											<br />
											<code>{"MeineKlasse obj;"}</code>
										</td>
									</tr>
									<tr>
										<td>{"Attribute erstellen"}</td>
										<td>
											{"Die Datenstruktur in einer Klasse festlegen"}
											<br />
											<br />
											<code>
												{"class MeineKlasse {"}
												<br />
												{"\n                                      int zahl;"}
												<br />
												{"\n                                };"}
											</code>
										</td>
									</tr>
									<tr>
										<td>{"Datenkapselung"}</td>
										<td>
											{"Das Verbergen von Implementierungsdetails"}
											<br />
											<br />
											<code>
												{"class MeineKlasse {"}
												<br />
												{"\n                                      private:"}
												<br />
												{
													"\n                                        int geheim;"
												}
												<br />
												{"\n                                      public:"}
												<br />
												{
													"\n                                        void setGeheim(int g) { geheim = g; }"
												}
												<br />
												{"\n                                };"}
											</code>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
					<div className="divider"></div>
					<div className="dropdown"></div>
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
								"\n                    Variablen definieren\n                    "
							}
							<span className="arrow" aria-hidden="true">
								<Chevron direction="down" />
							</span>
						</button>
						<div className="dropdown-content">
							<p>{"Variablen in Klassen:"}</p>
							<code>
								<span className="keyword">{"public"}</span>
								{":"}
								<br />
								<span className="type">{"double"}</span>
								{" spannungUF;"}
								<br />
								<span className="type">{"double"}</span>
								{" stromIF;"}
								<br />
								<br />
								<span className="error">{"x"}</span>
								<span className="keyword">{"public"}</span>
								<span className="type">{"double"}</span>
								{" spannungUF;"}
								<br />
							</code>
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
							{"\n                    Konstruktor\n                    "}
							<span className="arrow" aria-hidden="true">
								<Chevron direction="down" />
							</span>
						</button>
						<div className="dropdown-content">
							<p>
								{
									"Um den Konstruktor vollständig zu Programmierenmuss jedem Attribut "
								}
								<br />
								{"(aus dem Klassendiagramm) ein Wert zugeordnet werden."}
							</p>
							<code>
								<span className="function">{"Klassenname"}</span>
								{"::"}
								<span className="string">{"Klassenname"}</span>
								{"\n                    ("}
								<span className="type">{"double"}</span>
								{" vorwaertsspannung, "}
								<span className="type">{"double"}</span>
								{" vorwaertsstrom)"}
								<br />
								<span className="bracket">{"{"}</span>
								<br />
								{"\n                       spannungUF = vorwaertsspannung;"}
								<br />
								{"\n                       stromIF = vorwaertsstrom;"}
								<br />
								<span className="bracket">{"}"}</span>
							</code>
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
							{
								"\n                    Objekte erzeugen (Instanzieren)\n                    "
							}
							<span className="arrow" aria-hidden="true">
								<Chevron direction="down" />
							</span>
						</button>
						<div className="dropdown-content">
							<p>{"So wird ein Objekt erzeugt:"}</p>
							<code>
								<span className="function">{"Klassenname"}</span>
								<span className="string">{"Objektname"}</span>
								<span className="bracket">{"("}</span>
								<span className="type">{"übergabeparameter"}</span>
								<span className="bracket">{")"}</span>
							</code>
							<p>
								{
									"So wird der Wert aus dem Objekt ausgelesen und einer Variable übergeben:"
								}
							</p>
							<code>
								<span className="type">{"datentyp"}</span>
								{" variabelnname = "}
								<span className="keyword">{"Objektname"}</span>
								{"."}
								<span className="string">{"funktionsname"}</span>
								<span className="bracket">{"()"}</span>
								{";\n                    "}
							</code>
						</div>
					</div>
					<div className="divider"></div>
				</div>
			</div>
		</>
	);
}
