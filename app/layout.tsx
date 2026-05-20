import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aqlly",
  description: "O'zbek maktablari uchun jonli interaktiv test platformasi."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uz">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
