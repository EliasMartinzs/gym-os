import client from "@/lib/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type Response = InferResponseType<
  (typeof client.api.personal)["new-student"]["$post"]
>;
type Request = InferRequestType<
  (typeof client.api.personal)["new-student"]["$post"]
>["json"];

export const postStudent = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<Response, Error, Request>({
    mutationKey: ["new-student"],
    mutationFn: async (json) => {
      const response = await client.api.personal["new-student"].$post({
        json: json,
      });

      const result = await response.json();

      if (!response.ok) {
        return {
          success: result.success,
          message: result.message,
        };
      }

      return result;
    },
    onSuccess: async (data) => {
      data.success &&
        toast.success(data.message, {
          id: "student",
        });

      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["students"] }),
        queryClient.invalidateQueries({ queryKey: ["status"] }),
        queryClient.invalidateQueries({ queryKey: ["students-by-birthdate"] }),
      ]);
    },
  });

  return mutation;
};
