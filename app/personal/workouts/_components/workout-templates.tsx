"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getWorkouts } from "@/features/personal/student/api/get-workouts";
import { DifficultyLevel, FitnessGoal } from "@prisma/client";
import { HelpCircle, Loader2 } from "lucide-react";
import { Workout } from "./workout";
import { Tooltip } from "@/components/reusable/tootip";
import Image from "next/image";
import NoDataImg from "@/public/undraw_no-data_ig65.svg";

export type WithEnums<T> = T & {
  goal: FitnessGoal[];
  level: DifficultyLevel | null;
};

export const WorkoutTemplates = () => {
  const { data, isLoading, isError, refetch } = getWorkouts();

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

  if (!data?.data || data?.data?.length === 0) {
    return (
      <Card>
        <CardHeader className="space-y-4 text-center">
          <CardTitle>
            Um espaço para criar e gerenciar planos de treino personalizados
            para seus clientes.
          </CardTitle>
          <CardDescription className="space-y-4">
            <p>
              Nenhum modelo de treino cadastrado ainda. Clique em ‘Criar Novo’
              para começar a montar seus templates e organizar os treinos dos
              alunos!"
            </p>

            <p>Esta seção contém exclusivamente templates reutilizáveis.</p>
          </CardDescription>
        </CardHeader>

        <CardContent className="relative size-96 mx-auto mt-10">
          <Image
            src={NoDataImg}
            fill
            className="object-contain size-96"
            alt="no-data"
            loading="lazy"
          />
        </CardContent>
      </Card>
    );
  }

  return (
    <div>
      <div className="w-full flex items-center gap-x-4">
        <h2 className="text-2xl italic from-muted">Meus templates</h2>
        <Tooltip
          text={
            <div className="flex flex-col mx-auto max-w-sm gap-y-2 text-start">
              <p className="font-medium">
                Aqui você encontrará seus templates reutilizáveis.
              </p>

              <p>
                - Eles permitem que você aplique modelos já criados a outros
                usuários de forma prática e personalizada, conforme a sua
                necessidade.
              </p>
            </div>
          }
          trigger={<HelpCircle className="size-5" />}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mt-5">
        {data?.data?.map((workout) => (
          <Workout workout={workout} key={workout.id} />
        ))}
      </div>
    </div>
  );
};
