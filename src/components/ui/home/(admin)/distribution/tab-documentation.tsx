"use client";

import FormTextArea from "@/components/ui/base/form-text-area";

export default function TabDocumentation() {
    return (
        <div>
            <div className="text-sm font-medium text-gray-700 mb-2">
                Foto <span className="text-danger-600"></span>
            </div>
            <div className="bg-gray-200 rounded-lg w-[20rem] h-[10rem] mb-4"></div>

            <div className="text-sm font-medium text-gray-700 mb-2">
                File
            </div>
            <div className="relative flex items-center border border-gray-300 w-full rounded-full p-2 px-3 mb-4">
                <span>Dokumentasi.pdf</span>
                <button className="absolute right-2 bg-primary-100 text-primary-default px-4 py-1 rounded-full">
                    Lihat
                </button>
            </div>

            <FormTextArea label={"Catatan"} value={""} placeholder="Masukan Catatan" />
        </div>
    );
}