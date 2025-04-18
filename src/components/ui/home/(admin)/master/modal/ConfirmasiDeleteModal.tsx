import FormInput from "@/components/ui/base/form-input";
import FormSelect from "@/components/ui/base/form-select";
import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";
import React from "react";

/**
 * ModalProps is an interface for the properties of the modal component.
 * @interface
 */
interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onBatal: () => void;
    onSimpan: () => void;
    status?: string;
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
const TypePlantModal: React.FC<ModalProps> = ({ isOpen, onClose, onBatal, onSimpan, status }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg p-6 w-3/4 md:w-1/2 lg:w-1/3">
                <h2 className="text-2xl font-semibold mb-4 text-center flex justify-between items-center">
                    Hapus Data {status}
                    <XIcon className="h-6 w-6 cursor-pointer" onClick={onClose} />
                </h2>

                <div className="flex flex-col gap-4 md:flex-row md:gap-6">
                    <span className="text-lg text-gray-600">
                        Apakah Anda yakin ingin menghapus data ini? <br />
                        Data yang dihapus tidak dapat dikembalikan.
                    </span>
                </div>

                <div className="mt-4 flex justify-end gap-4">
                    <Button
                        onClick={onBatal}
                        className="border border-error-300 rounded-full text-error-300 px-5"
                    >
                        Batal
                    </Button>
                    <Button
                        onClick={onSimpan}
                        className="bg-error-500 rounded-full text-white px-5"
                    >
                        Hapus
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default TypePlantModal;
