"use client";

import { ResponsiveModal } from "@/components/reusable/responsive-modal";
import { Edit, Edit2 } from "lucide-react";
import React from "react";
import { fakeTemplates } from "./workout-templates";

import {
  WorkoutTemplate,
  FitnessGoal,
  DifficultyLevel,
  Prisma,
} from "@prisma/client";
import {
  workoutTemplateFormEditSchema,
  WorkoutTemplateFormEditValues,
} from "@/lib/validations";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { StudentsCombobox } from "./students-combobox";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MuscleGroupMultiSelect } from "./muscle-group-multi-select";
import { Button } from "@/components/ui/button";
import { MultiSelect } from "./multi-select";
import { DaysOfWeekSelect } from "./days-of-week-select";
import { ExercisesSelect } from "./exercises-select";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EnumTranslations, SelectOptions } from "@/lib/enum-tranlations";
import { getTranslatedOptions } from "@/hooks/use-translations-options";

interface WorkoutTemplateFormProps {
  template: WorkoutTemplate & {
    days: {
      id: string;
      name: string;
      dayOfWeek: string | null;
      order: number;
      focusMuscle: string[];
      ExerciseInWorkout: {
        exerciseId: string;
        sets: number;
        reps: string;
        rest: number | null;
      }[];
    }[];
  };
  students: { id: string; name: string }[];
}

export type WithEnums<T> = T & {
  goal: FitnessGoal[];
  level: DifficultyLevel | null;
};

type WorkoutTemplateWithRelations = WithEnums<
  Prisma.WorkoutTemplateGetPayload<{
    include: {
      days: {
        include: {
          ExerciseInWorkout: {
            include: {
              exercise: true;
            };
          };
        };
      };
    };
  }>
>;

interface WorkoutEditProps {
  workout: WorkoutTemplateWithRelations;
  students: {
    id: string;
    name: string;
  }[];
}

export const WorkoutEdit = ({ workout, students }: WorkoutEditProps) => {
  return (
    <ResponsiveModal title="Template" trigger={<Edit />}>
      <WorkoutTemplateForm template={workout} students={students} />
    </ResponsiveModal>
  );
};

export function WorkoutTemplateForm({
  template,
  students,
}: WorkoutTemplateFormProps) {
  const form = useForm<WorkoutTemplateFormEditValues>({
    resolver: zodResolver(workoutTemplateFormEditSchema),
    defaultValues: {
      name: template.name,
      description: template.description || "",
      isReusable: template.isReusable,
      goal: undefined,
      level: undefined,
      studentId: template.studentId || undefined,
      days: template.days.map((day) => ({
        id: day.id,
        name: day.name,
        dayOfWeek: day.dayOfWeek || undefined,
        order: day.order,
        focusMuscle: day.focusMuscle,
        exercises: day.ExerciseInWorkout.map((ex) => ({
          id: ex.exerciseId,
          sets: ex.sets,
          reps: ex.reps,
          rest: ex.rest || undefined,
        })),
      })),
    },
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "days",
  });

  const onSubmit = (data: WorkoutTemplateFormEditValues) => {
    console.log(data);
    // Lógica para salvar o template
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Informações Básicas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome do Template</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descrição</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Configurações do Template */}
        <div className="grid grid-cols-1 xl:flex gap-4">
          <FormField
            control={control}
            name="goal"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Objetivo</FormLabel>
                <FormControl>
                  <MultiSelect
                    options={SelectOptions.FitnessGoal}
                    selected={field.value || []}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="level"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nível</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione..." />
                    </SelectTrigger>
                    <SelectContent>
                      {SelectOptions.DifficultyLevel.map((level) => (
                        <SelectItem key={level.value} value={level.value}>
                          {level.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="studentId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Aluno (opcional)</FormLabel>
                <FormControl>
                  <StudentsCombobox
                    students={students}
                    selected={field.value}
                    onSelect={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Dias de Treino */}
        <div className="space-y-6">
          {fields.map((day, dayIndex) => (
            <div key={day.id} className="border rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <FormField
                  control={control}
                  name={`days.${dayIndex}.name`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome do Dia</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name={`days.${dayIndex}.dayOfWeek`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Dia da Semana</FormLabel>
                      <FormControl>
                        <DaysOfWeekSelect
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name={`days.${dayIndex}.order`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ordem</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min={0}
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseInt(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name={`days.${dayIndex}.focusMuscle`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Grupos Musculares</FormLabel>
                      <FormControl>
                        <MuscleGroupMultiSelect
                          selected={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Exercícios */}
              <div className="space-y-4">
                {day.exercises.map((exercise, exIndex) => (
                  <div
                    key={exIndex}
                    className="grid grid-cols-1 md:grid-cols-4 gap-4"
                  >
                    <FormField
                      control={control}
                      name={`days.${dayIndex}.exercises.${exIndex}.id`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Exercício</FormLabel>
                          <FormControl>
                            <ExercisesSelect
                              selectedExercise={field.value}
                              onChange={field.onChange}
                              muscleGroupFilter="abs"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={control}
                      name={`days.${dayIndex}.exercises.${exIndex}.sets`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Séries</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min={1}
                              {...field}
                              onChange={(e) =>
                                field.onChange(parseInt(e.target.value))
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={control}
                      name={`days.${dayIndex}.exercises.${exIndex}.reps`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Repetições</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={control}
                      name={`days.${dayIndex}.exercises.${exIndex}.rest`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Descanso (segundos)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min={0}
                              {...field}
                              onChange={(e) =>
                                field.onChange(parseInt(e.target.value))
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline">
            Cancelar
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Salvando..." : "Salvar Alterações"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
