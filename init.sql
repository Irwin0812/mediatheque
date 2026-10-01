CREATE DATABASE mediatheque;
--  WITH ENCODING 'utf8'
--       LC_COLLATE='fr_FR.UTF-8'
--       LC_CTYPE='fr_FR.UTF-8';

\c mediatheque;

CREATE SCHEMA IF NOT EXISTS "fr";

CREATE TABLE "fr"."comics" (
  "id" SERIAL PRIMARY KEY,
  "image" TEXT NOT NULL,
  "title_series" TEXT NOT NULL,
  "title_bf" TEXT NOT NULL,
  "artist" TEXT NOT NULL,
  "writer" TEXT NOT NULL,
  "publisher" TEXT NOT NULL,
  "volume_number" INTEGER NOT NULL,
  "total_volumes" INTEGER NOT NULL,
  "summary_series" TEXT NOT NULL,
  "summary_bf" TEXT NOT NULL
);

CREATE TABLE "fr"."vinyls" (
  "id" SERIAL PRIMARY KEY,
  "cover" TEXT NOT NULL,
  "group_name" TEXT NOT NULL,
  "album_title" TEXT NOT NULL,
  "track_count" INTEGER NOT NULL,
  "track_list" TEXT NOT NULL,
  "music_style" TEXT NOT NULL,
  "publisher" TEXT NOT NULL,
  "release_date" DATE NOT NULL
);

CREATE TABLE "fr"."users" (
  "id" SERIAL PRIMARY KEY,
  "username" TEXT UNIQUE NOT NULL,
  "password_hash" TEXT NOT NULL,
  "email" TEXT UNIQUE NOT NULL,
  "is_admin" BOOLEAN DEFAULT FALSE
);

CREATE TABLE "fr"."collections" (
  "id" SERIAL PRIMARY KEY,
  "name" TEXT NOT NULL,
  "user_id" INTEGER NOT NULL REFERENCES "fr"."users"("id"),
  "is_public" BOOLEAN DEFAULT FALSE
);

-- GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA "fr" TO admirwin;

-- Create admin user
CREATE USER admirwin WITH SUPERUSER PASSWORD 'OLaf@010743#g?';

GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA "fr" TO admirwin;
