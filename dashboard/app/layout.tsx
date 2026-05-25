import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

import AppShell from "./AppShell";

export const metadata: Metadata = {
  title: "AdamOS Dashboard",
  description: "Visual Harness for the AdamOS Framework",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className} style={{ margin: 0, padding: 0 }}>
        <AppShell>
          {children}
        </AppShell>
      </body>
    </html>
  );
}
