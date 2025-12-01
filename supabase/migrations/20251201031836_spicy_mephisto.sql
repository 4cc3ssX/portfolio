ALTER TABLE "images" ALTER COLUMN "thumbnail_uri" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "blogs" ADD COLUMN "published_at" timestamp;