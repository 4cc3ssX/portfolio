import type { MDXComponents } from "mdx/types";
import Image, { ImageProps } from "next/image";
import Link from "next/link";
import { isUrl } from "@/utils";
import { buildHeadingId, getTextContent } from "@/utils/markdown";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1
        id={buildHeadingId(getTextContent(children))}
        className="text-2xl font-medium tracking-tight mb-4 mt-10 text-foreground scroll-mt-24"
      >
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2
        id={buildHeadingId(getTextContent(children))}
        className="text-lg font-medium tracking-tight mb-3 mt-8 pt-6 text-foreground scroll-mt-24 border-t border-white/[0.06]"
      >
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3
        id={buildHeadingId(getTextContent(children))}
        className="text-base font-medium tracking-tight mb-2 mt-6 text-foreground scroll-mt-24"
      >
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4
        id={buildHeadingId(getTextContent(children))}
        className="text-sm font-medium tracking-tight mb-2 mt-4 text-foreground scroll-mt-24"
      >
        {children}
      </h4>
    ),
    p: ({ children }) => (
      <p className="text-sm mb-4 leading-relaxed text-muted-foreground/80">
        {children}
      </p>
    ),
    a: ({ href, children }) => (
      <Link
        href={href as string}
        className="text-foreground underline underline-offset-4 decoration-muted-foreground/30 hover:decoration-foreground/50 transition-colors"
      >
        {children}
      </Link>
    ),
    ul: ({ children, ...props }) => (
      <ul
        className="mb-4 space-y-1.5 list-none pl-0"
        {...props}
      >
        {children}
      </ul>
    ),
    ol: ({ children, ...props }) => (
      <ol
        className="mb-4 space-y-1.5 list-decimal pl-5 marker:text-muted-foreground/50 marker:text-xs"
        {...props}
      >
        {children}
      </ol>
    ),
    li: ({ children, ...props }) => (
      <li 
        className="text-sm text-muted-foreground/80 leading-relaxed pl-5 relative before:content-['–'] before:absolute before:left-0 before:text-muted-foreground/40" 
        {...props}
      >
        {children}
      </li>
    ),
    strong: ({ children, ...props }) => (
      <strong className="text-foreground font-medium" {...props}>
        {children}
      </strong>
    ),
    em: ({ children, ...props }) => (
      <em className="text-muted-foreground italic" {...props}>
        {children}
      </em>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-white/20 pl-4 my-6 text-sm text-muted-foreground/70">
        {children}
      </blockquote>
    ),
    img: (props) => {
      const sourceLink =
        props["data-source"] || (isUrl(props.alt) ? props.alt : props.src);
      const alt = props.alt || props.src || "Image";
      const priority = props["data-priority"] === "true";

      return (
        <figure className="my-5">
          <div className="overflow-hidden rounded border border-white/[0.06]">
            <Image
              {...(props as ImageProps)}
              alt={alt}
              priority={priority}
              className="w-full h-auto max-h-72 object-cover"
              width={680}
              height={380}
            />
          </div>
          {sourceLink && (
            <figcaption className="mt-2 text-center text-[11px] text-muted-foreground/40">
              {alt}
            </figcaption>
          )}
        </figure>
      );
    },
    hr: () => (
      <hr className="my-6 border-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    ),
    table: ({ children }) => (
      <div className="my-6 overflow-x-auto rounded border border-white/[0.06]">
        <table className="w-full text-sm">
          {children}
        </table>
      </div>
    ),
    thead: ({ children }) => (
      <thead className="border-b border-white/[0.06] bg-white/[0.02]">
        {children}
      </thead>
    ),
    th: ({ children }) => (
      <th className="px-3 py-2 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground/60">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="px-3 py-2 text-sm text-muted-foreground/80 border-t border-white/[0.06]">
        {children}
      </td>
    ),
    code: ({ children, ...props }) => {
      // Check if it's inline code (no className means inline, or no data-language)
      const isInline = !props.className && !props["data-language"];
      if (isInline) {
        return (
          <code className="px-1.5 py-0.5 rounded border border-white/[0.08] bg-white/[0.04] text-[13px] font-mono text-foreground/90">
            {children}
          </code>
        );
      }
      // For code blocks processed by rehype-pretty-code, pass through
      return <code {...props}>{children}</code>;
    },
    ...components,
  };
}
