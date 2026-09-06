import type { CollectionConfig } from "payload";
import { adminFieldAccess, anyone, authenticated } from "@/access";

/**
 * Admin login *and* the post-author identity. Public site copy (slogan, hero,
 * socials) deliberately lives in the siteSettings global instead — this holds
 * only what an author byline needs.
 */
export const Users: CollectionConfig = {
  slug: "users",
  auth: true,
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "email", "title"],
    group: "Settings",
  },
  access: {
    read: anyone,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
    admin: authenticated,
  },
  fields: [
    { name: "name", type: "text", required: true },
    {
      name: "title",
      type: "text",
      admin: { description: 'Job title shown on the author card, e.g. "Software Engineer".' },
    },
    { name: "avatar", type: "upload", relationTo: "media" },
    { name: "bio", type: "textarea" },
    {
      name: "roles",
      type: "select",
      hasMany: true,
      defaultValue: ["admin"],
      access: { update: adminFieldAccess },
      options: [
        { label: "Admin", value: "admin" },
        { label: "Editor", value: "editor" },
      ],
    },
  ],
};
