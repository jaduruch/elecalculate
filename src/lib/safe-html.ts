import DOMPurify from "dompurify";
/** Existing worked solutions contain mathematical HTML, but raw input is never trusted. */
export function setHTML(element: HTMLElement, html: unknown) {
	element.innerHTML = DOMPurify.sanitize(String(html), {
		ADD_TAGS: ["math"],
		ADD_ATTR: ["data-ec-function", "data-ec-arg"],
	});
}
