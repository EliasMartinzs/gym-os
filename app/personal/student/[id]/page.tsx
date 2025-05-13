"use client";

import { Main } from "@/components/reusable/main";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getStudent } from "@/features/personal/student/api/get-student";
import { EnumTranslations } from "@/lib/enum-tranlations";
import { formatDate } from "@/lib/utils";
import NoDataImg from "@/public/undraw_no-data_ig65.svg";
import { Cake, Calendar, Loader2, Mail, Phone, Workflow } from "lucide-react";
import Image from "next/image";
import { use } from "react";

import { TrainingFormat } from "@prisma/client";
import { TemplateStudent } from "./_components/template";

import Background from "@/public/background.jpg";

type Props = {
  params: Promise<{ id: string }>;
};

export default function Student({ params }: Props) {
  const { id } = use(params);
  const { data, isLoading, isError, refetch } = getStudent(id);

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

  if (!data) {
    return (
      <Card className="max-lg:mt-10">
        <CardHeader className="space-y-4 text-center">
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

  console.log(data);

  return (
    <div>
      <div className="flex flex-col relative max-lg:items-center justify-center">
        <div className="min-w-full h-52 xl:h-64 relative hidden xl:block">
          <Image
            src={Background}
            alt="bg"
            fill
            className="object-cover object-center saturate-0 rounded-3xl"
            loading="lazy"
          />
        </div>
        <div className="xl:-translate-y-20 xl:ml-20 flex flex-col xl:flex-row gap-8 xl:items-end">
          <div className="max-xl:absolute top-0 left-0 z-50 relative max-xl:w-full max-xl:h-80 xl:size-64">
            <Image
              src={data.avatarUrl!}
              alt={data.name as string}
              loading="lazy"
              className="object-cover object-center max-xl:rounded-b-3xl xl:rounded-3xl"
              fill
            />
          </div>

          <div className="space-y-5 max-xl:mt-96">
            <h2 className="text-2xl font-semibold max-xl:text-center text-start">
              {data.name}
            </h2>
            <div className="flex flex-col xl:flex-row gap-8 text-lg font-light">
              <div className="flex gap-2">
                <Mail /> {data.email}
              </div>
              {data.phone && (
                <div className="flex gap-2">
                  <Phone /> {data.phone}
                </div>
              )}
              <div className="flex gap-2">
                <Calendar /> {formatDate(data.createdAt as string)}
              </div>
              {data?.student?.birthDate && (
                <div className="flex gap-2">
                  <Cake /> {formatDate(data.student.birthDate as string)}
                </div>
              )}
              <div className="flex gap-2">
                <Workflow />
                {
                  EnumTranslations.TrainingFormat[
                    data?.student?.trainingFormat as TrainingFormat
                  ]
                }
              </div>
            </div>
          </div>
        </div>
      </div>

      <Main className="max-xl:mt-10 xl:-translate-y-20">
        <TemplateStudent workoutTemplate={data.workoutTemplates[0]} />
      </Main>
    </div>
  );
}
