"use client";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ALL_EXERCISES } from "@/constants/exercises";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";

interface ExercisesSelectProps {
  selectedExercise: string; // Agora será o name do exercício
  onChange: (exerciseName: string) => void;
  className?: string;
  muscleGroupFilter?: string;
}

export function ExercisesSelect({
  selectedExercise,
  onChange,
  className,
  muscleGroupFilter,
}: ExercisesSelectProps) {
  const [open, setOpen] = useState(false);

  // Filtra exercícios por grupo muscular se fornecido
  const filteredExercises = muscleGroupFilter
    ? ALL_EXERCISES.filter((ex) => ex.muscle === muscleGroupFilter)
    : ALL_EXERCISES;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-full justify-between", className)}
        >
          {selectedExercise
            ? ALL_EXERCISES.find(
                (exercise) => exercise.name === selectedExercise
              )?.name
            : "Selecione um exercício..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Buscar exercício..." />
          <CommandEmpty>Nenhum exercício encontrado.</CommandEmpty>
          <CommandGroup className="max-h-60 overflow-y-auto">
            {filteredExercises.map((exercise) => (
              <CommandItem
                key={exercise.name}
                value={exercise.name}
                onSelect={() => {
                  onChange(exercise.name);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    selectedExercise === exercise.name
                      ? "opacity-100"
                      : "opacity-0"
                  )}
                />
                <div className="flex flex-col">
                  <span>{exercise.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {exercise.muscle} • {exercise.equipment} •{" "}
                    {exercise.difficulty}
                  </span>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
