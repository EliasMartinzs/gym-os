import client from "@/lib/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type Response = InferResponseType<
  (typeof client.api.personal)["workout"]["$post"]
>;
type Request = InferRequestType<
  (typeof client.api.personal)["workout"]["$post"]
>["json"];

export const postWorkout = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<Response, Error, Request>({
    mutationKey: ["post-workout"],
    mutationFn: async (json) => {
      const response = await client.api.personal["workout"].$post({
        json: json,
      });

      if (!response.ok) {
        return {
          success: false,
          message: "errrrr",
          data: null,
        };
      }

      return await response.json();
    },
    onSuccess: async (data) => {
      toast.success(data.message || "Usuário criado com sucesso", {
        id: "student",
      });
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["students"] }),
        queryClient.invalidateQueries({ queryKey: ["status"] }),
        queryClient.invalidateQueries({ queryKey: ["students-by-birthdate"] }),
        queryClient.invalidateQueries({ queryKey: ["workouts"] }),
      ]);
    },
    onError: (error) => {
      toast.error(error.message || "Erro ao criar usuário", {
        id: "student",
      });
    },
  });

  return mutation;
};
