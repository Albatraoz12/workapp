import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Scan me",
  description: "OCR program to track whats our innventory.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
