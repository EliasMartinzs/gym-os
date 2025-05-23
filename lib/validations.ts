import {
  DayOfWeek,
  DifficultyLevel,
  FitnessGoal,
  MuscleGroup,
  Role,
  Status,
  TrainingFormat,
} from "@prisma/client";
import { z } from "zod";

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
  exerciseId: z.string().min(1, {
    message: "Exercício é obrigatório",
  }),
  sets: z.string().min(1, { message: "Mínimo 1 série" }),
  reps: z.string().min(1, { message: "Repetições são obrigatórias" }),
  rest: z.string().min(0, { message: "Não pode ser negativo" }).optional(),
  name: z.string().optional(),
  type: z.string().min(1, { message: "insira o tipo do exercicio" }),
  muscle: z.string().min(1, { message: "insira o musculo do exercicio" }),
  equipment: z
    .string()
    .min(1, { message: "insira o equipamento do exercicio" }),
  difficulty: z
    .string()
    .min(1, { message: "insira a dificuldade do exercicio" }),
  instructions: z
    .string()
    .min(1, { message: "insira as instruçoes do exercicio" }),
});

export const WorkoutDaySchema = z.object({
  name: z
    .string({
      required_error: "Dia do treino é obrigatório",
    })
    .min(3, {
      message: "Dia do treino é obrigatório",
    }),
  dayOfWeek: z.nativeEnum(DayOfWeek, {
    message: "Selecione o dia da semana",
  }),
  focusMuscle: z
    .array(z.nativeEnum(MuscleGroup))
    .min(1, { message: "Selecione pelo menos 1 grupo" }),
  exercises: z
    .array(ExerciseSchema)
    .min(1, { message: "Adicione pelo menos 1 exercício" }),
});

export const TemplateBasicSchema = z.object({
  name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  description: z.string().optional(),
  isReusable: z.boolean().default(false),
  isPublic: z.boolean().default(false),
});

export const ReusableConfigSchema = z.object({
  goals: z
    .array(z.nativeEnum(FitnessGoal))
    .min(1, "Selecione pelo menos 1 objetivo"),
  level: z.nativeEnum(DifficultyLevel, {
    message: "Selecione o nível de dificuldade",
  }),
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
    days: z.array(WorkoutDaySchema),
  }),

  TemplateBasicSchema.extend({
    isReusable: z.literal(false),
    assigned: AssignedWorkoutTemplate,
    config: ReusableConfigSchema,
    days: z.array(WorkoutDaySchema),
  }),
]);

export type WorkoutTemplateFormValues = z.infer<typeof WorkoutTemplateSchema>;

export const NewStudentSchema = z.object({
  email: z.string().email({
    message: "Insira um email",
  }),
  password: z.string().min(8, {
    message: "Insira a senha, minímo 6 caracteres",
  }),
  name: z.string().min(4, {
    message: "Ínsira um nome",
  }),
  gender: z.enum(["MALE", "FEMALE"]),
  phone: z.string().optional(),
  birthDate: z.coerce.date(),
  role: z.nativeEnum(Role).default("STUDENT"),
  injuries: z.array(z.string()),
  status: z.nativeEnum(Status).default("ACTIVE"),
  trainingFormat: z.nativeEnum(TrainingFormat).default("IN_PERSON"),
});

export type NewStudenFormValues = z.infer<typeof NewStudentSchema>;
