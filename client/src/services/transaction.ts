import { api } from "./api";

export interface Transaction {
  _id: string;
  account: string;
  type: "income" | "expense";
  amount: number;
  note?: string;
  createdAt: string;
}

export const createTransaction = (token: string, data: any) =>
  api.post("/transactions", data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getTransactionsForAccount = (token: string, id: string) =>
  api.get(`/transactions/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
