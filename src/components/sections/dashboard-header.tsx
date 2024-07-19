"use client";

import { cn } from "@/lib/cn";
import { useSession } from "next-auth/react";
import ProfileMenu from "../blocks/profile-menu";
import ToggleTheme from "../fragments/toggle-theme";
import Logo from "../fragments/logo";
import DashboardSidebarMobile from "../blocks/dashboard-sidebar-mobile";

const DashboardHeader = () => {
  const { data: session }: any = useSession();

  return (
    <div className="fixed left-0 right-0 top-0 backdrop-blur py-4 lg:py-5 bg-white dark:bg-primary z-50 border-b dark:border-gray-600">
      <nav className="flex h-14 items-center justify-between px-4">
        <div className={cn("lg:hidden flex items-center")}>
          <DashboardSidebarMobile />
        </div>

        <div className="lg:justify-self-center">
          <Logo />
        </div>

        <div className="flex items-center gap-2 justify-end">
          <ToggleTheme />
          <div className="flex items-center gap-2">
            <ProfileMenu
              isAdmin={session?.user?.isAdmin}
              isDashboard={true}
              name={session?.user?.name}
              profileImg={session?.user?.image}
            />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default DashboardHeader;
