"use client";

import { TrendingUp } from "lucide-react";
import { Pie, PieChart, TooltipProps } from "recharts";

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
import { useMemo } from "react";

const chartConfig = {} satisfies ChartConfig;

interface Props {
  chartData: {
    name: string;
    count: number;
  }[];
}

const CustomChartTootlip = ({
  active,
  payload,
}: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-md bg-background text-black p-4 shadow-md border">
        <p className="font-medium">{payload[0].name}</p>
        <p className="text-sm">{payload[0].value} vezes</p>
      </div>
    );
  }
  return null;
};

export function TopExercisesChart({ chartData }: Props) {
  const data = useMemo(() => {
    return chartData.map((d, i) => ({
      ...d,
      fill: `var(--chart-${i + 1})`,
    }));
  }, [chartData]);

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
              data={data}
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
