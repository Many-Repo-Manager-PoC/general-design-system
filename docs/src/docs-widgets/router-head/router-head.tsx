import { component$ } from "@qwik.dev/core";
import { useDocumentHead, useLocation } from "@qwik.dev/router";

/**
 * Transform a URL path into a readable title
 * e.g., "theme/colors" -> "Theme Colors"
 */
const pathToTitle = (path: string): string => {
  return path
    .split("/")
    .filter((segment) => segment !== "")
    .map((segment) =>
      segment
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(" ")
    )
    .join(" ");
};

/**
 * The RouterHead component is placed inside of the document `<head>` element.
 */
export const RouterHead = component$(() => {
  const head = useDocumentHead();
  const loc = useLocation();

  const getTitle = () => {
    if (head.title !== "") {
      return head.title;
    }

    const transformedPath = pathToTitle(loc.url.pathname);
    return transformedPath || "Home";
  };

  return (
    <>
      <title>{`General DS | ${getTitle()}`}</title>

      <link rel="canonical" href={loc.url.href} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />

      {head.meta.map((m) => (
        <meta key={m.key} {...m} />
      ))}

      {head.links.map((l) => (
        <link key={l.key} {...l} />
      ))}

      {head.styles.map((s) => (
        <style
          key={s.key}
          {...s.props}
          {...(s.props?.dangerouslySetInnerHTML
            ? {}
            : { dangerouslySetInnerHTML: s.style })}
        />
      ))}

      {head.scripts.map((s) => (
        <script
          key={s.key}
          {...s.props}
          {...(s.props?.dangerouslySetInnerHTML
            ? {}
            : { dangerouslySetInnerHTML: s.script })}
        />
      ))}
    </>
  );
});
