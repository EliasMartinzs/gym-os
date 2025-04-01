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

export const fakeTemplates: WorkoutTemplateWithRelations[] = [
  {
    id: "1",
    name: "Treino ABC Iniciante",
    description: "Treino básico para iniciantes em musculação",
    isReusable: true,
    trainerId: "trainer-1",
    createdAt: new Date(),
    goal: [FitnessGoal.MUSCLE_GAIN, FitnessGoal.STRENGTH_GAIN],
    level: DifficultyLevel.BEGINNER,
    studentId: null,
    days: [
      {
        id: "day-1",
        templateId: "1",
        name: "Treino A - Peito/Tríceps",
        dayOfWeek: DayOfWeek.MONDAY,
        order: 1,
        focusMuscle: [MuscleGroup.CHEST, MuscleGroup.TRICEPS],
        ExerciseInWorkout: [
          {
            id: "ex-in-1",
            dayId: "day-1",
            exerciseId: "supino-1",
            order: 1,
            sets: 3,
            reps: "10-12",
            rest: 60,
            exercise: {
              id: "supino-1",
              name: "Supino Reto",
              type: "Musculação",
              muscle: "Peitoral",
              equipment: "Barra",
              difficulty: "Iniciante",
              instructions: "Deitar no banco e empurrar a barra para cima",
              personalTrainerId: "trainer-1",
              studentId: null,
              workoutDayId: null,
            },
          },
        ],
      },
    ],
  },
];

export const WorkoutTemplates = () => {
  return (
    <div>
      <h2 className="text-2xl italic from-muted">Meus templates</h2>

      <div className="flex flex-col xl:flex-wrap xl:flex-row gap-4">
        {fakeTemplates.map((workout) => (
          <Workout workout={workout} key={workout.id} />
        ))}
      </div>
    </div>
  );
};
