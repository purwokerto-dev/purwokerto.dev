import { menus } from "@/data/menus";
import MenuItem from "../fragments/menu-item";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";

const NavbarDekstopMenu = () => {
  const pathname = usePathname();
  return (
    <ul className="hidden lg:flex gap-6 items-center">
      {menus.map((menu) => (
        <MenuItem
          isActive={pathname === menu.path ? true : false}
          key={menu.path}
          href={menu.path}
          text={menu.name}
          className={cn(
            "text-gray-600 dark:text-white text-lg font-semibold py-1 px-2 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600",
            pathname === menu.path ? "bg-gray-200 dark:bg-gray-700" : ""
          )}
          setIsOpen={() => {}}
        />
      ))}
    </ul>
  );
};

export default NavbarDekstopMenu;
