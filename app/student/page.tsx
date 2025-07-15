"use client";

import { getStudent } from "@/features/student/get-student";
import { Main } from "./_components/main-student";
import { WorkoutStudent } from "./_components/workout-student";

export default function Student() {
  const { data } = getStudent();

  if (!data?.data) {
    return <></>;
  }

  return (
    <Main>
      <WorkoutStudent workout={data?.data?.student?.workoutTemplate ?? []} />
    </Main>
  );
}
