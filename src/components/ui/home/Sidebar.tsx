"use client";

import {
  Boxes,
  HandHelping,
  LayoutDashboard,
  PanelsTopLeft,
  Sprout,
  File,
  UsersRound,
  Database,
  Dot,
} from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

/**
 * Sidebar component for the application.
 *
 * This component renders a sidebar with navigation items and handles
 * the state for opening and closing the sidebar, both on desktop and mobile views.
 *
 * @component
 *
 * @example
 * return (
 *   <Sidebar />
 * )
 *
 * @returns {JSX.Element} The rendered sidebar component.
 *
 * @remarks
 * - The sidebar state (open/closed) is stored in localStorage to persist between page reloads.
 * - The sidebar adjusts its layout based on the screen width (mobile vs desktop).
 * - Clicking outside the sidebar on mobile view will close the sidebar.
 *
 * @dependencies
 * - `lucide-react` for icons.
 * - `next/navigation` for routing.
 * - `react-icons/fi` for menu icons.
 *
 * @hooks
 * - `useRouter` from `next/navigation` for navigation.
 * - `usePathname` from `next/navigation` to get the current path.
 * - `useState` and `useEffect` from `react` for state management and side effects.
 *
 * @state {boolean} isOpen - Indicates whether the sidebar is open or closed.
 * @state {boolean} isMobile - Indicates whether the view is mobile or desktop.
 * @state {Array} navigation - The list of navigation items.
 *
 * @function toggleSidebar - Toggles the sidebar open/closed state.
 * @function handleClickOutside - Closes the sidebar when clicking outside of it on mobile view.
 * @function handleClickParent - Handles click events on parent navigation items.
 * @function handleClickChild - Handles click events on child navigation items.
 *
 * @event mousedown - Listens for mousedown events to detect clicks outside the sidebar.
 * @event resize - Listens for window resize events to adjust the sidebar layout.
 */
const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const storedSidebarState = localStorage.getItem("sidebarOpen");
    if (storedSidebarState) {
      setIsOpen(JSON.parse(storedSidebarState));
    }

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    localStorage.setItem("sidebarOpen", JSON.stringify(isOpen));
  }, [isOpen]);

  const [navigation, setNavigation] = useState([
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      current: true,
      link: "/home/dashboard",
    },
    {
      name: "Pengajuan",
      icon: HandHelping,
      current: false,
      link: "/home/submission",
    },
    { name: "Distribusi", icon: Boxes, current: false, link: "/home/distribution" },
    {
      name: "Manajemen Tanaman", icon: Sprout, current: false, link: "/home/planting", child: [
        {
          name: "Ajukan Tanaman",
          icon: Dot,
          current: false,
          link: "/home/planting/submission-plant",
        },
        {
          name: "Stok Bibit",
          icon: Dot,
          current: false,
          link: "/home/planting/seed-stock",
        },
      ]
    },
    { name: "Manajemen Website", icon: PanelsTopLeft, current: false },
    {
      name: "Laporan", icon: File, current: false, link: "/home/report", child: [
        {
          name: "Pengajuan",
          icon: Dot,
          current: false,
          link: "/home/report/submission",
        },
        {
          name: "Pengajuan Tanaman",
          icon: Dot,
          current: false,
          link: "/home/report/plant-submission",
        },
        {
          name: "Distribusi",
          icon: Dot,
          current: false,
          link: "/home/report/distribution",
        },
      ]
    },
    {
      name: "Manajemen Pengguna",
      child: [
        {
          name: "Admin",
          icon: Dot,
          current: false,
          link: "/home/management/user/admin",
        },
        {
          name: "Petani",
          icon: Dot,
          current: false,
          link: "/home/management/user/farmer",
        },
        {
          name: "Penyuluh",
          icon: Dot,
          current: false,
          link: "/home/management/user/instructor",
        },
        {
          name: "Distributor",
          icon: Dot,
          current: false,
          link: "/home/management/user/distribution",
        },
        {
          name: "Hak Akses",
          icon: Dot,
          current: false,
          link: "/home/management/user/access",
        },
      ],
      icon: UsersRound,
      current: false,
      link: "/home/management",
    },
    {
      name: "Data Master",
      icon: Database,
      current: false,
      link: "/home/master",
      child: [
        {
          name: "Poktan",
          icon: Dot,
          current: false,
          link: "/home/master/poktan",
        },
        {
          name: "Jenis Tanaman",
          icon: Dot,
          current: false,
          link: "/home/master/type-plant",
        },
        {
          name: "Metode Penanaman Tanaman",
          icon: Dot,
          current: false,
          link: "/home/master/planting-methods",
        },
        {
          name: "Metode Distribusi",
          icon: Dot,
          current: false,
          link: "/home/master/distribution-method",
        },
        {
          name: "Status Kepemilikan Lahan",
          icon: Dot,
          current: false,
          link: "/home/master/land-ownership-status",
        },
        {
          name: "Syarat dan Ketentuan",
          icon: Dot,
          current: false,
          link: "/home/master/terms-and-conditions",
        },
      ],
    },
  ]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (
      isMobile &&
      isOpen &&
      e.target &&
      !(e.target as Element).closest("#sidebar")
    ) {
      setIsOpen(false);
    }
  };

  const handleClickParent = (item: any) => {
    if (item.child) {
      setNavigation((prevNavigation) =>
        prevNavigation.map((navItem) =>
          navItem.name === item.name
            ? { ...navItem, current: !navItem.current }
            : navItem
        )
      );
      setNavigation((prevNavigation) =>
        prevNavigation.map((navItem) => {
          if (navItem.child) {
            return {
              ...navItem,
              child: navItem.child.map((childItem) => ({
                ...childItem,
                current: false,
              })),
            };
          }
          return navItem;
        })
      );
    } else {
      router.push(item.link);
      setNavigation((prevNavigation) =>
        prevNavigation.map((navItem) =>
          navItem.name === item.name
            ? { ...navItem, current: true }
            : { ...navItem, current: false }
        )
      );
      setNavigation((prevNavigation) =>
        prevNavigation.map((navItem) => {
          if (navItem.child) {
            return {
              ...navItem,
              child: navItem.child.map((childItem) => ({
                ...childItem,
                current: false,
              })),
            };
          }
          return navItem;
        })
      );
    }
  };

  const handleClickChild = (item: any) => {
    router.push(item.link);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobile, isOpen]);

  return (
    <div className={poppins.className + "relative"}>
      {/* Mobile Menu Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-white"
        onClick={toggleSidebar}
        aria-label="Toggle Menu"
      >
        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Sidebar */}
      <div
        id="sidebar"
        className={`fixed top-0 left-0 h-screen bg-white transition-all duration-300 ease-in-out z-40 py-4 shadow-lg
        ${isOpen ? "w-64" : "w-20"} 
        ${isMobile && !isOpen && "-translate-x-full"}
        ${isMobile && "w-64"}
        overflow-y-auto`}
        style={{ scrollbarWidth: "thin", scrollbarColor: "#ccc #f5f5f5" }}
      >
        {/* Logo Section */}
        <div className="flex flex-col items-center justify-center h-40 px-4 md:px-0">
          <div
            className={`flex font-bold text-xl ${!isOpen && "hidden"} ${isMobile && isOpen && "block"}`}
          >
            <img
              src="/assets/images/LogoPali.svg"
              alt="Logo"
              className="w-16 h-16 md:w-20 md:h-20"
            />
          </div>
          <div
            className={`text-primary-default text-sm font-semibold my-3 ${!isOpen && "hidden"} ${isMobile && isOpen && "block"}`}
          >
            SiPUTANI
          </div>
          <div
            className={`text-primary-default text-xs ${!isOpen && "hidden"} ${isMobile && isOpen && "block"}`}
          >
            Sistem Informasi Pupuk Tani
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="mt-8 px-4">
          <ul className="space-y-2">
            {navigation.map((item) => (
              <li key={item.name} className="relative">
                <button
                  onClick={() => handleClickParent(item)}
                  className={`flex items-center w-full p-3 rounded-lg transition-colors duration-200
                ${(pathname.split("/")[2] == item.link?.split("/")[2] && !item.child) && item.current ? "bg-primary-default text-white" : "text-primary-default hover:bg-primary-default hover:text-white"}
                ${pathname.startsWith(item.link ?? "") && item.child ? "bg-primary-default text-white" : ""}
                `}
                  aria-current={item.current ? "page" : undefined}
                >
                  <item.icon
                    className={`h-6 w-6 ${pathname.startsWith(item.link ?? "") && !item.child && item.current ? "text-white" : ""} `}
                  />
                  <span
                    className={`ml-4 text-sm ${!isOpen && "hidden"} ${isMobile && isOpen && "block"} text-start text-sm`}
                  >
                    {item.name}
                  </span>
                </button>
                {item.child && item.current && (
                  <ul className="mt-2 space-y-2 pl-5">
                    {item.child.map((childItem) => (
                      <li key={childItem.name}>
                        <button
                          onClick={() => handleClickChild(childItem)}
                          className={`flex items-center w-full p-3 rounded-lg transition-colors duration-200
              ${pathname.startsWith(childItem.link) ? "font-bold text-primary-default" : "text-primary-default hover:bg-primary-default hover:text-white"}
              `}
                          aria-current={childItem.current ? "page" : undefined}
                        >
                          <childItem.icon
                            className={`h-6 w-6 ${pathname.startsWith(childItem.link) ? "text-primary-default" : ""} `}
                          />
                          <span
                            className={`ml-2 text-xs ${!isOpen && "hidden"} ${isMobile && isOpen && "block"} text-start text-sm`}
                          >
                            {childItem.name}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
