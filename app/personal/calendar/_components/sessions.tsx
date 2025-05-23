"use client";

import { Separator } from "@/components/ui/separator";
import { getSessions } from "@/features/personal/student/api/get-sessions";
import NoData from "@/public/undraw_no-data_ig65.svg";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { State } from "../../students/_components/status-students-chart-states";
import { CreateSession } from "./create-session";
import InteractiveDatePicker from "./interactive-date-picker";
import { SessionCard } from "./session-card";
import { SessionsFilters } from "./sessions-filters";
export const Sessions = () => {
  const searchParams = useSearchParams();
  const filters = new URLSearchParams(searchParams.toString());
  const { data, isLoading, isError, refetch, isRefetching } =
    getSessions(filters);

  if (isLoading) {
    return (
      <div className="w-full h-96 flex items-center justify-center">
        <Loader2 className="size-8 animate-spin" />
      </div>
    );
  }

  if (!data?.data || data.data.length === 0) {
    return (
      <div
        className="w-full flex-1 flex flex-col items-center text-center justify-center gap-y-10
            "
      >
        <InteractiveDatePicker />

        <Separator />

        <div className="w-full flex text-start justify-start">
          <SessionsFilters />
        </div>

        <div className="space-y-2">
          <h6 className="text-xl font-medium">
            Sua lista de atendimentos está vazia
          </h6>
          <p className="text-sm text-muted-foreground">
            Comece cadastrando seu primeiro treino para um aluno para acompanhar
            ses atendimentos
          </p>
        </div>

        <CreateSession />

        <Image
          src={NoData}
          alt="create-user"
          className="object-contain max-md:size-64 size-96 xl:w-[600px] xl:h-[600px]"
        />
      </div>
    );
  }

  if (isError)
    return (
      <State
        isRefetching={isRefetching}
        onClick={() => {
          refetch();
        }}
      >
        Houve um erro ao buscar dados, tente novamente!
      </State>
    );

  return (
    <div className="space-y-6">
      <InteractiveDatePicker />

      <SessionsFilters />

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
        {data?.data.map((session) => (
          <SessionCard session={session} key={session.id} />
        ))}
      </div>
    </div>
  );
};
