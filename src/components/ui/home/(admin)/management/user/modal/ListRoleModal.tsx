import FormSelect from "@/components/ui/base/form-select";
import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";
import React from "react";
import TreeTableRole from "../TreeTableRole";

/**
 * ModalProps is an interface for the properties of the modal component.
 * @interface
 */
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * FilterModal component renders a modal dialog with terms and conditions.
 *
 * @component
 * @param {ModalProps} props - The properties for the modal component.
 * @param {boolean} props.isOpen - Determines if the modal is open or closed.
 * @param {() => void} props.onClose - Function to call when the modal is closed.
 *
 * @returns {JSX.Element | null} The rendered modal component or null if not open.
 */
const ListRoleModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 w-auto">
        <h2 className="text-2xl font-semibold mb-4 text-center flex justify-end">
          <XIcon className="h-6 w-6 cursor-pointer" onClick={onClose} />
        </h2>

        <div className="flex flex-col gap-4 md:flex-row md:gap-6">
          <TreeTableRole />
        </div>

        <div className="mt-4 flex justify-end">
          <Button
            onClick={() => {}}
            className="bg-primary-default rounded-full text-white"
          >
            Filter
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ListRoleModal;
