import { Loader2, Plus } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

type CreateButtonProps = {
  isPending: boolean;
  label: string;
};

export const CreateButton = ({
  isPending,
  label,
  className,
  ...props
}: React.ComponentProps<"button"> & CreateButtonProps) => {
  return (
    <Button
      type="submit"
      variant="primary"
      size="full"
      disabled={isPending}
      className={cn("h-12", className)}
      {...props}
    >
      {isPending ? (
        <Loader2 className="size-5 animate-spin" />
      ) : (
        <>
          {label} <Plus />
        </>
      )}
    </Button>
  );
};
