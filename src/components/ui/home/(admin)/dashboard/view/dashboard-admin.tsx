"use client";

import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { addDays } from "date-fns/addDays";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import TabSubmission from "../components/admin/tab-submission";
import TabManagementPlant from "../components/admin/tab-management-plant";
import TableSubmission from "../components/admin/table-submission";
import TableSubmissionPlant from "../components/admin/table-submission-plant";
import TableStokPlantSeeds from "../components/admin/table-stock-plant-seeds";

export default function AdminDashboardPage() {
    const [dateParent, setDateParent] = useState<DateRange>({
    from: new Date(),
    to: addDays(new Date(), 7),
  });
  const [selectTab, setSelectTab] = useState(0);
  const [selectTabChild, setSelectTabChild] = useState(0);
    return (
        <div>
            <div className="bg-white p-4 rounded-md shadow-md font-poppins">
                {/* header */}
                <div className="flex justify-between items-center mb-4">
                  <div className="text-lg font-medium mb-4">Dashboard</div>
                  <DatePickerWithRange date={dateParent} onSelect={setDateParent} />
                </div>
        
                <div className="flex gap-4 justify-between items-center bg-primary-default rounded-full p-4">
                  <button
                    onClick={() => setSelectTab(0)}
                    className={`flex-1 py-2  rounded-full ${selectTab === 0
                      ? "bg-white text-primary-default"
                      : "border border-white text-white"
                      }`}
                  >
                    <span className="text-sm">Pengajuan</span>
                  </button>
                  <button
                    onClick={() => setSelectTab(1)}
                    className={`flex-1 py-2 rounded-full  ${selectTab === 1
                      ? "bg-white text-primary-default"
                      : "border border-white text-white"
                      }`}
                  >
                    <span className="text-sm">Manajemen Tanaman</span>
                  </button>
                </div>
                {/* end of header */}
        
                {/* body */}
                {/* Tab Pengajuan */}
                {selectTab === 0 && <TabSubmission />}
        
                {/* Tab Manajemen Tanaman */}
                {selectTab === 1 && (
                  <TabManagementPlant
                    selectTabChild={selectTabChild}
                    setSelectTabChild={setSelectTabChild}
                  />
                )}
                {/* end of body */}
              </div>
        
              {/* Tab Pengajuan */}
              {selectTab === 0 && <TableSubmission />}
              {/* End of Tab Pengajuan */}
        
              {/* Tab Manajemen Tanaman */}
              {selectTab === 1 && selectTabChild === 0 && <TableSubmissionPlant />}
        
              {selectTab === 1 && selectTabChild === 1 && <TableStokPlantSeeds />}
        </div>
    )
}