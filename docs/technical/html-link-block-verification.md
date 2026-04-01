# HtmlLinkBlock — description and verification

This document describes two demo components that inject **self-generated HTML** via `dangerouslySetInnerHTML` and attach a link whose URL is normalized with `normalizeLink()`. Use the **test keys** below to run and record checks independently.

## Shared background

Both components:

- Build a fixed HTML string in code (paragraph + anchor); they do **not** inject user-controlled strings into `__html`.
- Pass the link URL through `normalizeLink()` from `@excalidraw/common` before interpolating into `href`, per `.cursor/rules/security-xss.mdc` and `packages/common/src/url.ts` (`@braintree/sanitize-url`, `escapeDoubleQuotes`).

**When DOMPurify applies:** the security rule requires **DOMPurify** (or equivalent) for **untrusted / user-supplied** HTML. These demos do not use that path. If you extend the pattern to arbitrary HTML from users, sanitize the HTML **and** keep using `normalizeLink` for URLs.

---

## Test key 1 — `HtmlLinkBlock` (`test=123`)

### Description

| Item | Detail |
|------|--------|
| **Source** | `packages/excalidraw/components/HtmlLinkBlock.tsx` |
| **Export** | `HtmlLinkBlock` from `@excalidraw/excalidraw` |
| **Demo URL** | `https://test?test=123` (constant `DEMO_HREF`, then `normalizeLink`) |
| **Purpose** | Baseline example: self-generated HTML + normalized external link. |

### Steps

1. **Code review:** Open `HtmlLinkBlock.tsx`. Confirm the only dynamic part in the HTML is `href` from `normalizeLink(DEMO_HREF)` and `__html` is not built from props/API.
2. **Grep:** Search for `dangerouslySetInnerHTML` and verify `__html` is not from external input.
3. **UI:** Render `<HtmlLinkBlock />` in the app. In DevTools, check the anchor `href` matches `normalizeLink('https://test?test=123')`. Click the link; expect a new tab with `rel="noopener noreferrer"` / `target="_blank"`.
4. **Repo checks:** From repo root (with toolchain installed): `yarn test:code`, `yarn test:typecheck` on touched paths; optionally add a unit test asserting the normalized `href` appears in output.

---

## Test key 2 — `HtmlLinkBlock134` (`test=134`)

### Description

| Item | Detail |
|------|--------|
| **Source** | `packages/excalidraw/components/HtmlLinkBlock134.tsx` |
| **Export** | `HtmlLinkBlock134` from `@excalidraw/excalidraw` |
| **Demo URL** | `https://test?test=134` (constant `DEMO_HREF`, then `normalizeLink`) |
| **Purpose** | Same pattern as Test key 1 with a different query parameter to validate that URL normalization and HTML injection behave consistently for another fixed URL. |

### Steps

1. **Code review:** Open `HtmlLinkBlock134.tsx`. Confirm structure matches Test key 1: literals + `normalizeLink(DEMO_HREF)` only; no user HTML.
2. **Grep:** Same as Test key 1 — no unsanitized external strings in `__html`.
3. **UI:** Render `<HtmlLinkBlock134 />`. Confirm copy mentions “test=134” and DevTools shows `href` equal to `normalizeLink('https://test?test=134')`. Click behaves like Test key 1 (new tab, noopener/noreferrer).
4. **Repo checks:** Same commands as Test key 1; include both component files in the scope of lint/typecheck.

---

## Security checklist (both test keys)

- [ ] No `eval`, `new Function`, or `document.write`.
- [ ] No raw user string in `__html`.
- [ ] Link URL uses `normalizeLink` (or `toValidURL` where embeds require it).

## Related project rules

- `.cursor/rules/security-xss.mdc` — innerHTML / URL handling.
- `.cursor/rules/conventions.mdc` — component and export conventions.

## Conclusion

Test keys **1** and **2** exercise the **same security and implementation pattern** (self-generated markup, `dangerouslySetInnerHTML`, `normalizeLink` for `href`) with two different fixed URLs (`test=123` and `test=134`). Passing both means the approach scales to multiple demo links without bypassing URL sanitization. Any future variant that accepts **user-provided HTML or URLs** must add HTML sanitization (e.g. DOMPurify) and re-verify under `.cursor/rules/security-xss.mdc`; fixed-URL demos alone are not sufficient for that threat model.
