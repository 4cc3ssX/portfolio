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
        className="text-4xl font-bold mb-6 mt-8 text-foreground scroll-mt-40 snap-center"
      >
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2
        id={buildHeadingId(getTextContent(children))}
        className="text-3xl font-semibold mb-4 mt-6 text-foreground scroll-mt-40 snap-center"
      >
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3
        id={buildHeadingId(getTextContent(children))}
        className="text-2xl font-semibold mb-3 mt-5 text-foreground scroll-mt-40 snap-center"
      >
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4
        id={buildHeadingId(getTextContent(children))}
        className="text-xl font-semibold mb-2 mt-4 text-foreground scroll-mt-40 snap-center"
      >
        {children}
      </h4>
    ),
    p: ({ children }) => (
      <p className="text-base mb-4 leading-7 text-foreground/90">{children}</p>
    ),
    a: ({ href, children }) => (
      <Link
        href={href as string}
        className="text-primary hover:underline font-medium"
      >
        {children}
      </Link>
    ),
    ul: ({ children, ...props }) => (
      <ul
        className="text-foreground space-y-1 list-inside list-disc pl-0 marker:text-foreground/60"
        {...props}
      >
        {children}
      </ul>
    ),
    ol: ({ children, ...props }) => (
      <ol
        className="text-foreground space-y-1 list-inside list-decimal pl-0"
        {...props}
      >
        {children}
      </ol>
    ),
    li: ({ children, ...props }) => (
      <li className="text-foreground pl-2 [&>ul>li]:pl-3 relative" {...props}>
        {children}
      </li>
    ),
    strong: ({ children, ...props }) => (
      <strong className="text-foreground font-semibold" {...props}>
        {children}
      </strong>
    ),
    em: ({ children, ...props }) => (
      <em className="text-neutral-200 italic" {...props}>
        {children}
      </em>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-primary pl-4 italic my-4 text-foreground/80">
        {children}
      </blockquote>
    ),
    img: (props) => {
      const sourceLink =
        props["data-source"] || (isUrl(props.alt) ? props.alt : props.src);
      const alt = props.alt || props.src || "Image";
      const priority = props["data-priority"] === "true";

      return (
        <div className="flex flex-col items-center justify-center gap-2.5">
          <Image
            {...(props as ImageProps)}
            alt={alt}
            priority={priority}
            className="rounded-lg w-full h-60 max-h-80 sm:h-70 sm:max-w-lg sm:max-h-80 my-0! object-cover"
            width={800}
            height={400}
          />
          {sourceLink && (
            <a
              aria-label={alt}
              href={sourceLink}
              className="text-sm text-muted-foreground text-center"
            >
              {alt}
            </a>
          )}
        </div>
      );
    },
    hr: () => (
      <div className="flex items-center justify-center gap-6 my-4 sm:my-6">
        <div className="size-1 bg-foreground/50 rounded-full" />
        <div className="size-1 bg-foreground/50 rounded-full" />
        <div className="size-1 bg-foreground/50 rounded-full" />
      </div>
    ),
    table: ({ children }) => (
      <div className="overflow-x-auto bg-background rounded-lg border border-border my-10">
        <table className="w-full text-base text-left rtl:text-right my-0!">
          {children}
        </table>
      </div>
    ),
    th: ({ children }) => (
      <th className="px-4 py-2 text-left font-semibold bg-primary-foreground text-foreground border-b border-border">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="px-4 py-2 border-t border-border text-foreground/90">
        {children}
      </td>
    ),
    ...components,
  };
}
