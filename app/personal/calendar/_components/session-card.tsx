import { Tooltip } from "@/components/reusable/tootip";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { usePanelSlice } from "@/features/personal/student/hooks/use-expandable-panel";
import client from "@/lib/client";
import { EnumTranslations } from "@/lib/enum-tranlations";
import { formatDate } from "@/lib/utils";
import { InferResponseType } from "hono";
import { Calendar, Clock, HelpCircle } from "lucide-react";
import Image from "next/image";
import { DeleteSession } from "./delete-session";
import { SessionPanel } from "./session-panel";

type ApiResponse = InferResponseType<typeof client.api.personal.sessions.$get>;

type Session = NonNullable<ApiResponse["data"]>[number];

type Props = {
  session: Session;
};

export const SessionCard = ({ session }: Props) => {
  const { openPanel, closePanel } = usePanelSlice();

  return (
    <Card
      key={session.id}
      onClick={() => {
        openPanel(<SessionPanel session={session} closePanel={closePanel} />);
      }}
      className="relative"
    >
      <div className="w-full items-center flex justify-start flex-col gap-y-6">
        <Image
          src={session.student.user.avatarUrl ?? "/no-user.png"}
          width={144}
          height={144}
          className="object-center object-cover rounded-3xl"
          alt={session.student.user.name}
          loading="lazy"
        />

        <div className="text-center">
          <h6 className="font-medium text-xl">{session.student.user.name}</h6>
          <p>{session.student.user.phone}</p>
        </div>
      </div>

      <CardContent>
        <div className="flex items-center gap-y-6 flex-col">
          <div className="w-full flex items-center justify-between">
            <>
              {session.recurrence?.startDate && (
                <p className="flex gap-x-3 items-center">
                  <Calendar /> {formatDate(session.recurrence?.startDate)}{" "}
                  <Tooltip
                    trigger={
                      <HelpCircle className="size-4 text-muted-foreground" />
                    }
                    text="ìnicio do atendimento"
                  />
                </p>
              )}
            </>

            <div>{session.recurrence?.endDate && <>-</>}</div>

            <>
              {session.recurrence?.endDate ? (
                <p className="flex gap-x-3 items-center">
                  <Tooltip
                    trigger={
                      <HelpCircle className="size-4 text-muted-foreground" />
                    }
                    text={"Fim do atendimento"}
                  />
                  {formatDate(session.recurrence?.endDate)}

                  <Calendar />
                </p>
              ) : (
                "Nenhuma data definida"
              )}
            </>
          </div>

          <>
            {session.recurrence?.hours && (
              <div className="flex items-center">
                <p className="flex items-center gap-x-3">
                  <Clock /> {session.recurrence?.hours}
                  <Tooltip
                    trigger={
                      <HelpCircle className="size-4 text-muted-foreground" />
                    }
                    text="Horario do atendimento"
                  />
                </p>
              </div>
            )}
          </>

          <>
            {session.recurrence?.repeat && (
              <div className="flex items-center flex-col gap-3">
                <p className="font-medium text-lg">
                  {
                    EnumTranslations.RecurrencePattern[
                      session.recurrence.repeat
                    ]
                  }
                </p>
                {session.recurrence.scheduleType && (
                  <p className="font-medium">
                    {
                      EnumTranslations.ScheduleType[
                        session.recurrence.scheduleType
                      ]
                    }
                  </p>
                )}
                <div className="flex flex-wrap gap-3">
                  {session.recurrence.daysOfWeek &&
                    session.recurrence.daysOfWeek.map((item) => (
                      <p
                        key={item}
                        className="border px-2 py-1 rounded-full mt-2 bg-primary/50 text-primary-foreground font-medium"
                      >
                        {EnumTranslations.DayOfWeek[item]}
                      </p>
                    ))}
                </div>

                {session.recurrence.occurrenceCount !== null && <Separator />}
                {session.recurrence.occurrenceCount !== null && (
                  <p className="flex items-center gap-x-3">
                    Ocorrências: {session.recurrence.occurrenceCount}{" "}
                    <Tooltip
                      trigger={
                        <HelpCircle className="size-4 text-muted-foreground" />
                      }
                      text={
                        <div className="space-y-6">
                          <p className="font-medium">
                            Número de Atendimentos Programados
                          </p>

                          <p>
                            Quantidade de vezes que o atendimento será repetido.
                            Se vazio, a recorrência seguirá até a endDate ou
                            manualmente interrompida.
                          </p>

                          <p>Ex: 5 Semanas, quizena ou meses</p>
                        </div>
                      }
                    />
                  </p>
                )}

                {session.recurrence.dayOfMonth && (
                  <p className="text-lg font-medium">
                    Todo dia: {session.recurrence.dayOfMonth}
                  </p>
                )}
              </div>
            )}
          </>
        </div>
      </CardContent>

      <div
        className="absolute top-5 right-5"
        onClick={(e) => e.stopPropagation()}
      >
        <DeleteSession id={session.id} closePanel={closePanel} />
      </div>
    </Card>
  );
};
