# Review code

Review the selected code or the current diff. Apply these constraints:

- Respect `.cursor/rules/`: `do-not-touch` (do not suggest edits to protected files without calling it out), `security-xss` for DOM/URLs, `data-layer` for persistence, `canvas-general` for renderer/scene, `excalidraw-architecture` for actions/state, `conventions` for components/TS.
- Flag violations before suggesting refactors.
- Output: (1) summary, (2) issues by severity, (3) concrete fix suggestions, (4) what to run to verify (`yarn test:code`, `yarn test:typecheck`, targeted tests).

Keep the answer concise.
