ALTER TABLE "facilities" RENAME COLUMN "address" TO "street_address";--> statement-breakpoint
ALTER TABLE "facilities" RENAME COLUMN "zip" TO "zip_code";--> statement-breakpoint
ALTER TABLE "facilities" RENAME COLUMN "phone" TO "phone_number";--> statement-breakpoint
ALTER TABLE "facilities" RENAME COLUMN "leader" TO "site_leader";--> statement-breakpoint
ALTER TABLE "facilities" ADD COLUMN "image_url" text;