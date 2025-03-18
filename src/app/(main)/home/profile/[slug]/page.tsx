"use client";

import FormInput from "@/components/ui/base/form-input";
import FormSelect from "@/components/ui/base/form-select";
import FormTextArea from "@/components/ui/base/form-text-area";
import { Button } from "@/components/ui/button";
import DatePicker from "@/components/ui/date-picker";
import { Images } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export default function ComponentPage() {
    const router = useRouter();
    const pathname = usePathname();
    const [image, setImage] = useState<string | ArrayBuffer | null>(null);
    const [formData, setFormData] = useState({
        name: "",
        nik: "",
        nip: "",
        email: "",
        tanggal_lahir: new Date(),
        jenis_kelamin: "",
        alamat: "",
        no_hp: "",
    });
    const [formUbahPassword, setFormUbahPassword] = useState({
        password_lama: "",
        password: "",
        konfirmasi_password: "",
    });
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (
            files &&
            files[0] &&
            (files[0].type === "image/jpeg" || files[0].type === "image/png")
        ) {
            const file = files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            alert("Please upload a JPG or PNG image.");
        }
    };
    return (
        <div className="p-4 bg-white shadow-md rounded-lg">
            {pathname.split("/").pop() == 'Edit' ? <div>

                <div className="flex flex-col md:flex-row items-center justify-between mb-4">
                    <div className="flex items-center mb-4 md:mb-0">
                        <div className="bg-gray-200 w-20 h-24 rounded-lg">
                            <label
                                htmlFor="imageUpload"
                                className="flex flex-col items-center justify-center  w-20 h-24 border-2 border-dashed rounded-lg cursor-pointer hover:bg-green-50"
                            >
                                {image ? (
                                    typeof image === "string" ? (
                                        <img
                                            src={image}
                                            alt="Uploaded"
                                            className="w-full h-full object-cover rounded-lg"
                                        />
                                    ) : null
                                ) : (<div> <Images></Images> </div>)}
                                <input
                                    id="imageUpload"
                                    type="file"
                                    accept="image/jpeg, image/png"
                                    className="hidden"
                                    onChange={handleImageChange}
                                />
                            </label>
                        </div>
                        <div className="ml-4">
                            <div className="text-lg font-medium">Dede Sudrajat</div>
                            <div className="text-sm text-gray-500">Dede@gmail.com</div>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row items-center gap-2">
                        <Button onClick={() => { router.back() }} className="border border-primary-default text-primary-default px-4 py-2 rounded-full mt-2 md:mt-0 md:ml-2">Batal</Button>
                        <Button onClick={() => { }} className="bg-primary-default text-white px-4 py-2 rounded-full flex items-center">
                            Simpan
                        </Button>
                    </div>
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
                            date={formData.tanggal_lahir}
                            onSelect={(date: Date) => setFormData({ ...formData, tanggal_lahir: date })}
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
                        <FormTextArea label="Alamat" value={formData.alamat} required />
                    </div>
                </div>
            </div> : <div className="flex flex-col gap-4">
                <div className="text-lg font-medium">
                    Ubah Kata Sandi
                </div>
                <FormInput
                    label="Kata Sandi Lama"
                    placeholder="Masukan Kata Sandi Lama"
                    value={formUbahPassword.password_lama}
                    required
                    type="password"
                />
                <FormInput
                    label="Kata Sandi Baru"
                    placeholder="Masukan Kata Sandi Baru"
                    value={formUbahPassword.password}
                    required
                    type="password"
                />
                <FormInput
                    label="Konfirmasi Kata Sandi Baru"
                    placeholder="Masukan Konfirmasi Kata Sandi Baru"
                    value={formUbahPassword.konfirmasi_password}
                    required
                    type="password"
                />
                <div className="flex justify-end gap-4">
                    <Button onClick={() => { router.back() }} className="border border-primary-default text-primary-default px-4 py-2 rounded-full mt-2 md:mt-0 md:ml-2">Batal</Button>
                    <Button className="bg-primary-default text-white px-4 py-2 rounded-full flex items-center">
                        Simpan
                    </Button>
                </div>
            </div>}

        </div>
    )
}