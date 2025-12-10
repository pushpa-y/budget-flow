import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/Authcontext";
import { useAccounts } from "../context/AccountsContext";
import {
  getEntries,
  createEntry,
  updateEntry,
  deleteEntry,
} from "../services/Entry";
import type { Entry } from "../services/Entry";

//components
import Modal from "../components/modals/Modal";
import FiltersBar from "../components/FiltersBar";
import EntryList from "../components/entries/EntryList";
import EntryFormCreate from "../components/forms/EntryFormCreate";
import EntryFormEdit from "../components/forms/EntryFormEdit";
import Layout from "../components/Layout";
import AccountsContainer from "../components/accounts/AccountsContainer";

//styles
import { FloatingAddButton } from "../styles/Dashboard";

const PER_PAGE = 10;

const Dashboard = () => {
  const auth = useContext(AuthContext);
  const {
    accounts,
    activeAccount,
    setActiveAccount,
    applyBalanceChange,
    applyBalanceDelete,
    moveBalanceBetweenAccounts,
  } = useAccounts();

  // Entry states
  const [entries, setEntries] = useState<Entry[]>([]);
  const [value, setValue] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [category, setCategory] = useState("");
  const [editingEntry, setEditingEntry] = useState<Entry | null>(null);

  const [editValue, setEditValue] = useState("");
  const [editEntryType, setEditEntryType] = useState<"income" | "expense">(
    "expense"
  );
  const [entryType, setEntryType] = useState<"income" | "expense">("expense");
  const [editDueDate, setEditDueDate] = useState("");
  const [editCategory, setEditCategory] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddEntryModalOpen, setIsAddEntryModalOpen] = useState(false);
  const [editAccountId, setEditAccountId] = useState<string | null>(null);

  const [sortBy, setSortBy] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  const [notes, setNotes] = useState(""); // for Add Entry
  const [editNotes, setEditNotes] = useState(""); // for Edit Entry

  const fetchEntries = async (p = 1) => {
    if (!auth?.token) return;
    try {
      const accountIdToSend =
        activeAccount && activeAccount !== "all" ? activeAccount : undefined;
      const res = await getEntries(auth.token, {
        page: p,
        limit: PER_PAGE,
        sortBy,
        category: categoryFilter,
        accountId: accountIdToSend,
      });
      setEntries(res.data.entries);
      setPage(res.data.page);
      setPages(res.data.pages);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchEntries(page); /* eslint-disable-next-line */
  }, [auth?.token, sortBy, page, categoryFilter, activeAccount]);

  // --- Entry CRUD ---
  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth?.token) return;

    // accountId could be undefined
    if (!activeAccount) {
      alert("Please select an account");
      return;
    }

    try {
      await createEntry(auth.token, {
        value,
        entryType,
        dueDate,
        notes,
        category,
        accountId: activeAccount, // safe now
      });

      applyBalanceChange(
        activeAccount,
        entryType === "income" ? Number(value) : -Number(value)
      );

      setValue("");
      setEntryType("expense");
      setDueDate("");
      setNotes("");
      setCategory("");
      fetchEntries(1);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!auth?.token) return;

    const entryToDelete = entries.find((t) => t._id === id);
    if (!entryToDelete) return;

    await deleteEntry(auth.token, id);

    // 1️⃣ Update entries list
    setEntries((prev) => prev.filter((t) => t._id !== id));

    applyBalanceDelete(
      entryToDelete.accountId,
      entryToDelete.entryType === "income"
        ? Number(entryToDelete.value)
        : -Number(entryToDelete.value)
    );
  };

  const startEdit = (entry: Entry) => {
    setEditingEntry(entry);
    setEditValue(entry.value || "");
    setEditEntryType(
      entry.entryType === "income" || entry.entryType === "expense"
        ? entry.entryType
        : "expense"
    );
    setEditDueDate(entry.dueDate ? entry.dueDate.split("T")[0] : "");
    setEditNotes(entry.notes || "");
    setEditAccountId(entry.accountId ?? null);
    setEditCategory(entry.category || "");
    setIsModalOpen(true);
  };

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth?.token || !editingEntry) return;
    const res = await updateEntry(auth.token, editingEntry._id, {
      value: editValue,
      entryType: editEntryType,
      dueDate: editDueDate,
      notes: editNotes,
      accountId: editAccountId || undefined,
      category: editCategory,
    });

    setEntries((prev) =>
      prev.map((t) => (t._id === res.data._id ? res.data : t))
    );

    if (editAccountId !== editingEntry.accountId) {
      const multiplier = editingEntry.entryType === "income" ? 1 : -1;
      const amount = Number(editValue);

      moveBalanceBetweenAccounts(
        editingEntry.accountId!,
        editAccountId!,
        multiplier * amount
      );
    } else {
      // Same account, value or type changed
      const oldAmt =
        (editingEntry.entryType === "income" ? 1 : -1) *
        Number(editingEntry.value);

      const newAmt = (editEntryType === "income" ? 1 : -1) * Number(editValue);

      const diff = newAmt - oldAmt;

      applyBalanceChange(editAccountId!, diff);
    }

    fetchEntries(page);
    setIsModalOpen(false);
  };

  // Client-side filtering/sorting
  const visible = entries
    .filter((entry) =>
      categoryFilter ? entry.category === categoryFilter : true
    )
    .sort((a, b) => {
      if (sortBy === "due-asc")
        return (
          new Date(a.dueDate || "").getTime() -
          new Date(b.dueDate || "").getTime()
        );
      if (sortBy === "due-desc")
        return (
          new Date(b.dueDate || "").getTime() -
          new Date(a.dueDate || "").getTime()
        );
      return 0;
    });

  return (
    <Layout>

      {/* --- Accounts --- */}
      <AccountsContainer />

      {/* Filters */}
      <div style={{ flex: 1 }}>
        <FiltersBar
          sortBy={sortBy}
          setSortBy={setSortBy}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
        />

        {/* Entry List */}
        <EntryList
          entries={visible}
          accounts={accounts}
          onEdit={startEdit}
          onDelete={handleDelete}
        />

        {/* Pagination */}
        <div className="flex justify-center gap-3 mt-6">
          <button
            className="px-3 py-1 rounded bg-slate-100"
            onClick={() => page > 1 && setPage(page - 1)}
            disabled={page <= 1}
          >
            Prev
          </button>
          {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              className={`px-3 py-1 rounded ${
                p === page ? "bg-indigo-600 text-white" : "bg-slate-100"
              }`}
              onClick={() => setPage(p)}
            >
              {p}
            </button>
          ))}
          <button
            className="px-3 py-1 rounded bg-slate-100"
            onClick={() => page < pages && setPage(page + 1)}
            disabled={page >= pages}
          >
            Next
          </button>
        </div>
      </div>

      {/* --- Add Entry Modal --- */}
      <Modal
        isOpen={isAddEntryModalOpen}
        onClose={() => setIsAddEntryModalOpen(false)}
      >
        <h2 className="text-xl font-semibold mb-3">Add New Entry</h2>
        <EntryFormCreate
          value={value}
          setValue={setValue}
          entryType={entryType}
          setEntryType={(v) => setEntryType(v as "income" | "expense")}
          accountId={activeAccount || undefined} // <-- convert null to undefined
          setAccountId={setActiveAccount} // <-- pass setter from context
          dueDate={dueDate}
          setDueDate={setDueDate}
          notes={notes}
          setNotes={setNotes}
          category={category}
          setCategory={setCategory}
          accounts={accounts} // <-- pass all accounts
          onSubmit={(e) => {
            handleCreate(e);
            setIsAddEntryModalOpen(false);
          }}
        />
      </Modal>

      {/* --- Edit Entry Modal --- */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-xl font-semibold mb-3">Edit Entry</h2>
        <EntryFormEdit
          editValue={editValue}
          setEditValue={setEditValue}
          editEntryType={editEntryType}
          setEditEntryType={setEditEntryType}
          editDueDate={editDueDate}
          setEditDueDate={setEditDueDate}
          editNotes={editNotes}
          setEditNotes={setEditNotes} // <-- new
          editAccountId={editAccountId ?? undefined}
          setEditAccountId={setEditAccountId}
          editCategory={editCategory}
          setEditCategory={setEditCategory}
          accounts={accounts}
          onSubmit={handleEdit}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>

      <FloatingAddButton onClick={() => setIsAddEntryModalOpen(true)}>
        +
      </FloatingAddButton>
    </Layout>
  );
};

export default Dashboard;
