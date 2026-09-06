import type { CollectionAfterChangeHook } from "payload";

/**
 * A draft with a future `publishedAt` queues a job that flips it to published
 * at that moment. Previously "publishing on Tuesday" meant remembering to
 * flip a boolean in SQL on Tuesday.
 *
 * Only queues when the schedule actually changes. Autosave fires afterChange
 * roughly every 800ms while a draft is open, so queueing unconditionally would
 * pile up hundreds of duplicate jobs all waking at the same instant.
 */
export const queueScheduledPublish: CollectionAfterChangeHook = async ({
  doc,
  previousDoc,
  req,
}) => {
  if (req.context?.disableRevalidate) return doc;
  if (doc?._status !== "draft" || !doc?.publishedAt) return doc;

  const unchanged =
    previousDoc?.publishedAt === doc.publishedAt && previousDoc?._status === doc._status;
  if (unchanged) return doc;

  const publishAt = new Date(doc.publishedAt);
  if (Number.isNaN(publishAt.getTime()) || publishAt <= new Date()) return doc;

  await req.payload.jobs.queue({
    task: "publishPost",
    input: { id: String(doc.id) },
    waitUntil: publishAt,
  });

  return doc;
};
