"use client";

import FormLabel from "@/components/ui/base/form-label";
import { useState } from "react";

export default function TabSubmission() {
    const [formData, setFormData] = useState({
        name: "Dila Azzahra",
        nik: "3201456789123456",
        phone: "083726487266",
        email: "dilazzahra@gmail.com",
        kartuTani: "-",
        kelompokTani: "Berkah Tani",
        regisPoktan: "-",
        ketuaPoktan: "-",
        provinsi: "Sumatra Selatan",
        kabupaten: "Panukal Abab Lematang Ilit",
        kecamatan: "Talang Ubi",
        desa: "Talang Ubi",
        alamat: "Jl.",
        luasLahan: "2.5 Ha",
        jenisTanaman: "Padi",
        jumlahTanaman: "2.5 Ha",
        masaTanam: "Musim Tanam Ke-1",
        tahunTanam: "2024",
        statusLahan: "Milik Sendiri",
        jenisPupuk: "Urea",
        jumlahPupuk: "100 Kg",
        metodePenanaman: "Konvensional",
        alasanPengajuan: "-",
    });

    return (
        <div>
            <div className="text-lg font-medium mb-4">Data diri</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormLabel label="Nama Lengkap" value={formData.name} required />
                <FormLabel label="NIK" value={formData.nik} required />
                <FormLabel label="Nomor Telepon" value={formData.phone} required />
                <FormLabel label="Email" value={formData.email} />
                <FormLabel
                    label="Nomor Kartu Tani (Jika Ada)"
                    value={formData.kartuTani}
                />
                <FormLabel
                    label="Nama Kelompok Tani (Poktan)"
                    value={formData.kelompokTani}
                    required
                />
                <FormLabel
                    label="Nomor Registrasi Poktan"
                    value={formData.regisPoktan}
                />
                <FormLabel
                    label="Nama Ketua Poktan"
                    value={formData.ketuaPoktan}
                />
                <FormLabel
                    label="Provinsi"
                    value={formData.provinsi}
                    required
                />
                <FormLabel
                    label="Kabupaten"
                    value={formData.kabupaten}
                    required
                />
                <FormLabel
                    label="Kecamatan"
                    value={formData.kecamatan}
                    required
                />
                <FormLabel
                    label="Desa/Kelurahan"
                    value={formData.desa}
                    required
                />
                <FormLabel
                    label="Alamat"
                    value={formData.alamat}
                    required
                />
            </div>
            <div className="text-lg font-medium mb-4 mt-7">Data Lahan dan Usaha Tani</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormLabel label="Luas Lahan (Ha)" value={formData.luasLahan} required />
                <FormLabel
                    label="Jenis Tanaman"
                    value={formData.jenisTanaman}
                    required
                />
                <FormLabel
                    label="Jumlah Tanaman dalam Satuan Hektarc(Ha)"
                    value={formData.jumlahTanaman}
                    required
                />
                <FormLabel
                    label="Masa Tanam"
                    value={formData.masaTanam}
                    required
                />
                <FormLabel
                    label="Tahun Musim Tanam"
                    value={formData.tahunTanam}
                    required
                />
                <FormLabel
                    label="Status kepemilikan Lahan"
                    value={formData.statusLahan}
                    required
                />
            </div>
            <div className="text-lg font-medium mb-4 mt-7">Data Kebutuhan Pupuk</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormLabel label="Jenis Pupuk yang Diajukan" value={formData.jenisPupuk} required />
                <FormLabel label="Jumlah Pupuk yang Diajukan" value={formData.jumlahPupuk} required />
                <FormLabel label="Metode Penanaman Tanaman" value={formData.metodePenanaman} required />
                <FormLabel label="Alasan Pengajuan Pupuk" value={formData.alasanPengajuan} />
            </div>
            <div className="text-lg font-medium mb-4 mt-7">Upload</div>
            <div className="flex flex-col gap-2">
                <div className="text-sm font-medium text-gray-700 mb-2">
                    KTP (JPG/PNG/PDF) <span className="text-danger-600">*</span>
                </div>
                <div className="bg-gray-200 rounded-lg w-[20rem] h-[10rem]"></div>
                <div className="text-sm font-medium text-gray-700 mb-2">
                    Kartu Tani (JPG/PNG/PDF)
                </div>
                <div className="bg-gray-200 rounded-lg w-[20rem] h-[10rem]"></div>
            </div>
        </div>
    );
}