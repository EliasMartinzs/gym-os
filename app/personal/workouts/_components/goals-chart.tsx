"use client";

import { Bar, BarChart, CartesianGrid, TooltipProps, XAxis } from "recharts";

import { NoData } from "@/components/reusable/no-data";
import { SkeletonLoading } from "@/components/reusable/skeleton-loading";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
} from "@/components/ui/chart";
import { getGoals } from "@/features/personal/student/api/get-goals";
import { usePanelSlice } from "@/features/personal/student/hooks/use-expandable-panel";
import { EnumTranslations } from "@/lib/enum-tranlations";
import { FitnessGoal } from "@prisma/client";
import React from "react";
import { State } from "../../students/_components/status-students-chart-states";
import { GoalPanel } from "./goal-panel";

const chartConfig = {
  goal: {
    label: "Objetivos",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

const CustomChartTootlip = ({
  active,
  payload,
  label,
}: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-md bg-background text-foreground p-4 shadow-md border">
        <p className="font-medium">{label}</p>
        <p className="text-sm">{payload[0].value} alunos</p>
      </div>
    );
  }
  return null;
};

export const GoalsChart = () => {
  const { data, isLoading, isError, isRefetching, refetch } = getGoals();
  const { openPanel, closePanel } = usePanelSlice();

  const chartData = React.useMemo(() => {
    return data?.data?.map((item) => ({
      id: item.name,
      name: EnumTranslations.FitnessGoal[item.name as FitnessGoal],
      value: item.value,
      fill: item.fill,
    }));
  }, [data?.data]);

  if (isLoading) return <SkeletonLoading />;

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

  if (!data?.data || data.data.length === 0 || !chartData) {
    return (
      <NoData
        title="Nenhum objetivo registrado ainda!"
        description="Este gráfico mostrará a distribuição dos objetivos de treino dos seus alunos — quando você começar a criar planos com objetivos específicos, os dados aparecerão aqui automaticamente."
        extra={[
          "✅ Defina objetivos claros nos planos de treino",
          "✅ Associe objetivos aos seus alunos durante as avaliações",
          "✅ Volte aqui para acompanhar as métricas por objetivo",
        ]}
        href="/personal/workouts"
        link="Criar planos de treino"
        key="ObjectivesDistribution"
      />
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Distribuição de Objetivos</CardTitle>
        <CardDescription>
          Quantidade de alunos por objetivo de treino
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="w-full h-[300px] overflow-x-auto overflow-y-hidden"
        >
          <BarChart
            width={Math.max(300, chartData.length * 100)}
            accessibilityLayer
            data={chartData}
            height={300}
          >
            <CartesianGrid vertical={false} />
            <XAxis dataKey="name" tickLine={false} axisLine={false} width={0} />
            <ChartTooltip cursor={false} content={<CustomChartTootlip />} />
            <Bar
              dataKey="value"
              barSize={50}
              radius={8}
              style={{ cursor: "pointer" }}
              onClick={(data) => {
                openPanel(<GoalPanel goal={data.id} closePanel={closePanel} />);
              }}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
