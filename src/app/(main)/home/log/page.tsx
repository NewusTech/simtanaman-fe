"use client";

import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { addDays } from "date-fns";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { DateRange } from "react-day-picker";

export default function LogPage() {
    const [dateParent, setDateParent] = useState<DateRange>({
        from: new Date(),
        to: addDays(new Date(), 7),
    });
    const [listLog, setListLog] = useState([
        {
            id: 1,
            name: "Dede Sudrajat",
            date: new Date(),
        },
        {
            id: 2,
            name: "Dede Sudrajat",
            date: new Date(),
        },
        {
            id: 3,
            name: "Dede Sudrajat",
            date: new Date(),
        },
    ]);
    return (
        <div className="p-4 bg-white shadow-md rounded-lg">
            <div className="flex justify-between items-center mb-4 border-b pb-4">
                <div className="text-lg font-semibold">Log Aktivitas</div>
                <DatePickerWithRange date={dateParent} onSelect={setDateParent} />
            </div>

            <div className="flex flex-col gap-2">
                {listLog.map((log) => (
                    <div key={log.id} className="flex justify-between items-center p-4 bg-white border-b rounded-md">
                        <div className="text-sm font-medium">{log.name}</div>
                        {log.date.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </div>
                ))}
                <div className="w-full h-full flex justify-end items-center gap-5">
                    <div className="relative text-center text-[#597445] text-sm font-poppins font-normal leading-[30px] break-words">
                        10 dari 230 total data
                    </div>
                    <div className="flex justify-center items-center gap-6">
                        <div className="p-2 bg-[#FCFBFB] rounded-md border border-[#BDBDC2] flex justify-center items-center gap-2">
                            <div className="relative text-[#597445] text-sm font-inter font-medium leading-4 break-words">
                                1
                            </div>
                            <div className="w-4 h-4 relative">
                                <ChevronDown className="w-4 h-4 text-[#597445]" />
                            </div>
                        </div>
                        <div className="w-[235px] flex justify-between items-start">
                            <div className="w-10 py-2 bg-[#FCFBFB] rounded-md border border-[#BDBDC2] flex flex-col justify-center items-center">
                                <div className="w-4 h-4 relative">
                                    <ChevronLeft className="w-4 h-4 text-[#597445]" />
                                </div>
                            </div>
                            <div className="px-4 py-2 bg-[#597445] rounded-md flex justify-center items-center gap-2">
                                <div className="relative text-white text-sm font-inter font-medium leading-4 break-words">
                                    1
                                </div>
                            </div>
                            <div className="w-10 px-4 py-2 bg-[#FCFBFB] rounded-md border border-[#BDBDC2] flex justify-center items-center gap-2">
                                <div className="relative text-[#597445] text-sm font-inter font-medium leading-4 break-words">
                                    ...
                                </div>
                            </div>
                            <div className="px-4 py-2 bg-[#FCFBFB] rounded-md border border-[#BDBDC2] flex justify-center items-center gap-2">
                                <div className="relative text-[#597445] text-sm font-inter font-medium leading-4 break-words">
                                    5
                                </div>
                            </div>
                            <div className="w-10 h-9 bg-[#FCFBFB] rounded-md border border-[#BDBDC2] flex flex-col justify-center items-center">
                                <div className="w-4 h-4 relative">
                                    <ChevronRight className="w-4 h-4 text-[#597445]" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}