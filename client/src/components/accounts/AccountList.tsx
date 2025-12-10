import { useAccounts } from "../../context/AccountsContext";
import type { Account } from "../../services/accounts";

export default function AccountsList({ activeId, onSelect }: { activeId?: string; onSelect: (id?: string)=>void }) {
  const { accounts } = useAccounts();

  return (
    <div className="space-y-2">
      <div className="flex gap-2 items-center">
        <h4 className="font-semibold">Accounts</h4>
        {/* Add button handled elsewhere (opens modal) */}
      </div>
      <div className="flex flex-col gap-2">
        <button onClick={() => onSelect(undefined)} className={`text-left p-2 rounded ${!activeId ? "bg-indigo-600 text-white" : "bg-slate-100"}`}>All accounts</button>
        {accounts.map((acc: Account) => (
          <button key={acc._id} onClick={() => onSelect(acc._id)} className={`text-left p-2 rounded ${activeId === acc._id ? "bg-indigo-600 text-white" : "bg-slate-100"}`}>
            <div className="flex justify-between items-center">
              <div>{acc.name}</div>
              <div className="text-sm font-medium">₹{acc.balance}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
