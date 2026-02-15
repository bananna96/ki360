import type { Metadata } from "next";
import "./globals.css";
import { outward, satoshi } from "@/lib/fonts";


export const metadata: Metadata = {
  title: "ki360",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${satoshi.variable} ${outward.variable}`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
