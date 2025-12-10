import { api } from "./api";

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

export const registerUser = (data: RegisterData) => api.post("/auth/register", data);
export const loginUser = (data: LoginData) => api.post("/auth/login", data);
