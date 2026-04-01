# AGENTS.md

## Project Overview

Excalidraw is an open-source virtual whiteboard for sketching diagrams and handwriting, shipped as a library and a full web app. The primary audience is developers embedding the editor and contributors working in this monorepo.

## Project Structure

Excalidraw is a **monorepo** with a clear separation between the core library and the application:

- **`packages/excalidraw/`** - Main React component library published to npm as `@excalidraw/excalidraw`
- **`excalidraw-app/`** - Full-featured web application (excalidraw.com) that uses the library
- **`packages/`** - Core packages: `@excalidraw/common`, `@excalidraw/element`, `@excalidraw/math`, `@excalidraw/utils`
- **`examples/`** - Integration examples (NextJS, browser script)

## Tech Stack

- **Runtime / UI:** React, TypeScript (strict)
- **App bundling:** Vite (see `excalidraw-app/`)
- **Library builds:** esbuild (see `scripts/buildPackage.js` and package `build:esm` scripts)
- **Monorepo:** Yarn workspaces (`package.json` `workspaces`)
- **Tests / lint:** Vitest, ESLint, Prettier (see root `package.json` scripts)

## Conventions

- **Layout:** Work in `packages/*` for shared editor code; in `excalidraw-app/` for app-only features; respect existing file naming (kebab-case utilities, PascalCase components) as in `.cursor/rules/conventions.mdc`.
- **Quality gates:** Before committing substantive changes, run `yarn test:typecheck` and `yarn test:code` from the repo root. Use `yarn test` (Vitest) for relevant packages. Run `yarn test:update` only when intentionally updating snapshots.
- **Types:** Avoid `any` and `@ts-ignore` unless unavoidable; align with strict TypeScript settings.

## Do-Not-Touch / Constraints

- **Monorepo root:** Do not restructure workspaces or root tooling without team agreement (`package.json`, `yarn.lock`, shared configs).
- **`packages/*`:** Treat published package APIs as stable; avoid breaking exports without a version strategy.
- **Protected files (no edits without explicit approval):** See `.cursor/rules/do-not-touch.mdc` — includes `packages/excalidraw/scene/Renderer.ts`, `packages/excalidraw/data/restore.ts`, `packages/excalidraw/actions/manager.tsx`, `packages/excalidraw/types.ts`.
- **`docs/memory/`:** Durable agent/human context; update deliberately when behavior or decisions change (see `docs/memory/README.md`).

## Development Commands

```bash
yarn test:typecheck  # TypeScript type checking (tsc)
yarn test:code       # ESLint
yarn test            # Vitest (default test runner)
yarn test:update     # Vitest with snapshot updates (use only when updating snapshots)
yarn fix             # Auto-fix formatting and linting issues
```

## Architecture Notes

### Package System

- Uses Yarn workspaces for monorepo management
- Internal packages use path aliases (see `vitest.config.mts`)
- Build system uses esbuild for packages, Vite for the app
- TypeScript throughout with strict configuration

## Memory Bank

- Durable context for humans and agents lives in **`docs/memory/`**.
- **After each meaningful project change**, update the memory bank so it stays accurate (see [`docs/memory/README.md`](docs/memory/README.md) for which files to edit and a short checklist).
