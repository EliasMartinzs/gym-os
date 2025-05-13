import client from "@/lib/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const deleteSession = (id: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["delete-session"],
    mutationFn: async () => {
      const response = await client.api.personal["delete-session"][
        ":id"
      ].$delete({
        param: {
          id: id,
        },
      });

      if (!response.ok) {
        return {
          success: false,
          message: "Houve um erro na response",
        };
      }

      return await response.json();
    },
    onSuccess: async (data) => {
      toast("Seção deletada com sucesso", {
        id: "delete-session",
      });

      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["sessions"] }),
        queryClient.invalidateQueries({ queryKey: ["students"] }),
        queryClient.invalidateQueries({ queryKey: ["status"] }),
      ]);
    },
    onError: () => {
      toast("Houve um erro ao deletar seção", {
        id: "delete-session",
      });
    },
  });

  return mutation;
};
