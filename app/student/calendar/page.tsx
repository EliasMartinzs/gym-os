"use client";

import { SessionCard } from "@/app/personal/calendar/_components/session-card";
import { Main } from "@/components/reusable/main";
import { getStudent } from "@/features/student/get-student";

export default function Calendar() {
  const { data } = getStudent();

  if (!data?.data) {
    return <></>;
  }
  return (
    <Main>
      <h2 className="text-lg font-medium">Minha agenda</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
        {data?.data.student?.session.map((session) => (
          <SessionCard session={session} key={session.id} />
        ))}
      </div>
    </Main>
  );
}
