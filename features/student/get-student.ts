import client from "@/lib/client";
import { useQuery } from "@tanstack/react-query";

export const getStudent = () => {
  const query = useQuery({
    queryKey: ["student"],
    queryFn: async () => {
      const response = await client.api.student.$get();

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
