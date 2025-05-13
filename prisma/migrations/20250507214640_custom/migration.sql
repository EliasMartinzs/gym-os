/*
  Warnings:

  - The values [personalizado] on the enum `RecurrencePattern` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "RecurrencePattern_new" AS ENUM ('diário', 'semanal', 'quinzenal', 'mensal');
ALTER TABLE "recurrences" ALTER COLUMN "repeat" TYPE "RecurrencePattern_new" USING ("repeat"::text::"RecurrencePattern_new");
ALTER TYPE "RecurrencePattern" RENAME TO "RecurrencePattern_old";
ALTER TYPE "RecurrencePattern_new" RENAME TO "RecurrencePattern";
DROP TYPE "RecurrencePattern_old";
COMMIT;
