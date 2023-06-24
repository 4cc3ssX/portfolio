import { useMemo } from "react";
import sanitizeHtml, { IOptions } from "sanitize-html";

export const textTags = [
  "p",
  "span",
  "strong",
  "em",
  "blockquote",
  "code",
  "pre",
  "q",
  "abbr",
  "cite",
  "mark",
  "small",
  "sub",
  "sup",
  "del",
  "ins",
  "time",
  "var",
  "br",
];

export const sanitizeOptions: IOptions = {
  allowedTags: textTags,
  allowedAttributes: {
    "*": ["style"], // Allow the 'style' attribute for all tags
  },
  disallowedTagsMode: "discard",
};

export const sanitizeHTML = (html: string) =>
  sanitizeHtml(html, sanitizeOptions);
