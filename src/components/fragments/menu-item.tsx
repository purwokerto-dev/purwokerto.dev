import { cn } from "@/lib/cn";
import Link from "next/link";
import { FC } from "react";

interface MenuItemPropsI {
  href: string;
  text: string;
  isActive: boolean;
  className?: string;
}

const MenuItem: FC<MenuItemPropsI> = ({ href, text, isActive, className }) => (
  <li className="text-base">
    <Link
      href={href}
      className={cn(
        isActive ? "border-l-4 border-blue-500 lg:border-0" : "",
        className
      )}>
      {text}
    </Link>
  </li>
);

export default MenuItem;
