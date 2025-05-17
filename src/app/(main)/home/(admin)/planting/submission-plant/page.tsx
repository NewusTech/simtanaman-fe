"use client";
import { useRouter } from "next/navigation";
import { usePermission } from '@/hooks/usePermission';
import { useState } from "react";
import { addDays } from "date-fns";
import { DateRange } from "react-day-picker";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { Button } from "@/components/ui/button";
import { CalendarRange, ChevronDown, ChevronLeft, ChevronRight, EllipsisVertical, Eye, Filter, Plus, Printer } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import SubmissionFilterModal from "@/components/ui/home/(admin)/submission/modal/SubmissionFilterModal";
import { TableHeader, TableRow, TableHead, TableBody, TableCell, TableFooter, Table } from "@/components/ui/table";
import Search from "@/components/ui/search";

export default function SubmissionPlantPage() {
    const router = useRouter();
    const [search, setSearch] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
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
            name: "Ditolak",
            select: false,
        },
    ]);

    const [listPengajuan, setListPengajuan] = useState([
        {
            tanggal: "17/02/2025",
            name: "Dila",
            jenis_tanaman: "Padi",
            jumlah_bibit: "500 bibit Padi",
            status: "Diajukan",
        },
        {
            tanggal: "17/02/2025",
            name: "Dila",
            jenis_tanaman: "Padi",
            jumlah_bibit: "500 bibit Padi",
            status: "Disetujui",
        },
        {
            tanggal: "17/02/2025",
            name: "Dila",
            jenis_tanaman: "Padi",
            jumlah_bibit: "500 bibit Padi",
            status: "Ditolak",
        },
    ]);

    const handleChange = (value: string) => {
        setSearch(value);
    };
    const handleDetail = (value: String) => {
        router.push("/home/planting/submission-plant/" + value);
    };
    const handleFilter = () => {
        setIsModalOpen(true);
    };
    return (
        <div className="bg-white p-4 rounded-lg shadow-md">
            {/* header */}
            <div className="flex justify-between items-center">
                <div className="text-lg font-semibold">Pengajuan Tanaman</div>
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
                            className={`rounded-full p-2 px-5 transition-all duration-300 ease-in-out ${tab.select ? "bg-primary-default text-white" : ""
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
                    <Button className="bg-primary-default flex items-center gap-1 rounded-full text-white">
                        <Plus className="mr-2" />
                        Tambah
                    </Button>
                </div>
            </div>
            {/* end of header */}

            {/* body */}
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
                            <TableCell>{value.name}</TableCell>
                            <TableCell className="text-center">
                                {value.jenis_tanaman}
                            </TableCell>
                            <TableCell className="text-center">
                                {value.jumlah_bibit}
                            </TableCell>
                            <TableCell
                                className={`text-center ${value.status === "Disetujui" ? "text-green-500" : value.status === "Diajukan" ? "text-black" : "text-danger-600"}`}
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