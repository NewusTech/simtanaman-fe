import FormSelect from "@/components/ui/base/form-select";
import FormTextArea from "@/components/ui/base/form-text-area";
import { Button } from "@/components/ui/button";
import { CircleCheckBig, CircleX, TriangleAlert, XIcon } from "lucide-react";
import React from "react";

/**
 * ModalProps is an interface for the properties of the modal component.
 * @interface
 */
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * PlantingStatusModal component renders a modal dialog with terms and conditions.
 *
 * @component
 * @param {ModalProps} props - The properties for the modal component.
 * @param {boolean} props.isOpen - Determines if the modal is open or closed.
 * @param {() => void} props.onClose - Function to call when the modal is closed.
 *
 * @returns {JSX.Element | null} The rendered modal component or null if not open.
 */
const PlantingStatusModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg w-3/4 md:w-1/2 lg:w-1/3">
        <div className="text-lg font-semibold mb-4 text-center flex justify-between bg-error-100 text-error-600 rounded-t-lg p-4">
          Konfirmasi Penolakan
          <XIcon className="h-6 w-6 cursor-pointer" onClick={onClose} />
        </div>
        <div className="flex items-center gap-4 p-4 mb-4">
          <CircleX className="h-20 w-20 text-error-600" />
          <div className="text-sm font-medium text-neutral-70">
            Apakah Anda yakin ingin menolak pengajuan ini? Jika ditolak,
            pengajuan akan dikembalikan dan tidak dapat diproses lebih
            lanjut. Harap berikan alasan penolakan.
          </div>
        </div>

        <div className="m-5">
          <FormTextArea
            label="Alasan Ditolak"
            value=""
            placeholder="Masukan Catatan"
            required
          />
        </div>

        <div className="mt-4 flex justify-end m-5 gap-4">
          <Button
            onClick={onClose}
            className="border border-neutral-70 rounded-full text-neutral-60"
          >
            Batal
          </Button>
          <Button
            onClick={() => { }}
            className="bg-error-500 rounded-full text-white"
          >
            Tolak
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PlantingStatusModal;
