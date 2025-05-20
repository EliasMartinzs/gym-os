import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { Tooltip } from "@/components/reusable/tootip";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectOptions } from "@/lib/enum-tranlations";
import { WorkoutTemplateSchema } from "@/lib/validations";
import { HelpCircle } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { MultiSelect } from "../../../../components/reusable/multi-select";

export const ConfigWorkout = ({
  form,
  handleKeyDown,
  removeTag,
}: {
  form: UseFormReturn<z.infer<typeof WorkoutTemplateSchema>>;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  removeTag: (tag: string) => void;
}) => {
  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="config.goals"
        render={({ field }) => (
          <FormItem className="space-y-1">
            <FormControl>
              <MultiSelect
                selected={field.value}
                onChange={field.onChange}
                options={SelectOptions.FitnessGoal}
                key="fitness-goal"
                placeholder="Selecione um ou mais objetivos"
              />
            </FormControl>
            <div className="flex flex-wrap gap-3">
              {field.value.length > 0 &&
                field.value.map((value) => (
                  <small
                    key={value}
                    className="p-1 px-2 rounded-xl border border-primary"
                  >
                    {
                      SelectOptions.FitnessGoal.find(
                        (option) => option.value === value
                      )?.label
                    }
                  </small>
                ))}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="flex max-md:flex-col items-start text-nowrap gap-x-10 gap-y-4">
        <div>
          <FormField
            control={form.control}
            name="config.level"
            render={({ field }) => (
              <FormItem className="w-full">
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o nível de dificuldade" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {SelectOptions.DifficultyLevel.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="w-full">
          <FormField
            control={form.control}
            name="config.tags"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div>
                    <div className="flex items-center gap-x-2">
                      <Input
                        placeholder="Digite uma tag e pressione Enter"
                        onKeyDown={handleKeyDown}
                      />
                      <Tooltip
                        trigger={
                          <HelpCircle className="size-5 text-muted-foreground" />
                        }
                        text={
                          <div className="space-y-4">
                            <p className="font-medium">
                              Use tags para classificar e filtrar os treinos dos
                              seus alunos. Elas ajudam a:
                            </p>
                            <p>
                              dentificar objetivos (ex.: emagrecimento,
                              hipertrofia, condicionamento).
                            </p>
                            <p>
                              Marcar especificidades (ex.: lesão no ombro,
                              pós-reabilitação).
                            </p>
                            <p>
                              Avançado Pré-competição / Manutenção Gestante /
                              Terceira Idade
                            </p>
                          </div>
                        }
                      />
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {field.value?.map((tag) => (
                        <div
                          key={tag}
                          className="flex flex-wrap gap-3 bg-card px-2 py-1 rounded-full items-center"
                        >
                          <small className="border py-1 px-2 rounded-2xl">
                            {tag}
                          </small>
                          <button
                            type="button"
                            onClick={() => removeTag(tag)}
                            className="cursor-pointer"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
};
