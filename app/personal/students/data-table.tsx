"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getStudents } from "@/features/personal/student/api/get-students";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  Row,
  Table as TableStack,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { NewStudent } from "./_components/new-student";
import { columns, StudentTableData } from "./column";
import { ErrorState, LoadingState } from "./data-table-states";
import { useTableData } from "./use-data-table";
import AddUserImg from "@/public/undraw_add-user_rbko.svg";
import Image from "next/image";

export function DataTable() {
  const { data, isLoading, isError, refetch } = getStudents("user");
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const tableData = useTableData(data!);

  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: { columnFilters },
  });

  if (isLoading) return <LoadingState />;
  if (isError) return <ErrorState onRetry={refetch} />;
  if (!data || data.length === 0) {
    return (
      <div
        className="w-full flex-1 flex flex-col items-center text-center justify-center gap-y-6
      "
      >
        <div className="space-y-2">
          <h6 className="text-xl font-medium">
            Sua lista de estudantes está vazia
          </h6>
          <p className="text-sm text-muted-foreground">
            Comece cadastrando seu primeiro aluno para acompanhar treinos,
            progressos e métricas
          </p>
        </div>

        <NewStudent />

        <Image
          src={AddUserImg}
          alt="create-user"
          className="object-contain w-96 h-96 xl:w-[600px] xl:h-[600px]"
        />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <TableFilter table={table} />
      <TableContent table={table} columns={columns} />
      <TablePagination table={table} />
    </div>
  );
}

function TableFilter({ table }: { table: TableStack<StudentTableData> }) {
  return (
    <div className="flex items-center py-4">
      <Input
        placeholder="Filtrar por estudantes..."
        value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
        onChange={(e) =>
          table.getColumn("name")?.setFilterValue(e.target.value)
        }
        className="max-w-3xl"
      />
    </div>
  );
}

function TableContent({
  table,
  columns,
}: {
  table: TableStack<StudentTableData>;
  columns: ColumnDef<StudentTableData>[];
}) {
  return (
    <div className="border-b border-r border-l rounded-3xl">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {!header.isPlaceholder &&
                    flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map(renderTableRow)
          ) : (
            <EmptyTableRow columns={columns} />
          )}
        </TableBody>
      </Table>
    </div>
  );
}

function renderTableRow(row: Row<StudentTableData>) {
  return (
    <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  );
}

function EmptyTableRow({ columns }: { columns: any }) {
  return (
    <TableRow>
      <TableCell colSpan={columns.length} className="text-center">
        <p className="text-center py-6">Nenhum estudante encontrado</p>
      </TableCell>
    </TableRow>
  );
}

function TablePagination({ table }: { table: TableStack<StudentTableData> }) {
  return (
    <div className="flex items-center justify-end space-x-2 py-4">
      <Button
        size="icon"
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
        variant="outline"
      >
        <ChevronLeft />
      </Button>
      <Button
        size="icon"
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
        variant="outline"
      >
        <ChevronRight />
      </Button>
    </div>
  );
}
