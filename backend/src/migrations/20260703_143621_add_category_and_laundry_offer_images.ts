import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "categories" ADD COLUMN "image_id" integer;
  ALTER TABLE "laundry_offers" ADD COLUMN "image_id" integer;
  DO $$ BEGIN
   ALTER TABLE "categories" ADD CONSTRAINT "categories_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "laundry_offers" ADD CONSTRAINT "laundry_offers_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "categories_image_idx" ON "categories" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "laundry_offers_image_idx" ON "laundry_offers" USING btree ("image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "categories" DROP CONSTRAINT "categories_image_id_media_id_fk";
  
  ALTER TABLE "laundry_offers" DROP CONSTRAINT "laundry_offers_image_id_media_id_fk";
  
  DROP INDEX IF EXISTS "categories_image_idx";
  DROP INDEX IF EXISTS "laundry_offers_image_idx";
  ALTER TABLE "categories" DROP COLUMN IF EXISTS "image_id";
  ALTER TABLE "laundry_offers" DROP COLUMN IF EXISTS "image_id";`)
}
