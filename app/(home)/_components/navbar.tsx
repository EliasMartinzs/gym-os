"use client";

import { Contact, Home, LogIn, Menu, UsersRound } from "lucide-react";
import { useState } from "react";

import { MenuLinks } from "@/components/reusable/menu-links";
import { ModeToggle } from "@/components/reusable/mode-toggle";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import Link from "next/link";

const menuLinks = [
  {
    id: 1,
    title: "Home",
    href: "/",
    icon: <Home />,
  },
  {
    id: 2,
    title: "Sobre",
    href: "#about",
    icon: <UsersRound />,
  },
  {
    id: 3,
    title: "Contato",
    href: "#contact",
    icon: <Contact />,
  },
  {
    id: 4,
    title: "Entrar",
    href: "/sign-up",
    icon: <LogIn />,
  },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className={cn("w-full p-4 absolute z-50 right-0")}>
      <nav className={cn("w-full flex items-center lg:hidden")}>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger>
            <Menu />
          </SheetTrigger>
          <SheetContent
            className="w-full h-full flex items-center justify-center"
            side="left"
          >
            <SheetHeader>
              <SheetTitle className="text-center text-2xl font-medium">
                Gym-Os
              </SheetTitle>
            </SheetHeader>
            <MenuLinks links={menuLinks} setOpen={setOpen} />
            <ModeToggle />
          </SheetContent>
        </Sheet>
      </nav>
      <nav className="hidden lg:flex items-center justify-center gap-5">
        {menuLinks.map((item) => (
          <Link href={item.href} key={item.id} className="text-lg">
            {item.title}
          </Link>
        ))}
      </nav>
    </header>
  );
};

export { Navbar };
