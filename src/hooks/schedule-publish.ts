import type { CollectionAfterChangeHook } from "payload";

/**
 * A draft with a future `publishedAt` queues a job that flips it to published
 * at that moment. Previously "publishing on Tuesday" meant remembering to
 * flip a boolean in SQL on Tuesday.
 */
export const queueScheduledPublish: CollectionAfterChangeHook = async ({ doc, req }) => {
  if (req.context?.disableRevalidate) return doc;
  if (doc?._status !== "draft" || !doc?.publishedAt) return doc;

  const publishAt = new Date(doc.publishedAt);
  if (Number.isNaN(publishAt.getTime()) || publishAt <= new Date()) return doc;

  await req.payload.jobs.queue({
    task: "publishPost",
    input: { id: String(doc.id) },
    waitUntil: publishAt,
  });

  return doc;
};
