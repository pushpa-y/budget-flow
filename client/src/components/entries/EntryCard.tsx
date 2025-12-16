
  import type { Entry as T } from "../../services/Entry";
  import type { Account } from "../../services/accounts";
  import { useEffect, useState } from "react";
import { Card, Info } from "../../styles/EntryCard";

  type Props = {
    entry: T;
    accounts: Account[];
    onEdit: (t: T) => void;
    onDelete: (id: string) => void;
    onToggle: (t: T) => void;
  };

  export default function EntryCard({ entry, accounts, onEdit, onDelete }: Omit<Props, 'onToggle'>) {
    const [openMenu, setOpenMenu] = useState(false);
    const accountName = accounts.find(acc => acc._id === entry.baseAccount)?.name;

    useEffect(() => {
      const close = () => setOpenMenu(false);
      window.addEventListener("click", close);
      return () => window.removeEventListener("click", close);
    }, []);

    return (
      <Card className="glass" initial={{ y: 6, opacity: 0 }} animate={{ y: 0, opacity: 1 }} whileHover={{ y: -6, scale: 1.01 }} transition={{ duration: 0.25 }}>
        <Info>

    {/* TOP ROW → amount + 3 dots */}
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <div
        className="bold"
        style={{
  color:
    entry.entryType === "income"
      ? "#16A34A"   // green
      : entry.entryType === "expense"
      ? "#DC2626"   // red
      : "#2563EB"   // blue for transfer
}}

      >
        ₹{entry.value}
      </div>

      <div style={{ position: "relative" }}>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setOpenMenu(!openMenu);
          }}
          style={{
            background: "transparent",
            border: "none",
            cursor: "pointer",
            fontSize: "20px",
            padding: "0 4px",
            lineHeight: "1",
          }}
        >
          ⋮
        </button>

        {openMenu && (
          <div
            style={{
              position: "absolute",
               top: "120%",
              right: 0,
              background: "white",
              boxShadow: "0px 2px 8px rgba(0,0,0,0.2)",
              borderRadius: 8,
              padding: "8px 0",
              zIndex: 100,
              minWidth: "120px",
            }}
          >
            <div
              onClick={() => onEdit(entry)}
              style={{ padding: "8px 12px", cursor: "pointer" }}
            >
              Edit
            </div>
            <div
              onClick={(e) => {
                e.stopPropagation();           // don't let outer click handlers run
                setOpenMenu(false);            // close the menu immediately
                console.log("EntryCard: deleting", entry._id);
                onDelete(entry._id);            // call parent handler
              }}
              style={{ padding: "8px 12px", cursor: "pointer", color: "red" }}
            >
              Delete
            </div>
          </div>
        )}
      </div>
    </div>

    {/* OTHER INFO */}
    {accountName && <div className="muted">Account: {accountName}</div>}
    {entry.notes && <div className="muted">Notes: {entry.notes}</div>}

  </Info>
      </Card>
    );
  }

