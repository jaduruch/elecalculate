# Migration record

## Baseline and scope

The original `main` head was `9a6ba6d`. The more recent `development` head,
`79be008`, contains the maintained calculator improvements and the Qubit page.
`source/` preserves that branch's HTML, shared JavaScript, CSS and assets as
comparison fixtures. These files are neither served nor copied into the build.

`coverage.json` maps all 31 subject pages, 296 unique inputs (one duplicated time field removed) and 134 inline
handler bindings to native React components and scoped calculation modules.
The new home and local notebook bring the prerendered total to 33 routes.

The source markup is parsed into JSX. Inline handlers become compiled React
callbacks. Original business logic is extracted into route-scoped modules, shared
helpers are deduplicated, and external dependencies are bundled locally.
There is no document embedding or HTML-only archive used to fulfil the migration.

The other Angular and Next.js branches were earlier migration experiments, not
additional subject content. Their entire histories remain recoverable through
sunset tags. `unmerged-el52/` preserves the independent solver work that was not
merged into development; it is not silently substituted for newer calculator and
diagram code. `branch-snapshots.json` records every retired head.

## Necessary corrections

- The source referenced missing R_Serie.png and R_Parallel.png files. Both
  circuits now have native SVG schematics, and route tests verify every image
  finishes loading.

- The voltage-divider code referred to a different function's `result` variable,
  and its loaded case could repeatedly append output without resolving its
  unknown value. Both are now handled by a pure, typed dependency solver, with
  inverse equations and full-precision intermediate values. Kirchhoff current
  and voltage laws are independently tested.
- Shared numeric parsing accepts decimal comma, scientific notation and both
  micro symbols while preserving case-sensitive milli/mega prefixes. Squared
  prefixes are applied to dimensions, as in mm².
- Invalid numeric input and non-positive resistance values are rejected before
  invoking historical calculators. Worked HTML is sanitized with DOMPurify.
- PDFObject and runtime CDN scripts were replaced by native PDF embedding,
  bundled KaTeX and bundled current Three.js.
- Invalid source table markup was normalized before JSX generation. Additional
  first-level headings become second-level headings within the same page.
- Dropdown headers and resistor colour choices are native buttons. Checkbox
  controls remain keyboard-operable. The glossary filters on input, including
  pasted text and mobile input.
- All DOM queries, document overlays, listeners, scheduled callbacks and animation
  frames belong to the mounted route. Three.js resources are disposed on exit.
- Old `.html` URLs remain functional through static redirects. Notebook route
  validation normalizes trailing slashes used by GitHub Pages.

## Deliberate boundaries

The original reference content remains, but the archive-readiness audit replaced
implemented arithmetic families with independently tested TypeScript models.
Original-source agreement is no longer used as a correctness oracle. Tests cover
physical identities, inverses, signs, zero values, contradictions and wide numeric
scales. Model assumptions, such as ideal OPVs and balanced three-phase voltages,
remain explicit. The original incomplete reference sections are marked as such.

No user account, external database, analytics or AI inference is added. Drizzle
uses a PostgreSQL worker on the user's own device for notebook persistence.
The original unfinished pages remain unfinished. Existing PDFs and source
illustrations remain attributed to their source project.

The old scheduled branch-preview cleanup, offline branch force-pushes and
Windows self-extracting executable pipeline are retired. A single verified
static build supports GitHub Pages and offline browser use.
