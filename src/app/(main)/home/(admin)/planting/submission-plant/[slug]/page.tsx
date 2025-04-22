"use client";

import FormLabel from "@/components/ui/base/form-label";
import { Button } from "@/components/ui/button";
import PlantingStatusModal from "@/components/ui/home/(admin)/planting/PlantingStatusModal";
import PlantingSubmissionModal from "@/components/ui/home/(admin)/planting/PlantingSubmissionModal";
import { useState } from "react";

export default function Component() {
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenReject, setIsOpenReject] = useState(false);
    return (
        <div className="bg-white p-4 rounded-lg shadow-md">
            {/* header */}
            <div className="flex justify-end items-center mb-4">
                <div className="bg-gray-400 rounded-md text-sm p-2 px-8">Diajukan</div>
            </div>
            {/* end header */}
            {/* body */}
            <div className="flex flex-col gap-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormLabel
                        label="Distributor"
                        value="Dila"
                    />
                    <FormLabel
                        label="Tanggal Pengajuan"
                        value="03/03/2025"
                        required
                    />
                    <FormLabel
                        label="Jenis Tanaman"
                        value="Padi"
                        required
                    />
                    <FormLabel label="Jumlah Tanaman yang diajukan" value="500 Bibit Padi" required />
                    <FormLabel label="Tanggal Kebutuhan Tanaman" value="06/03/2025" required />
                    <FormLabel label="Alasan  Pengajuan (Optional)" value="Stok Habis" />
                </div>
                <div className="flex justify-end gap-4">
                    <Button onClick={() => {
                        setIsOpen(true);
                    }} className="bg-success-600 text-white px-8 tex-sm rounded-full">
                        Disetujui
                    </Button>
                    <Button onClick={() => { setIsOpenReject(true) }} className="bg-error-500 text-white px-8 tex-sm rounded-full">
                        Ditolak
                    </Button>
                </div>
            </div>
            {/* end body */}
            {/* Component */}
            <PlantingSubmissionModal isOpen={isOpen} onClose={() => { setIsOpen(false) }} />
            <PlantingStatusModal isOpen={isOpenReject} onClose={() => { setIsOpenReject(false) }} />
            {/* End Component */}
        </div>
    );
}