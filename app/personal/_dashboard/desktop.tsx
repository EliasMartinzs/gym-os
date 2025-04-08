import { Icon } from "@/components/reusable/icon";
import { MenuLinks } from "@/components/reusable/menu-links";
import { ModeToggle } from "@/components/reusable/mode-toggle";
import { personalLinks } from "@/constants/links";
import { UseGreetings } from "@/hooks/use-greetings";
import { SignOutButton, UserButton } from "@clerk/nextjs";
import { Bell, LogOut } from "lucide-react";
import Image from "next/image";

const SidebarDesktop = () => {
  return (
    <aside className="hidden lg:flex w-32 h-full fixed top-0 left-0 z-50">
      <div className="w-full flex flex-col items-center py-4">
        <div className="mt-5">
          <Image
            src="/logo.jpg"
            alt="logo"
            width={64}
            height={64}
            className="object-cover object-center rounded-full"
          />
        </div>

        <nav className="flex-1 flex flex-col items-center justify-center space-y-6">
          <ul className="flex flex-col gap-y-10 items-center">
            <MenuLinks links={personalLinks} />
            <ModeToggle />
            <SignOutButton>
              <Icon>
                <LogOut />
              </Icon>
            </SignOutButton>
          </ul>
        </nav>
      </div>
    </aside>
  );
};

const TopbarDesktop = () => {
  return (
    <header className="hidden lg:flex items-center w-full justify-between h-32 fixed top-0 left-0 px-28 z-50">
      <div className="flex items-center space-x-4">
        <h2 className="">
          <UseGreetings className="text-2xl font-medium italic" />
        </h2>
      </div>

      <div className="flex items-center bg-background/30 gap-2 rounded-full p-2">
        <Icon>
          <Bell />
        </Icon>

        <UserButton />
      </div>
    </header>
  );
};

export { SidebarDesktop, TopbarDesktop };
