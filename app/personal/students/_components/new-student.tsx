"use client";

import { ResponsiveModal } from "@/components/reusable/responsive-modal";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import React from "react";
import { NewStudentForm } from "./new-student-form";
import { useStudent } from "@/features/personal/student/hooks/use-student";

export const NewStudent = () => {
  const { open, setOpen, setClose } = useStudent();
  return (
    <ResponsiveModal
      trigger={
        <Button variant="primary">
          Novo aluno <PlusCircle />
        </Button>
      }
      key={"new-student"}
      title="Novo estudante"
      open={open}
      setOpen={setOpen}
    >
      <NewStudentForm setClose={setClose} />
    </ResponsiveModal>
  );
};
