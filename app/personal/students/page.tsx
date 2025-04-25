import { Main } from "@/components/reusable/main";
import { BirthdayStudents } from "./_components/birthdays-students";
import { StudentsDurationChart } from "./_components/duration-students";
import { NewStudent } from "./_components/new-student";
import { StatusStudentsChart } from "./_components/status-students-chart";
import { DataTable } from "./data-table";

export default function StudentsPersonal() {
  return (
    <Main>
      <div className="w-full flex items-center justify-between">
        <h2 className="text-xl lg:text-3xl font-medium italic">Meus alunos</h2>
        <NewStudent />
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
