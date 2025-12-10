import React from "react";
import {Form} from  "../../styles/EntryFormEdit"
import type { Account } from "../../services/accounts";

type Props = {
  editValue: string;
  editEntryType: "income" | "expense";
  editDueDate: string;
  editNotes: string;
  editAccountId?: string;
  editCategory: string;
  accounts: Account[];
  setEditValue: (n: string) => void;
  setEditEntryType: (n: "income" | "expense") => void;
  setEditDueDate: (s: string) => void;
  setEditNotes: (s: string) => void;
  setEditAccountId: (id: string | null) => void
  setEditCategory: (s: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
};

export default function EntryFormEdit({
  editValue,
  editEntryType,
  editDueDate,
  editNotes,
  editAccountId,
  editCategory,
  accounts,
  setEditValue,
  setEditEntryType,
  setEditDueDate,
  setEditNotes,
  setEditAccountId,
  setEditCategory,
  onSubmit,
  onCancel
}: Props) {
  return (
    <Form onSubmit={onSubmit}>
      <input
        type="text"
        value={editValue}
        onChange={(e) => setEditValue(e.target.value)}
        placeholder="Value"
      />
    
        <div className="flex gap-4 mt-2">
      <label className="font-medium">Entry Type:</label>

      <label className="flex items-center gap-1">
        <input
          type="radio"
          name="entryType"
          value="expense"
          checked={editEntryType === "expense"}
          onChange={() => setEditEntryType("expense")}
        />
        Expense
      </label>

      <label className="flex items-center gap-1">
        <input
          type="radio"
          name="entryType"
          value="income"
          checked={editEntryType === "income"}
          onChange={() => setEditEntryType("income")}
        />
        Income
      </label>
        </div>

      <div className="row">
        <input
          type="date"
          value={editDueDate}
          onChange={(e) => setEditDueDate(e.target.value)}
        />
        <input type="text" value={editNotes} onChange={(e) => setEditNotes(e.target.value)}
          placeholder="Notes"
        />

        <select
        value={editAccountId}
        onChange={(e) => setEditAccountId(e.target.value)}
        className="border p-2 rounded w-full"
      >
        <option value="">Select account</option>
        {accounts.map(a => (
          <option key={a._id} value={a._id}>
            {a.name} — ₹{a.balance}
          </option>
        ))}
      </select>

        <select value={editCategory} onChange={(e) => setEditCategory(e.target.value)}>
          <option value="">Category</option>
          <option value="work">Work</option>
          <option value="personal">Personal</option>
          <option value="shopping">Shopping</option>
          <option value="finance">Finance</option>
          <option value="health">Health</option>
        </select>
      </div>

      <div className="actions">
        <button type="button" onClick={onCancel} className="secondary">Cancel</button>
        <button type="submit" className="primary">Save</button>
      </div>
    </Form>
  );
}
