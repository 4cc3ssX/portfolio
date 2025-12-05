"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { extractHeadings } from "@/utils/markdown";
import { useScrollProgress } from "@/shared/hooks/use-scroll-progress";
import { useActiveHeading } from "../hooks/use-active-heading";

interface BlogTocProps {
  content: string;
}

export function BlogToc({ content }: BlogTocProps) {
  const headings = useMemo(() => extractHeadings(content), [content]);
  const scaleY = useScrollProgress({ elementId: "blog-content" });
  const activeId = useActiveHeading(headings);

  if (!headings.length) {
    return null;
  }

  return (
    <div className="relative">
      {/* Animated progress line */}
      <div
        className="absolute inset-y-0 left-4 h-full w-4 bg-muted"
        style={{
          maskImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 156'%3E%3Cpath d='M 0.5 0 V 16 V 44 V 72l 12 12 V 100 V 128l -12 12 V 156' fill='none' stroke='black'/%3E%3C/svg%3E\")",
        }}
      >
        <motion.div
          className="absolute inset-0 origin-top bg-foreground transition"
          style={{ scaleY }}
        />
      </div>

      {/* Table of Contents */}
      <ol
        aria-label="On this page"
        role="list"
        className="relative pl-11 text-sm font-medium text-muted-foreground"
      >
        {headings.map((heading) => (
          <li
            key={heading.id}
            className={`relative mt-3 first:mt-0 ${
              heading.level === 3 ? "ml-4" : ""
            }`}
          >
            <Link
              href={`#${heading.id}`}
              className={`block transition-colors hover:text-foreground ${
                activeId === heading.id ? "text-foreground" : ""
              }`}
            >
              {heading.title}
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
