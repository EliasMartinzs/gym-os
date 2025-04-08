/*
  Warnings:

  - You are about to drop the column `goal` on the `workout_templates` table. All the data in the column will be lost.
  - You are about to drop the column `isReusable` on the `workout_templates` table. All the data in the column will be lost.
  - You are about to drop the column `level` on the `workout_templates` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "workout_templates_trainerId_isReusable_idx";

-- AlterTable
ALTER TABLE "sessions" ADD COLUMN     "assignedWorkoutTemplateId" TEXT;

-- AlterTable
ALTER TABLE "workout_templates" DROP COLUMN "goal",
DROP COLUMN "isReusable",
DROP COLUMN "level",
ADD COLUMN     "defaultGoal" "FitnessGoal"[],
ADD COLUMN     "defaultLevel" "DifficultyLevel",
ADD COLUMN     "defaultTags" TEXT[],
ADD COLUMN     "isPublic" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "assigned_workout_templates" (
    "id" TEXT NOT NULL,
    "templateId" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "trainerId" TEXT NOT NULL,
    "customGoal" "FitnessGoal"[],
    "customLevel" "DifficultyLevel",
    "customTags" TEXT[],
    "notes" TEXT,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "assigned_workout_templates_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "assigned_workout_templates_studentId_isActive_idx" ON "assigned_workout_templates"("studentId", "isActive");

-- CreateIndex
CREATE INDEX "workout_templates_trainerId_isPublic_idx" ON "workout_templates"("trainerId", "isPublic");

-- AddForeignKey
ALTER TABLE "assigned_workout_templates" ADD CONSTRAINT "assigned_workout_templates_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "workout_templates"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assigned_workout_templates" ADD CONSTRAINT "assigned_workout_templates_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assigned_workout_templates" ADD CONSTRAINT "assigned_workout_templates_trainerId_fkey" FOREIGN KEY ("trainerId") REFERENCES "personal_trainers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_assignedWorkoutTemplateId_fkey" FOREIGN KEY ("assignedWorkoutTemplateId") REFERENCES "assigned_workout_templates"("id") ON DELETE SET NULL ON UPDATE CASCADE;
