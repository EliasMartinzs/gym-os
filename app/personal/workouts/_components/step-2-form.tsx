import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

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
import { CalendarIcon, Loader2 } from "lucide-react";
import { useMemo } from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { ConfigForm } from "./config-form";

type Props = {
  form: UseFormReturn<z.infer<typeof WorkoutTemplateSchema>>;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  removeTag: (tag: string) => void;
};

export const Step2Form = ({ form, handleKeyDown, removeTag }: Props) => {
  const { data, isError, isLoading } = getStudents("user");

  const students = useMemo(() => {
    return data
      ?.filter((student) => student.workoutTemplate.length === 0)
      .map((student) => ({
        id: student.id,
        name: student.user.name,
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
                <FormLabel>Alunos</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione o aluno" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {students?.map((option) => (
                      <SelectItem key={option.id} value={option.id}>
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
                <FormLabel>Data de ínicio</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
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
        <ConfigForm
          form={form}
          handleKeyDown={handleKeyDown}
          removeTag={removeTag}
        />
      )}
    </div>
  );
};
