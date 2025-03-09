/**
 * TermsAndConditionsModal component renders a modal dialog with terms and conditions.
 *
 * @component
 * @param {ModalProps} props - The properties for the modal component.
 * @param {boolean} props.isOpen - Determines if the modal is open or closed.
 * @param {() => void} props.onClose - Function to call when the modal is closed.
 *
 * @returns {JSX.Element | null} The rendered modal component or null if not open.
 */
import React from "react";
import { Button } from "../../button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TermsAndConditionsModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 w-3/4 md:w-1/2 lg:w-1/3">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Syarat & Ketentuan
        </h2>
        <div>
          <div className="text-lg font-semibold mb-2">Syarat</div>
          <div>
            Lorem ipsum dolor sit amet consectetur. Risus neque at tincidunt
            dignissim scelerisque iaculis. Congue mauris turpis mi malesuada.
            Duis nec et ut fermentum risus urna suscipit. Odio ut a eu donec
            turpis. Lorem ipsum dolor sit amet consectetur. Risus neque at
            tincidunt dignissim scelerisque iaculis. Congue mauris turpis mi
            malesuada. Duis nec et ut fermentum risus urna suscipit. Odio ut a
            eu donec turpis.
          </div>
          <div className="text-lg font-semibold mb-2">Ketentuan</div>
          <div>
            Lorem ipsum dolor sit amet consectetur. Risus neque at tincidunt
            dignissim scelerisque iaculis. Congue mauris turpis mi malesuada.
            Duis nec et ut fermentum risus urna suscipit. Odio ut a eu donec
            turpis. Lorem ipsum dolor sit amet consectetur. Risus neque at
            tincidunt dignissim scelerisque iaculis. Congue mauris turpis mi
            malesuada. Duis nec et ut fermentum risus urna suscipit. Odio ut a
            eu donec turpis.
          </div>
        </div>
        <div className="mt-4 flex justify-center">
          <Button
            onClick={onClose}
            className="bg-primary-default rounded-full text-white"
          >
            Mengerti
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditionsModal;
