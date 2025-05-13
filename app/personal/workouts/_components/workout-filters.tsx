"use client";

import { EnumTranslations } from "@/lib/enum-tranlations";
import { useSearchParams } from "next/navigation";
import { DifficultyLevel, FitnessGoal } from "@prisma/client";
import { FilterNavigation } from "@/components/reusable/filter-navigation";
import { useQueryParams } from "@/hooks/use-query-params";
import { Button } from "@/components/ui/button";

export type FilterType = "goal" | "difficulty";

export const WorkoutFilters = () => {
  const searchParams = useSearchParams();

  const { updateQueryParams, clearFilter } = useQueryParams<FilterType>();

  return (
    <div className="space-y-4 mb-4">
      <h6 className="text-xl font-medium">Filtros</h6>
      <div className="flex items-center gap-x-4">
        <FilterNavigation
          title={
            EnumTranslations.FitnessGoal[
              searchParams.get("goal") as FitnessGoal
            ] || "Objetivos"
          }
          filterType="goal"
          enumObject={EnumTranslations.FitnessGoal}
          updateQueryParams={updateQueryParams}
        />

        <FilterNavigation
          title={
            EnumTranslations.DifficultyLevel[
              searchParams.get("difficulty") as DifficultyLevel
            ] || "Dificuldade"
          }
          filterType="difficulty"
          enumObject={EnumTranslations.DifficultyLevel}
          updateQueryParams={updateQueryParams}
        />

        <Button variant="ghost" onClick={() => clearFilter()}>
          Limpar filtros
        </Button>
      </div>
    </div>
  );
};
