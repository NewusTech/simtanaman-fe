"use client";

import Sidebar from "@/components/ui/home/Sidebar";
import { usePathname } from "next/navigation";

export default function Home() {
  return (
    <div className="flex flex-col md:flex-row">
      <Sidebar />
      <main className="flex-1 p-6 md:ml-60"></main>
    </div>
  );
}
