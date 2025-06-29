import type { Metadata } from "next";
import "./globals.css";
import AuthProvider from "./components/SessionProvider";

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
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
