import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteWorkout } from "@/features/personal/student/api/delete-workout";
import { Loader2, Trash2 } from "lucide-react";
import { useState } from "react";

type Props = {
  closePanel: () => void;
  id: string;
};

export const DeleteWorkout = ({ closePanel, id }: Props) => {
  const { mutate, isPending } = deleteWorkout(id);
  const [open, setOpen] = useState(false);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger
        onClick={() => {
          setOpen(true);
        }}
      >
        <Trash2 className="size-5" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Voçê tem certeza?</AlertDialogTitle>
          <AlertDialogDescription>
            Remova permanentemente um treino do seu histórico. Essa ação não
            pode ser desfeita, e todos os dados associados (séries, repetições,
            pesos, etc.) serão perdidos. Confirme a exclusão para prosseguir.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={closePanel}>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              mutate();
            }}
          >
            {isPending ? (
              <>
                Deletando... <Loader2 className="size-5 animate-spin" />
              </>
            ) : (
              "Deletar"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
