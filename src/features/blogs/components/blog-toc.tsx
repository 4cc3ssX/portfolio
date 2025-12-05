"use client";

import { useEffect, useState, useMemo } from "react";
import { motion, useMotionValue } from "framer-motion";
import Link from "next/link";
import { extractHeadings } from "@/utils/markdown";

interface BlogTocProps {
  content: string;
}

export function BlogToc({ content }: BlogTocProps) {
  const [activeId, setActiveId] = useState<string>("");
  const scaleY = useMotionValue(0);

  const headings = useMemo(() => extractHeadings(content), [content]);

  useEffect(() => {
    const updateProgress = () => {
      const article = document.getElementById("blog-content");
      if (!article) return;

      const rect = article.getBoundingClientRect();
      const articleHeight = article.scrollHeight;
      const windowHeight = window.innerHeight;
      const scrolled = -rect.top;
      const progress = Math.max(
        0,
        Math.min(1, scrolled / (articleHeight - windowHeight))
      );
      scaleY.set(progress);
    };

    window.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();

    return () => window.removeEventListener("scroll", updateProgress);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      rootMargin: "0% 0% -80% 0%",
    });

    const headingElements = headings
      .map((heading) => document.getElementById(heading.id))
      .filter((el): el is HTMLElement => el !== null);

    headingElements.forEach((el) => observer.observe(el));

    return () => {
      headingElements.forEach((el) => observer.unobserve(el));
    };
  }, [headings]);

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
