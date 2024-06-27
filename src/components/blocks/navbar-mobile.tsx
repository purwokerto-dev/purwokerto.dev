import { FC } from "react";
import MenuItem from "../fragments/menu-item";
import { menus } from "@/data/menus";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import Button from "../fragments/button";

interface NavbarMobilePropsI {
  isOpen: boolean;
}

const NavbarMobile: FC<NavbarMobilePropsI> = ({ isOpen }) => {
  const pathname = usePathname();
  return (
    <div
      className={`fixed z-40 left-0 right-0 md:hidden duration-300 bg-white dark:bg-primary transition-300 ${
        !isOpen && "opacity-0 pointer-events-none"
      }`}>
      <ul className="container mx-auto p-4 flex flex-col gap-2">
        {menus.map((menu) => (
          <MenuItem
            isActive={pathname === menu.path ? true : false}
            key={menu.path}
            href={menu.path}
            text={menu.name}
            className={cn(
              "text-gray-600 dark:text-white rounded-md block p-2 transition-300",
              pathname === menu.path
                ? "bg-gray-200 dark:bg-slate-700 rounded-l-none"
                : "hover:bg-gray-200 dark:hover:bg-slate-700"
            )}
          />
        ))}
        <Button text="masuk" variant="outline" />
        <Button text="daftar" variant="bg" />
      </ul>
    </div>
  );
};

export default NavbarMobile;