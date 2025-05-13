import { ResponsiveModal } from "@/components/reusable/responsive-modal";
import { Button } from "@/components/ui/button";
import client from "@/lib/client";
import { EnumTranslations } from "@/lib/enum-tranlations";
import { DayOfWeek, DifficultyLevel } from "@prisma/client";
import { InferResponseType } from "hono";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTheme } from "next-themes";
import Image from "next/image";

type FullResponse = InferResponseType<
  (typeof client.api.personal.student)[":id"]["$get"]
>;

type WorkoutTemplateFromResponse = NonNullable<
  NonNullable<FullResponse["data"]>["workoutTemplates"]
>[number];

type Props = {
  workoutTemplate: WorkoutTemplateFromResponse;
};

export const TemplateStudent = ({ workoutTemplate }: Props) => {
  const [open, setOpen] = useState(false);
  const { theme } = useTheme();

  if (!workoutTemplate) {
    return <>Nenhum treino até o momento</>;
  }

  const { name, description, days, defaultGoal, defaultLevel, defaultTags } =
    workoutTemplate;
  console.log(workoutTemplate);

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-medium">{name}</h3>

      <ResponsiveModal
        open={open}
        setOpen={setOpen}
        trigger={
          <Button variant="ghost" className="bg-card">
            Mostrar descrição
          </Button>
        }
        key="TemplateStudent"
      >
        <div dangerouslySetInnerHTML={{ __html: description as string }} />
      </ResponsiveModal>

      <div className="space-y-6 flex flex-col xl:flex-row xl:gap-8">
        <div className="space-y-3">
          <p>Objetivos</p>
          <div className="flex flex-wrap gap-3">
            {defaultGoal.map((goal) => (
              <p className="bg-card py-2 px-4 rounded-full" key={goal}>
                {EnumTranslations.FitnessGoal[goal]}
              </p>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <p>Dificuldade</p>
          <div className="flex flex-wrap gap-3">
            <p className="bg-card py-2 px-4 rounded-full">
              {
                EnumTranslations.DifficultyLevel[
                  defaultLevel as DifficultyLevel
                ]
              }
            </p>
          </div>
        </div>

        {defaultTags.length !== 0 && (
          <div className="space-y-3">
            <p>Tags</p>
            <div className="flex flex-wrap gap-3">
              {defaultTags.map((tag) => (
                <p className="bg-card py-2 px-4 rounded-full" key={tag}>
                  tag
                </p>
              ))}
            </div>
          </div>
        )}
      </div>

      <div>
        <Tabs
          defaultValue={days[0].dayOfWeek as DayOfWeek}
          className="max-xl:mt-10"
        >
          <TabsList>
            {days.map((day) => (
              <TabsTrigger key={day.id} value={day.dayOfWeek as DayOfWeek}>
                {EnumTranslations.DayOfWeek[day.dayOfWeek as DayOfWeek]}
              </TabsTrigger>
            ))}
          </TabsList>

          {days.map((day) => (
            <TabsContent
              key={day.id}
              value={day.dayOfWeek as DayOfWeek}
              className="mt-3 space-y-6 grid"
            >
              <div className="space-y-6">
                <h6 className="text-lg">{day.name}</h6>

                {day.focusMuscle.map((muscle, index) => (
                  <div key={muscle} className="flex gap-x-3 items-center">
                    {index === 0 && <Target className="size-8" />}
                    {EnumTranslations.MuscleGroup[muscle]}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
                {day.exercises.map((exercise) => (
                  <Card key={exercise.id}>
                    <CardHeader>
                      <CardTitle className="text-xl">{exercise.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="px-0 flex max-xl:justify-between items-start font-light">
                      <div className="space-y-6 flex-1/2">
                        <div className="flex items-center gap-x-3">
                          <Image
                            loading="lazy"
                            width={36}
                            height={36}
                            alt=""
                            src={`/equipment-${theme}.png`}
                          />
                          <p className="text-lg">{exercise.equipment}</p>
                        </div>
                        <div className="flex items-center gap-x-3">
                          <Image
                            loading="lazy"
                            width={36}
                            height={36}
                            alt=""
                            src={`/muscle-${theme}.png`}
                          />
                          <p className="text-lg">{exercise.muscle}</p>
                        </div>
                        <div className="flex items-center gap-x-3">
                          <Image
                            loading="lazy"
                            width={36}
                            height={36}
                            alt=""
                            src={`/type-${theme}.png`}
                          />
                          <p className="text-lg">{exercise.type}</p>
                        </div>
                        <div className="flex items-center gap-x-3">
                          <Image
                            loading="lazy"
                            width={36}
                            height={36}
                            alt=""
                            src={`/difficulty-${theme}.png`}
                          />
                          <p className="text-lg">{exercise.difficulty}</p>
                        </div>
                      </div>
                      <div>
                        {day.exerciseInWorkout.map((workout) => (
                          <div key={workout.id} className="space-y-6">
                            <div className="flex items-center gap-x-3">
                              <Image
                                loading="lazy"
                                width={36}
                                height={36}
                                alt=""
                                src={`/sets-${theme}.png`}
                              />
                              <p className="text-lg">{workout.sets}</p>
                            </div>
                            <div className="flex items-center gap-x-3">
                              <Image
                                loading="lazy"
                                width={36}
                                height={36}
                                alt=""
                                src={`/reps-${theme}.png`}
                              />
                              <p className="text-lg">{workout.reps}</p>
                            </div>
                            <div className="flex items-center gap-x-3">
                              <Image
                                loading="lazy"
                                width={36}
                                height={36}
                                alt=""
                                src={`/rest-${theme}.png`}
                              />
                              <p className="text-lg">{workout.rest} (seg)</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};
