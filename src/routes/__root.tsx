import {
	createRootRoute,
	HeadContent,
	Outlet,
	Scripts,
	Link,
	useRouterState,
} from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { catalog } from "../lib/catalog";
import { OfflineButton } from "../components/offline-button";
import { NotebookSave } from "../components/notebook";
import appCSS from "../styles.css?url";
const groups = [
	{
		id: "Elektrotechnik",
		name: "Elektrotechnik",
		path: "/Elektrotechnik/elektrotechnik",
	},
	{ id: "Elektronik", name: "Elektronik", path: "/Elektronik/elektronik" },
	{ id: "Allgemein", name: "Allgemein", path: "/Allgemein/Massvorsaetze" },
	{ id: "HST", name: "HST", path: "/HST/hst" },
];
export const Route = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{ name: "viewport", content: "width=device-width, initial-scale=1" },
			{ title: "Elecalculate" },
			{
				name: "description",
				content:
					"Rechner und Grundlagen für Elektronik, Elektrotechnik und Hardware. Mit vollständigem Lösungsweg und Offline-Nutzung.",
			},
			{ name: "theme-color", content: "#000000" },
			{ name: "elecalculate-build", content: __ELECALCULATE_BUILD_ID__ },
		],
		links: [
			{ rel: "stylesheet", href: appCSS },
			{ rel: "icon", href: "/Pictures/favicon.png" },
			{ rel: "manifest", href: "/manifest.webmanifest" },
		],
	}),
	component: Root,
	notFoundComponent: () => (
		<div className="not-found">
			<h1>Diese Seite gibt es nicht.</h1>
			<Link to="/">Zur Themenübersicht</Link>
		</div>
	),
	errorComponent: ({ error, reset }) => (
		<div className="not-found">
			<h1>Die Seite konnte nicht geladen werden.</h1>
			<p>{error instanceof Error ? error.message : "Unbekannter Fehler"}</p>
			<button onClick={reset}>Erneut versuchen</button>
		</div>
	),
});
const topicOrder: Record<string, string[]> = {
	Elektrotechnik: [
		"elektrotechnik",
		"Gleichstrom",
		"Wechselstrom",
		"Transformator",
		"Magnetismus",
		"Kondensator",
		"Spule",
		"Schwingkreis",
		"Verstaerkung_Daempfung",
		"Filter",
		"Drehstrom",
		"Drehstrom_Simulator",
	],
	Elektronik: [
		"elektronik",
		"Dioden",
		"Transistor",
		"OPV",
		"FETs",
		"Aktiv_Filter",
	],
	Allgemein: [
		"E-Reihe",
		"Mathe",
		"Widerstandstabelle",
		"Glossar",
		"Massvorsaetze",
		"Werkstoffe",
		"Qubit",
	],
	HST: [
		"hst",
		"Massvorsaetze_Binaer",
		"Ausgangs_Stufen",
		"Gatter",
		"Objekt_Orientiert",
		"C_Syntax",
	],
};
function Root() {
	const path = useRouterState({
		select: (s) => s.location.pathname.replace(/\/+$/, "") || "/",
	});
	const [menuOpen, setMenuOpen] = useState(false);
	const menuToggle = useRef<HTMLButtonElement>(null);
	const menu = useRef<HTMLElement>(null);
	const [search, setSearch] = useState("");
	const group = groups.find((g) => path.startsWith("/" + g.id + "/"));
	const currentGroup = group?.id ?? "Allgemein";
	const topics = catalog
		.filter((p) => p.category === currentGroup)
		.sort(
			(a, b) =>
				topicOrder[currentGroup].indexOf(
					a.file.split("/")[1].replace(".html", ""),
				) -
				topicOrder[currentGroup].indexOf(
					b.file.split("/")[1].replace(".html", ""),
				),
		);
	useEffect(() => {
		setMenuOpen(false);
		setSearch("");
	}, [path]);
	useEffect(() => {
		const close = (event: KeyboardEvent) => {
			if (event.key === "Escape" && menuOpen) {
				setMenuOpen(false);
				menuToggle.current?.focus();
			}
		};
		window.addEventListener("keydown", close);
		return () => window.removeEventListener("keydown", close);
	}, [menuOpen]);
	useEffect(() => {
		if (menuOpen) menu.current?.querySelector<HTMLAnchorElement>("a")?.focus();
	}, [menuOpen]);
	return (
		<html lang="de">
			<head>
				<HeadContent />
			</head>
			<body>
				<a className="skip-link" href="#content">
					Zum Inhalt
				</a>
				<header className="classic-header">
					<button
						ref={menuToggle}
						className="menu-toggle"
						aria-label={menuOpen ? "Menü schließen" : "Menü öffnen"}
						aria-expanded={menuOpen}
						aria-controls="site-menu"
						onClick={() => setMenuOpen((v) => !v)}
					>
						<span />
						<span />
						<span />
					</button>
					<Link
						className="compact-brand"
						to="/"
						aria-label="Elecalculate Startseite"
					>
						<img src="/Pictures/favicon_no_BG.svg" alt="" />
						<span>Elecalculate</span>
					</Link>
					<nav className="topic-strip" aria-label="Themen">
						{currentGroup === "Allgemein" && (
							<Link to="/" className={path === "/" ? "current" : ""}>
								Home
							</Link>
						)}
						{topics.map((p) => (
							<Link
								to={"/" + p.file.replace(".html", "")}
								key={p.slug}
								className={
									path === "/" + p.file.replace(".html", "") ? "current" : ""
								}
							>
								{p.title}
							</Link>
						))}
					</nav>
				</header>
				{menuOpen && (
					<button
						className="menu-backdrop"
						aria-label="Menü schließen"
						onClick={() => {
							setMenuOpen(false);
							menuToggle.current?.focus();
						}}
					/>
				)}
				<nav
					ref={menu}
					id="site-menu"
					className="site-menu"
					aria-label="Fachbereiche"
					hidden={!menuOpen}
				>
					<Link to="/" onClick={() => setMenuOpen(false)}>
						Home
					</Link>
					{groups.map((g) => (
						<Link
							key={g.id}
							to={g.path}
							className={group?.id === g.id ? "current" : ""}
							onClick={() => setMenuOpen(false)}
						>
							{g.name}
						</Link>
					))}
					<label htmlFor="topic-search">Thema suchen</label>
					<input
						id="topic-search"
						value={search}
						placeholder="Alle Themen"
						onChange={(e) => setSearch(e.target.value)}
					/>
					{search && (
						<div className="menu-search-results">
							{catalog
								.filter((p) =>
									(p.title + " " + p.sections.join(" "))
										.toLowerCase()
										.includes(search.toLowerCase()),
								)
								.map((p) => (
									<Link
										key={p.slug}
										to={"/" + p.file.replace(".html", "")}
										onClick={() => setMenuOpen(false)}
									>
										{p.title}
									</Link>
								))}
						</div>
					)}
				</nav>
				<div className="site">
					<main id="content" className="min-w-0">
						<div className="site-tools">
							<Link to="/notizbuch/">Notizbuch</Link>
							<OfflineButton />
							{group && <NotebookSave route={path} />}
						</div>
						<Outlet />
					</main>
					<footer className="site-footer">
						<div className="footer-topics">
							{groups.map((g) => (
								<nav key={g.id} aria-label={g.name + " im Fußbereich"}>
									<Link to={g.path}>
										<strong>{g.name}</strong>
									</Link>
									{catalog
										.filter((p) => p.category === g.id)
										.map((p) => (
											<Link key={p.slug} to={"/" + p.file.replace(".html", "")}>
												{p.title}
											</Link>
										))}
								</nav>
							))}
						</div>
						<div className="footer-credit">
							<span>Elecalculate von Jana Ruch</span>
							<a
								href="https://github.com/jaduruch/elecalculate"
								target="_blank"
								rel="noreferrer"
							>
								Quellcode auf GitHub
							</a>
							<span>Berechnungen und Notizen bleiben auf deinem Gerät.</span>
						</div>
					</footer>
				</div>
				<Scripts />
			</body>
		</html>
	);
}
