import {
  Prisma,
  FitnessGoal,
  DifficultyLevel,
  DayOfWeek,
  MuscleGroup,
} from "@prisma/client";
import { Workout } from "./workout";

export type WithEnums<T> = T & {
  goal: FitnessGoal[];
  level: DifficultyLevel | null;
};

export const WorkoutTemplates = () => {
  return (
    <div>
      <h2 className="text-2xl italic from-muted">Meus templates</h2>

      <div className="flex flex-col xl:flex-wrap xl:flex-row gap-4">
        {/* {fakeTemplates.map((workout) => (
          <Workout workout={workout} key={workout.id} />
        ))} */}
      </div>
    </div>
  );
};
