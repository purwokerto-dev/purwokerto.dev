"use client";

import { usePathname } from "next/navigation";
import React from "react";
import MenuItem from "../fragments/menu-item";
import { cn } from "@/lib/cn";

const NavbarSub = ({ menus }: any) => {
  const pathname = usePathname();
  return (
    <ul className="flex gap-3 items-center">
      {menus.map((menu: any) => (
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

export default NavbarSub;
