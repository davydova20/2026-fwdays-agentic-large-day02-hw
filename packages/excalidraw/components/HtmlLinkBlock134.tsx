import { normalizeLink } from "@excalidraw/common";

/** Fixed demo URL — passed through {@link normalizeLink} for `href`. */
const DEMO_HREF = "https://test?test=134";

/**
 * Demo block: paragraph + external link using JSX only (no `dangerouslySetInnerHTML`).
 * `href` uses `normalizeLink` per project URL rules (`security-xss`).
 */
export const HtmlLinkBlock134 = () => {
  const href = normalizeLink(DEMO_HREF);

  return (
    <div className="HtmlLinkBlock134">
      <p>Example HTML block with a link.</p>
      <a href={href} rel="noopener noreferrer" target="_blank">
        Open test link (test=134)
      </a>
    </div>
  );
};
