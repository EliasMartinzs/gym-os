import { InferResponseType } from "hono";
import client from "@/lib/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { EnumTranslations } from "../../../../lib/enum-tranlations";
import { useState } from "react";
import { ExpandablePanel } from "@/components/reusable/expandable-panel";
import { DifficultyLevel, FitnessGoal } from "@prisma/client";
import { Button } from "@/components/ui/button";

type ApiResponse = InferResponseType<typeof client.api.personal.workouts.$get>;

type SingleWorkout = NonNullable<ApiResponse["data"]>[number];

type WorkoutProps = {
  workout: SingleWorkout;
};

export const Workout = ({ workout }: WorkoutProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const { name, id, defaultGoal, defaultLevel, defaultTags, description } =
    workout;

  return (
    <ExpandablePanel
      isExpanded={isExpanded}
      setIsExpanded={setIsExpanded}
      triggerElement={
        <TriggerCardWorkout
          name={name}
          defaultGoal={defaultGoal}
          defaultLevel={defaultLevel}
          defaultTags={defaultTags}
          description={description}
        />
      }
    >
      <div className="relative">
        <TriggerCardWorkout
          name={name}
          defaultGoal={defaultGoal}
          defaultLevel={defaultLevel}
          defaultTags={defaultTags}
          description={description}
        />

        <Button
          variant="primary"
          className="absolute top-4 right-4 z-50"
          onClick={() => setIsExpanded(false)}
        >
          ✕
        </Button>
      </div>
    </ExpandablePanel>
  );
};

const TriggerCardWorkout = ({
  defaultGoal,
  defaultLevel,
  defaultTags,
  description,
  name,
}: {
  name: string;
  defaultGoal: FitnessGoal[];
  defaultLevel: DifficultyLevel | null;
  defaultTags: string[];
  description: string | null;
}) => {
  return (
    <Card className="h-full">
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
    </Card>
  );
};
