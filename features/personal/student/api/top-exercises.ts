import client from "@/lib/client";
import { useQuery } from "@tanstack/react-query";

export const getTopExercises = () => {
  const query = useQuery({
    queryKey: ["top-exercises"],
    queryFn: async () => {
      const response = await client.api.personal["top-exercises"].$get();

      const result = await response.json();

      if (!result.success) {
        return {
          success: false,
          message: result.message,
          data: null,
        };
      }

      return result;
    },
  });
  return query;
};
