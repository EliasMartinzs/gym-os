"use client";

import { AlertCircle, TrendingUp } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  TooltipProps,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
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
  name: {
    label: "name",
    color: "var(--chart-1)",
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
        <p className="text-sm">{payload[0].value} vezes</p>
      </div>
    );
  }
  return null;
};

export const StatusStudentsChart = ({ chartData }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Status dos alunos</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              right: 16,
            }}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="name"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
              hide
            />
            <XAxis dataKey="count" type="number" hide />
            <ChartTooltip cursor={false} content={<CustomChartTootlip />} />
            <Bar dataKey="count" layout="vertical" radius={4}>
              <LabelList
                dataKey="name"
                position="insideLeft"
                offset={8}
                fontSize={12}
                fill="#fff"
              />
              <LabelList
                dataKey="count"
                position="right"
                offset={8}
                fontSize={12}
                fill="#fff"
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          15 alunos pendentes <AlertCircle className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Alunos aguardando avaliação ou retorno
        </div>
      </CardFooter>
    </Card>
  );
};
