"use client";

import { TrendingUp } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  TooltipProps,
  XAxis,
} from "recharts";

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

const chartConfig = {
  name: {
    color: "var(--foreground)",
  },
} satisfies ChartConfig;

interface Props {
  chartData: {
    name: string;
    count: number;
  }[];
}

const CustomChartTootlip = ({
  active,
  payload,
  label,
}: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-md bg-background text-black p-4 shadow-md border">
        <p className="font-medium">{label}</p>
        <p className="text-sm">{payload[0].value} alunos</p>
      </div>
    );
  }
  return null;
};

export function TrainingDistributionChart({ chartData }: Props) {
  const data = useMemo(() => {
    return chartData.map((d, i) => ({
      ...d,
      fill: `var(--chart-${i + 1})`,
    }));
  }, [chartData]);

  return (
    <Card className="flex flex-col justify-between h-full">
      <CardHeader>
        <CardTitle>Distribuição de Alunos</CardTitle>
        <CardDescription>Por formato de treino</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={data}
            margin={{
              top: 20,
            }}
          >
            <CartesianGrid color="#fff" vertical={false} />
            <XAxis
              dataKey="name"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value}
            />
            <ChartTooltip cursor={false} content={<CustomChartTootlip />} />
            <Bar dataKey="count" radius={8}>
              <LabelList
                position="top"
                fill="#fff"
                offset={12}
                fontSize={12}
                className="fill-background"
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-center justify-center gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Crescimento de 7.3% este mês <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Mostrando a distribuição atual de alunos por formato
        </div>
      </CardFooter>
    </Card>
  );
}
