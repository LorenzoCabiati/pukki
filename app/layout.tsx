import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pukki Music",
  description: "Music Producer & Mix/Master Engineer",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it">
      <body className="bg-black text-white">{children}</body>
    </html>
  );
}
