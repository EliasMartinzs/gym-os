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
import { formatDate, getYearStudent } from "@/lib/utils";
import NoDataImg from "@/public/undraw_no-data_ig65.svg";
import { Cake, Calendar, Loader2, Mail, Phone, Workflow } from "lucide-react";
import Image from "next/image";

import Background from "@/public/background.jpg";
import { Gender, TrainingFormat } from "@prisma/client";
import { use } from "react";
import { TemplateStudent } from "./_components/template";

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

  return (
    <div className="space-y-8">
      <div className="flex flex-col relative max-lg:items-center justify-center max-xl:hidden">
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
          <div className="size-64 rounded-3xl">
            <Image
              src={data.avatarUrl ?? "/no-user.png"}
              alt={data.name as string}
              loading="lazy"
              className="object-cover object-center rounded-3xl"
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

      <div className="w-full xl:hidden">
        <Image
          src={Background}
          alt="background"
          className="object-cover w-full h-64 saturate-0"
          loading="lazy"
        />

        <div className="space-y-8 -translate-y-14">
          <div className="w-full flex items-center px-10 justify-evenly">
            {/* <Icon className="size-14 bg-foreground text-background">
              <Settings2 />
            </Icon> */}
            <Image
              src={data.avatarUrl ?? "/no-user.png"}
              alt="background"
              className="object-cover size-32 rounded-full saturate-0"
              loading="lazy"
              width={128}
              height={128}
            />
            {/* <Icon className="size-14 bg-foreground text-background">
              <Trash />
            </Icon> */}
          </div>

          <div className="space-y-4 text-center">
            <p className="text-muted-foreground text-sm">
              Membro desde {formatDate(data.createdAt as string)}
            </p>

            <h6 className="text-lg font-medium capitalize">{data.name}</h6>

            <div className="flex items-center justify-center gap-x-3">
              <p>{EnumTranslations.Gender[data.student?.gender as Gender]}</p> -
              {data.student?.birthDate && (
                <p>{getYearStudent(new Date(data.student?.birthDate))}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <Main className="max-xl:-translate-y-14 xl:-translate-y-20">
        <TemplateStudent workoutTemplate={data.workoutTemplates[0]} />
      </Main>
    </div>
  );
}
