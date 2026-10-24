import { createFileRoute, Link } from "@tanstack/react-router";
import { catalog } from "../lib/catalog";
export const Route = createFileRoute("/")({ component: Index });
const departments = [
	{
		key: "Elektrotechnik",
		title: "Elektrotechnik",
		text: "Von Gleichstrom und Wechselstrom bis zu Filtern, Transformatoren und Schwingkreisen.",
	},
	{
		key: "Elektronik",
		title: "Elektronik",
		text: "Verstärkerschaltungen, Transistoren und die Bauteile dahinter.",
	},
	{
		key: "Allgemein",
		title: "Grundlagen",
		text: "Einheiten, Werkstoffe, Widerstandsreihen und ein Ausflug in die Quantenmechanik.",
	},
	{
		key: "HST",
		title: "Hard- und Softwaretechnik",
		text: "Logische Gatter, digitale Schaltungen, Programmierung und Begriffe.",
	},
];
function Index() {
	return (
		<div className="directory">
			<div className="directory-heading">
				<h1>Was möchtest du berechnen?</h1>
				<p>
					Elecalculate erklärt den Weg zum Ergebnis. Wähle ein Thema und gib die
					bekannten Werte ein. Fehlende Größen werden berechnet, die einzelnen
					Schritte bleiben sichtbar.
				</p>
			</div>
			<div className="featured-topic">
				<div>
					<span>Direkt zum Rechner</span>
					<h2>
						<Link to="/Elektrotechnik/Gleichstrom/">
							Ohmsches Gesetz und Spannungsteiler
						</Link>
					</h2>
					<p>
						Spannung U, Strom I, Widerstand R und Leistung P. Zwei Werte
						reichen.
					</p>
					<Link className="text-link" to="/Elektrotechnik/Gleichstrom/">
						Gleichstrom berechnen →
					</Link>
				</div>
				<Link
					to="/Elektrotechnik/Gleichstrom/"
					tabIndex={-1}
					aria-hidden="true"
				>
					<img
						src="/Pictures/Gliechstrom_Schematic.jpg"
						alt="Schaltplan eines Gleichstromkreises"
					/>
				</Link>
			</div>
			<div className="department-list">
				{departments.map((d) => (
					<section key={d.key}>
						<div className="department-intro">
							<h2>{d.title}</h2>
							<p>{d.text}</p>
						</div>
						<ul>
							{catalog
								.filter((p) => p.category === d.key)
								.map((p) => (
									<li key={p.slug}>
										<Link to={"/" + p.file.replace(".html", "")}>
											{p.title}
											<span aria-hidden="true">↗</span>
										</Link>
									</li>
								))}
						</ul>
					</section>
				))}
			</div>
			<p className="project-note">
				Dieses Projekt wird nicht mehr um neue Fachinhalte erweitert. Die
				vorhandenen Rechner und Lerninhalte bleiben hier zugänglich.
			</p>
		</div>
	);
}
