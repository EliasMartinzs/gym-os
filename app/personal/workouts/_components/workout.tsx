import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EnumTranslations } from "@/lib/enum-tranlations";

import { DifficultyLevel, FitnessGoal, Prisma } from "@prisma/client";
import { WorkoutEdit } from "./workout-edit";

export type WithEnums<T> = T & {
  goal: FitnessGoal[];
  level: DifficultyLevel | null;
};

type WorkoutTemplateWithRelations = WithEnums<
  Prisma.WorkoutTemplateGetPayload<{
    include: {
      days: {
        include: {
          ExerciseInWorkout: {
            include: {
              exercise: true;
            };
          };
        };
      };
    };
  }>
>;

interface Props {
  workout: WorkoutTemplateWithRelations;
}

const students = [
  {
    id: "1",
    name: "João Silva",
  },
  {
    id: "2",
    name: "Maria Oliveira",
  },
  {
    id: "3",
    name: "Carlos Souza",
  },
  {
    id: "4",
    name: "Ana Santos",
  },
  {
    id: "5",
    name: "Pedro Costa",
  },
];

export const Workout = ({ workout }: Props) => {
  const { id, level, name, description, goal } = workout;

  return (
    <Card className="xl:w-fit hover:scale-105 transition-all shadow relative">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-x-1">
          <p>Nivel:</p>
          <div>
            <>
              {level ? (
                <span className="px-2 bg-border rounded-full">
                  {EnumTranslations.DifficultyLevel[level]}
                </span>
              ) : (
                "Nível não definido"
              )}
            </>
          </div>
        </div>

        <div className="flex items-center gap-x-1">
          <p>Objetivos:</p>

          <div className="flex flex-wrap gap-2">
            {goal.map((g) => (
              <div key={g} className="px-2 bg-border rounded-full">
                {EnumTranslations.FitnessGoal[g]}
              </div>
            ))}
          </div>
        </div>

        <div className="absolute top-4 right-4">
          <WorkoutEdit workout={workout} students={students} />
        </div>
      </CardContent>
    </Card>
  );
};
