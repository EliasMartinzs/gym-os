"use client";

import { Icon } from "@/components/reusable/icon";
import { MenuLinks } from "@/components/reusable/menu-links";
import { ModeToggle } from "@/components/reusable/mode-toggle";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { personalLinks } from "@/constants/links";
import { SignOutButton } from "@clerk/nextjs";
import { LogOut, Menu } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

export const TopbarMobile = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header
      className={cn(
        "w-full p-4 block lg:hidden",
        pathname.includes("/personal/student/") &&
          "absolute top-0 left-0 z-[51]"
      )}
    >
      <nav
        className={cn(
          "w-full flex items-center",
          pathname.includes("/personal/student/user")
            ? "justify-end"
            : "justify-between"
        )}
      >
        {pathname.includes("/personal/student/user") ? null : (
          <Link href="/personal" className="text-2xl font-semibold">
            The Personal
          </Link>
        )}

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
              <div className="size-16 rounded-full grid place-items-center transition-colors hover:bg-card/50 cursor-pointer dark:hover:bg-primary">
                <LogOut />
              </div>
            </SignOutButton>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
};
