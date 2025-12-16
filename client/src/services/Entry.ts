import { api } from "./api";

export interface Entry {
  _id: string;
  value?: string;
  entryType?: "income" | "expense" | "transfer";
  // READ (from backend)
  account?: string; 
  fromAccount?: string;
  toAccount?: string;  
  baseAccount?: string;
  // WRITE (to backend)
  accountId?: string;
  fromAccountId?: string;
  toAccountId?: string;

  completed: boolean;
  dueDate?: string;
  notes?: string;
  category?: string;
}

// All API calls include the token

export const getEntries = (
  token: string,
  opts?: {
    accountId?: string;
    page?: number;
    limit?: number;
    filter?: string;
    search?: string;
    sortBy?: string;
    category?: string;
  }
) => {
  const params: Record<string, any> = {};
  if (opts?.accountId) params.account = opts.accountId;
  if (opts?.page) params.page = opts.page;
  if (opts?.limit) params.limit = opts.limit;
  if (opts?.filter) params.filter = opts.filter;
  if (opts?.sortBy) params.sortBy = opts.sortBy;
  if (opts?.category) params.category = opts.category;

  return api.get<{ entries: Entry[]; total: number; page: number; pages: number }>(
    "/entries",
    {
      headers: { Authorization: `Bearer ${token}` },
      params,
    }
  );
};

export const createEntry = (token: string, data: Partial<Entry>) =>
  api.post<Entry>("/entries", data, { headers: { Authorization: `Bearer ${token}` } });

export const updateEntry = (token: string, id: string, data: Partial<Entry>) =>
  api.put<Entry>(`/entries/${id}`, data, { headers: { Authorization: `Bearer ${token}` } });

export const deleteEntry = (token: string, id: string) =>
  api.delete<{ data: Entry }>(`/entries/${id}`, { headers: { Authorization: `Bearer ${token}` } });

