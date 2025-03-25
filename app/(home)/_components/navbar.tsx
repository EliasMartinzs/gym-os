"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const menuLinks = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Sobre",
    href: "#about",
  },
  {
    label: "Contato",
    href: "#contact",
  },
  {
    label: "Entrar",
    href: "/sign-up",
  },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full p-4 lg:p-8 lg:px-24 fixed top-0 left-0 z-50">
      <nav className="w-full flex gap-10 items-center justify-between">
        <Link href="/" className="font-medium text-2xl">
          Gym-OS
        </Link>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger>
            <Menu className="block lg:hidden cursor-pointer" />
          </SheetTrigger>
          <SheetContent
            colorClose="text-white"
            className="bg-[#434343] border-none w-full h-full flex items-center justify-center gap-y-10"
          >
            <SheetHeader>
              <SheetTitle className="text-white text-center text-5xl font-black">
                Gym-OS
              </SheetTitle>
            </SheetHeader>
            <MenuLinks setOpen={setOpen} />
          </SheetContent>
        </Sheet>

        <div className="hidden lg:flex gap-x-3">
          <MenuLinks setOpen={setOpen} />
        </div>
      </nav>
    </header>
  );
};

const MenuLinks = ({ setOpen }: { setOpen: (prevState: boolean) => void }) => {
  return (
    <ul className="flex flex-col items-center justify-start lg:flex-row gap-3 max-lg:gap-y-10">
      {menuLinks.map(({ label, href }) => (
        <li key={label}>
          <Link
            href={href}
            className="hover:underline underline-offset-8 hover:text-green-500 transition-colors text-white max-lg:text-4xl max-lg:font-medium"
            onClick={() => setOpen(false)}
          >
            {label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export { Navbar };
