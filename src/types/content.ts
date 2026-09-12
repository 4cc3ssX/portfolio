/**
 * View models the presentation components consume.
 *
 * These used to be inferred from the Drizzle schemas. They are now hand-written
 * and CMS-agnostic: `src/lib/payload/view-models.ts` maps Payload documents
 * onto them, so components stay presentation-only and a schema change in the
 * CMS cannot ripple through the whole component tree.
 *
 * Dates are ISO strings (Payload) where they used to be Date objects (Drizzle);
 * both `dayjs()` and `new Date()` accept either.
 */

export interface ImageView {
  id: string;
  name: string;
  uri: string;
  thumbnailUri: string | null;
  blurHash: string | null;
  /** GIFs must bypass the Next image optimizer or they render as one frame. */
  unoptimized: boolean;
  width?: number;
  height?: number;
}

export type LinkKind = "social" | "project" | "external";

export interface LinkView {
  id: string;
  name: string;
  type: LinkKind;
  uri: string;
}

export interface StatView {
  value: string;
  label: string;
}

export interface FactView {
  label: string;
  value: string;
}

/**
 * The site owner plus all the editable page copy that used to be hardcoded
 * across the hero, about, contact and footer components.
 */
export interface UserView {
  id: string;
  name: string;
  nickname: string;
  title: string | null;
  email: string;
  location: string | null;
  slogan: string;
  message: string;
  resumeUrl: string | null;
  avatar: ImageView | null;
  links: LinkView[];
  hero: {
    eyebrow: string | null;
    headingLine1: string;
    headingLine2: string | null;
    primaryCtaLabel: string | null;
    primaryCtaHref: string | null;
    secondaryCtaLabel: string | null;
  };
  stats: StatView[];
  about: {
    heading: string;
    body: string;
    quickFacts: FactView[];
  };
  contact: {
    heading: string;
    body: string;
    ctaLabel: string | null;
  };
  footerText: string | null;
}

export interface CompanyView {
  id: string;
  name: string;
  image: ImageView | null;
  uri: string | null;
}

export interface ExperienceView {
  id: string;
  position: string;
  description: string[];
  startedAt: string;
  endedAt: string | null;
  isActive: boolean;
  company: CompanyView;
}

export interface ProjectView {
  id: string;
  name: string;
  description: string;
  link: string;
  tags: string[];
  isActive: boolean;
  startedAt: string;
  endedAt: string | null;
  github: { stargazers_count: number; forks_count: number } | null;
}

export interface SkillView {
  id: string;
  min: number;
  max: number;
  tag: { id: string; name: string; term: string };
}

export interface PostAuthorView {
  id: string;
  name: string;
  title: string | null;
  email: string;
  avatar: ImageView | null;
}

export interface PostView {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  readingTime: number;
  publishedAt: string;
  updatedAt: string;
  cover: ImageView | null;
  author: PostAuthorView | null;
  series: { id: string; name: string; slug: string } | null;
  partNumber: number | null;
}

/** A sibling post in the same series, for the series navigation block. */
export interface SeriesLinkView {
  id: string;
  title: string;
  slug: string;
  partNumber: number | null;
}
