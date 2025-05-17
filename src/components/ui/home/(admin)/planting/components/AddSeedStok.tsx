"use client";

import FormInput from "@/components/ui/base/form-input";
import FormSelect from "@/components/ui/base/form-select";
import { Button } from "@/components/ui/button";
import DatePicker from "@/components/ui/date-picker";
import { useAuth } from "@/hooks/useAuth";
import { fetchJenisTanamanData } from "@/lib/master/jenisTanamanFetching";
import { postSeedStockData } from "@/lib/planting/seedStockFetching";
import { JenisTanaman } from "@/types/master/jenisTanaman";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Bounce, toast } from "react-toastify";

export default function AddSeedStok() {
  const { getToken } = useAuth();
  const token = getToken();
  const router = useRouter();
  const [formData, setFormData] = useState({
    tanggalPenambahan: new Date(),
    plantId: 0,
    kategori: "",
    jumlah: 0,
  });
  const [isLoading, setIsLoading] = useState(false);

  const [listPlant, setListPlant] = useState<JenisTanaman[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [messageError, setMessageError] = useState<
    Record<keyof typeof formData, string | null>
  >({
    tanggalPenambahan: null,
    plantId: null,
    kategori: null,
    jumlah: null,
  });

  const clearMessageError = () => {
    setMessageError({
      tanggalPenambahan: null,
      plantId: null,
      kategori: null,
      jumlah: null,
    });
  };

  const clearFormData = () => {
    setFormData({
      tanggalPenambahan: new Date(),
      plantId: 0,
      kategori: "",
      jumlah: 0,
    });
  };

  const fetchDataJenisTanaman = useCallback(
    async (page: number) => {
      const data = await fetchJenisTanamanData(page, String(token));
      setListPlant(data.items);
    },
    [token]
  );

  const handleSimpan = async () => {
    setIsLoading(true);
    clearMessageError();

    await postSeedStockData(formData, String(token))
      .then((response) => {
        if (!response.ok) {
        //   response.json().then((errorData) => {
        //     console.log("Error data:", errorData.data);
            
        //     setMessageError(errorData.data);
        //   });

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

        clearFormData();
        setIsLoading(false);
        router.push("/home/planting/seed-stock");
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
    fetchDataJenisTanaman(currentPage);
  }, [fetchDataJenisTanaman]);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex flex-col">
      <div className="flex items-center justify-between gap-2 mb-4">
        <DatePicker
          label="Tanggal Penambahan"
          date={formData.tanggalPenambahan}
          onSelect={(date: Date) => setFormData({ ...formData, tanggalPenambahan: date })}
            errorMessage={messageError.tanggalPenambahan}
            required
        />
        <FormSelect
          label="Jenis Tanaman"
          value={listPlant.map((value) => value.name)}
          selected={
            listPlant.find((plant) => plant.id === formData.plantId)
              ?.name || ""
          }
          onChange={(value: string) => {
            const selectedPlant = listPlant.find(
              (plant) => plant.name === value
            );
            if (selectedPlant) {
              setFormData({
                ...formData,
                plantId: selectedPlant.id,
              });
            }
          }}
          errorMessage={messageError.plantId}
          required
        />
      </div>
      <div className="flex items-center justify-between gap-2 mb-4">
        <FormSelect
          label="Kategori Stok"
          value={["Subsidi", "Nonsubsidi"]}
          selected={formData.kategori}
          onChange={(value: string) =>
            setFormData({ ...formData, kategori: value })
          }
          errorMessage={messageError.kategori}
        />
        <FormInput
          label="Stok Tanaman"
          placeholder="Masukan Status Stok Tanaman"
          type="number"
          value={String(formData.jumlah)}
          onChange={(value: string) =>
            setFormData({ ...formData, jumlah: Number(value) })
          }
          errorMessage={messageError.jumlah}
          required
        />
      </div>
      <div className="flex justify-end items-center gap-2">
        <Button
          onClick={() => {
            router.back();
            clearFormData();
            clearMessageError();
          }}
          className="border border-primary-default rounded-full text-primary-default px-5"
        >
          Batal
        </Button>
        <Button
          onClick={handleSimpan}
          className="bg-primary-default rounded-full text-white px-5"
        >
          {isLoading ? "Loading..." : "Tambah"}
        </Button>
      </div>
    </div>
  );
}
