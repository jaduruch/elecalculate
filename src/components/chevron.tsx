/** Decorative navigation cue with identical geometry on every platform. */
export function Chevron({
	direction = "right",
	className,
}: {
	direction?: "right" | "down";
	className?: string;
}) {
	return (
		<svg
			className={className}
			width="16"
			height="16"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.75"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
			focusable="false"
		>
			<path d={direction === "down" ? "m6 9 6 6 6-6" : "m9 6 6 6-6 6"} />
		</svg>
	);
}
