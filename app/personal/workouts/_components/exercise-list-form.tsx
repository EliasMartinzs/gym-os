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
import { Textarea } from "@/components/ui/textarea";
import {
  ALL_EXERCISES,
  EXERCISE_DIFFICULTY_LEVELS,
  EXERCISE_EQUIPMENT,
  EXERCISE_MUSCLES,
  EXERCISE_TYPES,
} from "@/constants/exercises";
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
  const { fields, remove } = useFieldArray({
    control,
    name: `days.${dayIndex}.exercises`,
  });

  const addExercise = async () => {
    const currentExercises = form.getValues(`days.${dayIndex}.exercises`);
    form.setValue(`days.${dayIndex}.exercises`, [
      ...currentExercises,
      {
        exerciseId: "",
        reps: "",
        rest: "",
        sets: "",
        difficulty: "",
        equipment: "",
        instructions: "",
        muscle: "",
        name: "",
        type: "",
      },
    ]);

    return form.formState.isDirty
      ? form.trigger(`days.${dayIndex}.exercises`)
      : true;
  };

  return (
    <div className="space-y-4 pb-4">
      <div className="flex justify-between items-center">
        <h4 className="font-medium">Exercícios</h4>
        <Button type="button" size="sm" onClick={addExercise}>
          Adicionar Exercício <PlusCircle />
        </Button>
      </div>

      <div className="flex flex-col gap-4">
        {fields.map((exercise, exerciseIndex) => (
          <div key={exercise.id} className="space-y-4 border-t">
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

            <div className="grid grid-cols-1 xl:grid-cols-2 place-items-stretch gap-4">
              {/* Seleção de Exercício */}
              <FormField
                control={control}
                name={`days.${dayIndex}.exercises.${exerciseIndex}.exerciseId`}
                render={({ field }) => (
                  <FormItem>
                    <Popover modal>
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
                      <PopoverContent className="p-0 w-full">
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
                    <FormControl>
                      <Input
                        className="bg-transparent"
                        placeholder="Séries (3)"
                        {...field}
                        type="number"
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
                    <FormControl>
                      <Input
                        className="bg-transparent"
                        placeholder="Repetições (12 - 15)"
                        {...field}
                      />
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
                    <FormControl>
                      <Input
                        className="bg-transparent"
                        placeholder="Descanso (segundos)"
                        {...field}
                        type="number"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Seleção de Dificuldade */}
              <FormField
                control={control}
                name={`days.${dayIndex}.exercises.${exerciseIndex}.difficulty`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dificuldade</FormLabel>
                    <Popover modal>
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
                            {field.value || "Selecione a dificuldade"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="p-0">
                        <Command>
                          <CommandInput placeholder="Busque as dificuldades..." />
                          <CommandList>
                            <CommandEmpty>
                              Nenhuma dificuldade encontrada.
                            </CommandEmpty>
                            <CommandGroup>
                              {EXERCISE_DIFFICULTY_LEVELS.map(
                                (exercise, index) => (
                                  <CommandItem
                                    value={exercise}
                                    key={index}
                                    onSelect={() => {
                                      form.setValue(
                                        `days.${dayIndex}.exercises.${exerciseIndex}.difficulty`,
                                        exercise
                                      );
                                    }}
                                  >
                                    {exercise}
                                    <Check
                                      className={cn(
                                        "ml-auto",
                                        exercise === field.value
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                  </CommandItem>
                                )
                              )}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Seleção de Equipamentos */}
              <FormField
                control={control}
                name={`days.${dayIndex}.exercises.${exerciseIndex}.equipment`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Equipamento</FormLabel>
                    <Popover modal>
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
                            {field.value || "Selecione o equipamento"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="p-0">
                        <Command>
                          <CommandInput placeholder="Busque os equipamentos..." />
                          <CommandList>
                            <CommandEmpty>
                              Nenhum equipamento encontrado.
                            </CommandEmpty>
                            <CommandGroup>
                              {EXERCISE_EQUIPMENT.map((exercise, index) => (
                                <CommandItem
                                  value={exercise}
                                  key={index}
                                  onSelect={() => {
                                    form.setValue(
                                      `days.${dayIndex}.exercises.${exerciseIndex}.equipment`,
                                      exercise
                                    );
                                  }}
                                >
                                  {exercise}
                                  <Check
                                    className={cn(
                                      "ml-auto",
                                      exercise === field.value
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

              {/* Seleção de Musculo */}
              <FormField
                control={control}
                name={`days.${dayIndex}.exercises.${exerciseIndex}.muscle`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Músculo</FormLabel>
                    <Popover modal>
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
                            {field.value || "Selecione o músculo"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="p-0">
                        <Command>
                          <CommandInput placeholder="Busque os equipamentos..." />
                          <CommandList>
                            <CommandEmpty>
                              Nenhum músculo encontrado.
                            </CommandEmpty>
                            <CommandGroup>
                              {EXERCISE_MUSCLES.map((exercise, index) => (
                                <CommandItem
                                  value={exercise}
                                  key={index}
                                  onSelect={() => {
                                    form.setValue(
                                      `days.${dayIndex}.exercises.${exerciseIndex}.muscle`,
                                      exercise
                                    );
                                  }}
                                >
                                  {exercise}
                                  <Check
                                    className={cn(
                                      "ml-auto",
                                      exercise === field.value
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

              {/* Seleção de Tipo */}
              <FormField
                control={control}
                name={`days.${dayIndex}.exercises.${exerciseIndex}.type`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de exercício</FormLabel>
                    <Popover modal>
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
                            {field.value || "Selecione o tipo de exercicio"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="p-0">
                        <Command>
                          <CommandInput placeholder="Busque os equipamentos..." />
                          <CommandList>
                            <CommandEmpty>
                              Nenhum tipo de exercício encontrado.
                            </CommandEmpty>
                            <CommandGroup>
                              {EXERCISE_TYPES.map((exercise, index) => (
                                <CommandItem
                                  value={exercise}
                                  key={index}
                                  onSelect={() => {
                                    form.setValue(
                                      `days.${dayIndex}.exercises.${exerciseIndex}.type`,
                                      exercise
                                    );
                                  }}
                                >
                                  {exercise}
                                  <Check
                                    className={cn(
                                      "ml-auto",
                                      exercise === field.value
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
            </div>

            {/* Intruuções */}
            <FormField
              control={control}
              name={`days.${dayIndex}.exercises.${exerciseIndex}.instructions`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Intruções</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={10}
                      {...field}
                      placeholder="Como fazer o exercício"
                      className="bg-background text-foreground/70"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
