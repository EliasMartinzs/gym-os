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
            "size-16 rounded-full grid place-items-center transition-colors hover:bg-card/50 hover:dark:bg-background/50",
            pathname === href &&
              "bg-card hover:bg-card/50 dark:bg-background/50"
          )}
          onClick={() => setOpen !== undefined && setOpen(false)}
        >
          {icon}
        </Link>
      ))}
    </>
  );
};
