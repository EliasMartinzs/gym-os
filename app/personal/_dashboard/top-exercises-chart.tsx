"use client";

import { TrendingUp } from "lucide-react";
import { Pie, PieChart, TooltipProps } from "recharts";

import { SkeletonLoading } from "@/components/reusable/skeleton-loading";
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
} from "@/components/ui/chart";
import { getTopExercises } from "@/features/personal/student/api/top-exercises";
import { NoData } from "../../../components/reusable/no-data";
import { State } from "../students/_components/status-students-chart-states";

const chartConfig = {} satisfies ChartConfig;

const CustomChartTootlip = ({
  active,
  payload,
}: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-md bg-background text-foreground p-4 shadow-md border">
        <p className="font-medium">{payload[0].name}</p>
        <p className="text-sm">{payload[0].value} vezes</p>
      </div>
    );
  }
  return null;
};

export function TopExercisesChart() {
  const { data, isLoading, isError, isRefetching, refetch } = getTopExercises();

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

  if (!data?.data || data.data.length === 0) {
    return (
      <NoData
        title="Parece que você ainda não prescreveu exercícios para seus alunos... mas tudo bem!"
        description="Aqui é onde você verá um ranking dos exercícios mais usados nos treinos — assim que começar a criar rotinas, o gráfico aparecerá automaticamente!"
        extra={[
          "✅ Explore nossa biblioteca de exercícios.",
          "✅ Crie treinos personalizados para cada aluno.",
          "✅ Volte aqui depois para acompanhar seus top 5!",
        ]}
        href="/personal/workouts"
        link="Ir para meus exercícios"
        key="TopExercisesChart"
      />
    );
  }

  return (
    <Card>
      <CardHeader className="items-center pb-0">
        <CardTitle>Top 5 Exercícios</CardTitle>
        <CardDescription>Mais prescritos este mês</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px] pb-0 [&_.recharts-pie-label-text]:fill-foreground"
        >
          <PieChart>
            <ChartTooltip content={<CustomChartTootlip />} />
            <Pie
              data={data.data}
              dataKey="count"
              label
              nameKey="name"
              labelLine={true}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Frequência de prescrição <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-background*70">
          Quantidade de vezes incluídos em treinos
        </div>
      </CardFooter>
    </Card>
  );
}
