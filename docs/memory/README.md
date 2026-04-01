# Memory bank

This folder (`docs/memory/`) holds **durable, project-specific context** for people and AI agents: scope, architecture notes, active work, decisions, and progress. It should stay aligned with the real codebase.

## Files (what each is for)

| File | Purpose |
|------|---------|
| [projectbrief.md](projectbrief.md) | What the repo is, scope, main deliverables |
| [productContext.md](productContext.md) | Product-facing context and constraints |
| [techContext.md](techContext.md) | Stack, tooling, scripts, technical baseline |
| [systemPatterns.md](systemPatterns.md) | Recurring architecture and implementation patterns |
| [activeContext.md](activeContext.md) | Current focus, immediate priorities, recent working-tree notes |
| [progress.md](progress.md) | What is done, in progress, pending, known gaps |
| [decisionLog.md](decisionLog.md) | Non-obvious choices, trade-offs, undocumented behaviour worth recording |

## Keep the memory bank updated

**After each meaningful project change** (code, config, tooling, docs that affect how we build or run the product), update the relevant files above so the bank does not go stale.

### Minimum workflow

1. **`activeContext.md`** — Refresh *Current focus*, *Suggested next steps*, and *What appears to be active in working tree* (use `git status`).
2. **`progress.md`** — Move finished work under *Done*, adjust *In progress* / *Pending*, add *Risks / gaps* if something new appeared.
3. **`decisionLog.md`** — Append when you make a non-trivial technical or product decision (or document important undocumented behaviour).
4. **`techContext.md`** — When dependencies, scripts, CI, or env setup change.
5. **`systemPatterns.md`** — When you introduce or change a cross-cutting pattern (state, rendering, package boundaries).
6. **`projectbrief.md` / `productContext.md`** — When scope or product goals change.

### For AI agents (Cursor / automation)

- Treat this folder as **authoritative narrative context** alongside code and `docs/technical/`.
- At the **end of a task** that alters behaviour, structure, or conventions: patch the smallest set of memory files that would prevent the next session from rediscovering the same facts.
- Prefer short, verifiable bullets over long prose; link to `docs/technical/` or source paths when details live elsewhere.

### Related docs

- [Architecture](../technical/architecture.md)
- [Developer setup](../technical/dev-setup.md)
- [PRD](../product/PRD.md)
- [Domain glossary](../product/domain-glossary.md)
