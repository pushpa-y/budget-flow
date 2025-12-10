import React from "react";
import type { Account } from "../../services/accounts";
import { Form } from "../../styles/EntryFormEdit";

type Props = {
  value: string;
  entryType: "income" | "expense";
  accountId?: string;
  dueDate: string;
  notes: string;
  category: string;
  accounts: Account[];
  setValue: (n: string) => void;
  setEntryType: (s: "income" | "expense") => void;
  setAccountId: (id: string | null) => void;
  setDueDate: (s: string) => void;
  setNotes: (s: string) => void;
  setCategory: (s: string) => void;
  onSubmit: (e: React.FormEvent) => void;
};

export default function EntryFormCreate({
  value,
  entryType,
  accountId,
  dueDate,
  notes,
  category,
  accounts,
  setValue,
  setEntryType,
  setAccountId,
  setDueDate,
  setNotes,
  setCategory,
  onSubmit,
}: Props) {
  return (
    <Form onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="Amount"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />

      <div className="flex gap-3">
        <label className="flex items-center gap-1">
          <input
            type="radio"
            name="type"
            value="income"
            checked={entryType === "income"}
            onChange={() => setEntryType("income")}
          />
          Income
        </label>
        <label className="flex items-center gap-1">
          <input
            type="radio"
            name="type"
            value="expense"
            checked={entryType === "expense"}
            onChange={() => setEntryType("expense")}
          />
          Expense
        </label>
      </div>

      <select
        value={accountId}
        onChange={(e) => setAccountId(e.target.value)}
        className="border p-2 rounded w-full"
      >
        <option value="">Select account</option>
        {accounts.map((a) => (
          <option key={a._id} value={a._id}>
            {a.name} — ₹{a.balance}
          </option>
        ))}
      </select>

      <div className="row">
        {/* Due Date Input */}
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />

        {/* Notes Input */}
        <input
          type="text"
          placeholder="Notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Category</option>
          <option value="work">Work</option>
          <option value="personal">Personal</option>
          <option value="shopping">Shopping</option>
          <option value="finance">Finance</option>
          <option value="health">Health</option>
        </select>
      </div>

      <button type="submit" className="primary">
        Save
      </button>
    </Form>
  );
}
