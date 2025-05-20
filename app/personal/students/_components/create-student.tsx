"use client";

import { ResponsiveModal } from "@/components/reusable/responsive-modal";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import React from "react";
import { CreateStudenForm } from "./create-student-form";
import { useStudent } from "@/features/personal/student/hooks/use-student";

export const CreateStudent = () => {
  const { open, setOpen, setClose } = useStudent();

  return (
    <ResponsiveModal
      trigger={
        <Button variant="primary">
          Novo <PlusCircle />
        </Button>
      }
      key={"new-student"}
      open={open}
      setOpen={setOpen}
    >
      <CreateStudenForm setClose={setClose} />
    </ResponsiveModal>
  );
};
