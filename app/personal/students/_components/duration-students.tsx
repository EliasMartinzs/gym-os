"use client";

import { NoData } from "@/components/reusable/no-data";
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
import { getDuration } from "@/features/personal/student/api/get-duration";
import { useMemo } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  TooltipProps,
  XAxis,
} from "recharts";

const chartConfig = {
  name: {
    label: "Nome",
  },
  durationAsStudent: {
    label: "Dias",
  },
} satisfies ChartConfig;

const CustomChartTooltip = ({
  active,
  payload,
}: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-foreground text-background rounded-lg border p-3 shadow-sm">
        <p className="text-sm">{payload[0].value} dias</p>
      </div>
    );
  }
  return null;
};

export function StudentsDurationChart() {
  const { data, isError, isLoading } = getDuration();

  const chartData = useMemo(() => {
    return data?.data?.filter((d) => d.durationAsStudent !== 0);
  }, [data]);

  if (isLoading) return <div>Carregando...</div>;
  if (isError) return <div>Erro ao carregar dados</div>;
  if (!chartData || chartData.length === 0) {
    return (
      <NoData
        title="Tempo de Relacionamento com Seus Alunos"
        description="Este gráfico mostra o histórico de duração da sua parceria com cada aluno, ajudando você a:"
        extra={[
          "1️⃣ Identificar padrões de retenção",
          "2️⃣ Personalizar abordagens por fase de relacionamento",
          "3️⃣ Antecipar renovações e possíveis desistências",
        ]}
      />
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tempo de Relacionamento com Alunos</CardTitle>
        <CardDescription>
          Duração em dias que cada usuário permaneceu ativo como aluno
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="w-full h-[300px] overflow-x-auto overflow-y-hidden"
        >
          <div>
            <BarChart
              data={chartData}
              margin={{ left: 12, right: 12, bottom: 12, top: 12 }}
              width={Math.max(300, chartData.length * 100)}
              height={300}
            >
              <CartesianGrid vertical={true} />
              <ChartTooltip
                content={<CustomChartTooltip />}
                cursor={false}
                wrapperStyle={{
                  background: "transparent",
                  zIndex: 100,
                }}
                contentStyle={{
                  background: "transparent",
                  border: "none",
                  padding: 0,
                }}
              />
              <XAxis
                dataKey="name"
                tickLine={false}
                axisLine={false}
                tick={false}
              />
              <Bar
                dataKey="durationAsStudent"
                fill="var(--chart-1)"
                radius={[16, 16, 0, 0]}
                barSize={50}
              >
                <LabelList
                  dataKey="name"
                  position="center"
                  angle={-90}
                  style={{
                    fill: "var(--foreground)",
                  }}
                />
              </Bar>
            </BarChart>
          </div>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
