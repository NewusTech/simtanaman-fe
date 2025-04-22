"use client"
import Image from "next/legacy/image";

export default function ForgotPasswordPage() {
    return (
        <div className="flex flex-c items-center justify-center min-h-screen bg-primary-100 p-4">
            <div className="flex flex-col items-center justify-center w-full max-w-md p-8 mb-2 bg-white rounded-lg shadow-md sm:p-10 md:max-w-lg lg:max-w-xl">
                <div className="text-center text-sm sm:text-base md:text-lg lg:text-xl">
                    <div className="flex items-center mb-4 gap-4">
                        <img src="/assets/images/LogoPali.svg" alt="" width={47} height={59} />
                        <span className="text-primary-default font-semibold">Dashboard Website Tani</span>
                    </div>
                </div>
            </div>
        </div>
    );
}