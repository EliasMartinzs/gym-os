import { cn } from "@/lib/utils";

export function Main({ className, ...props }: React.ComponentProps<"main">) {
  return (
    <main
      data-slot="main-layout"
      className={cn(
        "w-full h-full p-4 overflow-x-hidden space-y-4 xl:max-w-5xl xl:mx-auto",
        className
      )}
      {...props}
    />
  );
}
