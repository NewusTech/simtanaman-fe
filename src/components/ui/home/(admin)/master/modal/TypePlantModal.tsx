import FormInput from "@/components/ui/base/form-input";
import FormLabel from "@/components/ui/base/form-label";
import FormSelect from "@/components/ui/base/form-select";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { postJenisTanamanData } from "@/lib/master/jenisTanamanFetching";
import { error } from "console";
import { XIcon } from "lucide-react";
import React, { useState } from "react";
import { Bounce, toast } from "react-toastify";

/**
 * ModalProps is an interface for the properties of the modal component.
 * @interface
 */
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  onChange: (value: string) => void;
  status?: string;
  value?: string;
  errorMessage?: string | null;
  isLoading?: boolean;
}

/**
 * TypePlantModal component renders a modal dialog with terms and conditions.
 *
 * @component
 * @param {ModalProps} props - The properties for the modal component.
 * @param {boolean} props.isOpen - Determines if the modal is open or closed.
 * @param {() => void} props.onClose - Function to call when the modal is closed.
 *
 * @returns {JSX.Element | null} The rendered modal component or null if not open.
 */
const TypePlantModal: React.FC<ModalProps> = ({ isOpen, onClose, status, value, errorMessage, isLoading, onSubmit, onChange }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 w-3/4 md:w-1/2 lg:w-1/3">
        <h2 className="text-2xl font-semibold mb-4 text-center flex justify-between items-center">
          {status} Jenis Tanaman
          <XIcon className="h-6 w-6 cursor-pointer" onClick={onClose} />
        </h2>

        <div className="flex flex-col gap-4 md:flex-row md:gap-6">
          {
            status === "Detail" ? (<FormLabel label="Jenis Tanaman" value={value ?? ''} />) : (<FormInput
              label="Jenis Tanaman"
              placeholder="Masukan Jenis Tanaman"
              value={value ?? ''}
              onChange={onChange}
              type="text"
              errorMessage={errorMessage}
              required
            />)
          }


        </div>

        <div className="mt-4 flex justify-end gap-4">
          <Button
            onClick={onClose}
            className="border border-primary-default rounded-full text-primary-default px-5"
          >
            {status === 'Tambah' || status === 'Edit' ? 'Batal' : 'Tutup'}
          </Button>
          {status === 'Tambah' || status === 'Edit' ? (<Button
            onClick={onSubmit}
            disabled={isLoading}
            className="bg-primary-default rounded-full text-white px-5"
          >
            {isLoading ? 'Loading...' : 'Simpan'}
          </Button>) : (<div></div>)}

        </div>
      </div>
    </div>
  );
};

export default TypePlantModal;
