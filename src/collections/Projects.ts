import type { CollectionConfig } from "payload";
import { anyone, authenticated, canDelete } from "@/access";
import { slugField } from "@/fields/slug";
import { seoField } from "@/fields/seo";
import { revalidateProject } from "@/hooks/revalidate";

/**
 * The legacy schema allowed exactly one link per project (`projects.link_id`),
 * which is why every card on /projects renders a single URL. `links` is now an
 * array, and GitHub star/fork counts are denormalised here by the
 * refreshGithubStars job instead of being fetched per-project on every render.
 */
export const Projects: CollectionConfig = {
  slug: "projects",
  trash: true,
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "startedAt", "isActive", "featured"],
    group: "Portfolio",
  },
  access: {
    read: anyone,
    create: authenticated,
    update: authenticated,
    delete: canDelete,
  },
  defaultSort: "-startedAt",
  hooks: { afterChange: [revalidateProject], afterDelete: [revalidateProject] },
  fields: [
    { name: "name", type: "text", required: true },
    slugField("name"),
    { name: "description", type: "textarea", required: true },
    { name: "coverImage", type: "upload", relationTo: "media" },
    {
      name: "technologies",
      type: "relationship",
      relationTo: "technologies",
      hasMany: true,
    },
    {
      name: "links",
      type: "array",
      labels: { singular: "Link", plural: "Links" },
      fields: [
        { name: "label", type: "text", required: true },
        { name: "url", type: "text", required: true },
        {
          name: "type",
          type: "select",
          defaultValue: "website",
          options: [
            { label: "Website", value: "website" },
            { label: "Repository", value: "repository" },
            { label: "App Store", value: "app-store" },
            { label: "Play Store", value: "play-store" },
            { label: "Package", value: "package" },
          ],
        },
      ],
    },
    {
      name: "githubRepo",
      type: "text",
      admin: {
        position: "sidebar",
        description: 'owner/repo — enables hourly star and fork sync.',
      },
    },
    {
      name: "githubStars",
      type: "number",
      admin: { position: "sidebar", readOnly: true },
    },
    {
      name: "githubForks",
      type: "number",
      admin: { position: "sidebar", readOnly: true },
    },
    { name: "startedAt", type: "date", required: true, admin: { date: { pickerAppearance: "monthOnly" } } },
    {
      name: "endedAt",
      type: "date",
      admin: { date: { pickerAppearance: "monthOnly" }, condition: (data) => !data?.isActive },
    },
    { name: "isActive", type: "checkbox", defaultValue: false, admin: { position: "sidebar" } },
    {
      name: "featured",
      type: "checkbox",
      defaultValue: false,
      admin: { position: "sidebar", description: "Show in the home-page Featured work section." },
    },
    { name: "order", type: "number", admin: { position: "sidebar" } },
    seoField(),
  ],
};
