import Link from "next/link";
import { FC } from "react";

interface NavItemPropsI {
  href: string;
  text: string;
}

const NavItem: FC<NavItemPropsI> = ({ href, text }) => (
  <li>
    <Link href={href}>{text}</Link>
  </li>
);

export default NavItem;
