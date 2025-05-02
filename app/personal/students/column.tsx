"use client";

import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

import { ResponsiveModal } from "@/components/reusable/responsive-modal";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteStudent } from "@/features/personal/student/api/delete-student";
import { MoreHorizontal, Trash, UserRound } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export interface StudentTableData {
  id: string;
  name: string;
  email: string;
  avatarUrl: string | null;
  phone: string | null;
}

export const columns: ColumnDef<StudentTableData>[] = [
  {
    id: "actions",
    cell: ({ row }) => {
      const student = row.original;
      const { mutate } = deleteStudent(student.id);
      const [open, setOpen] = useState(false);
      const router = useRouter();

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Abrir menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Açoes</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Button
                variant="ghost"
                className="cursor-pointer justify-start"
                size="full"
                onClick={() => router.push(`/personal/student/${student.id}`)}
              >
                Perfil <UserRound className="ml-2" />
              </Button>
            </DropdownMenuItem>
            <DropdownMenuSeparator />

            <ResponsiveModal
              trigger={
                <Button
                  variant="ghost"
                  className="cursor-pointer justify-start"
                  size="full"
                >
                  Deletar estudante <Trash className="ml-2" />
                </Button>
              }
              open={open}
              setOpen={setOpen}
              key="deletar-estudante"
              title="Confirmar Exclusão de Estudante"
              className="xl:max-w-xl text-center"
            >
              <div className="flex-1 space-y-4">
                <p className="text-muted-foreground">
                  Tem certeza que deseja excluir permanentemente os dados deste
                  estudante? Esta ação não pode ser desfeita e removerá todas as
                  informações relacionadas a ele.
                </p>

                <Button
                  size="full"
                  variant="ghost"
                  onClick={() => setOpen(false)}
                >
                  Cancelar
                </Button>
                <Button
                  size="full"
                  variant="primary"
                  onClick={() => {
                    mutate();
                    setOpen(false);
                  }}
                >
                  Confirmar
                </Button>
              </div>
            </ResponsiveModal>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
  {
    accessorKey: "avatarUrl",
    header: "",
    cell: ({ row }) => {
      return (
        <Image
          src={row.original.avatarUrl as string}
          alt={row.original.name}
          width={24}
          height={24}
          className="object-cover rounded-full"
        />
      );
    },
  },
  {
    accessorKey: "email",
    header: "E-Mail",
  },
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "phone",
    header: "Telefone",
  },
];
