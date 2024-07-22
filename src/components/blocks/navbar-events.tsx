"use client";

import { usePathname } from "next/navigation";
import React from "react";
import MenuItem from "../fragments/menu-item";
import { cn } from "@/lib/cn";
import { eventMenus } from "@/data/menus";

const NavbarEvents = () => {
  const pathname = usePathname();
  return (
    <ul className="flex gap-3 items-center">
      {eventMenus.map((menu) => (
        <MenuItem
          isActive={pathname === menu.path ? true : false}
          key={menu.path}
          href={menu.path}
          text={menu.name}
          className={cn(
            "text-gray-600 border border-white dark:text-white text-lg font-semibold py-1 px-2 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600",
            pathname === menu.path ? "bg-gray-200 dark:bg-gray-700" : ""
          )}
          setIsOpen={() => {}}
        />
      ))}
    </ul>
  );
};

export default NavbarEvents;
