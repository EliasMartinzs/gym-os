/*
  Warnings:

  - Changed the type of `reps` on the `exercise_in_workout` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "exercise_in_workout" DROP COLUMN "reps",
ADD COLUMN     "reps" INTEGER NOT NULL;
