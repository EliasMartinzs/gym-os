"use client";

import { Button } from "@/components/ui/button";
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isSameDay,
  isSameMonth,
  startOfMonth,
  subMonths,
} from "date-fns";
import { ptBR } from "date-fns/locale";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

type DailyData = {
  id: string;
  content: string;
  // Adicione outros campos conforme necessário
};

export default function InteractiveDatePicker() {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [days, setDays] = useState<Date[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [dailyData, setDailyData] = useState<Record<string, DailyData[]>>({});

  // Gerar dias do mês atual
  useEffect(() => {
    const start = startOfMonth(currentDate);
    const end = endOfMonth(currentDate);
    const daysInMonth = eachDayOfInterval({ start, end });

    // Adicionar dias do mês anterior para completar a semana (opcional)
    const firstDayOfWeek = getDay(start);
    if (firstDayOfWeek > 0) {
      const prevMonthDays = eachDayOfInterval({
        start: new Date(
          start.getFullYear(),
          start.getMonth(),
          -firstDayOfWeek + 1
        ),
        end: new Date(start.getFullYear(), start.getMonth(), 0),
      });
      daysInMonth.unshift(...prevMonthDays);
    }

    setDays(daysInMonth);

    // Simular carregamento de dados (substitua por sua API real)
    loadDailyData(currentDate);
  }, [currentDate]);

  const loadDailyData = async (date: Date) => {
    // Simulação de dados - substitua por sua chamada API real
    const mockData: Record<string, DailyData[]> = {};
    const daysInMonth = eachDayOfInterval({
      start: startOfMonth(date),
      end: endOfMonth(date),
    });

    daysInMonth.forEach((day) => {
      const dateKey = format(day, "yyyy-MM-dd");
      mockData[dateKey] = [
        { id: "1", content: `Compromisso 1 para ${format(day, "dd/MM")}` },
        { id: "2", content: `Compromisso 2 para ${format(day, "dd/MM")}` },
      ];
    });

    setDailyData(mockData);
  };

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  const handleDateClick = (day: Date) => {
    setSelectedDate(day);
  };

  const getDayAbbreviation = (date: Date) => {
    return format(date, "EEE", { locale: ptBR }).substring(0, 3);
  };

  return (
    <div className="max-w-full mx-auto">
      {/* Cabeçalho com navegação do mês */}
      <div className="flex items-center gap-x-5 mb-4">
        <Button onClick={prevMonth} variant="ghost" aria-label="Mês anterior">
          <ChevronLeft className="size-5" />
        </Button>

        <Button onClick={nextMonth} variant="ghost" aria-label="Próximo mês">
          <ChevronRight className="size-5" />
        </Button>

        <h2 className="text-lg font-semibold capitalize">
          {format(currentDate, "MMMM yyyy", { locale: ptBR })}
        </h2>
      </div>

      {/* Dias da semana com scroll horizontal */}
      <div className="overflow-x-auto pb-2 no-scrollbar">
        <div className="flex space-x-8 xl:space-x-16 min-w-max">
          {days.map((day, index) => (
            <button
              key={index}
              onClick={() => handleDateClick(day)}
              className={`flex flex-col items-center p-3 rounded-lg min-w-[50px] transition-colors ${
                !isSameMonth(day, currentDate) ? "" : ""
              } ${
                isSameDay(day, selectedDate)
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-primary/50 text-muted-foreground hover:text-foreground"
              }`}
            >
              <span className="font-medium text-7xl">{format(day, "d")}</span>
              <span className="text-2xl mt-1">{getDayAbbreviation(day)}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Conteúdo do dia selecionado */}
      {/* <div className="mt-6">
        <h3 className="text-lg font-semibold mb-3 capitalize">
          {format(selectedDate, "EEEE, d MMMM yyyy", { locale: ptBR })}
        </h3>

        <div className="space-y-2">
          {dailyData[format(selectedDate, "yyyy-MM-dd")] ? (
            dailyData[format(selectedDate, "yyyy-MM-dd")].map((item) => (
              <div key={item.id} className="p-3 rounded-lg">
                <p>{item.content}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">
              Nenhum compromisso agendado para este dia.
            </p>
          )}
        </div>
      </div> */}
    </div>
  );
}
