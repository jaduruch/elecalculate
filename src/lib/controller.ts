import renderMathInElement from "katex/contrib/auto-render";
export type Handler = (...args: any[]) => unknown;
export interface Controller {
	handlers: Record<string, Handler>;
	dispose?: () => void;
}
export type Factory = (scope: ReturnType<typeof createScope>) => Controller;
/** Mount-scoped resources prevent calculators leaking across Router navigations. */
export function createScope(root: HTMLElement) {
	const cleanups: (() => void)[] = [];
	const ready: (() => void)[] = [];
	let disposed = false;
	const frames = new Set<number>();
	const timers = new Set<ReturnType<typeof setTimeout>>();
	const intervals = new Set<ReturnType<typeof setInterval>>();
	const listeners = (
		target: EventTarget,
		type: string,
		fn: EventListenerOrEventListenerObject,
		options?: AddEventListenerOptions | boolean,
	) => {
		target.addEventListener(type, fn, options);
		cleanups.push(() => target.removeEventListener(type, fn, options));
	};
	const math = {
		typeset: (nodes: HTMLElement[] = [root]) => {
			void math.typesetPromise(nodes);
		},
		typesetPromise: async (nodes: HTMLElement[] = [root]) => {
			if (disposed) return;
			for (const node of nodes)
				if (node)
					renderMathInElement(node, {
						delimiters: [
							{ left: "$$", right: "$$", display: true },
							{ left: "\\[", right: "\\]", display: true },
							{ left: "\\(", right: "\\)", display: false },
						],
						throwOnError: false,
					});
		},
		startup: { promise: Promise.resolve() },
	};
	const scopedDocument = new Proxy(document, {
		get(target, key) {
			if (key === "body" || key === "head") return root;
			if (key === "getElementById")
				return (id: string) => root.querySelector("#" + CSS.escape(id));
			if (key === "querySelector")
				return (selector: string) => root.querySelector(selector);
			if (key === "querySelectorAll")
				return (selector: string) => root.querySelectorAll(selector);
			if (key === "getElementsByClassName")
				return (name: string) => root.getElementsByClassName(name);
			if (key === "getElementsByTagName")
				return (name: string) => root.getElementsByTagName(name);
			if (key === "addEventListener")
				return (
					type: string,
					fn: EventListenerOrEventListenerObject,
					options?: AddEventListenerOptions | boolean,
				) => {
					if (type === "DOMContentLoaded") {
						ready.push(() =>
							typeof fn === "function"
								? fn(new Event(type))
								: fn.handleEvent(new Event(type)),
						);
					} else listeners(root, type, fn, options);
				};
			const value = Reflect.get(target, key, target);
			return typeof value === "function" ? value.bind(target) : value;
		},
	});
	const scopedWindow = new Proxy(window, {
		get(target, key) {
			if (key === "MathJax") return math;
			if (key === "addEventListener")
				return (
					type: string,
					fn: EventListenerOrEventListenerObject,
					options?: AddEventListenerOptions | boolean,
				) => listeners(window, type, fn, options);
			const value = Reflect.get(target, key, target);
			return typeof value === "function" ? value.bind(target) : value;
		},
	});
	return {
		document: scopedDocument,
		window: scopedWindow,
		MathJax: math,
		requestAnimationFrame(fn: FrameRequestCallback) {
			if (disposed) return 0;
			const id = window.requestAnimationFrame((t) => {
				frames.delete(id);
				if (!disposed) fn(t);
			});
			frames.add(id);
			return id;
		},
		cancelAnimationFrame(id: number) {
			frames.delete(id);
			window.cancelAnimationFrame(id);
		},
		setTimeout(fn: () => void, ms?: number) {
			const id = setTimeout(() => {
				timers.delete(id);
				if (!disposed) fn();
			}, ms);
			timers.add(id);
			return id;
		},
		clearTimeout(id: ReturnType<typeof setTimeout>) {
			timers.delete(id);
			clearTimeout(id);
		},
		setInterval(fn: () => void, ms?: number) {
			const id = setInterval(() => {
				if (!disposed) fn();
			}, ms);
			intervals.add(id);
			return id;
		},
		clearInterval(id: ReturnType<typeof setInterval>) {
			intervals.delete(id);
			clearInterval(id);
		},
		listen: listeners,
		runReady() {
			for (const fn of ready) fn();
			void math.typesetPromise();
		},
		dispose() {
			disposed = true;
			frames.forEach((id) => window.cancelAnimationFrame(id));
			timers.forEach((id) => clearTimeout(id));
			intervals.forEach((id) => clearInterval(id));
			cleanups.forEach((fn) => fn());
		},
	};
}
