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

  const handleAddFarmer = () => {
    router.push("/home/management/user/farmer/add");
  };

  return (
    <div className="bg-white p-4 rounded-md shadow-md font-poppins">
      <div className="text-lg font-medium">Petani</div>
      <div className="mt-4 flex items-center justify-between w-full gap-4">
        <div className="flex items-center w-full">
          <Search value={search} onChange={handleChange} />
        </div>
        <button
          onClick={handleAddFarmer}
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
                    const updatedList = listUser.map((user) =>
                      user.nama === value.nama
                        ? { ...user, status: checked }
                        : user
                    );
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
                      <DropdownMenuItem className="cursor-pointer">
                        Detail
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer">
                        Edit
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
