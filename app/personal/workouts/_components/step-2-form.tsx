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
import { cn } from "@/lib/utils";
import { WorkoutTemplateSchema } from "@/lib/validations";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { StudentsCombobox } from "./students-combobox";
import { ConfigForm } from "./config-form";

type Props = {
  form: UseFormReturn<z.infer<typeof WorkoutTemplateSchema>>;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  removeTag: (tag: string) => void;
};

export const Step2Form = ({ form, handleKeyDown, removeTag }: Props) => {
  return (
    <div className="space-y-6">
      {!form.watch("isReusable") ? (
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="assigned.studentId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Selecione o aluno</FormLabel>
                <FormControl>
                  <StudentsCombobox
                    onSelect={field.onChange}
                    selected={field.value}
                    students={[
                      {
                        id: "1",
                        name: "ana",
                      },
                    ]}
                  />
                </FormControl>
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
