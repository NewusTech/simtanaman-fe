"use client";

import Sidebar from "@/components/ui/home/Sidebar";
import { ReactNode } from "react";
import "../../globals.css";
import "animate.css";
import { usePathname } from "next/navigation";
import { Poppins } from "next/font/google";
import { ChevronRight } from "lucide-react";
import UserProfil from "@/components/ui/home/UserProfil";
import Link from "next/link";
import Breadcrumb from "@/components/ui/home/Breadcrumb";

/**
 * The props for the Layout component.
 * @interface
 */
interface LayoutProps {
  children: ReactNode;
}

const poppins = Poppins({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

/**
 * Layout component for the home page.
 *
 * This component serves as the main layout for the home page, including the sidebar and header.
 * It uses the `usePathname` hook from Next.js to get the current pathname and display a formatted
 * version of the path in the header.
 *
 * @param {LayoutProps} props - The props for the Layout component.
 * @param {ReactNode} props.children - The child components to be rendered within the layout.
 *
 * @returns {JSX.Element} The rendered layout component.
 */
export default function Layout({ children }: LayoutProps) {
  const pathname = usePathname();

  function getSegmentName(segment: string, nextSegment: string): ReactNode {
    if (!segment) return null;
    if (segment === nextSegment)
      return segment.replace(/(^\w|\s\w)/g, (m) => m.toUpperCase());
    return segment.replace(/(^\w|\s\w)/g, (m) => m.toUpperCase());
  }

  return (
    <div
      className={poppins.className + "text-base text-foreground bg-neutral-200"}
    >
      <Sidebar />
      <main
        className={
          poppins.className + "text-base text-foreground bg-neutral-200 h-100vh"
        }
      >
        <header className="flex justify-between items-center bg-white p-4 shadow-md md:ml-64">
            <Breadcrumb pathname={pathname} />
          <UserProfil />
        </header>
        <div className="p-4 md:ml-64 h-[calc(100vh-5rem)] overflow-auto">
          {children}
        </div>
      </main>
    </div>

  );
}
