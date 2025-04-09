-- DropForeignKey
ALTER TABLE "assigned_workout_templates" DROP CONSTRAINT "assigned_workout_templates_studentId_fkey";

-- DropForeignKey
ALTER TABLE "assigned_workout_templates" DROP CONSTRAINT "assigned_workout_templates_templateId_fkey";

-- DropForeignKey
ALTER TABLE "assigned_workout_templates" DROP CONSTRAINT "assigned_workout_templates_trainerId_fkey";

-- DropForeignKey
ALTER TABLE "diets" DROP CONSTRAINT "diets_studentId_fkey";

-- DropForeignKey
ALTER TABLE "exercise_in_workout" DROP CONSTRAINT "exercise_in_workout_dayId_fkey";

-- DropForeignKey
ALTER TABLE "exercise_in_workout" DROP CONSTRAINT "exercise_in_workout_exerciseId_fkey";

-- DropForeignKey
ALTER TABLE "exercises" DROP CONSTRAINT "exercises_studentId_fkey";

-- DropForeignKey
ALTER TABLE "exercises" DROP CONSTRAINT "exercises_workoutDayId_fkey";

-- DropForeignKey
ALTER TABLE "foods" DROP CONSTRAINT "foods_mealId_fkey";

-- DropForeignKey
ALTER TABLE "goal_notes" DROP CONSTRAINT "goal_notes_goalId_fkey";

-- DropForeignKey
ALTER TABLE "injuries" DROP CONSTRAINT "injuries_studentId_fkey";

-- DropForeignKey
ALTER TABLE "meals" DROP CONSTRAINT "meals_dietId_fkey";

-- DropForeignKey
ALTER TABLE "recurrences" DROP CONSTRAINT "recurrences_sessionId_fkey";

-- DropForeignKey
ALTER TABLE "session_attachments" DROP CONSTRAINT "session_attachments_sessionId_fkey";

-- DropForeignKey
ALTER TABLE "sessions" DROP CONSTRAINT "sessions_assignedWorkoutTemplateId_fkey";

-- DropForeignKey
ALTER TABLE "sessions" DROP CONSTRAINT "sessions_studentId_fkey";

-- DropForeignKey
ALTER TABLE "sessions" DROP CONSTRAINT "sessions_trainerId_fkey";

-- DropForeignKey
ALTER TABLE "sessions" DROP CONSTRAINT "sessions_workoutId_fkey";

-- DropForeignKey
ALTER TABLE "workout_days" DROP CONSTRAINT "workout_days_templateId_fkey";

-- DropForeignKey
ALTER TABLE "workout_templates" DROP CONSTRAINT "workout_templates_studentId_fkey";

-- DropForeignKey
ALTER TABLE "workout_templates" DROP CONSTRAINT "workout_templates_trainerId_fkey";

-- AddForeignKey
ALTER TABLE "recurrences" ADD CONSTRAINT "recurrences_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "sessions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "goal_notes" ADD CONSTRAINT "goal_notes_goalId_fkey" FOREIGN KEY ("goalId") REFERENCES "goals"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "injuries" ADD CONSTRAINT "injuries_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workout_templates" ADD CONSTRAINT "workout_templates_trainerId_fkey" FOREIGN KEY ("trainerId") REFERENCES "personal_trainers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workout_templates" ADD CONSTRAINT "workout_templates_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assigned_workout_templates" ADD CONSTRAINT "assigned_workout_templates_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "workout_templates"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assigned_workout_templates" ADD CONSTRAINT "assigned_workout_templates_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assigned_workout_templates" ADD CONSTRAINT "assigned_workout_templates_trainerId_fkey" FOREIGN KEY ("trainerId") REFERENCES "personal_trainers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workout_days" ADD CONSTRAINT "workout_days_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "workout_templates"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exercise_in_workout" ADD CONSTRAINT "exercise_in_workout_dayId_fkey" FOREIGN KEY ("dayId") REFERENCES "workout_days"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exercise_in_workout" ADD CONSTRAINT "exercise_in_workout_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "exercises"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exercises" ADD CONSTRAINT "exercises_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exercises" ADD CONSTRAINT "exercises_workoutDayId_fkey" FOREIGN KEY ("workoutDayId") REFERENCES "workout_days"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_trainerId_fkey" FOREIGN KEY ("trainerId") REFERENCES "personal_trainers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "workout_templates"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_assignedWorkoutTemplateId_fkey" FOREIGN KEY ("assignedWorkoutTemplateId") REFERENCES "assigned_workout_templates"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "session_attachments" ADD CONSTRAINT "session_attachments_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "sessions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "diets" ADD CONSTRAINT "diets_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "meals" ADD CONSTRAINT "meals_dietId_fkey" FOREIGN KEY ("dietId") REFERENCES "diets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "foods" ADD CONSTRAINT "foods_mealId_fkey" FOREIGN KEY ("mealId") REFERENCES "meals"("id") ON DELETE CASCADE ON UPDATE CASCADE;
