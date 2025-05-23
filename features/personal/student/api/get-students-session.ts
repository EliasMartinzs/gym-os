import client from "@/lib/client";
import { useQuery } from "@tanstack/react-query";

export const getStudentsSession = () => {
  const query = useQuery({
    queryKey: ["students-session"],
    queryFn: async () => {
      const response = await client.api.personal["students-session"].$get();

      if (!response.ok) {
        return {
          success: false,
          message: "Houve um erro",
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
