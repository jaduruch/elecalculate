import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "@tanstack/react-form";
import { Link } from "@tanstack/react-router";
import { useEffect, useId, useRef, useState } from "react";
import {
	capture,
	entrySchema,
	listEntries,
	removeEntry,
	saveEntry,
	subscribeNotebookChanges,
	notebookError,
} from "../lib/notebook";
export function NotebookSave({ route }: { route: string }) {
	return <NotebookEditor key={route} route={route} />;
}
function NotebookEditor({ route }: { route: string }) {
	const [open, setOpen] = useState(false),
		[status, setStatus] = useState(""),
		[error, setError] = useState("");
	const saving = useRef(false);
	const toggle = useRef<HTMLButtonElement>(null);
	const formId = useId();
	const titleErrorId = useId();
	const titleId = useId();
	const focusAfterSaving = useRef(false);
	const closeEditor = () => {
		if (saving.current) return;
		setOpen(false);
		toggle.current?.focus();
	};
	const client = useQueryClient();
	const mutation = useMutation({
		networkMode: "always",
		mutationFn: saveEntry,
		onSuccess: () => {
			void client.invalidateQueries({ queryKey: ["notebook"] });
			setOpen(false);
			focusAfterSaving.current = true;
			setStatus("Im lokalen Notizbuch gespeichert.");
		},
	});
	useEffect(() => {
		if (!open && !mutation.isPending && focusAfterSaving.current) {
			focusAfterSaving.current = false;
			toggle.current?.focus();
		}
	}, [open, mutation.isPending]);
	const form = useForm({
		defaultValues: { title: "", note: "" },
		onSubmit: async ({ value, formApi }) => {
			if (saving.current) return;
			const root = document.querySelector<HTMLElement>(".page-body");
			if (!root) {
				setError("Der Rechner ist noch nicht bereit. Bitte erneut versuchen.");
				return;
			}
			saving.current = true;
			setError("");
			try {
				await mutation.mutateAsync({
					...value,
					route,
					snapshot: capture(root),
				});
				formApi.reset();
			} catch (cause) {
				setError(notebookError(cause));
			} finally {
				saving.current = false;
			}
		},
	});
	const validateTitle = ({ value }: { value: string }) =>
		entrySchema.shape.title.safeParse(value).success
			? undefined
			: "Name mit 1 bis 80 Zeichen eingeben.";
	return (
		<div className="notebook-save">
			<button
				ref={toggle}
				type="button"
				aria-controls={formId}
				disabled={mutation.isPending}
				onClick={() => {
					setOpen((v) => !v);
					setStatus("");
					setError("");
				}}
				aria-expanded={open}
			>
				Werte merken
			</button>
			{open && (
				<form
					id={formId}
					className="save-form"
					aria-label="Eingaben speichern"
					onKeyDown={(event) => {
						if (event.key === "Escape") {
							event.stopPropagation();
							event.preventDefault();
							closeEditor();
						}
					}}
					aria-busy={mutation.isPending}
					onSubmit={(event) => {
						event.preventDefault();
						void form.handleSubmit();
					}}
				>
					<p>Speichert deine Eingaben auf diesem Gerät.</p>
					<form.Field
						name="title"
						validators={{ onChange: validateTitle, onSubmit: validateTitle }}
					>
						{(field) => (
							<div className="save-field">
								<label htmlFor={titleId}>Name</label>
								<input
									id={titleId}
									value={field.state.value}
									onChange={(event) => field.handleChange(event.target.value)}
									onBlur={field.handleBlur}
									maxLength={80}
									disabled={mutation.isPending}
									autoFocus
									aria-invalid={field.state.meta.errors.length > 0}
									aria-describedby={
										field.state.meta.errors.length > 0
											? titleErrorId
											: undefined
									}
								/>
								{field.state.meta.errors.length > 0 && (
									<span id={titleErrorId} className="field-error" role="alert">
										{Array.from(
											new Set(field.state.meta.errors.map(String)),
										).join(" ")}
									</span>
								)}
							</div>
						)}
					</form.Field>
					<form.Field name="note">
						{(field) => (
							<label>
								Notiz
								<textarea
									value={field.state.value}
									onChange={(event) => field.handleChange(event.target.value)}
									maxLength={500}
									disabled={mutation.isPending}
								/>
							</label>
						)}
					</form.Field>
					<button type="submit" disabled={mutation.isPending}>
						{mutation.isPending ? "Wird gespeichert…" : "Speichern"}
					</button>
					<button
						type="button"
						disabled={mutation.isPending}
						onClick={closeEditor}
					>
						Abbrechen
					</button>
					{mutation.isPending && (
						<p aria-live="polite">
							Wird lokal gespeichert. Bitte die Seite bis zur Bestätigung
							geöffnet lassen. Die erste Vorbereitung kann etwas länger dauern.
						</p>
					)}
					{error && <p role="alert">{error}</p>}
				</form>
			)}
			{status && (
				<span className="save-status" role="status">
					{status}
				</span>
			)}
		</div>
	);
}
export function Notebook() {
	const [showRemoved, setShowRemoved] = useState(false);
	const entries = useQuery({
		networkMode: "always",
		// Reads are local and cheap. Always refresh on return, including changes
		// committed by another tab while this view was not subscribed.
		staleTime: 0,
		queryKey: ["notebook", showRemoved ? "removed" : "active"],
		queryFn: () => listEntries(showRemoved),
	});
	const client = useQueryClient();
	const [removed, setRemoved] = useState<{ id: string; title: string }[]>([]);
	useEffect(
		() =>
			subscribeNotebookChanges(() => {
				void client.invalidateQueries({ queryKey: ["notebook"] });
			}),
		[client],
	);
	const mutation = useMutation({
		networkMode: "always",
		mutationFn: ({
			id,
			restore = false,
		}: {
			id: string;
			restore?: boolean;
			title?: string;
		}) => removeEntry(id, restore),
		onSuccess: (_result, variables) => {
			if (variables.restore)
				setRemoved((previous) =>
					previous.filter((entry) => entry.id !== variables.id),
				);
			else
				setRemoved((previous) => [
					...previous.filter((entry) => entry.id !== variables.id),
					{ id: variables.id, title: variables.title ?? "Eintrag" },
				]);
			return client.invalidateQueries({ queryKey: ["notebook"] });
		},
	});
	return (
		<div className="notebook-page">
			<h1>Notizbuch</h1>
			<p>
				Gespeicherte Eingaben und Notizen. Sie bleiben in diesem Browser und
				werden nicht an einen Server übertragen. Geladene Eingaben kannst du im
				jeweiligen Rechner erneut berechnen.
			</p>
			<button
				className="underline notebook-filter"
				type="button"
				aria-pressed={showRemoved}
				aria-controls="notebook-entries"
				onClick={() => setShowRemoved((v) => !v)}
			>
				{showRemoved
					? "Aktive Einträge anzeigen"
					: "Entfernte Einträge anzeigen"}
			</button>
			{entries.isPending && <p role="status">Notizbuch wird geöffnet…</p>}
			{entries.error && (
				<div role="alert">
					<p>{notebookError(entries.error)}</p>
					<button
						className="underline"
						onClick={() => {
							void entries.refetch();
						}}
					>
						Erneut versuchen
					</button>
				</div>
			)}
			{entries.data?.length === 0 && (
				<p className="empty-note">
					{showRemoved
						? "Keine entfernten Einträge."
						: "Noch keine Einträge. Öffne einen Rechner und wähle „Werte merken“."}
				</p>
			)}
			<div id="notebook-entries" className="notebook-entries">
				{entries.data?.map((entry) => (
					<article key={entry.id} aria-labelledby={`entry-${entry.id}`}>
						<div className="notebook-entry-content">
							<h2 id={`entry-${entry.id}`}>
								{showRemoved ? (
									entry.title
								) : (
									<Link to={entry.route} search={{ notiz: entry.id }}>
										{entry.title}
									</Link>
								)}
							</h2>
							<p>{entry.note}</p>
							<small>
								{new Date(entry.createdAt).toLocaleDateString("de-CH")} /{" "}
								{entry.route.split("/").pop()?.replaceAll("_", " ")}
							</small>
						</div>
						<div className="notebook-entry-actions">
							{showRemoved ? (
								<button
									disabled={mutation.isPending}
									onClick={() =>
										mutation.mutate({ id: entry.id, restore: true })
									}
								>
									Wiederherstellen
								</button>
							) : (
								<>
									<Link to={entry.route} search={{ notiz: entry.id }}>
										Eingaben laden
									</Link>
									<button
										disabled={mutation.isPending}
										onClick={() =>
											mutation.mutate({ id: entry.id, title: entry.title })
										}
									>
										Entfernen
									</button>
								</>
							)}
						</div>
					</article>
				))}
			</div>
			{!showRemoved &&
				removed.map((entry) => (
					<div className="undo-note" role="status" key={entry.id}>
						Eintrag „{entry.title}“ entfernt.{" "}
						<button
							disabled={mutation.isPending}
							aria-label={`${entry.title}: Rückgängig`}
							onClick={() => mutation.mutate({ id: entry.id, restore: true })}
						>
							Rückgängig
						</button>
					</div>
				))}
			{mutation.error && <p role="alert">{notebookError(mutation.error)}</p>}
		</div>
	);
}
