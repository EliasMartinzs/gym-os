import InteractiveDatePicker from "@/app/personal/calendar/_components/interactive-date-picker";
import client from "@/lib/client";
import { EnumTranslations } from "@/lib/enum-tranlations";
import { cn } from "@/lib/utils";
import { InferResponseType } from "hono";
import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";

import { TabsWorkoutsDay } from "./tabs-workouts-day";

type FullResponse = InferResponseType<typeof client.api.student.$get>;

type Workout = NonNullable<
  NonNullable<NonNullable<FullResponse["data"]>["student"]>["workoutTemplate"]
>[number];

type Props = {
  workout: Workout[];
};

export const WorkoutStudent = ({ workout }: Props) => {
  const [open, setOpen] = useState(false);

  const { name, description, days, defaultGoal, defaultLevel, defaultTags } =
    workout[0];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-medium">Minha ficha</h2>

      <InteractiveDatePicker />

      <div className="w-full flex items-center justify-between gap-x-6">
        <p className="text-xl capitalize"> {name}</p>

        <button onClick={() => setOpen((prevState) => !prevState)}>
          {open ? (
            <p className="flex items-center gap-2">
              Ocultar descrição <EyeClosed />
            </p>
          ) : (
            <p className="flex items-center gap-2">
              Mostrar descrição <Eye />
            </p>
          )}
        </button>
      </div>

      <div
        className={cn(open ? "line-clamp-none" : "line-clamp-1")}
        dangerouslySetInnerHTML={{ __html: description as string }}
      />

      <div className="w-full flex flex-wrap gap-x-5">
        <p className="py-1 px-3 bg-primary rounded-full text-black">
          {defaultGoal &&
            defaultGoal.map((item) => EnumTranslations.FitnessGoal[item])}
        </p>
        <p className="py-1 px-3 bg-primary rounded-full text-black">
          {defaultLevel && EnumTranslations.DifficultyLevel[defaultLevel]}
        </p>
        {defaultTags &&
          defaultTags.map((item) => (
            <p
              key={item}
              className="py-1 px-3 bg-primary rounded-full text-black"
            >
              {item}
            </p>
          ))}
      </div>

      <div className="w-full flex flex-col gap-y-4">
        <h6 className="font-medium text-lg">Dias de treino</h6>
        <TabsWorkoutsDay days={days} />
      </div>
    </div>
  );
};
