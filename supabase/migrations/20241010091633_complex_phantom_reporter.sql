ALTER TABLE "experiences" RENAME COLUMN "start_at" TO "started_at";--> statement-breakpoint
ALTER TABLE "experiences" RENAME COLUMN "end_at" TO "ended_at";--> statement-breakpoint
ALTER TABLE "images" ALTER COLUMN "thumbnail_uri" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "images" ALTER COLUMN "blur_hash" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "is_active" boolean NOT NULL;--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "started_at" timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "ended_at" timestamp;