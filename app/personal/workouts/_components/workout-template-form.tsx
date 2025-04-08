"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";

import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";
import {
  WorkoutTemplateFormValues,
  WorkoutTemplateSchema,
} from "@/lib/validations";
import ActivityTrackerImg from "@/public/undraw_activity-tracker_3o6r.svg";
import Image from "next/image";

import { Step1Form } from "./step-1-form";
import { Step2Form } from "./step-2-form";
import { Step3Form } from "./step-3-form";
import { Step4Form } from "./step-4-form";

export function WorkoutTemplateForm() {
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
          exercises: [],
        },
      ],
      config: {
        goals: [],
        level: "ADVANCED",
        tags: [],
      },
      assigned: {
        studentId: "",
        startDate: new Date(),
        endDate: new Date(),
        isActive: true,
        notes: "", // Adicione campos opcionais faltantes
      },
    },
  });

  const { trigger } = form;

  const validateCurrentStep = async () => {
    if (step === 1) {
      return await trigger(["name", "description", "isReusable", "isPublic"]);
    }

    if (!isReusable) {
      if (step === 2) return await trigger(["assigned.studentId"]);
      if (step === 3) return await trigger(["config.goals", "config.level"]);
      if (step === 4) return await trigger(["days"]);
    } else {
      if (step === 2) return await trigger(["config.goals", "config.level"]);
      if (step === 3) return await trigger(["days"]);
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
      // Submeter o formulário
      await form.handleSubmit(onSubmit)();
    }
  };

  const isReusable = form.watch("isReusable");
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

  const onSubmit = (data: z.infer<typeof WorkoutTemplateSchema>) => {
    console.log(data);
  };

  return (
    <div className="flex items-start justify-center h-full">
      <div
        className={cn(
          "hidden lg:block relative h-96 flex-1",
          isLastStep && "lg:hidden"
        )}
      >
        <Image
          src={ActivityTrackerImg}
          fill
          alt="Activity Tracker"
          className={cn("object-center object-contain")}
        />
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 flex-1 flex flex-col justify-center h-full"
        >
          {step === 1 && <Step1Form form={form} />}

          {step === 2 && (
            <Step2Form
              form={form}
              handleKeyDown={handleKeyDown}
              removeTag={removeTag}
            />
          )}

          {step === 3 && (
            <Step3Form
              form={form}
              handleKeyDown={handleKeyDown}
              removeTag={removeTag}
            />
          )}

          {step === 4 && !form.watch("isReusable") && <Step4Form form={form} />}

          <div className="flex gap-5">
            <Button
              type="button"
              onClick={onBack}
              disabled={step === 1}
              variant="outline"
              className="flex-1"
            >
              <ChevronLeft /> Voltar
            </Button>

            <Button className="flex-1" type="button" onClick={onNext}>
              {isLastStep ? (
                "Criar Template"
              ) : (
                <>
                  Próximo <ChevronRight className="" />
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
