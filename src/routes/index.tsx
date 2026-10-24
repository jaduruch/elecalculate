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
				<h1>Home</h1>
			</div>
			<section className="home-banner">
				<h2>Rechner für Elektronik und Elektrotechnik.</h2>
			</section>
			<div className="home-introduction">
				<p>
					Mit Elecalculate kannst du berechnen, was du in der Elektronik-Lehre
					benötigst. Gib die bekannten Werte ein und erhalte das Ergebnis mit
					Lösungsweg.
				</p>
				<p>Die Formeln basieren auf:</p>
				<ul>
					<li>Zastrow: Formeln der Elektronik</li>
					<li>Europa: Formeln Elektrotechnik PLUS+</li>
				</ul>
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
