# Active Context

## Memory bank maintenance

- **Keep `docs/memory/` updated after each meaningful project change** (see [README.md](README.md) in this folder for file roles and a checklist).
- Agents and contributors should refresh *Current focus*, *progress.md*, and any other affected memory files before considering a task complete.

## Current focus

- Cursor project rules under `.cursor/rules/` (architecture, conventions, protected files).
- Root `AGENTS.md` for agent-oriented workflow notes.
- Repository exploration and architecture mapping for documentation.
- Capturing verified project context in `docs/memory/*` and `docs/technical/architecture.md`.
- Keeping generated artifacts out of AI context/indexing (`.cursorignore`).

## What appears to be active in working tree

- Untracked: `.cursor/`, `.cursorignore`, `AGENTS.md`, `docs/` (including `docs/memory/README.md` and memory updates).

## Why this matters now

- The project is large; memory-bank files reduce onboarding cost and repeated rediscovery.
- Current chat activity indicates focus on:
  - understanding architecture,
  - identifying generated artifacts,
  - preparing codebase context for agent workflows.

## Extension opportunities

- Add module-level memory pages:
  - `packages/excalidraw/components/`
  - `packages/excalidraw/actions/`
  - `packages/excalidraw/data/`
- Add runbook files:
  - local debug workflow,
  - release workflow,
  - common troubleshooting scenarios.
- Extend architecture docs if needed (e.g. `excalidraw-app` collab layer).

## Suggested next steps

- Verify and commit `docs/memory/*` and `docs/technical/*` when content is approved.
- Decide final `.cursorignore` policy for generated outputs.
- Optionally split memory files by domain owner (app/runtime/package/integration/release).
- Optionally add a root `docs/README.md` linking to `docs/memory/` and `docs/technical/`.

## Source verification

- `git status --short --branch` output (working tree state).
- Current repository files analyzed in this session:
  - root `package.json`,
  - `excalidraw-app/package.json`,
  - `packages/excalidraw/*`.

---

## Related documentation

**Memory bank**

- [Upkeep checklist and file map](README.md)

**Technical** (`docs/technical/`)

- [Architecture](../technical/architecture.md)
- [Developer setup](../technical/dev-setup.md)

**Product** (`docs/product/`)

- [PRD](../product/PRD.md)
- [Domain glossary](../product/domain-glossary.md)
