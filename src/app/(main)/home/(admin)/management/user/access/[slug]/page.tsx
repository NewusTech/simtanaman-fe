"use client";

import FormInput from "@/components/ui/base/form-input";
import FormSelect from "@/components/ui/base/form-select";
import FormTextArea from "@/components/ui/base/form-text-area";
import ImageUploader from "@/components/ui/base/image-upload";
import { Checkbox } from "@/components/ui/checkbox";
import DatePicker from "@/components/ui/date-picker";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

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
export default function AddAdminPage() {
  const router = useRouter();
  const pathname = usePathname();
  const [formData, setFormData] = useState({
    name: "",
    role: [],
  });

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

  const clearFormData = () => {
    setFormData({
      name: "",
      role: [],
    });
  };

  return (
    <div className="bg-white p-4 rounded-md shadow-md">
      <div className="text-lg font-medium">
        {pathname.split("/").pop()} Role
      </div>
      <div className="flex flex-col items-start mt-4 w-full gap-4 mb-4">
        <FormInput
          label="Role"
          placeholder="Masukan Nama Role"
          value={formData.name}
          required
        />

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
            <button className="bg-primary-500 text-white rounded-full py-2 px-4">
              Simpan
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
