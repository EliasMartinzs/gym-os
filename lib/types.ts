export interface ExerciseInput {
  exerciseId: string;
  equipment?: string;
  difficulty?: string;
  instructions?: string;
  muscle?: string;
  type?: string;
  order?: number;
  sets?: string;
  reps?: number;
  rest?: string;
}

export interface WorkoutDayInput {
  name: string;
  dayOfWeek: string;
  focusMuscle: string;
  exercises: ExerciseInput[];
}

export interface WorkoutInput {
  days: WorkoutDayInput[];
  isReusable?: boolean;
  assigned?: {
    studentId?: string;
  };
}
