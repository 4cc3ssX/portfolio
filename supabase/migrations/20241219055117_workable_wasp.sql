CREATE TABLE "skills" (
	"id" serial PRIMARY KEY NOT NULL,
	"tag_id" integer NOT NULL,
	"min" integer NOT NULL,
	"max" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
ALTER TABLE "projects" ALTER COLUMN "started_at" SET DATA TYPE date;--> statement-breakpoint
ALTER TABLE "projects" ALTER COLUMN "ended_at" SET DATA TYPE date;--> statement-breakpoint
ALTER TABLE "experiences" ADD COLUMN "description" text;--> statement-breakpoint
ALTER TABLE "tags" ADD COLUMN "term" text NOT NULL;--> statement-breakpoint
ALTER TABLE "skills" ADD CONSTRAINT "skills_tag_id_tags_id_fk" FOREIGN KEY ("tag_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE cascade;