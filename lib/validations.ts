import { z } from "zod";
import {
  FitnessGoal,
  DifficultyLevel,
  DayOfWeek,
  MuscleGroup,
  Role,
  Status,
  TrainingFormat,
  LocationType,
  SessionStatus,
  TrainingPhase,
  PriorityLevel,
  RecurrencePattern,
  RecurrenceEnd,
} from "@prisma/client";

const MonthlyMode = z.enum(["day", "week"]);

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

export const SessionSchema = z.object({
  studentId: z.string().min(1, "Selecione o aluno"),
  workoutTemplateId: z.string().min(1, ""),
  assignedWorkoutTemplateId: z.string().min(1, ""),
  startAt: z.date({
    required_error: "A data e hora incial é obrigatória",
    invalid_type_error: "Deve ser uma data válida",
  }),
  endAt: z.date({
    required_error: "A data e hora final é obrigatória",
    invalid_type_error: "Deve ser uma data válida",
  }),
  locationType: z
    .nativeEnum(LocationType, {
      required_error: "Selecione o tipo de atendimento",
    })
    .default("IN_PERSON"),
  street: z.string().optional(),
  number: z.string().optional(),
  neighborhood: z.string().optional(),
  city: z.string().optional(),
  postalCode: z.string().optional(),
  status: z
    .nativeEnum(SessionStatus, {
      required_error: "Selecione o status do atendimento",
    })
    .default("SCHEDULED"),
  phase: z
    .nativeEnum(TrainingPhase, {
      required_error: "Selecione a periodização do treino",
    })
    .default("BASE"),
  priority: z
    .nativeEnum(PriorityLevel, {
      required_error: "Selecione a prioridade do atendimento",
    })
    .default("MEDIUM"),
  observations: z.string().optional(),
});

export type SessionFormValues = z.infer<typeof SessionSchema>;

const DailySettings = z
  .object({
    weekdays: z.boolean().optional().default(false),
  })
  .strict();

const WeeklySettings = z
  .object({
    daysOfWeek: z
      .nativeEnum(DayOfWeek, {
        required_error: "Selecione um dia",
      })
      .default("MONDAY"),
  })
  .strict();

const MonthlySettings = z
  .object({
    dayOfMonth: z.number().int().min(1).max(31, "Dia inválido"),
    mode: MonthlyMode.optional().default("day"),
  })
  .strict();

export const RecurrenceSchema = z
  .object({
    pattern: z
      .nativeEnum(RecurrencePattern, {
        required_error: "Selecione o padrão de recorrência",
      })
      .default("DAILY"),
    interval: z.number().min(1, "Intervalo inválido"),
    daily: z.preprocess(
      (val) => (typeof val === "string" ? JSON.parse(val) : val),
      DailySettings.optional()
    ),
    weekly: z.preprocess(
      (val) => (typeof val === "string" ? JSON.parse(val) : val),
      WeeklySettings.optional()
    ),
    monthly: z.preprocess(
      (val) => (typeof val === "string" ? JSON.parse(val) : val),
      MonthlySettings.optional()
    ),
    startDate: z.date().optional(),
    endCondition: z
      .nativeEnum(RecurrenceEnd, {
        required_error: "Selecione quando termina a recorrência do atendimento",
      })
      .default("NEVER"),
  })
  .refine(
    (data) => {
      if (data.pattern === "DAILY" && !data.daily) {
        throw new Error("Configuração diária é obrigatória");
      }
      return true;
    },
    {
      path: ["daily"],
    }
  )
  .refine(
    (data) => {
      if (data.pattern === "WEEKLY" && !data.weekly) {
        throw new Error("Configuração semanal é obrigatória");
      }
      return true;
    },
    {
      path: ["weekly"],
    }
  )
  .refine(
    (data) => {
      if (data.pattern === "MONTHLY" && !data.monthly) {
        throw new Error("Configuração mensal é obrigatória");
      }
      return true;
    },
    {
      path: ["monthly"],
    }
  )
  .refine(
    (data) => {
      const activePattern = data.pattern.toLowerCase();
      return !data.daily || activePattern === "daily";
    },
    {
      message: "Configuração diária não deve ser enviada para este padrão",
      path: ["daily"],
    }
  )
  .refine(
    (data) => {
      const activePattern = data.pattern.toLowerCase();
      return !data.weekly || activePattern === "weekly";
    },
    {
      message: "Configuração semanal não deve ser enviada para este padrão",
      path: ["weekly"],
    }
  )
  .refine(
    (data) => {
      const activePattern = data.pattern.toLowerCase();
      return !data.monthly || activePattern === "monthly";
    },
    {
      message: "Configuração mensal não deve ser enviada para este padrão",
      path: ["monthly"],
    }
  );

export type RecurrenceFormValues = z.infer<typeof RecurrenceSchema>;

export const FullSessionSchema = z.object({
  session: SessionSchema,
  recurrence: RecurrenceSchema,
});

export type FullSessionFormValues = z.infer<typeof FullSessionSchema>;
