// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cleiton Avi — pacotes de marca",
  description:
    "design de marca sem surpresas. pacotes claros, processo transparente e entrega garantida.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br" className="bg-[#0A0A0A]">
      <body className="min-h-screen antialiased text-white selection:bg-[#2DD4BF]/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}
