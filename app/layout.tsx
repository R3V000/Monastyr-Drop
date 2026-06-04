import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Monastyr Drop",
  description: "Porównywanie dziennego dropu z mob_drop_item.txt"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pl">
      <body>{children}</body>
    </html>
  );
}
