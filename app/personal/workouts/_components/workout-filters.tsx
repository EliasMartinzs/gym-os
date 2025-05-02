"use client";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

import { EnumTranslations } from "@/lib/enum-tranlations";
import { cn } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { DifficultyLevel, FitnessGoal } from "@prisma/client";

export type FilterType = "goal" | "difficulty";

export const WorkoutFilters = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updateQueryParams = useCallback(
    (filterType: FilterType, value: string) => {
      const params = new URLSearchParams(searchParams.toString());

      if (value) {
        params.set(filterType, value);
      } else {
        params.delete(filterType);
      }

      router.push(`${pathname}?${params.toString()}`, { scroll: false });

      router.prefetch(pathname);
    },
    [pathname, router, searchParams]
  );

  const FilterNavigation = ({
    title,
    filterType,
    enumObject,
  }: {
    title: string;
    filterType: FilterType;
    enumObject: Record<string, string>;
  }) => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent">
            {title}
          </NavigationMenuTrigger>
          <NavigationMenuContent className="text-nowrap w-auto">
            {Object.entries(enumObject).map(([key, value]) => (
              <NavigationMenuLink
                className={cn(
                  "cursor-pointer",
                  searchParams.get(filterType) === key &&
                    "text-primary font-medium"
                )}
                key={key}
                onClick={() => updateQueryParams(filterType, key)}
              >
                {value}
              </NavigationMenuLink>
            ))}
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );

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
        />

        <FilterNavigation
          title={
            EnumTranslations.DifficultyLevel[
              searchParams.get("difficulty") as DifficultyLevel
            ] || "Dificuldade"
          }
          filterType="difficulty"
          enumObject={EnumTranslations.DifficultyLevel}
        />
      </div>
    </div>
  );
};
