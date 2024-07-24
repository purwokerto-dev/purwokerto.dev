import NavbarSub from "@/components/blocks/navbar-sub";
import { usersMenus } from "@/data/menus";

export default function DashboardUsersLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <NavbarSub menus={usersMenus} />
      <div className="mt-6">{children}</div>
    </>
  );
}
