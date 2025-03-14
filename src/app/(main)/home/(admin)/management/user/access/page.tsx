"use client";

import Search from "@/components/ui/search";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableFooter,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import {
  Plus,
  EllipsisVertical,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Filter,
  List,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import AdminFilterModal from "@/components/ui/home/(admin)/management/user/modal/AdminFilterModal";
import ListRoleModal from "@/components/ui/home/(admin)/management/user/modal/ListRoleModal";

/**
 * AccessPage component renders a page for managing admin users.
 *
 * @component
 * @example
 * return (
 *   <AccessPage />
 * )
 *
 * @returns {JSX.Element} The rendered AccessPage component.
 */
export default function AccessPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [listUser, setListUser] = useState([
    {
      role: "Admin",
      hak_akses: ["lihat:admin", "tambah:admin"],
    },
  ]);

  const handleChange = (value: string) => {
    setSearch(value);
  };

  const handleAddAccess = (value: String) => {
    router.push("/home/management/user/access/" + value);
  };

  const handleShowRole = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="bg-white p-4 rounded-md shadow-md font-poppins">
      <div className="text-lg font-medium">Hak Akses</div>
      <div className="mt-4 flex items-center justify-between w-full gap-4">
        <div className="flex items-center w-full gap-4">
          <div className="w-full">
            <Search value={search} onChange={handleChange} />
          </div>
        </div>
        <button
          onClick={() => handleAddAccess("Tambah")}
          className="bg-primary-500 flex text-white px-5 py-2 text-nowrap rounded-full"
        >
          <Plus className="mr-2" />
          Tambah Role
        </button>
      </div>
      <Table className="mt-4 overflow-hidden">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px] bg-gray-200">No</TableHead>
            <TableHead className="bg-gray-200 text-center">Role</TableHead>
            <TableHead className="bg-gray-200 text-center">Hak Akses</TableHead>
            <TableHead className="text-right bg-gray-200"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {listUser.map((value) => (
            <TableRow key={listUser.indexOf(value)}>
              <TableCell className="w-[50px]">
                {listUser.indexOf(value) + 1}
              </TableCell>
              <TableCell className="font-medium text-center">
                {value.role}
              </TableCell>
              <TableCell className="text-center">
                <span
                  onClick={handleShowRole}
                  className="cursor-pointer text-primary-500 underline"
                >
                  Hak Akses
                </span>
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
                        onClick={() => handleAddAccess("Detail")}
                      >
                        Detail
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={() => handleAddAccess("Edit")}
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

      {/* Component Modal */}
      <ListRoleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
