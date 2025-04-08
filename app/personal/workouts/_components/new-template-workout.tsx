import { ResponsiveModal } from "@/components/reusable/responsive-modal";
import { WorkoutTemplateForm } from "./workout-template-form";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export const NewTemplateWorkout = () => {
  return (
    <ResponsiveModal
      trigger={
        <Button className="flex gap-x-2 cursor-pointer">
          Novo treino <PlusCircle />
        </Button>
      }
      key={"new-template-modal"}
      className="xl:min-w-7xl"
    >
      <WorkoutTemplateForm />
    </ResponsiveModal>
  );
};
