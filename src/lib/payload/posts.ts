import "server-only";

import { cache } from "react";
import { draftMode } from "next/headers";
import type { Where } from "payload";
import type { Post } from "@/payload-types";
import { getPayloadClient } from "./client";

const isDraftMode = async () => {
  try {
    return (await draftMode()).isEnabled;
  } catch {
    // draftMode() throws outside a request scope (sitemap generation, jobs).
    return false;
  }
};

/**
 * Only posts that are published *and* whose publishedAt has passed.
 *
 * The date check is what actually makes scheduling work: the publishPost job
 * runs on a Vercel cron, and on the Hobby tier that is daily at best, so a
 * post must not become visible early just because someone hit Publish with a
 * future date. ISR (60s on /blog) surfaces it within a minute of the date.
 */
const publishedFilter = (): Where => ({
  and: [
    { _status: { equals: "published" } },
    { publishedAt: { less_than_equal: new Date().toISOString() } },
  ],
});

/** Published posts, newest first. Drafts are never included. */
export const getPosts = cache(async (): Promise<Post[]> => {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "posts",
    where: publishedFilter(),
    sort: "-publishedAt",
    depth: 2,
    limit: 200,
    trash: false,
  });
  return docs;
});

/**
 * Unlike the old getBlogBySlug, this filters on publish state unless draft
 * mode is active — previously any unpublished post was readable by URL.
 */
export const getPostBySlug = cache(async (slug: string): Promise<Post | null> => {
  const draft = await isDraftMode();
  const payload = await getPayloadClient();

  const { docs } = await payload.find({
    collection: "posts",
    where: draft
      ? { slug: { equals: slug } }
      : { and: [{ slug: { equals: slug } }, publishedFilter()] },
    draft,
    depth: 2,
    limit: 1,
    trash: false,
    overrideAccess: draft,
  });

  return docs[0] ?? null;
});

/** Sibling posts in the same series, ordered by part number. */
export const getSeriesPosts = cache(async (seriesId: string): Promise<Post[]> => {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "posts",
    where: { and: [{ series: { equals: seriesId } }, publishedFilter()] },
    sort: "partNumber",
    depth: 0,
    limit: 100,
    trash: false,
  });
  return docs;
});
