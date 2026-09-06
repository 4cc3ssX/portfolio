import type { CollectionConfig } from "payload";
import { anyone, authenticated } from "@/access";
import { slugField } from "@/fields/slug";

/**
 * Merges the legacy `tags` and `skills` tables. `skills` only ever held
 * (tag, min, max) and `max` was 5 for all 21 rows, so it collapses to a single
 * `proficiency` plus a `featured` flag for the home-page marquee.
 */
export const Technologies: CollectionConfig = {
  slug: "technologies",
  labels: { singular: "Technology", plural: "Technologies" },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "term", "category", "proficiency", "featured"],
    group: "Portfolio",
  },
  access: { read: anyone, create: authenticated, update: authenticated, delete: authenticated },
  defaultSort: "name",
  fields: [
    { name: "name", type: "text", required: true },
    slugField("name"),
    {
      name: "term",
      type: "text",
      required: true,
      admin: {
        description:
          "Icon key from src/components/svgs/icons.ts. Leave a non-matching value to render without an icon.",
      },
    },
    {
      name: "category",
      type: "select",
      options: [
        { label: "Language", value: "language" },
        { label: "Framework", value: "framework" },
        { label: "Database", value: "database" },
        { label: "Infrastructure", value: "infrastructure" },
        { label: "Platform", value: "platform" },
        { label: "Tool", value: "tool" },
      ],
    },
    {
      name: "proficiency",
      type: "number",
      min: 1,
      max: 5,
      admin: { description: "1–5. Only meaningful for featured technologies." },
    },
    {
      name: "featured",
      type: "checkbox",
      defaultValue: false,
      admin: { description: "Show in the home-page tech stack marquee." },
    },
    { name: "order", type: "number", admin: { position: "sidebar" } },
  ],
};
