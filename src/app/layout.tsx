import type { Metadata } from "next";
import "./globals.css";
import QueryProvider from "./QueryProvider";
import { Poppins } from "next/font/google";
import "animate.css";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "@/contexts/AuthContext";

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
        {/* <QueryProvider> 
          {children}
          </QueryProvider> */}

        <AuthProvider>
          <QueryProvider>{children}</QueryProvider>
        </AuthProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
