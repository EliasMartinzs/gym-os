import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import client from "@/lib/client";
import { EnumTranslations } from "@/lib/enum-tranlations";
import { formatDate } from "@/lib/utils";
import { LocationType, RecurrencePattern } from "@prisma/client";
import { InferResponseType } from "hono";
import { Clock, MapPin, Timer, X } from "lucide-react";

type ApiResponse = InferResponseType<typeof client.api.personal.sessions.$get>;

type Session = NonNullable<ApiResponse["data"]>[number];

type Props = {
  session: Session;
  closePanel: () => void;
};

export const SessionPanel = ({ session, closePanel }: Props) => {
  return (
    <Card className="min-w-[90vw] xl:min-w-6xl relative max-h-[75vh] overflow-auto max-xl:p-10">
      <CardHeader>
        <CardTitle className="w-full flex items-center justify-between">
          <p className="text-xl">{session.student.user.name}</p>

          <span className="bg-primary/50 text-primary-foreground rounded-full py-1 px-2 text-center">
            {EnumTranslations.SessionStatus[session.status]}
          </span>
        </CardTitle>
        <CardDescription>{session.observations}</CardDescription>
      </CardHeader>
      <CardContent className="p-0 space-y-3">
        <div className="text-lg font-medium flex items-center justify-between">
          Atendimento{" "}
          {
            EnumTranslations.RecurrencePattern[
              session.recurrence?.repeat as RecurrencePattern
            ]
          }
          ,{" "}
          {EnumTranslations.LocationType[session.locationType as LocationType]}
        </div>

        {session.locationType !== "ONLINE" && <Separator />}

        {session.locationType !== "ONLINE" && (
          <div className="space-y-3">
            <p className="flex items-center gap-x-3 font-lg font-medium">
              {" "}
              <MapPin /> Endereço
            </p>

            <div>
              <p className="flex items-center gap-x-3 text-muted-foreground">
                {session.street}, {session.number}
              </p>
              <p className="text-muted-foreground">
                {session.neighborhood}, {session.city}, {session.postalCode}
              </p>
              <Separator className="my-3" />
              <p className="flex items-center gap-x-3">
                <Timer />
                <p className="text-muted-foreground">
                  Prioridade {EnumTranslations.PriorityLevel[session.priority]}
                </p>
              </p>
            </div>
          </div>
        )}

        <Separator />

        <div className="space-y-3">
          <p className="flex items-center gap-x-3 text-lg font-medium">
            <Clock /> Data e Hora
          </p>

          <div className="flex items-center max-xl:justify-between xl:gap-x-5">
            {session.recurrence?.startDate && (
              <p className="flex gap-x-3 items-center text-muted-foreground">
                {formatDate(session.recurrence?.startDate)}{" "}
              </p>
            )}

            {session.recurrence?.endDate && "-"}

            {session.recurrence?.endDate && (
              <p className="flex gap-x-3 items-center text-muted-foreground">
                {formatDate(session.recurrence?.endDate)}{" "}
              </p>
            )}

            {session.recurrence?.hours && "-"}

            {session.recurrence?.hours && (
              <div className="flex items-center">
                <p className="flex items-center gap-x-3 text-muted-foreground">
                  {session.recurrence?.hours}
                </p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
      <X
        className="size-5 absolute top-2 right-2 cursor-pointer"
        onClick={closePanel}
      />
    </Card>
  );
};
