"use client";
import Search from "@/components/ui/search";
import { Switch } from "@/components/ui/switch";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableFooter,
  Table,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical, Plus } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

/**
 * FarmerPage component renders a page that displays a list of farmers with their details.
 * It includes a search bar, a button to add a new farmer, and a table to display the list of farmers.
 * Each row in the table includes the farmer's name, group, email, gender, district, and status.
 * The status can be toggled using a switch, and there are options to view details or edit the farmer's information.
 *
 * @component
 * @example
 * return (
 *   <FarmerPage />
 * )
 *
 * @returns {JSX.Element} The FarmerPage component.
 */
export default function FarmerPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [listUser, setListUser] = useState([
    {
      nama: "Robi",
      poktan: "Poktan Abadi",
      email: "robi@email.com",
      jenisKelamin: "Laki-Laki",
      kecamatan: "Kec. abadi",
      status: false,
    },
    {
      nama: "Robi",
      poktan: "Poktan Abadi",
      email: "robi@email.com",
      jenisKelamin: "Laki-Laki",
      kecamatan: "Kec. abadi",
      status: false,
    },
    {
      nama: "Robi",
      poktan: "Poktan Abadi",
      email: "robi@email.com",
      jenisKelamin: "Laki-Laki",
      kecamatan: "Kec. abadi",
      status: false,
    },
    {
      nama: "Robi",
      poktan: "Poktan Abadi",
      email: "robi@email.com",
      jenisKelamin: "Laki-Laki",
      kecamatan: "Kec. abadi",
      status: false,
    },
  ]);

  const handleChange = (value: string) => {
    setSearch(value);
  };

  const handleAddFarmer = (value: String) => {
    router.push("/home/management/user/farmer/" + value);
  };

  return (
    <div className="bg-white p-4 rounded-md shadow-md font-poppins">
      <div className="text-lg font-medium">Petani</div>
      <div className="mt-4 flex items-center justify-between w-full gap-4">
        <div className="flex items-center w-full">
          <Search value={search} onChange={handleChange} />
        </div>
        <button
          onClick={() => handleAddFarmer("Tambah")}
          className="bg-primary-500 flex text-white px-5 py-2 text-nowrap rounded-full"
        >
          <Plus className="mr-2" />
          Tambah Petani
        </button>
      </div>
      <Table className="mt-4 overflow-hidden">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px] bg-gray-200">No</TableHead>
            <TableHead className="w-[100px] bg-gray-200">Nama</TableHead>
            <TableHead className="bg-gray-200">Poktan</TableHead>
            <TableHead className="bg-gray-200">Email</TableHead>
            <TableHead className="text-right bg-gray-200">
              Jenis Kelamin
            </TableHead>
            <TableHead className="text-right bg-gray-200">Kecamatan</TableHead>
            <TableHead className="text-right bg-gray-200">Status</TableHead>
            <TableHead className="text-right bg-gray-200"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {listUser.map((value) => (
            <TableRow key={value.nama}>
              <TableCell className="w-[50px]">
                {listUser.indexOf(value) + 1}
              </TableCell>
              <TableCell className="font-medium">{value.nama}</TableCell>
              <TableCell>{value.poktan}</TableCell>
              <TableCell>{value.email}</TableCell>
              <TableCell className="text-right">{value.jenisKelamin}</TableCell>
              <TableCell className="text-right">{value.kecamatan}</TableCell>
              <TableCell className="text-right">
                <Switch
                  id={`status-switch-${listUser.indexOf(value)}`}
                  className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-red-500"
                  checked={value.status}
                  onCheckedChange={(checked) => {
                    const updatedList = [...listUser];
                    updatedList[listUser.indexOf(value)].status = checked;
                    setListUser(updatedList);
                  }}
                >
                  <span className="data-[state=checked]:bg-white data-[state=unchecked]:bg-white"></span>
                </Switch>
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
                        onClick={() => handleAddFarmer("Detail")}
                      >
                        Detail
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={() => handleAddFarmer("Edit")}
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
                      <div className="w-2 h-1 left-1 top-1.5 absolute border border-[#597445]"></div>
                    </div>
                  </div>
                  <div className="w-[235px] flex justify-between items-start">
                    <div className="w-10 py-2 bg-[#FCFBFB] rounded-md border border-[#BDBDC2] flex flex-col justify-center items-center">
                      <div className="w-4 h-4 relative">
                        <div className="w-1 h-2 left-1.5 top-1 absolute border border-[#597445]"></div>
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
                        <div className="w-1 h-2 left-1.5 top-1 absolute border border-[#597445]"></div>
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
