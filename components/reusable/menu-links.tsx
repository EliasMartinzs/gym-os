"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { JSX } from "react";

interface Props {
  links: {
    id: number;
    icon: JSX.Element;
    title: string;
    href: string;
  }[];
  setOpen?: (prevState: boolean) => void;
}

export const MenuLinks = ({ links, setOpen }: Props) => {
  const pathname = usePathname();

  return (
    <>
      {links.map(({ href, icon, id, title }) => (
        <Link
          key={id}
          href={href}
          className={cn(
            "size-16 bg-background/30 rounded-full grid place-items-center transition-colors hover:bg-background/50",
            pathname === href && "bg-background/50 text-black"
          )}
          onClick={() => setOpen !== undefined && setOpen(false)}
        >
          {icon}
        </Link>
      ))}
    </>
  );
};
