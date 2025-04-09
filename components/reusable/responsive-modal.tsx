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

import { useState } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";

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
            "w-auto xl:min-w-2xl xl:max-w-7xl max-h-3/4 max-lg:px-4",
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
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent
        className={cn(
          "w-auto xl:min-w-2xl xl:max-w-7xl max-h-3/4 max-lg:px-4",
          className
        )}
      >
        <DrawerHeader className={cn(!title && "hidden")}>
          <DrawerTitle className="text-center">{title}</DrawerTitle>
          <DrawerDescription>{description}</DrawerDescription>
        </DrawerHeader>
        {children}
      </DrawerContent>
    </Drawer>
  );
};
