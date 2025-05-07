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
  const role = usePermission((state) => state.role);
  const [currentPage, setCurrentPage] = useState(1);
  const [listKetuaPoktan, setListKetuaPoktan] = useState<Poktan[]>([]);
  const [listPlant, setListPlant] = useState<JenisTanaman[]>([]);
  const [listStatus, setlistStatus] = useState<StatusKepemilikan[]>([]);
  const [formData, setFormData] = useState({
    name: "",
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
    kartuTani: ""as File | string,
    tanamanId: 0,
    tanamanKebutuhanId: null,
    statusLahanId: 0,
    poktanId: 0,
    methodId: 0,
    lokasi:""
  });

  const handleClickStatus = (status: string) => {
    setIsOpenModal(true);
    setStatus(status);
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
    },
    [token]
  );

  useEffect(() => {
    fetchDataPoktan(currentPage);
    fetchDataJenisTanaman(currentPage);
  }, [currentPage, fetchDataPoktan, fetchDataJenisTanaman]);

  return (
    <div className="bg-white p-4 rounded-md shadow-md font-poppins">
      {/* header */}
      {role === "admin" && (
        <div>
          {(changeStatus === "diajukan" && (
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
            (changeStatus === "setujui" && (
              <div className="flex items-center gap-4 p-5 bg-success-100 rounded-lg text-success-700 font-medium mb-4">
                <CheckCircle className="h-10 w-10" />
                Disetujui Admin
              </div>
            )) ||
            (changeStatus === "direvisi" && (
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
                  File tidak jelas dan tidak terlihat.
                </div>
              </div>
            )) ||
            (changeStatus === "ditolak" && (
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
                  Data salah semua.
                </div>
              </div>
            ))}
        </div>
      )}
      {/* end of header */}

      {/* body */}
      {(params.slug === "Tambah" && (
        <div>
          <span className="text-md font-semibold">Data Diri</span>
          <div className="flex flex-col md:flex-row justify-between items-start mt-4 w-full gap-4 mb-4">
            <div className="flex flex-col items-center w-full gap-4">
              <FormInput
                label="Nama Lengkap"
                placeholder="Masukan Nama Lengkap"
                value={formData.name}
                onChange={(value: string) =>
                  setFormData({ ...formData, name: value })
                }
                required
              />
              <FormInput
                label="Nomor Telepon"
                placeholder="Masukan Nomor Telepon"
                value={formData.noTelepon}
                onChange={(value: string) =>
                  setFormData({ ...formData, noTelepon: value })
                }
                required
              />
              <FormInput
                label="Nomor Kartu Tani"
                placeholder="Masukan Nomor Kartu Tani"
                value={formData.noKartuTani}
                onChange={(value: string) =>
                  setFormData({ ...formData, noKartuTani: value })
                }
                required
              />
              <FormInput
                label="Nomor Registrasi Poktan"
                placeholder="Masukan Nomor Registrasi Poktan"
                value={formData.noRegistrasiPoktan}
                onChange={(value: string) =>
                  setFormData({ ...formData, noRegistrasiPoktan: value })
                }
                required
              />
              <FormSelect
                label="Provinsi"
                value={["Jawa Barat", "Sulawesi Selatan"]}
                selected={formData.Provinsi}
                onChange={(value: string) =>
                  setFormData({ ...formData, Provinsi: value })
                }
                required
              />
              <FormSelect
                label="Kecamatan"
                value={["Cicendo", "Sukasari"]}
                selected={formData.Provinsi}
                onChange={(value: string) =>
                  setFormData({ ...formData, Provinsi: value })
                }
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
                required
              />
              <FormInput
                label="Email"
                placeholder="Masukan Email"
                value={formData.email}
                onChange={(value: string) =>
                  setFormData({ ...formData, email: value })
                }
                required
              />
              <FormSelect
                label="Nama Kelompok Tani (Poktan)"
                value={listKetuaPoktan.map((poktan) => poktan.name)}
                selected={formData.namaKetuaPoktan}
                onChange={(value: string) =>
                  setFormData({ ...formData, namaKetuaPoktan: value })
                }
                required
              />
              <FormInput
                label="Nama Ketua Poktan"
                placeholder="Masukan Nama Ketua Poktan"
                value={formData.namaKetuaPoktan}
                onChange={(value: string) =>
                  setFormData({ ...formData, namaKetuaPoktan: value })
                }
                required
              />
              <FormSelect
                label="Kabupaten"
                value={["Bandung", "Ciamis"]}
                selected={formData.Kabupaten}
                onChange={(value: string) =>
                  setFormData({ ...formData, Kabupaten: value })
                }
                required
              />
              <FormSelect
                label="Desa/Kelurahan"
                value={["Cicendo", "Sukasari"]}
                selected={formData.DesaKelurahan}
                onChange={(value: string) =>
                  setFormData({ ...formData, DesaKelurahan: value })
                }
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
                required
              />
              <FormInput
                label="Masa Tanam"
                placeholder="Masukan Masa Tanam"
                value={String(formData.masaTanam)}
                onChange={(value: string) =>
                  setFormData({ ...formData, masaTanam: value })
                }
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
                required
              />
              <FormSelect
                label="Metode Penanaman Tanaman"
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
                required
              />
            </div>
            <div className="flex flex-col items-center w-full gap-4">
              <FormInput
                label="Jumlah bibit tanaman yang Diajukan (bibit)"
                placeholder="Masukan Jumlah bibit tanaman yang Diajukan (bibit)"
                value={String(formData.masaTanam)}
                onChange={(value: string) =>
                  setFormData({ ...formData, masaTanam: value })
                }
                required
              />
              <FormInput
                label="Alasan Pengajuan Tanaman"
                placeholder="Masukan Alasan Pengajuan Tanaman"
                value={String(formData.alasan)}
                onChange={(value: string) =>
                  setFormData({ ...formData, alasan: value })
                }
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
                KTP (JPG/PNG/PDF) <span className="text-error-500">*</span>
              </label>
              <div className="relative w-full">
                <input
                  id="ktp-file-input"
                  type="file"
                  accept=".jpg,.jpeg,.png,.pdf"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const file = e.target.files && e.target.files[0];
                    setFormData({ ...formData, ktp: file || ("" as any) });
                  }}
                />
                <label
                  htmlFor="ktp-file-input"
                  className="flex items-center justify-between w-full h-[42px] px-1.5 py-2 text-sm border border-neutral-300 rounded-full bg-white cursor-pointer"
                  role="button" 
                  aria-controls="ktp-file-input"
                >
                  <span
                    className={`pl-2.5 truncate ${typeof formData.ktp === "object" && formData.ktp instanceof File ? "text-neutral-700" : "text-neutral-400"}`}
                  >
                    {formData.ktp instanceof File
                      ? formData.ktp.name
                      : "Pilih File"}
                  </span>
                  <div
                    className="px-5 py-[5px] text-sm font-normal text-neutral-700 bg-neutral-300 rounded-full whitespace-nowrap"
                    aria-hidden="true"
                  >
                    Pilih File
                  </div>
                </label>
              </div>
            </div>
            <div className="flex flex-col items-center w-full gap-4">
            <div className="flex flex-col items-start w-full gap-1">
              <label
                htmlFor="ktp-file-input"
                className="block text-sm font-medium"
              >
                Kartu Tani (JPG/PNG/PDF)
              </label>
              <div className="relative w-full">
                <input
                  id="ktp-file-input"
                  type="file"
                  accept=".jpg,.jpeg,.png,.pdf"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const file = e.target.files && e.target.files[0];
                    setFormData({ ...formData, kartuTani: file || ("" as any) });
                  }}
                />
                <label
                  htmlFor="ktp-file-input"
                  className="flex items-center justify-between w-full h-[42px] px-1.5 py-2 text-sm border border-neutral-300 rounded-full bg-white cursor-pointer"
                  role="button" 
                  aria-controls="ktp-file-input"
                >
                  <span
                    className={`pl-2.5 truncate ${typeof formData.kartuTani === "object" && formData.kartuTani instanceof File ? "text-neutral-700" : "text-neutral-400"}`}
                  >
                    {formData.kartuTani instanceof File
                      ? formData.kartuTani.name
                      : "Pilih File"}
                  </span>
                  <div
                    className="px-5 py-[5px] text-sm font-normal text-neutral-700 bg-neutral-300 rounded-full whitespace-nowrap"
                    aria-hidden="true"
                  >
                    Pilih File
                  </div>
                </label>
              </div>
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
                onClick={() => {
                  // Handle location search
                }}
              >
                Cari Lokasi
              </Button>
            </div>
            {/* <Map /> */}

        </div>
      )) ||
        (params.slug === "Detail" && (
          <div className="flex flex-col gap-4">
            <div className="text-lg font-medium">Data diri</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormLabel label="Nama Lengkap" value="John Doe" required />
              <FormLabel label="NIK" value="3201456789123456" required />
              <FormLabel label="Nomor Telepon" value="083726487266" required />
              <FormLabel label="Email" value="dilazzahra@gmail.com" />
              <FormLabel label="Nomor Kartu Tani (Jika Ada)" value="-" />
              <FormLabel
                label="Nama Kelompok Tani (Poktan)"
                value="Berkah Tani"
                required
              />
              <FormLabel label="Nomor Registrasi Poktan" value="-" />
              <FormLabel label="Nama Ketua Poktan" value="-" />
              <FormLabel label="Provinsi" value="Sumatra Selatan" required />
              <FormLabel
                label="Kabupaten"
                value="Panukal Abab Lematang Ilit"
                required
              />
              <FormLabel label="Kecamatan" value="Talang Ubi" required />
              <FormLabel label="Desa/Kelurahan" value="Talang Ubi" required />
            </div>
            <FormLabel label="Alamat" value="Jl." required />
            <div className="text-lg font-medium mt-10">
              Data Lahan dan Usaha Tani
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormLabel label="Luas Lahan (Ha)" value="2.5 Ha" required />
              <FormLabel label="Jenis Tanaman" value="Padi" required />
              <FormLabel
                label="Jumlah Tanaman dalam Satuan Hektarc(Ha)"
                value="2.5 Ha"
                required
              />
              <FormLabel label="Masa Tanam" value="Musim Tanam Ke-1" required />
              <FormLabel label="Tahun Musim Tanam" value="2024" required />
              <FormLabel
                label="Status kepemilikan Lahan"
                value="Milik Sendiri"
                required
              />
            </div>
            <div className="text-lg font-medium mt-10">
              Data Kebutuhan Tanaman
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormLabel
                label="Jenis Tanaman  yang Diajukan"
                value="Padi"
                required
              />
              <FormLabel
                label="Jumlah Tanaman yang Diajukan"
                value="500 Bibit Padi"
                required
              />
              <FormLabel
                label="Metode Penanaman Tanaman"
                value="Konvensional"
                required
              />
              <FormLabel label="Alasan Pengajuan Tanaman" value="-" />
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
        setStatus={() => {
          setChangeStatus(status);
          setIsOpenModal(false);
        }}
      />
    </div>
  );
}
