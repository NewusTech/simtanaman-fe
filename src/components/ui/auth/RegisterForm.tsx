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
"use client";

import { useState } from "react";
import { Input } from "../input";
import { Button } from "../button";
import IconGoogle from "@/assets/IconGoogle";
import { Checkbox } from "@/components/ui/checkbox";

interface RegisterFormProps {
  openModalTerm: () => void;
  openModalPrivacy: () => void;
}

export default function RegisterForm({
  openModalTerm,
  openModalPrivacy,
}: RegisterFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div>
      <form className="flex flex-col space-y-4">
        <div className="flex flex-col mb-4">
          <div className="flex flex-col mb-4">
            <div className="text-sm mb-4">Nama</div>
            <Input type="nama" placeholder="Masukkan Nama Anda" />
          </div>
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
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.522 5 12 5c4.478 0 8.268 2.943 9.542 7-.274 1.057-.742 2.057-1.375 2.957M15 12a3 3 0 01-6 0m6 0a3 3 0 01-6 0m6 0c0 1.657-1.343 3-3 3s-3-1.343-3-3"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a10.05 10.05 0 011.375-2.957M15 12a3 3 0 01-6 0m6 0a3 3 0 01-6 0m6 0c0 1.657-1.343 3-3 3s-3-1.343-3-3"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3l18 18"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        <div className="flex items-center mb-4">
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
        <div className="flex flex-col mb-4">
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-primary-500 text-white rounded-full py-2 w-[120px]"
            >
              Daftar
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
