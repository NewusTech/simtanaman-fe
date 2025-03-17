"use client";

import FormLabel from "@/components/ui/base/form-label";
import { Button } from "@/components/ui/button";
import { PencilLine } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
    const router = useRouter();

    const handleklik = (name: String) => {
        router.push("/home/profile/" + name);
    }

    return (
        <div className="p-4 bg-white shadow-md rounded-lg">
            <div className="flex flex-col md:flex-row items-center justify-between mb-4">
                <div className="flex items-center mb-4 md:mb-0">
                    <div className="bg-gray-200 w-20 h-24 rounded-sm"></div>
                    <div className="ml-4">
                        <div className="text-lg font-medium">Dede Sudrajat</div>
                        <div className="text-sm text-gray-500">Dede@gmail.com</div>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row items-center gap-2">
                    <Button onClick={() => handleklik('Edit')} className="bg-primary-default text-white px-4 py-2 rounded-full flex items-center">
                        <PencilLine size={16} />
                        Edit
                    </Button>
                    <Button onClick={() => handleklik('Kata Sandi')} className="border border-primary-default text-primary-default px-4 py-2 rounded-full mt-2 md:mt-0 md:ml-2">Ubah Kata Sandi</Button>
                </div>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-start mt-4 w-full gap-4 mb-4">
                <div className="flex flex-col items-center w-full gap-4">
                    <FormLabel label="Nama" value="Dede Sudrajat" />
                    <FormLabel label="Tanggal Lahir" value="23 November 1999" />
                    <FormLabel label="NIP" value="1999" />
                    <FormLabel label="Nomor Telepon" value="01923771213" />
                </div>
                <div className="flex flex-col items-center w-full gap-4">
                    <FormLabel label="NIK" value="1231231231" />
                    <FormLabel label="Jenis Kelamin" value="Laki-Laki" />
                    <FormLabel label="Email" value="Sudrajatdede23@gmail.com" />
                    <FormLabel label="Alamat" value="Jlas daasdasjd" />
                </div>
            </div>
        </div>
    )
}