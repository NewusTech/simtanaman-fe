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
  status: string;
  setStatus: (status: string, alasan:string) => void;
}

/**
 * SubmissionStatusModal component renders a modal dialog with terms and conditions.
 *
 * @component
 * @param {ModalProps} props - The properties for the modal component.
 * @param {boolean} props.isOpen - Determines if the modal is open or closed.
 * @param {() => void} props.onClose - Function to call when the modal is closed.
 *
 * @returns {JSX.Element | null} The rendered modal component or null if not open.
 */
const SubmissionStatusModal: React.FC<ModalProps & { setFormData?: (data: any) => void }> = ({
  isOpen,
  onClose,
  status,
  setStatus
}) => {
  if (!isOpen) return null;
  const [formData, setFormData] = React.useState({
    alasanRevisi: "",
    alasanDitolak: ""
  });
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      {(status === "setujui" && (
        <div className="bg-white rounded-lg w-3/4 md:w-1/2 lg:w-1/3">
          <div className="text-lg font-semibold mb-4 text-center flex justify-between bg-success-100 text-success-700 rounded-t-lg p-4">
            Setujui Pengajuan
            <XIcon className="h-6 w-6 cursor-pointer" onClick={onClose} />
          </div>
          <div className="flex items-center gap-4 p-4">
            <CircleCheckBig className="h-20 w-20 text-success-700" />
            <div className="text-sm font-medium text-neutral-70">
              Apakah Anda yakin data sudah benar dan sesuai ketentuan?. Jika
              sudah, silakan klik button setujui untuk menyelesaikan proses ini.
            </div>
          </div>

          <div className="mt-4 flex justify-end m-5 gap-4">
            <Button
              onClick={onClose}
              className="border border-neutral-70 rounded-full text-neutral-60"
            >
              Batal
            </Button>
            <Button
              onClick={() => setStatus("Disetujui",  "")}
              className="bg-success-700 rounded-full text-white"
            >
              Setujui
            </Button>
          </div>
        </div>
      )) ||
        (status === "direvisi" && (
          <div className="bg-white rounded-lg w-3/4 md:w-1/2 lg:w-1/3">
            <div className="text-lg font-semibold mb-4 text-center flex justify-between bg-warning-100 text-warning-500 rounded-t-lg p-4">
              Revisi Pengajuan
              <XIcon className="h-6 w-6 cursor-pointer" onClick={onClose} />
            </div>
            <div className="flex items-center gap-4 p-4 mb-4">
              <TriangleAlert className="h-20 w-20 text-warning-500" />
              <div className="text-sm font-medium text-neutral-70">
                Apakah Anda yakin ingin revisi data ini?.Harap berikan alasan
                penolakan.
              </div>
            </div>

            <div className="m-5">
              <FormTextArea
                label="Alasan Revisi"
                value={formData.alasanRevisi || ""}
                placeholder="Masukan Catatan"
                onChange={(e: string) =>
                  setFormData({
                    ...formData,
                    alasanRevisi: e
                  })
                }
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
                onClick={() => setStatus("Direvisi", formData.alasanRevisi || "")}
                className="bg-warning-500 rounded-full text-white"
              >
                Revisi
              </Button>
            </div>
          </div>
        )) ||
        (status === "ditolak" && (
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
                value={formData.alasanDitolak || ""}
                placeholder="Masukan Catatan"
                onChange={(e: string) =>
                  setFormData({
                    ...formData,
                    alasanDitolak: e
                  })
                }
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
                onClick={() => setStatus("Ditolak", formData.alasanDitolak || "")}
                className="bg-error-500 rounded-full text-white"
              >
                Tolak
              </Button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default SubmissionStatusModal;
