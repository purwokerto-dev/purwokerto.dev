import { cn } from "@/lib/cn";
import Link from "next/link";
import { FC } from "react";

interface MenuItemPropsI {
  href: string;
  text: string;
  isActive: boolean;
  className?: string;
  setIsOpen: () => void;
}

const MenuItem: FC<MenuItemPropsI> = ({
  href,
  text,
  isActive,
  className,
  setIsOpen,
}) => (
  <li className="text-base">
    <Link
      href={href}
      onClick={() => setIsOpen()}
      className={cn(
        isActive ? "border-l-4 border-blue-500 lg:border-0" : "",
        className
      )}>
      {text}
    </Link>
  </li>
);

export default MenuItem;
