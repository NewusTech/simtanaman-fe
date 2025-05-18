"use client";

import { Button } from "@/components/ui/button";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import SubmissionFilterModal from "@/components/ui/home/(admin)/submission/modal/SubmissionFilterModal";
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
import { useAuth } from "@/hooks/useAuth";
import { fetchPengajuanData } from "@/lib/pengajuan/pengajuanFetching";
import { usePermission } from "@/store/usePermission";
import { PengajuanItem } from "@/types/pengajuan/pengajuan";
import { addDays } from "date-fns";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  EllipsisVertical,
  Filter,
  Plus,
  Printer,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { DateRange } from "react-day-picker";

export default function SubmissionPage() {
  const { getToken } = useAuth();
  const token = getToken();
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const role = usePermission((state) => state.role);
  const [dateParent, setDateParent] = useState<DateRange>({
    from: new Date(),
    to: addDays(new Date(), 7),
  });
  const [listTabFilter, setSelectTabFilter] = useState<
    { name: string; select: boolean }[]
  >([
    {
      name: "Semua",
      select: true,
    },
    {
      name: "Diajukan",
      select: false,
    },
    {
      name: "Disetujui",
      select: false,
    },
    {
      name: "Direvisi",
      select: false,
    },
    {
      name: "Ditolak",
      select: false,
    },
  ]);

  const [listPengajuan, setListPengajuan] = useState<PengajuanItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [items, setItems] = useState<PengajuanItem[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleChange = (value: string) => {
    setSearch(value);
  };
  const handleDetail = (slug: string, params?: Object) => {
    router.push("/home/submission/" + slug + (params ? `?${new URLSearchParams(params as any)}` : ""));
  };
  const handleFilter = () => {
    setIsModalOpen(true);
  };
  const fetchPage = useCallback(
    async (page: number) => {
      if (loading) return;

      setLoading(true);
      const data = await fetchPengajuanData(page, String(token));
      setItems(data.items);
      setListPengajuan(data.items);
      setTotalPages(data.current_page);
      setLoading(false);
    },
    [loading, token]
  );
  useEffect(() => {
    fetchPage(currentPage);
  }, [currentPage]);
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      {/* header */}
      <div className="flex justify-between items-center">
        <div className="text-lg font-semibold">Data Pengajuan</div>
        <DatePickerWithRange date={dateParent} onSelect={setDateParent} />
      </div>

      <div className="mt-4 flex items-center justify-between w-full gap-4">
        <div className="flex items-center w-full gap-4">
          <div className="flex items-center gap-4">
            <Button
              onClick={() => handleFilter()}
              className="border border-neutral-70 text-neutral-70 px-5 py-5 rounded-full"
            >
              <Filter className="mr-2 text-neutral-70" />
              Filter
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger className="w-10 h-10 flex justify-center items-center rounded-full border border-neutral-70">
                <EllipsisVertical className="cursor-pointer text-neutral-70" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white shadow-md rounded-md absolute left-[-110px]">
                <DropdownMenuItem className="cursor-pointer">
                  id
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  Nama
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="w-full">
            <Search value={search} onChange={handleChange} />
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center gap-4 my-4">
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
        <div className="flex items-center gap-4">
          <Button className="border border-neutral-70 text-primary-default rounded-full p-2 px-5 flex items-center gap-2">
            <Printer className="h-6 w-6" />
            Print
          </Button>
          {role === "user" && (
            <Button
              onClick={() => handleDetail("Tambah")}
              className="bg-primary-default text-white rounded-full p-2 px-5 flex items-center gap-2"
            >
              <Plus className="h-6 w-6" />
              Tambah
            </Button>
          )}
        </div>
      </div>
      {/* end of header */}

      {/* body */}
      {role === "user" && (
        <Table className="mt-4 overflow-hidden">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px] bg-gray-200">No</TableHead>
              <TableHead className="w-[100px] bg-gray-200">Tanggal</TableHead>
              <TableHead className="text-center bg-gray-200">
                Jenis Tanaman
              </TableHead>
              <TableHead className="text-center bg-gray-200">
                Luas Tanah
              </TableHead>
              <TableHead className="text-center bg-gray-200">
                Jumlah Bibit Yang Diajukan
              </TableHead>
              <TableHead className="text-center bg-gray-200">Status</TableHead>
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
                  <TableCell className="text-right">
                    <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
                  </TableCell>
                </TableRow>
              ))
            ) : listPengajuan.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} className="text-center">
                  Tidak ada data tersedia
                </TableCell>
              </TableRow>
            ) : (
              listPengajuan.map((value) => (
                <TableRow key={listPengajuan.indexOf(value)}>
                  <>
                    <TableCell className="w-[50px]">
                      {listPengajuan.indexOf(value) + 1}
                    </TableCell>
                    <TableCell>
                      {new Date(value.createdAt).toLocaleDateString("id-ID", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                    </TableCell>
                    <TableCell className="text-center">
                      {value.tanaman?.name}
                    </TableCell>
                    <TableCell className="text-center">
                      {value.luasLahan}
                    </TableCell>
                    <TableCell className="text-center">
                      {value.jumlahTanaman}
                    </TableCell>
                    <TableCell
                      className={`text-center ${value.status === "Disetujui" ? "text-green-500" : value.status === "Diajukan" ? "text-neutral-70" : value.status === "Direvisi" ? "text-warning-500" : "text-red-500"}`}
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
                              onClick={() => {
                                handleDetail("Detail", {id:value.id});
                              }}
                            >
                              Detail
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="cursor-pointer"
                              onClick={() => {
                                handleDetail("Edit", {id:value.id});
                              }}
                            >
                              Edit
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </>
                </TableRow>
              ))
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={9} className="text-right">
                <div className="w-full h-full flex justify-end items-center gap-5">
                  <div className="relative text-center text-[#597445] text-sm font-poppins font-normal leading-[30px] break-words">
                    {items.length} dari {totalPages * items.length} total data
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
                    {Array.from(
                      { length: totalPages },
                      (_, index) => index + 1
                    ).map((page) => (
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
                    ))}
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
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      )}
      {/* component */}
      <SubmissionFilterModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
      />
    </div>
  );
}
