"use client";
import { useRouter } from "next/navigation";
import { usePermission } from "@/hooks/usePermission";
import { useCallback, useEffect, useState } from "react";
import { addDays } from "date-fns";
import { DateRange } from "react-day-picker";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { Button } from "@/components/ui/button";
import {
  CalendarRange,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  EllipsisVertical,
  Eye,
  Filter,
  Plus,
  Printer,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import SubmissionFilterModal from "@/components/ui/home/(admin)/submission/modal/SubmissionFilterModal";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableFooter,
  Table,
} from "@/components/ui/table";
import Search from "@/components/ui/search";
import { useAuth } from "@/hooks/useAuth";
import { SeedStock } from "@/types/planting/seedStock";
import { fetchSeedStockData } from "@/lib/planting/seedStockFetching";

export default function SeedStokPage() {
  const { getToken } = useAuth();
  const token = getToken();
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dateParent, setDateParent] = useState<DateRange>({
    from: new Date(),
    to: addDays(new Date(), 7),
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  const [listStokBibit, setlistStokBibit] = useState<SeedStock[]>([]);

  const handleChange = (value: string) => {
    setSearch(value);
  };
  const handleDetail = (slug: string, params?: Object) => {
    router.push(
      "/home/planting/seed-stock/" +
        slug +
        (params ? `?${new URLSearchParams(params as any)}` : "")
    );
  };
  const handleFilter = () => {
    setIsModalOpen(true);
  };
  const fetchPage = useCallback(
    async (page: number) => {
      if (loading) return;

      setLoading(true);
      const data = await fetchSeedStockData(page, String(token));
      setlistStokBibit(data.items);
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
        <div className="text-lg font-semibold">Data Stok Bibit Tanaman</div>
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
          <div className="flex items-center gap-4">
            <Button className="border border-neutral-70 text-primary-default rounded-full p-2 px-5 flex items-center gap-2">
              <Printer className="h-6 w-6" />
              Print
            </Button>
            <Button
              onClick={() => {
                handleDetail("Tambah Stok Bibit");
              }}
              className="bg-primary-default flex items-center gap-1 rounded-full text-white"
            >
              <Plus className="mr-2" />
              Tambah
            </Button>
          </div>
        </div>
      </div>
      {/* end of header */}

      {/* body */}
      <Table className="mt-4 overflow-hidden">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px] bg-gray-200">No</TableHead>
            <TableHead className="text-left bg-gray-200">
              Jenis Tanaman
            </TableHead>
            <TableHead className="text-center bg-gray-200">
              Jumlah Bibit Yang Diajukan
            </TableHead>
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
          ) : listStokBibit.length === 0 ? (
            <TableRow>
              <TableCell colSpan={3} className="text-center">
                Tidak ada data tersedia
              </TableCell>
            </TableRow>
          ) : (
            listStokBibit.map((value) => (
              <TableRow key={listStokBibit.indexOf(value)}>
                <TableCell className="w-[50px]">
                  {listStokBibit.indexOf(value) + 1}
                </TableCell>
                <TableCell className="text-left">{value.plant.name}</TableCell>
                <TableCell className="text-center">{value.jumlah}</TableCell>
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
                            handleDetail("Detail Stok Bibit", {
                              id: value.id,
                              jenisTanaman: value.plant.name,
                              jumlah: value.jumlah,
                            });
                          }}
                        >
                          <Eye className="mr-2" />
                          Detail
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
            <TableCell colSpan={9} className="text-right">
              <div className="w-full h-full flex justify-end items-center gap-5">
                <div className="relative text-center text-[#597445] text-sm font-poppins font-normal leading-[30px] break-words">
                  {listStokBibit.length} dari{" "}
                  {totalPages * listStokBibit.length} total data
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
