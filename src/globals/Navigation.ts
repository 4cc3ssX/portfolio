import type { GlobalConfig } from "payload";
import { anyone, authenticated } from "@/access";

const linkFields = [
  { name: "label", type: "text" as const, required: true },
  {
    name: "href",
    type: "text" as const,
    required: true,
    admin: { description: 'Route or hash anchor, e.g. "/projects" or "/#about".' },
  },
];

/**
 * Drives both the navbar and the sitemap. Sourcing the sitemap from here is
 * what stops it advertising routes that do not exist (the old hardcoded list
 * included /skills, which 404s).
 */
export const Navigation: GlobalConfig = {
  slug: "navigation",
  admin: { group: "Settings" },
  access: { read: anyone, update: authenticated },
  fields: [
    {
      name: "header",
      type: "array",
      fields: [
        ...linkFields,
        {
          name: "includeInSitemap",
          type: "checkbox",
          defaultValue: true,
          admin: { description: "Hash anchors on the home page should stay unchecked." },
        },
        {
          name: "priority",
          type: "number",
          defaultValue: 0.8,
          admin: { step: 0.1, condition: (_, sibling) => Boolean(sibling?.includeInSitemap) },
        },
      ],
    },
    { name: "footer", type: "array", fields: linkFields },
  ],
};
