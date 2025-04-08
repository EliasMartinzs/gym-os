import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ALL_EXERCISES } from "@/constants/exercises";
import { cn } from "@/lib/utils";
import { WorkoutTemplateFormValues } from "@/lib/validations";
import { Check, ChevronsUpDown, PlusCircle, Trash2 } from "lucide-react";
import { useFieldArray, UseFormReturn } from "react-hook-form";

export const ExerciseListForm = ({
  form,
  dayIndex,
}: {
  form: UseFormReturn<WorkoutTemplateFormValues>;
  dayIndex: number;
}) => {
  const { control } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: `days.${dayIndex}.exercises`,
  });

  const addNewExercise = () => {
    append({
      exerciseId: "",
      reps: "",
      rest: 0,
      sets: 0,
    });
  };

  return (
    <div className="space-y-4 pb-4">
      <div className="flex justify-between items-center">
        <h4 className="font-medium">Exercícios</h4>
        <Button type="button" size="sm" onClick={addNewExercise}>
          Adicionar Exercício <PlusCircle />
        </Button>
      </div>

      <div className="flex flex-wrap gap-4">
        {fields.map((exercise, exerciseIndex) => (
          <div
            key={exercise.id}
            className="space-y-4 shadow-4xl border ml-2 rounded-3xl p-4 xl:p-8 w-fit"
          >
            <div className="flex justify-between items-center">
              <h5 className="font-medium">Exercício {exerciseIndex + 1}</h5>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => remove(exerciseIndex)}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            {/* Seleção de Exercício */}
            <FormField
              control={control}
              name={`days.${dayIndex}.exercises.${exerciseIndex}.exerciseId`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Exercício</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value || "Selecione o exercicio"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="p-0">
                      <Command>
                        <CommandInput placeholder="Busque os exercicios..." />
                        <CommandList>
                          <CommandEmpty>
                            Nenhum exercicio encontrado.
                          </CommandEmpty>
                          <CommandGroup>
                            {ALL_EXERCISES.map((exercise, index) => (
                              <CommandItem
                                value={exercise.name}
                                key={index}
                                onSelect={() => {
                                  form.setValue(
                                    `days.${dayIndex}.exercises.${exerciseIndex}.exerciseId`,
                                    exercise.name
                                  );
                                }}
                              >
                                {exercise.name}
                                <Check
                                  className={cn(
                                    "ml-auto",
                                    exercise.name === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Séries */}
            <FormField
              control={control}
              name={`days.${dayIndex}.exercises.${exerciseIndex}.sets`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Séries</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="1"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseInt(e.target.value) || 0)
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Repetições */}
            <FormField
              control={control}
              name={`days.${dayIndex}.exercises.${exerciseIndex}.reps`}
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

            {/* Descanso */}
            <FormField
              control={control}
              name={`days.${dayIndex}.exercises.${exerciseIndex}.rest`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descanso (segundos)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="0"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseInt(e.target.value) || 0)
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
  );
};
