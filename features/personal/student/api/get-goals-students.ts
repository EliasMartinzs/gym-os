import client from "@/lib/client";
import { FitnessGoal } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

export const getGoalsStudents = (goal: FitnessGoal) => {
  const query = useQuery({
    queryKey: ["goals-students", goal.toString()],
    queryFn: async () => {
      const response = await client.api.personal.goal[":param"].$get({
        param: {
          param: goal,
        },
      });

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
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 2,
    retryDelay: 1000,
  });

  return query;
};
