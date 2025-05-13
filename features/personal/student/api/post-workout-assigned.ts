import client from "@/lib/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type Res = InferResponseType<
  (typeof client.api.personal)["assign-workout"]["$post"]
>;
type Req = InferRequestType<
  (typeof client.api.personal)["assign-workout"]["$post"]
>["json"];

export const postWorkoutAssinged = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<Res, Error, Req>({
    mutationKey: ["assign-workout"],
    mutationFn: async (json) => {
      const response = await client.api.personal["assign-workout"].$post({
        json: json,
      });

      if (!response.ok) {
        return {
          success: false,
          message: "Houve um erro ao assimilar workout",
          data: null,
        };
      }

      return await response.json();
    },
    onSuccess: () => {
      toast("Sucesso");

      queryClient.invalidateQueries({ queryKey: ["workout"] });
      queryClient.invalidateQueries({ queryKey: ["workouts"] });
    },
  });

  return mutation;
};
