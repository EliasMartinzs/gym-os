import client from "@/lib/client";
import { useQuery } from "@tanstack/react-query";

export const getStudentsByBirthDate = () => {
  const query = useQuery({
    queryKey: ["students-by-birthdate"],
    queryFn: async () => {
      const response = await client.api.personal["birthdate"].$get();

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
