import client from "@/lib/client";
import { useQuery } from "@tanstack/react-query";

export const getLastStudents = () => {
  const query = useQuery({
    queryKey: ["last-students"],
    queryFn: async () => {
      const response = await client.api.personal["last-students"].$get();

      const result = await response.json();

      if (!result.success) {
        return {
          success: false,
          message: null,
          data: null,
        };
      }

      return result;
    },
  });
  return query;
};
