"use client";

import FormLabel from "@/components/ui/base/form-label";
import { useState } from "react";

export default function TabDistributionSchedule() {
    const [formData, setFormData] = useState({
        tanggalDistribusi: "27/02/2025",
        metodeDistribusi: "Antar ke lokasi",
        namaPetugas: "Irsyad",
        noTeleponPetugas: "083726487266",
        jenisTanaman: "Padi",
        jumlahTanaman: "500 Bibit Padi",
    });
    return (
        <div className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormLabel label="Nama Lengkap" value={formData.tanggalDistribusi} required />
                <FormLabel label="Metode Distribusi" value={formData.metodeDistribusi} required />
                <FormLabel label="Nama Petugas Distribusi" value={formData.namaPetugas} required />
                <FormLabel label="Kontak Petugas Distribusi" value={formData.noTeleponPetugas} required />
                <FormLabel label="Jenis Tanaman yang Dikirim" value={formData.jenisTanaman} required />
                <FormLabel label="Jumlah Bibit Tanaman" value={formData.jumlahTanaman} required />
            </div>
        </div>
    )
}