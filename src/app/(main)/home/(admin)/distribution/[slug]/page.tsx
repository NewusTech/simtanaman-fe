"use client";

import { Button } from "@/components/ui/button";
import TabDistributionSchedule from "@/components/ui/home/(admin)/distribution/tab-distribution-schedule";
import TabDocumentation from "@/components/ui/home/(admin)/distribution/tab-documentation";
import TabSubmission from "@/components/ui/home/(admin)/distribution/tab-submission";
import { se } from "date-fns/locale";
import { Printer } from "lucide-react";
import { useState } from "react";

export default function Page() {
    const [selectTab, setselectTab] = useState(0);
    return (
        <div className="bg-white p-4 rounded-md shadow-md">
            <div className="flex justify-end items-center mb-4">
                <div className="bg-info-200 px-6 p-2 text-sm rounded-md text-info-500">Dijadwalkan</div>
            </div>
            <div className="flex justify-between items-center">
                <div className="relative flex border-b border-gray-300 mb-7 w-96">
                    <button
                        className={`flex-1 py-2 text-center text-sm font-medium ${selectTab === 0 ? "text-primary-default" : "text-gray-400"
                            }`}
                        onClick={() => setselectTab(0)}
                    >
                        Pengajuan
                    </button>
                    <button
                        className={`flex-1 py-2 text-center text-sm font-medium ${selectTab === 1 ? "text-primary-default" : "text-gray-400"
                            }`}
                        onClick={() => setselectTab(1)}
                    >
                        Jadwal Distribusi
                    </button>
                    <button
                        className={`flex-1 py-2 text-center text-sm font-medium ${selectTab === 2 ? "text-primary-default" : "text-gray-400"
                            }`}
                        onClick={() => setselectTab(2)}
                    >
                        Dokumentasi
                    </button>
                    <div
                        className={`absolute bottom-0 h-1 bg-primary-default transition-all duration-300 ${selectTab === 0 ? "left-0 w-1/3" : selectTab === 1 ? "left-1/3 w-1/3" : "left-2/3 w-1/3"
                            }`}
                    ></div>
                </div>
                <Button className="bg-primary-default text-white px-4 py-2 rounded-full flex items-center">
                    <Printer className="mr-2" />
                    Print</Button>
            </div>

            {selectTab === 0 && (
                <TabSubmission />
            )}
            {selectTab === 1 && (
                <TabDistributionSchedule />
            )}
            {selectTab === 2 && (
                <TabDocumentation />
            )}
        </div>
    );
}