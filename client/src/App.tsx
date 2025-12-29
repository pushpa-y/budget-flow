import React from "react";
import "./index.css";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeProvider";
import { AuthProvider } from "./context/Authcontext";
import { AccountsProvider } from "./context/AccountsContext";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import { SidebarProvider } from "./context/SidebarContext";
import AccountsPage from "./pages/AccountsPage";
import Analytics from "./pages/Analytics";
import AppLayout from "./layouts/AppLayout";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <SidebarProvider>
        <AuthProvider>
          <AccountsProvider>
            <BrowserRouter>
              <Routes>
                {/* Public route */}
                <Route path="/" element={<Home />} />
                {/* Protected layout routes */}
                <Route element={<AppLayout />}>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/accounts" element={<AccountsPage />} />
                  <Route path="/analytics" element={<Analytics />} />
                  {/* Add more: /analytics, /settings, etc */}
                </Route>
              </Routes>
            </BrowserRouter>
          </AccountsProvider>
        </AuthProvider>
      </SidebarProvider>
    </ThemeProvider>
  </React.StrictMode>
);
