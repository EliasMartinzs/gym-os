import { Main } from "@/components/reusable/main";
import { LastStudents } from "./_dashboard/last-students";
import { TodaySessions } from "./_dashboard/today-session";
import { TopExercisesChart } from "./_dashboard/top-exercises-chart";
import { TotalStudent } from "./_dashboard/total-student";
import { TrainingDistributionChart } from "./_dashboard/training-format-chart";

const exerciseData = [
  { name: "Supino reto", count: 120 },
  { name: "Agachamento livre", count: 95 },
  { name: "Barra fixa", count: 87 },
  { name: "Desenvolvimento militar", count: 76 },
  { name: "Remada curvada", count: 65 },
];

const trainingFormatData = [
  {
    name: "Presencial", // IN_PERSON
    count: 99, // Contagem será calculada
  },
  {
    name: "Online", // ONLINE
    count: 31,
  },
  {
    name: "Híbrido", // HYBRID
    count: 32,
  },
  {
    name: "Plano Nutricional", // NUTRITION_PLAN
    count: 0,
  },
];

export default async function Personal() {
  return (
    <Main>
      <div className="flex flex-col md:grid grid-cols-6 xl:grid-cols-6 gap-4">
        <div className="col-span-2 xl:col-span-1">
          <TotalStudent />
        </div>
        <div className="col-span-4 xl:col-span-5">
          <LastStudents />
        </div>
        <div className="col-span-3 xl:col-span-1">
          <TopExercisesChart chartData={exerciseData} />
        </div>
        <div className="col-span-3 xl:col-span-1">
          <TrainingDistributionChart chartData={trainingFormatData} />
        </div>
        <div className="col-span-6 xl:col-span-4">
          <TodaySessions />
        </div>
      </div>
    </Main>
  );
}
