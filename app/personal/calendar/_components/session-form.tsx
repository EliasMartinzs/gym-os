"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { getStudentsSession } from "@/features/personal/student/api/get-students-session";
import { FullSessionFormValues, FullSessionSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Step1FormSession } from "./step1-form-session";

type Props = {
  setOpen: (state: boolean) => void;
};

export const SessionForm = ({ setOpen }: Props) => {
  const { data, isLoading } = getStudentsSession();
  const [step, setStep] = useState<1 | 2>(1);
  const form = useForm<FullSessionFormValues>({
    resolver: zodResolver(FullSessionSchema),
    defaultValues: {
      session: {
        studentId: "",
        workoutTemplateId: "",
        startAt: new Date(),
        endAt: new Date(),
        locationType: undefined,
        street: "",
        number: "",
        neighborhood: "",
        city: "",
        postalCode: "",
        status: undefined,
        phase: undefined,
        priority: undefined,
        observations: "",
      },
      recurrence: {},
    },
  });

  const onNextStep = async () => {
    const isValid = await form.trigger("session");

    if (isValid) {
      setStep(2);
      return;
    }
  };

  const onSubmit = (values: FullSessionFormValues) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {step === 1 && <Step1FormSession form={form} students={data?.data!} />}
        {step === 2 && "Step2"}
        <Button type="button" onClick={onNextStep}>
          proximo
        </Button>
      </form>
    </Form>
  );
};
