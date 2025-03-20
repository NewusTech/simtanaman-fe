import FormInput from "@/components/ui/base/form-input";
import FormSelect from "@/components/ui/base/form-select";
import { Button } from "@/components/ui/button";
import DatePicker from "@/components/ui/date-picker";
import { XIcon } from "lucide-react";
import React, { useState } from "react";

/**
 * ModalProps is an interface for the properties of the modal component.
 * @interface
 */
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * PlantingSubmissionModal component renders a modal dialog with terms and conditions.
 *
 * @component
 * @param {ModalProps} props - The properties for the modal component.
 * @param {boolean} props.isOpen - Determines if the modal is open or closed.
 * @param {() => void} props.onClose - Function to call when the modal is closed.
 *
 * @returns {JSX.Element | null} The rendered modal component or null if not open.
 */
const PlantingSubmissionModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;
  const [formData, setFormData] = useState({
    tanggal: new Date(),
    jenis_tanaman: "",
    stok: ""
  });
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 w-3/4 md:w-1/2 lg:w-1/3">
        <div className="mb-4 flex flex-col gap-2">
          <div className="text-2xl font-semibold">Form Penerimaan</div>
          <div className="text-sm font-medium text-gray-400">Jika disetujui, silahkan masukan stok pupuk yang akan di kirim.</div>
        </div>

        <div className="flex flex-col">
          <div className="flex items-center justify-between gap-2 mb-4">
            <DatePicker
              label="Tanggal Penerimaan"
              date={formData.tanggal}
              onSelect={(date: Date) => setFormData({ ...formData, tanggal: date })}
            />
            <FormSelect label="Jenis Tanaman" value={["Padi", "Jagung"]} selected={formData.jenis_tanaman} required />
          </div>
          <FormInput
            label="Stok Tanaman"
            placeholder="Masukan Status Stok Tanaman"
            value={""}
            required
          />
        </div>

        <div className="mt-4 flex justify-end gap-4">
          <Button
            onClick={onClose}
            className="border border-primary-default rounded-full text-primary-default px-5"
          >
            Batal
          </Button>
          <Button
            onClick={() => { }}
            className="bg-primary-default rounded-full text-white px-5"
          >
            Kirim
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PlantingSubmissionModal;
