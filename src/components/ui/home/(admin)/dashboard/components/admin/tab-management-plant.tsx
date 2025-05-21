"use client";
import { BadgeX, CircleCheckBig, CircleX, Send } from "lucide-react";
import { LineChartInfo } from "../../line-chart-info";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { BarChartInfo } from "../../bar-chart-info";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { addDays } from "date-fns";

interface TabManagementPlantProps {
  selectTabChild: number;
  setSelectTabChild: (value: number) => void;
}

export default function TabManagementPlant({
  selectTabChild,
  setSelectTabChild,
}: TabManagementPlantProps) {
  const [datePengajuan, setDatePengajuan] = useState<DateRange>({
    from: new Date(),
    to: addDays(new Date(), 7),
  });
  const [dateJumlahStok, setDateJumlahStok] = useState<DateRange>({
    from: new Date(),
    to: addDays(new Date(), 7),
  });
  return (
    <div>
      <div className="mt-4 flex flex-wrap justify-between items-center gap-4 mb-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
          <div className="flex flex-col items-center gap-4 h-auto bg-primary-100 rounded-md p-4">
            <Send className="h-8 w-8 text-primary-default" />
            <div className="text-primary-default">Diajukan</div>
            <div className="text-black font-medium text-2xl">05</div>
          </div>
          <div className="flex flex-col items-center gap-4 h-auto bg-primary-100 rounded-md p-4">
            <CircleCheckBig className="h-8 w-8 text-success-600" />
            <div className="text-primary-default">Disetujui</div>
            <div className="text-black font-medium text-2xl">05</div>
          </div>
          <div className="flex flex-col items-center gap-4 h-auto bg-primary-100 rounded-md p-4">
            <CircleX className="h-8 w-8 text-danger-600" />
            <div className="text-primary-default">Ditolak</div>
            <div className="text-black font-medium text-2xl">05</div>
          </div>
        </div>
      </div>

      <div className="relative flex border-b border-gray-300 mb-4 w-96">
        <button
          className={`flex-1 py-2 text-center text-sm font-medium ${
            selectTabChild === 0 ? "text-primary-default" : "text-gray-400"
          }`}
          onClick={() => setSelectTabChild(0)}
        >
          Ajukan Tanaman
        </button>
        <button
          className={`flex-1 py-2 text-center text-sm font-medium ${
            selectTabChild === 1 ? "text-primary-default" : "text-gray-400"
          }`}
          onClick={() => setSelectTabChild(1)}
        >
          Stok Bibit Tanaman
        </button>
        <div
          className={`absolute bottom-0 h-1 bg-primary-default transition-all duration-300 ${
            selectTabChild === 0 ? "left-0 w-1/2" : "left-1/2 w-1/2"
          }`}
        ></div>
      </div>

      {(selectTabChild === 0 && (
        <div className="border border-gray-200 rounded-lg p-4">
          <div className="flex justify-between items-center gap-4 mb-4">
            <div className="text-lg font-medium mb-4">
              Total Pengajuan Tanaman
            </div>
            <DatePickerWithRange
              date={datePengajuan}
              onSelect={setDatePengajuan}
            />
          </div>
          <LineChartInfo />
          <div className="flex justify-center items-center gap-4 mt-4">
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 bg-[#858590] rounded-full " />
              <span className="text-sm">Diajukan</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 bg-[#388E3C] rounded-full " />
              <span className="text-sm">Disetujui</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 bg-[#F54444] rounded-full " />
              <span className="text-sm">Ditolak</span>
            </div>
          </div>
        </div>
      )) || (
        <div className="border border-gray-200 rounded-lg p-4">
          <div className="flex justify-between items-center gap-4 mb-4">
            <div className="text-lg font-medium mb-4">
              Jumlah Stok Bibit Tanaman
            </div>
            <DatePickerWithRange
              date={dateJumlahStok}
              onSelect={setDateJumlahStok}
            />
          </div>
          <BarChartInfo />
        </div>
      )}
    </div>
  );
}
