import { companies } from "../schemas/companies";
import { ImageSelect } from "@/features/shared/types/images";

export type CompanySelect = typeof companies.$inferSelect;
export type CompanyWithImageAndLink = Omit<
  CompanySelect,
  "linkId" | "imageId"
> & {
  image: ImageSelect;
  uri: string | null;
};
