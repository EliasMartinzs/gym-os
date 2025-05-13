import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export function useQueryParams<T extends string = string>() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const updateQueryParams = useCallback(
    (filterType: T, value: string) => {
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

  const clearFilter = useCallback(
    (filterType?: T | T[]) => {
      const params = new URLSearchParams(searchParams.toString());

      if (filterType) {
        if (Array.isArray(filterType)) {
          filterType.forEach((filter) => params.delete(filter));
        } else {
          params.delete(filterType);
        }
      } else {
        const allParams = Array.from(searchParams.keys());
        allParams.forEach((param) => params.delete(param));
      }

      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [pathname, router, searchParams]
  );

  return {
    updateQueryParams,
    clearFilter,
  };
}
