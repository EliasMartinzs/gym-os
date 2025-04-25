"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

interface WorkoutEditProps {
  trigger: React.ReactNode;
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  open: boolean;
  setOpen: (state: boolean) => void;
}

export const ResponsiveModal = ({
  children,
  title,
  trigger,
  description,
  className,
  open,
  setOpen,
}: WorkoutEditProps) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent
          className={cn(
            "w-auto xl:min-w-2xl xl:max-w-7xl max-h-3/4 max-lg:px-4 overflow-y-auto",
            className
          )}
        >
          <DialogHeader className={cn(!title && "hidden")}>
            <DialogTitle className="text-center">{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          {children}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent
        side="bottom"
        className={cn("w-auto max-h-3/4 max-lg:px-4 pt-8 pb-5", className)}
      >
        <SheetHeader className={cn(!title && "hidden")}>
          <SheetTitle className="text-center">{title}</SheetTitle>
          <SheetDescription>{description}</SheetDescription>
        </SheetHeader>
        <div className="overflow-y-auto">{children}</div>
      </SheetContent>
    </Sheet>
  );
};
