"use client";

import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import FormLabel from "@/components/ui/base/form-label";
import SubmissionStatusModal from "@/components/ui/home/(admin)/submission/modal/SubmissionStatusModal";
import { useCallback, useEffect, useState } from "react";
import { CheckCircle, TriangleAlert } from "lucide-react";
import FormInput from "@/components/ui/base/form-input";
import { usePermission } from "@/store/usePermission";
import FormSelect from "@/components/ui/base/form-select";
import { Poktan } from "@/types/master/poktan";
import { fetchPoktanData } from "@/lib/master/poktanFecthing";
import { useAuth } from "@/hooks/useAuth";
import FormTextArea from "@/components/ui/base/form-text-area";
import { fetchJenisTanamanData } from "@/lib/master/jenisTanamanFetching";
import { JenisTanaman } from "@/types/master/jenisTanaman";
import { StatusKepemilikan } from "@/types/master/statusKepemilikan";
import { fetchStatusKepemilikanData } from "@/lib/master/statusKepemilikanFetching";
import FileInput from "@/components/ui/base/file-input";
import dynamic from "next/dynamic";
import {
  addPengajuanData,
  editPengajuanData,
  updateStatusPengajuanData,
} from "@/lib/pengajuan/pengajuanFetching";
import { Bounce, toast } from "react-toastify";
import { set } from "date-fns";
import { Penanaman } from "@/types/master/metodePenanaman";
import { fetchMetodePenanamanData } from "@/lib/master/metodePenanamanFetching";
import { se } from "date-fns/locale";
import { fetchDistributionDataById } from "@/lib/distribution/distributionFetching";
const Map = dynamic(() => import("@/components/ui/base/map"), { ssr: false });

/**
 * ComponentPage is a React functional component that renders a submission page with various statuses.
 * It includes a header section that changes based on the submission status and a body section displaying user data.
 *
 * @component
 * @example
 * return (
 *   <ComponentPage />
 * )
 *
 * @returns {JSX.Element} The rendered component.
 *
 * @remarks
 * The component uses the `useState` hook to manage the modal state and submission status.
 * It also uses the `useRouter` and `usePathname` hooks from Next.js for navigation purposes.
 *
 * @function handleClickStatus
 * @param {string} status - The status to set when a button is clicked.
 *
 * @remarks
 * The `handleClickStatus` function sets the modal state to open and updates the status.
 *
 * @state {boolean} isOpenModal - State to manage the visibility of the modal.
 * @state {string} status - State to store the current status.
 * @state {string} changeStatus - State to store the status change.
 *
 * @remarks
 * The component conditionally renders different sections based on the `changeStatus` state.
 * It includes buttons to change the status to "setujui", "direvisi", or "ditolak".
 *
 * @remarks
 * The component also includes a `SubmissionStatusModal` component to handle status changes.
 */
export default function ComponentPage({
  params,
}: {
  params: { slug: string };
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { getToken } = useAuth();
  const token = getToken();

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [status, setStatus] = useState("");
  const [changeStatus, setChangeStatus] = useState("diajukan");
  const role = usePermission((state: { role: any }) => state.role);
  const [currentPage, setCurrentPage] = useState(1);
  const [listKetuaPoktan, setListKetuaPoktan] = useState<Poktan[]>([]);
  const [listPlant, setListPlant] = useState<JenisTanaman[]>([]);
  const [listStatus, setlistStatus] = useState<StatusKepemilikan[]>([]);
  const [listMetode, setListMetode] = useState<Penanaman[]>([]);
  const [isLoadingSearch, setIsLoadingSearch] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [messageError, setMessageError] = useState<
    Record<keyof typeof formData, string | null>
  >({
    namaLengkap: null,
    nik: null,
    noTelepon: null,
    email: null,
    noKartuTani: null,
    noRegistrasiPoktan: null,
    namaKetuaPoktan: null,
    Provinsi: null,
    Kabupaten: null,
    Kecamatan: null,
    DesaKelurahan: null,
    alamat: null,
    luasLahan: null,
    jumlahTanamanHektar: null,
    masaTanam: null,
    tahunMusimTanam: null,
    jumlahTanaman: null,
    alasan: null,
    ktp: null,
    kartuTani: null,
    tanamanId: null,
    tanamanKebutuhanId: null,
    statusLahanId: null,
    poktanId: null,
    methodId: null,
    lokasi: null,
    latitude: null,
    longitude: null,
  });

  const clearMessageError = () => {
    setMessageError({
      namaLengkap: null,
      nik: null,
      noTelepon: null,
      email: null,
      noKartuTani: null,
      noRegistrasiPoktan: null,
      namaKetuaPoktan: null,
      Provinsi: null,
      Kabupaten: null,
      Kecamatan: null,
      DesaKelurahan: null,
      alamat: null,
      luasLahan: null,
      jumlahTanamanHektar: null,
      masaTanam: null,
      tahunMusimTanam: null,
      jumlahTanaman: null,
      alasan: null,
      ktp: null,
      kartuTani: null,
      tanamanId: null,
      tanamanKebutuhanId: null,
      statusLahanId: null,
      poktanId: null,
      methodId: null,
      lokasi: null,
      latitude: null,
      longitude: null,
    });
  };
  const [formData, setFormData] = useState({
    namaLengkap: "",
    nik: "",
    noTelepon: "",
    email: "",
    noKartuTani: "",
    noRegistrasiPoktan: "",
    namaKetuaPoktan: "",
    Provinsi: "",
    Kabupaten: "",
    Kecamatan: "",
    DesaKelurahan: "",
    alamat: "",
    luasLahan: 0.0,
    jumlahTanamanHektar: 0,
    masaTanam: "",
    tahunMusimTanam: 0,
    jumlahTanaman: 0,
    alasan: "",
    ktp: "" as File | string,
    kartuTani: "" as File | string,
    tanamanId: 0,
    tanamanKebutuhanId: 0,
    statusLahanId: 0,
    poktanId: 0,
    methodId: 0,
    lokasi: "",
    latitude: -6.9175, // Default latitude (e.g., Jakarta)
    longitude: 107.6191, // Default longitude (e.g., Jakarta)
  });

  const handleClickStatus = (status: string) => {
    setIsOpenModal(true);
    setStatus(status);
  };
  const clearFormData = () => {
    setFormData({
      namaLengkap: "",
      nik: "",
      noTelepon: "",
      email: "",
      noKartuTani: "",
      noRegistrasiPoktan: "",
      namaKetuaPoktan: "",
      Provinsi: "",
      Kabupaten: "",
      Kecamatan: "",
      DesaKelurahan: "",
      alamat: "",
      luasLahan: 0.0,
      jumlahTanamanHektar: 0,
      masaTanam: "",
      tahunMusimTanam: 0,
      jumlahTanaman: 0,
      alasan: "",
      ktp: "" as File | string,
      kartuTani: "" as File | string,
      tanamanId: 0,
      tanamanKebutuhanId: 0,
      statusLahanId: 0,
      poktanId: 0,
      methodId: 0,
      lokasi: "",
      latitude: -6.9175, // Default latitude (e.g., Jakarta)
      longitude: 107.6191, // Default longitude (e.g., Jakarta)
    });
  };
  const handleUpdateStatus = async (status: string, alasan: string) => {
    setIsLoading(true);
    const id = String(new URLSearchParams(window.location.search).get("id"));
    const payload = {
      status: status + " " +role,
      alasan: alasan,
    };
    await updateStatusPengajuanData(payload, id, String(token))
      .then((response) => {
        if (!response.ok) {
          response.json().then((errorData) => {
            setMessageError(errorData.data);
          });

          throw new Error("Failed to update status");
        }
        return response.json();
      })
      .then((data) => {
        toast.success("Status berhasil diubah", {
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
        router.push("/home/submission");
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
  const handleSimpan = async () => {
    if (params.slug === "Tambah") {
      setIsLoading(true);
      const currentYear = new Date().getFullYear();
      const ktpFileName =
        formData.ktp instanceof File ? formData.ktp.name : formData.ktp;
      const kartuTaniFileName =
        formData.kartuTani instanceof File
          ? formData.kartuTani.name
          : formData.kartuTani;

      const payload = {
        namaLengkap: formData.namaLengkap,
        nik: formData.nik,
        noTelepon: formData.noTelepon,
        email: formData.email,
        noKartuTani: formData.noKartuTani,
        noRegistrasiPoktan: formData.noRegistrasiPoktan,
        namaKetuaPoktan: formData.namaKetuaPoktan,
        Provinsi: formData.Provinsi,
        Kabupaten: formData.Kabupaten,
        Kecamatan: formData.Kecamatan,
        DesaKelurahan: formData.DesaKelurahan,
        alamat: formData.alamat,
        luasLahan: formData.luasLahan,
        jumlahTanamanHektar: formData.jumlahTanamanHektar,
        masaTanam: formData.masaTanam,
        tahunMusimTanam: currentYear,
        jumlahTanaman: formData.jumlahTanaman,
        alasan: formData.alasan,
        ktp: ktpFileName,
        kartuTani: kartuTaniFileName,
        tanamanId: formData.tanamanId,
        tanamanKebutuhanId: formData.tanamanId,
        statusLahanId: formData.statusLahanId,
        poktanId: formData.poktanId,
        methodId: formData.methodId,
        latitude: Number(formData.latitude),
        longitude: Number(formData.longitude),
      };
      await addPengajuanData(payload, String(token))
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

          clearFormData();
          setIsLoading(false);
          router.push("/home/submission");
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
    } else if (params.slug === "Edit") {
      const id = Number(new URLSearchParams(window.location.search).get("id"));
      setIsLoading(true);
      const currentYear = new Date().getFullYear();
      const ktpFileName =
        formData.ktp instanceof File ? formData.ktp.name : formData.ktp;
      const kartuTaniFileName =
        formData.kartuTani instanceof File
          ? formData.kartuTani.name
          : formData.kartuTani;

      const payload = {
        namaLengkap: formData.namaLengkap,
        nik: formData.nik,
        noTelepon: formData.noTelepon,
        email: formData.email,
        noKartuTani: formData.noKartuTani,
        noRegistrasiPoktan: formData.noRegistrasiPoktan,
        namaKetuaPoktan: formData.namaKetuaPoktan,
        Provinsi: formData.Provinsi,
        Kabupaten: formData.Kabupaten,
        Kecamatan: formData.Kecamatan,
        DesaKelurahan: formData.DesaKelurahan,
        alamat: formData.alamat,
        luasLahan: formData.luasLahan,
        jumlahTanamanHektar: formData.jumlahTanamanHektar,
        masaTanam: formData.masaTanam,
        tahunMusimTanam: currentYear,
        jumlahTanaman: formData.jumlahTanaman,
        alasan: formData.alasan,
        ktp: ktpFileName,
        kartuTani: kartuTaniFileName,
        tanamanId: formData.tanamanId,
        tanamanKebutuhanId: formData.tanamanId,
        statusLahanId: formData.statusLahanId,
        poktanId: formData.poktanId,
        methodId: formData.methodId,
        latitude: Number(formData.latitude),
        longitude: Number(formData.longitude),
        status: 'Diajukan Kembali'
      };

      await editPengajuanData(payload, String(id), String(token))
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
          toast.success("Data berhasil diUbah", {
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
          router.push("/home/submission");
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

  const fetchDataPoktan = useCallback(
    async (page: number) => {
      if (token) {
        const data = await fetchPoktanData(page, token);
        setListKetuaPoktan(data.items);
      }
    },
    [token]
  );

  const fetchDataJenisTanaman = useCallback(
    async (page: number) => {
      const data = await fetchJenisTanamanData(page, String(token));
      setListPlant(data.items);
      const dataStatus = await fetchStatusKepemilikanData(page, String(token));
      setlistStatus(dataStatus.items);
      const metode = await fetchMetodePenanamanData(page, String(token));
      setListMetode(metode.items);
    },
    [token]
  );

  const fetchDataDetail = useCallback(async () => {
    const id = Number(new URLSearchParams(window.location.search).get("id"));
    const data = await fetchDistributionDataById(id, String(token));
    setFormData({
      namaLengkap: data.namaLengkap ?? "",
      nik: data.nik,
      noTelepon: data.noTelepon,
      email: data.email,
      noKartuTani: data.noKartuTani ?? "",
      noRegistrasiPoktan: data.noRegistrasiPoktan,
      namaKetuaPoktan: data.namaKetuaPoktan ?? "",
      Provinsi: data.Provinsi,
      Kabupaten: data.Kabupaten,
      Kecamatan: data.Kecamatan,
      DesaKelurahan: data.DesaKelurahan,
      alamat: data.alamat,
      luasLahan: data.luasLahan,
      jumlahTanamanHektar: data.jumlahTanamanHektar,
      masaTanam: data.masaTanam,
      tahunMusimTanam: data.tahunMusimTanam,
      jumlahTanaman: data.jumlahTanaman,
      alasan: data.alasan,
      ktp: data.ktp ?? ("" as File | string),
      kartuTani: data.kartuTani ?? ("" as File | string),
      tanamanId: data.tanamanId,
      tanamanKebutuhanId: Number(data.tanamanKebutuhanId ?? 0),
      statusLahanId: data.statusLahanId,
      poktanId: data.poktanId,
      methodId: data.methodId,
      lokasi: "",
      latitude: Number(data.latitude ?? -6.9175), // Default latitude (e.g., Jakarta)
      longitude: Number(data.longitude ?? 107.6191), // Default longitude (e.g., Jakarta)
    });
    setChangeStatus(data.status);
  }, [token]);

  useEffect(() => {
    fetchDataPoktan(currentPage);
    fetchDataJenisTanaman(currentPage);
    if (params.slug == "Detail" || params.slug == "Edit") {
      fetchDataDetail();
    }
  }, [currentPage, fetchDataPoktan, fetchDataJenisTanaman]);

  return (
    <div className="bg-white p-4 rounded-md shadow-md font-poppins">
      {/* header */}
      {/* {role === "admin" && ( */}
        {
          params.slug === "Detail" &&(
            <div>
          {(changeStatus.includes('Diajukan') && role === "admin"  && (
            <div>
              <div className="flex justify-end items-center gap-4 mb-4">
                <div className="text-sm font-medium mb-4 bg-neutral-70 rounded-lg p-2 px-10">
                  Diajukan
                </div>
              </div>
              <div className="flex gap-4 justify-end items-center">
                <Button
                  onClick={() => handleClickStatus("setujui")}
                  className="bg-success-700 text-white px-8 tex-sm rounded-full"
                >
                  Setujui
                </Button>
                <Button
                  onClick={() => handleClickStatus("direvisi")}
                  className="bg-warning-500 text-white px-8 tex-sm rounded-full"
                >
                  Direvisi
                </Button>
                <Button
                  onClick={() => handleClickStatus("ditolak")}
                  className="bg-error-500 text-white px-8 tex-sm rounded-full"
                >
                  Ditolak
                </Button>
              </div>
            </div>
          )) ||
            (changeStatus.includes('Disetujui')&& (
              <div className="flex items-center gap-4 p-5 bg-success-100 rounded-lg text-success-700 font-medium mb-4">
                <CheckCircle className="h-10 w-10" />
                Disetujui Admin
              </div>
            )) ||
            (changeStatus.includes('Direvisi') && (
              
              <div className="flex flex-col gap-4 p-2 bg-warning-100 rounded-lg text-warning-500 font-medium mb-4">
                <div className="flex items-center gap-4 p-5 bg-warning-100 rounded-lg text-warning-500 font-medium">
                  <TriangleAlert className="h-10 w-10" />
                  <div className="flex flex-col gap-2">
                    <span>Perlu Revisi</span>
                    <span className="text-sm text-black">
                      Data yang anda berikan kurang tepat, silahkan perbaiki
                      data anda.
                    </span>
                  </div>
                </div>
                <div className="text-sm font-medium text-black px-5">
                  Catatan :
                </div>
                <div className="text-sm font-medium text-black px-5">
                  {formData.alasan || "Tidak Ada Catatan"}
                </div>
              </div>
            )) ||
            (changeStatus.includes('Ditolak') && (
              <div className="flex flex-col gap-4 p-2 bg-error-100 rounded-lg text-error-500 font-medium mb-4">
                <div className="flex items-center gap-4 p-5 bg-error-100 rounded-lg text-error-500 font-medium">
                  <TriangleAlert className="h-10 w-10" />
                  <div className="flex flex-col gap-2">
                    <span>Ditolak</span>
                    <span className="text-sm text-black">
                      Pengajuan anda ditolak.
                    </span>
                  </div>
                </div>
                <div className="text-sm font-medium text-black px-5">
                  Catatan :
                </div>
                <div className="text-sm font-medium text-black px-5">
                 {formData.alasan || "Tidak Ada Catatan"}
                </div>
              </div>
            ))}
        </div>
          )
        }
      {/* )} */}
      {/* end of header */}

      {/* body */}
      {params.slug === "Tambah" ||
        (params.slug === "Edit" && (
          <div>
            <span className="text-md font-semibold">Data Diri</span>
            <div className="flex flex-col md:flex-row justify-between items-start mt-4 w-full gap-4 mb-4">
              <div className="flex flex-col items-center w-full gap-4">
                <FormInput
                  label="Nama Lengkap"
                  placeholder="Masukan Nama Lengkap"
                  value={formData.namaLengkap}
                  onChange={(value: string) =>
                    setFormData({ ...formData, namaLengkap: value })
                  }
                  errorMessage={messageError?.namaLengkap ?? ""}
                  required
                />
                <FormInput
                  label="Nomor Telepon"
                  placeholder="Masukan Nomor Telepon"
                  value={formData.noTelepon}
                  onChange={(value: string) =>
                    setFormData({ ...formData, noTelepon: value })
                  }
                  errorMessage={messageError?.noTelepon}
                  required
                />
                <FormInput
                  label="Nomor Kartu Tani"
                  placeholder="Masukan Nomor Kartu Tani"
                  value={formData.noKartuTani}
                  onChange={(value: string) =>
                    setFormData({ ...formData, noKartuTani: value })
                  }
                  errorMessage={messageError?.noKartuTani}
                  required
                />
                <FormInput
                  label="Nomor Registrasi Poktan"
                  placeholder="Masukan Nomor Registrasi Poktan"
                  value={formData.noRegistrasiPoktan}
                  onChange={(value: string) =>
                    setFormData({ ...formData, noRegistrasiPoktan: value })
                  }
                  errorMessage={messageError?.noRegistrasiPoktan}
                  required
                />
                <FormSelect
                  label="Provinsi"
                  value={["Jawa Barat", "Sulawesi Selatan"]}
                  selected={formData.Provinsi}
                  onChange={(value: string) =>
                    setFormData({ ...formData, Provinsi: value })
                  }
                  errorMessage={messageError?.Provinsi}
                  required
                />
                <FormSelect
                  label="Kecamatan"
                  value={["Cicendo", "Sukasari"]}
                  selected={formData.Kecamatan}
                  onChange={(value: string) =>
                    setFormData({ ...formData, Kecamatan: value })
                  }
                  errorMessage={messageError?.Kecamatan}
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
                  errorMessage={messageError?.nik}
                  required
                />
                <FormInput
                  label="Email"
                  placeholder="Masukan Email"
                  value={formData.email}
                  onChange={(value: string) =>
                    setFormData({ ...formData, email: value })
                  }
                  errorMessage={messageError?.email}
                  required
                />
                <FormSelect
                  label="Nama Kelompok Tani (Poktan)"
                  value={listKetuaPoktan.map((poktan) => poktan.name)}
                  selected={
                    listKetuaPoktan.find(
                      (poktan) => poktan.id === formData.poktanId
                    )?.name || ""
                  }
                  onChange={(value: string) =>
                    listKetuaPoktan.find((poktan) => poktan.name === value)
                      ? setFormData({
                          ...formData,
                          poktanId:
                            listKetuaPoktan.find(
                              (poktan) => poktan.name === value
                            )?.id || 0,
                        })
                      : setFormData({ ...formData, poktanId: 0 })
                  }
                  errorMessage={messageError?.poktanId}
                  required
                />
                <FormInput
                  label="Nama Ketua Poktan"
                  placeholder="Masukan Nama Ketua Poktan"
                  value={formData.namaKetuaPoktan}
                  onChange={(value: string) =>
                    setFormData({ ...formData, namaKetuaPoktan: value })
                  }
                  errorMessage={messageError?.namaKetuaPoktan}
                  required
                />
                <FormSelect
                  label="Kabupaten"
                  value={["Bandung", "Ciamis"]}
                  selected={formData.Kabupaten}
                  onChange={(value: string) =>
                    setFormData({ ...formData, Kabupaten: value })
                  }
                  errorMessage={messageError?.Kabupaten}
                  required
                />
                <FormSelect
                  label="Desa/Kelurahan"
                  value={["Cicendo", "Sukasari"]}
                  selected={formData.DesaKelurahan}
                  onChange={(value: string) =>
                    setFormData({ ...formData, DesaKelurahan: value })
                  }
                  errorMessage={messageError?.DesaKelurahan}
                  required
                />
              </div>
            </div>
            <FormTextArea
              label="Alamat"
              value={formData.alamat}
              onChange={(value: string) =>
                setFormData({ ...formData, alamat: value })
              }
              errorMessage={messageError?.alamat}
              placeholder="Masukan Alamat"
              required
            />
            <div className="text-md font-semibold mt-10">
              Data Lahan dan Usaha Tani
            </div>
            <div className="flex flex-col md:flex-row justify-between items-start mt-4 w-full gap-4 mb-4">
              <div className="flex flex-col items-center w-full gap-4">
                <FormInput
                  label="Luas Lahan (Ha)"
                  placeholder="Masukan Luas Lahan (Ha)"
                  value={String(formData.luasLahan)}
                  onChange={(value: string) =>
                    setFormData({ ...formData, luasLahan: Number(value) })
                  }
                  errorMessage={messageError?.luasLahan}
                  required
                />
                <FormInput
                  label="Jumlah Tanaman dalam Satuan Hektar (Ha) "
                  placeholder="Masukan Jumlah Tanaman dalam Satuan Hektar (Ha) "
                  value={String(formData.jumlahTanamanHektar)}
                  onChange={(value: string) =>
                    setFormData({
                      ...formData,
                      jumlahTanamanHektar: Number(value),
                    })
                  }
                  errorMessage={messageError?.jumlahTanamanHektar}
                  required
                  type="number"
                />
                <FormInput
                  label="5000"
                  placeholder="Masukan 5000"
                  value={String(formData.jumlahTanaman)}
                  onChange={(value: string) =>
                    setFormData({ ...formData, jumlahTanaman: Number(value) })
                  }
                  errorMessage={messageError?.jumlahTanaman}
                  required
                  type="number"
                />
              </div>
              <div className="flex flex-col items-center w-full gap-4">
                <FormSelect
                  label="Jenis Tanaman"
                  value={listPlant.map((value) => value.name)}
                  selected={
                    listPlant.find((plant) => plant.id === formData.tanamanId)
                      ?.name || ""
                  }
                  onChange={(value: string) => {
                    const selectedPlant = listPlant.find(
                      (plant) => plant.name === value
                    );
                    if (selectedPlant) {
                      setFormData({
                        ...formData,
                        tanamanId: selectedPlant.id,
                      });
                    }
                  }}
                  errorMessage={messageError?.tanamanId}
                  required
                />
                <FormInput
                  label="Masa Tanam"
                  placeholder="Masukan Masa Tanam"
                  value={String(formData.masaTanam)}
                  onChange={(value: string) =>
                    setFormData({ ...formData, masaTanam: value })
                  }
                  errorMessage={messageError?.masaTanam}
                  required
                />
                <FormSelect
                  label="Status kepemilikan Lahan"
                  value={listStatus.map((value) => value.name)}
                  selected={
                    listStatus.find(
                      (plant) => plant.id === formData.statusLahanId
                    )?.name || ""
                  }
                  onChange={(value: string) => {
                    const select = listStatus.find(
                      (plant) => plant.name === value
                    );
                    if (select) {
                      setFormData({
                        ...formData,
                        statusLahanId: select.id,
                      });
                    }
                  }}
                  errorMessage={messageError?.statusLahanId}
                  required
                />
              </div>
            </div>
            <div className="text-md font-semibold mt-10">
              Data Kebutuhan Tanaman
            </div>
            <div className="flex flex-col md:flex-row justify-between items-start mt-4 w-full gap-4 mb-4">
              <div className="flex flex-col items-center w-full gap-4">
                <FormSelect
                  label="Jenis Tanaman yang Diajukan"
                  value={listPlant.map((value) => value.name)}
                  selected={
                    listPlant.find((plant) => plant.id === formData.tanamanId)
                      ?.name || ""
                  }
                  onChange={(value: string) => {
                    const selectedPlant = listPlant.find(
                      (plant) => plant.name === value
                    );
                    if (selectedPlant) {
                      setFormData({
                        ...formData,
                        tanamanId: selectedPlant.id,
                      });
                    }
                  }}
                  errorMessage={messageError?.tanamanId}
                  required
                />
                <FormSelect
                  label="Metode Penanaman Tanaman"
                  value={listMetode.map((value) => value.name)}
                  selected={
                    listMetode.find((plant) => plant.id === formData.methodId)
                      ?.name || ""
                  }
                  onChange={(value: string) => {
                    const selectedPlant = listMetode.find(
                      (plant) => plant.name === value
                    );
                    if (selectedPlant) {
                      setFormData({
                        ...formData,
                        methodId: selectedPlant.id,
                      });
                    }
                  }}
                  errorMessage={messageError?.methodId}
                  required
                />
              </div>
              <div className="flex flex-col items-center w-full gap-4">
                <FormInput
                  label="Jumlah bibit tanaman yang Diajukan (bibit)"
                  placeholder="Masukan Jumlah bibit tanaman yang Diajukan (bibit)"
                  value={String(formData.jumlahTanaman)}
                  onChange={(value: string) =>
                    setFormData({ ...formData, jumlahTanaman: Number(value) })
                  }
                  errorMessage={messageError?.jumlahTanaman}
                  required
                />
                <FormInput
                  label="Alasan Pengajuan Tanaman"
                  placeholder="Masukan Alasan Pengajuan Tanaman"
                  value={String(formData.alasan)}
                  onChange={(value: string) =>
                    setFormData({ ...formData, alasan: value })
                  }
                  errorMessage={messageError?.alasan}
                  required
                />
              </div>
            </div>
            <div className="text-md font-semibold mt-10">Upload</div>
            <div className="flex flex-col md:flex-row justify-between items-start mt-4 w-full gap-4 mb-4">
              <div className="flex flex-col items-start w-full gap-1">
                <label
                  htmlFor="ktp-file-input"
                  className="block text-sm font-medium"
                >
                  KTP (JPG/PNG/PDF)
                </label>
                <FileInput
                  file={formData.ktp}
                  onChange={(file: File | string) => {
                    setFormData({ ...formData, ktp: file });
                  }}
                />
              </div>
              <div className="flex flex-col items-center w-full gap-4">
                <div className="flex flex-col items-start w-full gap-1">
                  <label
                    htmlFor="ktp-file-input"
                    className="block text-sm font-medium"
                  >
                    Kartu Tani (JPG/PNG/PDF)
                  </label>
                  <FileInput
                    file={formData.kartuTani}
                    onChange={(file: File | string) => {
                      if (file instanceof File) {
                        setFormData({ ...formData, kartuTani: file.name });
                      }
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="text-md font-semibold mt-10">Lokasi</div>
            <div className="flex items-center w-full gap-4">
              <FormInput
                label=""
                placeholder="Cari Lokasi"
                value={formData.lokasi}
                onChange={(value: string) =>
                  setFormData({ ...formData, lokasi: value })
                }
              />
              <Button
                className="bg-primary-default text-white px-8 tex-sm rounded-full"
                onClick={async () => {
                  if (formData.lokasi.trim() !== "") {
                    setIsLoadingSearch(true);
                    await fetch(
                      `https://nominatim.openstreetmap.org/search?q=${formData.lokasi}&format=json`
                    )
                      .then((response) => response.json())
                      .then((data) => {
                        if (data.length > 0) {
                          const { lat, lon } = data[0];
                          setFormData({
                            ...formData,
                            latitude: parseFloat(lat),
                            longitude: parseFloat(lon),
                          });
                        } else {
                          console.error("Location not found");
                        }
                      })
                      .catch((error) => {
                        console.error("Error fetching location:", error);
                      });
                    setIsLoadingSearch(false);
                  } else {
                    console.error("Lokasi is empty");
                  }
                }}
              >
                {isLoadingSearch ? "Loading..." : "Cari Lokasi"}
              </Button>
            </div>
            <div className="mt-4">
              <Map
                onLocationSelect={(lat: number, lng: number) => {
                  setFormData({ ...formData, latitude: lat, longitude: lng });
                }}
                center={[formData.latitude, formData.longitude]} // Update center dynamically when latitude or longitude changes
              />
            </div>
            <div className="flex justify-between items-center mt-10 gap-4">
              <FormInput
                label="Latitude"
                placeholder="Masukan Latitude"
                value={String(formData.latitude)}
                onChange={(value: string) =>
                  setFormData({ ...formData, latitude: Number(value) })
                }
                errorMessage={messageError?.latitude}
                required
              />
              <FormInput
                label="Longitude"
                placeholder="Masukan Longitude"
                value={String(formData.longitude)}
                onChange={(value: string) =>
                  setFormData({ ...formData, longitude: Number(value) })
                }
                errorMessage={messageError?.longitude}
                required
              />
            </div>
            <div className="flex items-center gap-2 mt-10">
              <input
                type="checkbox"
                id="agreement"
                className="h-5 w-5 rounded border-gray-300 text-primary-default focus:ring-primary-default"
                required
              />
              <label htmlFor="agreement" className="text-sm text-gray-700">
                Saya menyatakan bahwa data yang diberikan benar dan siap
                diverifikasi sesuai peraturan pemerintah.
              </label>
            </div>
            <div className="flex justify-end mt-4">
              <div className="flex gap-4">
                <button
                  onClick={() => {
                    router.back();
                  }}
                  className="border border-primary-default text-primary-default rounded-full py-2 px-4"
                >
                  Batal
                </button>
                <button
                  className="bg-primary-500 text-white rounded-full py-2 px-4"
                  onClick={() => handleSimpan()}
                >
                  {isLoading ? "Loading..." : "Simpan"}
                </button>
              </div>
            </div>
          </div>
        )) ||
        (params.slug === "Detail" && (
          <div className="flex flex-col gap-4">
            <div className="text-lg font-medium">Data diri</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormLabel
                label="Nama Lengkap"
                value={formData.namaLengkap}
                required
              />
              <FormLabel label="NIK" value={formData.nik} required />
              <FormLabel
                label="Nomor Telepon"
                value={formData.noTelepon}
                required
              />
              <FormLabel label="Email" value={formData.email} />
              <FormLabel
                label="Nomor Kartu Tani (Jika Ada)"
                value={formData.noKartuTani}
              />
              <FormLabel
                label="Nama Kelompok Tani (Poktan)"
                value={formData.namaKetuaPoktan}
                required
              />
              <FormLabel
                label="Nomor Registrasi Poktan"
                value={formData.noRegistrasiPoktan}
              />
              <FormLabel
                label="Nama Ketua Poktan"
                value={formData.namaKetuaPoktan}
              />
              <FormLabel label="Provinsi" value={formData.Provinsi} required />
              <FormLabel
                label="Kabupaten"
                value={formData.Kabupaten}
                required
              />
              <FormLabel
                label="Kecamatan"
                value={formData.Kecamatan}
                required
              />
              <FormLabel
                label="Desa/Kelurahan"
                value={formData.DesaKelurahan}
                required
              />
            </div>
            <FormLabel label="Alamat" value={formData.alamat} required />
            <div className="text-lg font-medium mt-10">
              Data Lahan dan Usaha Tani
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormLabel
                label="Luas Lahan (Ha)"
                value={String(formData.luasLahan)}
                required
              />
              <FormLabel
                label="Jenis Tanaman"
                value={
                  listPlant.find((plant) => plant.id === formData.tanamanId)
                    ?.name || "-"
                }
                required
              />
              <FormLabel
                label="Jumlah Tanaman dalam Satuan Hektar (Ha)"
                value={String(formData.jumlahTanamanHektar)}
                required
              />
              <FormLabel
                label="Masa Tanam"
                value={formData.masaTanam}
                required
              />
              <FormLabel
                label="Tahun Musim Tanam"
                value={String(formData.tahunMusimTanam)}
                required
              />
              <FormLabel
                label="Status kepemilikan Lahan"
                value={
                  listStatus.find(
                    (status) => status.id === formData.statusLahanId
                  )?.name || "-"
                }
                required
              />
            </div>
            <div className="text-lg font-medium mt-10">
              Data Kebutuhan Tanaman
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormLabel
                label="Jenis Tanaman  yang Diajukan"
                value={
                  listPlant.find((plant) => plant.id === formData.tanamanId)
                    ?.name || "-"
                }
                required
              />
              <FormLabel
                label="Jumlah Tanaman yang Diajukan"
                value={String(formData.jumlahTanaman)}
                required
              />
              <FormLabel
                label="Metode Penanaman Tanaman"
                value={
                  listMetode.find((method) => method.id === formData.methodId)
                    ?.name || "-"
                }
                required
              />
              <FormLabel
                label="Alasan Pengajuan Tanaman"
                value={formData.alasan}
              />
              <FormLabel label="Latitude" value={String(formData.latitude)} />
              <FormLabel label="Longitude" value={String(formData.longitude)} />
            </div>
            <Map
                onLocationSelect={(lat: number, lng: number) => {
                  setFormData({ ...formData, latitude: lat, longitude: lng });
                }}
                center={[formData.latitude, formData.longitude]}
                status="detail"
              />
            <div className="flex justify-end mt-4">
              <button
                onClick={() => {
                  router.back();
                }}
                className="border border-primary-default text-primary-default rounded-full py-2 px-4"
              >
                Kembali
              </button>
            </div>
          </div>
        ))}

      {/* component */}
      <SubmissionStatusModal
        isOpen={isOpenModal}
        onClose={() => {
          setIsOpenModal(false);
        }}
        status={status}
        setStatus={(statusValue, alasan) => {
          setChangeStatus(status);
          setIsOpenModal(false);
          handleUpdateStatus(statusValue, alasan);
        }}
      />
    </div>
  );
}
