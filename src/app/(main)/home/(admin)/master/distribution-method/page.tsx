"use client";
import TypePlantModal from "@/components/ui/home/(admin)/master/modal/TypePlantModal";
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
import React, { useCallback, useEffect, useState } from "react";
import DistributionMethodModal from "@/components/ui/home/(admin)/master/modal/DistributionMethodModal";
import { useAuth } from "@/hooks/useAuth";
import { DistribusiMetode } from "@/types/master/distribusiMetode";
import {
  deleteDistribusiData,
  fetchDistribusiData,
  postDistribusiData,
  putDistribusiData,
  searchDistribusiData,
} from "@/lib/master/distribusiMetodeFetching";
import { Bounce, toast } from "react-toastify";
import ConfirmasiDeleteModal from "@/components/ui/home/(admin)/master/modal/ConfirmasiDeleteModal";

export default function DistributionMethodPage() {
  const { getToken } = useAuth();
  const token = getToken();
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState("");

  const [listDistribusi, setListDistribusi] = useState<DistribusiMetode[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [items, setItems] = useState<DistribusiMetode[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
  });
  const [messageError, setMessageError] = useState<
    Record<keyof typeof formData, string | null>
  >({
    name: null,
  });

  const clearMessageError = () => {
    setMessageError({
      name: null,
    });
  };
  const clearFormData = () => {
    setFormData({
      name: "",
    });
  };
  const [isLoading, setIsLoading] = useState(false);
  const [id, setId] = useState<number | null>(null);

  const handleChange = (value: string) => {
    setSearch(value);
    if (value.length > 0) {
      handleSearchStatusKepemilikan(value);
    } else {
      fetchPage(1);
    }
  };

  const handleOpenModal = (slug: string, id?: number) => {
    setIsModalOpen(true);
    setId(id ?? 0);
    setFormData({
      name: id
        ? (listDistribusi.find((item) => item.id === id)?.name ?? "")
        : "",
    });
    setStatus(slug);
  };

  const fetchPage = useCallback(
    async (page: number) => {
      if (loading) return;

      setLoading(true);
      const data = await fetchDistribusiData(page, String(token));
      setItems(data.items);
      setListDistribusi(data.items);
      setTotalPages(data.total_pages);
      setLoading(false);
    },
    [loading, token]
  );

  const handleSearchStatusKepemilikan = async (search: string) => {
    setLoading(true);
    const data = await searchDistribusiData(search, String(token));
    setItems(data.items);
    setListDistribusi(data.items);
    setTotalPages(data.total_pages);
    setLoading(false);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    clearMessageError();
    if (status === "Tambah") {
      await postDistribusiData(formData.name, String(token))
        .then((response) => {
          if (!response.ok) {
            response.json().then((errorData) => {
              setMessageError(errorData.data);
            });
            throw new Error("Failed to save data");
          }
          return response.json();
        })
        .then((data) => {
          toast.success("Data berhasil disimpan", {
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
          setIsModalOpen(false);
          fetchPage(1);
          clearFormData();
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
          console.error("Error:", error);
          toast.error(`${error}`, {
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
        });
    } else if (status === "Edit") {
      await putDistribusiData(Number(id), formData.name, String(token))
        .then((response) => {
          if (!response.ok) {
            response.json().then((errorData) => {
              setMessageError(errorData.data);
            });
            throw new Error("Failed to save data");
          }
          return response.json();
        })
        .then((data) => {
          toast.success("Data berhasil diupdate", {
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
          setIsModalOpen(false);
          fetchPage(1);
          clearFormData();
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
          console.error("Error:", error);
          toast.error(`${error}`, {
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
        });
    }
  };

  const handleDeleteModal = (id: number) => {
    setIsOpen(true);
    setId(id);
  };

  const handleDelete = async () => {
    setIsLoading(true);
    await deleteDistribusiData(Number(id), String(token))
      .then((response) => {
        if (!response.ok) {
          response.json().then((errorData) => {
            setMessageError(errorData.data);
          });
          throw new Error("Failed to delete data");
        }
        return response.json();
      })
      .then((data) => {
        setIsOpen(false);
        toast.success("Data berhasil dihapus", {
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
        setIsModalOpen(false);
        fetchPage(1);
        clearFormData();
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.error("Error:", error);
        toast.error(`${error}`, {
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
      });
  };

  useEffect(() => {
    fetchPage(currentPage);
  }, [currentPage]);

  return (
    <div className="bg-white p-4 rounded-md shadow-md font-poppins">
      <div className="text-lg font-medium mb-4">Metode Distribusi</div>
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
              Metode Distribusi
            </TableHead>
            <TableHead className="text-right bg-gray-200"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            Array.from({ length: 5 }).map((_, index) => (
              <TableRow key={index}>
                <TableCell className="w-[50px] text-center">
                  <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                </TableCell>
                <TableCell className="font-medium text-center">
                  <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                </TableCell>
              </TableRow>
            ))
          ) : listDistribusi.length === 0 ? (
            <TableRow>
              <TableCell colSpan={3} className="text-center">
                Data Kosong
              </TableCell>
            </TableRow>
          ) : (
            listDistribusi.map((value) => (
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
                          onClick={() => handleOpenModal("Detail", value.id)}
                        >
                          Detail
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="cursor-pointer"
                          onClick={() => handleOpenModal("Edit", value.id)}
                        >
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="cursor-pointer"
                          onClick={() => handleDeleteModal(value.id)}
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

      {/* Component */}
      <DistributionMethodModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
        onChange={(value) => {
          setFormData({ ...formData, name: value });
          clearMessageError();
        }}
        onSubmit={handleSubmit}
        value={formData.name}
        errorMessage={messageError.name ?? ""}
        isLoading={isLoading}
        status={status}
      />
      <ConfirmasiDeleteModal
        isOpen={isOpen}
        onBatal={() => {
          setIsOpen(false);
        }}
        onClose={() => {
          setIsOpen(false);
        }}
        onSimpan={handleDelete}
        status={"Metode DIstribusi"}
      />
    </div>
  );
}
