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
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import AdminFilterModal from "@/components/ui/home/(admin)/management/user/modal/AdminFilterModal";
import { useAuth } from "@/hooks/useAuth";
import { Pengguna } from "@/types/management-user/pengguna";
import { deletePenggunaData, fetchPenggunaData } from "@/lib/management-user/penggunaFetching";
import ConfirmasiDeleteModal from "@/components/ui/home/(admin)/master/modal/ConfirmasiDeleteModal";
import { Bounce, toast } from "react-toastify";

/**
 * AdminPage component renders a page for managing admin users.
 *
 * @component
 * @example
 * return (
 *   <AdminPage />
 * )
 *
 * @returns {JSX.Element} The rendered AdminPage component.
 */
export default function DistributorPage() {
  const { getToken } = useAuth();
  const token = getToken();
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [listUser, setListUser] = useState<Pengguna[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [items, setItems] = useState<Pengguna[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState("");
  const [id, setId] = useState(0);

  const handleChange = (value: string) => {
    setSearch(value);
  };

  const handleOpenModal = (id: number) => {
    setIsOpen(true);
    setStatus("Pengguna Distributor");
    setId(id);
  };

  const handleAddAdmin = (slug: string, params?: Object) => {
    router.push("/home/management/user/distributor/" + slug + (params ? `?${new URLSearchParams(params as any)}` : ""));
  };

  const handleDelete = async () => {
    setLoading(true);
    setIsOpen(false);
    await deletePenggunaData(id, String(token)).then((response) => {
      if (response.ok) {
        fetchPage(1);
        toast.success('Data berhasil dihapus', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      } else {
        toast.error('Data gagal dihapus', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
    }).catch((error) => {
      console.error("Error deleting :", error);
    }
    );

    setLoading(false);
  }

  const handleFilter = () => {
    setIsModalOpen(true);
  };

  const fetchPage = useCallback(
    async (page: number) => {
      if (loading) return;

      setLoading(true);
      const data = await fetchPenggunaData(page, String(token), "distributor");
      setItems(data.items);
      setListUser(data.items);
      setTotalPages(data.total_pages);
      setLoading(false);
    },
    [loading, token]
  );

  useEffect(() => {
    fetchPage(currentPage);
  }, [currentPage]);

  return (
    <div className="bg-white p-4 rounded-md shadow-md font-poppins">
      <div className="text-lg font-medium">Distributor</div>
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
        <button
          onClick={() => handleAddAdmin("Tambah")}
          className="bg-primary-500 flex text-white px-5 py-2 text-nowrap rounded-full"
        >
          <Plus className="mr-2" />
          Tambah Distributor
        </button>
      </div>
      <Table className="mt-4 overflow-hidden">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px] bg-gray-200">No</TableHead>
            <TableHead className="w-[20rem] bg-gray-200">Nama</TableHead>
            <TableHead className="bg-gray-200">Email</TableHead>
            <TableHead className="bg-gray-200">Role</TableHead>
            <TableHead className="text-right bg-gray-200">
              Jenis Kelamin
            </TableHead>
            <TableHead className="text-right bg-gray-200">Status</TableHead>
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
              </TableRow>
            ))
          ) : listUser.length === 0 ? (
            <TableRow>
              <TableCell colSpan={3} className="text-center">
                Tidak ada data tersedia
              </TableCell>
            </TableRow>
          ) : (listUser.map((value) => (
            <TableRow key={listUser.indexOf(value)}>
              <TableCell className="w-[50px]">
                {listUser.indexOf(value) + 1}
              </TableCell>
              <TableCell className="font-medium">{value.name}</TableCell>
              <TableCell>{value.email}</TableCell>
              <TableCell>{value.role?.name}</TableCell>
              <TableCell className="text-right">{value.jenisKelamin}</TableCell>
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
                        onClick={() => handleAddAdmin("Detail", { id: value.id })}
                      >
                        Detail
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={() => handleAddAdmin("Edit", { id: value.id })}
                      >
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={() => handleOpenModal(value.id)}
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </TableCell>
            </TableRow>
          )))
          }
          
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

      {/* Component Modal */}
      <AdminFilterModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <ConfirmasiDeleteModal isOpen={isOpen} onBatal={() => { setIsOpen(false) }} onClose={() => { setIsOpen(false); }} onSimpan={handleDelete} status={status} />
    </div>
  );
}
