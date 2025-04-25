"use client";

export const todaySessionsMock = [
  {
    id: "1",
    studentId: "student-1",
    trainerId: "trainer-1",
    startAt: new Date(new Date().setHours(9, 0, 0, 0)), // Hoje 09:00
    endAt: new Date(new Date().setHours(10, 0, 0, 0)), // Hoje 10:00
    location: "Academia Centro",
    status: "CONFIRMED",
    type: "PERSONAL_TRAINING",
    createdAt: new Date(),
    updatedAt: new Date(),
    canceledAt: null,
    student: {
      user: {
        name: "João Silva",
        avatarUrl: "/avatars/joao.jpg",
      },
    },
  },
  {
    id: "2",
    studentId: "student-2",
    trainerId: "trainer-1",
    startAt: new Date(new Date().setHours(11, 30, 0, 0)), // Hoje 11:30
    endAt: new Date(new Date().setHours(12, 30, 0, 0)), // Hoje 12:30
    location: "Online",
    status: "SCHEDULED",
    type: "NUTRITION",
    createdAt: new Date(),
    updatedAt: new Date(),
    canceledAt: null,
    student: {
      user: {
        name: "Maria Oliveira",
        avatarUrl: "/avatars/maria.jpg",
      },
    },
  },
  {
    id: "3",
    studentId: "student-3",
    trainerId: "trainer-1",
    startAt: new Date(new Date().setHours(18, 0, 0, 0)),
    endAt: new Date(new Date().setHours(19, 0, 0, 0)),
    location: "Academia Sul",
    status: "SCHEDULED",
    type: "PERSONAL_TRAINING",
    createdAt: new Date(),
    updatedAt: new Date(),
    canceledAt: null,
    student: {
      user: {
        name: "Carlos Souza",
        avatarUrl: "/avatars/carlos.jpg",
      },
    },
  },
  {
    id: "4",
    studentId: "student-4",
    trainerId: "trainer-1",
    startAt: new Date(new Date().setHours(18, 0, 0, 0)),
    endAt: new Date(new Date().setHours(19, 0, 0, 0)),
    location: "Online",
    status: "CONFIRMED",
    type: "FOLLOW_UP",
    createdAt: new Date(),
    updatedAt: new Date(),
    canceledAt: null,
    student: {
      user: {
        name: "Ana Costa",
        avatarUrl: "/avatars/ana.jpg",
      },
    },
  },
  {
    id: "demo-1",
    studentId: "demo-student",
    trainerId: "trainer-1",
    startAt: new Date(new Date().setHours(18, 0, 0, 0)),
    endAt: new Date(new Date().setHours(19, 0, 0, 0)),
    location: "Online",
    status: "SCHEDULED",
    type: "PERSONAL_TRAINING",
    createdAt: new Date(),
    updatedAt: new Date(),
    canceledAt: null,

    student: {
      user: {
        name: "Aluno Demonstração",
        avatarUrl: "/avatars/demo.jpg",
      },
    },
  },
];
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDate } from "@/lib/utils";
import { NoData } from "../../../components/reusable/no-data";

export function TodaySessions() {
  const sessions = todaySessionsMock;
  const now = new Date();

  const nextSessions = sessions
    .filter((s) => new Date(s.endAt) >= now)
    .sort(
      (a, b) => new Date(a.startAt).getTime() - new Date(b.startAt).getTime()
    );

  const isError = true;

  if (isError) {
    return (
      <NoData
        title="Sua agenda de treinos está pronta para ser preenchida!"
        description="Aqui será exibido seu cronograma de aulas com alunos. Assim que seus alunos agendarem sessões, esta área mostrará automaticamente:"
        extra={[
          "✅ Envie lembretes para alunos sobre agendamento",
          "✅ Ofereça horários disponíveis",
          "✅ Crie pacotes de aulas atraentes",
        ]}
        href="/personal/workouts"
        link="Ir para meus alunos"
        key="TodaySession"
      />
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-4">
      <Card className="md:col-span-4">
        <CardHeader>
          <CardTitle>Sessões de hoje</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {nextSessions.length > 0 ? (
              nextSessions.map((session) => {
                // Pré-formatar as datas para evitar discrepâncias de hidratação
                const startTime = formatDate(session.startAt);
                const endTime = formatDate(session.endAt);

                return (
                  <div
                    key={session.id}
                    className="flex items-center gap-4 p-3 border border-border hover:bg-border cursor-pointer transition-colors rounded-lg"
                  >
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={session.student.user.avatarUrl || ""} />
                      <AvatarFallback>
                        {session.student.user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-medium">
                          {session.student.user.name}
                        </p>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            session.status === "CONFIRMED"
                              ? "bg-green-100 text-green-800"
                              : session.status === "SCHEDULED"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {session.status === "CONFIRMED"
                            ? "Confirmada"
                            : "Agendada"}
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <div>
                          <span className="capitalize">
                            {session.type === "PERSONAL_TRAINING"
                              ? "Treino"
                              : session.type === "NUTRITION"
                              ? "Nutrição"
                              : "Acompanhamento"}
                          </span>
                          <span className="mx-2">•</span>
                          <span className="text-muted-foreground">
                            {startTime} - {endTime}
                          </span>
                        </div>
                        <span className="text-muted-foreground capitalize">
                          {session.location?.toLowerCase() || ""}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                Nenhuma sessão agendada para o resto do dia
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
