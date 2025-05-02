"use client";
import { ResponsiveModal } from "@/components/reusable/responsive-modal";
import { WorkoutTemplateForm } from "./workout-template-form";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useState } from "react";

export const NewTemplateWorkout = () => {
  const [open, setOpen] = useState(false);
  return (
    <ResponsiveModal
      open={open}
      setOpen={setOpen}
      trigger={
        <Button className="flex gap-x-2 cursor-pointer">
          Novo template treino <PlusCircle />
        </Button>
      }
      key={"new-template-modal"}
      className="xl:min-w-2xl xl:max-w-7xl"
    >
      <WorkoutTemplateForm setOpen={setOpen} />
    </ResponsiveModal>
  );
};
