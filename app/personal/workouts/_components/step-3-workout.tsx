import { WorkoutTemplateSchema } from "@/lib/validations";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { ConfigWorkout } from "./config-workout";
import { Step4Workout } from "./step-4-workout";

type Props = {
  form: UseFormReturn<z.infer<typeof WorkoutTemplateSchema>>;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  removeTag: (tag: string) => void;
};

export const Step3Workout = ({ form, handleKeyDown, removeTag }: Props) => {
  const isReusable = form.watch("isReusable");

  return (
    <div>
      {!isReusable ? (
        <ConfigWorkout
          form={form}
          handleKeyDown={handleKeyDown}
          removeTag={removeTag}
        />
      ) : (
        <Step4Workout form={form} />
      )}
    </div>
  );
};
