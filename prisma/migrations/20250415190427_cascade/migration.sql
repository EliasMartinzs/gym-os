-- DropForeignKey
ALTER TABLE "assigned_workout_templates" DROP CONSTRAINT "assigned_workout_templates_studentId_fkey";

-- DropForeignKey
ALTER TABLE "goals" DROP CONSTRAINT "goals_studentId_fkey";

-- DropForeignKey
ALTER TABLE "injuries" DROP CONSTRAINT "injuries_studentId_fkey";

-- DropForeignKey
ALTER TABLE "progress_photos" DROP CONSTRAINT "progress_photos_studentId_fkey";

-- DropForeignKey
ALTER TABLE "workout_templates" DROP CONSTRAINT "workout_templates_studentId_fkey";

-- AddForeignKey
ALTER TABLE "goals" ADD CONSTRAINT "goals_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "injuries" ADD CONSTRAINT "injuries_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "progress_photos" ADD CONSTRAINT "progress_photos_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workout_templates" ADD CONSTRAINT "workout_templates_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assigned_workout_templates" ADD CONSTRAINT "assigned_workout_templates_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE CASCADE;
