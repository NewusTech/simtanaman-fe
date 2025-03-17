"use client";
import QuillEditor from "@/components/ui/base/quill-editor";
import React, { useState } from "react";

/**
 * TermsAndConditionsPage component renders the terms and conditions along with a privacy policy.
 * It includes a QuillEditor for editing content.
 *
 * @component
 * @example
 * return (
 *   <TermsAndConditionsPage />
 * )
 *
 * @returns {JSX.Element} The rendered component.
 *
 * @remarks
 * This component uses the `useState` hook to manage the content state.
 * It also includes static terms and conditions and privacy policy text.
 *
 * @function
 * @name TermsAndConditionsPage
 */
export default function TermsAndConditionsPage() {
  const [content, setContent] = useState("");

  const handleChange = (value: string) => {
    setContent(value);
  };
  return (
    <div className="bg-white p-4 rounded-md shadow-md font-poppins">
      <div className="text-primary-default text-xl mb-4">
        Syarat & Ketentuan
      </div>
      <div className="flex flex-col mb-4">
        <div className="bg-primary-default text-white p-2 rounded-t-md text-center">
          Syarat & Ketentuan
        </div>
        <ol className="border border-t-0 border-gray-200 p-4 rounded-b-md list-decimal list-inside">
          <li className="mb-4">
            Penggunaan Layanan: Pengguna wajib menggunakan layanan ini sesuai
            dengan ketentuan yang berlaku. Setiap pelanggaran terhadap aturan
            yang ditetapkan dapat mengakibatkan penghentian akun tanpa
            pemberitahuan sebelumnya.
          </li>
          <li className="mb-4">
            Kerahasiaan Data: Kami berkomitmen untuk menjaga kerahasiaan data
            pribadi Anda. Namun, kami tidak bertanggung jawab atas kehilangan
            data yang diakibatkan oleh pihak ketiga yang tidak berwenang.
          </li>
          <li className="mb-4">
            Kepatuhan Hukum: Dengan menggunakan layanan ini, Anda menyetujui
            untuk mematuhi semua peraturan perundang-undangan yang berlaku di
            wilayah hukum tempat Anda mengakses layanan ini.
          </li>
          <li className="mb-4">
            Pembatasan Tanggung Jawab: Kami tidak bertanggung jawab atas
            kerugian atau kerusakan yang timbul akibat penggunaan layanan ini,
            termasuk tetapi tidak terbatas pada gangguan sistem, virus, atau
            akses tidak sah ke data pribadi.
          </li>
          <li className="mb-4">
            Perubahan Syarat dan Ketentuan: Kami berhak untuk mengubah syarat
            dan ketentuan ini kapan saja tanpa pemberitahuan sebelumnya.
            Perubahan akan efektif segera setelah dipublikasikan di situs ini.
          </li>
          <li className="mb-4">
            Pengguna Terdaftar: Pengguna wajib mendaftarkan diri dengan
            informasi yang akurat dan terkini. Akun yang ditemukan menggunakan
            informasi palsu akan ditangguhkan tanpa pemberitahuan.
          </li>
          <li className="mb-4">
            Hak Kekayaan Intelektual: Semua konten yang tersedia dalam layanan
            ini, termasuk teks, gambar, dan logo, adalah milik kami atau pihak
            ketiga yang memiliki lisensi. Penggunaan tanpa izin tertulis
            dilarang keras.
          </li>
        </ol>
      </div>
      <div className="text-sm mb-2">Syarat dan Ketentuan</div>
      <QuillEditor content={content} setContent={handleChange} />

      <div className="flex flex-col mb-4 mt-4">
        <div className="bg-primary-default text-white p-2 rounded-t-md text-center">
          Kebijakan Privasi
        </div>
        <ol className="border border-t-0 border-gray-200 p-4 rounded-b-md list-decimal list-inside">
          <li className="mb-4">
            Penggunaan Layanan: Pengguna wajib menggunakan layanan ini sesuai
            dengan ketentuan yang berlaku. Setiap pelanggaran terhadap aturan
            yang ditetapkan dapat mengakibatkan penghentian akun tanpa
            pemberitahuan sebelumnya.
          </li>
          <li className="mb-4">
            Kerahasiaan Data: Kami berkomitmen untuk menjaga kerahasiaan data
            pribadi Anda. Namun, kami tidak bertanggung jawab atas kehilangan
            data yang diakibatkan oleh pihak ketiga yang tidak berwenang.
          </li>
          <li className="mb-4">
            Kepatuhan Hukum: Dengan menggunakan layanan ini, Anda menyetujui
            untuk mematuhi semua peraturan perundang-undangan yang berlaku di
            wilayah hukum tempat Anda mengakses layanan ini.
          </li>
          <li className="mb-4">
            Pembatasan Tanggung Jawab: Kami tidak bertanggung jawab atas
            kerugian atau kerusakan yang timbul akibat penggunaan layanan ini,
            termasuk tetapi tidak terbatas pada gangguan sistem, virus, atau
            akses tidak sah ke data pribadi.
          </li>
          <li className="mb-4">
            Perubahan Syarat dan Ketentuan: Kami berhak untuk mengubah syarat
            dan ketentuan ini kapan saja tanpa pemberitahuan sebelumnya.
            Perubahan akan efektif segera setelah dipublikasikan di situs ini.
          </li>
          <li className="mb-4">
            Pengguna Terdaftar: Pengguna wajib mendaftarkan diri dengan
            informasi yang akurat dan terkini. Akun yang ditemukan menggunakan
            informasi palsu akan ditangguhkan tanpa pemberitahuan.
          </li>
          <li className="mb-4">
            Hak Kekayaan Intelektual: Semua konten yang tersedia dalam layanan
            ini, termasuk teks, gambar, dan logo, adalah milik kami atau pihak
            ketiga yang memiliki lisensi. Penggunaan tanpa izin tertulis
            dilarang keras.
          </li>
        </ol>
      </div>
      <div className="text-sm mb-2">Syarat dan Ketentuan</div>
      <QuillEditor content={content} setContent={handleChange} />
    </div>
  );
}
