"use client";
import React, { useCallback, useState } from "react";
import { cn } from "@/lib/cn";
import { ChevronLeft } from "lucide-react";
import { dashboardMenus } from "@/data/menus";
import { DashboardSidebarMenu } from "../blocks/dashboard-sidebar-menu";

type SidebarProps = {
  className?: string;
};

export default function DashboardSidebar({ className }: SidebarProps) {
  const [isMinimized, setIsMinimized] = useState(false);

  const handleToggle = useCallback(() => {
    setIsMinimized(!isMinimized);
  }, [isMinimized]);

  return (
    <nav
      className={cn(
        `relative hidden h-screen flex-none border-r dark:border-gray-600 z-10 pt-20 lg:block duration-500`,
        !isMinimized ? "w-72" : "w-[72px]",
        className
      )}>
      <ChevronLeft
        className={cn(
          "absolute -right-3 top-32 cursor-pointer rounded-full border bg-blue-500 text-3xl text-white",
          isMinimized && "rotate-180"
        )}
        onClick={handleToggle}
      />
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="mt-3 space-y-1">
            <DashboardSidebarMenu
              isMinimized={isMinimized}
              items={dashboardMenus}
            />
          </div>
        </div>
      </div>
    </nav>
  );
}
