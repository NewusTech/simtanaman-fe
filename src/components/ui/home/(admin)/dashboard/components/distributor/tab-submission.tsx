"use client";
import { BadgeX, CircleCheckBig, CircleX, Clock, Send } from "lucide-react";
import { LineChartInfo } from "../../line-chart-info";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { CardsDistribusi, ChartDistribusiBulanan, StokBibit } from "@/types/dashboard/distributorDashboard";
import { BarChartInfo } from "../../bar-chart-info";
import { TinyBarChart } from "../../tiny-chart-info";
import { fetchDistributorDashboard } from "@/lib/dashboard/dashboardFetching";

export default function TabSubmission() {
  const { getToken } = useAuth();
  const token = getToken();
  const [card, setCard] = useState<CardsDistribusi>(() => ({
    dalamProses: 0,
    dijadwalkan: 0,
    selesai: 0,
  }));
  const [chartDistribusiBulanan, setChartDistribusiBulanan] = useState<ChartDistribusiBulanan[]>([]);
  const [listStokBibit, setListStokBibit] = useState<StokBibit[]>([]);

  const fetchPage = async () => {
    const res = await fetchDistributorDashboard(String(token));
    if (res) {
      setCard(res.cards);
      setChartDistribusiBulanan(res.chart.distribusiBulanan);
      setListStokBibit(res.stokBibit);
    }
  }

  useEffect(() => {
      fetchPage();
    }, []);
  return (
    <div>
      <div>
        <div className="mt-4 flex flex-wrap justify-between items-center gap-4 mb-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
            <div className="flex flex-col items-center gap-4 h-auto bg-primary-100 rounded-md p-4">
              <Send className="h-8 w-8 text-primary-default" />
              <div className="text-primary-default">Dalam Proses</div>
              <div className="text-black font-medium text-2xl">{card.dalamProses ?? 0}</div>
            </div>
            <div className="flex flex-col items-center gap-4 h-auto bg-primary-100 rounded-md p-4">
              <Clock className="h-8 w-8 text-info-500" />
              <div className="text-primary-default">DiJadwalkan</div>
              <div className="text-black font-medium text-2xl">{card.dijadwalkan ?? 0}</div>
            </div>
            <div className="flex flex-col items-center gap-4 h-auto bg-primary-100 rounded-md p-4">
              <CircleCheckBig className="h-8 w-8 text-success-600" />
              <div className="text-primary-default">Selesai</div>
              <div className="text-black font-medium text-2xl">{card.selesai ?? 0}</div>
            </div>
          </div>
        </div>

        <div className="border border-gray-200 rounded-lg p-4">
          <div className="text-lg font-medium mb-4">
            Total Keseluruhan Distribusi
          </div>
          <TinyBarChart
            data={
              chartDistribusiBulanan.map((item) => ({
                month: item.bulan,
                desktop: item.jumlah,
              }))
            }
            barColor="#80AC6C"
            width={400}
            height={40}
          />
        </div>
      </div>
    </div>
  );
}
