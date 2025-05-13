"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getLastStudents } from "@/features/personal/student/api/get-last-students";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { NoData } from "../../../components/reusable/no-data";

export const LastStudents = () => {
  const { data, isError, isLoading } = getLastStudents();

  if (isLoading) {
    return (
      <div className="flex-1 h-full grid place-items-center">
        <Loader2 className="size-6 animate-spin" />
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
    <Card>
      <CardHeader>
        <CardTitle>Ultimos alunos cadastrados</CardTitle>
      </CardHeader>
      <CardContent className="px-0">
        <div className="flex flex-col gap-4">
          {data.data.map((p) => (
            <Link
              href={`/personal/student/${p.userId}`}
              key={p.id}
              className="p-2 flex items-center rounded-3xl gap-x-3 border hover:border-primary hover:bg-background/30 transition-colors"
            >
              <Image
                src={p.user.avatarUrl as string}
                alt="a"
                width={48}
                height={48}
                className="object-cover rounded-full"
              />
              <p>{p.user.name}</p>
              <p className="hidden lg:block">{p.user.phone}</p>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
