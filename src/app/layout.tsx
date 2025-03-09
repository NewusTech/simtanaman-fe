import type { Metadata } from "next";
import "./globals.css";
import QueryProvider from "./QueryProvider";
import { Poppins } from "next/font/google";
import "animate.css";

export const metadata: Metadata = {
  title: "Sistem Informasi Manajemen Tani",
  description: "Sistem Informasi Manajemen Tani",
};
const poppins = Poppins({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={
          poppins.className + "text-base text-foreground bg-background"
        }
      >
        <QueryProvider> {children}</QueryProvider>
      </body>
    </html>
  );
}
