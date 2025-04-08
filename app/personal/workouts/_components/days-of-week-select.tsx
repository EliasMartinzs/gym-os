"use client";

import { DayOfWeek } from "@prisma/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DaysOfWeekSelectProps {
  value?: string;
  onChange: (value: DayOfWeek | "") => void;
  placeholder?: string;
}

const dayOfWeekLabels: Record<DayOfWeek, string> = {
  MONDAY: "Segunda-feira",
  TUESDAY: "Terça-feira",
  WEDNESDAY: "Quarta-feira",
  THURSDAY: "Quinta-feira",
  FRIDAY: "Sexta-feira",
  SATURDAY: "Sábado",
  SUNDAY: "Domingo",
};

export function DaysOfWeekSelect({
  value,
  onChange,
  placeholder = "Selecione o dia",
}: DaysOfWeekSelectProps) {
  return (
    <Select
      value={value || ""}
      onValueChange={(val) => onChange((val as DayOfWeek) || "")}
    >
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {Object.entries(dayOfWeekLabels).map(([dayValue, dayLabel]) => (
          <SelectItem key={dayValue} value={dayValue}>
            {dayLabel}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
