import {
  DayOfWeek,
  DifficultyLevel,
  FitnessGoal,
  LocationType,
  MuscleGroup,
  PriorityLevel,
  RecurrencePattern,
  Role,
  ScheduleType,
  SessionStatus,
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
  exerciseId: z.string().min(1, "Exercício é obrigatório"),
  sets: z.number().min(1, "Mínimo 1 série"),
  reps: z.string().min(1, "Repetições são obrigatórias"),
  rest: z.number().min(0, "Não pode ser negativo").optional(),
  name: z.string().optional(),
  type: z.string().min(1, "insira o tipo do exercicio"),
  muscle: z.string().min(1, "insira o musculo do exercicio"),
  equipment: z.string().min(1, "insira o equipamento do exercicio"),
  difficulty: z.string().min(1, "insira a dificuldade do exercicio"),
  instructions: z.string().min(1, "insira as instruçoes do exercicio"),
});

export const WorkoutDaySchema = z.object({
  name: z.string().min(1, "Dia do treino é obrigatório"),
  dayOfWeek: z.nativeEnum(DayOfWeek),
  focusMuscle: z
    .array(z.nativeEnum(MuscleGroup))
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
    .array(z.nativeEnum(FitnessGoal))
    .min(1, "Selecione pelo menos 1 objetivo"),
  level: z.nativeEnum(DifficultyLevel),
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
  password: z.string().min(6, {
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

const SessionCommonSessionFields = z.object({
  studentId: z.string().min(1, {
    message: "Escolha um aluno",
  }),
  workoutTemplateId: z.string().min(1),
  assignedWorkoutTemplateId: z.string().min(1),
  status: z.nativeEnum(SessionStatus, {
    message: "Escolha o status do atendimento",
  }),
  priority: z.nativeEnum(PriorityLevel, {
    message: "Selecione a prioridade do atendimento",
  }),
  observations: z.string().optional(),
});

const OnlineSession = z.object({
  locationType: z.literal(LocationType.ONLINE),
});

const AddressRequiredSession = z.object({
  locationType: z.enum([
    LocationType.IN_PERSON,
    LocationType.HYBRID,
    LocationType.OUTDOOR,
  ]),
  street: z.string().min(1, "Rua é obrigatória"),
  number: z.string().min(1, "Número é obrigatório"),
  neighborhood: z.string().min(1, "Bairro é obrigatório"),
  city: z.string().min(1, "Cidade é obrigatória"),
  postalCode: z.string().min(1, "CEP é obrigatório"),
});

const LocationSpecificSchema = z.discriminatedUnion("locationType", [
  OnlineSession,
  AddressRequiredSession,
]);

export const SessionSchema = LocationSpecificSchema.and(
  SessionCommonSessionFields
);

export type SessionFormValues = z.infer<typeof SessionSchema>;

const baseRecurrenceSchema = z.object({
  startDate: z.coerce.date({
    required_error: "Data de início é obrigatória",
    invalid_type_error: "Formato de data inválido (use YYYY-MM-DD)",
  }),
  endDate: z.coerce.date().optional(),
  durationMinutes: z
    .number()
    .int("Duração deve ser um número inteiro")
    .min(30, "Mínimo de 30 minutos por sessão")
    .max(180, "Máximo de 3 horas por sessão"),
  hours: z.string().min(1, {
    message: "Horario do atendimento",
  }),
});

const dailySchema = baseRecurrenceSchema.extend({
  repeat: z.literal(RecurrencePattern.DAILY, {
    message: "Selecione o tipo de recorrência",
  }),
  scheduleType: z.nativeEnum(ScheduleType, {
    message: "Selecione o tipo de atendimento",
    invalid_type_error: "Selecione o tipo de atendimento",
    required_error: "Selecione o tipo de atendimento",
  }),
});

const weeklySchema = baseRecurrenceSchema.extend({
  repeat: z.literal(RecurrencePattern.WEEKLY, {
    message: "Selecione o tipo de recorrência",
  }),
  daysOfWeek: z.array(
    z.nativeEnum(DayOfWeek, {
      message: "Selecione no mínimo 1 dia da semana",
    })
  ),
  occurrenceCount: z.number().optional(),
});

const BiWeeklySchema = baseRecurrenceSchema.extend({
  repeat: z.literal(RecurrencePattern.BIWEEKLY, {
    message: "Selecione o tipo de recorrência",
  }),
  durationMinutes: z
    .number()
    .int("Duração deve ser um número inteiro")
    .min(30, "Mínimo de 30 minutos por sessão")
    .max(180, "Máximo de 3 horas por sessão"),
  occurrenceCount: z.number().optional(),
});

const monthlySchema = baseRecurrenceSchema.extend({
  repeat: z.literal(RecurrencePattern.MONTHLY, {
    message: "Selecione o tipo de recorrência",
  }),
  dayOfMonth: z
    .number()
    .int("Dia do mês deve ser um número inteiro")
    .min(1, "Dia mínimo: 1")
    .max(31, "Dia máximo: 31"),
  occurrenceCount: z.number().optional(),
});

export const RecurrenceSchema = z.discriminatedUnion(
  "repeat",
  [dailySchema, weeklySchema, BiWeeklySchema, monthlySchema],
  {
    message: "Selecione o tipo de recorrência",
    invalid_type_error: "Selecione o tipo de recorrência",
    required_error: "Selecione o tipo de recorrência",
  }
);

export const FullSessionSchema = z.object({
  session: SessionSchema,
  recurrence: RecurrenceSchema,
});

export type FullSessionFormValues = z.infer<typeof FullSessionSchema>;
