"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import React from "react";

import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  WorkoutTemplateFormValues,
  WorkoutTemplateSchema,
} from "@/lib/validations";

import { postWorkout } from "@/features/personal/student/api/post-workout";
import { Step1Workout } from "./step-1-workout";
import { Step2Workout } from "./step-2-workout";
import { Step3Workout } from "./step-3-workout";
import { Step4Workout } from "./step-4-workout";

type Props = {
  setOpen: (prevState: boolean) => void;
};

export function WorkoutTemplateForm({ setOpen }: Props) {
  const [step, setStep] = useState(1);

  const form = useForm<WorkoutTemplateFormValues>({
    resolver: zodResolver(WorkoutTemplateSchema),
    defaultValues: {
      name: "",
      description: "",
      isReusable: false,
      isPublic: false,
      days: [
        {
          name: "",
          dayOfWeek: "MONDAY",
          focusMuscle: [],
        },
      ],
      config: {
        goals: [],
        level: undefined,
        tags: [],
      },
      assigned: {
        studentId: "",
        startDate: new Date(),
        endDate: new Date(),
        isActive: true,
        notes: "",
      },
    },
  });

  const { trigger } = form;

  const isReusable = form.watch("isReusable");

  const validateCurrentStep = async () => {
    if (step === 1) {
      return await trigger(["name", "description", "isReusable", "isPublic"]);
    }

    if (!isReusable) {
      if (step === 2) return await trigger(["assigned.studentId"]);
      if (step === 3) return await trigger(["config.goals", "config.level"]);
      if (step === 4)
        return form.formState.isDirty ? await trigger("days") : true;
    } else {
      if (step === 2) return await trigger(["config.goals", "config.level"]);
      if (step === 3)
        return form.formState.isDirty ? await trigger("days") : true;
    }

    return true;
  };

  const onNext = async () => {
    const isValid = await validateCurrentStep();
    if (!isValid) return;

    const nextStep = step + 1;
    const isLastStep = step === totalSteps;

    if (!isLastStep) {
      setStep(nextStep);
    } else {
      await form.handleSubmit(onSubmit)();
    }
  };

  const totalSteps = isReusable ? 3 : 4;
  const isLastStep = step === totalSteps;
  const onBack = () => setStep(step - 1);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const value = e.currentTarget.value.trim();
      if (value) {
        const currentTags = form.getValues("config.tags") || [];
        if (!currentTags.includes(value)) {
          form.setValue("config.tags", [...currentTags, value]);
        }
        e.currentTarget.value = "";
      }
    }
  };

  const removeTag = (tagToRemove: string) => {
    const currentTags = form.getValues("config.tags") || [];
    form.setValue(
      "config.tags",
      currentTags.filter((tag) => tag !== tagToRemove)
    );
  };

  const mutation = postWorkout();

  const onSubmit = (data: z.infer<typeof WorkoutTemplateSchema>) => {
    mutation.mutate(data, {
      onSuccess: () => {
        setOpen(false);
      },
    });
  };

  return (
    <div className="flex items-start justify-center h-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 flex-1 flex flex-col justify-center h-full"
        >
          {step === 1 && <Step1Workout form={form} />}

          {step === 2 && (
            <Step2Workout
              form={form}
              handleKeyDown={handleKeyDown}
              removeTag={removeTag}
            />
          )}

          {step === 3 && (
            <Step3Workout
              form={form}
              handleKeyDown={handleKeyDown}
              removeTag={removeTag}
            />
          )}

          {step === 4 && !form.watch("isReusable") && (
            <Step4Workout form={form} />
          )}

          <div className="flex gap-5">
            <Button
              type="button"
              onClick={onBack}
              disabled={step === 1}
              variant="outline"
              className="flex-1"
            >
              <ChevronLeft />
            </Button>

            <Button
              className="flex-1"
              variant="primary"
              type="button"
              onClick={onNext}
            >
              {isLastStep ? (
                <>
                  Criar Template
                  {mutation.isPending && (
                    <Loader2 className="animate-spin size-5" />
                  )}
                </>
              ) : (
                <>
                  <ChevronRight className="" />
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
