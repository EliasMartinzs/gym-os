"use client";

import { User } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";

export const columns: ColumnDef<User>[] = [
  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
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
          width={48}
          height={48}
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
