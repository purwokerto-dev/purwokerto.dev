"use client";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "../fragments/sheet";
import { DashboardSidebarMenu } from "./dashboard-sidebar-menu";
import ToggleMenu from "../fragments/toggle-menu";
import { dashboardMenus } from "@/data/menus";

const DashboardSidebarMobile = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <ToggleMenu isOpen={open} onClick={() => {}} />
        </SheetTrigger>
        <SheetContent
          side="left"
          className="!px-0 bg-white dark:bg-primary border-r dark:border-gray-600 lg:hidden">
          <div className="space-y-4 py-10">
            <div className="px-3 py-2">
              <div className="space-y-1">
                <DashboardSidebarMenu
                  items={dashboardMenus}
                  isMobileNav={true}
                  setOpen={setOpen}
                />
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default DashboardSidebarMobile;
