import { Button, buttonVariants } from "@/components/ui/button";
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
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EnumTranslations, SelectOptions } from "@/lib/enum-tranlations";
import { cn } from "@/lib/utils";
import { WorkoutTemplateFormValues } from "@/lib/validations";
import NoDataImg from "@/public/undraw_no-data_ig65.svg";
import { MuscleGroup } from "@prisma/client";
import { Check, ChevronsUpDown, PlusCircle, Trash2 } from "lucide-react";
import Image from "next/image";
import { useFieldArray, UseFormReturn } from "react-hook-form";
import { ExerciseListForm } from "./exercise-list-form";

interface Props {
  form: UseFormReturn<WorkoutTemplateFormValues>;
}

export const Step4Workout = ({ form }: Props) => {
  const { control, watch } = form;
  const {
    fields: days,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "days",
  });

  const watchDays = watch("days");

  const addNewDay = async () => {
    append({
      name: "",
      dayOfWeek: "MONDAY",
      focusMuscle: [],
      exercises: [
        {
          exerciseId: "",
          reps: "",
          rest: "",
          sets: "",
          difficulty: "BEGINNER",
          equipment: "",
          instructions: "",
          muscle: "",
          name: "",
          type: "",
        },
      ],
    });
  };

  const removeDay = (index: number) => {
    remove(index);
  };

  return (
    <div className="space-y-4 overflow-x-hidden">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Dias de Treino</h3>
        <Button type="button" size="sm" onClick={addNewDay}>
          Adicionar Dia <PlusCircle />
        </Button>
      </div>

      {days.length > 0 ? (
        <Tabs defaultValue="0" className="w-full">
          <TabsList className="h-auto flex flex-wrap gap-4 mb-4">
            {days.map((day, dayIndex) => (
              <TabsTrigger
                key={day.id}
                value={dayIndex.toString()}
                className={buttonVariants({
                  className: "flex justify-between items-center gap-2",
                  variant: "outline",
                  size: "sm",
                })}
              >
                {EnumTranslations.DayOfWeek[watchDays[dayIndex]?.dayOfWeek] ||
                  `Dia ${dayIndex + 1}`}

                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    removeDay(dayIndex);
                  }}
                  className="cursor-pointer"
                >
                  <Trash2 className="h-4 w-4" />
                </div>
              </TabsTrigger>
            ))}
          </TabsList>

          {days.map((day, dayIndex) => (
            <TabsContent key={day.id} value={dayIndex.toString()}>
              <div className="space-y-4">
                {/* Nome do Dia */}
                <FormField
                  control={control}
                  name={`days.${dayIndex}.name`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Ex: Peito e Tríceps" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex items-start gap-x-4">
                  {/* Dia da Semana */}
                  <FormField
                    control={control}
                    name={`days.${dayIndex}.dayOfWeek`}
                    render={({ field }) => (
                      <FormItem>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione o dia" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {SelectOptions.DayOfWeek.map((option) => (
                              <SelectItem
                                key={option.value}
                                value={option.value}
                              >
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Grupos Musculares */}
                  <FormField
                    control={control}
                    name={`days.${dayIndex}.focusMuscle`}
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
                                  !field.value?.length &&
                                    "text-muted-foreground"
                                )}
                              >
                                {field.value?.length
                                  ? `${field.value.length} selecionado(s)`
                                  : "Selecione os grupos"}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="p-0">
                            <Command>
                              <CommandInput placeholder="Buscar grupo muscular..." />
                              <CommandList>
                                <CommandEmpty>
                                  Nenhum grupo encontrado.
                                </CommandEmpty>
                                <CommandGroup>
                                  {SelectOptions.MuscleGroup.map((muscle) => (
                                    <CommandItem
                                      value={muscle.label}
                                      key={muscle.value}
                                      onSelect={() => {
                                        const currentValues = field.value || [];
                                        const newValue = currentValues.includes(
                                          muscle.value as MuscleGroup
                                        )
                                          ? currentValues.filter(
                                              (v) => v !== muscle.value
                                            )
                                          : [...currentValues, muscle.value];
                                        form.setValue(
                                          `days.${dayIndex}.focusMuscle`,
                                          newValue as MuscleGroup[]
                                        );
                                      }}
                                    >
                                      {muscle.label}
                                      <Check
                                        className={cn(
                                          "ml-auto",
                                          field.value?.includes(
                                            muscle.value as MuscleGroup
                                          )
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

                        {/* Mostra os grupos selecionados como tags */}
                        <div className="flex flex-wrap gap-1 my-2">
                          {field.value?.map((muscleValue) => {
                            const muscle = SelectOptions.MuscleGroup.find(
                              (m) => m.value === muscleValue
                            );
                            return (
                              <div key={muscleValue}>
                                <small className="py-1 px-2 border rounded-2xl">
                                  {muscle?.label}
                                </small>
                                <button
                                  type="button"
                                  onClick={() => {
                                    const newValue = field.value.filter(
                                      (v) => v !== muscleValue
                                    );
                                    form.setValue(
                                      `days.${dayIndex}.focusMuscle`,
                                      newValue
                                    );
                                  }}
                                  className="ml-2 text-white"
                                >
                                  ×
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      </FormItem>
                    )}
                  />
                </div>

                {/* Exercícios */}
                <ExerciseListForm form={form} dayIndex={dayIndex} />
              </div>
            </TabsContent>
          ))}
        </Tabs>
      ) : (
        <div className="text-center text-muted-foreground py-8 w-full mx-auto flex flex-col items-center justify-center gap-8">
          Adicione pelo menos um dia de treino
          <Image
            src={NoDataImg}
            height={256}
            width={256}
            className="object-cover object-center opacity-50"
            loading="lazy"
            alt="no data"
          />
        </div>
      )}
    </div>
  );
};
