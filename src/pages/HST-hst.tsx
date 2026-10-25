import { useCalculator } from "../lib/use-calculator";
import { createController } from "../calculations/HST-hst.js";
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
						"@layer source { @scope (.page-body) {\n\n        .alphabet-nav {\n            position: fixed;\n            right: 13px;\n            top: 50%;\n            transform: translateY(-50%);\n            display: flex;\n            flex-direction: column;\n            align-items: right;\n        }\n        .alphabet-nav a {\n            display: block;\n            /*padding: 5px;\n            font-size: 18px;*/\n            cursor: pointer;\n            text-decoration: none;\n            color: rgb(182, 182, 182);\n            transition: transform 0.3s ease, color 0.3s;\n        }\n        .alphabet-nav a:hover {\n            color: white;\n            transform: translateX(-15px);\n        }\n        .alphabet-nav a:hover + a,\n        .alphabet-nav a:has(+ a:hover) {\n            transform: translateX(-7.5px);\n        }\n\n        .search{\n            background-color: black;\n            color: white;\n            /*border: 2px solid white;*/\n            border: none;\n            border-radius: 3px;\n        }\n\n        .search:focus {\n            /*border: 3px solid;*/\n            outline: none; /* Entfernt den Standard-Umrandungsring */\n        }\n        table {\n            width: 800px;\n            max-width: 90%;\n            border-collapse: collapse;\n            \n        }\n        th, td {\n            border: none;\n            padding: 8px;\n            text-align: left;\n            vertical-align: top;\n        }\n        th {\n            background-color: #616161;\n        }\n    \n} }"
					}
				</style>
				<br />
				<h1>{"Hard- und Softwaretechnik"}</h1>
				<nav
					style={{ width: "30px", textAlign: "right" }}
					className="alphabet-nav"
				>
					<nav className="alphabet-nav">
						{Array.from("ABCDEFGHIJKLMNOPQRSTUVWXYZ").map((letter) => (
							<button
								key={letter}
								onClick={() =>
									controller.current?.handlers.scrollToLetter?.(letter)
								}
							>
								{letter}
							</button>
						))}
					</nav>
				</nav>
				<input
					disabled={!controller.ready}
					type="text"
					aria-label="Begriff suchen..."
					id="search"
					onInput={(event) => {
						controller.current?.invoke?.("filterGlossary", event.currentTarget);
					}}
					placeholder="Begriff suchen..."
					className="search"
				/>
				<table tabIndex={0} aria-label="Tabelle: Hard- und Softwaretechnik">
					<tbody>
						<tr>
							<th>{"Begriff"}</th>
							<th>{"Bedeutung"}</th>
						</tr>
						<tr id="letter-A">
							<td>
								<strong>{"A"}</strong>
							</td>
						</tr>
						<tr>
							<td>
								<strong>{"ADC"}</strong>
							</td>
							<td>{"Analog-Digital Wandler"}</td>
						</tr>
						<tr>
							<td>
								<strong>{"ALU"}</strong>
							</td>
							<td>{"Arithmetic Logic Unit (Arithmetisch-logische Einheit)"}</td>
						</tr>
						<tr id="letter-B">
							<td>
								<strong>{"B"}</strong>
							</td>
						</tr>
						<tr>
							<td>
								<strong>{"BCD"}</strong>
							</td>
							<td>
								{
									"Binary Coded Decimal, Binär System welches nur bis 10 geht (1010) statt bis bis 16 (1111) auch bekannt als 8-4-2-1 Code"
								}
							</td>
						</tr>
						<tr>
							<td>
								<strong>{"BIOS"}</strong>
							</td>
							<td>
								{
									"Basic Input Output System (Grundlegendes Eingabe-Ausgabe-System)"
								}
							</td>
						</tr>
						<tr id="letter-C">
							<td>
								<strong>{"C"}</strong>
							</td>
						</tr>
						<tr>
							<td>
								<strong>{"CCS"}</strong>
							</td>
							<td>
								{"Combined Charging System (Ladesystem für Elektrofahrzeuge)"}
							</td>
						</tr>
						<tr>
							<td>
								<strong>{"CMOS"}</strong>
							</td>
							<td>
								{
									"Complementary metal-oxide-semiconductor (diese Schaltungen haben einen grossen Störabstand und kleinen Sromverbrauch da sie auf Unipolaren Transistoren basieren)"
								}
							</td>
						</tr>
						<tr>
							<td>
								<strong>{"CPLD"}</strong>
							</td>
							<td>
								{
									"Complex programmable logic device (programmierbare logische Schaltungen)"
								}
							</td>
						</tr>
						<tr>
							<td>
								<strong>{"CPU"}</strong>
							</td>
							<td>
								{"Central Processing Unit (Zentrale Verarbeitungseinheit)"}
							</td>
						</tr>
						<tr>
							<td>
								<strong>{"CSS"}</strong>
							</td>
							<td>
								{"Cascading Style Sheets (Gestaltungssprache für Webdesign)"}
							</td>
						</tr>
						<tr id="letter-D">
							<td>
								<strong>{"D"}</strong>
							</td>
						</tr>
						<tr>
							<td>
								<strong>{"DAC"}</strong>
							</td>
							<td>{"Digital-Analog Wandler"}</td>
						</tr>
						<tr>
							<td>
								<strong>{"Demux"}</strong>
							</td>
							<td>
								{"Demultiplexer"}
								<br />
								<img
									style={{ width: "150px", height: "auto" }}
									src="/Pictures/Demux.png"
									alt="Schaltungsabbildung"
								/>
							</td>
						</tr>
						<tr>
							<td>
								<strong>{"DRAM"}</strong>
							</td>
							<td>
								{
									"Dynamic RAM (langsamer und günstiger als SRAM, braucht mehr strom). Das element wird in einem geladenen oder entladenem Kondensator gespeichert."
								}
							</td>
						</tr>
						<tr>
							<td>
								<strong>{"Dualslope"}</strong>
							</td>
							<td>
								{
									"Verfahren um die Spannung mit einem Dreieck Signal in Zeit umzuwandeln, mit einem Counter entsteht dann ein Digital Signal\n                        "
								}
								<br />
								<img
									style={{ width: "400px", height: "auto" }}
									src="/Pictures/dual_slope.png"
									alt="Schaltungsabbildung"
								/>
							</td>
						</tr>
						<tr id="letter-E">
							<td>
								<strong>{"E"}</strong>
							</td>
						</tr>
						<tr>
							<td>
								<strong>{"EEPROM"}</strong>
							</td>
							<td>
								{
									"Electrically Erasable Programmable Read-Only Memory (Elektrisch löschbarer Speicher) ist nicht flüchtig"
								}
							</td>
						</tr>
						<tr>
							<td>
								<strong>{"ECL"}</strong>
							</td>
							<td>
								{
									"Emittergekoppelte Logik (verwendet Bipolar Transistoren, ist aber schneller als TTL)"
								}
							</td>
						</tr>
						<tr>
							<td>
								<strong>{"EPROM"}</strong>
							</td>
							<td>
								{
									"Erasable Programmable Read-Only Memory (Mit UV-Licht löschbarer Speicher) ist nicht flüchtig"
								}
							</td>
						</tr>
						<tr id="letter-F">
							<td>
								<strong>{"F"}</strong>
							</td>
						</tr>
						<tr>
							<td>
								<strong>{"FILO"}</strong>
							</td>
							<td>
								{
									"First In Last Out, die zuletzt gespeicherte Information wird als erste Information ausgelesen (ist das selbe wie LIFO)"
								}
							</td>
						</tr>
						<tr>
							<td>
								<strong>{"Flash"}</strong>
							</td>
							<td>{"Flash-Speicher (Nichtflüchtiger Speicher)"}</td>
						</tr>
						<tr>
							<td>
								<strong>{"flüchtiger (Speicher)"}</strong>
							</td>
							<td>{"Speicher wird ohne Speisung gelöscht (z.B. RAM)"}</td>
						</tr>
						<tr>
							<td>
								<strong>{"FPLA"}</strong>
							</td>
							<td>
								{
									"Fieldprogrammable Logic Array (sowohl UND als auch ODER-felder programmierbar)"
								}
							</td>
						</tr>
						<tr>
							<td>
								<strong>{"FPGA"}</strong>
							</td>
							<td>
								{
									"Field Programmable Gate Arrays (AQ → registerd Output, AMUX → unregisterd Output)"
								}
							</td>
						</tr>
						<tr id="letter-G">
							<td>
								<strong>{"G"}</strong>
							</td>
						</tr>
						<tr>
							<td>
								<strong>{"GAL"}</strong>
							</td>
							<td>
								{"Genereic Array Logic (nur durch UND-felder programmierbar)"}
							</td>
						</tr>
						<tr>
							<td>
								<strong>{"GPU"}</strong>
							</td>
							<td>{"Graphics Processing Unit (Grafikprozessor)"}</td>
						</tr>
						<tr>
							<td>
								<strong>{"GUI"}</strong>
							</td>
							<td>
								{"Graphical user Interface (Grafische Benutzer Oberfläche)"}
							</td>
						</tr>
						<tr id="letter-H">
							<td>
								<strong>{"H"}</strong>
							</td>
						</tr>
						<tr>
							<td>
								<strong>{"HDD"}</strong>
							</td>
							<td>{"Hard Disk Drive (Mechanische Festplatte)"}</td>
						</tr>
						<tr>
							<td>
								<strong>{"HTML"}</strong>
							</td>
							<td>
								{
									"Hypertext Markup Language (Auszeichnungssprache für Webseiten)"
								}
							</td>
						</tr>
						<tr id="letter-K">
							<td>
								<strong>{"K"}</strong>
							</td>
						</tr>
						<tr>
							<td>
								<strong>{"Komplement"}</strong>
							</td>
							<td>
								{"Einer Komplement → jedes Bit wird invertiert, "}
								<br />
								{"Zweier Komplement → einer Komplement + 1"}
							</td>
						</tr>
						<tr id="letter-L">
							<td>
								<strong>{"L"}</strong>
							</td>
						</tr>
						<tr>
							<td>
								<strong>{"LSB"}</strong>
							</td>
							<td>{"Least Significant Bit (Niederwertigstes Bit)"}</td>
						</tr>
						<tr>
							<td>
								<strong>{"LIFO"}</strong>
							</td>
							<td>
								{
									"Last In First Out, die zuletzt gespeicherte Information wird als erste Information ausgelesen (ist das selbe wie FILO)"
								}
							</td>
						</tr>
						<tr id="letter-M">
							<td>
								<strong>{"M"}</strong>
							</td>
						</tr>
						<tr>
							<td>
								<strong>{"Mux"}</strong>
							</td>
							<td>
								{"Multiplexer"}
								<br />
								<img
									style={{ width: "150px", height: "auto" }}
									src="/Pictures/Mux.png"
									alt="Schaltungsabbildung"
								/>
							</td>
						</tr>
						<tr>
							<td>
								<strong>{"MSB"}</strong>
							</td>
							<td>{"Most Significant Bit (Höchstwertiges Bit)"}</td>
						</tr>
						<tr id="letter-P">
							<td>
								<strong>{"P"}</strong>
							</td>
						</tr>
						<tr>
							<td>
								<strong>{"PAL"}</strong>
							</td>
							<td>
								{
									"Programmable Logic Array (nur durch UND-felder programmierbar)"
								}
							</td>
						</tr>
						<tr>
							<td>
								<strong>{"PIC"}</strong>
							</td>
							<td>
								{"Peripheral Interface Controller (Mikrocontroller-Familie)"}
							</td>
						</tr>
						<tr>
							<td>
								<strong>{"PLD"}</strong>
							</td>
							<td>
								{"Programmable Logic Device (Programmierbare Logikschaltung)"}
							</td>
						</tr>
						<tr>
							<td>
								<strong>{"PROM"}</strong>
							</td>
							<td>
								{
									"Programmable Read-Only Memory (nur durch ODER-felder programmierbar)"
								}
							</td>
						</tr>
						<tr id="letter-R">
							<td>
								<strong>{"R"}</strong>
							</td>
						</tr>
						<tr>
							<td>
								<strong>{"RAM"}</strong>
							</td>
							<td>{"Random Access Memory (Flüchtiger Speicher)"}</td>
						</tr>
						<tr>
							<td>
								<strong>{"RISC"}</strong>
							</td>
							<td>
								{
									"Reduced Instruction Set Computer (Rechner mit reduziertem Befehlssatz)"
								}
							</td>
						</tr>
						<tr>
							<td>
								<strong>{"ROM"}</strong>
							</td>
							<td>{"Read-Only Memory (Nur-Lese-Speicher)"}</td>
						</tr>
						<tr id="letter-S">
							<td>
								<strong>{"S"}</strong>
							</td>
						</tr>
						<tr>
							<td>
								<strong>{"SRAM"}</strong>
							</td>
							<td>{"Static RAM (schneller und teurer als DRAM)"}</td>
						</tr>
						<tr>
							<td>
								<strong>
									{"Sukzessive "}
									<br />
									{"Approxomation"}
								</strong>
							</td>
							<td>
								{"Verfahren für ADC\n                        "}
								<br />
								<img
									style={{ width: "400px", height: "auto" }}
									src="/Pictures/Sukzessive_Approxomation.png"
									alt="Schaltungsabbildung"
								/>
							</td>
						</tr>
						<tr>
							<td>
								<strong>{"SSD"}</strong>
							</td>
							<td>{"Solid State Drive (Halbleiterlaufwerk)"}</td>
						</tr>
						<tr>
							<td>
								<strong>{"Störabstand"}</strong>
							</td>
							<td>
								{"Abstand zwischen LOW und HIGH Pegel bei einem Logikbaustein"}
							</td>
						</tr>
						<tr id="letter-T">
							<td>
								<strong>{"T"}</strong>
							</td>
						</tr>
						<tr>
							<td>
								<strong>{"TTL"}</strong>
							</td>
							<td>
								{
									"Transistor-Transistor logik (diese Schaltungen haben einen kleinen Störabstand und hohen Sromverbrauch)"
								}
							</td>
						</tr>
						<tr id="letter-U">
							<td>
								<strong>{"U"}</strong>
							</td>
						</tr>
						<tr>
							<td>
								<strong>{"UML"}</strong>
							</td>
							<td>
								{
									"Unified Modeling Language (Objektorientierte Sprache für Spezifizierung, Erstellung, Bearbeitung und Visualisierung)"
								}
							</td>
						</tr>
						<tr>
							<td>
								<strong>{"UNIX"}</strong>
							</td>
							<td>{"Betriebssystemfamilie"}</td>
						</tr>
						<tr id="letter-V">
							<td>
								<strong>{"V"}</strong>
							</td>
						</tr>
						<tr>
							<td>
								<strong>{"VHDL"}</strong>
							</td>
							<td>
								{
									"VHSIC Hardware Description Language (Hardwarebeschreibungssprache)"
								}
							</td>
						</tr>
						<tr>
							<td>
								<strong>{"VLSI"}</strong>
							</td>
							<td>
								{"Very Large Scale Integration (Sehr hohe Integrationsdichte)"}
							</td>
						</tr>
						<tr>
							<td>
								<strong>{"volatile"}</strong>
							</td>
							<td>
								{
									"englisch für flüchtig (Beim abschalten der Betriebsspannung geht die Information verloren)"
								}
							</td>
						</tr>
					</tbody>
				</table>
				<br />
			</div>
		</>
	);
}
