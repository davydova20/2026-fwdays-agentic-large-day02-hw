import { normalizeLink } from "@excalidraw/common";

/** Fixed demo URL — passed through {@link normalizeLink} for `href`. */
const DEMO_HREF = "https://test?test=123";

/**
 * Demo block: paragraph + external link using JSX only (no `dangerouslySetInnerHTML`).
 * `href` uses `normalizeLink` per project URL rules (`security-xss`).
 */
export const HtmlLinkBlock = () => {
  const href = normalizeLink(DEMO_HREF);

  return (
    <div className="HtmlLinkBlock">
      <p>Example HTML block with a link.</p>
      <a href={href} rel="noopener noreferrer" target="_blank">
        Open test link
      </a>
    </div>
  );
};
