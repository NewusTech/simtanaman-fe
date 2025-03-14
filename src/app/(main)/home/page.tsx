"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

/**
 * Home component that redirects to the dashboard page.
 *
 * This component uses the Next.js `useRouter` hook to programmatically
 * navigate to the "/home/dashboard" route when the component is mounted.
 *
 * @returns {null} This component does not render any content.
 */
export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/home/dashboard");
  }, [router]);

  return null;
}
