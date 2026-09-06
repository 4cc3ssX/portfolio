import type { CollectionBeforeChangeHook } from "payload";

const WORDS_PER_MINUTE = 200;

/** Strips code fences, HTML tags and markdown syntax before counting words. */
export const estimateReadingTime = (markdown: string): number => {
  const prose = markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[#>*_`|-]/g, " ");

  const words = prose.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
};

export const computeReadingTime: CollectionBeforeChangeHook = ({ data }) => {
  if (typeof data?.content === "string") {
    data.readingTime = estimateReadingTime(data.content);
  }
  return data;
};
