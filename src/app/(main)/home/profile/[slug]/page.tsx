"use client";

import FormInput from "@/components/ui/base/form-input";
import FormSelect from "@/components/ui/base/form-select";
import FormTextArea from "@/components/ui/base/form-text-area";
import { Button } from "@/components/ui/button";
import DatePicker from "@/components/ui/date-picker";
import { useAuth } from "@/hooks/useAuth";
import {
  fetchProfileData,
  updatePasswordData,
  updateProfileData,
} from "@/lib/profile/profileFetching";
import { Images } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Bounce, toast } from "react-toastify";

export default function ComponentPage() {
  const { getToken } = useAuth();
  const token = getToken();
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<string | ArrayBuffer | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    nik: "",
    nip: "",
    email: "",
    tanggalLahir: new Date(),
    jenisKelamin: "",
    alamat: "",
    noTelepon: "",
  });
  const [formPasswordData, setFormPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [messageError, setMessageError] = useState<
    Record<keyof typeof formData, string | null>
  >({
    name: "",
    nik: "",
    nip: "",
    email: "",
    tanggalLahir: "",
    jenisKelamin: "",
    alamat: "",
    noTelepon: "",
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
  const clearMessageError = () => {
    setMessageError({
      name: "",
      nik: "",
      nip: "",
      email: "",
      tanggalLahir: "",
      jenisKelamin: "",
      alamat: "",
      noTelepon: "",
    });
  };
  const fetchPage = async () => {
    if (loading) return;
    setLoading(true);
    const data = await fetchProfileData(String(token));
    if (data) {
      setFormData({
        email: data.email,
        name: data.name,
        nik: data.profile.nik,
        nip: data.profile.nip ?? "-",
        noTelepon: data.profile.noTelepon ?? "-",
        alamat: data.profile.alamat ?? "-",
        jenisKelamin: data.profile.jenisKelamin ?? "-",
        tanggalLahir: new Date(data.profile.tanggalLahir) ?? new Date(),
      });
    } else {
      console.error("Failed to fetch data");
    }
    setLoading(false);
  };
  const clearFormData = () => {
    setFormData({
      name: "",
      nik: "",
      nip: "",
      email: "",
      tanggalLahir: new Date(),
      jenisKelamin: "",
      alamat: "",
      noTelepon: "",
    });
  };

  const handleSimpan = async () => {
    setIsLoading(true);
    clearMessageError();

    if (pathname.split("/").pop() == "Edit") {
      console.log(formData);

      var data = {
        alamat: formData.alamat,
        jenisKelamin: formData.jenisKelamin,
        noTelepon: formData.noTelepon,
        tanggalLahir: formData.tanggalLahir,
        nik: formData.nik,
      };

      await updateProfileData(String(token), data)
        .then((response) => {
          if (!response.ok) {
            response.json().then((errorData) => {
              setMessageError(errorData.data);
            });

            throw new Error("Failed to save data");
          }
          return response.json();
        })
        .then((data) => {
          toast.success("Data berhasil disimpan", {
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
          router.push("/home/profile");
        })
        .catch((error) => {
          setIsLoading(false);
          console.error("Error:", error);
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
    } else {

      var dataPassword = {
        currentPassword: formPasswordData.currentPassword,
        newPassword: formPasswordData.newPassword,
        confirmNewPassword: formPasswordData.confirmNewPassword,
      };

      await updatePasswordData(String(token), dataPassword)
        .then((response) => {
          if (!response.ok) {
            response.json().then((errorData) => {
              setMessageError(errorData.data);
            });

            throw new Error("Failed to save data");
          }
          return response.json();
        })
        .then((data) => {
          toast.success("Data berhasil disimpan", {
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
          router.push("/home/profile");
        })
        .catch((error) => {
          setIsLoading(false);
          console.error("Error:", error);
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
    }
  };

  useEffect(() => {
    if (pathname.split("/").pop() == "Edit") {
      fetchPage();
    }
  }, []);
  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      {pathname.split("/").pop() == "Edit" ? (
        <div>
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
                  ) : (
                    <div>
                      {" "}
                      <Images></Images>{" "}
                    </div>
                  )}
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
              <Button
                onClick={() => {
                  router.back();
                }}
                className="border border-primary-default text-primary-default px-4 py-2 rounded-full mt-2 md:mt-0 md:ml-2"
              >
                Batal
              </Button>
              <Button
                onClick={() => handleSimpan()}
                className="bg-primary-default text-white px-4 py-2 rounded-full flex items-center"
              >
                {isLoading ? "Loading..." : "Simpan"}
              </Button>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-start mt-4 w-full gap-4 mb-4">
            <div className="flex flex-col items-center w-full gap-4">
              <FormInput
                label="Nama Lengkap"
                placeholder="Masukan Nama Lengkap"
                value={formData.name}
                onChange={(value: string) =>
                  setFormData({ ...formData, name: value })
                }
                errorMessage={messageError.name ?? ""}
                required
              />
              <DatePicker
                label="Tanggal Lahir"
                date={formData.tanggalLahir}
                onSelect={(date: Date) =>
                  setFormData({ ...formData, tanggalLahir: date })
                }
                required
                errorMessage={messageError.tanggalLahir ?? ""}
              />
              <FormInput
                label="NIP"
                placeholder="Masukan NIP"
                value={formData.nip}
                onChange={(value: string) =>
                  setFormData({ ...formData, nip: value })
                }
                type="number"
                errorMessage={messageError.nip ?? ""}
                required
              />
              <FormInput
                label="Nomor Telepon"
                placeholder="Masukan Nomor Telepon"
                value={formData.noTelepon}
                onChange={(value: string) =>
                  setFormData({ ...formData, noTelepon: value })
                }
                errorMessage={messageError.noTelepon ?? ""}
                required
              />
            </div>
            <div className="flex flex-col items-center w-full gap-4">
              <FormInput
                label="NIK"
                placeholder="Masukan NIK"
                value={formData.nik}
                onChange={(value: string) =>
                  setFormData({ ...formData, nik: value })
                }
                errorMessage={messageError.nik ?? ""}
                required
              />
              <FormSelect
                label="Jenis Kelamin"
                value={["L", "P"]}
                selected={formData.jenisKelamin}
                onChange={(value: string) =>
                  setFormData({ ...formData, jenisKelamin: value })
                }
                errorMessage={messageError.jenisKelamin ?? ""}
                required
              />
              <FormInput
                label="Email"
                placeholder="Masukan Email"
                value={formData.email}
                onChange={(value: string) =>
                  setFormData({ ...formData, email: value })
                }
                errorMessage={messageError.email ?? ""}
                required
              />
              <FormTextArea
                label="Alamat"
                value={formData.alamat}
                onChange={(value: string) =>
                  setFormData({ ...formData, alamat: value })
                }
                errorMessage={messageError.email ?? ""}
                required
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <div className="text-lg font-medium">Ubah Kata Sandi</div>
          <FormInput
            label="Kata Sandi Lama"
            placeholder="Masukan Kata Sandi Lama"
            value={formPasswordData.currentPassword}
            onChange={(value: string) =>
              setFormPasswordData({
                ...formPasswordData,
                currentPassword: value,
              })
            }
            required
            type="password"
          />
          <FormInput
            label="Kata Sandi Baru"
            placeholder="Masukan Kata Sandi Baru"
            value={formPasswordData.newPassword}
            onChange={(value: string) =>
              setFormPasswordData({ ...formPasswordData, newPassword: value })
            }
            required
            type="password"
          />
          <FormInput
            label="Konfirmasi Kata Sandi Baru"
            placeholder="Masukan Konfirmasi Kata Sandi Baru"
            value={formPasswordData.confirmNewPassword}
            onChange={(value: string) =>
              setFormPasswordData({
                ...formPasswordData,
                confirmNewPassword: value,
              })
            }
            required
            type="password"
          />
          <div className="flex justify-end gap-4">
            <Button
              onClick={() => {
                router.back();
              }}
              className="border border-primary-default text-primary-default px-4 py-2 rounded-full mt-2 md:mt-0 md:ml-2"
            >
              Batal
            </Button>
            <Button
              onClick={() => handleSimpan()}
              className="bg-primary-default text-white px-4 py-2 rounded-full flex items-center"
            >
              {isLoading ? "Loading..." : "Simpan"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
