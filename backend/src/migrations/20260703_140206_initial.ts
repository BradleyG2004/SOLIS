import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_ingredients_type" AS ENUM('alcool', 'jus', 'sirop', 'garniture', 'autre');
  CREATE TYPE "public"."enum_cocktail_orders_status" AS ENUM('nouvelle', 'en-preparation', 'traitee', 'annulee');
  CREATE TYPE "public"."enum_quote_requests_status" AS ENUM('nouvelle', 'devis-envoye', 'acceptee', 'refusee');
  CREATE TABLE IF NOT EXISTS "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE IF NOT EXISTS "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE IF NOT EXISTS "categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"description" varchar,
  	"order" numeric DEFAULT 0,
  	"is_active" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "products" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"description" varchar,
  	"price" numeric NOT NULL,
  	"category_id" integer NOT NULL,
  	"image_id" integer,
  	"is_active" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "ingredients" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"type" "enum_ingredients_type" NOT NULL,
  	"description" varchar,
  	"price_per_unit" numeric DEFAULT 0,
  	"unit" varchar DEFAULT 'cl',
  	"available" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "equipment" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"description" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "cocktails_composition" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"ingredient_id" integer NOT NULL,
  	"quantity" numeric NOT NULL,
  	"unit" varchar DEFAULT 'cl'
  );
  
  CREATE TABLE IF NOT EXISTS "cocktails" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"description" varchar,
  	"instructions" varchar,
  	"price" numeric,
  	"image_id" integer,
  	"is_active" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "cocktails_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"equipment_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "laundry_offers_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"feature" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "laundry_offers" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"description" varchar,
  	"price" numeric,
  	"delivery_days" numeric,
  	"is_active" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "cocktail_orders_ingredients" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"quantity" numeric NOT NULL,
  	"unit" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "cocktail_orders" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"cocktail_name" varchar NOT NULL,
  	"customer_name" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"phone" varchar,
  	"notes" varchar,
  	"estimated_price" numeric,
  	"status" "enum_cocktail_orders_status" DEFAULT 'nouvelle' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "quote_requests_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"item_type" varchar NOT NULL,
  	"quantity" numeric NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "quote_requests" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"customer_name" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"phone" varchar,
  	"offer_id" integer,
  	"notes" varchar,
  	"status" "enum_quote_requests_status" DEFAULT 'nouvelle' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"media_id" integer,
  	"categories_id" integer,
  	"products_id" integer,
  	"ingredients_id" integer,
  	"equipment_id" integer,
  	"cocktails_id" integer,
  	"laundry_offers_id" integer,
  	"cocktail_orders_id" integer,
  	"quote_requests_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"home_tagline" varchar DEFAULT 'Trois univers, une même exigence.',
  	"home_description" varchar,
  	"market_intro" varchar,
  	"bar_intro" varchar,
  	"laundry_intro" varchar,
  	"payment_notice" varchar DEFAULT 'Paiement en ligne — bientôt disponible',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  DO $$ BEGIN
   ALTER TABLE "products" ADD CONSTRAINT "products_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "products" ADD CONSTRAINT "products_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "cocktails_composition" ADD CONSTRAINT "cocktails_composition_ingredient_id_ingredients_id_fk" FOREIGN KEY ("ingredient_id") REFERENCES "public"."ingredients"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "cocktails_composition" ADD CONSTRAINT "cocktails_composition_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."cocktails"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "cocktails" ADD CONSTRAINT "cocktails_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "cocktails_rels" ADD CONSTRAINT "cocktails_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."cocktails"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "cocktails_rels" ADD CONSTRAINT "cocktails_rels_equipment_fk" FOREIGN KEY ("equipment_id") REFERENCES "public"."equipment"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "laundry_offers_features" ADD CONSTRAINT "laundry_offers_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."laundry_offers"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "cocktail_orders_ingredients" ADD CONSTRAINT "cocktail_orders_ingredients_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."cocktail_orders"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "quote_requests_items" ADD CONSTRAINT "quote_requests_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."quote_requests"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "quote_requests" ADD CONSTRAINT "quote_requests_offer_id_laundry_offers_id_fk" FOREIGN KEY ("offer_id") REFERENCES "public"."laundry_offers"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_ingredients_fk" FOREIGN KEY ("ingredients_id") REFERENCES "public"."ingredients"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_equipment_fk" FOREIGN KEY ("equipment_id") REFERENCES "public"."equipment"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_cocktails_fk" FOREIGN KEY ("cocktails_id") REFERENCES "public"."cocktails"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_laundry_offers_fk" FOREIGN KEY ("laundry_offers_id") REFERENCES "public"."laundry_offers"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_cocktail_orders_fk" FOREIGN KEY ("cocktail_orders_id") REFERENCES "public"."cocktail_orders"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_quote_requests_fk" FOREIGN KEY ("quote_requests_id") REFERENCES "public"."quote_requests"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX IF NOT EXISTS "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "media_filename_idx" ON "media" USING btree ("filename");
  CREATE UNIQUE INDEX IF NOT EXISTS "categories_slug_idx" ON "categories" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "categories_updated_at_idx" ON "categories" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "categories_created_at_idx" ON "categories" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "products_slug_idx" ON "products" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "products_category_idx" ON "products" USING btree ("category_id");
  CREATE INDEX IF NOT EXISTS "products_image_idx" ON "products" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "products_updated_at_idx" ON "products" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "products_created_at_idx" ON "products" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "ingredients_slug_idx" ON "ingredients" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "ingredients_updated_at_idx" ON "ingredients" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "ingredients_created_at_idx" ON "ingredients" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "equipment_updated_at_idx" ON "equipment" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "equipment_created_at_idx" ON "equipment" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "cocktails_composition_order_idx" ON "cocktails_composition" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "cocktails_composition_parent_id_idx" ON "cocktails_composition" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "cocktails_composition_ingredient_idx" ON "cocktails_composition" USING btree ("ingredient_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "cocktails_slug_idx" ON "cocktails" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "cocktails_image_idx" ON "cocktails" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "cocktails_updated_at_idx" ON "cocktails" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "cocktails_created_at_idx" ON "cocktails" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "cocktails_rels_order_idx" ON "cocktails_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "cocktails_rels_parent_idx" ON "cocktails_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "cocktails_rels_path_idx" ON "cocktails_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "cocktails_rels_equipment_id_idx" ON "cocktails_rels" USING btree ("equipment_id");
  CREATE INDEX IF NOT EXISTS "laundry_offers_features_order_idx" ON "laundry_offers_features" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "laundry_offers_features_parent_id_idx" ON "laundry_offers_features" USING btree ("_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "laundry_offers_slug_idx" ON "laundry_offers" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "laundry_offers_updated_at_idx" ON "laundry_offers" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "laundry_offers_created_at_idx" ON "laundry_offers" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "cocktail_orders_ingredients_order_idx" ON "cocktail_orders_ingredients" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "cocktail_orders_ingredients_parent_id_idx" ON "cocktail_orders_ingredients" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "cocktail_orders_updated_at_idx" ON "cocktail_orders" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "cocktail_orders_created_at_idx" ON "cocktail_orders" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "quote_requests_items_order_idx" ON "quote_requests_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "quote_requests_items_parent_id_idx" ON "quote_requests_items" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "quote_requests_offer_idx" ON "quote_requests" USING btree ("offer_id");
  CREATE INDEX IF NOT EXISTS "quote_requests_updated_at_idx" ON "quote_requests" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "quote_requests_created_at_idx" ON "quote_requests" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("categories_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_products_id_idx" ON "payload_locked_documents_rels" USING btree ("products_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_ingredients_id_idx" ON "payload_locked_documents_rels" USING btree ("ingredients_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_equipment_id_idx" ON "payload_locked_documents_rels" USING btree ("equipment_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_cocktails_id_idx" ON "payload_locked_documents_rels" USING btree ("cocktails_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_laundry_offers_id_idx" ON "payload_locked_documents_rels" USING btree ("laundry_offers_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_cocktail_orders_id_idx" ON "payload_locked_documents_rels" USING btree ("cocktail_orders_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_quote_requests_id_idx" ON "payload_locked_documents_rels" USING btree ("quote_requests_id");
  CREATE INDEX IF NOT EXISTS "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX IF NOT EXISTS "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX IF NOT EXISTS "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "categories" CASCADE;
  DROP TABLE "products" CASCADE;
  DROP TABLE "ingredients" CASCADE;
  DROP TABLE "equipment" CASCADE;
  DROP TABLE "cocktails_composition" CASCADE;
  DROP TABLE "cocktails" CASCADE;
  DROP TABLE "cocktails_rels" CASCADE;
  DROP TABLE "laundry_offers_features" CASCADE;
  DROP TABLE "laundry_offers" CASCADE;
  DROP TABLE "cocktail_orders_ingredients" CASCADE;
  DROP TABLE "cocktail_orders" CASCADE;
  DROP TABLE "quote_requests_items" CASCADE;
  DROP TABLE "quote_requests" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "site_settings" CASCADE;
  DROP TYPE "public"."enum_ingredients_type";
  DROP TYPE "public"."enum_cocktail_orders_status";
  DROP TYPE "public"."enum_quote_requests_status";`)
}
