"use client";
import React from "react";
import { Input } from "../input";
import { Button } from "../button";
import IconGoogle from "@/assets/IconGoogle";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

/**
 * LoginForm component renders a login form with email and password input fields.
 *
 * @component
 * @example
 * return (
 *   <LoginForm />
 * )
 *
 * @returns {JSX.Element} A JSX element containing the login form.
 */
export default function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = React.useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    router.push("/home");
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <div className="flex flex-col mb-8">
          <div className="flex flex-col mb-4">
            <div className="text-sm mb-4">Email</div>
            <Input type="email" placeholder="Masukkan Email Anda" />
          </div>
          <div className="flex flex-col">
            <div className="text-sm mb-4">Kata Sandi</div>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
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
          </div>
        </div>
        <div className="flex flex-col mb-4">
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-primary-500 text-white rounded-full py-2 w-[120px]"
            >
              Masuk
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
