import client from "@/lib/client";
import { useQuery } from "@tanstack/react-query";
import { InferResponseType } from "hono";

type Response = InferResponseType<
  (typeof client.api.personal.students)[":param"]["$get"]
>["data"];

export const getStudents = (param: "user" | "complete") => {
  const query = useQuery<Response, Error>({
    queryKey: ["students", param],
    queryFn: async () => {
      const response = await client.api.personal.students[":param"].$get({
        param: {
          param: param,
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
