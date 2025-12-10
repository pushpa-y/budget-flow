import { api } from "./api"; // your axios instance that sets baseURL
export interface Account {
  _id: string;
  name: string;
  entryType: string;
  balance: number;
  color?: string;
  createdAt?: string;
  updatedAt?: string;
}

// token required
export const getAccounts = (token: string) =>
  api.get<Account[]>("/accounts", { headers: { Authorization: `Bearer ${token}` } });

export const createAccount = (token: string, data: Partial<Account>) =>
  api.post<Account>("/accounts", data, { headers: { Authorization: `Bearer ${token}` } });

export const updateAccount = (token: string, id: string, data: Partial<Account>) =>
  api.put<Account>(`/accounts/${id}`, data, { headers: { Authorization: `Bearer ${token}` } });

export const deleteAccount = (token: string, id: string) =>
  api.delete(`/accounts/${id}`, { headers: { Authorization: `Bearer ${token}` } });
