"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ManagementPage() {
    const router = useRouter();

    useEffect(() => {
        router.push("/home/planting/submission-plant");
    }, [router]);

    return null;
}