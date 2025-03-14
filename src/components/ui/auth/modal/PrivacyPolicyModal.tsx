import React from "react";
import { Button } from "../../button";

/**
 * ModalProps is an interface for the properties of the modal component.
 * @interface
 */
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * PrivacyPolicyModal component renders a modal dialog with terms and conditions.
 *
 * @component
 * @param {ModalProps} props - The properties for the modal component.
 * @param {boolean} props.isOpen - Determines if the modal is open or closed.
 * @param {() => void} props.onClose - Function to call when the modal is closed.
 *
 * @returns {JSX.Element | null} The rendered modal component or null if not open.
 */
const PrivacyPolicyModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 w-3/4 md:w-1/2 lg:w-1/3">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Kebijakan Privasi
        </h2>
        <div className="text-sm font-normal mb-2">
          Lorem ipsum dolor sit amet consectetur. Arcu sagittis at nibh est in
          eu neque. Commodo arcu feugiat augue fringilla hac duis viverra urna.
          Commodo ullamcorper bibendum sed faucibus volutpat lorem dignissim.
          Sollicitudin morbi egestas purus proin ultricies bibendum. Sed
          facilisi amet urna senectus libero sit non sagittis. Blandit quis
          imperdiet ut purus lorem habitant et lacus. Elit et est scelerisque
          congue vulputate malesuada sed quis. Pellentesque ornare nisl
          porttitor vulputate varius consequat mi turpis ut. Eu maecenas eu at
          turpis libero faucibus. Pellentesque in at laoreet urna. Ultrices
          auctor vestibulum ac suspendisse enim tristique nullam tincidunt.
          Semper ultricies et amet aliquam. Arcu et lorem eu venenatis rutrum
          donec tempor. Suspendisse urna suspendisse bibendum consequat eu
          vestibulum. Praesent vel cursus fusce massa. Ante elementum
          pellentesque sed convallis habitant. Vel mattis platea egestas lacus
          etiam. Sem mauris ultrices eget donec in porta. Egestas mattis
          adipiscing blandit erat dui tempus vulputate. Morbi mauris odio
          accumsan a. Sed nunc est lacus urna massa imperdiet. Nulla integer
          congue bibendum libero. Tincidunt a etiam viverra metus vel egestas et
          viverra.
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

export default PrivacyPolicyModal;
