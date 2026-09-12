import type { GlobalConfig } from "payload";
import { anyone, authenticated } from "@/access";

/**
 * Everything the site says about itself. Replaces the public columns that used
 * to sit on the single `users` row plus a pile of copy hardcoded across
 * components and opengraph-image.tsx.
 */
export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  label: "Site Settings",
  admin: { group: "Settings" },
  access: { read: anyone, update: authenticated },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Profile",
          fields: [
            {
              name: "profile",
              type: "group",
              fields: [
                { name: "name", type: "text", required: true },
                { name: "nickname", type: "text", required: true },
                { name: "title", type: "text", required: true },
                { name: "email", type: "email", required: true },
                { name: "location", type: "text" },
                { name: "avatar", type: "upload", relationTo: "media" },
                { name: "resumeUrl", type: "text" },
                { name: "calendarUrl", type: "text" },
              ],
            },
          ],
        },
        {
          label: "Home",
          fields: [
            {
              name: "hero",
              type: "group",
              fields: [
                { name: "eyebrow", type: "text" },
                { name: "headingLine1", type: "text", required: true },
                { name: "headingLine2", type: "text" },
                { name: "body", type: "textarea", required: true },
                { name: "primaryCtaLabel", type: "text" },
                { name: "primaryCtaHref", type: "text" },
                { name: "secondaryCtaLabel", type: "text" },
                { name: "secondaryCtaHref", type: "text" },
              ],
            },
            {
              name: "stats",
              type: "array",
              maxRows: 4,
              admin: { description: "The 5+ / 15+ / 20+ triplet under the hero." },
              fields: [
                { name: "value", type: "text", required: true },
                { name: "label", type: "text", required: true },
              ],
            },
            {
              name: "about",
              type: "group",
              fields: [
                { name: "heading", type: "text", required: true },
                { name: "body", type: "textarea", required: true },
                {
                  name: "quickFacts",
                  type: "array",
                  fields: [
                    { name: "label", type: "text", required: true },
                    { name: "value", type: "text", required: true },
                  ],
                },
              ],
            },
            {
              name: "contact",
              type: "group",
              fields: [
                { name: "heading", type: "text", required: true },
                { name: "body", type: "textarea", required: true },
                { name: "ctaLabel", type: "text" },
              ],
            },
          ],
        },
        {
          label: "Social",
          fields: [
            {
              name: "socialLinks",
              type: "array",
              admin: { description: "Rendered in the About section and the footer." },
              fields: [
                {
                  name: "platform",
                  type: "select",
                  required: true,
                  options: [
                    { label: "GitHub", value: "github" },
                    { label: "LinkedIn", value: "linkedin" },
                    { label: "X", value: "x" },
                    { label: "Bluesky", value: "bluesky" },
                  ],
                },
                { name: "label", type: "text", required: true },
                { name: "url", type: "text", required: true },
              ],
            },
            { name: "footerText", type: "text" },
          ],
        },
        {
          label: "SEO",
          fields: [
            {
              name: "seo",
              type: "group",
              fields: [
                { name: "defaultTitle", type: "text", required: true },
                { name: "defaultDescription", type: "textarea", required: true },
                {
                  name: "keywords",
                  type: "array",
                  fields: [{ name: "value", type: "text", required: true }],
                },
                { name: "ogImage", type: "upload", relationTo: "media" },
              ],
            },
          ],
        },
      ],
    },
  ],
};
