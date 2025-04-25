-- DropForeignKey
ALTER TABLE "assigned_workout_templates" DROP CONSTRAINT "assigned_workout_templates_studentId_fkey";

-- DropForeignKey
ALTER TABLE "workout_days" DROP CONSTRAINT "workout_days_templateId_fkey";

-- DropForeignKey
ALTER TABLE "workout_templates" DROP CONSTRAINT "workout_templates_studentId_fkey";

-- AddForeignKey
ALTER TABLE "workout_templates" ADD CONSTRAINT "workout_templates_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assigned_workout_templates" ADD CONSTRAINT "assigned_workout_templates_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workout_days" ADD CONSTRAINT "workout_days_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "workout_templates"("id") ON DELETE CASCADE ON UPDATE CASCADE;
