import React, { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { Account } from "../services/accounts";
import * as API from "../services/accounts";
import { AuthContext } from "./Authcontext";

type AccountsCtx = {
  accounts: Account[];
  setAccounts: React.Dispatch<React.SetStateAction<Account[]>>;
  activeAccount: string | null;
  setActiveAccount: (id: string | null) => void;
  reload: () => Promise<void>;
  create: (data: Partial<Account>) => Promise<void>;
  updateAccount: (id: string, data: Partial<Account>) => Promise<void>;
  deleteAccount: (id: string) => Promise<void>;
  applyBalanceChange: (accountId: string, amount: number) => void;
  applyBalanceDelete: (accountId: string | undefined, amount: number) => void;
  moveBalanceBetweenAccounts: (oldAcc: string, newAcc: string, amount: number) => void;
};

const AccountsContext = createContext<AccountsCtx | null>(null);

export const AccountsProvider = ({ children }: { children: ReactNode }) => {
  const auth = useContext(AuthContext);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [activeAccount, setActiveAccount] = useState<string | null>(() => {
    return localStorage.getItem("activeAccount") || null;
  });

  const reload = async () => {
    if (!auth?.token) return;
    const res = await API.getAccounts(auth.token);
    setAccounts(res.data);
  };

  useEffect(() => {
    const saved = localStorage.getItem("activeAccount");
    if (saved) {
      setActiveAccount(saved);
    }
  }, []);

  useEffect(() => {
    reload();
  }, [auth?.token]);

  const create = async (data: Partial<Account>) => {
    if (!auth?.token) return;
    const res = await API.createAccount(auth.token, data);
    setAccounts((prev) => [res.data, ...prev]);
  };
  const updateAccount = async (id: string, data: Partial<Account>) => {
    if (!auth?.token) return;
    const res = await API.updateAccount(auth.token, id, data);

    // Replace updated account
    setAccounts((prev) => prev.map((acc) => (acc._id === id ? res.data : acc)));
  };

  const deleteAccount = async (id: string) => {
    if (!auth?.token) return;

    await API.deleteAccount(auth.token, id);

    // Remove from UI list
    setAccounts((prev) => prev.filter((acc) => acc._id !== id));

    // Reset active account if deleted
    if (activeAccount === id) {
      setActiveAccount(null);
      localStorage.removeItem("activeAccount");
    }
  };
  // Change balance when a new entry is added
  const applyBalanceChange = (accountId: string, amount: number) => {
    setAccounts((prev) =>
      prev.map((acc) =>
        acc._id === accountId ? { ...acc, balance: acc.balance + amount } : acc
      )
    );
  };

  // Reverse balance when entry deleted
 const applyBalanceDelete = (accountId: string | undefined, amount: number) => {
  if (!accountId) return; // safety guard
  setAccounts((prev) =>
    prev.map((acc) =>
      acc._id === accountId ? { ...acc, balance: acc.balance - amount } : acc
    )
  );
};

  // Case: entry moved to another account
  const moveBalanceBetweenAccounts = (
    oldAcc: string,
    newAcc: string,
    amount: number
  ) => {
    setAccounts((prev) =>
      prev.map((acc) => {
        if (acc._id === oldAcc)
          return { ...acc, balance: acc.balance - amount };
        if (acc._id === newAcc)
          return { ...acc, balance: acc.balance + amount };
        return acc;
      })
    );
  };

  return (
    <AccountsContext.Provider
      value={{
        accounts,
        setAccounts,
        activeAccount,
        setActiveAccount,
        reload,
        create,
        updateAccount,
        deleteAccount,
        applyBalanceChange,
        applyBalanceDelete,
        moveBalanceBetweenAccounts

      }}
    >
      {children}
    </AccountsContext.Provider>
  );
};

export const useAccounts = () => {
  const ctx = useContext(AccountsContext);
  if (!ctx) throw new Error("useAccounts must be used within AccountsProvider");
  return ctx;
};
