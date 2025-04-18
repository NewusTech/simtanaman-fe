"use client";

import { GetServerSideProps } from 'next';
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
import { useRouter } from "next/navigation";
import { fetchPoktanData } from '@/lib/master/poktanFecthing';
import { Poktan } from '@/types/master/poktan';
import { usePaginationStore } from '@/store/usePaginationStore';
import { useAuth } from '@/hooks/useAuth';
import { se } from 'date-fns/locale';

/**
 * PoktanPage component renders a page for managing "Kelompok Tani" (Poktan) groups.
 *
 * @component
 * @example
 * return (
 *   <PoktanPage />
 * )
 *
 * @returns {JSX.Element} The rendered PoktanPage component.
 *
 * @description
 * This component includes a search bar, a button to add new Poktan, and a table displaying a list of Poktan groups.
 * Each row in the table includes options to view details or edit the Poktan group.
 *
 * @function
 * @name PoktanPage
 *
 * @property {string} search - The search term used to filter the list of Poktan groups.
 * @property {function} setSearch - Function to update the search term.
 * @property {Array<Object>} listPoktan - The list of Poktan groups.
 * @property {function} setListPoktan - Function to update the list of Poktan groups.
 *
 * @param {string} listPoktan[].name - The name of the Poktan group.
 *
 * @property {function} handleChange - Function to handle changes in the search input.
 * @property {function} handleSlugPoktan - Function to navigate to a specific Poktan page based on the slug.
 *
 * @requires useRouter from 'next/navigation'
 * @requires useState, useEffect from 'react'
 * @requires Search from '@/components/ui/search'
 * @requires Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow from '@/components/ui/table'
 * @requires DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger from '@/components/ui/dropdown-menu'
 * @requires ChevronDown, ChevronLeft, ChevronRight, EllipsisVertical, Plus from 'lucide-react'
 */
export default function PoktanPage() {
  const { getToken } = useAuth();
  const token = getToken();
  const router = useRouter();
  const [search, setSearch] = useState("");

  const handleChange = (value: string) => {
    setSearch(value);
  };

  const [listPoktan, setListPoktan] = useState<Poktan[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [items, setItems] = useState<Poktan[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleSlugPoktan = (slug: string, params?: Object) => {
    router.push("/home/master/poktan/" + slug + (params ? `?${new URLSearchParams(params as any)}` : ""));
  };

  const fetchPage = async (page: number) => {
    if (loading) return;

    setLoading(true);
    const data = await fetchPoktanData(page, String(token));
    setItems(data.items);
    setListPoktan(data.items);
    setTotalPages(data.total_pages);
    setLoading(false);
  };

  useEffect(() => {
    fetchPage(currentPage);
  }, [currentPage]);

  return (
    <div className="bg-white p-4 rounded-md shadow-md font-poppins">
      <div className="text-lg font-medium mb-4">
        Nama Kelompok Tani (Poktan)
      </div>
      <div className="flex justify-between items-center gap-4 mb-4">
        <div>
          <button
            onClick={() => handleSlugPoktan("Tambah")}
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
          {loading ? (
            Array.from({ length: 5 }).map((_, index) => (
              <TableRow key={index}>
                <TableCell className="w-[50px]">
                  <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
                </TableCell>
                <TableCell>
                  <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
                </TableCell>
              </TableRow>
            ))
          ) : listPoktan.length === 0 ? (
            <TableRow>
              <TableCell colSpan={3} className="text-center">
                Tidak ada data tersedia
              </TableCell>
            </TableRow>
          ) : (
            listPoktan.map((value) => (
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
                          onClick={() => handleSlugPoktan("Detail", { id: value.id })}
                        >
                          Detail
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="cursor-pointer"
                          onClick={() => handleSlugPoktan("Edit", { id: value.id })}
                        >
                          Edit
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={8} className="text-right">
              <div className="w-full h-full flex justify-end items-center gap-5">
                <div className="relative text-center text-[#597445] text-sm font-poppins font-normal leading-[30px] break-words">
                  {items.length} dari {totalPages * items.length} total data
                </div>
                <div className="flex justify-center items-center gap-2">
                  <button
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage <= 1 || loading}
                    className={`w-10 h-10 flex justify-center items-center rounded-md border ${currentPage <= 1 || loading
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-white text-[#597445] border-[#BDBDC2]"
                      }`}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-4 py-2 rounded-md ${page === currentPage
                        ? "bg-[#597445] text-white"
                        : "bg-white text-[#597445] border border-[#BDBDC2]"
                        }`}
                    >
                      {page}
                    </button>
                  ))}
                  <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage >= totalPages || loading}
                    className={`w-10 h-10 flex justify-center items-center rounded-md border ${currentPage >= totalPages || loading
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-white text-[#597445] border-[#BDBDC2]"
                      }`}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
