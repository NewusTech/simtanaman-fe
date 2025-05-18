"use client";

import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { useAuth } from "@/hooks/useAuth";
import { fetchLogAktifitasData } from "@/lib/log-aktifitas/logAktifitasFetching";
import { LogAktifitas } from "@/types/log-aktifitas/logAktifitas";
import { addDays } from "date-fns";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { DateRange } from "react-day-picker";

export default function LogPage() {
  const { getToken } = useAuth();
  const token = getToken();
  const [dateParent, setDateParent] = useState<DateRange>({
    from: new Date(),
    to: addDays(new Date(), 7),
  });
  const [listLog, setListLog] = useState<LogAktifitas[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchPage = useCallback(
    async (page: number, startDate: string, endDate:string) => {
      if (loading) return;

      setLoading(true);
    setListLog([]);
    const data = await fetchLogAktifitasData(
      page,
      String(token),
      startDate,
      endDate
    );
      setListLog(data.items);
      setTotalPages(data.current_page);
      setLoading(false);
    },
    [loading, token]
  );

  useEffect(() => {
    const pad = (n: number) => n.toString().padStart(2, "0");
    const formatDate = (date: Date) =>
      `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;

    const startDate = dateParent.from
      ? formatDate(dateParent.from)
      : formatDate(new Date());
    const endDate = dateParent.to
      ? formatDate(dateParent.to)
      : formatDate(addDays(new Date(), 7));
    fetchPage(currentPage, startDate, endDate);
  }, [currentPage]);

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <div className="flex justify-between items-center mb-4 border-b pb-4">
        <div className="text-lg font-semibold">Log Aktivitas</div>
        <DatePickerWithRange date={dateParent} onSelect={(date: DateRange) =>{
            setDateParent(date);
            setCurrentPage(1);
            const pad = (n: number) => n.toString().padStart(2, "0");
            const formatDate = (date: Date) =>
              `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
            fetchPage(
              1,
              date.from ? formatDate(date.from) : formatDate(new Date()),
              date.to ? formatDate(date.to) : formatDate(addDays(new Date(), 7))
            );
            console.log("Selected date range:", date);
            
        }} />
      </div>

      <div className="flex flex-col gap-2">
        {listLog.map((log) => (
          <div
            key={log.id}
            className="flex justify-between items-center p-4 bg-white border-b rounded-md"
          >
            <div className="text-sm font-medium">{log.user?.name}</div>
            {new Date(log.createdAt).toLocaleDateString("id-ID", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </div>
        ))}
        <div className="w-full h-full flex justify-end items-center gap-5">
          <div className="relative text-center text-[#597445] text-sm font-poppins font-normal leading-[30px] break-words">
            {listLog.length} dari {totalPages * listLog.length} total data
          </div>
          <div className="flex justify-center items-center gap-2">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage <= 1 || loading}
              className={`w-10 h-10 flex justify-center items-center rounded-md border ${
                currentPage <= 1 || loading
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-white text-[#597445] border-[#BDBDC2]"
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-4 py-2 rounded-md ${
                    page === currentPage
                      ? "bg-[#597445] text-white"
                      : "bg-white text-[#597445] border border-[#BDBDC2]"
                  }`}
                >
                  {page}
                </button>
              )
            )}
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage >= totalPages || loading}
              className={`w-10 h-10 flex justify-center items-center rounded-md border ${
                currentPage >= totalPages || loading
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-white text-[#597445] border-[#BDBDC2]"
              }`}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
