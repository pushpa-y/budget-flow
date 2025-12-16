// Sidebar.tsx
import { motion } from "framer-motion";
import {
  FiHome,
  FiBarChart2,
  FiSettings,
  FiSun,
  FiMoon,
  FiUser,
  FiLayers,
} from "react-icons/fi";
import { useContext, useState } from "react";
import { useTheme } from "../context/ThemeProvider";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/Authcontext";
import { useSidebar } from "../context/SidebarContext";

/* ---------------- Styled components ---------------- */
import {
  Aside,
  BrandRow,
  Nav,
  NavItem,
  FooterRow,
} from "../styles/Sidebar";

export default function Sidebar() {
  const { collapsed } = useSidebar();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const { theme, toggle } = useTheme();
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  const handleLogout = () => {
    auth?.logout?.();
    navigate("/");
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

        <NavItem
          to=""
          $collapsed={collapsed}
          onClick={(e) => e.preventDefault()}
        >
          <FiUser size={18} />
          <span className="label">
            {auth?.user?.name ? `Hello, ${auth.user.name}` : "Hello"}
          </span>
        </NavItem>
      </div>

      {/* Nav */}
      <Nav>
        <NavItem to="/dashboard" $collapsed={collapsed}>
          <FiHome size={18} />
          <span className="label">Dashboard</span>
        </NavItem>
        <NavItem to="/accounts" $collapsed={collapsed}>
          <FiLayers size={18} />
          <span className="label">Accounts</span>
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
            style={{
              marginLeft: 43,
              marginTop: -4,
              cursor: "pointer",
              fontSize: 13,
              color: "red",
            }}
            onClick={handleLogout}
          >
            Logout
          </motion.div>
        )}
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
          <div className="label">
            {theme === "light" ? "Dark mode" : "Light mode"}
          </div>
        </div>

        {!collapsed && (
          <p className="text-sm opacity-70 drop-shadow">v1.0 • built with ♥</p>
        )}
      </FooterRow>
    </Aside>
  );
}
