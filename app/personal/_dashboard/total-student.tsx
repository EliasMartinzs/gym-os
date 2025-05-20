"use client";

import { getGenders } from "@/features/personal/student/api/get-genders";
import { Loader2 } from "lucide-react";
import { NoData } from "../../../components/reusable/no-data";

import { TrendingUp } from "lucide-react";
import * as React from "react";
import { Label, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  total: {
    label: "Total",
  },
  MALE: {
    label: "Masculino",
  },
  FEMALE: {
    label: "Feminino",
  },
} satisfies ChartConfig;

export const TotalStudentChart = () => {
  const { data, isError, isLoading } = getGenders();

  const chartData = React.useMemo(
    () => [
      {
        gender: "MALE",
        count: data?.data?.MALE,
        fill: "var(--chart-1)",
      },
      {
        gender: "FEMALE",
        count: data?.data?.FEMALE,
        fill: "var(--chart-2)",
      },
    ],
    [data?.data]
  );

  const totalStudents = React.useMemo(() => {
    return (data?.data?.MALE ?? 0) + (data?.data?.FEMALE ?? 0);
  }, [data?.data]);

  if (isLoading)
    return (
      <div className="flex-1 h-full grid place-items-center">
        <Loader2 className="size-6 animate-spin" />
      </div>
    );

  if (isError) return <></>;

  if (!data?.data || (data.data.MALE === 0 && data.data.FEMALE === 0)) {
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
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Meus Alunos por Gênero</CardTitle>
        <CardDescription>Distribuição atual dos meus alunos</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="gender"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalStudents?.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Alunos
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      {
        <CardFooter className="flex-col gap-2 text-sm">
          <div className="flex items-center gap-2 font-medium leading-none">
            Distribuição equilibrada <TrendingUp className="h-4 w-4" />
          </div>
          <div className="leading-none text-muted-foreground">
            {`${Math.round(
              (data?.data?.MALE / totalStudents) * 100
            )}% Masculino / ${Math.round(
              (data?.data?.FEMALE / totalStudents) * 100
            )}% Feminino`}
          </div>
        </CardFooter>
      }
    </Card>
  );
};
