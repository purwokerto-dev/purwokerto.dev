import NavbarEvents from "@/components/blocks/navbar-events";

export default function DashboardEventsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <NavbarEvents /> <div className="mt-6">{children}</div>
    </>
  );
}
