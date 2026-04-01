import { useMemo } from "react";

import { normalizeLink } from "@excalidraw/common";

/** Fixed demo URL — passed through {@link normalizeLink} before use in HTML. */
const DEMO_HREF = "https://test?test=123";

/**
 * Renders a small HTML snippet via `dangerouslySetInnerHTML`.
 * Markup is built in code only (not from user input); the link uses `normalizeLink`
 * per project URL rules (`security-xss`).
 */
export const HtmlLinkBlock = () => {
  const html = useMemo(() => {
    const href = normalizeLink(DEMO_HREF);
    return [
      "<p>Example HTML block with a link.</p>",
      `<a href="${href}" rel="noopener noreferrer" target="_blank">Open test link</a>`,
    ].join("");
  }, []);

  return (
    <div className="HtmlLinkBlock" dangerouslySetInnerHTML={{ __html: html }} />
  );
};
