"use client";

import FormSelect from "@/components/ui/base/form-select";
import DatePicker from "@/components/ui/date-picker";
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
  EllipsisVertical,
  Eye,
  CalendarRange,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Printer,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Search from "@/components/ui/search";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { LaporanPengajuan } from "@/types/report/laporanPengajuan";
import { fetchLaporanPengajuanData } from "@/lib/report/laporanPengajuanFetching";
import { fetchJenisTanamanData } from "@/lib/master/jenisTanamanFetching";
import { JenisTanaman } from "@/types/master/jenisTanaman";
import { Poktan } from "@/types/master/poktan";
import { fetchPoktanData } from "@/lib/master/poktanFecthing";
import { DateRange } from "react-day-picker";
import { addDays } from "date-fns/addDays";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { set } from "date-fns";

/**
 * SubmissionReportPage component renders a page for displaying and managing plant submission reports.
 *
 * @component
 * @example
 * return (
 *   <SubmissionReportPage />
 * )
 *
 * @returns {JSX.Element} The rendered component.
 *
 * @remarks
 * This component includes a header section with filters for date, plant type, farmer group, and status.
 * It also includes a body section with a search bar, print button, and a table displaying the submission reports.
 *
 * @function
 * @name SubmissionReportPage
 *
 * @property {Object} formData - The state object containing form data.
 * @property {Date} formData.tanggal - The selected date.
 * @property {string} formData.jenis_tanaman - The selected plant type.
 * @property {string} formData.poktan - The selected farmer group.
 * @property {string} formData.status - The selected status.
 *
 * @property {Array<Object>} listLaporan - The state array containing the list of reports.
 * @property {string} listLaporan[].tanggal - The date of the report.
 * @property {string} listLaporan[].name - The name of the person who submitted the report.
 * @property {string} listLaporan[].poktan - The farmer group associated with the report.
 * @property {string} listLaporan[].jenis_tanaman - The type of plant in the report.
 * @property {string} listLaporan[].luas_lahan - The land area in the report.
 * @property {string} listLaporan[].jumlah_bibit - The number of seeds in the report.
 * @property {string} listLaporan[].status - The status of the report.
 *
 * @property {Function} handleChange - Function to handle changes in the search input.
 * @param {string} value - The new search value.
 *
 * @property {Function} handleDetail - Function to handle the detail view of a report.
 * @param {string} value - The identifier for the detail view.
 */
export default function SubmissionReportPage() {
  const { getToken } = useAuth();
  const token = getToken();
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [dateParent, setDateParent] = useState<DateRange>({
    from: new Date(),
    to: addDays(new Date(), 7),
  });
  const [formData, setFormData] = useState({
    tanamanId: 0,
    poktanId: 0,
    status: "",
  });
  const [listLaporan, setListLaporan] = useState<LaporanPengajuan[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [items, setItems] = useState<LaporanPengajuan[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [listPlant, setListPlant] = useState<JenisTanaman[]>([]);
  const [listPoktan, setListPoktan] = useState<Poktan[]>([]);
  const handleChange = (value: string) => {
    setSearch(value);
  };
  const handleDetail = (value: String) => {
    // router.push("/home/distribution/" + value);
  };

  const fetchPage = useCallback(
    async (
      page: number,
      startDate: string,
      endDate: string,
      tanamanId: string
    ) => {
      await fetchDataJenisTanaman();
      if (loading) return;
      setListLaporan([]);
      setLoading(true);
      const formatDate = (dateStr: string) => {
        if (!dateStr) return "";
        const date = new Date(dateStr);
        const yyyy = date.getFullYear();
        const mm = String(date.getMonth() + 1).padStart(2, "0");
        const dd = String(date.getDate()).padStart(2, "0");
        return `${yyyy}-${mm}-${dd}`;
      };

      const data = await fetchLaporanPengajuanData(
        page,
        {
          startDate: formatDate(startDate),
          endDate: formatDate(endDate),
          tanamanId: Number(tanamanId) === 0 ? "" : tanamanId,
        },
        String(token)
      );
      if (data) {
        setItems(data.items);
        setListLaporan(data.items);
        setTotalPages(data.current_page);
      }
      setLoading(false);
    },
    [loading, token]
  );

  const fetchDataJenisTanaman = useCallback(async () => {
    const data = await fetchJenisTanamanData(1, String(token));
    setListPlant(data.items);
    const dataPoktan = await fetchPoktanData(1, String(token));
    setListPoktan(dataPoktan.items);
  }, [token]);

  useEffect(() => {
    fetchPage(currentPage, "", "", "");
  }, [currentPage]);

  return (
    <div>
      {/* header */}
      <div className="bg-white shadow-md rounded-lg p-4 mb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col items-start gap-2 w-full">
            <span className="text-sm font-medium text-gray-700">Tanggal</span>
            <DatePickerWithRange date={dateParent} onSelect={setDateParent} />
          </div>
          <FormSelect
            label="Jenis Tanaman"
            value={listPlant.map((value) => value.name)}
            selected={
              listPlant.find((plant) => plant.id === formData.tanamanId)
                ?.name || ""
            }
            onChange={(value: string) => {
              const selectedPlant = listPlant.find(
                (plant) => plant.name === value
              );
              if (selectedPlant) {
                setFormData({
                  ...formData,
                  tanamanId: selectedPlant.id,
                });
              }
            }}
          />
          <FormSelect
            label="Nama Poktan"
            value={listPoktan.map((value) => value.name)}
            selected={
              listPoktan.find((plant) => plant.id === formData.poktanId)
                ?.name || ""
            }
            onChange={(value: string) => {
              const selectedPlant = listPoktan.find(
                (plant) => plant.name === value
              );
              if (selectedPlant) {
                setFormData({
                  ...formData,
                  poktanId: selectedPlant.id,
                });
              }
            }}
          />
          <FormSelect
            label="Status"
            value={["Disetejui", "Ditolak", "Direvisi", "Diajukan"]}
            selected={formData.status}
          />
        </div>
        <div className="flex items-center justify-end mt-4">
          <div className="flex gap-4">
            <button
              onClick={() => {
                // clearFormData();
                // router.back();
                fetchPage(1, "", "", "");
                setDateParent({
                  from: new Date(),
                  to: addDays(new Date(), 7),
                });
                setFormData({
                  tanamanId: 0,
                  poktanId: 0,
                  status: "",
                });
                setSearch("");
              }}
              className="border border-primary-default text-primary-default rounded-full py-2 px-10 text-md"
            >
              Reset
            </button>
            <button
              className="bg-primary-500 text-white rounded-full py-2 px-10 text-md"
              onClick={() => {
                fetchPage(
                  1,
                  dateParent.from ? dateParent.from.toString() : "",
                  dateParent.to ? dateParent.to.toString() : "",
                  formData.tanamanId.toString()
                );
              }}
            >
              Cari
            </button>
          </div>
        </div>
      </div>
      {/* end header */}

      {/* body */}
      <div className="bg-white shadow-md rounded-lg p-4 mb-4">
        <div className="flex items-center justify-center font-medium">
          Laporan Pengajuan Tanaman
        </div>
        <div className="flex items-center justify-between mt-4 mb-4 gap-4">
          <Search value={search} onChange={handleChange} />
          <Button className="border border-gray-300 flex text-blue-950 px-5 py-2 text-nowrap rounded-full">
            <Printer className="mr-2" />
            Print
          </Button>
        </div>
        <Table className="mt-4 overflow-hidden">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px] bg-gray-200">No</TableHead>
              <TableHead className="w-[100px] bg-gray-200">Tanggal</TableHead>
              <TableHead className="bg-gray-200">Nama</TableHead>
              <TableHead className="bg-gray-200 text-center">Poktan</TableHead>
              <TableHead className="text-center bg-gray-200">
                Jenis Tanaman
              </TableHead>
              <TableHead className="text-center bg-gray-200">
                Luas Lahan
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
                  <TableCell className="w-[50px]">
                    <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
                  </TableCell>
                  <TableCell>
                    <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
                  </TableCell>
                  <TableCell className="text-right">
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
            ) : listLaporan.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center">
                  Tidak ada data tersedia
                </TableCell>
              </TableRow>
            ) : (
              listLaporan.map((value) => (
                <TableRow key={listLaporan.indexOf(value)}>
                  <>
                    <TableCell className="w-[50px]">
                      {listLaporan.indexOf(value) + 1}
                    </TableCell>
                    <TableCell>
                      {value.createdAt
                        ? new Date(value.createdAt).toLocaleDateString(
                            "id-ID",
                            {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                            }
                          )
                        : ""}
                    </TableCell>
                    <TableCell>{value.namaLengkap ?? "-"}</TableCell>
                    <TableCell className="text-center">
                      {value.namaKetuaPoktan ?? "-"}
                    </TableCell>
                    <TableCell className="text-center">
                      {value.tanaman?.name ?? "-"}
                    </TableCell>
                    <TableCell className="text-center">
                      {value.luasLahan ?? "-"}
                    </TableCell>
                    <TableCell className="text-center">
                      {value.jumlahTanaman ?? "-"}
                    </TableCell>
                    <TableCell
                      className={`text-center ${
                        value.status.includes("Disetujui")
                          ? "text-green-500"
                          : value.status.includes("Direvisi")
                            ? "text-warning-600"
                            : value.status.includes("Ditolak")
                              ? "text-error-500"
                              : "text-black"
                      }`}
                    >
                      {value.status}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end">
                        {/* <DropdownMenu>
                        <DropdownMenuTrigger className="border-none bg-transparent active:border-none focus:border-none">
                          <EllipsisVertical className="cursor-pointer" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-white shadow-md rounded-md absolute left-[-110px]">
                          <DropdownMenuItem
                            className="cursor-pointer"
                            onClick={() => {
                              handleDetail("Detail");
                            }}
                          >
                            <Eye className="mr-2" />
                            Lihat
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="cursor-pointer"
                            onClick={() => {
                              handleDetail("Jadwalkan");
                            }}
                          >
                            <CalendarRange className="mr-2" />
                            Jadwalkan Distribusi
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu> */}
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
      </div>
      {/* end body */}
    </div>
  );
}
