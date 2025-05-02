"use client";

import { useState } from "react";
import { Input } from "../input";
import { Button } from "../button";
import IconGoogle from "@/assets/IconGoogle";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff } from "lucide-react";
import FormSelect from "../base/form-select";
import React from "react";
import { Bounce, toast } from "react-toastify";
import { useRouter } from "next/navigation";

/**
 * RegisterFormProps is an interface for the props of RegisterForm component.
 */
interface RegisterFormProps {
  openModalTerm: () => void;
  openModalPrivacy: () => void;
}

/**
 * RegisterForm component renders a registration form with fields for name, email, and password.
 * It includes a toggle for showing/hiding the password, a checkbox for agreeing to terms and conditions,
 * and buttons for submitting the form and signing in with Google.
 *
 * @component
 * @example
 * return (
 *   <RegisterForm />
 * )
 *
 * @returns {JSX.Element} The rendered registration form component.
 */
export default function RegisterForm({
  openModalTerm,
  openModalPrivacy,
}: RegisterFormProps) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
    role: 0,
    select_role: "",
    nik: "",
  });
  const [error, setError] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [messageError, setMessageError] = useState<{ name?: string; email?: string; password?: string, nik?: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const termsCheckbox = document.getElementById("terms1") as HTMLInputElement;
    if (termsCheckbox.ariaChecked === "true") {

      try {
        setIsLoading(true);
        // Menggunakan fetch untuk melakukan login ke API route
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}auth/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password,
            confirmPassword: formData.confirm_password,
            roleId: formData.role,
            nik: formData.nik,
          }),
        });
        console.log("Response:", response);  // Lihat apakah respons sesuai ekspektasi
        // Jika response tidak OK (tidak ada status 200)
        if (!response.ok) {
          const errorData = await response.json();
          toast.error(`${errorData.message}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });  // Lihat apakah respons sesuai ekspekt
          setMessageError(errorData.data);
        } else {
          // Mendapatkan data user dari response API
          const data = await response.json();

          console.log("Data:", data);  // Lihat apakah respons sesuai ekspektasi

          if (response.ok) {
            toast.success("Register berhasil", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              transition: Bounce,
            });
            // Navigasi ke halaman login setelah register berhasil
            router.push('auth/login');
          } else {
            // Menangani error saat login
            setMessageError(data.data || {});
            setError(data.message || 'Register gagal');
          }
        }

        setIsLoading(false);

      } catch (err) {
        console.log(err);

        setIsLoading(false);
        setError(err instanceof Error ? err.message : 'Register gagal, coba lagi!');
        toast.error(`${err}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
    } else {
      toast.error(`Harap centang syarat dan ketentuan & kebijakan privasi`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }

  };
  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <div className="flex flex-col mb-4">
          <div className="flex flex-col mb-4">
            <div className="text-sm mb-4">Nama</div>
            <Input type="nama" placeholder="Masukkan Nama Anda" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
            {messageError && <div className="text-red-500 text-sm mt-2">{messageError.name}</div>}
          </div>
          <div className="flex flex-col mb-4">
            <div className="text-sm mb-4">Email</div>
            <Input type="email" placeholder="Masukkan Email Anda" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
            {messageError && <div className="text-red-500 text-sm mt-2">{messageError.email}</div>}
          </div>
          <div className="flex flex-col mb-4">
            <div className="text-sm mb-4">NIK</div>
            <Input
              type="text"
              placeholder="Masukkan NIK Anda"
              value={formData.nik}
              onChange={(e) => setFormData({ ...formData, nik: e.target.value })}
            />
            {formData.nik && formData.nik.length < 16 && (
              <div className="text-red-500 text-sm mt-2">
                NIK harus terdiri dari minimal 16 karakter.
              </div>
            )}
            {messageError && <div className="text-red-500 text-sm mt-2">{messageError.nik}</div>}
          </div>
          <div className="flex flex-col mb-4">
            <div className="text-sm mb-4">Kata Sandi</div>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="Masukkan Kata Sandi"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center px-4"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>
            {messageError && <div className="text-red-500 text-sm mt-2">{messageError.password}</div>}
          </div>
          <div className="flex flex-col mb-4">
            <div className="text-sm mb-4">Konfirmasi Kata Sandi</div>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                value={formData.confirm_password}
                onChange={(e) => setFormData({ ...formData, confirm_password: e.target.value })}
                placeholder="Masukkan Kata Sandi"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center px-4"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>
            {messageError && <div className="text-red-500 text-sm mt-2">{messageError.password}</div>}
          </div>
          <FormSelect
            label="Role"
            value={["Admin", "User", "Penyuluh", "Distributor"]}
            selected={formData.select_role}
            onChange={(value) => {
              if (value === "Admin") {
                setFormData({ ...formData, role: 1, select_role: value });
              } else if (value === "User") {
                setFormData({ ...formData, role: 2, select_role: value });
              }              else if (value === "Penyuluh") {
                setFormData({ ...formData, role: 3, select_role: value });
              }              else if (value === "Distributor") {
                setFormData({ ...formData, role: 4, select_role: value });
              }
            }}
          />
        </div>
        <div className="flex items-center mb-3">
          <Checkbox id="terms1" />
          <label htmlFor="terms" className="text-sm text-neutral-400 ml-2">
            Ya, saya mengonfirmasi bahwa saya telah membaca, memahami, dan{" "}
            <br />
            menyetujui{" "}
            <span
              onClick={openModalTerm}
              className="text-primary-500 cursor-pointer font-bold"
            >
              Syarat dan Ketentuan
            </span>{" "}
            dan{" "}
            <span
              onClick={openModalPrivacy}
              className="text-primary-500 cursor-pointer font-bold"
            >
              Kebijakan Privasi.
            </span>
          </label>
        </div>
        <div className="flex flex-col mb-3">
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-primary-500 text-white rounded-full py-2 w-[120px]"
            >
              {isLoading ? "Loading..." : "Daftar"}
            </button>
          </div>
        </div>
      </form>
      <div className="flex text-center text-primary-500 my-4">
        Sudah memiliki akun?
        <div className="font-bold ml-1 cursor-pointer" onClick={() => { router.push('/auth/login') }}>Masuk</div>
      </div>
      <div className="flex text-center my-4">
        <div className="flex items-center w-full">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-4 text-gray-500">atau</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <Button
          type="button"
          className="bg-white text-black rounded-full py-2 w-[237px] border border-neutral-300"
        >
          <IconGoogle />
          Masuk dengan Google
        </Button>
      </div>
    </div>
  );
}
