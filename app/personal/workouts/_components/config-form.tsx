import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectOptions } from "@/lib/enum-tranlations";
import { WorkoutTemplateSchema } from "@/lib/validations";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { MultiSelect } from "../../../../components/reusable/multi-select";

export const ConfigForm = ({
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
            <FormLabel>Selecione o objetivo</FormLabel>
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
                  <small key={value} className="p-1 px-2 rounded-full">
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

      <div className="flex items-start text-nowrap gap-10">
        <div>
          <FormField
            control={form.control}
            name="config.level"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nível de dificuldade</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o nível" />
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

        <div>
          <FormField
            control={form.control}
            name="config.tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tags</FormLabel>
                <FormControl>
                  <div>
                    <Input
                      placeholder="Digite uma tag e pressione Enter"
                      onKeyDown={handleKeyDown}
                    />
                    <div className="flex flex-wrap gap-2 mt-2">
                      {field.value?.map((tag) => (
                        <div
                          key={tag}
                          className="flex flex-wrap gap-3 bg-card px-2 py-1 rounded-full items-center"
                        >
                          <small className="">{tag}</small>
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
