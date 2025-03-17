"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

/**
 * MasterPage component that redirects to the user management page.
 *
 * This component uses the Next.js `useRouter` hook to programmatically navigate
 * to the "/home/management/user" route when the component is mounted.
 *
 * @component
 * @example
 * return <MasterPage />
 *
 * @returns {null} This component does not render any visible content.
 */
export default function MasterPage() {
  const router = useRouter();

  useEffect(() => {
    router.push("/home/master/poktan");
  }, [router]);

  return null;
}
