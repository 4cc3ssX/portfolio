import type { Field } from "payload";

/**
 * Per-document SEO overrides. Blank fields fall back to the document's own
 * title/excerpt and the siteSettings defaults at render time.
 */
export const seoField = (): Field => ({
  name: "seo",
  type: "group",
  admin: { position: "sidebar" },
  fields: [
    {
      name: "title",
      type: "text",
      admin: { description: "Overrides the document title in <title> and OG tags." },
    },
    {
      name: "description",
      type: "textarea",
      maxLength: 200,
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      admin: { description: "Defaults to the cover image." },
    },
  ],
});
