"use client";

import FormInput from "@/components/ui/base/form-input";
import FormLabel from "@/components/ui/base/form-label";
import FormSelect from "@/components/ui/base/form-select";
import FormTextArea from "@/components/ui/base/form-text-area";
import ImageUploader from "@/components/ui/base/image-upload";
import { Checkbox } from "@/components/ui/checkbox";
import DatePicker from "@/components/ui/date-picker";
import { useAuth } from "@/hooks/useAuth";
import {
  fetchHakAksesData,
  fetchHakAksesDataById,
  postHakAksesData,
  putHakAksesData,
} from "@/lib/management-user/hakAksesFetching";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Bounce, toast } from "react-toastify";

/**
 * AddAdminPage component renders a form for adding a new farmer.
 *
 * @component
 * @example
 * return (
 *   <AddAdminPage />
 * )
 *
 * @returns {JSX.Element} The rendered AddAdminPage component.
 */
export default function AddAdminPage({ params }: { params: { slug: string } }) {
  const { getToken } = useAuth();
  const token = getToken();
  const router = useRouter();
  const pathname = usePathname();
  const [formData, setFormData] = useState({
    name: "",
  });
  const [messageError, setMessageError] = useState<
    Record<keyof typeof formData, string | null>
  >({
    name: null,
  });
  const [isLoading, setIsLoading] = useState(false);

  const clearMessageError = () => {
    setMessageError({
      name: null,
    });
  };

  const clearFormData = () => {
    setFormData({
      name: "",
    });
  };

  const [listRole, setRole] = useState([
    {
      name: "Dashboard",
      child: [
        {
          name: "View",
          checked: true,
        },
        {
          name: "Create",
          checked: false,
        },
        {
          name: "Edit",
          checked: true,
        },
        {
          name: "Delete",
          checked: false,
        },
      ],
    },
    {
      name: "Pengajuan Aspirasi",
      child: [
        {
          name: "View",
          checked: true,
        },
        {
          name: "Create",
          checked: false,
        },
        {
          name: "Edit",
          checked: true,
        },
        {
          name: "Delete",
          checked: false,
        },
      ],
    },
    {
      name: "Riwayat Pengajuan",
      child: [
        {
          name: "View",
          checked: true,
        },
        {
          name: "Create",
          checked: false,
        },
        {
          name: "Edit",
          checked: true,
        },
        {
          name: "Delete",
          checked: false,
        },
      ],
    },
    {
      name: "Forum Diskusi",
      child: [
        {
          name: "View",
          checked: true,
        },
        {
          name: "Create",
          checked: false,
        },
        {
          name: "Edit",
          checked: true,
        },
        {
          name: "Delete",
          checked: false,
        },
      ],
    },
    {
      name: "Laporan",
      child: [
        {
          name: "View",
          checked: true,
        },
        {
          name: "Create",
          checked: false,
        },
        {
          name: "Edit",
          checked: true,
        },
        {
          name: "Delete",
          checked: false,
        },
      ],
    },
    {
      name: "Data Master",
      child: [
        {
          name: "View",
          checked: true,
        },
        {
          name: "Create",
          checked: false,
        },
        {
          name: "Edit",
          checked: true,
        },
        {
          name: "Delete",
          checked: false,
        },
      ],
    },
    {
      name: "Kelola Akun",
      child: [
        {
          name: "View",
          checked: true,
        },
        {
          name: "Create",
          checked: false,
        },
        {
          name: "Edit",
          checked: true,
        },
        {
          name: "Delete",
          checked: false,
        },
      ],
    },
  ]);

  const handleSimpan = async () => {
    setIsLoading(true);
    clearMessageError();

    if (params.slug === "Tambah") {
      await postHakAksesData(formData, String(token))
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
          router.push("/home/management/user/access");
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
      const id = Number(new URLSearchParams(window.location.search).get("id"));
      await putHakAksesData(id, formData, String(token))
        .then((response) => {
          if (!response.ok) {
            response.json().then((errorData) => {
              setMessageError(errorData.data);
            });

            throw new Error("Failed to update data");
          }
          return response.json();
        })
        .then((data) => {
          toast.success("Data berhasil diupdate", {
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
          router.push("/home/management/user/access");
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
    if (params.slug !== "Tambah") {
      const id = Number(new URLSearchParams(window.location.search).get("id"));
      fetchHakAksesDataById(id, String(token))
        .then((data) => {
          setFormData({
            name: data.name,
          });
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, [params.slug, token]);
  return (
    <div className="bg-white p-4 rounded-md shadow-md">
      <div className="text-lg font-medium">
        {pathname.split("/").pop()} Role
      </div>
      <div className="flex flex-col items-start mt-4 w-full gap-4 mb-4">
        {params.slug !== "Detail" && (
          <FormInput
          label="Role"
          placeholder="Masukan Nama Role"
          value={formData.name}
          onChange={(value: string) =>
            setFormData({ ...formData, name: value })
          }
          errorMessage={messageError.name}
          required
        />
        )} 
        {params.slug === "Detail" && (
          <FormLabel label="Role"  
          value={formData.name}
          />
        )}

        <div className="flex flex-col items-center w-full gap-4">
          {listRole.map((role, index) => (
            <div
              key={index}
              className="w-full flex flex-col items-start gap-4 mb-4"
            >
              <div className="flex items-center w-full gap-4">
                <div className="text-sm font-medium w-1/4">{role.name}</div>
                <div className="w-full flex justify-between flex-wrap gap-4">
                  {role.child.map((child, childIndex) => (
                    <div
                      key={childIndex}
                      className="flex items-center gap-2 p-2 px-3"
                    >
                      <Checkbox
                        checked={child.checked}
                        onCheckedChange={() => {
                          const updateChecked = (items: any[]): any[] => {
                            return items.map((item: any) => {
                              if (item.name === child.name) {
                                return { ...item, checked: !item.checked };
                              }
                              return item;
                            });
                          };
                          setRole((prev) => {
                            return prev.map((item) => {
                              if (item.name === role.name) {
                                return {
                                  ...item,
                                  child: updateChecked(item.child),
                                };
                              }
                              return item;
                            });
                          });
                        }}
                      />
                      <span className="text-nowrap text-sm">{child.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {pathname.split("/").pop() !== "Detail" && (
        <div className="flex justify-center mt-4">
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
            <button
              className="bg-primary-500 text-white rounded-full py-2 px-4"
              onClick={handleSimpan}
            >
              {isLoading ? "Loading..." : "Simpan"}
            </button>
          </div>
        </div>
      )}
      { pathname.split("/").pop() === "Detail" &&
        <div className="flex justify-end mt-4">
          <div className="flex gap-4">
            <button
              onClick={() => {
                clearFormData();
                router.back();
              }}
              className="border border-primary-default text-primary-default rounded-full py-2 px-4"
            >
              Kembali
            </button>
          </div>
        </div>
      }
    </div>
  );
}
