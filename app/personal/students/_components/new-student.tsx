import { ResponsiveModal } from "@/components/reusable/responsive-modal";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import React from "react";
import { NewStudentForm } from "./new-student-form";

export const NewStudent = () => {
  return (
    <ResponsiveModal
      trigger={
        <Button>
          Novo aluno <PlusCircle />
        </Button>
      }
      key={"new-student"}
      title="Novo estudante"
      className="overflow-hidden"
    >
      <NewStudentForm />
    </ResponsiveModal>
  );
};
