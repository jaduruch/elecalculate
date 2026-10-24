import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "@tanstack/react-form";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import {
	capture,
	entrySchema,
	listEntries,
	removeEntry,
	saveEntry,
} from "../lib/notebook";
export function NotebookSave({ route }: { route: string }) {
	const [open, setOpen] = useState(false),
		[status, setStatus] = useState("");
	const client = useQueryClient();
	const mutation = useMutation({
		mutationFn: saveEntry,
		onSuccess: () => {
			void client.invalidateQueries({ queryKey: ["notebook"] });
			setOpen(false);
			setStatus("Im lokalen Notizbuch gespeichert.");
		},
	});
	const form = useForm({
		defaultValues: { title: "", note: "" },
		onSubmit: async ({ value }) => {
			const root = document.querySelector<HTMLElement>(".page-body");
			if (!root) return;
			await mutation.mutateAsync({ ...value, route, snapshot: capture(root) });
		},
	});
	return (
		<div className="notebook-save">
			<button
				onClick={() => {
					setOpen((v) => !v);
					setStatus("");
				}}
				aria-expanded={open}
			>
				Werte merken
			</button>
			{open && (
				<form
					className="save-form"
					onSubmit={(e) => {
						e.preventDefault();
						void form.handleSubmit();
					}}
				>
					<p>Speichert deine Eingaben auf diesem Gerät.</p>
					<form.Field
						name="title"
						validators={{
							onChange: ({ value }) =>
								entrySchema.shape.title.safeParse(value).success
									? undefined
									: "Name mit 1 bis 80 Zeichen eingeben.",
						}}
					>
						{(field) => (
							<label>
								Name
								<input
									value={field.state.value}
									onChange={(e) => field.handleChange(e.target.value)}
									onBlur={field.handleBlur}
									maxLength={80}
									autoFocus
								/>
								{field.state.meta.errors.map((e, i) => (
									<span key={i} className="field-error">
										{String(e)}
									</span>
								))}
							</label>
						)}
					</form.Field>
					<form.Field name="note">
						{(field) => (
							<label>
								Notiz
								<textarea
									value={field.state.value}
									onChange={(e) => field.handleChange(e.target.value)}
									maxLength={500}
								/>
							</label>
						)}
					</form.Field>
					<button type="submit" disabled={mutation.isPending}>
						Speichern
					</button>
					<button type="button" onClick={() => setOpen(false)}>
						Abbrechen
					</button>
					{mutation.error && <p role="alert">{mutation.error.message}</p>}
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
	const entries = useQuery({ queryKey: ["notebook"], queryFn: listEntries });
	const client = useQueryClient();
	const [removed, setRemoved] = useState<string | null>(null);
	const mutation = useMutation({
		mutationFn: ({ id, restore = false }: { id: string; restore?: boolean }) =>
			removeEntry(id, restore),
		onSuccess: () => client.invalidateQueries({ queryKey: ["notebook"] }),
	});
	return (
		<div className="notebook-page">
			<h1>Notizbuch</h1>
			<p>
				Gespeicherte Eingaben und Notizen. Sie bleiben in diesem Browser und
				werden nicht an einen Server übertragen. Geladene Eingaben kannst du im
				jeweiligen Rechner erneut berechnen.
			</p>
			{entries.isPending && <p role="status">Notizbuch wird geöffnet…</p>}
			{entries.error && <p role="alert">{entries.error.message}</p>}
			{entries.data?.length === 0 && (
				<p className="empty-note">
					Noch keine Einträge. Öffne einen Rechner und wähle „Werte merken“.
				</p>
			)}
			<div className="notebook-entries">
				{entries.data?.map((entry) => (
					<article key={entry.id}>
						<div>
							<h2>
								<Link to={entry.route} search={{ notiz: entry.id }}>
									{entry.title}
								</Link>
							</h2>
							<p>{entry.note}</p>
							<small>
								{new Date(entry.createdAt).toLocaleDateString("de-CH")} /{" "}
								{entry.route.split("/").pop()?.replaceAll("_", " ")}
							</small>
						</div>
						<Link to={entry.route} search={{ notiz: entry.id }}>
							Eingaben laden
						</Link>
						<button
							onClick={() => {
								setRemoved(entry.id);
								mutation.mutate({ id: entry.id });
							}}
						>
							Entfernen
						</button>
					</article>
				))}
			</div>
			{removed && (
				<div className="undo-note" role="status">
					Eintrag entfernt.{" "}
					<button
						onClick={() => {
							mutation.mutate({ id: removed, restore: true });
							setRemoved(null);
						}}
					>
						Rückgängig
					</button>
				</div>
			)}
			{mutation.error && <p role="alert">{mutation.error.message}</p>}
		</div>
	);
}
