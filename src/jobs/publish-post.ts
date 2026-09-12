import type { TaskConfig } from "payload";

/**
 * Flips a scheduled draft to published. Queued by the posts afterChange hook
 * with `waitUntil` set to the post's publishedAt.
 */
export const publishPostTask: TaskConfig<"publishPost"> = {
  slug: "publishPost",
  inputSchema: [{ name: "id", type: "text", required: true }],
  outputSchema: [{ name: "published", type: "checkbox" }],
  handler: async ({ input, req }) => {
    const post = await req.payload.findByID({
      collection: "posts",
      id: input.id,
      draft: true,
      overrideAccess: true,
    });

    // The post may have been published or trashed by hand since queueing.
    if (!post || post._status === "published" || post.deletedAt) {
      return { output: { published: false } };
    }

    await req.payload.update({
      collection: "posts",
      id: input.id,
      data: { _status: "published" },
      overrideAccess: true,
    });

    return { output: { published: true } };
  },
};
