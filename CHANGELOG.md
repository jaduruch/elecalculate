# Changes

## 2.1.1

- Replaced platform-dependent topic arrows and accordion glyphs with consistent,
  monochrome SVG chevrons. Internal links no longer resemble external links.
- Removed the Qubit holiday popup, emoji hint and button fireworks so measurement
  leaves the result and controls visible.
- Corrected "Aktive Filter" across navigation, page headings and metadata, and
  replaced the AI reference in the footer with a local-storage explanation.

## 2.1.0

Final functional audit before archival. The original black interface and existing
subject structure remain.

- Replaced inherited calculator arithmetic with typed models for DC, geometry,
  materials, gain, transistor switches, waveforms, PWM, OPVs, passive components,
  transients, filters, resonance, transformers and magnetism. Corrected inverse
  equations, sign/zero handling, conflicting-input detection and numeric precision.
- Added independent physical references and forward/inverse/scale tests. Browser
  checks read unrounded SI results instead of treating the old code as an oracle.
- Corrected three-phase voltage relationships and the simulator's instantaneous
  phase sum. Added pause/reduced-motion controls and preserved actual Qubit state.
  Mathematical state updates precede GPU drawing, and idle decoration yields CPU
  while notes are edited or saved.
- Fixed fractional resistor multipliers, duplicate fields/results, annotation URLs,
  stale reset charts, stale-chart export prevention, example/unit semantics and
  accessible PNG exports.
- Saved work restores every calculator mode, dynamic fields, units and simulation
  state. Saved entries show an explicit loading state and cannot overwrite new
  edits while loading; save drafts are frozen during a pending write. Local
  storage works immediately offline, across tabs and through failure
  and retry. Removed entries remain recoverable after reload.
- Offline updates now distinguish download completion from an old active worker,
  require explicit activation, preserve unfinished calculator work, retain chunks
  needed by older tabs, and provide a standalone recovery page for old installs.
- Added real Chromium and WebKit desktop/mobile verification, including mobile
  overflow, keyboard focus, graph controls, downloads, failures and offline races.

The original unfinished teaching sections remain explicitly marked as unfinished.
Ideal-model assumptions remain visible; this release does not invent missing
course content or hide calculation limits.
