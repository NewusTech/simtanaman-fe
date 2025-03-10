"use client";

import Sidebar from "@/components/ui/home/Sidebar";
import { ReactNode } from "react";
import "../../globals.css";
import "animate.css";
import { usePathname } from "next/navigation";
import { Poppins } from "next/font/google";
import { ChevronRight } from "lucide-react";

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
          <div className="flex flex-col">
            <div className="flex text-lg font-semibold text-primary-default">
              {pathname.split("/")[2] === "management" &&
              pathname.split("/")[3] === "user"
                ? "Manajemen Pengguna"
                : pathname
                    .split("/")[2]
                    ?.replace(/(^\w|\s\w)/g, (m) => m.toUpperCase())}
            </div>
            <nav className="text-sm text-gray-500">
              <ol className="list-reset flex">
                {pathname.split("/").map(
                  (segment, index, arr) =>
                    (index === 2 || index === arr.length - 1) && (
                      <li key={index} className="flex items-center">
                        {index > 2 && (
                          <span className="mx-2">
                            <ChevronRight size={16} />
                          </span>
                        )}
                        <span
                          className={
                            index === arr.length - 1
                              ? "text-primary-default"
                              : ""
                          }
                        >
                          {getSegmentName(
                            segment == "farmer"
                              ? "Petani"
                              : pathname.split("/")[2] === "management" &&
                                  pathname.split("/")[3] === "user"
                                ? "Manajemen Pengguna"
                                : segment,
                            pathname.split("/")[index + 1]
                          )}
                        </span>
                      </li>
                    )
                )}
              </ol>
            </nav>
          </div>
          <div className="flex items-center">
            <div className="flex items-center">
              <div className="flex flex-col items-end mr-2">
                <div className="text-sm font-semibold text-primary-default">
                  Admin
                </div>
                <div className="text-sm font-medium text-primary-default">
                  Role
                </div>
              </div>
              <div className="w-10 h-10 rounded-full bg-gray-200"></div>
            </div>
          </div>
        </header>
        <div className="p-4 md:ml-64 h-[calc(100vh-6rem)] overflow-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
