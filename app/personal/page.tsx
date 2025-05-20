import { Main } from "@/components/reusable/main";
import { LastStudents } from "./_dashboard/last-students";
import { TopExercisesChart } from "./_dashboard/top-exercises-chart";
import { TotalStudentChart } from "./_dashboard/total-student";
import { TrainingFormatChart } from "./_dashboard/training-format-chart";
import { GoalsChart } from "./workouts/_components/goals-chart";

export default function Personal() {
  return (
    <Main>
      <div className="grid grid-cols-1 gap-4">
        <div className="grid gap-4 grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3">
          <TotalStudentChart />
          <TrainingFormatChart />
          <TopExercisesChart />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <div className="lg:col-span-4">
            <LastStudents />
          </div>
          <div className="lg:col-span-8">
            <GoalsChart />
          </div>
        </div>
      </div>
    </Main>
  );
}
