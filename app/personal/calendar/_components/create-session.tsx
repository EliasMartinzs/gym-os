"use client";

import { ResponsiveModal } from "@/components/reusable/responsive-modal";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { SessionForm } from "./session-form";

export const CreateSession = () => {
  const [open, setOpen] = useState(false);
  return (
    <ResponsiveModal
      title="Novo atendimento"
      open={open}
      setOpen={setOpen}
      trigger={
        <Button className="flex gap-x-2 cursor-pointer">
          Marcar seção <PlusCircle />
        </Button>
      }
      key={"new-template-modal"}
      className="xl:min-w-2xl xl:max-w-7xl"
    >
      <SessionForm setOpen={setOpen} />
    </ResponsiveModal>
  );
};
