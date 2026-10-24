import {
	createRootRoute,
	HeadContent,
	Outlet,
	Scripts,
	Link,
	useRouterState,
} from "@tanstack/react-router";
import { useState } from "react";
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
	{ id: "Allgemein", name: "Grundlagen", path: "/Allgemein/Massvorsaetze" },
	{ id: "HST", name: "Hard- & Software", path: "/HST/hst" },
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
			{ name: "theme-color", content: "#eeeae1" },
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
function Root() {
	const path = useRouterState({
		select: (s) => s.location.pathname.replace(/\/+$/, "") || "/",
	});
	const [search, setSearch] = useState("");
	const group = groups.find((g) => path.startsWith("/" + g.id + "/"));
	const topics = catalog.filter(
		(p) =>
			(!group || p.category === group.id) &&
			(p.title + " " + p.sections.join(" "))
				.toLowerCase()
				.includes(search.toLowerCase()),
	);
	return (
		<html lang="de">
			<head>
				<HeadContent />
			</head>
			<body>
				<a className="skip-link" href="#content">
					Zum Inhalt
				</a>
				<div className="site">
					<header className="masthead">
						<Link to="/" className="wordmark">
							<img src="/Pictures/favicon.png" alt="" />
							<span>elecalculate</span>
						</Link>
						<div className="masthead-note">
							Elektronik und Elektrotechnik
							<br />
							Rechner mit Lösungsweg
						</div>
						<div className="masthead-actions">
							<Link to="/notizbuch/">Notizbuch</Link>
							<OfflineButton />
						</div>
					</header>
					<nav className="subject-nav" aria-label="Fachbereiche">
						{groups.map((g) => (
							<Link
								key={g.id}
								to={g.path}
								className={group?.id === g.id ? "current" : ""}
							>
								{g.name}
							</Link>
						))}
					</nav>
					<div className={path === "/" ? "home-layout" : "document-layout"}>
						{path !== "/" && (
							<aside className="topic-nav">
								<label htmlFor="topic-search">{group?.name ?? "Themen"}</label>
								<input
									id="topic-search"
									placeholder="Thema suchen"
									value={search}
									onChange={(e) => setSearch(e.target.value)}
								/>
								<nav aria-label="Themen">
									{topics.map((p) => (
										<Link
											to={"/" + p.file.replace(".html", "")}
											key={p.slug}
											className={
												path === "/" + p.file.replace(".html", "")
													? "current"
													: ""
											}
										>
											{p.title}
										</Link>
									))}
									{!topics.length && <p>Kein passendes Thema.</p>}
								</nav>
								<a
									className="source-link"
									href="https://github.com/jaduruch/elecalculate"
									target="_blank"
									rel="noreferrer"
								>
									Quellcode auf GitHub
								</a>
							</aside>
						)}
						<main id="content" className="min-w-0">
							{path !== "/" && (
								<div className="document-toolbar">
									<Link to="/">Übersicht</Link>
									<span aria-hidden="true">/</span>
									<span>{group?.name ?? "Notizbuch"}</span>
									{group && <NotebookSave route={path} />}
								</div>
							)}
							<Outlet />
						</main>
					</div>
					<footer className="site-footer">
						<span>Elecalculate von Jana Ruch</span>
						<a
							href="https://github.com/jaduruch/elecalculate"
							target="_blank"
							rel="noreferrer"
						>
							Open Source
						</a>
						<span>Berechnungen ohne KI und ohne Datenversand.</span>
					</footer>
				</div>
				<Scripts />
			</body>
		</html>
	);
}
