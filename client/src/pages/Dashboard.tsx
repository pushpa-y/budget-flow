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
import AccountsContainer from "../components/accounts/AccountsContainer";
import ChartsSection from "../components/charts/ChartsSection";

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

  // --- State ---
  const [entries, setEntries] = useState<Entry[]>([]);
  const [value, setValue] = useState("");
  const [entryType, setEntryType] = useState<"income" | "expense" | "transfer">(
    "expense"
  );
  const [editEntryType, setEditEntryType] = useState<"income" | "expense" | "transfer">("expense");

  const [dueDate, setDueDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [category, setCategory] = useState("");
  const [notes, setNotes] = useState("");
  const [fromAccount, setFromAccount] = useState("");
  const [toAccount, setToAccount] = useState("");

  const [editingEntry, setEditingEntry] = useState<Entry | null>(null);
  const [editValue, setEditValue] = useState("");
  const [editDueDate, setEditDueDate] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [editNotes, setEditNotes] = useState("");
  const [editAccountId, setEditAccountId] = useState<string | null>(null);
  const [editFromAccountId, setEditFromAccountId] = useState<string>("");
  const [editToAccountId, setEditToAccountId] = useState<string>("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddEntryModalOpen, setIsAddEntryModalOpen] = useState(false);

  const [sortBy, setSortBy] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  // --- Fetch entries ---
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
    fetchEntries(page);
  }, [auth?.token, sortBy, page, categoryFilter, activeAccount]);

  // --- CREATE ---
  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth?.token) return;

    try {
      if (entryType === "transfer") {
        if (!fromAccount || !toAccount) {
          alert("Please select both From and To accounts");
          return;
        }
       
        await createEntry(auth.token, {
          entryType: "transfer",
          value: value,
          fromAccountId: fromAccount,
          toAccountId: toAccount,
          notes,
          ...(dueDate && { dueDate }),
        });

        moveBalanceBetweenAccounts(fromAccount, toAccount, Number(value));
      } else {
        if (!activeAccount) {
          alert("Please select an account");
          return;
        }
        if (!category) {
          alert("Please select a category");
          return;
        }

        await createEntry(auth.token, {
          value: value,
          entryType,
          accountId: activeAccount,
          notes,
          category,
          ...(dueDate && { dueDate }),
        });

        applyBalanceChange(
          activeAccount,
          entryType === "income" ? Number(value) : -Number(value)
        );
      }

      // Reset form
      setValue("");
      setEntryType("expense");
      setFromAccount("");
      setToAccount("");
      setDueDate("");
      setNotes("");
      setCategory("");
      fetchEntries(1);
      setIsAddEntryModalOpen(false);
    } catch (err) {
      console.error(err);
      alert("Something went wrong while creating the entry.");
    }
  };

  // --- DELETE ---
  const handleDelete = async (id: string) => {
    if (!auth?.token) return;

    const entryToDelete = entries.find((e) => e._id === id);
    if (!entryToDelete) return;

    await deleteEntry(auth.token, id);

    if (entryToDelete.entryType === "transfer") {
      moveBalanceBetweenAccounts(
        entryToDelete.toAccount!,
        entryToDelete.fromAccount!,
        Number(entryToDelete.value)
      );
    } else {
      applyBalanceDelete(
        entryToDelete.baseAccount!,
        entryToDelete.entryType === "income"
          ? Number(entryToDelete.value)
          : -Number(entryToDelete.value)
      );
    }

    setEntries((prev) => prev.filter((e) => e._id !== id));
  };

  // --- EDIT ---
  const startEdit = (entry: Entry) => {
    console.log("Editing entry:", entry);
    setEditingEntry(entry);
    setEditValue(entry.value || "");
    setEditEntryType(entry.entryType ?? "expense");
    setEditDueDate(entry.dueDate?.split("T")[0] || "");
    setEditCategory(entry.category || "");
    setEditNotes(entry.notes || "");
    setEditAccountId(entry.baseAccount ?? null);
    setEditFromAccountId(entry.fromAccount || "");
    setEditToAccountId(entry.toAccount || "");
    setIsModalOpen(true);
  };

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth?.token || !editingEntry) return;

    const payload: Partial<Entry> =
      editEntryType === "transfer"
        ? {
            entryType: "transfer",
            value: editValue,
            fromAccountId: editFromAccountId,
            toAccountId: editToAccountId,
            notes: editNotes,
            category: editCategory,
            ...(editDueDate && { dueDate: editDueDate }),
          }
        : {
            entryType: editEntryType as "income" | "expense",
            value: editValue,
            accountId: editAccountId!,
            notes: editNotes,
            category: editCategory,
            ...(editDueDate && { dueDate: editDueDate }),
          };

    const res = await updateEntry(auth.token, editingEntry._id, payload);

    setEntries((prev) =>
      prev.map((e) => (e._id === res.data._id ? res.data : e))
    );

    // Adjust balances
    if (editingEntry.entryType === "transfer") {
      moveBalanceBetweenAccounts(
        editingEntry.fromAccount!,
        editingEntry.toAccount!,
        -Number(editingEntry.value)
      );
      moveBalanceBetweenAccounts(
        editFromAccountId,
        editToAccountId,
        Number(editValue)
      );
    } else {
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

  // --- Visible entries (filter/sort) ---
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
    <>
      <AccountsContainer />
      <ChartsSection entries={entries} />

      <FiltersBar
        sortBy={sortBy}
        setSortBy={setSortBy}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
      />
      <EntryList
        entries={visible}
        accounts={accounts}
        onEdit={startEdit}
        onDelete={handleDelete}
      />

      {/* Pagination */}
      <div className="flex justify-center gap-3 mt-6">
        <button onClick={() => setPage(page - 1)} disabled={page <= 1}>
          Prev
        </button>
        {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
          <button
            key={p}
            className={p === page ? "bg-indigo-600 text-white" : ""}
            onClick={() => setPage(p)}
          >
            {p}
          </button>
        ))}
        <button onClick={() => setPage(page + 1)} disabled={page >= pages}>
          Next
        </button>
      </div>

      {/* Add Entry Modal */}
      <Modal
        isOpen={isAddEntryModalOpen}
        onClose={() => setIsAddEntryModalOpen(false)}
      >
        <h2 className="text-xl font-semibold mb-3 text-center">
          Add New Entry
        </h2>
        <EntryFormCreate
          value={value}
          setValue={setValue}
          entryType={entryType}
          setEntryType={setEntryType}
          accountId={activeAccount || undefined}
          fromAccountId={fromAccount}
          toAccountId={toAccount}
          setAccountId={setActiveAccount}
          setFromAccountId={setFromAccount}
          setToAccountId={setToAccount}
          dueDate={dueDate}
          setDueDate={setDueDate}
          notes={notes}
          setNotes={setNotes}
          category={category}
          setCategory={setCategory}
          accounts={accounts}
          onSubmit={handleCreate}
          onCancel={() => setIsAddEntryModalOpen(false)}
        />
      </Modal>

      {/* Edit Entry Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-xl font-semibold mb-3 text-center">Edit Entry</h2>
        <EntryFormEdit
          editValue={editValue}
          setEditValue={setEditValue}
          editEntryType={editEntryType}
          setEditEntryType={setEditEntryType}
          editDueDate={editDueDate}
          setEditDueDate={setEditDueDate}
          editNotes={editNotes}
          setEditNotes={setEditNotes}
          editAccountId={editAccountId ?? undefined}
          editFromAccountId={editFromAccountId}
          editToAccountId={editToAccountId}
          setEditAccountId={setEditAccountId}
          setEditFromAccountId={setEditFromAccountId}
          setEditToAccountId={setEditToAccountId}
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
    </>
  );
};

export default Dashboard;
