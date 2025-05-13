import { MultiSelect } from "@/components/reusable/multi-select";
import { Tooltip } from "@/components/reusable/tootip";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EnumTranslations } from "@/lib/enum-tranlations";
import { cn } from "@/lib/utils";
import { FullSessionFormValues } from "@/lib/validations";
import { DayOfWeek, RecurrencePattern, ScheduleType } from "@prisma/client";
import { InputMask } from "@react-input/mask";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon, HelpCircle } from "lucide-react";
import { UseFormReturn } from "react-hook-form";

type Props = {
  form: UseFormReturn<FullSessionFormValues>;
};

export const Step2FormRecurrence = ({ form }: Props) => {
  const { watch } = form;
  const repeatType = watch("recurrence.repeat");

  return (
    <div className="space-y-6">
      {/* Tipo de Recorrência - Corrigido */}
      <FormField
        control={form.control}
        name="recurrence.repeat"
        render={({ field }) => (
          <FormItem>
            <div className="flex items-center gap-2 mb-2">
              <FormLabel>Tipo de Recorrência</FormLabel>
              <Tooltip
                trigger={
                  <HelpCircle className="size-4 text-muted-foreground" />
                }
                text={
                  <div className="space-y-2 p-2">
                    <p className="font-medium">Tipos de Recorrência:</p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>Diário: Todo dia</li>
                      <li>Semanal: Dias fixos na semana</li>
                      <li>Mensal: Todo dia X do mês</li>
                      <li>Personalizado: Intervalos customizados</li>
                    </ul>
                  </div>
                }
              />
            </div>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {Object.values(RecurrencePattern).map((item) => (
                  <SelectItem key={item} value={item}>
                    {EnumTranslations.RecurrencePattern[item]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="flex gap-x-3">
        {/* Data de Início - Corrigido */}
        <FormField
          control={form.control}
          name="recurrence.startDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <div className="flex items-center gap-2 mb-2">
                <FormLabel>Data de Início</FormLabel>
                <Tooltip
                  trigger={
                    <HelpCircle className="size-4 text-muted-foreground" />
                  }
                  text="Quando a primeira sessão vai acontecer. Não pode ser no passado!"
                />
              </div>
              <Popover modal>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className="w-[240px] pl-3 text-left font-normal"
                    >
                      {field.value ? (
                        format(field.value, "yyyy-MM-dd", { locale: ptBR })
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
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Data de Término (Opcional) - Corrigido */}
        <FormField
          control={form.control}
          name="recurrence.endDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <div className="flex items-center gap-2 mb-2">
                <FormLabel>Data de Término (Opcional)</FormLabel>
                <Tooltip
                  trigger={
                    <HelpCircle className="size-4 text-muted-foreground" />
                  }
                  text="Quando a recorrência para automaticamente. Deixe em branco para repetir indefinidamente."
                />
              </div>
              <Popover modal>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className="w-[240px] pl-3 text-left font-normal"
                    >
                      {field.value ? (
                        format(field.value, "yyyy-MM-dd", { locale: ptBR })
                      ) : (
                        <span>Não definido</span>
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
                    disabled={(date) => {
                      const today = new Date();
                      today.setHours(0, 0, 0, 0);
                      return date <= today;
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="recurrence.hours"
        render={({ field }) => (
          <FormItem>
            <div className="flex items-center gap-2 mb-2">
              <FormLabel>Hora do atendimento</FormLabel>
              <Tooltip
                trigger={
                  <HelpCircle className="size-4 text-muted-foreground" />
                }
                text="Tempo de cada sessão. Mínimo de 30 minutos, máximo de 3 horas"
              />
            </div>
            <FormControl>
              <InputMask
                {...field}
                mask="__:__"
                placeholder="14:45"
                replacement={{ _: /\d/ }}
                className={cn(
                  "file:text-foreground placeholder:text-accent-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                  "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
                )}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="flex items-start gap-x-5">
        {/* Duração - Corrigido */}
        <FormField
          control={form.control}
          name="recurrence.durationMinutes"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-2 mb-2">
                <FormLabel>Duração (minutos)</FormLabel>
                <Tooltip
                  trigger={
                    <HelpCircle className="size-4 text-muted-foreground" />
                  }
                  text="Tempo de cada sessão. Mínimo de 30 minutos, máximo de 3 horas"
                />
              </div>
              <FormControl>
                <Input
                  min={30}
                  max={180}
                  {...field}
                  onChange={(e) => field.onChange(parseInt(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {repeatType === "DAILY" && (
          <FormField
            control={form.control}
            name="recurrence.scheduleType"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-2 mb-2">
                  <FormLabel>Formato do atendimento?</FormLabel>
                  <Tooltip
                    trigger={
                      <HelpCircle className="size-4 text-muted-foreground" />
                    }
                    text={
                      <div className="space-y-6">
                        <p className="font-medium">
                          Esta opção permite limitar por quantidade ao invés de
                          data final.
                        </p>

                        <p>Ignorado se você definir uma data de término</p>
                        <p>Útil para pacotes com número fixo de sessões</p>
                        <p>
                          Cada ocorrência aparecerá no calendário
                          automaticamente
                        </p>
                      </div>
                    }
                  />
                </div>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    {Object.values(ScheduleType).map((item) => (
                      <div className="flex items-center space-x-2" key={item}>
                        <RadioGroupItem value={item} id={item} />
                        <Label htmlFor={item}>
                          {EnumTranslations.ScheduleType[item]}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {repeatType !== "DAILY" && (
          <FormField
            control={form.control}
            name="recurrence.occurrenceCount"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-2 mb-2">
                  <FormLabel>
                    Quantas vezes esta sessão vai se repetir?
                  </FormLabel>
                  <Tooltip
                    trigger={
                      <HelpCircle className="size-4 text-muted-foreground" />
                    }
                    text={
                      <div className="space-y-6">
                        <p className="font-medium">
                          Esta opção permite limitar por quantidade ao invés de
                          data final.
                        </p>

                        <p>Ignorado se você definir uma data de término</p>
                        <p>Útil para pacotes com número fixo de sessões</p>
                        <p>
                          Cada ocorrência aparecerá no calendário
                          automaticamente
                        </p>
                      </div>
                    }
                  />
                </div>
                <FormControl>
                  <Input
                    min={1}
                    {...field}
                    onChange={(e) => field.onChange(parseInt(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
      </div>

      {/* Campos Condicionais */}
      {repeatType === "WEEKLY" && (
        <>
          <FormField
            control={form.control}
            name="recurrence.daysOfWeek"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-2 mb-2">
                  <FormLabel>Dias da semana</FormLabel>
                  <Tooltip
                    trigger={
                      <HelpCircle className="size-4 text-muted-foreground" />
                    }
                    text="Selecione os dias de treino. Ex: Segunda e Quinta para 2x na semana."
                  />
                </div>
                <FormControl>
                  <MultiSelect
                    selected={field.value || []}
                    onChange={field.onChange}
                    placeholder="Selecione os dias da semana"
                    options={Object.values(DayOfWeek).map((item) => ({
                      label: EnumTranslations.DayOfWeek[item],
                      value: item,
                    }))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </>
      )}

      {repeatType === "MONTHLY" && (
        <>
          <FormField
            control={form.control}
            name="recurrence.dayOfMonth"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-2 mb-2">
                  <FormLabel>Dia do Mês</FormLabel>
                  <Tooltip
                    trigger={
                      <HelpCircle className="size-4 text-muted-foreground" />
                    }
                    text="Dia fixo para repetição mensal. Ex: Dia 15 = todo dia 15 do mês."
                  />
                </div>
                <FormControl>
                  <Input
                    min={1}
                    max={31}
                    {...field}
                    onChange={(e) => field.onChange(parseInt(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </>
      )}
    </div>
  );
};
