"use client";

import { EnumTranslations } from "@/lib/enum-tranlations";
import { useSearchParams } from "next/navigation";
import { RecurrencePattern, DayOfWeek, ScheduleType } from "@prisma/client";
import { FilterNavigation } from "@/components/reusable/filter-navigation";
import { useQueryParams } from "@/hooks/use-query-params";
import { Button } from "@/components/ui/button";

export type FilterType = "repeat" | "daysOfWeek" | "scheduleType";

export const SessionsFilters = () => {
  const searchParams = useSearchParams();

  const { updateQueryParams, clearFilter } = useQueryParams<FilterType>();

  return (
    <div className="space-y-4 mb-4">
      <h6 className="text-xl font-medium">Filtros</h6>
      <div className="flex items-center gap-x-4">
        <FilterNavigation
          title={
            EnumTranslations.RecurrencePattern[
              searchParams.get("repeat") as RecurrencePattern
            ] || "Ocorrência"
          }
          filterType="repeat"
          enumObject={EnumTranslations.RecurrencePattern}
          updateQueryParams={updateQueryParams}
        />
        <FilterNavigation
          title={
            EnumTranslations.DayOfWeek[
              searchParams.get("daysOfWeek") as DayOfWeek
            ] || "Dia da semana"
          }
          filterType="daysOfWeek"
          enumObject={EnumTranslations.DayOfWeek}
          updateQueryParams={updateQueryParams}
        />
        <FilterNavigation
          title={
            EnumTranslations.ScheduleType[
              searchParams.get("scheduleType") as ScheduleType
            ] || "Tipo"
          }
          filterType="scheduleType"
          enumObject={EnumTranslations.ScheduleType}
          updateQueryParams={updateQueryParams}
        />

        <Button
          variant="ghost"
          className="cursor-pointer"
          onClick={() => clearFilter()}
        >
          Limpar filtros
        </Button>
      </div>
    </div>
  );
};
