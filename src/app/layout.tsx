import type { Metadata } from "next";
import { Source_Sans_3 } from "next/font/google";
import "./globals.css";
import SessionProvider from "@/providers/SessionProvider";
import ThemeProvider from "@/providers/ThemeProvider";

const sourceSans = Source_Sans_3({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Purwokerto Dev",
  description: "Komunitas Developer Purwokerto",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={sourceSans.className}>
        <SessionProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
