import { useCalculator } from "../lib/use-calculator";
import { createController } from "../calculations/Elektrotechnik-elektrotechnik.js";
export default function Page() {
	const controller = useCalculator(createController);
	return (
		<div ref={controller.root} className="page-body ">
			<style>{"@layer source { @scope (.page-body) {\n\n} }"}</style>
			<div>
				<h1>
					<br />
					{"Elektrotechnik"}
				</h1>
			</div>
			<div id="pdf-actions">
				<a
					href="/Elektrotechnik/Elektrotechnik.pdf"
					download=""
					className="PDF_Button PDF_Button-Download"
				>
					{"PDF herunterladen"}
				</a>
				<a
					href="/Elektrotechnik/Elektrotechnik.pdf"
					target="_blank"
					className="PDF_Button"
				>
					{"Im neuen Tab öffnen"}
				</a>
			</div>
			<div id="pdfjs-viewer">
				<object
					data="/Elektrotechnik/Elektrotechnik.pdf"
					type="application/pdf"
					title="Elektrotechnik Unterlagen"
				>
					<p style={{ margin: "0" }}>
						{
							"\n                    Ihr Browser kann keine eingebetteten PDFs anzeigen.\n                    "
						}
						<a
							href="/Elektrotechnik/Elektrotechnik.pdf"
							target="_blank"
							className="PDF_Button"
						>
							{"Hier öffnen"}
						</a>
					</p>
				</object>
			</div>
			<br />
		</div>
	);
}
