"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function UserPage() {
  const router = useRouter();

  useEffect(() => {
    router.push("/home/management/user/admin");
  }, [router]);

  return null;
}
