ALTER TABLE "facilities" ALTER COLUMN "name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "facilities" ALTER COLUMN "address" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "facilities" ALTER COLUMN "city" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "facilities" ALTER COLUMN "state" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "facilities" ALTER COLUMN "zip" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "facilities" ALTER COLUMN "phone" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "facilities" ADD COLUMN "leader" text;