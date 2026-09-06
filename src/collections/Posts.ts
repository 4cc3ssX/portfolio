import type { CollectionConfig } from "payload";
import { authenticated, publishedOrAuthenticated, trashOrAdminDestroy } from "@/access";
import { slugField } from "@/fields/slug";
import { seoField } from "@/fields/seo";
import { revalidatePost } from "@/hooks/revalidate";
import { computeReadingTime } from "@/hooks/reading-time";
import { queueScheduledPublish } from "@/hooks/schedule-publish";

/**
 * Blog posts. `content` is **markdown**, not Lexical — the existing MDX render
 * pipeline (remark-gfm + rehype-pretty-code + the `img` override that makes
 * GIFs work) consumes the raw string unchanged. See MarkdownEditor.
 */
export const Posts: CollectionConfig = {
  slug: "posts",
  trash: true,
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "series", "publishedAt", "_status"],
    group: "Content",
    livePreview: {
      url: ({ data }) =>
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/preview?secret=${process.env.PAYLOAD_PREVIEW_SECRET}&slug=${data?.slug ?? ""}&collection=posts`,
    },
    preview: (doc) =>
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/preview?secret=${process.env.PAYLOAD_PREVIEW_SECRET}&slug=${doc?.slug}&collection=posts`,
  },
  versions: {
    drafts: {
      autosave: { interval: 800 },
      schedulePublish: true,
    },
    maxPerDoc: 25,
  },
  access: {
    read: publishedOrAuthenticated,
    create: authenticated,
    update: authenticated,
    delete: trashOrAdminDestroy,
  },
  hooks: {
    beforeChange: [computeReadingTime],
    afterChange: [revalidatePost, queueScheduledPublish],
    afterDelete: [revalidatePost],
  },
  fields: [
    { name: "title", type: "text", required: true },
    slugField("title"),
    {
      name: "excerpt",
      type: "textarea",
      required: true,
      maxLength: 300,
      admin: { description: "Shown on the blog index and used as the meta description fallback." },
    },
    {
      name: "content",
      type: "textarea",
      required: true,
      admin: {
        components: { Field: "@/payload/components/MarkdownEditor#MarkdownEditor" },
      },
    },
    { name: "coverImage", type: "upload", relationTo: "media" },
    {
      name: "author",
      type: "relationship",
      relationTo: "users",
      required: true,
      admin: { position: "sidebar" },
    },
    {
      name: "publishedAt",
      type: "date",
      admin: {
        position: "sidebar",
        date: { pickerAppearance: "dayAndTime" },
        description: "A future date schedules the post to publish itself.",
      },
    },
    {
      name: "categories",
      type: "relationship",
      relationTo: "categories",
      hasMany: true,
      admin: { position: "sidebar" },
    },
    {
      name: "series",
      type: "relationship",
      relationTo: "series",
      admin: { position: "sidebar" },
    },
    {
      name: "partNumber",
      type: "number",
      min: 1,
      admin: {
        position: "sidebar",
        condition: (data) => Boolean(data?.series),
        description: "Position within the series.",
      },
    },
    {
      name: "readingTime",
      type: "number",
      admin: {
        position: "sidebar",
        readOnly: true,
        description: "Recalculated from the content on every save.",
      },
    },
    seoField(),
  ],
};
