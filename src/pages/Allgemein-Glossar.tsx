import { useCalculator } from "../lib/use-calculator";
import { createController } from "../calculations/Allgemein-Glossar.js";
export default function Page() {
	const controller = useCalculator(createController);
	return (
		<div
			ref={controller.root}
			data-ready={controller.ready ? "true" : undefined}
			className="page-body "
		>
			<style>{"@layer source { @scope (.page-body) {\n\n} }"}</style>
			<div>
				<h1>
					<br />
					{"Glossar"}
				</h1>
			</div>
			<table style={{ maxWidth: "80px" }}>
				<tbody>
					<tr>
						<th>{"Bezeichnung"}</th>
						<th>{"Formelzeichen"}</th>
						<th>{"SI-Einheit"}</th>
						<th></th>
					</tr>
					<tr style={{ color: "var(--Strom)" }}>
						<td>{"Strom"}</td>
						<td>{"I"}</td>
						<td>{"Ampère"}</td>
						<td>{"A"}</td>
					</tr>
					<tr style={{ color: "var(--Winkel)" }}>
						<td>{"Winkel"}</td>
						<td>{"φ"}</td>
						<td>{"grad"}</td>
						<td>{"°"}</td>
					</tr>
					<tr style={{ color: "var(--Kraft)" }}>
						<td>{"Kraft"}</td>
						<td>{"F"}</td>
						<td>{"Newton"}</td>
						<td>{"N"}</td>
					</tr>
					<tr style={{ color: "var(--Zeitkonstante)" }}>
						<td>{"Zeitkonstante"}</td>
						<td>{"𝝉"}</td>
						<td>{"sekunden"}</td>
						<td>{"s"}</td>
					</tr>
					<tr style={{ color: "var(--Verstaerkungsmass)" }}>
						<td>{"Verstärkungsmass"}</td>
						<td>{"g"}</td>
						<td>{"1 [dB]"}</td>
						<td></td>
					</tr>
					<tr style={{ color: "var(--Feldstaerke)" }}>
						<td>{"Feldstärke"}</td>
						<td>{"H"}</td>
						<td>{"Ampère/meter"}</td>
						<td>{"A/m"}</td>
					</tr>
					<tr style={{ color: "var(--Widerstand)" }}>
						<td>{"Widerstand"}</td>
						<td>{"R"}</td>
						<td>{"Ohm"}</td>
						<td>{"Ω"}</td>
					</tr>
					<tr style={{ color: "var(--Durchflutung)" }}>
						<td>{"Durchflutung"}</td>
						<td>{"Θ"}</td>
						<td>{"Ampère"}</td>
						<td>{"A"}</td>
					</tr>
					<tr style={{ color: "var(--Induktivitaet)" }}>
						<td>{"Induktivität"}</td>
						<td>{"L"}</td>
						<td>{"Henri"}</td>
						<td>{"H"}</td>
					</tr>
					<tr style={{ color: "var(--Daempfungsmass)" }}>
						<td>{"Dämpfungsmass"}</td>
						<td>{"a"}</td>
						<td>{"1 [dB]"}</td>
						<td></td>
					</tr>
					<tr style={{ color: "var(--Permeabilitaetszahl)" }}>
						<td>{"Permeabilitätszahl"}</td>
						<td>
							{"μ"}
							<sub>{"r"}</sub>
						</td>
						<td>{"1"}</td>
						<td></td>
					</tr>
					<tr style={{ color: "var(--Dielektrizitaetszahl)" }}>
						<td>{"Dielektrizitätszahl"}</td>
						<td>
							{"ε"}
							<sub>{"r"}</sub>
						</td>
						<td>{"1"}</td>
						<td></td>
					</tr>
					<tr style={{ color: "var(--Guete)" }}>
						<td>{"(Kreis) Güte"}</td>
						<td>{"Q"}</td>
						<td>{"1"}</td>
						<td></td>
					</tr>
					<tr style={{ color: "var(--Flaeche)" }}>
						<td>{"Fläche"}</td>
						<td>{"A"}</td>
						<td>{"Quadratmeter"}</td>
						<td>
							{"m"}
							<sup>{"2"}</sup>
						</td>
					</tr>
					<tr style={{ color: "var(--Leistung)" }}>
						<td>{"Leistung"}</td>
						<td>{"P"}</td>
						<td>{"Watt"}</td>
						<td>{"W"}</td>
					</tr>
					<tr style={{ color: "var(--Elektronenabstand)" }}>
						<td>{"Elektronenabstand"}</td>
						<td>{"s"}</td>
						<td>{"Meter"}</td>
						<td>{"m"}</td>
					</tr>
					<tr style={{ color: "var(--Windungszahl)" }}>
						<td>{"Windungszahl"}</td>
						<td>{"N"}</td>
						<td>{"1"}</td>
						<td></td>
					</tr>
					<tr style={{ color: "var(--Geschwindigkeit)" }}>
						<td>{"Geschwindigkeit"}</td>
						<td>{"v"}</td>
						<td>{"Meter/sekunde"}</td>
						<td>{"m/s"}</td>
					</tr>
					<tr style={{ color: "var(--Mag_Widerstand)" }}>
						<td>{"Mag. Widerstand"}</td>
						<td>
							{"R"}
							<sub>{"m"}</sub>
						</td>
						<td>{"Ampère/Volt sek."}</td>
						<td>{"A/Vs"}</td>
					</tr>
					<tr style={{ color: "var(--Kapazitaet)" }}>
						<td>{"Kapazität"}</td>
						<td>{"C"}</td>
						<td>{"Farad"}</td>
						<td>{"F"}</td>
					</tr>
					<tr style={{ color: "var(--Mag_Fluss)" }}>
						<td>{"Mag. Fluss"}</td>
						<td>{"Φ"}</td>
						<td>{"Weber"}</td>
						<td>{"Wb"}</td>
					</tr>
					<tr style={{ color: "var(--Spannung)" }}>
						<td>{"Spannung"}</td>
						<td>{"U"}</td>
						<td>{"Volt"}</td>
						<td>{"V"}</td>
					</tr>
					<tr style={{ color: "var(--Energie)" }}>
						<td>{"Energie"}</td>
						<td>{"W"}</td>
						<td>{"Joule"}</td>
						<td>{"J"}</td>
					</tr>
					<tr style={{ color: "var(--Spulenkonstante)" }}>
						<td>{"Spulenkonstante"}</td>
						<td>
							{"A"}
							<sub>{"L"}</sub>
						</td>
						<td>{"Volt sek./Ampère"}</td>
						<td>{"Vs/A"}</td>
					</tr>
					<tr style={{ color: "var(--Laenge)" }}>
						<td>{"Länge"}</td>
						<td>{"l"}</td>
						<td>{"meter"}</td>
						<td>{"m"}</td>
					</tr>
					<tr style={{ color: "var(--Ladung)" }}>
						<td>{"Ladung"}</td>
						<td>{"Q"}</td>
						<td>{"Coulomb"}</td>
						<td>{"C"}</td>
					</tr>
					<tr style={{ color: "var(--Verstaerkungsfaktor)" }}>
						<td>{"Verstärkungsfaktor"}</td>
						<td>{"V"}</td>
						<td>{"1"}</td>
						<td></td>
					</tr>
					<tr style={{ color: "var(--Frequenz)" }}>
						<td>{"Frequenz"}</td>
						<td>{"f"}</td>
						<td>{"Herz"}</td>
						<td>{"Hz"}</td>
					</tr>
					<tr style={{ color: "var(--Mag_Flussdichte)" }}>
						<td>{"Mag. Flussdichte"}</td>
						<td>{"B"}</td>
						<td>{"Tesla"}</td>
						<td>{"T"}</td>
					</tr>
					<tr style={{ color: "var(--Daempfungsfaktor)" }}>
						<td>{"Dämpfungsfaktor"}</td>
						<td>{"D"}</td>
						<td>{"1"}</td>
						<td></td>
					</tr>
					<tr style={{ color: "var(--Zeit)" }}>
						<td>{"Zeit"}</td>
						<td>{"t"}</td>
						<td>{"sekunden"}</td>
						<td>{"s"}</td>
					</tr>
				</tbody>
			</table>
			<br />
		</div>
	);
}
