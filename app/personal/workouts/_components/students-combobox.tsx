"use client";

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
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface StudentsComboboxProps {
  students: { id: string; name: string }[];
  selected: string | undefined;
  onSelect: (value: string) => void;
}

export function StudentsCombobox({
  students,
  selected,
  onSelect,
}: StudentsComboboxProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full h-12 justify-between"
        >
          {selected
            ? students.find((student) => student.id === selected)?.name
            : "Selecione um aluno..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Buscar aluno..." />
          <CommandEmpty>Nenhum aluno encontrado.</CommandEmpty>
          <CommandGroup>
            {students.map((student) => (
              <CommandItem
                key={student.id}
                value={student.id}
                onSelect={() => {
                  onSelect(student.id);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    selected === student.id ? "opacity-100" : "opacity-0"
                  )}
                />
                {student.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
