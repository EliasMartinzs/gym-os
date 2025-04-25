-- DropForeignKey
ALTER TABLE "assigned_workout_templates" DROP CONSTRAINT "assigned_workout_templates_templateId_fkey";

-- DropForeignKey
ALTER TABLE "exercise_in_workout" DROP CONSTRAINT "exercise_in_workout_dayId_fkey";

-- DropForeignKey
ALTER TABLE "exercise_in_workout" DROP CONSTRAINT "exercise_in_workout_exerciseId_fkey";

-- DropForeignKey
ALTER TABLE "exercises" DROP CONSTRAINT "exercises_workoutDayId_fkey";

-- AddForeignKey
ALTER TABLE "assigned_workout_templates" ADD CONSTRAINT "assigned_workout_templates_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "workout_templates"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exercise_in_workout" ADD CONSTRAINT "exercise_in_workout_dayId_fkey" FOREIGN KEY ("dayId") REFERENCES "workout_days"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exercise_in_workout" ADD CONSTRAINT "exercise_in_workout_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "exercises"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exercises" ADD CONSTRAINT "exercises_workoutDayId_fkey" FOREIGN KEY ("workoutDayId") REFERENCES "workout_days"("id") ON DELETE CASCADE ON UPDATE CASCADE;
