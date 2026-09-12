import type { CollectionConfig } from "payload";
import { anyone, authenticated } from "@/access";

export const Companies: CollectionConfig = {
  slug: "companies",
  admin: { useAsTitle: "name", defaultColumns: ["name", "website"], group: "Portfolio" },
  access: { read: anyone, create: authenticated, update: authenticated, delete: authenticated },
  fields: [
    { name: "name", type: "text", required: true },
    { name: "logo", type: "upload", relationTo: "media" },
    { name: "website", type: "text" },
    { name: "location", type: "text" },
  ],
};
