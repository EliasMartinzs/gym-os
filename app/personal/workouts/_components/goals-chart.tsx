"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  TooltipProps,
  XAxis,
} from "recharts";

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
import { NoData } from "@/components/reusable/no-data";
import { Loader2 } from "lucide-react";
import { usePanelSlice } from "@/features/personal/student/hooks/use-expandable-panel";
import { GoalPanel } from "./goal-panel";
import React from "react";
import { EnumTranslations } from "@/lib/enum-tranlations";
import { FitnessGoal } from "@prisma/client";

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
  const { data, isLoading, isError } = getGoals();
  const { openPanel, closePanel } = usePanelSlice();

  const chartData = React.useMemo(() => {
    return data?.data?.map((item) => ({
      id: item.name,
      name: EnumTranslations.FitnessGoal[item.name as FitnessGoal],
      value: item.value,
      fill: item.fill,
    }));
  }, [data?.data]);

  if (isLoading)
    return (
      <div className="flex-1 h-full grid place-items-center">
        <Loader2 className="size-6 animate-spin" />
      </div>
    );
  if (isError) return <></>;
  if (!data?.data || data.data.length === 0) {
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
        <ResponsiveContainer width="100%">
          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-[250px] w-full"
          >
            <BarChart accessibilityLayer data={chartData} barCategoryGap={1}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="name"
                tickLine={false}
                axisLine={false}
                width={0}
              />
              <ChartTooltip cursor={false} content={<CustomChartTootlip />} />
              <Bar
                dataKey="value"
                barSize={50}
                radius={8}
                style={{ cursor: "pointer" }}
                onClick={(data) => {
                  openPanel(
                    <GoalPanel goal={data.id} closePanel={closePanel} />
                  );
                }}
              />
            </BarChart>
          </ChartContainer>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
