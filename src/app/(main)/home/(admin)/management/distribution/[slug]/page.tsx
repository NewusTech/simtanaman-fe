"use client";

import FormInput from "@/components/ui/base/form-input";
import FormLabel from "@/components/ui/base/form-label";
import FormSelect from "@/components/ui/base/form-select";
import FormTextArea from "@/components/ui/base/form-text-area";
import ImageUploader from "@/components/ui/base/image-upload";
import DatePicker from "@/components/ui/date-picker";
import { useAuth } from "@/hooks/useAuth";
import { fetchHakAksesData } from "@/lib/management-user/hakAksesFetching";
import {
  addPenggunaData,
  fetchPenggunaById,
  fetchPenggunaData,
  updatePenggunaData,
} from "@/lib/management-user/penggunaFetching";
import { HakAkses } from "@/types/management-user/hakAkses";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Bounce, toast } from "react-toastify";

export default function AddDistributorPage({ params }: { params: { slug: string } }) {
  const { getToken } = useAuth();
  const token = getToken();
  const router = useRouter();
  const pathname = usePathname();
  const [formData, setFormData] = useState({
    name: "",
    date: new Date(),
    email: "",
    nip: "",
    nik: "",
    jenis_kelamin: "",
    alamat: "",
    no_hp: "",
    foto: "",
    password: "",
    roleId: 0,
  });
  const [messageError, setMessageError] = useState<
    Record<keyof typeof formData, string | null>
  >({
    name: null,
    date: null,
    email: null,
    nip: null,
    nik: null,
    jenis_kelamin: null,
    alamat: null,
    no_hp: null,
    foto: null,
    password: null,
    roleId: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [listUser, setListUser] = useState<HakAkses[]>([]);

  const clearFormData = () => {
    setFormData({
      name: "",
      date: new Date(),
      email: "",
      nip: "",
      nik: "",
      jenis_kelamin: "",
      alamat: "",
      no_hp: "",
      foto: "",
      password: "",
      roleId: 0,
    });
  };

  const clearMessageError = () => {
    setMessageError({
      name: null,
      date: null,
      email: null,
      nip: null,
      nik: null,
      jenis_kelamin: null,
      alamat: null,
      no_hp: null,
      foto: null,
      password: null,
      roleId: null,
    });
  };

  const handleSimpan = async () => {
    setIsLoading(true);
    clearMessageError();

    if (params.slug.includes("Tambah")) {
      var data = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        roleId: formData.roleId,
      };
      await addPenggunaData(data, String(token))
        .then((response) => {
          if (!response.ok) {
            response.json().then((errorData) => {
              console.log("masuk error");
              console.log(errorData);

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

          clearFormData();
          setIsLoading(false);
          router.push("/home/management/distribution");
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
    } else {
      var data = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        roleId: formData.roleId,
      };
      const id = Number(new URLSearchParams(window.location.search).get("id"));
      await updatePenggunaData(id, data, String(token))
        .then((response) => {
          if (!response.ok) {
            response.json().then((errorData) => {
              console.log("masuk error");
              console.log(errorData);

              setMessageError(errorData.data);
            });

            throw new Error("Failed to save data");
          }
          return response.json();
        })
        .then((data) => {
          toast.success("Data berhasil update", {
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
          router.push("/home/management/distribution");
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

  const fetchDataUser = useCallback(
    async (page: number) => {
      if (token) {
        const data = await fetchHakAksesData(page, token);
        setListUser(data.items);
      }
    },
    [token]
  );

  useEffect(() => {
    if (params.slug.includes("Edit") || params.slug.includes("Detail")) {
      const id = Number(new URLSearchParams(window.location.search).get("id"));
      fetchPenggunaById(id, String(token))
        .then((data) => {
          setFormData({
            ...formData,
            name: data.name,
            email: data.email,
            password: data.password,
            roleId: data.roleId,
          });
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
    fetchDataUser(currentPage);
  }, [currentPage]);

  return (
    <div className="bg-white p-4 rounded-md shadow-md">
      <div className="text-lg font-medium">
        {(decodeURIComponent(pathname.split("/").pop() || "")).replace(/%20/g, " ")}
      </div>
      {(!pathname.split("/").pop()?.includes("Detail") && (
        <div>
          <div className="flex flex-col md:flex-row justify-between items-start mt-4 w-full gap-4 mb-4">
            <div className="flex flex-col items-center w-full gap-4">
              <FormInput
                label="Nama Lengkap"
                placeholder="Masukan Nama Lengkap"
                value={formData.name}
                onChange={(value: string) =>
                  setFormData({ ...formData, name: value })
                }
                errorMessage={messageError.name}
                required
              />
              <DatePicker
                label="Tanggal Lahir"
                date={formData.date}
                onSelect={(date: Date) => setFormData({ ...formData, date })}
                errorMessage={messageError.date}
              />
              <FormInput
                label="NIP"
                placeholder="Masukan NIP"
                value={formData.nip}
                onChange={(value: string) =>
                  setFormData({ ...formData, nip: value })
                }
                errorMessage={messageError.nip}
                required
              />
              <FormInput
                label="Nomor Telepon"
                placeholder="Masukan Nomor Telepon"
                value={formData.no_hp}
                onChange={(value: string) =>
                  setFormData({ ...formData, no_hp: value })
                }
                errorMessage={messageError.no_hp}
                required
              />
            </div>
            <div className="flex flex-col items-center w-full gap-4">
              <FormInput
                label="NIK"
                placeholder="Masukan NIK"
                value={formData.nik}
                onChange={(value: string) =>
                  setFormData({ ...formData, nik: value })
                }
                errorMessage={messageError.nik}
                required
              />
              <FormSelect
                label="Jenis Kelamin"
                value={["Laki-laki", "Perempuan"]}
                selected={formData.jenis_kelamin}
                onChange={(value: string) =>
                  setFormData({ ...formData, jenis_kelamin: value })
                }
                errorMessage={messageError.jenis_kelamin}
                required
              />
              <FormInput
                label="Email"
                placeholder="Masukan Email"
                value={formData.email}
                onChange={(value: string) =>
                  setFormData({ ...formData, email: value })
                }
                errorMessage={messageError.email}
                required
              />
              <FormInput
                label="Password"
                placeholder="Masukan Password"
                value={formData.password}
                onChange={(value: string) =>
                  setFormData({ ...formData, password: value })
                }
                errorMessage={messageError.password}
                required
                type="password"
              />
            </div>
          </div>
          <FormSelect
            label="Role"
            value={listUser.map((item) => item.name)}
            selected={String(formData.roleId)}
            onChange={(value: string) => {
              const selectedRole = listUser.find((item) => item.name === value);
              if (selectedRole) {
                setFormData({ ...formData, roleId: selectedRole.id });
              } else {
                setFormData({ ...formData, roleId: 0 });
              }
            }}
            errorMessage={messageError.roleId}
            required
          />
          <div className="mt-4" />
          <FormTextArea
            label="Alamat"
            placeholder="Masukan Alamat"
            value={formData.alamat}
            onChange={(value: string) =>
              setFormData({ ...formData, alamat: value })
            }
            errorMessage={messageError.alamat}
            required
          />
        </div>
      )) || (
        <div>
          <div className="flex flex-col md:flex-row justify-between items-start mt-4 w-full gap-4 mb-4">
            <div className="flex flex-col items-center w-full gap-4">
              <FormLabel
                label="Nama Lengkap"
                placeholder="Masukan Nama Lengkap"
                value={formData.name}
                required
              />
              <FormLabel
                label="Tanggal Lahir"
                placeholder="Masukan Tanggal Lahir"
                value={formData.date.toLocaleDateString("id-ID", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                })}
              />
              <FormLabel
                label="NIP"
                placeholder="Masukan NIP"
                value={formData.nip}
                required
              />
              <FormLabel
                label="Nomor Telepon"
                placeholder="Masukan Nomor Telepon"
                value={formData.no_hp}
                required
              />
            </div>
            <div className="flex flex-col items-center w-full gap-4">
              <FormLabel
                label="NIK"
                placeholder="Masukan NIK"
                value={formData.nik}
                required
              />
              <FormLabel
                label="Jenis Kelamin"
                value={formData.jenis_kelamin}
                required
              />
              <FormLabel
                label="Email"
                placeholder="Masukan Email"
                value={formData.email}
                required
              />
              <FormLabel
                label="Password"
                placeholder="Masukan Password"
                value={formData.password}
                required
              />
            </div>
          </div>
          <FormLabel
            label="Role"
            value={
              listUser.find((item) => item.id === formData.roleId)?.name || ""
            }
            required
          />
          <div className="mt-4" />
          <FormLabel
            label="Alamat"
            placeholder="Masukan Alamat"
            value={formData.alamat}
            required
          />
        </div>
      )}
      <div className="mt-4">
        <ImageUploader
          label="Foto"
          image={formData.foto}
          setImage={(image: string | ArrayBuffer | null) =>
            setFormData({ ...formData, foto: image as string })
          }
        />
      </div>
      {(!pathname.split("/").pop()?.includes("Detail") && (
        <div className="flex justify-end mt-4">
          <div className="flex gap-4">
            <button
              onClick={() => {
                clearFormData();
                router.back();
              }}
              className="border border-primary-default text-primary-default rounded-full py-2 px-4"
            >
              Batal
            </button>
            <button
              onClick={() => handleSimpan()}
              className="bg-primary-500 text-white rounded-full py-2 px-4"
            >
              {isLoading ? "Loading..." : "Simpan"}
            </button>
          </div>
        </div>
      )) || (
        <div className="flex justify-end mt-4">
          <button
            onClick={() => {
              clearFormData();
              router.back();
            }}
            className="border border-primary-default text-primary-default rounded-full py-2 px-4"
          >
            Kembali
          </button>
        </div>
      )}
    </div>
  );
}
