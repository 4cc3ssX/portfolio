import { ReactNode } from "react";

export const HEADING_REGEX = /^ {0,3}(#+)[ \t]+(.+?)[ \t]*(?:\r?\n|\r|$)/;

export const getTextContent = (children: ReactNode): string => {
  if (typeof children === "string") return children;
  if (typeof children === "number") return String(children);
  if (Array.isArray(children)) {
    return children.map(getTextContent).join("");
  }
  if (children && typeof children === "object" && "props" in children) {
    return getTextContent(
      (children as { props: { children: ReactNode } }).props.children
    );
  }
  return "";
};

export const buildHeadingId = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
};

export const extractHeadings = (content: string) => {
  const regex = new RegExp(HEADING_REGEX, "gm");
  const matches = Array.from(content.matchAll(regex));

  return matches
    .filter((match) => {
      const level = match[1].length;
      return level === 2 || level === 3;
    })
    .map((match) => {
      const level = match[1].length;
      const title = match[2].trim();
      const id = buildHeadingId(title);
      return { id, title, level };
    });
};
