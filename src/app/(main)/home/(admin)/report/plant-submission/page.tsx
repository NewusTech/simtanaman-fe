"use client";
import FormSelect from "@/components/ui/base/form-select";
import DatePicker from "@/components/ui/date-picker";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { EllipsisVertical, Eye, CalendarRange, ChevronDown, ChevronLeft, ChevronRight, Printer } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Search from "@/components/ui/search";
import { Button } from "@/components/ui/button";

/**
 * SubmissionPlantReportPage component renders a page for managing plant submission reports.
 * 
 * @component
 * 
 * @returns {JSX.Element} The rendered component.
 * 
 * @example
 * <SubmissionPlantReportPage />
 * 
 * @remarks
 * This component includes a header section with filters for date, plant type, and status,
 * and a body section displaying a table of plant submission reports with pagination and actions.
 * 
 * @function
 * @name SubmissionPlantReportPage
 * 
 * @description
 * The component uses several UI components such as DatePicker, FormSelect, Table, and DropdownMenu
 * to provide a user interface for filtering and viewing plant submission reports. It also includes
 * a search input and a print button.
 * 
 * @property {Object} formData - The state object containing the form data for filters.
 * @property {Date} formData.tanggal - The selected date for filtering reports.
 * @property {string} formData.jenis_tanaman - The selected plant type for filtering reports.
 * @property {string} formData.status - The selected status for filtering reports.
 * 
 * @property {Array} listLaporan - The state array containing the list of plant submission reports.
 * @property {string} listLaporan[].tanggal - The date of the report.
 * @property {string} listLaporan[].distributor - The name of the distributor.
 * @property {string} listLaporan[].jenis_tanaman - The type of plant submitted.
 * @property {string} listLaporan[].jumlah_bibit - The quantity of seeds submitted.
 * @property {string} listLaporan[].status - The status of the submission.
 * 
 * @property {string} search - The state string for the search input value.
 * 
 * @method handleChange
 * @description Updates the search state with the input value.
 * @param {string} value - The new search input value.
 * 
 * @method handleDetail
 * @description Handles the action when a detail view or scheduling is triggered.
 * @param {string} value - The action type (e.g., "Detail" or "Jadwalkan").
 */
export default function SubmissionPlantReportPage() {
    const router = useRouter();
    const [search, setSearch] = useState("");
    const [formData, setFormData] = useState({
        tanggal: new Date(),
        jenis_tanaman: "",
        status: ""
    });
    const [listLaporan, setListLaporan] = useState([
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
        {
            tanggal: "17/02/2025",
            distributor: "Dila",
            jenis_tanaman: "Padi",
            jumlah_bibit: "500 bibit Padi",
            status: "Diajukan",
        },

    ]);

    const handleChange = (value: string) => {
        setSearch(value);
    };
    const handleDetail = (value: String) => {
        // router.push("/home/distribution/" + value);
    };

    return (
        <div>
            {/* header */}
            <div className="bg-white shadow-md rounded-lg p-4 mb-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <DatePicker
                        label="Tanggal"
                        date={formData.tanggal}
                        onSelect={(date: Date) => setFormData({ ...formData, tanggal: date })}
                    />
                    <FormSelect
                        label="Jenis Tanaman"
                        value={["Laki-laki", "Perempuan"]}
                        selected={formData.jenis_tanaman}
                    />
                </div>
                <FormSelect
                    label="Status"
                    value={["Disetejui", "Ditolak", "Direvisi", "Diajukan"]}
                    selected={formData.status}
                />
            </div>
            {/* end header */}

            {/* body */}
            <div className="bg-white shadow-md rounded-lg p-4 mb-4">
                <div className="flex items-center justify-center font-medium">Laporan  Pengajuan Stok Tanaman</div>
                <div className="flex items-center justify-between mt-4 mb-4 gap-4">
                    <Search value={search} onChange={handleChange} />
                    <Button
                        className="border border-gray-300 flex text-blue-950 px-5 py-2 text-nowrap rounded-full"
                    >
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
                        {listLaporan.map((value) => (
                            <TableRow key={listLaporan.indexOf(value)}>
                                <TableCell className="w-[50px]">
                                    {listLaporan.indexOf(value) + 1}
                                </TableCell>
                                <TableCell className="font-medium">{value.tanggal}</TableCell>
                                <TableCell>{value.distributor}</TableCell>
                                <TableCell className="text-center">
                                    {value.jenis_tanaman}
                                </TableCell>
                                <TableCell className="text-center">
                                    {value.jumlah_bibit}
                                </TableCell>
                                <TableCell
                                    className={`text-center ${value.status === "Disetujui" ? "text-green-500" : value.status === "Direvisi" ? "text-warning-600" : value.status === "Ditolak" ? "text-error-500" : "text-black"}`}
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
            {/* end body */}

        </div>
    );
}