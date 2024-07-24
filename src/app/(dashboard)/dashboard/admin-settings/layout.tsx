import NavbarSub from "@/components/blocks/navbar-sub";
import { adminSetingsMenus } from "@/data/menus";

export default function DashboardAdminSettingsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <NavbarSub menus={adminSetingsMenus} />{" "}
      <div className="mt-6">{children}</div>
    </>
  );
}
