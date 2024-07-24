import NavbarSub from "@/components/blocks/navbar-sub";
import { eventMenus } from "@/data/menus";

export default function DashboardEventsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <NavbarSub menus={eventMenus} /> <div className="mt-6">{children}</div>
    </>
  );
}
