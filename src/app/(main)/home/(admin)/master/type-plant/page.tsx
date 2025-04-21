"use client";
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
import { useEffect, useState } from "react";
import TypePlantModal from "@/components/ui/home/(admin)/master/modal/TypePlantModal";
import { useAuth } from "@/hooks/useAuth";
import { JenisTanaman } from "@/types/master/jenisTanaman";
import { deleteJenisTanamanData, fetchJenisTanamanData, postJenisTanamanData, putJenisTanamanData, searchJenisTanamanData } from "@/lib/master/jenisTanamanFetching";
import { Bounce, toast } from "react-toastify";
import ConfirmasiDeleteModal from "@/components/ui/home/(admin)/master/modal/ConfirmasiDeleteModal";

/**
 * TypePlantPage component renders the main page for managing plant types.
 * It includes a search bar, a table displaying the list of plant types, and a modal for adding/editing plant types.
 *
 * @component
 * @returns {JSX.Element} The rendered component.
 *
 * @example
 * // Usage example:
 * <TypePlantPage />
 *
 * @remarks
 * This component uses several custom UI components such as Search, Table, DropdownMenu, and TypePlantModal.
 * It also utilizes the useRouter hook from Next.js for navigation.
 *
 * @function
 * @name TypePlantPage
 *
 * @property {string} search - The search term for filtering plant types.
 * @property {boolean} isModalOpen - State to control the visibility of the modal.
 * @property {string} status - The status indicating the current action (e.g., "Tambah", "Detail", "Edit").
 * @property {Array<{name: string}>} listPlant - The list of plant types to be displayed in the table.
 *
 * @param {string} value - The value from the search input.
 * @param {string} slug - The status slug indicating the action to be performed in the modal.
 *
 * @function
 * @name handleChange
 * @description Updates the search state with the given value.
 * @param {string} value - The new search value.
 *
 * @function
 * @name handleOpenModal
 * @description Opens the modal and sets the status with the given slug.
 * @param {string} slug - The status slug indicating the action to be performed in the modal.
 */
export default function TypePlantPage() {
  const { getToken } = useAuth();
  const token = getToken();
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState("");
  const [listPlant, setListPlant] = useState<JenisTanaman[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [items, setItems] = useState<JenisTanaman[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
  });
  const [messageError, setMessageError] = useState<Record<keyof typeof formData, string | null>>({
    name: null
  });
  const clearMessageError = () => {
    setMessageError({
      name: null
    });
  };
  const clearFormData = () => {
    setFormData({
      name: ""
    });
  };
  const [isLoading, setIsLoading] = useState(false);
  const [id, setId] = useState<number | null>(null);

  const handleChange = (value: string) => {
    setSearch(value);
    if (value.length > 0) {
      handleSearchPoktan(value);
    } else {
      fetchPage(1);
    }
  };

  const handleOpenModal = (slug: string, id?: number) => {
    setIsModalOpen(true);
    setId(id ?? 0);
    setFormData({
      name: id ? listPlant.find((item) => item.id === id)?.name ?? "" : "",
    });
    setStatus(slug);
  };

  const fetchPage = async (page: number) => {
    if (loading) return;

    setLoading(true);
    const data = await fetchJenisTanamanData(page, String(token));
    setItems(data.items);
    setListPlant(data.items);
    setTotalPages(data.total_pages);
    setLoading(false);
  };

  const handleSearchPoktan = async (search: string) => {
    setLoading(true);
    const data = await searchJenisTanamanData(search, String(token));
    setItems(data.items);
    setListPlant(data.items);
    setTotalPages(data.total_pages);
    setLoading(false);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    clearMessageError();
    if (status === "Tambah") {
      await postJenisTanamanData(formData.name, String(token))
        .then((response) => {
          if (!response.ok) {
            response.json().then((errorData) => {
              setMessageError(errorData.data);
            });
            throw new Error('Failed to save data');
          }
          return response.json();
        })
        .then((data) => {
          toast.success('Data berhasil disimpan', {
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
          console.error('Error:', error);
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
      await putJenisTanamanData(Number(id), formData.name, String(token))
        .then((response) => {
          if (!response.ok) {
            response.json().then((errorData) => {
              setMessageError(errorData.data);
            });
            throw new Error('Failed to save data');
          }
          return response.json();
        })
        .then((data) => {
          toast.success('Data berhasil diupdate', {
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
          console.error('Error:', error);
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
  }

  const handleDeleteModal = (id: number) => {
    setIsOpen(true);
    setId(id);
  };

  const handleDelete = async () => {
    setIsLoading(true);
    await deleteJenisTanamanData(Number(id), String(token))
      .then((response) => {
        if (!response.ok) {
          response.json().then((errorData) => {
            setMessageError(errorData.data);
          });
          throw new Error('Failed to delete data');
        }
        return response.json();
      })
      .then((data) => {
        setIsOpen(false);
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
        setIsModalOpen(false);
        fetchPage(1);
        clearFormData();
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.error('Error:', error);
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
      })
  }
  useEffect(() => {
    fetchPage(currentPage);
  }, [currentPage]);

  return (
    <div className="bg-white p-4 rounded-md shadow-md font-poppins">
      <div className="text-lg font-medium mb-4">Jenis Tanaman</div>
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
            <TableHead className="w-[50px] bg-gray-200">No</TableHead>
            <TableHead className="bg-gray-200 text-center">
              Jenis Tanaman
            </TableHead>
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
                <TableCell className="text-right">
                  <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                </TableCell>
              </TableRow>
            ))
          ) : listPlant.length === 0 ? (
            <TableRow>
              <TableCell colSpan={3} className="text-center">
                Data kosong
              </TableCell>
            </TableRow>
          ) : (
            listPlant.map((value) => (
              <TableRow key={listPlant.indexOf(value)}>
                <TableCell className="w-[50px]">
                  {listPlant.indexOf(value) + 1}
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

      {/* Component */}
      <TypePlantModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
        onChange={(value) => {
          setFormData({ ...formData, name: value });
          clearMessageError();
        }
        }
        onSubmit={handleSubmit}
        value={formData.name}
        errorMessage={messageError.name ?? ''}
        isLoading={isLoading}
        status={status}
      />
      <ConfirmasiDeleteModal isOpen={isOpen} onBatal={() => { setIsOpen(false) }} onClose={() => { setIsOpen(false); }} onSimpan={handleDelete} status={'Jenis Tanaman'} />
    </div>
  );
}
