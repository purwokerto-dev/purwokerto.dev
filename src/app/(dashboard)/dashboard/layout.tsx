import DashboardHeader from "@/components/sections/dashboard-header";
import DashboardSidebar from "@/components/sections/dashboard-sidebar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <DashboardHeader />
      <div className="flex h-screen overflow-hidden">
        <DashboardSidebar />
        <main className="flex-1 overflow-y-scroll pt-28 lg:pt-32 px-4 pb-4 lg:pb-8 lg:px-8 bg-white dark:bg-slate-800">{children}</main>
      </div>
    </>
  );
}
