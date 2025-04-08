import { Main } from "@/components/reusable/main";

import { WorkoutTemplates } from "./_components/workout-templates";
import { NewTemplateWorkout } from "./_components/new-template-workout";

export default function Workouts() {
  return (
    <Main className="space-y-8">
      <div className="space-y-4">
        <div className="w-full flex items-center justify-between gap-x-6">
          <h2 className="text-xl lg:text-3xl font-medium italic">Treinos</h2>

          <NewTemplateWorkout />
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div>
            <div className="p-4 xl:p-8 bg-border rounded-3xl">
              <p>Treinos ativos</p>
              <div>12</div>
            </div>
          </div>
        </div>
      </div>

      <WorkoutTemplates />
    </Main>
  );
}
