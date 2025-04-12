"use client";
import React, { use } from "react";
import { Input } from "../input";
import { Button } from "../button";
import IconGoogle from "@/assets/IconGoogle";
import { useRouter } from "next/navigation";
import { CircleAlert, Eye, EyeOff } from "lucide-react";
import useUserStore from "@/store/auth/userStore";
import { Bounce, toast } from "react-toastify";
import { da } from "date-fns/locale";

export default function LoginForm() {
  const setUser = useUserStore((state) => state.setUser);
  const setRole = useUserStore((state) => state.setRole);
  const user = useUserStore((state) => state.user);
  const role = useUserStore((state) => state.role);
  const router = useRouter();
  const [showPassword, setShowPassword] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      // Menggunakan fetch untuk melakukan login ke API route
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      // Jika response tidak OK (tidak ada status 200)
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Login gagal');
      }

      // Mendapatkan data user dari response API
      const data = await response.json();
      // Menyimpan data user dan token di Zustand
      console.log(data['data']);  // Lihat apakah respons sesuai ekspektasi

      await setUser(data['data']);
      await setRole(data['data']['role']);

      if (response.status === 200) {

        // Set cookies
        document.cookie = `token=${data['data']['token']}; path=/`;
        document.cookie = `role=${data['data']['role']['name']}; path=/`;
        // Navigasi ke halaman home setelah login berhasil
        router.push('/home/dashboard');  // Atau ke halaman lain sesuai dengan rute
      } else {
        // Menangani error saat login
        setError(data.message || 'Login gagal');
      }

      // Menyimpan token di localStorage jika perlu
      localStorage.setItem('token', data.token);
      setIsLoading(false);

    } catch (err) {
      console.log(err);

      setIsLoading(false);
      setError(err instanceof Error ? err.message : 'Login gagal, coba lagi!');
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
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <div className="flex flex-col mb-8">
          <div className="flex flex-col mb-4">
            <div className="text-sm mb-4">Email</div>
            <Input
              type="email"
              placeholder="Masukkan Email Anda"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col">
            <div className="text-sm mb-4">Kata Sandi</div>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Masukkan Kata Sandi"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center px-4"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col mb-4">
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-primary-500 text-white rounded-full py-2 w-[120px]"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Masuk"}
            </button>
          </div>
        </div>
      </form>
      <div className="flex text-center text-primary-500 my-8">
        Sudah memiliki akun?
        <div className="font-bold ml-1">Masuk</div>
      </div>
      <div className="flex text-center my-8">
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
