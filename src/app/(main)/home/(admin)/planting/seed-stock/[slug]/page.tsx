"use client";

import AddSeedStok from "@/components/ui/home/(admin)/planting/components/AddSeedStok";
import DetailSeedStok from "@/components/ui/home/(admin)/planting/components/DetailSeedStok";
import { usePathname } from "next/navigation";
import { use } from "react";

export default function Component() {
    const pathName = usePathname();

    return (
        <div>
            {pathName?.split("/").pop()?.includes( "Tambah" )? (<AddSeedStok />) : (<DetailSeedStok />)}
        </div>
    );
}