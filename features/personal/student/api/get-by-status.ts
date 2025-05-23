import client from "@/lib/client";
import { useQuery } from "@tanstack/react-query";
import { InferResponseType } from "hono";

type Res = InferResponseType<(typeof client.api.personal)["status"]["$get"]>;

export const getByStatus = () => {
  const query = useQuery({
    queryKey: ["status"],
    queryFn: async () => {
      const response = await client.api.personal["status"].$get();

      if (!response.ok) {
        return {
          sucess: false,
          message: "Erro ao buscar status",
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
