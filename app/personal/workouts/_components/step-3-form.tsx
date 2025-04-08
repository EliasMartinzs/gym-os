import { WorkoutTemplateSchema } from "@/lib/validations";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { ConfigForm } from "./config-form";
import { Step4Form } from "./step-4-form";

type Props = {
  form: UseFormReturn<z.infer<typeof WorkoutTemplateSchema>>;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  removeTag: (tag: string) => void;
};

export const Step3Form = ({ form, handleKeyDown, removeTag }: Props) => {
  return (
    <>
      {!form.watch("isReusable") ? (
        <ConfigForm
          form={form}
          handleKeyDown={handleKeyDown}
          removeTag={removeTag}
        />
      ) : (
        <Step4Form form={form} />
      )}
    </>
  );
};
