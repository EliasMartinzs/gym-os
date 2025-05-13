-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('masculino', 'feminino');

-- CreateEnum
CREATE TYPE "WorkoutType" AS ENUM ('treino_de_forca', 'hiit', 'cardio', 'crossfit', 'calistenia', 'pilates', 'yoga', 'funcional');

-- CreateEnum
CREATE TYPE "GoalStatus" AS ENUM ('ativo', 'pausado', 'concluido', 'abandonado');

-- CreateEnum
CREATE TYPE "FitnessGoal" AS ENUM ('perda_de_gordura', 'ganho_de_massa', 'recomposicao_corporal', 'ganho_de_forca', 'melhora_de_resistencia', 'recuperacao_de_lesao', 'correcao_postural', 'condicionamento_funcional', 'definicao_muscular', 'preparacao_para_competicao');

-- CreateEnum
CREATE TYPE "PhotoCategory" AS ENUM ('frontal', 'lateral', 'posterior', 'contraido', 'relaxado');

-- CreateEnum
CREATE TYPE "TrainingFormat" AS ENUM ('presencial', 'online', 'hibrido', 'plano_nutricional');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('ativo', 'inativo', 'pendente', 'concluido', 'em_andamento', 'em_espera');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('personal_trainer', 'aluno');

-- CreateEnum
CREATE TYPE "SessionStatus" AS ENUM ('agendada', 'confirmada', 'em_andamento', 'concluída', 'cancelada', 'não_compareceu');

-- CreateEnum
CREATE TYPE "SessionType" AS ENUM ('treino_personalizado', 'nutrição', 'avaliação', 'acompanhamento');

-- CreateEnum
CREATE TYPE "AttachmentType" AS ENUM ('lista_exercicios', 'plano_alimentar', 'foto_progresso', 'anotação');

-- CreateEnum
CREATE TYPE "RecurrencePattern" AS ENUM ('diário', 'semanal', 'quinzenal', 'mensal', 'personalizado');

-- CreateEnum
CREATE TYPE "DayOfWeek" AS ENUM ('segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado', 'domingo');

-- CreateEnum
CREATE TYPE "DifficultyLevel" AS ENUM ('iniciante', 'intermediário', 'avançado');

-- CreateEnum
CREATE TYPE "MuscleGroup" AS ENUM ('CHEST', 'UPPER_CHEST', 'LOWER_CHEST', 'BACK', 'LATS', 'TRAPS', 'RHOMBOIDS', 'LOWER_BACK', 'SHOULDERS', 'FRONT_DELTS', 'SIDE_DELTS', 'REAR_DELTS', 'BICEPS', 'TRICEPS', 'FOREARMS', 'ABS', 'OBLIQUES', 'TRANSVERSE_ABS', 'ERECTORS', 'QUADS', 'HAMSTRINGS', 'GLUTES', 'ADDUCTORS', 'ABDUCTORS', 'CALVES', 'TIBIALIS', 'FULL_BODY', 'CARDIO', 'POSTERIOR_CHAIN');

-- CreateEnum
CREATE TYPE "LocationType" AS ENUM ('presencial', 'online', 'hibrido', 'ao_ar_livre');

-- CreateEnum
CREATE TYPE "TrainingPhase" AS ENUM ('preparacao', 'base', 'construcao', 'pico', 'recuperacao', 'transicao');

-- CreateEnum
CREATE TYPE "PriorityLevel" AS ENUM ('baixa', 'media', 'alta', 'critica');

-- CreateEnum
CREATE TYPE "MonthlyMode" AS ENUM ('dia', 'semana');

-- CreateEnum
CREATE TYPE "RecurrenceUnit" AS ENUM ('Dias', 'Semanas', 'Meses');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('pendente', 'parcialmente_pago', 'pago', 'reembolsado', 'em_disputa', 'cancelado');

-- CreateEnum
CREATE TYPE "RecurrenceEnd" AS ENUM ('nunca', 'apos_ocorrencias', 'na_data');

-- CreateEnum
CREATE TYPE "SessionOccurrenceStatus" AS ENUM ('SCHEDULED', 'COMPLETED', 'CANCELLED', 'RESCHEDULED', 'MISSED', 'PENDING');

-- CreateEnum
CREATE TYPE "ScheduleType" AS ENUM ('dias_uteis', 'final_de_semana', 'todos');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT,
    "avatarUrl" TEXT,
    "role" "Role" NOT NULL DEFAULT 'personal_trainer',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "personal_trainers" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "bio" TEXT,
    "specialties" TEXT[],
    "experienceYears" INTEGER,
    "trainingPhilosophy" TEXT,
    "availableFormats" "TrainingFormat"[],
    "instagram" TEXT,
    "website" TEXT,

    CONSTRAINT "personal_trainers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "educations" (
    "id" TEXT NOT NULL,
    "personalTrainerId" TEXT NOT NULL,
    "institution" TEXT NOT NULL,
    "degree" TEXT NOT NULL,
    "startYear" INTEGER NOT NULL,
    "endYear" INTEGER,
    "isCurrent" BOOLEAN,

    CONSTRAINT "educations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "certifications" (
    "id" TEXT NOT NULL,
    "personalTrainerId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "organization" TEXT NOT NULL,
    "yearObtained" INTEGER NOT NULL,
    "credentialId" TEXT,

    CONSTRAINT "certifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "students" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "personalTrainerId" TEXT NOT NULL,
    "birthDate" DATE,
    "gender" "Gender",
    "trainingFormat" "TrainingFormat" NOT NULL,
    "status" "Status" NOT NULL,
    "workoutDays" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "students_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "goals" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "type" "FitnessGoal" NOT NULL,
    "isPrimary" BOOLEAN NOT NULL DEFAULT false,
    "targetValue" DOUBLE PRECISION,
    "currentValue" DOUBLE PRECISION,
    "measurementMethod" TEXT,
    "startDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deadline" TIMESTAMP(3),
    "progress" DOUBLE PRECISION,
    "status" "GoalStatus" NOT NULL DEFAULT 'ativo',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "goals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "goal_notes" (
    "id" TEXT NOT NULL,
    "goalId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "goal_notes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "injuries" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "dateOccurred" TIMESTAMP(3),
    "recovered" BOOLEAN NOT NULL DEFAULT false,
    "notes" TEXT,

    CONSTRAINT "injuries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "progress_photos" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "photoUrl" TEXT NOT NULL,
    "category" "PhotoCategory" NOT NULL,
    "takenAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "notes" TEXT,

    CONSTRAINT "progress_photos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "workout_templates" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "isReusable" BOOLEAN NOT NULL,
    "isPublic" BOOLEAN NOT NULL DEFAULT false,
    "trainerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "defaultGoal" "FitnessGoal"[],
    "defaultLevel" "DifficultyLevel",
    "defaultTags" TEXT[],
    "studentId" TEXT,

    CONSTRAINT "workout_templates_pkey" PRIMARY KEY ("id")
);

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

-- CreateTable
CREATE TABLE "workout_days" (
    "id" TEXT NOT NULL,
    "templateId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "dayOfWeek" "DayOfWeek",
    "order" INTEGER NOT NULL,
    "focusMuscle" "MuscleGroup"[],

    CONSTRAINT "workout_days_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "exercise_in_workout" (
    "id" TEXT NOT NULL,
    "dayId" TEXT NOT NULL,
    "exerciseId" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "sets" INTEGER NOT NULL,
    "reps" TEXT NOT NULL,
    "rest" INTEGER,

    CONSTRAINT "exercise_in_workout_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "exercises" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "muscle" TEXT NOT NULL,
    "equipment" TEXT NOT NULL,
    "difficulty" TEXT NOT NULL,
    "instructions" TEXT NOT NULL,
    "personalTrainerId" TEXT NOT NULL,
    "studentId" TEXT,
    "workoutDayId" TEXT,

    CONSTRAINT "exercises_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sessions" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "trainerId" TEXT NOT NULL,
    "status" "SessionStatus" NOT NULL,
    "phase" "TrainingPhase" NOT NULL,
    "priority" "PriorityLevel" NOT NULL,
    "observations" TEXT,
    "locationType" "LocationType" NOT NULL,
    "street" TEXT,
    "number" TEXT,
    "neighborhood" TEXT,
    "city" TEXT,
    "postalCode" TEXT,
    "workoutTemplateId" TEXT,
    "assignedWorkoutTemplateId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recurrences" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "durationMinutes" INTEGER NOT NULL DEFAULT 60,
    "repeat" "RecurrencePattern" NOT NULL,
    "daysOfWeek" "DayOfWeek"[],
    "dayOfMonth" INTEGER,
    "unit" "RecurrenceUnit",
    "scheduleType" "ScheduleType" NOT NULL,
    "occurrenceCount" INTEGER,
    "excludeDates" TIMESTAMP(3)[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "recurrences_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "session_occurrences" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "originalDate" TIMESTAMP(3) NOT NULL,
    "actualDate" TIMESTAMP(3) NOT NULL,
    "status" "SessionOccurrenceStatus" NOT NULL,
    "isRescheduled" BOOLEAN NOT NULL DEFAULT false,
    "cancelledAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "session_occurrences_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "diets" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT false,
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "diets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "meals" (
    "id" TEXT NOT NULL,
    "dietId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "time" TEXT,
    "notes" TEXT,

    CONSTRAINT "meals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "foods" (
    "id" TEXT NOT NULL,
    "mealId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "quantity" TEXT NOT NULL,
    "calories" INTEGER,
    "protein" INTEGER,
    "carbs" INTEGER,
    "fats" INTEGER,

    CONSTRAINT "foods_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "personal_trainers_userId_key" ON "personal_trainers"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "students_userId_key" ON "students"("userId");

-- CreateIndex
CREATE INDEX "goals_studentId_type_idx" ON "goals"("studentId", "type");

-- CreateIndex
CREATE INDEX "workout_templates_trainerId_isPublic_idx" ON "workout_templates"("trainerId", "isPublic");

-- CreateIndex
CREATE INDEX "assigned_workout_templates_studentId_isActive_idx" ON "assigned_workout_templates"("studentId", "isActive");

-- CreateIndex
CREATE UNIQUE INDEX "exercises_name_personalTrainerId_key" ON "exercises"("name", "personalTrainerId");

-- CreateIndex
CREATE UNIQUE INDEX "recurrences_sessionId_key" ON "recurrences"("sessionId");

-- AddForeignKey
ALTER TABLE "personal_trainers" ADD CONSTRAINT "personal_trainers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "educations" ADD CONSTRAINT "educations_personalTrainerId_fkey" FOREIGN KEY ("personalTrainerId") REFERENCES "personal_trainers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "certifications" ADD CONSTRAINT "certifications_personalTrainerId_fkey" FOREIGN KEY ("personalTrainerId") REFERENCES "personal_trainers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "students" ADD CONSTRAINT "students_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "students" ADD CONSTRAINT "students_personalTrainerId_fkey" FOREIGN KEY ("personalTrainerId") REFERENCES "personal_trainers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "goals" ADD CONSTRAINT "goals_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "goal_notes" ADD CONSTRAINT "goal_notes_goalId_fkey" FOREIGN KEY ("goalId") REFERENCES "goals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "injuries" ADD CONSTRAINT "injuries_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "progress_photos" ADD CONSTRAINT "progress_photos_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workout_templates" ADD CONSTRAINT "workout_templates_trainerId_fkey" FOREIGN KEY ("trainerId") REFERENCES "personal_trainers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workout_templates" ADD CONSTRAINT "workout_templates_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assigned_workout_templates" ADD CONSTRAINT "assigned_workout_templates_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "workout_templates"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assigned_workout_templates" ADD CONSTRAINT "assigned_workout_templates_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assigned_workout_templates" ADD CONSTRAINT "assigned_workout_templates_trainerId_fkey" FOREIGN KEY ("trainerId") REFERENCES "personal_trainers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workout_days" ADD CONSTRAINT "workout_days_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "workout_templates"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exercise_in_workout" ADD CONSTRAINT "exercise_in_workout_dayId_fkey" FOREIGN KEY ("dayId") REFERENCES "workout_days"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exercise_in_workout" ADD CONSTRAINT "exercise_in_workout_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "exercises"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exercises" ADD CONSTRAINT "exercises_personalTrainerId_fkey" FOREIGN KEY ("personalTrainerId") REFERENCES "personal_trainers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exercises" ADD CONSTRAINT "exercises_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exercises" ADD CONSTRAINT "exercises_workoutDayId_fkey" FOREIGN KEY ("workoutDayId") REFERENCES "workout_days"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_trainerId_fkey" FOREIGN KEY ("trainerId") REFERENCES "personal_trainers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_workoutTemplateId_fkey" FOREIGN KEY ("workoutTemplateId") REFERENCES "workout_templates"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_assignedWorkoutTemplateId_fkey" FOREIGN KEY ("assignedWorkoutTemplateId") REFERENCES "assigned_workout_templates"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recurrences" ADD CONSTRAINT "recurrences_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "sessions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "session_occurrences" ADD CONSTRAINT "session_occurrences_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "sessions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "diets" ADD CONSTRAINT "diets_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "meals" ADD CONSTRAINT "meals_dietId_fkey" FOREIGN KEY ("dietId") REFERENCES "diets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "foods" ADD CONSTRAINT "foods_mealId_fkey" FOREIGN KEY ("mealId") REFERENCES "meals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
