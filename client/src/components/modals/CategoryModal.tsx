import { useState } from "react";
import Modal from "../modals/Modal";
import type { Category } from "../../services/categories";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
  onUpdate: (id: string, data: { name: string; icon: string }) => void;
};

export default function CategoriesModal({
  isOpen,
  onClose,
  categories,
  onUpdate,
}: Props) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [icon, setIcon] = useState("");

  const startEdit = (c: Category) => {
    setEditingId(c._id);
    setName(c.name);
    setIcon(c.icon || "");
  };

  const saveEdit = () => {
    if (!editingId) return;
    onUpdate(editingId, { name, icon });
    setEditingId(null);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ul className="space-y-3">
        {categories.map((c) => (
          <li
            key={c._id}
            className="flex justify-between items-center border-b pb-2"
          >
            {editingId === c._id ? (
              <div className="flex gap-2 w-full">
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Category name"
                />

                <input
                  value={icon}
                  onChange={(e) => setIcon(e.target.value)}
                  placeholder="Icon (emoji or name)"
                />

                <button className="primary" onClick={saveEdit}>
                  Save
                </button>
              </div>
            ) : (
              <>
                <span className="flex items-center gap-2">
                  <span>{c.icon}</span>
                  {c.name}
                </span>

                <button
                  className="text-sm text-indigo-600"
                  onClick={() => startEdit(c)}
                >
                  Edit
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </Modal>
  );
}
