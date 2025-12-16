import styled from "styled-components";
import { FiMenu } from "react-icons/fi";
import { useSidebar } from "../context/SidebarContext";
import { useLocation } from "react-router-dom";

const Header = styled.header`
  height: 64px;
  display: flex;
  align-items: center;
  padding: 0 20px;
`;
const Title = styled.h3`
  margin: 0;
  padding-left: 30px;
  color: ${(p) => p.theme.text};
`;

export default function HeaderBar() {
  const { collapsed, setCollapsed } = useSidebar();
  const location = useLocation();

  const getTitle = () => {
  if (location.pathname.startsWith("/accounts")) return "Accounts";
  if (location.pathname.startsWith("/dashboard")) return "Overview";
  return "Overview"; // fallback
};

  return (
    <Header>
      <button
        onClick={() => setCollapsed(c => !c)}
        style={{
          background: "transparent",
          border: "none",
          color: "inherit",
          cursor: "pointer",
        }}
      >
        <FiMenu size={18} />
      </button>
      <Title>{getTitle()}</Title>
    </Header>
  );
}
