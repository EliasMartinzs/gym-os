import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { Tooltip } from "@/components/reusable/tootip";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getStudents } from "@/features/personal/student/api/get-students";
import { cn } from "@/lib/utils";
import { WorkoutTemplateSchema } from "@/lib/validations";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon, HelpCircle, Loader2 } from "lucide-react";
import Image from "next/image";
import { useMemo } from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { ConfigWorkout } from "./config-workout";

type Props = {
  form: UseFormReturn<z.infer<typeof WorkoutTemplateSchema>>;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  removeTag: (tag: string) => void;
};

export const Step2Workout = ({ form, handleKeyDown, removeTag }: Props) => {
  const { data, isError, isLoading } = getStudents("user");

  const students = useMemo(() => {
    return data
      ?.filter((student) => student.workoutTemplate.length === 0)
      .map((student) => ({
        id: student.id,
        name: student.user.name,
        avatarUrl: student.user.avatarUrl,
      }));
  }, [data]);

  if (isLoading)
    return (
      <div className="w-full grid place-items-center h-full absolute top-0 left-0 z-50 bg-background">
        <Loader2 className="size-8 animate-spin" />
      </div>
    );

  if (isError)
    return (
      <div className="w-full text-center">Houve um erro tente novamente!</div>
    );

  return (
    <div className="space-y-6">
      {!form.watch("isReusable") ? (
        <div className="space-y-4 w-full">
          <FormField
            control={form.control}
            name="assigned.studentId"
            render={({ field }) => (
              <FormItem>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione o aluno" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {students?.map((option) => (
                      <SelectItem key={option.id} value={option.id}>
                        <Image
                          src={option.avatarUrl ?? "/no-user.png"}
                          width={32}
                          height={32}
                          alt={option.name}
                          className="object-cover rounded-full"
                          loading="lazy"
                        />{" "}
                        {option.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="assigned.startDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <div className="flex items-center gap-x-2">
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP", { locale: ptBR })
                          ) : (
                            <span>Escolha uma data</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>

                        <Tooltip
                          trigger={
                            <HelpCircle className="size-5 text-muted-foreground" />
                          }
                          text={
                            <div className="space-y-4">
                              <p className="font-medium">
                                Esta é a data em que você começou oficialmente a
                                treinar este aluno. Ela serve para:
                              </p>

                              <p>
                                Calcular a evolução do aluno (progresso ao longo
                                do tempo).
                              </p>
                              <p>Organizar seu cronograma de acompanhamento.</p>
                              <p>
                                Gerar relatórios de tempo de treino (ex.: 3
                                meses, 6 meses).
                              </p>
                            </div>
                          }
                        />
                      </div>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      locale={ptBR}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      ) : (
        <ConfigWorkout
          form={form}
          handleKeyDown={handleKeyDown}
          removeTag={removeTag}
        />
      )}
    </div>
  );
};
