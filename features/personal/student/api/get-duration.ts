import client from "@/lib/client";
import { useQuery } from "@tanstack/react-query";

export const getDuration = () => {
  const query = useQuery({
    queryKey: ["duration"],
    queryFn: async () => {
      const response = await client.api.personal["duration"].$get();

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
