import React from "react";
import type { Account } from "../../services/accounts";
import { Form } from "../../styles/EntryFormEdit";
import { CATEGORIES } from "../../constants/categories";

type Props = {
  value: string;
  entryType: "income" | "expense" | "transfer";
  accountId?: string;
  fromAccountId?: string;
  toAccountId?: string;
  dueDate: string;
  notes: string;
  category: string;
  accounts: Account[];
  setValue: (n: string) => void;
  setEntryType: (s: "income" | "expense" | "transfer") => void;
  setAccountId: (id: string | null) => void;
  setFromAccountId: (id: string) => void;
  setToAccountId: (id: string) => void;
  setDueDate: (s: string) => void;
  setNotes: (s: string) => void;
  setCategory: (s: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
};

export default function EntryFormCreate({
  value,
  entryType,
  accountId,
  fromAccountId,
  toAccountId,
  dueDate,
  notes,
  category,
  accounts,
  setValue,
  setEntryType,
  setAccountId,
  setFromAccountId,
  setToAccountId,
  setDueDate,
  setNotes,
  setCategory,
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
            className={`${type} ${entryType === type ? "active" : ""}`}
            onClick={() =>
              setEntryType(type as "income" | "expense" | "transfer")
            }
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      {/* Amount */}
      <input
        type="text"
        placeholder="Amount"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />

      {/* Accounts */}
      {entryType === "transfer" ? (
        <>
          <select
            value={fromAccountId}
            onChange={(e) => setFromAccountId(e.target.value)}
          >
            <option value="">From Account</option>
            {accounts.map((a) => (
              <option key={a._id} value={a._id}>
                {a.name} — ₹{a.balance}
              </option>
            ))}
          </select>
          <select
            value={toAccountId}
            onChange={(e) => setToAccountId(e.target.value)}
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
          value={accountId}
          onChange={(e) => setAccountId(e.target.value)}
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
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <input
          type="text"
          placeholder="Notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>

      {/* Category */}
      {entryType !== "transfer" && (
        <select
          required
          value={category}
          onChange={(e) => setCategory(e.target.value)}
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
