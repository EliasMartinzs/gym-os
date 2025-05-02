import { Main } from "@/components/reusable/main";

import { NewTemplateWorkout } from "./_components/new-template-workout";
import { WorkoutTemplates } from "./_components/workout-templates";
import { Tooltip } from "@/components/reusable/tootip";
import { HelpCircle } from "lucide-react";

export default function Workouts() {
  return (
    <Main className="space-y-8">
      <div className="space-y-4">
        <div className="w-full flex items-center justify-between gap-x-6">
          <div className="flex gap-x-5 items-center">
            <h2 className="text-xl lg:text-3xl font-medium italic">
              Meus templates
            </h2>
            <Tooltip
              text={
                <div className="flex flex-col mx-auto max-w-sm gap-y-2 text-start">
                  <p className="font-medium">
                    Aqui você encontrará seus templates reutilizáveis.
                  </p>

                  <p>
                    - Eles permitem que você aplique modelos já criados a outros
                    usuários de forma prática e personalizada, conforme a sua
                    necessidade.
                  </p>
                </div>
              }
              trigger={<HelpCircle className="size-5" />}
            />
          </div>

          <NewTemplateWorkout />
        </div>
      </div>

      <WorkoutTemplates />
    </Main>
  );
}
