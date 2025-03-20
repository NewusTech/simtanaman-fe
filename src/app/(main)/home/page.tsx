"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { usePermission } from "@/hooks/usePermission";
import { log } from "console";

export default function Home() {
  const router = useRouter();
  const { role } = usePermission();

  useEffect(() => {
    if (role) {
      switch (role) {
        case 'admin':
          router.push("/home/dashboard");
          break;
        case 'penyuluh':
          router.push("/home/penyuluh/dashboard");
          break;
        case 'distributor':
          router.push("/home/distributor/dashboard");
          break;
        case 'user':
          router.push("/home/user/dashboard");
          break;
        default:
          router.push("/auth/login");
      }
    } else {
      router.push("/auth/login");
    }
  }, [router, role]);

  return (
    <div>HOME</div>
  );
}
