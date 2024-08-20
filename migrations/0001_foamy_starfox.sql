UPDATE "user" SET "name" = '' WHERE  "name" IS NULL;
ALTER TABLE "user" ALTER COLUMN "name" SET NOT NULL;
