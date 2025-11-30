import { experiences } from "../schemas/experiences";
import { CompanyWithImageAndLink } from "./companies";

export type ExperienceSelect = typeof experiences.$inferSelect;
export type ExperienceWithCompany = Omit<ExperienceSelect, "companyId"> & {
  company: CompanyWithImageAndLink;
};
