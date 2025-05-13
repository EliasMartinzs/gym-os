import client from "@/lib/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type Res = InferResponseType<(typeof client.api.personal)["session"]["$post"]>;
type Req = InferRequestType<
  (typeof client.api.personal)["session"]["$post"]
>["json"];

export const postSession = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<Res, Error, Req>({
    mutationKey: ["session"],
    mutationFn: async (json) => {
      const response = await client.api.personal["session"].$post({
        json,
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
    onSuccess: () => {
      toast.success("Seção de atendimento criada com sucesso");

      queryClient.invalidateQueries({ queryKey: ["sessions"] });
    },
    onError: () => {
      toast.error("Houve um erro, tente novamente!");
    },
  });

  return mutation;
};
