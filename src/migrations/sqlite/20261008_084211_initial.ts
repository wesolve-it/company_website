import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`users_sessions\` (
    \`_order\` integer NOT NULL,
    \`_parent_id\` integer NOT NULL,
    \`id\` text PRIMARY KEY NOT NULL,
    \`created_at\` text,
    \`expires_at\` text NOT NULL,
    FOREIGN KEY (\`_parent_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`users_sessions_order_idx\` ON \`users_sessions\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`users_sessions_parent_id_idx\` ON \`users_sessions\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`users\` (
    \`id\` integer PRIMARY KEY NOT NULL,
    \`role\` text DEFAULT 'editor' NOT NULL,
    \`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
    \`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
    \`email\` text NOT NULL,
    \`reset_password_token\` text,
    \`reset_password_expiration\` text,
    \`salt\` text,
    \`hash\` text,
    \`reset_password_requested_at\` text,
    \`login_attempts\` numeric DEFAULT 0,
    \`lock_until\` text
  );
  `)
  await db.run(sql`CREATE INDEX \`users_updated_at_idx\` ON \`users\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`users_created_at_idx\` ON \`users\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`users_email_idx\` ON \`users\` (\`email\`);`)
  await db.run(sql`CREATE TABLE \`media\` (
    \`id\` integer PRIMARY KEY NOT NULL,
    \`alt\` text NOT NULL,
    \`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
    \`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
    \`url\` text,
    \`thumbnail_u_r_l\` text,
    \`filename\` text,
    \`mime_type\` text,
    \`filesize\` numeric,
    \`width\` numeric,
    \`height\` numeric,
    \`focal_x\` numeric,
    \`focal_y\` numeric,
    \`sizes_card_url\` text,
    \`sizes_card_width\` numeric,
    \`sizes_card_height\` numeric,
    \`sizes_card_mime_type\` text,
    \`sizes_card_filesize\` numeric,
    \`sizes_card_filename\` text,
    \`sizes_hero_url\` text,
    \`sizes_hero_width\` numeric,
    \`sizes_hero_height\` numeric,
    \`sizes_hero_mime_type\` text,
    \`sizes_hero_filesize\` numeric,
    \`sizes_hero_filename\` text
  );
  `)
  await db.run(sql`CREATE INDEX \`media_updated_at_idx\` ON \`media\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`media_created_at_idx\` ON \`media\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`media_filename_idx\` ON \`media\` (\`filename\`);`)
  await db.run(sql`CREATE INDEX \`media_sizes_card_sizes_card_filename_idx\` ON \`media\` (\`sizes_card_filename\`);`)
  await db.run(sql`CREATE INDEX \`media_sizes_hero_sizes_hero_filename_idx\` ON \`media\` (\`sizes_hero_filename\`);`)
  await db.run(sql`CREATE TABLE \`services_sections_paragraphs\` (
    \`_order\` integer NOT NULL,
    \`_parent_id\` text NOT NULL,
    \`id\` text PRIMARY KEY NOT NULL,
    \`text\` text,
    FOREIGN KEY (\`_parent_id\`) REFERENCES \`services_sections\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`services_sections_paragraphs_order_idx\` ON \`services_sections_paragraphs\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`services_sections_paragraphs_parent_id_idx\` ON \`services_sections_paragraphs\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`services_sections_items_paragraphs\` (
    \`_order\` integer NOT NULL,
    \`_parent_id\` text NOT NULL,
    \`id\` text PRIMARY KEY NOT NULL,
    \`text\` text,
    FOREIGN KEY (\`_parent_id\`) REFERENCES \`services_sections_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`services_sections_items_paragraphs_order_idx\` ON \`services_sections_items_paragraphs\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`services_sections_items_paragraphs_parent_id_idx\` ON \`services_sections_items_paragraphs\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`services_sections_items\` (
    \`_order\` integer NOT NULL,
    \`_parent_id\` text NOT NULL,
    \`id\` text PRIMARY KEY NOT NULL,
    \`heading\` text,
    FOREIGN KEY (\`_parent_id\`) REFERENCES \`services_sections\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`services_sections_items_order_idx\` ON \`services_sections_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`services_sections_items_parent_id_idx\` ON \`services_sections_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`services_sections\` (
    \`_order\` integer NOT NULL,
    \`_parent_id\` integer NOT NULL,
    \`id\` text PRIMARY KEY NOT NULL,
    \`eyebrow\` text,
    \`heading\` text,
    \`tone\` text DEFAULT 'light',
    \`content\` text,
    FOREIGN KEY (\`_parent_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`services_sections_order_idx\` ON \`services_sections\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`services_sections_parent_id_idx\` ON \`services_sections\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`services_faq\` (
    \`_order\` integer NOT NULL,
    \`_parent_id\` integer NOT NULL,
    \`id\` text PRIMARY KEY NOT NULL,
    \`question\` text,
    \`answer\` text,
    FOREIGN KEY (\`_parent_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`services_faq_order_idx\` ON \`services_faq\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`services_faq_parent_id_idx\` ON \`services_faq\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`services\` (
    \`id\` integer PRIMARY KEY NOT NULL,
    \`title\` text,
    \`slug\` text,
    \`heading\` text,
    \`intro\` text,
    \`image_id\` integer,
    \`featured\` integer DEFAULT false,
    \`order\` numeric DEFAULT 0,
    \`seo_title\` text,
    \`seo_description\` text,
    \`seo_image_id\` integer,
    \`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
    \`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
    \`_status\` text DEFAULT 'draft',
    FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
    FOREIGN KEY (\`seo_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`services_slug_idx\` ON \`services\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`services_image_idx\` ON \`services\` (\`image_id\`);`)
  await db.run(sql`CREATE INDEX \`services_seo_seo_image_idx\` ON \`services\` (\`seo_image_id\`);`)
  await db.run(sql`CREATE INDEX \`services_updated_at_idx\` ON \`services\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`services_created_at_idx\` ON \`services\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`services__status_idx\` ON \`services\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`_services_v_version_sections_paragraphs\` (
    \`_order\` integer NOT NULL,
    \`_parent_id\` integer NOT NULL,
    \`id\` integer PRIMARY KEY NOT NULL,
    \`text\` text,
    \`_uuid\` text,
    FOREIGN KEY (\`_parent_id\`) REFERENCES \`_services_v_version_sections\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_services_v_version_sections_paragraphs_order_idx\` ON \`_services_v_version_sections_paragraphs\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_version_sections_paragraphs_parent_id_idx\` ON \`_services_v_version_sections_paragraphs\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_services_v_version_sections_items_paragraphs\` (
    \`_order\` integer NOT NULL,
    \`_parent_id\` integer NOT NULL,
    \`id\` integer PRIMARY KEY NOT NULL,
    \`text\` text,
    \`_uuid\` text,
    FOREIGN KEY (\`_parent_id\`) REFERENCES \`_services_v_version_sections_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_services_v_version_sections_items_paragraphs_order_idx\` ON \`_services_v_version_sections_items_paragraphs\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_version_sections_items_paragraphs_parent_id_idx\` ON \`_services_v_version_sections_items_paragraphs\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_services_v_version_sections_items\` (
    \`_order\` integer NOT NULL,
    \`_parent_id\` integer NOT NULL,
    \`id\` integer PRIMARY KEY NOT NULL,
    \`heading\` text,
    \`_uuid\` text,
    FOREIGN KEY (\`_parent_id\`) REFERENCES \`_services_v_version_sections\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_services_v_version_sections_items_order_idx\` ON \`_services_v_version_sections_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_version_sections_items_parent_id_idx\` ON \`_services_v_version_sections_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_services_v_version_sections\` (
    \`_order\` integer NOT NULL,
    \`_parent_id\` integer NOT NULL,
    \`id\` integer PRIMARY KEY NOT NULL,
    \`eyebrow\` text,
    \`heading\` text,
    \`tone\` text DEFAULT 'light',
    \`content\` text,
    \`_uuid\` text,
    FOREIGN KEY (\`_parent_id\`) REFERENCES \`_services_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_services_v_version_sections_order_idx\` ON \`_services_v_version_sections\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_version_sections_parent_id_idx\` ON \`_services_v_version_sections\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_services_v_version_faq\` (
    \`_order\` integer NOT NULL,
    \`_parent_id\` integer NOT NULL,
    \`id\` integer PRIMARY KEY NOT NULL,
    \`question\` text,
    \`answer\` text,
    \`_uuid\` text,
    FOREIGN KEY (\`_parent_id\`) REFERENCES \`_services_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_services_v_version_faq_order_idx\` ON \`_services_v_version_faq\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_version_faq_parent_id_idx\` ON \`_services_v_version_faq\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_services_v\` (
    \`id\` integer PRIMARY KEY NOT NULL,
    \`parent_id\` integer,
    \`version_title\` text,
    \`version_slug\` text,
    \`version_heading\` text,
    \`version_intro\` text,
    \`version_image_id\` integer,
    \`version_featured\` integer DEFAULT false,
    \`version_order\` numeric DEFAULT 0,
    \`version_seo_title\` text,
    \`version_seo_description\` text,
    \`version_seo_image_id\` integer,
    \`version_updated_at\` text,
    \`version_created_at\` text,
    \`version__status\` text DEFAULT 'draft',
    \`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
    \`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
    \`latest\` integer,
    FOREIGN KEY (\`parent_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE set null,
    FOREIGN KEY (\`version_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
    FOREIGN KEY (\`version_seo_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_services_v_parent_idx\` ON \`_services_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_version_version_slug_idx\` ON \`_services_v\` (\`version_slug\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_version_version_image_idx\` ON \`_services_v\` (\`version_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_version_seo_version_seo_image_idx\` ON \`_services_v\` (\`version_seo_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_version_version_updated_at_idx\` ON \`_services_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_version_version_created_at_idx\` ON \`_services_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_version_version__status_idx\` ON \`_services_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_created_at_idx\` ON \`_services_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_updated_at_idx\` ON \`_services_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_latest_idx\` ON \`_services_v\` (\`latest\`);`)
  await db.run(sql`CREATE TABLE \`references_sections_paragraphs\` (
    \`_order\` integer NOT NULL,
    \`_parent_id\` text NOT NULL,
    \`id\` text PRIMARY KEY NOT NULL,
    \`text\` text,
    FOREIGN KEY (\`_parent_id\`) REFERENCES \`references_sections\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`references_sections_paragraphs_order_idx\` ON \`references_sections_paragraphs\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`references_sections_paragraphs_parent_id_idx\` ON \`references_sections_paragraphs\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`references_sections_items_paragraphs\` (
    \`_order\` integer NOT NULL,
    \`_parent_id\` text NOT NULL,
    \`id\` text PRIMARY KEY NOT NULL,
    \`text\` text,
    FOREIGN KEY (\`_parent_id\`) REFERENCES \`references_sections_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`references_sections_items_paragraphs_order_idx\` ON \`references_sections_items_paragraphs\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`references_sections_items_paragraphs_parent_id_idx\` ON \`references_sections_items_paragraphs\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`references_sections_items\` (
    \`_order\` integer NOT NULL,
    \`_parent_id\` text NOT NULL,
    \`id\` text PRIMARY KEY NOT NULL,
    \`heading\` text,
    FOREIGN KEY (\`_parent_id\`) REFERENCES \`references_sections\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`references_sections_items_order_idx\` ON \`references_sections_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`references_sections_items_parent_id_idx\` ON \`references_sections_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`references_sections\` (
    \`_order\` integer NOT NULL,
    \`_parent_id\` integer NOT NULL,
    \`id\` text PRIMARY KEY NOT NULL,
    \`eyebrow\` text,
    \`heading\` text,
    \`tone\` text DEFAULT 'light',
    \`content\` text,
    FOREIGN KEY (\`_parent_id\`) REFERENCES \`references\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`references_sections_order_idx\` ON \`references_sections\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`references_sections_parent_id_idx\` ON \`references_sections\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`references_faq\` (
    \`_order\` integer NOT NULL,
    \`_parent_id\` integer NOT NULL,
    \`id\` text PRIMARY KEY NOT NULL,
    \`question\` text,
    \`answer\` text,
    FOREIGN KEY (\`_parent_id\`) REFERENCES \`references\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`references_faq_order_idx\` ON \`references_faq\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`references_faq_parent_id_idx\` ON \`references_faq\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`references_facts\` (
    \`_order\` integer NOT NULL,
    \`_parent_id\` integer NOT NULL,
    \`id\` text PRIMARY KEY NOT NULL,
    \`label\` text,
    \`value\` text,
    FOREIGN KEY (\`_parent_id\`) REFERENCES \`references\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`references_facts_order_idx\` ON \`references_facts\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`references_facts_parent_id_idx\` ON \`references_facts\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`references\` (
    \`id\` integer PRIMARY KEY NOT NULL,
    \`title\` text,
    \`slug\` text,
    \`heading\` text,
    \`intro\` text,
    \`image_id\` integer,
    \`featured\` integer DEFAULT false,
    \`order\` numeric DEFAULT 0,
    \`seo_title\` text,
    \`seo_description\` text,
    \`seo_image_id\` integer,
    \`category\` text,
    \`logo_id\` integer,
    \`testimonial_id\` integer,
    \`website\` text,
    \`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
    \`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
    \`_status\` text DEFAULT 'draft',
    FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
    FOREIGN KEY (\`seo_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
    FOREIGN KEY (\`logo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
    FOREIGN KEY (\`testimonial_id\`) REFERENCES \`testimonials\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`references_slug_idx\` ON \`references\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`references_image_idx\` ON \`references\` (\`image_id\`);`)
  await db.run(sql`CREATE INDEX \`references_seo_seo_image_idx\` ON \`references\` (\`seo_image_id\`);`)
  await db.run(sql`CREATE INDEX \`references_logo_idx\` ON \`references\` (\`logo_id\`);`)
  await db.run(sql`CREATE INDEX \`references_testimonial_idx\` ON \`references\` (\`testimonial_id\`);`)
  await db.run(sql`CREATE INDEX \`references_updated_at_idx\` ON \`references\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`references_created_at_idx\` ON \`references\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`references__status_idx\` ON \`references\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`_references_v_version_sections_paragraphs\` (
    \`_order\` integer NOT NULL,
    \`_parent_id\` integer NOT NULL,
    \`id\` integer PRIMARY KEY NOT NULL,
    \`text\` text,
    \`_uuid\` text,
    FOREIGN KEY (\`_parent_id\`) REFERENCES \`_references_v_version_sections\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_references_v_version_sections_paragraphs_order_idx\` ON \`_references_v_version_sections_paragraphs\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_references_v_version_sections_paragraphs_parent_id_idx\` ON \`_references_v_version_sections_paragraphs\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_references_v_version_sections_items_paragraphs\` (
    \`_order\` integer NOT NULL,
    \`_parent_id\` integer NOT NULL,
    \`id\` integer PRIMARY KEY NOT NULL,
    \`text\` text,
    \`_uuid\` text,
    FOREIGN KEY (\`_parent_id\`) REFERENCES \`_references_v_version_sections_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_references_v_version_sections_items_paragraphs_order_idx\` ON \`_references_v_version_sections_items_paragraphs\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_references_v_version_sections_items_paragraphs_parent_id_idx\` ON \`_references_v_version_sections_items_paragraphs\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_references_v_version_sections_items\` (
    \`_order\` integer NOT NULL,
    \`_parent_id\` integer NOT NULL,
    \`id\` integer PRIMARY KEY NOT NULL,
    \`heading\` text,
    \`_uuid\` text,
    FOREIGN KEY (\`_parent_id\`) REFERENCES \`_references_v_version_sections\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_references_v_version_sections_items_order_idx\` ON \`_references_v_version_sections_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_references_v_version_sections_items_parent_id_idx\` ON \`_references_v_version_sections_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_references_v_version_sections\` (
    \`_order\` integer NOT NULL,
    \`_parent_id\` integer NOT NULL,
    \`id\` integer PRIMARY KEY NOT NULL,
    \`eyebrow\` text,
    \`heading\` text,
    \`tone\` text DEFAULT 'light',
    \`content\` text,
    \`_uuid\` text,
    FOREIGN KEY (\`_parent_id\`) REFERENCES \`_references_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_references_v_version_sections_order_idx\` ON \`_references_v_version_sections\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_references_v_version_sections_parent_id_idx\` ON \`_references_v_version_sections\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_references_v_version_faq\` (
    \`_order\` integer NOT NULL,
    \`_parent_id\` integer NOT NULL,
    \`id\` integer PRIMARY KEY NOT NULL,
    \`question\` text,
    \`answer\` text,
    \`_uuid\` text,
    FOREIGN KEY (\`_parent_id\`) REFERENCES \`_references_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_references_v_version_faq_order_idx\` ON \`_references_v_version_faq\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_references_v_version_faq_parent_id_idx\` ON \`_references_v_version_faq\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_references_v_version_facts\` (
    \`_order\` integer NOT NULL,
    \`_parent_id\` integer NOT NULL,
    \`id\` integer PRIMARY KEY NOT NULL,
    \`label\` text,
    \`value\` text,
    \`_uuid\` text,
    FOREIGN KEY (\`_parent_id\`) REFERENCES \`_references_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_references_v_version_facts_order_idx\` ON \`_references_v_version_facts\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_references_v_version_facts_parent_id_idx\` ON \`_references_v_version_facts\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_references_v\` (
    \`id\` integer PRIMARY KEY NOT NULL,
    \`parent_id\` integer,
    \`version_title\` text,
    \`version_slug\` text,
    \`version_heading\` text,
    \`version_intro\` text,
    \`version_image_id\` integer,
    \`version_featured\` integer DEFAULT false,
    \`version_order\` numeric DEFAULT 0,
    \`version_seo_title\` text,
    \`version_seo_description\` text,
    \`version_seo_image_id\` integer,
    \`version_category\` text,
    \`version_logo_id\` integer,
    \`version_testimonial_id\` integer,
    \`version_website\` text,
    \`version_updated_at\` text,
    \`version_created_at\` text,
    \`version__status\` text DEFAULT 'draft',
    \`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
    \`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
    \`latest\` integer,
    FOREIGN KEY (\`parent_id\`) REFERENCES \`references\`(\`id\`) ON UPDATE no action ON DELETE set null,
    FOREIGN KEY (\`version_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
    FOREIGN KEY (\`version_seo_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
    FOREIGN KEY (\`version_logo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
    FOREIGN KEY (\`version_testimonial_id\`) REFERENCES \`testimonials\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_references_v_parent_idx\` ON \`_references_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_references_v_version_version_slug_idx\` ON \`_references_v\` (\`version_slug\`);`)
  await db.run(sql`CREATE INDEX \`_references_v_version_version_image_idx\` ON \`_references_v\` (\`version_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_references_v_version_seo_version_seo_image_idx\` ON \`_references_v\` (\`version_seo_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_references_v_version_version_logo_idx\` ON \`_references_v\` (\`version_logo_id\`);`)
  await db.run(sql`CREATE INDEX \`_references_v_version_version_testimonial_idx\` ON \`_references_v\` (\`version_testimonial_id\`);`)
  await db.run(sql`CREATE INDEX \`_references_v_version_version_updated_at_idx\` ON \`_references_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_references_v_version_version_created_at_idx\` ON \`_references_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_references_v_version_version__status_idx\` ON \`_references_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_references_v_created_at_idx\` ON \`_references_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_references_v_updated_at_idx\` ON \`_references_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_references_v_latest_idx\` ON \`_references_v\` (\`latest\`);`)
  await db.run(sql`CREATE TABLE \`testimonials\` (
    \`id\` integer PRIMARY KEY NOT NULL,
    \`name\` text,
    \`position\` text,
    \`quote\` text,
    \`image_id\` integer,
    \`order\` numeric DEFAULT 0,
    \`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
    \`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
    \`_status\` text DEFAULT 'draft',
    FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`testimonials_image_idx\` ON \`testimonials\` (\`image_id\`);`)
  await db.run(sql`CREATE INDEX \`testimonials_updated_at_idx\` ON \`testimonials\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`testimonials_created_at_idx\` ON \`testimonials\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`testimonials__status_idx\` ON \`testimonials\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`_testimonials_v\` (
    \`id\` integer PRIMARY KEY NOT NULL,
    \`parent_id\` integer,
    \`version_name\` text,
    \`version_position\` text,
    \`version_quote\` text,
    \`version_image_id\` integer,
    \`version_order\` numeric DEFAULT 0,
    \`version_updated_at\` text,
    \`version_created_at\` text,
    \`version__status\` text DEFAULT 'draft',
    \`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
    \`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
    \`latest\` integer,
    FOREIGN KEY (\`parent_id\`) REFERENCES \`testimonials\`(\`id\`) ON UPDATE no action ON DELETE set null,
    FOREIGN KEY (\`version_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_testimonials_v_parent_idx\` ON \`_testimonials_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_testimonials_v_version_version_image_idx\` ON \`_testimonials_v\` (\`version_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_testimonials_v_version_version_updated_at_idx\` ON \`_testimonials_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_testimonials_v_version_version_created_at_idx\` ON \`_testimonials_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_testimonials_v_version_version__status_idx\` ON \`_testimonials_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_testimonials_v_created_at_idx\` ON \`_testimonials_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_testimonials_v_updated_at_idx\` ON \`_testimonials_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_testimonials_v_latest_idx\` ON \`_testimonials_v\` (\`latest\`);`)
  await db.run(sql`CREATE TABLE \`pages\` (
    \`id\` integer PRIMARY KEY NOT NULL,
    \`title\` text,
    \`slug\` text,
    \`content\` text,
    \`seo_title\` text,
    \`seo_description\` text,
    \`seo_image_id\` integer,
    \`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
    \`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
    \`_status\` text DEFAULT 'draft',
    FOREIGN KEY (\`seo_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_slug_idx\` ON \`pages\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`pages_seo_seo_image_idx\` ON \`pages\` (\`seo_image_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_updated_at_idx\` ON \`pages\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`pages_created_at_idx\` ON \`pages\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`pages__status_idx\` ON \`pages\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v\` (
    \`id\` integer PRIMARY KEY NOT NULL,
    \`parent_id\` integer,
    \`version_title\` text,
    \`version_slug\` text,
    \`version_content\` text,
    \`version_seo_title\` text,
    \`version_seo_description\` text,
    \`version_seo_image_id\` integer,
    \`version_updated_at\` text,
    \`version_created_at\` text,
    \`version__status\` text DEFAULT 'draft',
    \`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
    \`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
    \`latest\` integer,
    FOREIGN KEY (\`parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
    FOREIGN KEY (\`version_seo_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_parent_idx\` ON \`_pages_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_version_slug_idx\` ON \`_pages_v\` (\`version_slug\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_seo_version_seo_image_idx\` ON \`_pages_v\` (\`version_seo_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_version_updated_at_idx\` ON \`_pages_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_version_created_at_idx\` ON \`_pages_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_version__status_idx\` ON \`_pages_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_created_at_idx\` ON \`_pages_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_updated_at_idx\` ON \`_pages_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_latest_idx\` ON \`_pages_v\` (\`latest\`);`)
  await db.run(sql`CREATE TABLE \`inquiries\` (
    \`id\` integer PRIMARY KEY NOT NULL,
    \`name\` text NOT NULL,
    \`email\` text NOT NULL,
    \`phone\` text,
    \`subject\` text NOT NULL,
    \`message\` text NOT NULL,
    \`consent\` integer DEFAULT false NOT NULL,
    \`notification_sent\` integer DEFAULT false,
    \`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
    \`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`inquiries_updated_at_idx\` ON \`inquiries\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`inquiries_created_at_idx\` ON \`inquiries\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_kv\` (
    \`id\` integer PRIMARY KEY NOT NULL,
    \`key\` text NOT NULL,
    \`data\` text NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`payload_kv_key_idx\` ON \`payload_kv\` (\`key\`);`)
  await db.run(sql`CREATE TABLE \`payload_locked_documents\` (
    \`id\` integer PRIMARY KEY NOT NULL,
    \`global_slug\` text,
    \`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
    \`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_global_slug_idx\` ON \`payload_locked_documents\` (\`global_slug\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_updated_at_idx\` ON \`payload_locked_documents\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_created_at_idx\` ON \`payload_locked_documents\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_locked_documents_rels\` (
    \`id\` integer PRIMARY KEY NOT NULL,
    \`order\` integer,
    \`parent_id\` integer NOT NULL,
    \`path\` text NOT NULL,
    \`users_id\` integer,
    \`media_id\` integer,
    \`services_id\` integer,
    \`references_id\` integer,
    \`testimonials_id\` integer,
    \`pages_id\` integer,
    \`inquiries_id\` integer,
    FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_locked_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
    FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade,
    FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
    FOREIGN KEY (\`services_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE cascade,
    FOREIGN KEY (\`references_id\`) REFERENCES \`references\`(\`id\`) ON UPDATE no action ON DELETE cascade,
    FOREIGN KEY (\`testimonials_id\`) REFERENCES \`testimonials\`(\`id\`) ON UPDATE no action ON DELETE cascade,
    FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
    FOREIGN KEY (\`inquiries_id\`) REFERENCES \`inquiries\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_users_id_idx\` ON \`payload_locked_documents_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_media_id_idx\` ON \`payload_locked_documents_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_services_id_idx\` ON \`payload_locked_documents_rels\` (\`services_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_references_id_idx\` ON \`payload_locked_documents_rels\` (\`references_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_testimonials_id_idx\` ON \`payload_locked_documents_rels\` (\`testimonials_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_pages_id_idx\` ON \`payload_locked_documents_rels\` (\`pages_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_inquiries_id_idx\` ON \`payload_locked_documents_rels\` (\`inquiries_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_preferences\` (
    \`id\` integer PRIMARY KEY NOT NULL,
    \`key\` text,
    \`value\` text,
    \`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
    \`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_preferences_key_idx\` ON \`payload_preferences\` (\`key\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_updated_at_idx\` ON \`payload_preferences\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_created_at_idx\` ON \`payload_preferences\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_preferences_rels\` (
    \`id\` integer PRIMARY KEY NOT NULL,
    \`order\` integer,
    \`parent_id\` integer NOT NULL,
    \`path\` text NOT NULL,
    \`users_id\` integer,
    FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_preferences\`(\`id\`) ON UPDATE no action ON DELETE cascade,
    FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_order_idx\` ON \`payload_preferences_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_parent_idx\` ON \`payload_preferences_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_path_idx\` ON \`payload_preferences_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_users_id_idx\` ON \`payload_preferences_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_migrations\` (
    \`id\` integer PRIMARY KEY NOT NULL,
    \`name\` text,
    \`batch\` numeric,
    \`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
    \`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_migrations_updated_at_idx\` ON \`payload_migrations\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_migrations_created_at_idx\` ON \`payload_migrations\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`home\` (
    \`id\` integer PRIMARY KEY NOT NULL,
    \`badge\` text NOT NULL,
    \`heading\` text NOT NULL,
    \`intro\` text NOT NULL,
    \`image_id\` integer,
    \`services_heading\` text NOT NULL,
    \`services_intro\` text,
    \`references_heading\` text NOT NULL,
    \`references_intro\` text,
    \`seo_title\` text,
    \`seo_description\` text,
    \`seo_image_id\` integer,
    \`updated_at\` text,
    \`created_at\` text,
    FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
    FOREIGN KEY (\`seo_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`home_image_idx\` ON \`home\` (\`image_id\`);`)
  await db.run(sql`CREATE INDEX \`home_seo_seo_image_idx\` ON \`home\` (\`seo_image_id\`);`)
  await db.run(sql`CREATE TABLE \`site_settings_navigation\` (
    \`_order\` integer NOT NULL,
    \`_parent_id\` integer NOT NULL,
    \`id\` text PRIMARY KEY NOT NULL,
    \`label\` text NOT NULL,
    \`url\` text NOT NULL,
    FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_settings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_settings_navigation_order_idx\` ON \`site_settings_navigation\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_navigation_parent_id_idx\` ON \`site_settings_navigation\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`site_settings\` (
    \`id\` integer PRIMARY KEY NOT NULL,
    \`brand\` text DEFAULT 'wesolve-IT' NOT NULL,
    \`description\` text,
    \`email\` text NOT NULL,
    \`phone\` text NOT NULL,
    \`whatsapp\` text,
    \`linkedin\` text,
    \`instagram\` text,
    \`cta_heading\` text NOT NULL,
    \`cta_text\` text,
    \`newsletter_enabled\` integer DEFAULT false,
    \`updated_at\` text,
    \`created_at\` text
  );
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`users_sessions\`;`)
  await db.run(sql`DROP TABLE \`users\`;`)
  await db.run(sql`DROP TABLE \`media\`;`)
  await db.run(sql`DROP TABLE \`services_sections_paragraphs\`;`)
  await db.run(sql`DROP TABLE \`services_sections_items_paragraphs\`;`)
  await db.run(sql`DROP TABLE \`services_sections_items\`;`)
  await db.run(sql`DROP TABLE \`services_sections\`;`)
  await db.run(sql`DROP TABLE \`services_faq\`;`)
  await db.run(sql`DROP TABLE \`services\`;`)
  await db.run(sql`DROP TABLE \`_services_v_version_sections_paragraphs\`;`)
  await db.run(sql`DROP TABLE \`_services_v_version_sections_items_paragraphs\`;`)
  await db.run(sql`DROP TABLE \`_services_v_version_sections_items\`;`)
  await db.run(sql`DROP TABLE \`_services_v_version_sections\`;`)
  await db.run(sql`DROP TABLE \`_services_v_version_faq\`;`)
  await db.run(sql`DROP TABLE \`_services_v\`;`)
  await db.run(sql`DROP TABLE \`references_sections_paragraphs\`;`)
  await db.run(sql`DROP TABLE \`references_sections_items_paragraphs\`;`)
  await db.run(sql`DROP TABLE \`references_sections_items\`;`)
  await db.run(sql`DROP TABLE \`references_sections\`;`)
  await db.run(sql`DROP TABLE \`references_faq\`;`)
  await db.run(sql`DROP TABLE \`references_facts\`;`)
  await db.run(sql`DROP TABLE \`references\`;`)
  await db.run(sql`DROP TABLE \`_references_v_version_sections_paragraphs\`;`)
  await db.run(sql`DROP TABLE \`_references_v_version_sections_items_paragraphs\`;`)
  await db.run(sql`DROP TABLE \`_references_v_version_sections_items\`;`)
  await db.run(sql`DROP TABLE \`_references_v_version_sections\`;`)
  await db.run(sql`DROP TABLE \`_references_v_version_faq\`;`)
  await db.run(sql`DROP TABLE \`_references_v_version_facts\`;`)
  await db.run(sql`DROP TABLE \`_references_v\`;`)
  await db.run(sql`DROP TABLE \`testimonials\`;`)
  await db.run(sql`DROP TABLE \`_testimonials_v\`;`)
  await db.run(sql`DROP TABLE \`pages\`;`)
  await db.run(sql`DROP TABLE \`_pages_v\`;`)
  await db.run(sql`DROP TABLE \`inquiries\`;`)
  await db.run(sql`DROP TABLE \`payload_kv\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_preferences\`;`)
  await db.run(sql`DROP TABLE \`payload_preferences_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_migrations\`;`)
  await db.run(sql`DROP TABLE \`home\`;`)
  await db.run(sql`DROP TABLE \`site_settings_navigation\`;`)
  await db.run(sql`DROP TABLE \`site_settings\`;`)
}
