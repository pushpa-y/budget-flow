import React from "react";
import { Form } from "../../styles/EntryFormEdit";
import type { Account } from "../../services/accounts";

type Props = {
  editValue: string;
  editEntryType: "income" | "expense" | "transfer";
  editDueDate: string;
  editNotes: string;
  editAccountId?: string;
  editFromAccountId?: string;
  editToAccountId?: string;
  editCategory: string;
  accounts: Account[];
  setEditValue: (n: string) => void;
  setEditEntryType: (n: "income" | "expense" | "transfer") => void;
  setEditDueDate: (s: string) => void;
  setEditNotes: (s: string) => void;
  setEditAccountId: (id: string | null) => void;
  setEditFromAccountId: (id: string) => void;
  setEditToAccountId: (id: string) => void;
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
  editFromAccountId,
  editToAccountId,
  editCategory,
  accounts,
  setEditValue,
  setEditEntryType,
  setEditDueDate,
  setEditNotes,
  setEditAccountId,
  setEditFromAccountId,
  setEditToAccountId,
  setEditCategory,
  onSubmit,
  onCancel,
}: Props) {
  console.log({
  editFromAccountId:editFromAccountId,
  editToAccountId: editToAccountId})
  return (
    <Form onSubmit={onSubmit}>

      {/* Entry Type Buttons */}
      <div className="entry-type-buttons">
        <button
          type="button"
          className={`income ${editEntryType === "income" ? "active" : ""}`}
          onClick={() => setEditEntryType("income")}
        >
          Income
        </button>

        <button
          type="button"
          className={`expense ${editEntryType === "expense" ? "active" : ""}`}
          onClick={() => setEditEntryType("expense")}
        >
          Expense
        </button>

        <button
          type="button"
          className={`transfer ${editEntryType === "transfer" ? "active" : ""}`}
          onClick={() => setEditEntryType("transfer")}
        >
          Transfer
        </button>
      </div>

      {/* Amount */}
      <input
        type="text"
        value={editValue}
        onChange={(e) => setEditValue(e.target.value)}
        placeholder="Amount"
      />

        {/* Accounts */}
        {editEntryType === "transfer" ? (
          <>
            <select
              value={editFromAccountId}
              onChange={(e) => setEditFromAccountId(e.target.value)}
            >
              <option value="">From Account</option>
              {accounts.map((a) => (
                <option key={a._id} value={a._id}>
                  {a.name} — ₹{a.balance}
                </option>
              ))}
            </select>

            <select
              value={editToAccountId}
              onChange={(e) => setEditToAccountId(e.target.value)}
            >
              <option value="">To Account</option>
              {accounts.map((a) => (
                <option key={a._id} value={a._id}>
                  {a.name} — ₹{a.balance}
                </option>
              ))}
            </select>
          </>
        ) : (
          <select
            value={editAccountId}
            onChange={(e) => setEditAccountId(e.target.value)}
            className="border p-2 rounded w-full"
          >
            <option value="">Select account</option>
            {accounts.map((a) => (
              <option key={a._id} value={a._id}>
                {a.name} — ₹{a.balance}
              </option>
            ))}
          </select>
        )}

        {/* Due Date */}
         <div className="row">
        <input
          type="date"
          value={editDueDate}
          onChange={(e) => setEditDueDate(e.target.value)}
        />

        {/* Notes */}
        <input
          type="text"
          value={editNotes}
          onChange={(e) => setEditNotes(e.target.value)}
          placeholder="Notes"
        />
        </div>

        {/* Category */}
        {editEntryType !== "transfer" && (
          <select
            value={editCategory}
            onChange={(e) => setEditCategory(e.target.value)}
          >
            <option value="">Category</option>
            <option value="work">Work</option>
            <option value="personal">Personal</option>
            <option value="shopping">Shopping</option>
            <option value="finance">Finance</option>
            <option value="health">Health</option>
          </select>
        )}

      {/* Actions */}
      <div className="actions mt-4">
        <button type="button" onClick={onCancel} className="secondary">
          Cancel
        </button>
        <button type="submit" className="primary">
          Save
        </button>
      </div>
    </Form>
  );
}
