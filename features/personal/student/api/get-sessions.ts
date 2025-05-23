import client from "@/lib/client";
import { useQuery } from "@tanstack/react-query";
import { InferResponseType } from "hono";

type Res = InferResponseType<typeof client.api.personal.sessions.$get>;

export const getSessions = (filters?: URLSearchParams) => {
  const query = useQuery<Res, Error>({
    queryKey: ["sessions", filters?.toString()],
    queryFn: async () => {
      const paramsObject = filters ? Object.fromEntries(filters.entries()) : {};

      const response = await client.api.personal.sessions.$get({
        query: paramsObject,
      });

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
