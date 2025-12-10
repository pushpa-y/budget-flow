import { useState,useEffect } from "react";
import Modal from "./Modal";
import type { Account } from "../../services/accounts";

type Props = {
  account: Account;
  onSave: (data: { name: string }) => void;
  isOpen: boolean;
  onClose: () => void;
};

export function EditAccountModal({ isOpen, onClose, account, onSave }:Props) {
  const [name, setName] = useState(account?.name ?? "");

   useEffect(() => {
    setName(account?.name ?? "");
  }, [account]);
  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2>Edit Account</h2>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 w-full mb-3"
      />

      <button
        className="bg-indigo-500 text-white px-4 py-2 rounded"
        onClick={() => onSave({ name })}
      >
        Save
      </button>
    </Modal>
  );
}
