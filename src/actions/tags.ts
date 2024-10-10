import { db } from "@/shared/db";
import { tags, TagSelect } from "@/shared/db/schema";

export const getTags = async (): Promise<TagSelect[]> => {
  const result = await db.select().from(tags);

  return result;
};
