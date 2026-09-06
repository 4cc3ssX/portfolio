import type { CollectionConfig } from "payload";
import { anyone, authenticated, trashOrAdminDestroy } from "@/access";
import { revalidateHome } from "@/hooks/revalidate";

export const Experiences: CollectionConfig = {
  slug: "experiences",
  trash: true,
  admin: {
    useAsTitle: "position",
    defaultColumns: ["position", "company", "startedAt", "isCurrent"],
    group: "Portfolio",
  },
  access: {
    read: anyone,
    create: authenticated,
    update: authenticated,
    delete: trashOrAdminDestroy,
  },
  defaultSort: "-startedAt",
  hooks: { afterChange: [revalidateHome], afterDelete: [revalidateHome] },
  fields: [
    { name: "position", type: "text", required: true },
    { name: "company", type: "relationship", relationTo: "companies", required: true },
    {
      name: "highlights",
      type: "array",
      minRows: 1,
      labels: { singular: "Highlight", plural: "Highlights" },
      admin: { description: "One bullet per row. Was a Postgres text[] column." },
      fields: [{ name: "text", type: "textarea", required: true }],
    },
    { name: "startedAt", type: "date", required: true, admin: { date: { pickerAppearance: "monthOnly" } } },
    {
      name: "endedAt",
      type: "date",
      admin: {
        date: { pickerAppearance: "monthOnly" },
        condition: (data) => !data?.isCurrent,
        description: "Leave blank for a current role.",
      },
    },
    { name: "isCurrent", type: "checkbox", defaultValue: false },
    {
      name: "employmentType",
      type: "select",
      defaultValue: "full-time",
      options: [
        { label: "Full-time", value: "full-time" },
        { label: "Part-time", value: "part-time" },
        { label: "Contract", value: "contract" },
        { label: "Freelance", value: "freelance" },
      ],
    },
  ],
};
