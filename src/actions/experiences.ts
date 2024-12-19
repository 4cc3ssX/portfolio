import { db } from "@/shared/db";
import {
  companies,
  CompanyWithImageAndLink,
  experiences,
  ExperienceWithCompany,
  images,
  links,
} from "@/shared/db/schema";
import { desc, eq, sql } from "drizzle-orm";

const populateCompany = sql<CompanyWithImageAndLink>`JSONB_BUILD_OBJECT(
    'id', ${companies.id},
    'image', JSONB_BUILD_OBJECT(
        'id', ${images.id},
        'name', ${images.name},
        'uri', ${images.uri},
        'thumbnail_uri', ${images.thumbnailUri},
        'blur_hash', ${images.blurHash},
        'metadata', ${images.metadata},
        'created_at', ${images.createdAt},
        'updated_at', ${images.updatedAt}
    ),
    'name', ${companies.name},
    'uri', ${links.uri},
    'created_at', ${companies.createdAt},
    'updated_at', ${companies.updatedAt}
)`;

export const getExperiences = async (): Promise<ExperienceWithCompany[]> => {
  const result = await db
    .select({
      id: experiences.id,
      company: populateCompany.as("company"),
      position: experiences.position,
      description: experiences.description,
      startedAt: experiences.startedAt,
      endedAt: experiences.endedAt,
      isActive: experiences.isActive,
      createdAt: experiences.createdAt,
      updatedAt: experiences.updatedAt,
    })
    .from(experiences)
    .leftJoin(companies, eq(experiences.companyId, companies.id))
    .leftJoin(links, eq(companies.linkId, links.id))
    .leftJoin(images, eq(companies.imageId, images.id))
    .groupBy(experiences.id, companies.id, images.id, links.uri)
    .orderBy(desc(experiences.startedAt));

  return result;
};
