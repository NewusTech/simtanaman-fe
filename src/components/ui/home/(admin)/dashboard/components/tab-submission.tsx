"use client";
import { BadgeX, CircleCheckBig, CircleX, Send } from "lucide-react";
import { LineChartInfo } from "../line-chart-info";

export default function TabSubmission() {
  return (
    <div>
      <div>
        <div className="mt-4 flex flex-wrap justify-between items-center gap-4 mb-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
            <div className="flex flex-col items-center gap-4 h-auto bg-primary-100 rounded-md p-4">
              <Send className="h-8 w-8 text-primary-default" />
              <div className="text-primary-default">Dalam Proses</div>
              <div className="text-black font-medium text-2xl">05</div>
            </div>
            <div className="flex flex-col items-center gap-4 h-auto bg-primary-100 rounded-md p-4">
              <CircleCheckBig className="h-8 w-8 text-success-600" />
              <div className="text-primary-default">Disetujui</div>
              <div className="text-black font-medium text-2xl">05</div>
            </div>
            <div className="flex flex-col items-center gap-4 h-auto bg-primary-100 rounded-md p-4">
              <BadgeX className="h-8 w-8 text-warning-600" />
              <div className="text-primary-default">Direvisi</div>
              <div className="text-black font-medium text-2xl">05</div>
            </div>
            <div className="flex flex-col items-center gap-4 h-auto bg-primary-100 rounded-md p-4">
              <CircleX className="h-8 w-8 text-danger-600" />
              <div className="text-primary-default">Ditolak</div>
              <div className="text-black font-medium text-2xl">05</div>
            </div>
          </div>
        </div>

        <div className="border border-gray-200 rounded-lg p-4">
          <div className="text-lg font-medium mb-4">
            Total Keseluruhan Pengajuan
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
              <div className="h-4 w-4 bg-[#D39C55] rounded-full " />
              <span className="text-sm">Direvisi</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 bg-[#F54444] rounded-full " />
              <span className="text-sm">Ditolak</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
