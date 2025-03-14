"use client";
import DistributionMethodModal from "@/components/ui/home/(admin)/master/modal/DistributionMethodModal";
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
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  EllipsisVertical,
  Plus,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import OwnershipStatusModal from "@/components/ui/home/(admin)/master/modal/OwnershipStatusModal";

/**
 * The `LandOwnershipStatusPage` component renders a page that displays a list of distribution methods
 * with functionalities to search, add, edit, and delete distribution methods.
 *
 * @component
 * @example
 * return (
 *   <LandOwnershipStatusPage />
 * )
 *
 * @returns {JSX.Element} The rendered component.
 *
 * @remarks
 * This component uses several custom UI components such as `Search`, `Table`, `DropdownMenu`, and `DistributionMethodModal`.
 * It also utilizes the `useRouter` hook from Next.js for navigation and `useState` hook from React for state management.
 *
 * @function
 * @name LandOwnershipStatusPage
 *
 * @description
 * The component maintains the following states:
 * - `search`: A string representing the search query.
 * - `isModalOpen`: A boolean indicating whether the modal is open or not.
 * - `status`: A string representing the current status of the modal (e.g., "Tambah", "Detail", "Edit").
 * - `listDistribusi`: An array of objects representing the list of distribution methods.
 *
 * The component provides the following functionalities:
 * - `handleChange`: Updates the `search` state with the new value.
 * - `handleOpenModal`: Opens the modal and sets the `status` state with the provided slug.
 *
 * The component renders a search input, a button to add new distribution methods, a table displaying the list of distribution methods,
 * and a modal for adding, viewing details, and editing distribution methods.
 */
export default function LandOwnershipStatusPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [status, setStatus] = useState("");

  const [listDistribusi, setListDistribusi] = useState([
    {
      name: "Padi",
    },
  ]);

  const handleChange = (value: string) => {
    setSearch(value);
  };

  const handleOpenModal = (slug: string) => {
    setIsModalOpen(true);
    setStatus(slug);
  };

  return (
    <div className="bg-white p-4 rounded-md shadow-md font-poppins">
      <div className="text-lg font-medium mb-4">Status Kepemilikan Lahaan</div>
      <div className="flex justify-between items-center gap-4 mb-4">
        <div className="w-full">
          <Search value={search} onChange={handleChange} />
        </div>
        <div>
          <button
            onClick={() => handleOpenModal("Tambah")}
            className="bg-primary-500 flex text-white px-5 py-2 text-nowrap rounded-full"
          >
            <Plus className="mr-2" />
            Tambah
          </button>
        </div>
      </div>
      <Table className="mt-4 overflow-hidden">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px] bg-gray-200 text-center">
              No
            </TableHead>
            <TableHead className="bg-gray-200 text-center">
              Status Kepemilikan Lahan
            </TableHead>
            <TableHead className="text-right bg-gray-200"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {listDistribusi.map((value) => (
            <TableRow key={listDistribusi.indexOf(value)}>
              <TableCell className="w-[50px] text-center">
                {listDistribusi.indexOf(value) + 1}
              </TableCell>
              <TableCell className="font-medium text-center">
                {value.name}
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
                        onClick={() => handleOpenModal("Detail")}
                      >
                        Detail
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={() => handleOpenModal("Edit")}
                      >
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={() => {}}
                      >
                        Delete
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

      {/* Component */}
      <OwnershipStatusModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
        status={status}
      />
    </div>
  );
}
