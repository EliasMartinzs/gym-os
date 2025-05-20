"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getWorkouts } from "@/features/personal/student/api/get-workouts";
import NoDataImg from "@/public/undraw_no-data_ig65.svg";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { WorkoutCard } from "./workout-card";
import { WorkoutFilters } from "./workout-filters";

export const WorkoutTemplates = () => {
  const searchParams = useSearchParams();
  const filters = new URLSearchParams(searchParams.toString());

  const { data, isLoading, isError, refetch } = getWorkouts(filters);

  if (isLoading) {
    return (
      <div className="w-full h-96 flex items-center justify-center">
        <Loader2 className="size-8 animate-spin" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center space-y-4">
        <p>Houve um erro tente novamente</p>
        <Button onClick={() => refetch()} variant="primary">
          Tente novamente
        </Button>
      </div>
    );
  }

  if (searchParams.toString() && data?.data?.length === 0) {
    return (
      <>
        <WorkoutFilters />
        <Card>
          <CardHeader className="space-y-4 text-center">
            <CardTitle>Nenhum resultado encontrado</CardTitle>
            <CardDescription className="space-y-4">
              <p>
                Parece que não encontramos nenhum dado correspondente aos
                filtros selecionados.
              </p>
            </CardDescription>
          </CardHeader>

          <CardContent className="relative max-md:size-72 size-96 mx-auto mt-10">
            <Image
              src={NoDataImg}
              fill
              className="object-contain max-md:size-72 size-96"
              alt="no-data"
              loading="lazy"
            />
          </CardContent>
        </Card>
      </>
    );
  }

  if (!data?.data || data?.data?.length === 0) {
    return (
      <div>
        <div className="space-y-4 text-center">
          <CardTitle>
            Um espaço para criar e gerenciar planos de treino personalizados
            para seus clientes.
          </CardTitle>
          <CardDescription className="space-y-4">
            <p>
              Nenhum modelo de treino cadastrado ainda. Clique em Criar Novo
              para começar a montar seus templates e organizar os treinos dos
              alunos!
            </p>

            <p>Esta seção contém exclusivamente templates reutilizáveis.</p>
          </CardDescription>
        </div>

        <div className="relative max-md:size-64 size-96 mx-auto mt-10">
          <Image
            src={NoDataImg}
            fill
            className="object-contain max-md:size-64 size-96"
            alt="no-data"
            loading="lazy"
          />
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Filters template */}
      <WorkoutFilters />

      <Separator />

      {/* Card Templates */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mt-5">
        {data?.data?.map((workout) => (
          <WorkoutCard workout={workout} key={workout.id} />
        ))}
      </div>
    </div>
  );
};
