import {
  DayOfWeek,
  LocationType,
  PriorityLevel,
  RecurrencePattern,
  ScheduleType,
  SessionStatus,
} from "@prisma/client";
import z from "zod";

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
