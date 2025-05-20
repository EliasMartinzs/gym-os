"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getLastStudents } from "@/features/personal/student/api/get-last-students";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { NoData } from "../../../components/reusable/no-data";
import { formatDate } from "@/lib/utils";

export const LastStudents = () => {
  const { data, isError, isLoading } = getLastStudents();

  if (isLoading) {
    return (
      <div className="flex-1 h-full grid place-items-center">
        <Skeleton className="w-full min-h-52 flex items-center justify-center">
          <p>Carregando...</p>
        </Skeleton>
      </div>
    );
  }

  if (isError) return <></>;

  if (!data?.data || data.data.length === 0) {
    return (
      <NoData
        title="Seu espaço para acompanhar novos alunos está pronto!"
        description="Aqui você verá os últimos alunos cadastrados. Assim que novos alunos forem registrados sob sua supervisão, esta área mostrará automaticamente as informações mais recentes."
        extra={[
          "✅ Envie uma mensagem de boas-vindas personalizada",
          "✅ Agende uma avaliação física inicial",
          "✅ Crie um plano de treino personalizado",
        ]}
        href="/personal/students"
        link="Ir para meus alunos"
        key="LastStudents"
      />
    );
  }

  return (
    <Card className="space-y-6">
      <CardHeader>
        <CardTitle>Ultimos 5 alunos</CardTitle>
        <CardDescription>
          Acompanhe os últimos 5 alunos cadastrados.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {data.data.map((p) => (
            <Link
              href={`/personal/student/${p.userId}`}
              key={p.id}
              className="bg-background p-3 rounded-3xl flex items-center gap-3 border hover:border-primary transition-colors"
            >
              <Image
                src={p.user.avatarUrl as string}
                alt="a"
                width={48}
                height={48}
                className="object-cover rounded-2xl"
              />
              <p>{p.user.name}</p>
              <ChevronRight />
            </Link>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <p>
          Último aluno adicionado em:{" "}
          {formatDate(data.data[data.data.length - 1].createdAt)}
        </p>
      </CardFooter>
    </Card>
  );
};
