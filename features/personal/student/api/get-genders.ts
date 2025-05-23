import client from "@/lib/client";
import { useQuery } from "@tanstack/react-query";

export const getGenders = () => {
  const query = useQuery({
    queryKey: ["genders"],
    queryFn: async () => {
      const response = await client.api.personal.genders.$get();

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
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 2,
    retryDelay: 1000,
  });

  return query;
};
