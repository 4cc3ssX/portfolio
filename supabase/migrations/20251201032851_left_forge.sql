-- Add reading_time column with default value of 5 for existing records
ALTER TABLE "blogs" ADD COLUMN "reading_time" integer NOT NULL DEFAULT 2;

-- Remove the default for future inserts
ALTER TABLE "blogs" ALTER COLUMN "reading_time" DROP DEFAULT;