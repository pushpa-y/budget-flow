import React, { useState } from "react";
import { useAccounts } from "../../context/AccountsContext";

type Props = {
  onClose: () => void;
};

export default function AddAccountForm({ onClose }: Props) {
  const { create } = useAccounts();
  const [name, setName] = useState("");
  const [balance, setBalance] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;
    await create({ name, balance: Number(balance) || 0 });
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 items-end">
      <div className="flex-1 flex flex-col">
        <label className="text-sm font-medium">Account Name</label>
        <input
          type="text"
          placeholder="Account Name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
          className="border p-2 rounded"
        />
      </div>

      <div className="flex-1 flex flex-col">
        <label className="text-sm font-medium">Initial Balance</label>
        <input
          type="number"
          placeholder="Initial Balance"
          value={balance}
          onChange={e => setBalance((e.target.value))}
          className="border p-2 rounded"
        />
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 bg-gray-300 rounded"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-600 text-white rounded"
        >
          Add Account
        </button>
      </div>
    </form>
  );
}
