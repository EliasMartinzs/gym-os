"use client";

import { MuscleGroup } from "@prisma/client";
import { Badge } from "@/components/ui/badge";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface MuscleGroupMultiSelectProps {
  selected: string[];
  onChange: (value: string[]) => void;
}

export function MuscleGroupMultiSelect({
  selected,
  onChange,
}: MuscleGroupMultiSelectProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {selected.length > 0 ? (
            <div className="flex gap-1 flex-wrap">
              {selected.map((value) => (
                <Badge key={value} variant="secondary">
                  {value}
                </Badge>
              ))}
            </div>
          ) : (
            "Selecione grupos musculares..."
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandGroup>
            {Object.values(MuscleGroup).map((group) => (
              <CommandItem
                key={group}
                onSelect={() => {
                  onChange(
                    selected.includes(group)
                      ? selected.filter((item) => item !== group)
                      : [...selected, group]
                  );
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    selected.includes(group) ? "opacity-100" : "opacity-0"
                  )}
                />
                {group}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
