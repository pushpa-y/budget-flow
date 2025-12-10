// Sidebar.tsx
import { motion } from "framer-motion";
import { FiHome, FiBarChart2, FiSettings, FiSun, FiMoon, FiUser, FiChevronDown, FiChevronRight, FiLayers } from "react-icons/fi";
import { useContext, useState } from "react";
import { useTheme } from "../context/ThemeProvider";
import { useAccounts } from "../context/AccountsContext";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/Authcontext";
import { useSidebar } from "../context/SidebarContext";

/* ---------------- Styled components ---------------- */
import { Aside,BrandRow, Nav, NavItem, AccountsList, AccountItem, FooterRow } from "../styles/Sidebar";

/* ---------------- Component ---------------- */

export default function Sidebar() {
  const { collapsed } = useSidebar();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const { theme, toggle } = useTheme();
  const { accounts, activeAccount, setActiveAccount } = useAccounts();
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  const [accountsOpen, setAccountsOpen] = useState(false);

  const handleLogout = () => {
    auth?.logout?.();
    navigate("/login");
  };

  // helper to set active + persist
  const selectAccount = (id: string | null) => {
    setActiveAccount(id);
    if (id === null) localStorage.removeItem("activeAccount");
    else localStorage.setItem("activeAccount", id);
  };

  return (
    <Aside
      $collapsed={collapsed}
      animate={{ width: collapsed ? 96 : 260 }}
      transition={{ duration: 0.24, ease: "easeInOut" }}
    >
      {/* Top brand / user */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <BrandRow $collapsed={collapsed}>
          <div className="brand" />
          <div className="brandLabel">Budget Flow</div>
        </BrandRow>

        <NavItem to="" $collapsed={collapsed} onClick={(e) => e.preventDefault()}>
          <FiUser size={18} />
          <span className="label">{auth?.user?.name ? `Hello, ${auth.user.name}` : "Hello"}</span>
        </NavItem>
      </div>

      {/* Nav */}
      <Nav>
        <NavItem to="/dashboard" $collapsed={collapsed}>
          <FiHome size={18} />
          <span className="label">Dashboard</span>
        </NavItem>

        <NavItem to="" $collapsed={collapsed}>
          <FiBarChart2 size={18} />
          <span className="label">Analytics</span>
        </NavItem>

        <NavItem
          to="#"
          $collapsed={collapsed}
          onClick={(e) => {
            e.preventDefault();
            setSettingsOpen((s) => !s);
          }}
        >
          <FiSettings size={18} />
          <span className="label">Settings</span>
        </NavItem>
        {/* Settings submenu */}
          {!collapsed && settingsOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              style={{ marginLeft: 43, marginTop: -4, cursor: "pointer", fontSize: 13, color: "red"}}
              onClick={handleLogout}
            >
              Logout
            </motion.div>
        )}
     
        <NavItem to=""  $collapsed={collapsed} onClick={() => setAccountsOpen((s) => !s)}>
          <FiLayers size={18} style={{ transform: accountsOpen ? "rotate(0deg)" : "rotate(0deg)" }} />
          <span className="label">Accounts</span>
        </NavItem>
        <AccountsList
          aria-expanded={accountsOpen}
          initial={{ height: accountsOpen ? "auto" : 0, opacity: accountsOpen ? 1 : 0 }}
          animate={{ height: accountsOpen ? "auto" : 0, opacity: accountsOpen ? 1 : 0 }}
          transition={{ duration: 0.18 }}
          style={{ overflow: "hidden" }}
          aria-hidden={!accountsOpen}
        >
          {accounts.map((acc) => {
            // highlight this account if it's selected OR "all" is selected
            const isActive = activeAccount === acc._id || activeAccount === "all";

            return (
              <AccountItem
                key={acc._id}
                role="button"
                $active={Boolean(isActive)}
                $collapsed={collapsed}
                onClick={() => {
                  selectAccount(acc._id);
                }}
                whileHover={{ scale: 1.02 }}
                as={motion.div}
              >
                <div className="left">
                  <div className="dot" style={{ background: acc.color || "#6366f1" }} />
                  <div className="name">{acc.name}</div>
                </div>
                <div className="balance">₹{acc.balance.toLocaleString()}</div>
              </AccountItem>
            );
          })}
        </AccountsList>
      </Nav>

      {/* Footer: theme and version */}
      <FooterRow $collapsed={collapsed}>
        <div
          className="theme"
          onClick={toggle}
          role="button"
          aria-label="Toggle theme"
          style={{ cursor: "pointer" }}
        >
          {theme === "light" ? <FiMoon size={16} /> : <FiSun size={16} />}
          <div className="label">{theme === "light" ? "Dark mode" : "Light mode"}</div>
        </div>

        {!collapsed && (
          <p className="text-sm opacity-70 drop-shadow">
            v1.0 • built with ♥
          </p>
        )}
      </FooterRow>
    </Aside>
  );
}
