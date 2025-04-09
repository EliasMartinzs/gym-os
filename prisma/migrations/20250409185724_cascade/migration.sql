-- DropForeignKey
ALTER TABLE "certifications" DROP CONSTRAINT "certifications_personalTrainerId_fkey";

-- DropForeignKey
ALTER TABLE "educations" DROP CONSTRAINT "educations_personalTrainerId_fkey";

-- DropForeignKey
ALTER TABLE "exercises" DROP CONSTRAINT "exercises_personalTrainerId_fkey";

-- DropForeignKey
ALTER TABLE "goals" DROP CONSTRAINT "goals_studentId_fkey";

-- DropForeignKey
ALTER TABLE "progress_photos" DROP CONSTRAINT "progress_photos_studentId_fkey";

-- DropForeignKey
ALTER TABLE "students" DROP CONSTRAINT "students_personalTrainerId_fkey";

-- DropForeignKey
ALTER TABLE "students" DROP CONSTRAINT "students_userId_fkey";

-- AddForeignKey
ALTER TABLE "educations" ADD CONSTRAINT "educations_personalTrainerId_fkey" FOREIGN KEY ("personalTrainerId") REFERENCES "personal_trainers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "certifications" ADD CONSTRAINT "certifications_personalTrainerId_fkey" FOREIGN KEY ("personalTrainerId") REFERENCES "personal_trainers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "students" ADD CONSTRAINT "students_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "students" ADD CONSTRAINT "students_personalTrainerId_fkey" FOREIGN KEY ("personalTrainerId") REFERENCES "personal_trainers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "goals" ADD CONSTRAINT "goals_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "progress_photos" ADD CONSTRAINT "progress_photos_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exercises" ADD CONSTRAINT "exercises_personalTrainerId_fkey" FOREIGN KEY ("personalTrainerId") REFERENCES "personal_trainers"("id") ON DELETE CASCADE ON UPDATE CASCADE;
