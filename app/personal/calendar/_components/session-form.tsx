"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { getStudentsSession } from "@/features/personal/student/api/get-students-session";
import { postSession } from "@/features/personal/student/api/post-session";
import { FullSessionFormValues, FullSessionSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Step1FormSession } from "./step1-form-session";
import { Step2FormRecurrence } from "./step2-form-recurrence";

type Props = {
  setOpen: (state: boolean) => void;
};

export const SessionForm = ({ setOpen }: Props) => {
  const { data, isLoading } = getStudentsSession();
  const [step, setStep] = useState<1 | 2>(1);
  const form = useForm<FullSessionFormValues>({
    resolver: zodResolver(FullSessionSchema),
    defaultValues: {
      session: {},
      recurrence: {
        repeat: "DAILY",
        durationMinutes: 0,
        endDate: undefined,
        startDate: new Date(),
      },
    },
  });

  const { mutate, isPending } = postSession();

  const onBackStep = () => {
    setStep(1);
  };

  const onNextStep = async () => {
    const isSessionValid = await form.trigger("session");

    if (isSessionValid) {
      setStep(2);
    }
  };

  const onSubmit = (values: FullSessionFormValues) => {
    mutate(values, {
      onSuccess: () => {
        setOpen(false);
      },
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {step === 1 && (
          <Step1FormSession
            form={form}
            students={data?.data ?? []}
            isLoading={isLoading}
          />
        )}
        {step === 2 && <Step2FormRecurrence form={form} />}

        <div className="flex gap-5">
          <Button
            type="button"
            onClick={onBackStep}
            disabled={step === 1}
            variant="outline"
            className="flex-1"
          >
            <ChevronLeft /> Voltar
          </Button>

          <Button
            className="flex-1"
            variant="primary"
            type={step === 1 ? "button" : "submit"}
            onClick={onNextStep}
          >
            {step === 2 ? (
              <>
                {isPending ? (
                  <Loader2 className="size-5 animate-spin" />
                ) : (
                  "Criar seção"
                )}
              </>
            ) : (
              <>
                Próximo <ChevronRight className="" />
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};
