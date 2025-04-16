"use client";

import FormInput from "@/components/ui/base/form-input";
import FormLabel from "@/components/ui/base/form-label";
import FormSelect from "@/components/ui/base/form-select";
import FormTextArea from "@/components/ui/base/form-text-area";
import { useAuth } from "@/hooks/useAuth";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Bounce, toast } from "react-toastify";
import { number } from "zod";

/**
 * ComponentPage is a React functional component that renders a form for managing Poktan data.
 * It conditionally renders either a form for creating or editing Poktan data or a detailed view of Poktan data based on the URL path.
 *
 * @component
 * @example
 * // Usage example:
 * // <ComponentPage />
 *
 * @returns {JSX.Element} The rendered component.
 *
 * @remarks
 * This component uses the Next.js `useRouter` and `usePathname` hooks to navigate and determine the current path.
 * It maintains form data in the local state using the `useState` hook.
 *
 * @function
 * @name ComponentPage
 *
 * @typedef {Object} FormData
 * @property {string} name - The name of the Poktan.
 * @property {string} total_anggota - The total number of members in the Poktan.
 * @property {string} kelurahan - The kelurahan of the Poktan.
 * @property {string} latitude - The latitude coordinate of the Poktan.
 * @property {string} longitude - The longitude coordinate of the Poktan.
 * @property {string} ketua_poktan - The leader of the Poktan.
 * @property {string} kecamatan - The kecamatan of the Poktan.
 * @property {string} desa - The desa of the Poktan.
 * @property {string} alamat - The address of the Poktan.
 *
 * @typedef {Object} FormInputProps
 * @property {string} label - The label for the input field.
 * @property {string} placeholder - The placeholder text for the input field.
 * @property {string} value - The value of the input field.
 * @property {boolean} required - Whether the input field is required.
 *
 * @typedef {Object} FormSelectProps
 * @property {string} label - The label for the select field.
 * @property {string[]} value - The options for the select field.
 * @property {string} selected - The selected value of the select field.
 * @property {boolean} required - Whether the select field is required.
 *
 * @typedef {Object} FormTextAreaProps
 * @property {string} label - The label for the textarea field.
 * @property {string} placeholder - The placeholder text for the textarea field.
 * @property {string} value - The value of the textarea field.
 * @property {boolean} required - Whether the textarea field is required.
 *
 * @typedef {Object} FormLabelProps
 * @property {string} label - The label for the form label.
 * @property {string} value - The value of the form label.
 */
export default function ComponentPage(
  {
    params
  }: {
    params: { slug: string }
  }
) {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);
  const { getToken } = useAuth();
  const token = getToken();
  const [messageError, setMessageError] = useState<Record<keyof typeof formData, string | null>>({
    name: null,
    totalAnggota: null,
    kelurahan: null,
    latitude: null,
    longitude: null,
    ketuaPoktan: null,
    kecamatan: null,
    desa: null,
    alamat: null,
  });

  const clearMessageError = () => {
    setMessageError({
      name: null,
      totalAnggota: null,
      kelurahan: null,
      latitude: null,
      longitude: null,
      ketuaPoktan: null,
      kecamatan: null,
      desa: null,
      alamat: null,
    });
  };

  const [formData, setFormData] = useState({
    name: "",
    totalAnggota: 0,
    kelurahan: "",
    latitude: 0,
    longitude: 0,
    ketuaPoktan: "",
    kecamatan: "",
    desa: "",
    alamat: "",
  });
  const clearFormData = () => {
    setFormData({
      name: "",
      totalAnggota: 0,
      kelurahan: "",
      latitude: 0,
      longitude: 0,
      ketuaPoktan: "",
      kecamatan: "",
      desa: "",
      alamat: "",
    });
  };

  const handleSimpan = async () => {
    setIsLoading(true);
    clearMessageError();
    console.log(formData);

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}master/poktan`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          // console.log(errorData.data);
          response.json().then((errorData) => {
            setMessageError(errorData.data);
          });

          throw new Error('Failed to save data');
        }
        return response.json();
      })
      .then((data) => {
        toast.success('Data berhasil disimpan', {
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

        clearFormData();
        setIsLoading(false);
        router.push('/home/master/poktan');
      })
      .catch((error) => {
        setIsLoading(false);
        console.error('Error:', error);
        toast.error(`${error}`, {
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
      });
  };

  return (
    <div>
      <div className="bg-white p-4 rounded-md shadow-md font-poppins">
        {(params.slug !== "Detail" && (
          <div>
            {/* header */}
            <div className="text-lg font-medium">
              {params.slug} Poktan
            </div>
            {/* end of header */}

            {/* body */}
            <div className="flex flex-col md:flex-row justify-between items-start mt-4 w-full gap-4 mb-4">
              <div className="flex flex-col items-center w-full gap-4">
                <FormInput
                  label="Nama Lengkap"
                  placeholder="Masukan Nama Lengkap"
                  value={formData.name}
                  onChange={(value: string) => setFormData({ ...formData, name: value })}
                  errorMessage={messageError.name}
                  required
                />
                <FormInput
                  label="Total Anggota"
                  placeholder="Masukan Total Anggota"
                  value={String(formData.totalAnggota)}
                  type="number"
                  onChange={(value: string) => setFormData({ ...formData, totalAnggota: Number(value) })}
                  errorMessage={messageError.totalAnggota}
                  required
                />
                <FormSelect
                  label="Kelurahan"
                  value={["Kel. Sukaraja", "Kel. Sukawana"]}
                  selected={formData.kelurahan}
                  onChange={(value: string) => setFormData({ ...formData, kelurahan: value })}
                  errorMessage={messageError.kelurahan}
                  required
                />
                <FormInput
                  label="Longitude"
                  type="number"
                  placeholder="Masukan Longitude"
                  value={String(formData.longitude)}
                  onChange={(value: string) => setFormData({ ...formData, longitude: Number(value) })}
                  errorMessage={messageError.longitude}
                  required
                />
              </div>
              <div className="flex flex-col items-center w-full gap-4">
                <FormInput
                  label="Ketua Poktan"
                  placeholder="Masukan Ketua Poktan"
                  value={formData.ketuaPoktan}
                  onChange={(value: string) => setFormData({ ...formData, ketuaPoktan: value })}
                  errorMessage={messageError.ketuaPoktan}
                  required
                />
                <FormSelect
                  label="kecamatan"
                  value={["Kec. Sukaraja", "Kec. Sukawana"]}
                  selected={formData.kecamatan}
                  onChange={(value: string) => setFormData({ ...formData, kecamatan: value })}
                  errorMessage={messageError.kecamatan}
                  required
                />
                <FormSelect
                  label="Desa"
                  value={["SAJARANA", "SUKASARI"]}
                  selected={formData.desa}
                  errorMessage={messageError.desa}
                  onChange={(value: string) => setFormData({ ...formData, desa: value })}
                />
                <FormInput
                  label="Latitude"
                  type="number"
                  placeholder="Masukan Latitude"
                  errorMessage={messageError.latitude}
                  value={String(formData.latitude)}
                  onChange={(value: string) => setFormData({ ...formData, latitude: Number(value) })}
                  required
                />
              </div>
            </div>
            <FormTextArea
              label="Alamat"
              placeholder="Masukan Alamat"
              errorMessage={messageError.alamat}
              onChange={(value: string) => setFormData({ ...formData, alamat: value })}
              value={formData.alamat}
              required
            />
            {/* end of body */}
            <div className="flex justify-end mt-4">
              <div className="flex gap-4">
                <button
                  onClick={() => {
                    clearFormData();
                    router.back();
                  }}
                  className="border border-primary-default text-primary-default rounded-full py-2 px-4"
                >
                  Batal
                </button>
                <button className="bg-primary-500 text-white rounded-full py-2 px-4" onClick={handleSimpan}>
                  {isLoading ? (
                    "Loading..."
                  ) : (
                    "Simpan"
                  )}
                </button>
              </div>
            </div>
          </div>
        )) || (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <FormLabel label="Nama Lengkap" value="John Doe" />
                <FormLabel label="Ketua Poktan" value="John Doe" />
                <FormLabel label="Total Anggota" value="12" />
                <FormLabel label="Kecamatan" value="Ciranda" />
                <FormLabel label="Kelurahan" value="Ciranda" />
                <FormLabel label="Desa" value="Ciranda" />
                <FormLabel label="Longitude" value="102.1231231" />
                <FormLabel label="Latitude" value="-6.1232131" />
              </div>
              <FormLabel label="Alamat" value="Jl. Jalan" />
            </div>
          )}
      </div>
    </div>
  );
}
