/**
 * Categorises the 25 legacy tags. `term` doubles as the icon key in
 * src/components/svgs/icons.ts; four terms (android, ios, web, bullmq) have no
 * icon and render as a plain chip, which is why `term` stays free text.
 */
import type { Project, Technology } from "@/payload-types";

type TechCategory = NonNullable<Technology["category"]>;
type LinkType = NonNullable<NonNullable<Project["links"]>[number]["type"]>;

export const TECH_CATEGORY: Record<string, TechCategory> = {
  typescript: "language",
  cplusplus: "language",
  kotlin: "language",
  swift: "language",
  expressjs: "framework",
  nestjs: "framework",
  nextjs: "framework",
  react: "framework",
  socketio: "framework",
  mongodb: "database",
  postgresql: "database",
  prisma: "database",
  drizzle: "database",
  supabase: "platform",
  firebase: "platform",
  aws: "platform",
  docker: "infrastructure",
  kubernetes: "infrastructure",
  terraform: "infrastructure",
  kafka: "infrastructure",
  bullmq: "infrastructure",
  n8n: "tool",
  android: "platform",
  ios: "platform",
  web: "platform",
};

/** Maps a project link to the label/type shown on its card. */
export const linkKind = (uri: string): { label: string; type: LinkType } => {
  if (/github\.com/.test(uri)) return { label: "Repository", type: "repository" };
  if (/play\.google\.com/.test(uri)) return { label: "Play Store", type: "play-store" };
  if (/apps\.apple\.com/.test(uri)) return { label: "App Store", type: "app-store" };
  if (/npmjs\.com/.test(uri)) return { label: "Package", type: "package" };
  return { label: "Website", type: "website" };
};

/** " - Part 3" -> { title: "...", part: 3 } */
export const splitSeriesPart = (title: string): { title: string; part: number | null } => {
  const match = title.match(/^(.*?)\s*[-–—]\s*Part\s+(\d+)\s*$/i);
  if (!match) return { title: title.trim(), part: null };
  return { title: match[1].trim(), part: Number(match[2]) };
};

/**
 * Drops the hand-maintained "Catch the Full ... Series" link list from the end
 * of a body — the series relationship now renders that navigation.
 */
export const stripSeriesFooter = (markdown: string): string =>
  markdown
    .replace(/\n#{1,4}\s*(Catch the Full[^\n]*|Full .*Series[^\n]*)\n[\s\S]*$/i, "\n")
    .trimEnd() + "\n";
