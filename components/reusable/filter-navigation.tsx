"use client";

import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";

interface FilterNavigationProps<
  T extends string,
  E extends Record<string, string>
> {
  title: string;
  filterType: T;
  enumObject: E;
  updateQueryParams: (filterType: T, value: keyof E & string) => void;
}

export const FilterNavigation = <
  T extends string,
  E extends Record<string, string>
>({
  title,
  filterType,
  enumObject,
  updateQueryParams,
}: FilterNavigationProps<T, E>) => {
  const searchParams = useSearchParams();
  return (
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
};
