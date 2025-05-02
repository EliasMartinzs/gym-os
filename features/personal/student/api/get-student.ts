import client from "@/lib/client";
import { useQuery } from "@tanstack/react-query";
import { InferResponseType } from "hono";

type Response = InferResponseType<
  (typeof client.api.personal.student)[":id"]["$get"]
>["data"];

export const getStudent = (param: string) => {
  const query = useQuery<Response, Error>({
    queryKey: ["students", param],
    queryFn: async () => {
      const response = await client.api.personal.student[":id"].$get({
        param: {
          id: param,
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
