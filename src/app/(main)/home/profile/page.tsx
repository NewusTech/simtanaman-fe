"use client";

import FormLabel from "@/components/ui/base/form-label";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { fetchProfileData } from "@/lib/profile/profileFetching";
import { PencilLine } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export default function ProfilePage() {
  const { getToken } = useAuth();
  const token = getToken();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); // Define currentPage with an initial value
  const [currentTab, setCurrentTab] = useState(0);
  const [formData, setFormData] = useState({
    id: 0,
    email: "",
    name: "",
    nik: "",
    nip: "",
    noHp: "",
    alamat: "",
    jenisKelamin: "",
    tglLahir: "",
  });

  const fetchPage = useCallback(async () => {
    if (loading) return;

    setLoading(true);
    const data = await fetchProfileData(String(token));
    if (data) {
      setFormData({
        id: 0,
        email: data.email,
        name: data.name,
        nik: data.profile.nik,
        nip: data.profile.nip ?? "-",
        noHp: data.profile.noTelepon ?? "-",
        alamat: data.profile.alamat ?? "-",
        jenisKelamin: data.profile.jenisKelamin ?? "-",
        tglLahir: data.profile.tanggalLahir ?? "-",
      });
    } else {
      console.error("Failed to fetch data");
    }
    setLoading(false);
  }, [loading, token]);

  const handleklik = (name: String) => {
    router.push("/home/profile/" + name);
  };

  useEffect(() => {
    fetchPage();
  }, []);

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <div className="flex flex-col md:flex-row items-center justify-between mb-4">
        <div className="flex items-center mb-4 md:mb-0">
          <div className="bg-gray-200 w-20 h-24 rounded-sm"></div>
          <div className="ml-4">
            <div className="text-lg font-medium">{formData.name}</div>
            <div className="text-sm text-gray-500">{formData.email}</div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-2">
          <Button
            onClick={() => handleklik("Edit")}
            className="bg-primary-default text-white px-4 py-2 rounded-full flex items-center"
          >
            <PencilLine size={16} />
            Edit
          </Button>
          <Button
            onClick={() => handleklik("Kata Sandi")}
            className="border border-primary-default text-primary-default px-4 py-2 rounded-full mt-2 md:mt-0 md:ml-2"
          >
            Ubah Kata Sandi
          </Button>
        </div>
      </div>
      <div className="flex w-[20rem]">
        <button
          onClick={() => setCurrentTab(0)}
          className={`flex-1 py-2 rounded-l-full ${
            currentTab === 0
              ? "bg-primary-default text-white"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          Informasi
        </button>
        <button
          onClick={() => setCurrentTab(1)}
          className={`flex-1 py-2 rounded-r-full ${
            currentTab === 1
              ? "bg-primary-default text-white"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          Wilayah Kerja
        </button>
      </div>
      {(currentTab === 0 && (
        <div className="flex flex-col md:flex-row justify-between items-start mt-4 w-full gap-4 mb-4">
          <div className="flex flex-col items-center w-full gap-4">
            <FormLabel label="Nama" value={formData.name} />
            <FormLabel label="Tanggal Lahir" value={formData.tglLahir} />
            <FormLabel label="NIP" value={String(formData.nip)} />
            <FormLabel label="Nomor Telepon" value={String(formData.noHp)} />
          </div>
          <div className="flex flex-col items-center w-full gap-4">
            <FormLabel label="NIK" value={String(formData.nik)} />
            <FormLabel
              label="Jenis Kelamin"
              value={String(formData.jenisKelamin)}
            />
            <FormLabel label="Email" value={formData.email} />
            <FormLabel label="Alamat" value={formData.alamat} />
          </div>
        </div>
      )) || (
        <div className="flex flex-col md:flex-row justify-between items-start mt-4 w-full gap-4 mb-4">
          <div className="flex flex-col items-center w-full gap-4">
            <FormLabel label="Provinsi" value="Placeholder" />
            <FormLabel label="Kecamatan" value="Placeholder" />
          </div>
          <div className="flex flex-col items-center w-full gap-4">
            <FormLabel label="Kabupaten/Kota" value="Placeholder" />
            <FormLabel label="Desa/Binaan" value="Placeholder" />
          </div>
        </div>
      )}
    </div>
  );
}
