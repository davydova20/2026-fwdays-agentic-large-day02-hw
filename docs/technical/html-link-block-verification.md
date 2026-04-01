# HtmlLinkBlock — description and verification

This document describes two demo components that render a short paragraph and an external link using **JSX only** (`<p>`, `<a>`), with `href` from `normalizeLink()`. Use the **test keys** below to run and record checks independently.

## Shared background

Both components:

- Use **no** `dangerouslySetInnerHTML` or raw HTML string injection; markup is declarative React elements.
- Set `href` via `normalizeLink(DEMO_HREF)` from `@excalidraw/common`, per `.cursor/rules/security-xss.mdc` and `packages/common/src/url.ts` (`@braintree/sanitize-url`, `escapeDoubleQuotes`).
- Use `rel="noopener noreferrer"` and `target="_blank"` for the external link.

**When DOMPurify applies:** only if you later render **untrusted / user-supplied** HTML strings. These demos do not; they use fixed literals in JSX. If you add arbitrary HTML from users, sanitize (e.g. DOMPurify) **and** keep using `normalizeLink` for URLs.

---

## Test key 1 — `HtmlLinkBlock` (`test=123`)

### Description

| Item | Detail |
|------|--------|
| **Source** | `packages/excalidraw/components/HtmlLinkBlock.tsx` |
| **Export** | `HtmlLinkBlock` from `@excalidraw/excalidraw` |
| **Demo URL** | `https://test?test=123` (constant `DEMO_HREF`, then `normalizeLink`) |
| **Purpose** | Baseline example: JSX markup + normalized external link. |

### Steps

1. **Code review:** Open `HtmlLinkBlock.tsx`. Confirm `href` comes only from `normalizeLink(DEMO_HREF)` and there is no `dangerouslySetInnerHTML` / `innerHTML` / user-controlled props driving raw HTML.
2. **Grep:** Ensure no `dangerouslySetInnerHTML` in these demo files unless intentionally changed (should be none).
3. **UI:** Render `<HtmlLinkBlock />` in the app. In DevTools, check the anchor `href` matches `normalizeLink('https://test?test=123')`. Click the link; expect a new tab with `rel="noopener noreferrer"` / `target="_blank"`.
4. **Repo checks:** From repo root (with toolchain installed): `yarn test:code`, `yarn test:typecheck` on touched paths; optionally add a unit test asserting the normalized `href` on the `<a>`.

---

## Test key 2 — `HtmlLinkBlock134` (`test=134`)

### Description

| Item | Detail |
|------|--------|
| **Source** | `packages/excalidraw/components/HtmlLinkBlock134.tsx` |
| **Export** | `HtmlLinkBlock134` from `@excalidraw/excalidraw` |
| **Demo URL** | `https://test?test=134` (constant `DEMO_HREF`, then `normalizeLink`) |
| **Purpose** | Same pattern as Test key 1 with a different query parameter to validate consistent URL handling. |

### Steps

1. **Code review:** Open `HtmlLinkBlock134.tsx`. Confirm structure matches Test key 1: JSX + `normalizeLink(DEMO_HREF)` only; no user HTML.
2. **Grep:** Same as Test key 1 — no unsanitized external strings in markup.
3. **UI:** Render `<HtmlLinkBlock134 />`. Confirm copy mentions “test=134” and DevTools shows `href` equal to `normalizeLink('https://test?test=134')`. Click behaves like Test key 1 (new tab, noopener/noreferrer).
4. **Repo checks:** Same commands as Test key 1; include both component files in the scope of lint/typecheck.

---

## Security checklist (both test keys)

- [ ] No `eval`, `new Function`, or `document.write`.
- [ ] No raw user-controlled strings in `href` or as HTML blobs.
- [ ] Link URL uses `normalizeLink` (or `toValidURL` where embeds require it).

## Related project rules

- `.cursor/rules/security-xss.mdc` — innerHTML / URL handling.
- `.cursor/rules/conventions.mdc` — component and export conventions.

## Conclusion

Test keys **1** and **2** exercise the **same pattern** (JSX markup, `normalizeLink` for `href`, `rel` / `target` on external links) with two fixed URLs (`test=123` and `test=134`). Passing both means the approach scales to multiple demo links without bypassing URL sanitization. Any future variant that accepts **user-provided HTML or URLs** must add HTML sanitization (e.g. DOMPurify) and re-verify under `.cursor/rules/security-xss.mdc`; fixed-URL demos alone are not sufficient for that threat model.
