import type { CollectionConfig } from "payload";
import { anyone, authenticated, canDelete } from "@/access";

/**
 * Files live in Vercel Blob — the storage plugin sets `disableLocalStorage`.
 *
 * Animated GIFs: sharp reads only frame one when resizing, so any derivative
 * generated for a GIF is a static still. Payload has no per-mime-type way to
 * skip `imageSizes`, so instead the frontend never references a size for
 * `image/gif` — it uses the untouched original and renders it `unoptimized`.
 * See `mediaUrl()` in src/lib/payload/media.ts.
 */
export const Media: CollectionConfig = {
  slug: "media",
  trash: true,
  admin: { useAsTitle: "alt", group: "Content" },
  access: {
    read: anyone,
    create: authenticated,
    update: authenticated,
    delete: canDelete,
  },
  upload: {
    mimeTypes: ["image/*"],
    focalPoint: true,
    adminThumbnail: "thumbnail",
    imageSizes: [
      { name: "thumbnail", width: 400, withoutEnlargement: true },
      { name: "card", width: 768, withoutEnlargement: true },
      { name: "og", width: 1200, height: 630, position: "centre" },
    ],
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
      admin: { description: "Describes the image for screen readers and as the figure caption." },
    },
    {
      name: "caption",
      type: "text",
    },
    {
      name: "sourceUrl",
      type: "text",
      admin: {
        description: "Original source page to credit (e.g. the Giphy permalink).",
      },
    },
    {
      name: "blurDataURL",
      type: "text",
      admin: {
        readOnly: true,
        description: "Base64 placeholder used while the full image loads.",
      },
    },
    {
      name: "legacyUri",
      type: "text",
      admin: {
        readOnly: true,
        position: "sidebar",
        description:
          "Set only when the seed could not download the original file. Re-upload to clear.",
      },
    },
  ],
};
