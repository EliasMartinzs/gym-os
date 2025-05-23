import client from "@/lib/client";
import { useQuery } from "@tanstack/react-query";

export const getWorkouts = (filters?: URLSearchParams) => {
  const query = useQuery({
    queryKey: ["workouts", filters?.toString()],
    queryFn: async () => {
      const paramsObject = filters ? Object.fromEntries(filters.entries()) : {};

      const response = await client.api.personal.workouts.$get({
        query: paramsObject,
      });

      if (!response.ok) {
        return {
          success: false,
          message: "Houve um erro ao buscar seus workouts",
          data: null,
        };
      }

      return await response.json();
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 2,
    retryDelay: 1000,
  });
  return query;
};
