"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getGenders } from "@/features/personal/student/api/get-genders";
import { Loader2, Mars, Venus } from "lucide-react";
import { NoData } from "../../../components/reusable/no-data";

export const TotalStudentChart = () => {
  const { data, isError, isLoading } = getGenders();

  if (isLoading)
    return (
      <div className="flex-1 h-full grid place-items-center">
        <Loader2 className="size-6 animate-spin" />
      </div>
    );
  if (isError) return <></>;
  if (!data?.data) {
    return (
      <NoData
        title="Tudo pronto para começar! "
        description="Aqui é onde você verá o total de estudantes ativos no seu programa — assim que os primeiros alunos se matricularem, o gráfico será exibido automaticamente."
        extra={[
          "✅ Divulgue seu trabalho nas redes sociais.",
          "✅ Ofereça uma aula experimental gratuita.",
          "✅ Volte aqui depois para acompanhar seu crescimento!",
        ]}
        href="/personal/students"
        link="Ir para meus alunos"
        key="TotalStudent"
      />
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Total de alunos</CardTitle>
      </CardHeader>
      <CardContent className="flex gap-x-4">
        <div className="w-full flex flex-col items-center justify-center gap-4">
          <div className="w-full h-60 rounded-3xl shadow bg-primary grid place-items-center font-black">
            {data.data.FEMALE}
          </div>
          <Venus className="size-10" />
        </div>
        <div className="w-full flex flex-col items-center justify-center gap-4">
          <div className="w-full h-60 rounded-3xl shadow bg-primary grid place-items-center font-black">
            {data.data.MALE}
          </div>

          <Mars className="size-10" />
        </div>
      </CardContent>
    </Card>
  );
};
