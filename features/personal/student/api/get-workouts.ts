import client from "@/lib/client";
import { useQuery } from "@tanstack/react-query";

export const getWorkouts = () => {
  const query = useQuery({
    queryKey: ["workouts"],
    queryFn: async () => {
      const response = await client.api.personal.workouts.$get();

      if (!response.ok) {
        return {
          success: false,
          message: "Houve um erro ao buscar seus workouts",
          data: null,
        };
      }

      return await response.json();
    },
  });
  return query;
};
