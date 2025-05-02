import React from "react";
import { SidebarDesktop, TopbarDesktop } from "./_dashboard/desktop";
import { TopbarMobile } from "./_dashboard/mobile";

interface LayoutProps {
  children: React.ReactNode;
}

export default function LayoutPersonal({ children }: LayoutProps) {
  return (
    <main className="w-full min-h-svh relative">
      <div className="lg:pt-28 lg:pl-28 lg:pb-8 lg:pr-8 flex-1 w-full h-full">
        <TopbarDesktop />
        <SidebarDesktop />
        <TopbarMobile />

        {children}
      </div>
    </main>
  );
}
