import NavbarSub from "@/components/blocks/navbar-sub";
import { badgesMenus } from "@/data/menus";

export default function DashboardAdminBadgesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <NavbarSub menus={badgesMenus} /> <div className="mt-6">{children}</div>
    </>
  );
}
