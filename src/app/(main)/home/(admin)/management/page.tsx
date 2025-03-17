"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

/**
 * ManagementPage component.
 *
 * This component is a client-side rendered page that automatically redirects
 * the user to the "/home/management/user" route upon mounting.
 *
 * @returns {null} This component does not render any visible content.
 *
 * @remarks
 * - The `useEffect` hook is used to perform the redirection when the component is mounted.
 * - The `useRouter` hook from Next.js is used to programmatically navigate to the specified route.
 */
export default function ManagementPage() {
  const router = useRouter();

  useEffect(() => {
    router.push("/home/management/user");
  }, [router]);

  return null;
}
