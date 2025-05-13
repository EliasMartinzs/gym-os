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
import { deleteSession } from "@/features/personal/student/api/delete-session";
import { Loader2, Trash2 } from "lucide-react";
import { useState } from "react";

type Props = {
  closePanel: () => void;
  id: string;
};

export const DeleteSession = ({ closePanel, id }: Props) => {
  const { mutate, isPending } = deleteSession(id);
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
            Atenção! Esta seção possui um aluno vinculado. Ao excluí-la, todos
            os dados associados serão removidos. Deseja continuar?
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
