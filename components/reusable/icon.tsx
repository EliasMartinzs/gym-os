import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

export const Icon = ({
  children,
  className,
  ...props
}: ComponentProps<"div">) => {
  return (
    <div
      className={cn(
        "size-16 bg-primary text-primary-foreground rounded-full grid place-items-center transition-colors hover:bg-primary/80 cursor-pointer",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
