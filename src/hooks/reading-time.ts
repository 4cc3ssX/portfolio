import type { CollectionBeforeChangeHook } from "payload";

const WORDS_PER_MINUTE = 200;
/** Code is skimmed, not read, but it is not free either. */
const CODE_WEIGHT = 0.4;

const countWords = (text: string) => text.split(/\s+/).filter(Boolean).length;

/**
 * Estimates minutes to read a markdown body. Fenced code counts at a reduced
 * weight rather than being discarded — on this blog most posts are half code,
 * and ignoring it under-reports every article.
 */
export const estimateReadingTime = (markdown: string): number => {
  const codeBlocks = markdown.match(/```[\s\S]*?```/g) ?? [];
  const codeWords = codeBlocks.reduce((total, block) => total + countWords(block), 0);

  const prose = markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[#>*_`|-]/g, " ");

  const weighted = countWords(prose) + codeWords * CODE_WEIGHT;
  return Math.max(1, Math.round(weighted / WORDS_PER_MINUTE));
};

export const computeReadingTime: CollectionBeforeChangeHook = ({ data }) => {
  if (typeof data?.content === "string") {
    data.readingTime = estimateReadingTime(data.content);
  }
  return data;
};
