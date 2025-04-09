import { z } from "zod";
import {
  FitnessGoal,
  DifficultyLevel,
  DayOfWeek,
  MuscleGroup,
  Role,
  Status,
  TrainingFormat,
} from "@prisma/client";

export const workoutTemplateFormEditSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  description: z.string().optional(),
  isReusable: z.boolean().default(true),
  goal: z
    .array(z.nativeEnum(FitnessGoal))
    .min(1, "Selecione pelo menos um objetivo"),
  level: z.nativeEnum(DifficultyLevel).optional(),
  studentId: z.string().optional(),
  days: z
    .array(
      z.object({
        id: z.string().optional(),
        name: z
          .string()
          .min(2, "Nome do treino deve ter pelo menos 2 caracteres"),
        dayOfWeek: z.string().optional(),
        order: z.number().min(0),
        focusMuscle: z
          .array(z.string())
          .min(1, "Selecione pelo menos um grupo muscular"),
        exercises: z
          .array(
            z.object({
              id: z.string(),
              sets: z.number().min(1, "Mínimo 1 série"),
              reps: z.string().min(1, "Defina as repetições"),
              rest: z.number().optional(),
            })
          )
          .min(1, "Adicione pelo menos um exercício"),
      })
    )
    .min(1, "Adicione pelo menos um dia de treino"),
});

export type WorkoutTemplateFormEditValues = z.infer<
  typeof workoutTemplateFormEditSchema
>;

export const ExerciseSchema = z.object({
  exerciseId: z.string().min(1, "Exercício é obrigatório"),
  sets: z.number().min(1, "Mínimo 1 série"),
  reps: z.string().min(1, "Repetições são obrigatórias"),
  rest: z.number().min(0, "Não pode ser negativo").optional(),
});

export const WorkoutDaySchema = z.object({
  name: z.string().min(1, "Dia do treino é obrigatório"),
  dayOfWeek: z.nativeEnum(DayOfWeek), // Supondo que DayOfWeek esteja definido em algum lugar
  focusMuscle: z
    .array(z.nativeEnum(MuscleGroup)) // Supondo que MuscleGroup esteja definido em algum lugar
    .min(1, "Selecione pelo menos 1 grupo"),
  exercises: z.array(ExerciseSchema).min(1, "Adicione pelo menos 1 exercício"),
});

export const TemplateBasicSchema = z.object({
  name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  description: z.string().optional(),
  isReusable: z.boolean().default(false),
  isPublic: z.boolean().default(false),
});

export const ReusableConfigSchema = z.object({
  goals: z
    .array(z.nativeEnum(FitnessGoal)) // Supondo que FitnessGoal esteja definido em algum lugar
    .min(1, "Selecione pelo menos 1 objetivo"),
  level: z.nativeEnum(DifficultyLevel), // Supondo que DifficultyLevel esteja definido em algum lugar
  tags: z.array(z.string()).optional(),
});

export const AssignedWorkoutTemplate = z.object({
  studentId: z.string().min(1, {
    message: "Selecione um aluno",
  }),
  startDate: z.date(),
  endDate: z.date(),
  notes: z.string().optional(),
  isActive: z.boolean().default(true),
});

export const WorkoutTemplateSchema = z.discriminatedUnion("isReusable", [
  TemplateBasicSchema.extend({
    isReusable: z.literal(true),
    config: ReusableConfigSchema,
    days: z.array(WorkoutDaySchema).min(1),
  }),

  TemplateBasicSchema.extend({
    isReusable: z.literal(false),
    assigned: AssignedWorkoutTemplate,
    config: ReusableConfigSchema,
    days: z.array(WorkoutDaySchema).min(1),
  }),
]);

export type WorkoutTemplateFormValues = z.infer<typeof WorkoutTemplateSchema>;

export const NewStudentSchema = z.object({
  email: z.string().email({
    message: "Insira um email",
  }),
  password: z.string().min(6, {
    message: "Insira a senha, minímo 6 caracteres",
  }),
  name: z.string().min(4, {
    message: "Ínsira um nome",
  }),
  phone: z.string().optional(),
  birthDate: z.coerce.date(),
  role: z.nativeEnum(Role).default("STUDENT"),
  injuries: z.array(z.string()),
  status: z.nativeEnum(Status).default("ACTIVE"),
  trainingFormat: z.nativeEnum(TrainingFormat).default("IN_PERSON"),
});

export type NewStudenFormValues = z.infer<typeof NewStudentSchema>;
