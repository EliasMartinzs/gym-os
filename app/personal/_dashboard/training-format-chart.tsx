"use client";

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
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
} from "@/components/ui/chart";
import { getFormat } from "@/features/personal/student/api/get-format";
import { NoData } from "../../../components/reusable/no-data";
import { SkeletonLoading } from "@/components/reusable/skeleton-loading";
import { State } from "../students/_components/status-students-chart-states";

const chartConfig = {
  name: {
    color: "var(--foreground)",
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

export function TrainingFormatChart() {
  const { data, isLoading, isError, isRefetching, refetch } = getFormat();

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

  const haveStudent = data?.data?.some((student) => student.count > 0);

  if (!haveStudent || !data?.data) {
    return (
      <NoData
        title="Tudo configurado e pronto para mapear sua distribuição"
        description="Aqui é onde você verá o panorama completo dos seus alunos por formato de treino (Presencial, Online, Híbrido, Plano Nutricional). Assim que os primeiros alunos forem registrados com seus formatos, o gráfico será gerado automaticamente."
        extra={[
          "✅ Defina formatos de treino ao cadastrar novos alunos",
          "✅ Atualize perfis existentes com o formato correto",
          "✅ Ofereça diferentes modalidades para atrair mais alunos",
        ]}
        href="/personal/workouts"
        link="Ir para meus treinos"
        key="TrainingFormatChart"
      />
    );
  }

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
            data={data.data}
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
                className="fill-foreground"
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
