import type { CollectionConfig } from "payload";
import { anyone, authenticated } from "@/access";
import { slugField } from "@/fields/slug";

/**
 * Multi-part post series. Replaces the old convention of baking " - Part N"
 * into the title and hand-maintaining a link list at the bottom of each body.
 */
export const Series: CollectionConfig = {
  slug: "series",
  labels: { singular: "Series", plural: "Series" },
  admin: { useAsTitle: "name", group: "Content" },
  access: { read: anyone, create: authenticated, update: authenticated, delete: authenticated },
  fields: [
    { name: "name", type: "text", required: true },
    slugField("name"),
    { name: "description", type: "textarea" },
  ],
};
