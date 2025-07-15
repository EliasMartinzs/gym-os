import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EnumTranslations } from "@/lib/enum-tranlations";
import { $Enums, DayOfWeek } from "@prisma/client";
import { Target } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";

type Props = {
  days: {
    exercises: {
      id: string;
      name: string;
      personalTrainerId: string;
      studentId: string | null;
      type: string;
      muscle: string;
      equipment: string;
      difficulty: string;
      instructions: string;
      workoutDayId: string | null;
    }[];
    exerciseInWorkout: {
      id: string;
      dayId: string;
      exerciseId: string;
      order: number;
      sets: number;
      reps: string;
      rest: number | null;
    }[];
    id: string;
    name: string;
    templateId: string;
    order: number;
    dayOfWeek: $Enums.DayOfWeek | null;
    focusMuscle: $Enums.MuscleGroup[];
  }[];
};

export const TabsWorkoutsDay = ({ days }: Props) => {
  const { theme } = useTheme();

  return (
    <div className="w-full flex items-center overflow-x-auto gap-x-5">
      <Tabs defaultValue={days[0].dayOfWeek as DayOfWeek} className="w-full">
        <TabsList>
          {days.map((day) => (
            <TabsTrigger key={day.id} value={day.dayOfWeek as DayOfWeek}>
              {EnumTranslations.DayOfWeek[day.dayOfWeek as DayOfWeek]}
            </TabsTrigger>
          ))}
        </TabsList>

        {days.map((day) => (
          <TabsContent key={day.id} value={day.dayOfWeek as DayOfWeek}>
            <div className="space-y-6 w-full">
              <h6 className="text-lg text-center">{day.name}</h6>

              {day.focusMuscle.map((muscle, index) => (
                <div key={muscle} className="flex gap-x-3 items-center mb-5">
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
  );
};
