"use client";

import { AlertCircle } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";

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
  ChartTooltipContent,
} from "@/components/ui/chart";
import { getByStatus } from "@/features/personal/student/api/get-by-status";
import { NoData } from "../../../../components/reusable/no-data";
import { State } from "./status-students-chart-states";

const chartConfig = {
  status: {
    label: "Status",
    color: "oklch(var(--chart-1))",
  },
  count: {
    label: "Quantidade",
    color: "oklch(var(--background))",
  },
} satisfies ChartConfig;

export const StatusStudentsChart = () => {
  const { data, isLoading, isError, isRefetching, refetch } = getByStatus();

  if (isLoading)
    return (
      <SkeletonLoading className="lg:max-w-2xl min-h-96">
        Carregando seus alunos por status...
      </SkeletonLoading>
    );

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

  if (!data?.data || data?.data?.length === 0) {
    return (
      <NoData
        title="Status dos Seus Alunos (Visão Quantitativa)"
        description="Acompanhe a distribuição da sua base de alunos por status de treino"
        extra={[
          "✅ Ativo: alunos em treinamento regular",
          "⏸️ Em Espera: alunos temporariamente pausados",
          "📝 Pendente: alunos aguardando início",
          "🚫 Inativo: alunos sem atividades recentes",
          "📈 Em Progresso: alunos em acompanhamento ativo",
          "🏆 Concluído: alunos que finalizaram seus ciclos",
        ]}
        key="StatusStudentsChart"
      />
    );
  }

  return (
    <Card>
      <CardHeader className="space-y-2">
        <CardTitle>Controle Total dos Seus Alunos por Status</CardTitle>
        <CardDescription>
          Visualize quantos alunos estão em cada fase do seu acompanhamento:
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          className="h-52 w-full overflow-hidden"
          config={chartConfig}
        >
          <BarChart
            accessibilityLayer
            data={data.data}
            layout="vertical"
            margin={{
              top: 5,
              left: 5,
              right: 20,
              bottom: 5,
            }}
            width={500}
            height={200}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="name"
              type="category"
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
              hide
              width={80}
            />
            <XAxis dataKey="count" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Bar
              dataKey="count"
              layout="vertical"
              radius={[0, 16, 16, 0]} // Radius apenas no lado direito
              maxBarSize={40} // Reduz o tamanho máximo da barra
            >
              <LabelList
                dataKey="name"
                position="insideLeft"
                offset={8}
                fontSize={12}
                fill="#ffffff"
              />
              <LabelList
                dataKey="count"
                position="right"
                offset={8}
                fontSize={12}
                fill="#ffffff"
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      {data?.data?.find((item) => item.name === "Pendente")?.count && (
        <CardFooter className="flex-col items-start gap-2 text-sm pt-0">
          <div className="flex gap-2 font-medium leading-none">
            {data?.data.find((item) => item.name === "Pendente")?.count} alunos
            pendentes <AlertCircle className="h-4 w-4 text-yellow-500" />
          </div>
          <div className="leading-none text-muted-foreground">
            Alunos aguardando avaliação ou retorno
          </div>
        </CardFooter>
      )}
    </Card>
  );
};
