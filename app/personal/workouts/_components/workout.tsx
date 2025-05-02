import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import client from "@/lib/client";
import { InferResponseType } from "hono";
import { EnumTranslations } from "../../../../lib/enum-tranlations";
import { usePanelSlice } from "@/features/personal/student/hooks/use-expandable-panel";
import { WorkoutPanel } from "./workout-panel";
import { DeleteWorkout } from "./delete-workout";

type ApiResponse = InferResponseType<typeof client.api.personal.workouts.$get>;

type SingleWorkout = NonNullable<ApiResponse["data"]>[number];

export type WorkoutProps = {
  workout: SingleWorkout;
};

export const Workout = ({ workout }: WorkoutProps) => {
  const { openPanel, closePanel } = usePanelSlice();

  const { name, defaultGoal, defaultLevel, defaultTags, description, id } =
    workout;

  return (
    <Card
      className="h-fit cursor-pointer relative"
      onClick={() => {
        openPanel(<WorkoutPanel workout={workout} closePanel={closePanel} />);
      }}
    >
      <CardHeader className="space-y-3">
        <CardTitle className="text-lg font-bold">{name}</CardTitle>
        <CardDescription
          dangerouslySetInnerHTML={{ __html: description as string }}
        />
      </CardHeader>
      <Separator />
      <CardContent className="px-0">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {defaultGoal && (
            <div>
              <p className="font-medium">Objetivos</p>

              <div className="flex flex-wrap gap-2 mt-2">
                {defaultGoal.map((item) => (
                  <small
                    className="border-b border-primary p-2 font-light"
                    key={item}
                  >
                    {EnumTranslations.FitnessGoal[item]}
                  </small>
                ))}
              </div>
            </div>
          )}

          {defaultLevel !== null && (
            <div>
              <p className="font-medium">Dificuldade</p>

              <div className="flex flex-wrap gap-2 mt-2">
                <small className="border-b border-primary p-2 font-light">
                  {EnumTranslations.DifficultyLevel[defaultLevel]}
                </small>
              </div>
            </div>
          )}

          {defaultTags.length !== 0 && (
            <div>
              <p className="font-medium">Tags</p>

              <div className="flex flex-wrap gap-2 mt-2">
                {defaultTags.map((item) => (
                  <small
                    className="border-b border-primary p-2 font-light"
                    key={item}
                  >
                    {item}
                  </small>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
      <div
        className="absolute top-5 right-5"
        onClick={(e) => e.stopPropagation()}
      >
        <DeleteWorkout closePanel={closePanel} id={id} />
      </div>
    </Card>
  );
};
