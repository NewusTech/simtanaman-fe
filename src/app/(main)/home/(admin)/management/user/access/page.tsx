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
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import AdminFilterModal from "@/components/ui/home/(admin)/management/user/modal/AdminFilterModal";
import ListRoleModal from "@/components/ui/home/(admin)/management/user/modal/ListRoleModal";
import { useAuth } from "@/hooks/useAuth";
import { HakAkses } from "@/types/management-user/hakAkses";
import {
  deleteHakAksesData,
  fetchHakAksesData,
  searchHakAksesData,
} from "@/lib/management-user/hakAksesFetching";
import { Bounce, toast } from "react-toastify";
import ConfirmasiDeleteModal from "@/components/ui/home/(admin)/master/modal/ConfirmasiDeleteModal";

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
  const { getToken } = useAuth();
  const token = getToken();
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [listUser, setListUser] = useState<HakAkses[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [items, setItems] = useState<HakAkses[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState("");
  const [id, setId] = useState(0);

  const handleShowRole = () => {
    setIsModalOpen(true);
  };

  const handleChange = (value: string) => {
    setSearch(value);
    if (value.length > 0) {
      handleSearchPoktan(value);
    } else {
      fetchPage(1);
    }
  };

  const handleAddAccess = (slug: string, params?: Object) => {
    router.push(
      "/home/management/user/access/" +
        slug +
        (params ? `?${new URLSearchParams(params as any)}` : "")
    );
  };

  const handleSearchPoktan = async (search: string) => {
    setLoading(true);
    const data = await searchHakAksesData(search, String(token));
    setItems(data.items);
    setListUser(data.items);
    setTotalPages(data.total_pages);
    setLoading(false);
  };

  const handleDeleteAcces = async () => {
      setLoading(true);
      setIsOpen(false);
      await deleteHakAksesData(id, String(token)).then((response) => {
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
        console.error("Error deleting Poktan:", error);
      }
      );
  
      setLoading(false);
    }

  const handleOpenModal = (id: number) => {
    setIsOpen(true);
    setStatus("Hak Akses");
    setId(id);
  };

  const fetchPage = useCallback(
    async (page: number) => {
      if (loading) return;

      setLoading(true);
      const data = await fetchHakAksesData(page, String(token));
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
          {loading ? (
            Array.from({ length: 5 }).map((_, index) => (
              <TableRow key={index}>
                <TableCell className="w-[50px]">
                  <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                </TableCell>
                <TableCell className="font-medium text-center">
                  <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                </TableCell>
                <TableCell className="text-center">
                  <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                </TableCell>
              </TableRow>
            ))
          ) : listUser.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                Data kosong
              </TableCell>
            </TableRow>
          ) : (
            listUser.map((value) => (
              <TableRow key={listUser.indexOf(value)}>
                <TableCell className="w-[50px]">
                  {listUser.indexOf(value) + 1}
                </TableCell>
                <TableCell className="font-medium text-center">
                  {value.name}
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
                          onClick={() =>
                            handleAddAccess("Detail", { id: value.id })
                          }
                        >
                          Detail
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="cursor-pointer"
                          onClick={() =>
                            handleAddAccess("Edit", { id: value.id })
                          }
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
            ))
          )}
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

      {/* Component Modal */}
      <ListRoleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <ConfirmasiDeleteModal isOpen={isOpen} onBatal={() => { setIsOpen(false) }} onClose={() => { setIsOpen(false); }} onSimpan={handleDeleteAcces} status={status} />
    </div>
  );
}
