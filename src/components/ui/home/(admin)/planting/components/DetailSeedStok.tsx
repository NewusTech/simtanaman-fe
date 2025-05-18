"use client";

import FormLabel from "@/components/ui/base/form-label";
import { useEffect, useState } from "react";
import TabAddition from "./seed-stok/tab-addition";
import TabExpenditure from "./seed-stok/tab-expenditure";
import { SeedStock } from "@/types/planting/seedStock";
import {
  fetchSeedStockDataAdditionById,
  fetchSeedStockDataReleaseById,
} from "@/lib/planting/seedStockFetching";
import { useCallback } from "react";
import { da } from "date-fns/locale";
import { useAuth } from "@/hooks/useAuth";

export default function DetailSeedStok() {
  const { getToken } = useAuth();
  const token = getToken();
  const [selectTab, setselectTab] = useState(0);
  const [list, setList] = useState<SeedStock[]>([]);
  const [data, setData] = useState({
    jenisTanaman: "",
    jumlahStok: 0,
  });

  const [currentPage, setCurrentPage] = useState(1);

  const fetchData = useCallback(async (page: number, select: number) => {
    const id = Number(new URLSearchParams(window.location.search).get("id"));
    if (select === 0) {
      const data = await fetchSeedStockDataAdditionById(
        page,
        id,
        token ?? ""
      );
      setList(data && Array.isArray(data.items) ? data.items : []);
    } else {
      const data = await fetchSeedStockDataReleaseById(
        page,
        id,
        token??""
      );
      setList(data && Array.isArray(data.items) ? data.items : []);
    }
  }, []);

  useEffect(() => {
    const id = Number(new URLSearchParams(window.location.search).get("id"));
    const jenisTanaman = String(
      new URLSearchParams(window.location.search).get("jenisTanaman")
    );
    const jumlahStok = Number(
      new URLSearchParams(window.location.search).get("jumlah")
    );
    if (id) {
      setData({
        jenisTanaman: jenisTanaman || "",
        jumlahStok: jumlahStok,
      });
      fetchData(currentPage, selectTab);
    }
  }, [currentPage, selectTab]);

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-white rounded-lg p-8 flex items-center justify-between mb-4">
        <FormLabel label={"Jenis Tanaman"} value={data.jenisTanaman} />
        <FormLabel
          label={"Jumlah Stok Bibit"}
          value={String(data.jumlahStok)}
        />
      </div>
      <div className="bg-white rounded-lg p-4 flex flex-col mb-4">
        <div className="relative flex border-b border-gray-300 mb-7 w-96">
          <button
            className={`flex-1 py-2 text-center text-sm font-medium ${
              selectTab === 0 ? "text-primary-default" : "text-gray-400"
            }`}
            onClick={() => {
                setselectTab(0);
                fetchData(currentPage, 0);
            }}
          >
            Penambahan
          </button>
          <button
            className={`flex-1 py-2 text-center text-sm font-medium ${
              selectTab === 1 ? "text-primary-default" : "text-gray-400"
            }`}
            onClick={() => {
                setselectTab(1);
                fetchData(currentPage, 1);
            }}
          >
            Pengeluaran
          </button>
          <div
            className={`absolute bottom-0 h-1 bg-primary-default transition-all duration-300 ${selectTab === 0 ? "left-0 w-1/2" : "left-1/2 w-1/2"}`}
          ></div>
        </div>
        {selectTab === 0 ? (
          <TabAddition
            listPenambahan={list.map((item) => ({
              tanggal_pembahan: item.createdAt ?? "",
              jumlah_bibit:
                item.jumlah !== undefined && item.jumlah !== null
                  ? String(item.jumlah)
                  : "",
            }))}
          />
        ) : (
          <TabExpenditure 
          listPenambahan={list.map((item) => ({
              tanggal_pengeluaran: item.createdAt ?? "",
              jumlah_bibit:
                item.jumlah !== undefined && item.jumlah !== null
                  ? String(item.jumlah)
                  : "",
                distributor: item.plant?.name ?? "",
            }))
          }
          />
        )}
      </div>
    </div>
  );
}
