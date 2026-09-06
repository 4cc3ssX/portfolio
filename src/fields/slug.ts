import type { Field, FieldHook } from "payload";

export const slugify = (value: string): string =>
  value
    .toLowerCase()
    .replace(/['‘’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const formatSlug =
  (sourceField: string): FieldHook =>
  ({ data, operation, originalDoc, value }) => {
    // An explicitly typed slug always wins; we only derive one when it's blank.
    if (typeof value === "string" && value.length > 0) return slugify(value);

    if (operation === "create" || !originalDoc?.slug) {
      const source = data?.[sourceField] ?? originalDoc?.[sourceField];
      if (typeof source === "string" && source.length > 0) return slugify(source);
    }

    return value;
  };

/**
 * URL slug, derived from `sourceField` when left blank.
 * Unique + indexed — the frontend looks documents up by slug on every request.
 */
export const slugField = (sourceField = "title"): Field => ({
  name: "slug",
  type: "text",
  index: true,
  unique: true,
  required: true,
  admin: {
    position: "sidebar",
    description: `Leave blank to generate from ${sourceField}.`,
  },
  hooks: {
    beforeValidate: [formatSlug(sourceField)],
  },
});
