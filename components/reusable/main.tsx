import { cn } from "@/lib/utils";

export function Main({ className, ...props }: React.ComponentProps<"main">) {
  return (
    <main
      data-slot="main-layout"
      className={cn(
        "w-full h-full p-4 xl:p-8 overflow-x-hidden space-y-4",
        className
      )}
      {...props}
    />
  );
}
