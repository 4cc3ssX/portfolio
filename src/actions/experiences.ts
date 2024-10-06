import { db } from "@/shared/db";
import {
  companies,
  CompanyWithLink,
  experiences,
  links,
} from "@/shared/db/schema";
import { desc, eq, sql } from "drizzle-orm";

const populateCompany = sql<CompanyWithLink>`JSONB_BUILD_OBJECT(
    'id', ${companies.id},
    'name', ${companies.name},
    'uri', ${links.uri},
    'created_at', ${companies.createdAt},
    'updated_at', ${companies.updatedAt}
)`;

export const getExperiences = async () => {
  const result = await db
    .select({
      id: experiences.id,
      company: populateCompany.as("company"),
      position: experiences.position,
      startAt: experiences.startAt,
      endAt: experiences.endAt,
      isActive: experiences.isActive,
      createdAt: experiences.createdAt,
      updatedAt: experiences.updatedAt,
    })
    .from(experiences)
    .leftJoin(companies, eq(experiences.companyId, companies.id))
    .leftJoin(links, eq(companies.linkId, links.id))
    .groupBy(experiences.id, companies.id, links.uri)
    .orderBy(desc(experiences.startAt));

  return result;
};
