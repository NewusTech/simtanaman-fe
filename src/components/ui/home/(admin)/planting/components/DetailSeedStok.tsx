"use client";

import FormLabel from "@/components/ui/base/form-label";
import { useState } from "react";
import TabAddition from "./seed-stok/tab-addition";
import TabExpenditure from "./seed-stok/tab-expenditure";

export default function DetailSeedStok() {
    const [selectTab, setselectTab] = useState(0);
    return (
        <div className="flex flex-col gap-4">
            <div className="bg-white rounded-lg p-8 flex items-center justify-between mb-4">
                <FormLabel label={"Jenis Tanaman"} value={"Padi"} />
                <FormLabel label={"Jumlah Stok Bibit"} value={"500 Bibit Padi"} />
            </div>
            <div className="bg-white rounded-lg p-4 flex flex-col mb-4">
                <div className="relative flex border-b border-gray-300 mb-7 w-96">
                    <button
                        className={`flex-1 py-2 text-center text-sm font-medium ${selectTab === 0 ? "text-primary-default" : "text-gray-400"
                            }`}
                        onClick={() => setselectTab(0)}
                    >
                        Penambahan
                    </button>
                    <button
                        className={`flex-1 py-2 text-center text-sm font-medium ${selectTab === 1 ? "text-primary-default" : "text-gray-400"
                            }`}
                        onClick={() => setselectTab(1)}
                    >
                        Pengeluaran
                    </button>
                    <div
                        className={`absolute bottom-0 h-1 bg-primary-default transition-all duration-300 ${selectTab === 0 ? "left-0 w-1/2" : "left-1/2 w-1/2"}`}
                    ></div>
                </div>
                {selectTab === 0 ? (<TabAddition />) : (<TabExpenditure />)}
            </div>
        </div>
    );
}