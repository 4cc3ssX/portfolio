export interface EditorAction {
  id: string;
  label: string;
  title: string;
  /** Wraps the selection, e.g. `**` for bold. */
  wrap?: string;
  /** Prefixes each selected line, e.g. `## `. */
  linePrefix?: string;
  /** Inserted as-is at the cursor. */
  block?: string;
  /** Text used when the action fires with an empty selection. */
  placeholder?: string;
}

export const EDITOR_ACTIONS: EditorAction[] = [
  { id: "h2", label: "H2", title: "Heading 2", linePrefix: "## ", placeholder: "Heading" },
  { id: "h3", label: "H3", title: "Heading 3", linePrefix: "### ", placeholder: "Heading" },
  { id: "bold", label: "B", title: "Bold (Cmd+B)", wrap: "**", placeholder: "bold text" },
  { id: "italic", label: "I", title: "Italic (Cmd+I)", wrap: "_", placeholder: "italic text" },
  { id: "code", label: "`", title: "Inline code", wrap: "`", placeholder: "code" },
  { id: "quote", label: "❝", title: "Blockquote", linePrefix: "> ", placeholder: "Quote" },
  { id: "ul", label: "•", title: "Bullet list", linePrefix: "- ", placeholder: "List item" },
  { id: "ol", label: "1.", title: "Numbered list", linePrefix: "1. ", placeholder: "List item" },
  {
    id: "codeblock",
    label: "{ }",
    title: "Code block",
    block: "\n```ts\n\n```\n",
  },
  {
    id: "table",
    label: "▦",
    title: "Table",
    block: "\n| Column | Column |\n| ------ | ------ |\n| Value  | Value  |\n",
  },
  { id: "hr", label: "—", title: "Divider", block: "\n---\n" },
];

interface ApplyResult {
  value: string;
  selectionStart: number;
  selectionEnd: number;
}

/**
 * Pure text transform so the toolbar logic is testable without a DOM.
 * See src/payload/components/MarkdownEditor/toolbar.test.ts.
 */
export const applyAction = (
  action: EditorAction,
  value: string,
  start: number,
  end: number
): ApplyResult => {
  const selected = value.slice(start, end);

  if (action.block) {
    const inserted = action.block;
    return {
      value: value.slice(0, start) + inserted + value.slice(end),
      selectionStart: start + inserted.length,
      selectionEnd: start + inserted.length,
    };
  }

  if (action.linePrefix) {
    // Expand the selection to whole lines so prefixes land at line starts.
    const lineStart = value.lastIndexOf("\n", start - 1) + 1;
    const lineEndIndex = value.indexOf("\n", end);
    const lineEnd = lineEndIndex === -1 ? value.length : lineEndIndex;
    const block = value.slice(lineStart, lineEnd) || (action.placeholder ?? "");

    const prefixed = block
      .split("\n")
      .map((line) =>
        line.startsWith(action.linePrefix as string)
          ? line.slice((action.linePrefix as string).length)
          : (action.linePrefix as string) + line
      )
      .join("\n");

    return {
      value: value.slice(0, lineStart) + prefixed + value.slice(lineEnd),
      selectionStart: lineStart,
      selectionEnd: lineStart + prefixed.length,
    };
  }

  const wrap = action.wrap ?? "";
  const alreadyWrapped =
    value.slice(start - wrap.length, start) === wrap &&
    value.slice(end, end + wrap.length) === wrap;

  if (alreadyWrapped) {
    return {
      value:
        value.slice(0, start - wrap.length) + selected + value.slice(end + wrap.length),
      selectionStart: start - wrap.length,
      selectionEnd: end - wrap.length,
    };
  }

  const body = selected || action.placeholder || "";
  return {
    value: value.slice(0, start) + wrap + body + wrap + value.slice(end),
    selectionStart: start + wrap.length,
    selectionEnd: start + wrap.length + body.length,
  };
};

/**
 * Builds the raw <img> tag the MDX pipeline understands.
 *
 * `recma-mdx-html-override` routes raw `img` tags through the MDX component
 * map, where the `img` override reads `data-source` for the caption and
 * `data-priority` for eager loading. Markdown `![]()` syntax cannot carry
 * those attributes, which is why images are inserted as HTML.
 */
export const buildImageTag = ({
  src,
  alt,
  sourceUrl,
  priority,
}: {
  src: string;
  alt: string;
  sourceUrl?: string;
  priority?: boolean;
}): string => {
  const escape = (raw: string) => raw.replace(/"/g, "&quot;");
  const attrs = [`src="${escape(src)}"`, `alt="${escape(alt || src)}"`];
  if (sourceUrl) attrs.push(`data-source="${escape(sourceUrl)}"`);
  attrs.push(`data-priority="${priority ? "true" : "false"}"`);
  return `\n<img ${attrs.join(" ")} />\n`;
};
