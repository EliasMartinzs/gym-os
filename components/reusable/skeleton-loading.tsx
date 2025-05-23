import React from "react";
import { Skeleton } from "../ui/skeleton";
import { cn } from "@/lib/utils";

export const SkeletonLoading = ({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) => {
  return (
    <Skeleton
      className={cn(
        "flex flex-1 w-full h-96 items-center justify-center",
        className
      )}
      {...props}
    >
      {children}
    </Skeleton>
  );
};
