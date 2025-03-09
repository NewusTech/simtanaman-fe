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
} from "lucide-react";
import { useState, useEffect } from "react";
import {
  FiHome,
  FiSettings,
  FiUser,
  FiMessageSquare,
  FiFolder,
  FiPieChart,
  FiLogOut,
  FiMenu,
  FiX,
} from "react-icons/fi";

const Sidebar = () => {
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

  const navigation = [
    { name: "Dashboard", icon: LayoutDashboard, current: true },
    { name: "Pengajuan", icon: HandHelping, current: false },
    { name: "Distribusi", icon: Boxes, current: false },
    { name: "Manajemen Tanaman", icon: Sprout, current: false },
    { name: "Manajemen Website", icon: PanelsTopLeft, current: false },
    { name: "Laporan", icon: File, current: false },
    { name: "Manajemen Pengguna", icon: UsersRound, current: false },
    { name: "Data Master", icon: Database, current: false },
  ];

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

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobile, isOpen]);

  return (
    <div className="relative">
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
                    ${isOpen ? "w-60" : "w-20"} 
                    ${isMobile && !isOpen && "-translate-x-full"}
                    ${isMobile && "w-64"}`}
      >
        {/* Logo Section */}
        <div className="flex flex-col items-center justify-center h-40 px-4 md:px-0">
          <div
            className={`flex font-bold text-xl ${!isOpen && "hidden"} ${isMobile && isOpen && "block"}`}
          >
            <img
              src="assets/images/LogoPali.svg"
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
              <li key={item.name}>
                <button
                  className={`flex items-center w-full p-3 rounded-lg transition-colors duration-200
                                        ${item.current ? "bg-primary-default text-white" : "text-primary-default hover:bg-primary-default hover:text-white"}
                                        `}
                  aria-current={item.current ? "page" : undefined}
                >
                  <item.icon
                    className={`h-6 w-6 ${item.current ? "text-white" : "text-primary-default"}text-white`}
                  />
                  <span
                    className={`ml-4 ${!isOpen && "hidden"} ${isMobile && isOpen && "block"} text-start`}
                  >
                    {item.name}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
