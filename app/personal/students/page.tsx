import { Main } from "@/components/reusable/main";
import { BirthdayStudents } from "./_components/birthdays-students";
import { StudentsDurationChart } from "./_components/duration-students";
import { CreateStudent } from "./_components/create-student";
import { StatusStudentsChart } from "./_components/status-students-chart";
import { DataTable } from "./data-table";

export default function StudentsPersonal() {
  return (
    <Main>
      <div className="w-full flex items-center justify-between">
        <h2 className="text-lg lg:text-3xl font-medium italic">Meus alunos</h2>
        <CreateStudent />
      </div>

      <DataTable />

      <div className="max-lg:flex flex-col sm:grid grid-cols-2 lg:flex lg:flex-row gap-6">
        <StatusStudentsChart />

        <BirthdayStudents />
      </div>

      <StudentsDurationChart />
    </Main>
  );
}
