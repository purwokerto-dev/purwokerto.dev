import type { Metadata } from "next";
import { Source_Sans_3 } from "next/font/google";
import "./globals.css";
import SessionProvider from "@/providers/SessionProvider";
import ThemeProvider from "@/providers/ThemeProvider";
import Header from "@/components/sections/header";
import Footer from "@/components/sections/footer";
import { cn } from "@/lib/cn";

const sourceSans = Source_Sans_3({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Purwokerto Dev | Komunitas Developer Purwokerto",
  description:
    "Wadah Komunitas Developer Purwokerto untuk Berkreasi, Terkoneksi dan Berkolaborasi.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/whitemaskot.png" type="image/png" />
      </head>
      <body className={cn(sourceSans.className, "min-h-screen flex flex-col")}>
        <SessionProvider>
          <ThemeProvider>
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
