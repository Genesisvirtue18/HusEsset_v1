import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HusEsset – Unika prefabhus, villastommar och småhus i trä",
  description:
    "HusEsset i Hökerum levererar unika prefabhus, villor och småhus i trä. Från friggebod till flerfamiljshus – alltid med kvalitet, personlig kontakt och prisvärda lösningar.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="sv">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
