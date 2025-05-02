"use client";
import FormInput from "@/components/ui/base/form-input";
import { Button } from "@/components/ui/button";
import Image from "next/legacy/image";
import { useState } from "react";

export default function ForgotPasswordPage() {
  const [formData, setFormData] = useState({
    email: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div className="flex flex-c items-center justify-center min-h-screen bg-primary-100 p-4">
      <div className="flex flex-col items-center w-full max-w-md p-8 mb-2 bg-white rounded-lg shadow-md sm:p-10 md:max-w-lg lg:max-w-xl">
        <div className="text-sm sm:text-base md:text-lg lg:text-xl w-full">
          <div className="flex justify-center items-center mb-10 gap-4 w-full text-center">
            <img
              src="/assets/images/LogoPali.svg"
              alt=""
              width={47}
              height={59}
            />
            <span className="text-primary-default font-semibold">
              Dashboard Website Tani
            </span>
          </div>
          <div className="font-semibold w-full text-center">
            Lupa Kata Sandi?
          </div>
          <div className="text-gray-500 mt-2 text-sm  w-full text-center">
            Masukkan email Anda dan kami akan mengirimkan tautan untuk mengatur
            ulang kata sandi.
          </div>
          <div className="flex justify-start mt-4">
            <FormInput
              label="Email"
              placeholder="Masukkan email Anda"
              type="email"
              onChange={(value: string) =>
                setFormData({
                  ...formData,
                  email: value,
                })
              }
              required
              value={formData.email}
            />
          </div>
          <div className="flex justify-center w-full mt-4">
          <Button
            onClick={() => {}}
            className="bg-primary-default text-white px-10 py-2 rounded-full flex items-center"
          >
            {isLoading ? "Loading..." : "Kirim"}
          </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
