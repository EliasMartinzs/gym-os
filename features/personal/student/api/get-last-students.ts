import client from "@/lib/client";
import { useQuery } from "@tanstack/react-query";
import { InferResponseType } from "hono";

export const getLastStudents = () => {
  const query = useQuery({
    queryKey: ["last-students"],
    queryFn: async () => {
      const response = await client.api.personal["last-students"].$get();

      if (!response.ok) {
        return {
          success: false,
          message: null,
          data: null,
        };
      }

      const result = await response.json();

      return result;
    },
  });
  return query;
};
