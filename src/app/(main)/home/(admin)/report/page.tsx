"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ReportPage() {
    const router = useRouter();

    useEffect(() => {
        router.push("/home/report/submission-plant");
    }, [router]);

    return null;
}