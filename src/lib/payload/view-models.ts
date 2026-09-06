import "server-only";

import type {
  Company,
  Experience,
  Media,
  Post,
  Project,
  SiteSetting,
  Technology,
  User,
} from "@/payload-types";
import type {
  CompanyView,
  ExperienceView,
  ImageView,
  PostAuthorView,
  PostView,
  ProjectView,
  SeriesLinkView,
  SkillView,
  UserView,
} from "@/types/content";
import { isAnimated, mediaUrl } from "./media";

type Rel<T> = T | string | null | undefined;

/** Payload returns either a populated doc or a bare id depending on `depth`. */
const doc = <T extends { id: string }>(value: Rel<T>): T | null =>
  value && typeof value === "object" ? value : null;

export const toImageView = (value: Rel<Media>): ImageView | null => {
  const media = doc(value);
  const uri = mediaUrl(media);
  if (!media || !uri) return null;

  return {
    id: media.id,
    name: media.alt ?? "",
    uri,
    thumbnailUri: mediaUrl(media, "thumbnail"),
    blurHash: media.blurDataURL ?? null,
    unoptimized: isAnimated(media),
    width: media.width ?? undefined,
    height: media.height ?? undefined,
  };
};

export const toUserView = (settings: SiteSetting): UserView => {
  const { profile, hero, about, contact } = settings;

  return {
    id: "site-settings",
    name: profile.name,
    nickname: profile.nickname,
    title: profile.title,
    email: profile.email,
    location: profile.location ?? null,
    // `slogan` is the SEO one-liner; `message` is the hero body copy.
    slogan: settings.seo.defaultDescription,
    message: hero.body,
    resumeUrl: profile.resumeUrl ?? null,
    avatar: toImageView(profile.avatar),
    links: (settings.socialLinks ?? []).map((link, index) => ({
      id: link.id ?? `social-${index}`,
      name: link.label ?? link.platform ?? "",
      type: "social" as const,
      uri: link.url ?? "",
    })),
    hero: {
      eyebrow: hero.eyebrow ?? null,
      headingLine1: hero.headingLine1,
      headingLine2: hero.headingLine2 ?? null,
      primaryCtaLabel: hero.primaryCtaLabel ?? null,
      primaryCtaHref: hero.primaryCtaHref ?? null,
      secondaryCtaLabel: hero.secondaryCtaLabel ?? null,
    },
    stats: (settings.stats ?? []).map((stat) => ({
      value: stat.value,
      label: stat.label,
    })),
    about: {
      heading: about.heading,
      body: about.body,
      quickFacts: (about.quickFacts ?? []).map((fact) => ({
        label: fact.label,
        value: fact.value,
      })),
    },
    contact: {
      heading: contact.heading,
      body: contact.body,
      ctaLabel: contact.ctaLabel ?? null,
    },
    footerText: settings.footerText ?? null,
  };
};

const toCompanyView = (value: Rel<Company>): CompanyView => {
  const company = doc(value);
  return {
    id: company?.id ?? "",
    name: company?.name ?? "",
    image: toImageView(company?.logo),
    uri: company?.website ?? null,
  };
};

export const toExperienceView = (experience: Experience): ExperienceView => ({
  id: experience.id,
  position: experience.position,
  description: (experience.highlights ?? []).map((h) => h.text ?? "").filter(Boolean),
  startedAt: experience.startedAt,
  endedAt: experience.isCurrent ? null : (experience.endedAt ?? null),
  isActive: Boolean(experience.isCurrent),
  company: toCompanyView(experience.company),
});

export const toProjectView = (project: Project): ProjectView => {
  const technologies = (project.technologies ?? [])
    .map((tech) => doc(tech as Rel<Technology>)?.name)
    .filter((name): name is string => Boolean(name));

  return {
    id: project.id,
    name: project.name,
    description: project.description,
    link: project.links?.[0]?.url ?? "",
    tags: technologies,
    isActive: Boolean(project.isActive),
    startedAt: project.startedAt,
    endedAt: project.endedAt ?? null,
    // Denormalised by the refreshGithubStars job — no per-render API calls.
    github:
      typeof project.githubStars === "number" || typeof project.githubForks === "number"
        ? {
            stargazers_count: project.githubStars ?? 0,
            forks_count: project.githubForks ?? 0,
          }
        : null,
  };
};

export const toSkillView = (technology: Technology): SkillView => ({
  id: technology.id,
  min: technology.proficiency ?? 0,
  max: 5,
  tag: { id: technology.id, name: technology.name, term: technology.term },
});

const toAuthorView = (value: Rel<User>, settings: SiteSetting): PostAuthorView | null => {
  const user = doc(value);
  if (!user) return null;
  return {
    id: user.id,
    name: user.name,
    title: user.title ?? null,
    email: settings.profile.email,
    avatar: toImageView(user.avatar) ?? toImageView(settings.profile.avatar),
  };
};

export const toPostView = (post: Post, settings: SiteSetting): PostView => {
  const series = doc(post.series as Rel<{ id: string; name: string; slug: string }>);
  return {
    id: post.id,
    title: post.title,
    slug: post.slug,
    description: post.excerpt,
    content: post.content,
    readingTime: post.readingTime ?? 1,
    publishedAt: post.publishedAt ?? post.createdAt,
    updatedAt: post.updatedAt,
    cover: toImageView(post.coverImage),
    author: toAuthorView(post.author, settings),
    series: series ? { id: series.id, name: series.name, slug: series.slug } : null,
    partNumber: post.partNumber ?? null,
  };
};

export const toSeriesLinkView = (post: Post): SeriesLinkView => ({
  id: post.id,
  title: post.title,
  slug: post.slug,
  partNumber: post.partNumber ?? null,
});
