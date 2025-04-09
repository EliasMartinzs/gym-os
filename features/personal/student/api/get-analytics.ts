import client from "@/lib/client";
import { useQuery } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

export const getAnalytics = (param: "all" | "birthdays" | "counts") => {
  const query = useQuery({
    queryKey: ["student"],
    queryFn: async () => {
      const response = await client.api.personal.analytics.$get({
        param: {
          dataType: param,
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Houve um erro ao buscar dados, tente novamente!"
        );
      }

      return result.data;
    },
  });

  return query;
};
