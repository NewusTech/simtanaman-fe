"use client";

import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import FormLabel from "@/components/ui/base/form-label";
import SubmissionStatusModal from "@/components/ui/home/(admin)/submission/modal/SubmissionStatusModal";
import { useState } from "react";
import { CheckCircle, TriangleAlert } from "lucide-react";

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
export default function ComponentPage() {
  const router = useRouter();
  const pathname = usePathname();

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [status, setStatus] = useState("");
  const [changeStatus, setChangeStatus] = useState("diajukan");

  const handleClickStatus = (status: string) => {
    setIsOpenModal(true);
    setStatus(status);
  };

  return (
    <div className="bg-white p-4 rounded-md shadow-md font-poppins">
      {/* header */}
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
                  Data yang anda berikan kurang tepat, silahkan perbaiki data
                  anda.
                </span>
              </div>
            </div>
            <div className="text-sm font-medium text-black px-5">Catatan :</div>
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
            <div className="text-sm font-medium text-black px-5">Catatan :</div>
            <div className="text-sm font-medium text-black px-5">
              Data salah semua.
            </div>
          </div>
        ))}
      {/* end of header */}

      {/* body */}
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
        <div className="text-lg font-medium mt-10">Data Kebutuhan Tanaman</div>
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
