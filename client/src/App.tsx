import React from "react";
import "./index.css";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeProvider";
import { AuthProvider } from "./context/Authcontext";
import { AccountsProvider } from "./context/AccountsContext";   // <-- ADD THIS
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { SidebarProvider } from "./context/SidebarContext";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
       <SidebarProvider>
      <AuthProvider>
        <AccountsProvider> {/* ✅ FIX */}
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </BrowserRouter>
        </AccountsProvider>
      </AuthProvider>
      </SidebarProvider>
    </ThemeProvider>
  </React.StrictMode>
);
