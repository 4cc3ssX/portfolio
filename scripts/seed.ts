/**
 * Phase 4 — imports data/legacy/*.json into Payload via the Local API.
 *
 * Idempotent: legacy UUIDs are carried forward as Payload document ids
 * (idType: 'uuid' + allowIDOnCreate), so re-running updates in place rather
 * than duplicating. Run: bun run seed
 */
import type { CollectionSlug, DataFromCollectionSlug } from "payload";
import { getPayload } from "payload";
import config from "../src/payload.config";
import { loadLegacy } from "./seed/legacy";
import { TECH_CATEGORY, linkKind, splitSeriesPart, stripSeriesFooter } from "./seed/taxonomy";

/** Fresh per call: the cloud-storage plugin caches file state on the context
 * object, so sharing one object across creates silently skips uploads. */
const ctx = () => ({ disableRevalidate: true });
const SERIES_ID = "00000000-0000-4000-8000-000000000001";

type Payload = Awaited<ReturnType<typeof getPayload>>;

/** Create-or-update by known id. */
async function upsert<T extends CollectionSlug>(
  payload: Payload,
  collection: T,
  id: string,
  data: Partial<DataFromCollectionSlug<T>>
) {
  try {
    await payload.findByID({ collection, id, depth: 0, overrideAccess: true });
    return await payload.update({
      collection,
      id,
      data,
      overrideAccess: true,
      context: ctx(),
    } as Parameters<typeof payload.update>[0]);
  } catch {
    return await payload.create({
      collection,
      data: { id, ...data },
      overrideAccess: true,
      context: ctx(),
    } as Parameters<typeof payload.create>[0]);
  }
}

/** 1x1 transparent PNG — stands in for media we could not download. */
const PLACEHOLDER_PNG = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==",
  "base64"
);

const safeName = (name: string) => name.replace(/[^\w.-]+/g, "-").toLowerCase();

/**
 * Downloads each legacy image into Payload. Several `uri`s point at Google
 * Drive, which serves an HTML confirmation interstitial rather than bytes, so
 * content-type — not response.ok — decides whether we got a real image.
 *
 * A failed download still creates the document (upload collections require a
 * file, hence the placeholder) with `legacyUri` set, so the page keeps
 * rendering from the original external URL until someone re-uploads.
 */
async function seedMedia(payload: Payload, legacy: Awaited<ReturnType<typeof loadLegacy>>) {
  const fallbacks: string[] = [];
  let kept = 0;

  for (const image of legacy.images) {
    let buffer = PLACEHOLDER_PNG;
    let mimetype = "image/png";
    let filename = `${safeName(image.name)}.png`;
    let ok = false;

    try {
      const response = await fetch(image.uri, { redirect: "follow" });
      const contentType = (response.headers.get("content-type") ?? "").split(";")[0];

      if (response.ok && contentType.startsWith("image/")) {
        buffer = Buffer.from(await response.arrayBuffer());
        mimetype = contentType;
        filename = `${safeName(image.name)}.${contentType.split("/")[1] ?? "png"}`;
        ok = true;
      }
    } catch (error) {
      console.warn(`  ! fetch failed for ${image.name}: ${(error as Error).message}`);
    }


    const existing = await payload
      .findByID({ collection: "media", id: image.id, depth: 0, overrideAccess: true })
      .catch(() => null);

    if (existing) {
      // A document that already holds a real file is left alone: re-uploading
      // identical bytes makes Payload mint a deduplicated filename
      // (foo.png -> foo-1.png), which changes the public URL on every run.
      // Only a placeholder (legacyUri set, i.e. an earlier download failed)
      // is worth retrying.
      if (!existing.legacyUri) {
        kept += 1;
        continue;
      }
      if (!ok) {
        console.warn(`  ! ${image.name} still undownloadable; keeping the external URL`);
        fallbacks.push(image.name);
        continue;
      }
      await payload.update({
        collection: "media",
        id: image.id,
        data: { alt: image.name, blurDataURL: image.blur_hash || null, legacyUri: null },
        file: { data: buffer, mimetype, name: filename, size: buffer.length },
        overrideAccess: true,
        context: ctx(),
      });
      console.info(`  + recovered ${image.name} (previous run had failed)`);
    } else {
      await payload.create({
        collection: "media",
        data: {
          id: image.id,
          alt: image.name,
          blurDataURL: image.blur_hash || null,
          legacyUri: ok ? null : image.uri,
        },
        file: { data: buffer, mimetype, name: filename, size: buffer.length },
        overrideAccess: true,
        context: ctx(),
      });
    }
  }

  console.info(
    `  media: ${legacy.images.length} (${kept} unchanged, ${fallbacks.length} external URLs)`
  );
  if (fallbacks.length) {
    console.warn(`  ! re-upload by hand in /admin: ${fallbacks.join(", ")}`);
  }
}

async function main() {
  const payload = await getPayload({ config });
  const legacy = await loadLegacy();
  const linkById = new Map(legacy.links.map((l) => [l.id, l]));

  console.info("Seeding Payload from data/legacy/…\n");

  await seedMedia(payload, legacy);

  // --- users -------------------------------------------------------------
  const legacyUser = legacy.users[0];
  const adminEmail = process.env.SEED_ADMIN_EMAIL || legacyUser.email;
  const adminPassword = process.env.SEED_ADMIN_PASSWORD;
  if (!adminPassword) throw new Error("SEED_ADMIN_PASSWORD must be set");

  const existingUser = await payload
    .findByID({ collection: "users", id: legacyUser.id, depth: 0, overrideAccess: true })
    .catch(() => null);

  const userData = {
    name: legacyUser.name,
    title: legacyUser.title,
    avatar: legacyUser.avatar_id,
    roles: ["admin"] as ("admin" | "editor")[],
  };

  if (existingUser) {
    await payload.update({ collection: "users", id: legacyUser.id, data: userData, overrideAccess: true, context: ctx() });
  } else {
    await payload.create({
      collection: "users",
      data: { id: legacyUser.id, email: adminEmail, password: adminPassword, ...userData },
      overrideAccess: true,
      context: ctx(),
    });
  }
  console.info(`  users: 1 (${adminEmail})`);

  // --- technologies (legacy tags ⋈ skills) --------------------------------
  const skillByTag = new Map(legacy.skills.map((s) => [s.tag_id, s]));
  for (const tag of legacy.tags) {
    const skill = skillByTag.get(tag.id);
    await upsert(payload, "technologies", tag.id, {
      name: tag.name,
      slug: tag.term,
      term: tag.term,
      category: TECH_CATEGORY[tag.term] ?? "tool",
      proficiency: skill?.min ?? null,
      featured: Boolean(skill),
    });
  }
  console.info(`  technologies: ${legacy.tags.length} (${legacy.skills.length} featured)`);

  // --- companies ----------------------------------------------------------
  for (const company of legacy.companies) {
    await upsert(payload, "companies", company.id, {
      name: company.name,
      logo: company.image_id,
      website: company.link_id ? (linkById.get(company.link_id)?.uri ?? null) : null,
    });
  }
  console.info(`  companies: ${legacy.companies.length}`);

  // --- experiences --------------------------------------------------------
  for (const exp of legacy.experiences) {
    await upsert(payload, "experiences", exp.id, {
      position: exp.position,
      company: exp.company_id,
      highlights: exp.description.map((text) => ({ text })),
      startedAt: exp.started_at,
      // Legacy `ended_at` defaults to now(), so a current role is
      // indistinguishable from one that ended today. `is_active` is the truth.
      endedAt: exp.is_active ? null : exp.ended_at,
      isCurrent: exp.is_active,
      employmentType: "full-time",
    });
  }
  console.info(`  experiences: ${legacy.experiences.length}`);

  // --- projects -----------------------------------------------------------
  const tagsByProject = new Map<string, string[]>();
  for (const pt of legacy.projectTags) {
    tagsByProject.set(pt.project_id, [...(tagsByProject.get(pt.project_id) ?? []), pt.tag_id]);
  }

  for (const project of legacy.projects) {
    const link = project.link_id ? linkById.get(project.link_id) : undefined;
    const githubMatch = link?.uri.match(/github\.com\/([\w.-]+)\/([\w.-]+)/);

    await upsert(payload, "projects", project.id, {
      name: project.name,
      description: project.description,
      technologies: tagsByProject.get(project.id) ?? [],
      links: link ? [{ ...linkKind(link.uri), url: link.uri }] : [],
      githubRepo: githubMatch ? `${githubMatch[1]}/${githubMatch[2]}` : null,
      startedAt: project.started_at,
      endedAt: project.is_active ? null : project.ended_at,
      isActive: project.is_active,
      featured: project.is_active,
    });
  }
  console.info(`  projects: ${legacy.projects.length}`);

  // --- series + posts -----------------------------------------------------
  await upsert(payload, "series", SERIES_ID, {
    name: "REST API Guide",
    slug: "rest-api-guide",
    description: "A four-part guide to building REST APIs that aren't a dumpster fire.",
  });

  for (const blog of legacy.blogs) {
    const { title, part } = splitSeriesPart(blog.title);
    await upsert(payload, "posts", blog.id, {
      title,
      slug: blog.slug,
      excerpt: blog.description,
      content: stripSeriesFooter(blog.content),
      coverImage: blog.cover_id,
      author: blog.author_id ?? legacyUser.id,
      publishedAt: blog.published_at ?? blog.created_at,
      series: part ? SERIES_ID : null,
      partNumber: part,
      _status: blog.published ? "published" : "draft",
    });
  }
  console.info(`  posts: ${legacy.blogs.length}`);

  // --- globals ------------------------------------------------------------
  const socials = legacy.links.filter((l) => l.type === "social");
  const resume = legacy.links.find((l) => l.name === "Resume");
  const cal = legacy.links.find((l) => l.name === "Cal");

  await payload.updateGlobal({
    slug: "site-settings",
    overrideAccess: true,
    context: ctx(),
    data: {
      profile: {
        name: legacyUser.name,
        nickname: legacyUser.nickname,
        title: legacyUser.title ?? "Software Engineer",
        email: legacyUser.email,
        location: "Bangkok, Thailand",
        avatar: legacyUser.avatar_id,
        resumeUrl: resume?.uri ?? null,
        calendarUrl: cal?.uri ?? null,
      },
      hero: {
        eyebrow: `${legacyUser.nickname} · ${legacyUser.title ?? "Software Engineer"}`,
        headingLine1: "Building software",
        headingLine2: "that scales",
        body: legacyUser.message,
        primaryCtaLabel: "View Work",
        primaryCtaHref: "/projects",
        secondaryCtaLabel: "Resume",
        secondaryCtaHref: resume?.uri ?? "#",
      },
      stats: [
        { value: "5+", label: "Years" },
        { value: "15+", label: "Projects" },
        { value: "20+", label: "Open Source" },
      ],
      about: {
        heading: "Building the future, one line at a time",
        body:
          "With over 5 years of experience in software development, I specialize in building scalable, event-driven systems using modern technologies. My expertise spans across the full stack, from crafting pixel-perfect UIs to architecting robust backend services.\n\nI'm particularly passionate about clean architecture, developer experience, and creating systems that not only work but are a joy to maintain and scale. When I'm not coding, you'll find me contributing to open source or exploring new technologies.",
        quickFacts: [
          { label: "Based in", value: "Bangkok, Thailand" },
          { label: "Experience", value: "5+ Years" },
          { label: "Focus", value: "Full Stack" },
          { label: "Fuel", value: "Coffee & Curiosity" },
        ],
      },
      contact: {
        heading: "Let's work together",
        body:
          "Have a project in mind or just want to chat? I'm always open to discussing new opportunities and ideas.",
        ctaLabel: "Send Email",
      },
      socialLinks: socials.map((link) => ({
        platform: link.name.toLowerCase() as "github" | "linkedin" | "x" | "bluesky",
        label: link.name,
        url: link.uri,
      })),
      footerText: `Designed & Built by ${legacyUser.nickname}`,
      seo: {
        defaultTitle: `${legacyUser.nickname} - ${legacyUser.title ?? "Software Engineer"}`,
        defaultDescription: legacyUser.slogan,
        keywords: [
          "Software Engineer", "Full Stack Engineer", "Backend Engineer",
          "NestJS", "Next.js", "React Native", "TypeScript", "PostgreSQL",
          "Event-Driven Architecture", "Scalable Systems", "Ryam",
        ].map((value) => ({ value })),
        ogImage: legacyUser.avatar_id,
      },
    },
  });

  await payload.updateGlobal({
    slug: "navigation",
    overrideAccess: true,
    context: ctx(),
    data: {
      header: [
        { label: "about", href: "/#about", includeInSitemap: false },
        { label: "experience", href: "/#experience", includeInSitemap: false },
        { label: "projects", href: "/projects", includeInSitemap: true, priority: 0.9 },
        { label: "blog", href: "/blog", includeInSitemap: true, priority: 0.9 },
      ],
      footer: [
        { label: "Projects", href: "/projects" },
        { label: "Blog", href: "/blog" },
      ],
    },
  });
  console.info("  globals: site-settings, navigation");

  console.info("\nSeed complete.");
  process.exit(0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
