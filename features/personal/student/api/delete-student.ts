import client from "@/lib/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const deleteStudent = (id: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["delete-student"],
    mutationFn: async () => {
      const response = await client.api.personal["delete-student"][
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
      toast(data.message, {
        id: "delete-student",
      });

      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["students"] }),
        queryClient.invalidateQueries({ queryKey: ["status"] }),
        queryClient.invalidateQueries({ queryKey: ["students-by-birthdate"] }),
        queryClient.invalidateQueries({ queryKey: ["duration"] }),
      ]);
    },
    onError: () => {
      toast("Houve um erro ao deletar estudante", {
        id: "delete-studentS",
      });
    },
  });

  return mutation;
};
