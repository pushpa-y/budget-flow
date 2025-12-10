import styled from "styled-components";
import Sidebar from "./Sidebar";
import HeaderBar from "./Headerbar";
import { useSidebar } from "../context/SidebarContext";

const LayoutWrapper = styled.div`
  display: flex;
`;

const MainContent = styled.div<{ $collapsed: boolean }>`
  margin-left: ${(p) => (p.$collapsed ? "96px" : "260px")};
  flex: 1;
  min-height: 100vh;
  background: ${(p) => p.theme.bg}; /* Use theme background */
  transition: margin-left 0.25s ease;
  @media (max-width: 768px) {
    margin-left: 70px;
  }
`;

const Inner = styled.div`
  padding: 25px;
`;

export default function Layout({ children }: { children: React.ReactNode }) {
  const { collapsed } = useSidebar();
  return (
    <LayoutWrapper>
      <Sidebar />
      <MainContent $collapsed={collapsed}>
        <HeaderBar />
        <Inner>{children}</Inner>
      </MainContent>
    </LayoutWrapper>
  );
}
