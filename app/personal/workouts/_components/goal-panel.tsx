"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getGoalsStudents } from "@/features/personal/student/api/get-goals-students";
import { EnumTranslations } from "@/lib/enum-tranlations";
import { FitnessGoal } from "@prisma/client";
import { Loader2, LucideLoaderCircle, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

type Props = {
  goal: FitnessGoal;
  closePanel: () => void;
};

export const GoalPanel = ({ goal, closePanel }: Props) => {
  const { data, isError, isLoading, refetch, isRefetching } =
    getGoalsStudents(goal);
  const router = useRouter();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <Loader2 className="size-5 animate-spin text-foreground" />
      </div>
    );
  }

  if (isError) {
    return (
      <Card className="min-w-96 mx-auto">
        <CardHeader>
          <CardTitle className="text-center">
            Houve um erro ao fazer sua requisição, tente novamente!
          </CardTitle>
        </CardHeader>

        <Button variant="primary" onClick={() => refetch()}>
          Recarregar{" "}
          {isRefetching && (
            <LucideLoaderCircle className="size-5 animate-spin" />
          )}
        </Button>
      </Card>
    );
  }

  if (!data?.data) {
    return (
      <Card className="min-w-96 mx-auto">
        <CardHeader>
          <CardTitle className="text-center">
            Houve um erro ao fazer sua requisição, tente novamente!
          </CardTitle>
        </CardHeader>

        <Button variant="primary" onClick={() => refetch()}>
          Recarregar{" "}
          {isRefetching && (
            <LucideLoaderCircle className="size-5 animate-spin" />
          )}
        </Button>
      </Card>
    );
  }

  return (
    <Card className="min-w-[90vw] xl:min-w-6xl relative max-h-[75vh] overflow-auto max-xl:p-10">
      <CardHeader className="space-y-4">
        <CardTitle className="text-center xl:text-lg xl:font-bold">
          Abaixo está a lista completa dos seus alunos que compartilham o mesmo
          objetivo de treino:
        </CardTitle>
        <p className="text-center xl:font-medium xl:text-xl">
          {EnumTranslations.FitnessGoal[goal]}
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {data.data.map((item) => (
            <div
              onClick={() => {
                router.push(`/personal/student/${item.userId}`);
                closePanel();
              }}
              key={item.id}
              className="border rounded-2xl shadow flex flex-col items-center justify-center p-4 cursor-pointer gap-4 hover:scale-105 transition-all ease-in"
            >
              <Image
                src={item.user.avatarUrl ?? "/no-user.png"}
                alt={item.user.name}
                width={64}
                height={64}
                className="object-contain rounded-2xl"
              />
              <div className="flex flex-col items-start justify-center gap-y-1">
                <h6 className="text-lg">{item.user.name}</h6>
                <p className="text-sm">{item.user.email}</p>
                <p className="text-sm">{item.user.phone}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <button
        onClick={closePanel}
        className="absolute top-3 right-3 cursor-pointer"
      >
        <X className="size-5" />
      </button>
    </Card>
  );
};
