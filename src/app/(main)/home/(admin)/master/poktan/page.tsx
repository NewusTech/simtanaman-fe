"use client";
import Search from "@/components/ui/search";
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
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  EllipsisVertical,
  Plus,
} from "lucide-react";
import { useEffect, useState } from "react";
export default function PoktanPage() {
  const [search, setSearch] = useState("");

  const handleChange = (value: string) => {
    setSearch(value);
  };

  const [listPoktan, setListPoktan] = useState([
    {
      name: "Berkah Jaya",
    },
  ]);

  return (
    <div className="bg-white p-4 rounded-md shadow-md font-poppins">
      <div className="text-lg font-medium mb-4">
        Nama Kelompok Tani (Poktan)
      </div>
      <div className="flex justify-between items-center gap-4 mb-4">
        <div>
          <button
            onClick={() => {}}
            className="bg-primary-500 flex text-white px-5 py-2 text-nowrap rounded-full"
          >
            <Plus className="mr-2" />
            Tambah
          </button>
        </div>
        <div className="w-full">
          <Search value={search} onChange={handleChange} />
        </div>
      </div>
      <Table className="mt-4 overflow-hidden">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px] bg-gray-200">No</TableHead>
            <TableHead className="bg-gray-200">Nama Kelompok Poktan</TableHead>
            <TableHead className="text-right bg-gray-200"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {listPoktan.map((value) => (
            <TableRow key={listPoktan.indexOf(value)}>
              <TableCell className="w-[50px]">
                {listPoktan.indexOf(value) + 1}
              </TableCell>
              <TableCell className="font-medium">{value.name}</TableCell>
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
                      <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={() => {}}
                      >
                        Edit
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
            <TableCell colSpan={8} className="text-right">
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
