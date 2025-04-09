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

export const newStudent = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<Response, Error, Request>({
    mutationKey: ["student"],
    mutationFn: async (json) => {
      const response = await client.api.personal["new-student"].$post({
        json: json,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message ||
            "Houve um erro ao criar seu estudante, tente novamente!"
        );
      }

      return result;
    },
    onSuccess: (data) => {
      toast.success(data.message || "Usuário criado com sucesso", {
        id: "student",
      });

      queryClient.invalidateQueries({
        queryKey: ["student"],
      });
    },
    onError: (error) => {
      toast.error(error.message || "Erro ao criar usuário", {
        id: "student",
      });
    },
  });

  return mutation;
};
