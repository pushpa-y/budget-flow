import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import HeaderBar from "../components/Headerbar";
import styled from "styled-components";
import { useSidebar } from "../context/SidebarContext";

const LayoutWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: ${(p) => p.theme.bg};
`;

const Main = styled.div<{ $collapsed: boolean }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  transition: margin-left 0.25s ease;
  margin-left: ${(p) => (p.$collapsed ? "96px" : "260px")};
`;

const Content = styled.div`
  flex: 1;
  padding: 24px;
  overflow-y: auto;
  background: ${(p) => p.theme.bg};
`;

/* ---------- Component ---------- */

export default function AppLayout() {
  const { collapsed } = useSidebar();

  return (
    <LayoutWrapper>
      <Sidebar />

      <Main $collapsed={collapsed}>
        <HeaderBar />

        <Content>
          <Outlet />
        </Content>
      </Main>
    </LayoutWrapper>
  );
}
