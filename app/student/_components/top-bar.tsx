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
import { studentLinks } from "@/constants/links";
import { UseGreetings } from "@/hooks/use-greetings";
import { cn } from "@/lib/utils";
import { SignOutButton } from "@clerk/nextjs";
import { LogOut, Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export const Topbar = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header
      className={cn(
        "w-full p-4",
        pathname.includes("/personal/student/") &&
          "absolute top-0 left-0 z-[51]"
      )}
    >
      <nav className="flex items-center justify-between">
        <div className="hidden xl:block">
          <UseGreetings className="text-2xl font-medium italic" />
        </div>

        <Link href="/student" className="font-medium text-2xl">
          The Personal
        </Link>

        <div className="block lg:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger>
              <Icon>
                <Menu />
              </Icon>
            </SheetTrigger>
            <SheetContent className="w-full h-full flex items-center justify-center">
              <SheetHeader>
                <SheetTitle className="text-center text-2xl font-medium">
                  The Personal
                </SheetTitle>
              </SheetHeader>
              <MenuLinks links={studentLinks} setOpen={setOpen} />
              <ModeToggle />
              <SignOutButton>
                <div className="size-16 rounded-full grid place-items-center transition-colors hover:bg-card/50 cursor-pointer dark:hover:bg-primary">
                  <LogOut />
                </div>
              </SignOutButton>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
};
