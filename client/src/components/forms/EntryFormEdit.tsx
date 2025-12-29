import React from "react";
import type { Account } from "../../services/accounts";
import { Form } from "../../styles/EntryFormEdit";
import { CATEGORIES } from "../../constants/categories";

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
  return (
    <Form onSubmit={onSubmit}>
      {/* Entry Type Buttons */}
      <div className="entry-type-buttons">
        {["income", "expense", "transfer"].map((type) => (
          <button
            key={type}
            type="button"
            className={`${type} ${editEntryType === type ? "active" : ""}`}
            onClick={() =>
              setEditEntryType(type as "income" | "expense" | "transfer")
            }
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
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
        >
          <option value="">Select account</option>
          {accounts.map((a) => (
            <option key={a._id} value={a._id}>
              {a.name} — ₹{a.balance}
            </option>
          ))}
        </select>
      )}

      {/* Date & Notes */}
      <div className="row">
        <input
          type="date"
          value={editDueDate}
          onChange={(e) => setEditDueDate(e.target.value)}
        />
        <input
          type="text"
          placeholder="Notes"
          value={editNotes}
          onChange={(e) => setEditNotes(e.target.value)}
        />
      </div>

      {/* Category */}
      {editEntryType !== "transfer" && (
        <select
          required
          value={editCategory}
          onChange={(e) => setEditCategory(e.target.value)}
        >
          <option value="">Category</option>
          {CATEGORIES.filter((c) => !c.parentId).map((main) => (
            <optgroup key={main.id} label={`${main.icon || ""} ${main.name}`}>
              {CATEGORIES.filter((sub) => sub.parentId === main.id).map(
                (sub) => (
                  <option key={sub.id} value={sub.id}>
                    {sub.icon || ""} {sub.name}
                  </option>
                )
              )}
            </optgroup>
          ))}
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
