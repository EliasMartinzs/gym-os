"use client";
import Image from "next/image";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LogOut, Menu } from "lucide-react";
import { Icon } from "@/components/reusable/icon";
import { MenuLinks } from "@/components/reusable/menu-links";
import { personalLinks } from "@/constants/links";
import { SignOutButton } from "@clerk/nextjs";
import { useState } from "react";
import { ModeToggle } from "@/components/reusable/mode-toggle";

export const TopbarMobile = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full p-4 block lg:hidden">
      <nav className="w-full flex items-center justify-between">
        <Image
          src="/logo.jpg"
          alt="logo"
          width={64}
          height={64}
          className="object-cover object-center rounded-full"
        />

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger>
            <Icon>
              <Menu />
            </Icon>
          </SheetTrigger>
          <SheetContent className="w-full h-full flex items-center justify-center">
            <SheetHeader>
              <SheetTitle className="text-center text-2xl font-medium">
                Gym-OS
              </SheetTitle>
            </SheetHeader>
            <MenuLinks links={personalLinks} setOpen={setOpen} />
            <ModeToggle />
            <SignOutButton>
              <div className="size-16 rounded-full grid place-items-center transition-colors hover:bg-card/50 cursor-pointer">
                <LogOut />
              </div>
            </SignOutButton>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
};
