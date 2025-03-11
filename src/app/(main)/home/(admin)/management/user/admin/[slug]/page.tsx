"use client";

import FormInput from "@/components/ui/base/form-input";
import FormSelect from "@/components/ui/base/form-select";
import FormTextArea from "@/components/ui/base/form-text-area";
import ImageUploader from "@/components/ui/base/image-upload";
import DatePicker from "@/components/ui/date-picker";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

/**
 * AddAdminPage component renders a form for adding a new farmer.
 *
 * @component
 * @example
 * return (
 *   <AddAdminPage />
 * )
 *
 * @returns {JSX.Element} The rendered AddAdminPage component.
 */
export default function AddAdminPage() {
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
  });

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
    });
  };

  return (
    <div className="bg-white p-4 rounded-md shadow-md">
      <div className="text-lg font-medium">
        {pathname.split("/").pop()} Admin
      </div>
      <div className="flex flex-col md:flex-row justify-between items-start mt-4 w-full gap-4 mb-4">
        <div className="flex flex-col items-center w-full gap-4">
          <FormInput
            label="Nama Lengkap"
            placeholder="Masukan Nama Lengkap"
            value={formData.name}
            required
          />
          <DatePicker
            label="Tanggal Lahir"
            date={formData.date}
            onSelect={(date: Date) => setFormData({ ...formData, date })}
          />
          <FormInput
            label="NIP"
            placeholder="Masukan NIP"
            value={formData.nip}
            required
          />
          <FormInput
            label="Nomor Telepon"
            placeholder="Masukan Nomor Telepon"
            value={formData.no_hp}
            required
          />
        </div>
        <div className="flex flex-col items-center w-full gap-4">
          <FormInput
            label="NIK"
            placeholder="Masukan NIK"
            value={formData.nik}
            required
          />
          <FormSelect
            label="Jenis Kelamin"
            value={["Laki-laki", "Perempuan"]}
            selected={formData.jenis_kelamin}
            required
          />
          <FormInput
            label="Email"
            placeholder="Masukan Email"
            value={formData.email}
            required
          />
          <FormInput
            label="Password"
            placeholder="Masukan Password"
            value={formData.password}
            required
            type="password"
          />
        </div>
      </div>
      <FormTextArea
        label="Alamat"
        placeholder="Masukan Alamat"
        value={formData.alamat}
        required
      />
      <div className="mt-4">
        <ImageUploader
          label="Foto"
          image={formData.foto}
          setImage={(image: string | ArrayBuffer | null) =>
            setFormData({ ...formData, foto: image as string })
          }
        />
      </div>
      {pathname.split("/").pop() !== "Detail" && (
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
            <button className="bg-primary-500 text-white rounded-full py-2 px-4">
              Simpan
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
