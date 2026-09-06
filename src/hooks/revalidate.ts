import { revalidatePath } from "next/cache";
import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from "payload";

/**
 * Without these, an edit in /admin waits out the route's ISR window (up to 30
 * minutes on a post detail page) before readers see it.
 *
 * `req.context.disableRevalidate` lets the seed script bulk-write without
 * hammering the revalidation path once per document.
 */
type AnyDoc = { slug?: string | null };

const shouldSkip = (context: Record<string, unknown>) =>
  Boolean(context?.disableRevalidate);

export const revalidatePost: CollectionAfterChangeHook & CollectionAfterDeleteHook = ({
  doc,
  req,
}) => {
  if (shouldSkip(req.context)) return doc;
  const slug = (doc as AnyDoc)?.slug;
  revalidatePath("/blog");
  revalidatePath("/sitemap.xml");
  if (slug) revalidatePath(`/blog/${slug}`);
  return doc;
};

export const revalidateProject: CollectionAfterChangeHook & CollectionAfterDeleteHook = ({
  doc,
  req,
}) => {
  if (shouldSkip(req.context)) return doc;
  revalidatePath("/projects");
  revalidatePath("/");
  return doc;
};

export const revalidateHome: CollectionAfterChangeHook & CollectionAfterDeleteHook = ({
  doc,
  req,
}) => {
  if (shouldSkip(req.context)) return doc;
  revalidatePath("/");
  return doc;
};
