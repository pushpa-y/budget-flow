import Modal from "./Modal";
import AddAccountForm from "../forms/AddAccountForm";


type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const AddAccountModal = ({ isOpen, onClose }: Props) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <h2 className="text-xl font-semibold mb-3">Add New Account</h2>
    <AddAccountForm onClose={onClose} />
  </Modal>
);
