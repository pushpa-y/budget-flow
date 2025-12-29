import { useAccounts } from "../context/AccountsContext";

export default function AccountsPage() {
  const { accounts, activeAccount, setActiveAccount } = useAccounts();

  return (
    <div>
      <h2>Accounts</h2>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {accounts.map(acc => (
          <div
            key={acc._id}
            onClick={() => setActiveAccount(acc._id)}
            style={{
              padding: 12,
              borderRadius: 6,
              background: acc._id === activeAccount ? "#eee" : "#fff",
              cursor: "pointer",
              display: "flex",
              justifyContent: "space-between"
            }}
          >
            <span>{acc.name}</span>
            <strong>₹{acc.balance}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}
