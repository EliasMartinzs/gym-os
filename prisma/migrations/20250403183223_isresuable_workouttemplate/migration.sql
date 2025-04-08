/*
  Warnings:

  - Added the required column `isReusable` to the `workout_templates` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "workout_templates" ADD COLUMN     "isReusable" BOOLEAN NOT NULL;
