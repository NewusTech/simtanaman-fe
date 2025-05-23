"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  EllipsisVertical,
  Printer,
} from "lucide-react";
import { useState } from "react";

export default function TableSubmissionPlant() {
  const [listTabFilter, setSelectTabFilter] = useState<
    { name: string; select: boolean }[]
  >([
    {
      name: "Semua",
      select: true,
    },
    {
      name: "Menunggu",
      select: false,
    },
    {
      name: "Dijadwalkan",
      select: false,
    },
    {
      name: "Selesai",
      select: false,
    }
  ]);
  const [listPengajuan, setListPengajuan] = useState([
    {
      tanggal: "17/02/2025",
      distributor: "Dila",
      jenis_tanaman: "Padi",
      jumlah_bibit: "500 bibit Padi",
      status: "Diajukan",
    },
    {
      tanggal: "17/02/2025",
      distributor: "Dila",
      jenis_tanaman: "Padi",
      jumlah_bibit: "500 bibit Padi",
      status: "Disetujui",
    },
    {
      tanggal: "17/02/2025",
      distributor: "Dila",
      jenis_tanaman: "Padi",
      jumlah_bibit: "500 bibit Padi",
      status: "Ditolak",
    },
  ]);
  return (
    <div className="bg-white p-4 rounded-md shadow-md font-poppins mt-4">
      <div className="flex justify-between items-center gap-4 mb-4">
        <div className="bg-white rounded-full p-2 shadow-lg">
          {listTabFilter.map((tab, index) => (
            <button
              key={index}
              onClick={() => {
                const updatedTabs = listTabFilter.map((t, i) => ({
                  ...t,
                  select: i === index,
                }));
                setSelectTabFilter(updatedTabs);
              }}
              className={`rounded-full p-2 px-5 transition-all duration-300 ease-in-out ${
                tab.select ? "bg-primary-default text-white" : ""
              }`}
            >
              <span className="text-sm">{tab.name}</span>
            </button>
          ))}
        </div>
        <button className="border border-neutral-70 text-primary-default rounded-full p-2 px-5 flex items-center gap-2">
          <Printer className="h-6 w-6" />
          Print
        </button>
      </div>
      <Table className="mt-4 overflow-hidden">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px] bg-gray-200">No</TableHead>
            <TableHead className="w-[100px] bg-gray-200">Tanggal</TableHead>
            <TableHead className="bg-gray-200">Distributor</TableHead>
            <TableHead className="text-center bg-gray-200">
              Jenis Tanaman
            </TableHead>
            <TableHead className="text-center bg-gray-200">
              Jumlah Bibit Yang Diajukan
            </TableHead>
            <TableHead className="text-center bg-gray-200">Status</TableHead>
            <TableHead className="text-right bg-gray-200"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {listPengajuan.map((value) => (
            <TableRow key={listPengajuan.indexOf(value)}>
              <TableCell className="w-[50px]">
                {listPengajuan.indexOf(value) + 1}
              </TableCell>
              <TableCell className="font-medium">{value.tanggal}</TableCell>
              <TableCell className="text-left">{value.distributor}</TableCell>
              <TableCell className="text-center">
                {value.jenis_tanaman}
              </TableCell>
              <TableCell className="text-center">
                {value.jumlah_bibit}
              </TableCell>
              <TableCell
                className={`text-center ${value.status === "Disetujui" ? "text-green-500" : value.status === "Diajukan" ? "text-neutral-70" : "text-red-500"}`}
              >
                {value.status}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="border-none bg-transparent active:border-none focus:border-none">
                      <EllipsisVertical className="cursor-pointer" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-white shadow-md rounded-md absolute left-[-110px]">
                      <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={() => {}}
                      >
                        Detail
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={9} className="text-right">
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
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
