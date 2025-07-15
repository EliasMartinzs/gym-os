import { MenuLinks } from "@/components/reusable/menu-links";
import { ModeToggle } from "@/components/reusable/mode-toggle";
import { studentLinks } from "@/constants/links";
import { SignOutButton } from "@clerk/nextjs";
import { LogOut } from "lucide-react";
import React from "react";
import { Topbar } from "./_components/top-bar";

export default function LayoutStudent({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="xl:max-w-5xl xl:mx-auto min-h-svh relative">
      <Topbar />

      <div className="absolute top-0 h-full hidden xl:block -translate-x-20">
        <div className="xl:flex flex-col items-center justify-center h-full gap-10">
          <MenuLinks links={studentLinks} />
          <ModeToggle />
          <SignOutButton>
            <div className="size-16 rounded-full grid place-items-center transition-colors hover:bg-card/50 cursor-pointer dark:hover:bg-primary">
              <LogOut />
            </div>
          </SignOutButton>
        </div>
      </div>
      {children}
    </main>
  );
}
