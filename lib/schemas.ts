import { z } from "zod";
import { FitnessGoal, DifficultyLevel } from "@prisma/client";

export const workoutTemplateFormSchema = z.object({
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
        name: z.string().min(2, "Nome do dia deve ter pelo menos 2 caracteres"),
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

export type WorkoutTemplateFormValues = z.infer<
  typeof workoutTemplateFormSchema
>;
