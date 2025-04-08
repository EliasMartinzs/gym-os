import { Main } from "@/components/reusable/main";
import React from "react";
import { DataTable } from "./data-table";
import { columns } from "./column";
import { fakeUsers } from "./students";
import { Card, CardContent } from "@/components/ui/card";
import { StatusStudentsChart } from "./_components/status-students-chart";
import { BirthdayStudents } from "./_components/birthdays-students";
import { NewStudent } from "./_components/new-student";

const chartData = [
  { name: "Ativo", count: 32, fill: "var(--chart-1)" },
  { name: "Ativo", count: 98, fill: "var(--chart-1)" },
];

export default function StudentsPersonal() {
  return (
    <Main>
      <div className="w-full flex items-center justify-between">
        <h2 className="text-xl lg:text-3xl font-medium italic">Meus alunos</h2>
        <NewStudent />
      </div>
      <Card>
        <CardContent>
          <DataTable columns={columns} data={fakeUsers} />
        </CardContent>
      </Card>

      <div className="flex flex-col xl:flex-row gap-4">
        <div className="xl:w-fit xl:h-fit">
          <StatusStudentsChart chartData={chartData} />
        </div>

        <div className="xl:w-fit xl:h-fit">
          <BirthdayStudents />
        </div>
      </div>
    </Main>
  );
}
