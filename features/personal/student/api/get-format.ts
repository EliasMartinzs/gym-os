import client from "@/lib/client";
import { useQuery } from "@tanstack/react-query";

export const getFormat = () => {
  const query = useQuery({
    queryKey: ["format"],
    queryFn: async () => {
      const response = await client.api.personal.format.$get();

      if (!response.ok) {
        return {
          success: false,
          message: "Houve um erro ao buscar os formatos de treino",
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
