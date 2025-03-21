"use client";

import FormInput from "@/components/ui/base/form-input";
import FormSelect from "@/components/ui/base/form-select";
import { Button } from "@/components/ui/button";
import DatePicker from "@/components/ui/date-picker";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AddSeedStok() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        tanggal: new Date(),
        jenis_tanaman: "",
        kategori_stok: "",
        stok_tanaman: "",
    });
    return (
        <div className="bg-white p-4 rounded-lg shadow-md flex flex-col">
            <div className="flex items-center justify-between gap-2 mb-4">
                <DatePicker
                    label="Tanggal Penambahan"
                    date={formData.tanggal}
                    onSelect={(date: Date) => setFormData({ ...formData, tanggal: date })}
                />
                <FormSelect label="Jenis Tanaman" value={["Padi", "Jagung"]} selected={formData.jenis_tanaman} required />
            </div>
            <div className="flex items-center justify-between gap-2 mb-4">
                <FormSelect label="Kategori Stok" value={["Padi", "Jagung"]} selected={formData.kategori_stok} />
                <FormInput
                    label="Stok Tanaman"
                    placeholder="Masukan Status Stok Tanaman"
                    value={formData.stok_tanaman}
                    required
                />
            </div>
            <div className="flex justify-end items-center gap-2">
                <Button onClick={() => { router.back() }} className="border border-primary-default rounded-full text-primary-default px-5">
                    Batal
                </Button>
                <Button className="bg-primary-default rounded-full text-white px-5">
                    Tambah
                </Button>
            </div>
        </div>
    );
}