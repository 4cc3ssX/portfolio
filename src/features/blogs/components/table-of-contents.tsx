import Link from "next/link";

interface Heading {
  id: string;
  title: string;
  level: number;
}

/**
 * Renders the h2/h3 outline of a post. `extractHeadings` and the matching
 * `buildHeadingId` used by the MDX heading overrides already existed in
 * src/utils/markdown.ts but had no caller — this wires them up.
 *
 * Server component, so the outline is real anchor markup in the HTML.
 */
export function TableOfContents({ headings }: { headings: Heading[] }) {
  if (headings.length < 3) return null;

  return (
    <nav
      aria-label="Table of contents"
      className="mb-10 border-l border-white/[0.06] pl-4"
    >
      <h2 className="text-xs uppercase tracking-widest text-muted-foreground/60">
        On this page
      </h2>
      <ul className="mt-3 space-y-1.5">
        {headings.map((heading) => (
          <li key={heading.id} className={heading.level === 3 ? "pl-4" : undefined}>
            <Link
              href={`#${heading.id}`}
              className="text-sm text-muted-foreground/70 transition-colors hover:text-foreground"
            >
              {heading.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
