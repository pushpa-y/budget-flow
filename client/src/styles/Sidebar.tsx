import styled from "styled-components";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

export const Aside = styled(motion.aside)<{ $collapsed: boolean }>`
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: ${(p) => (p.$collapsed ? "96px" : "260px")};
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 18px;
  z-index: 40;
  box-sizing: border-box;
`;

export const BrandRow = styled.div<{ $collapsed: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  height: 48px;
  .brand {
    width: 18px;
    height: 18px;
    border-radius: 5px;
    background: linear-gradient(135deg, #6366f1, #10b981);
  }
  .brandLabel {
    opacity: ${(p) => (p.$collapsed ? 0 : 1)};
    transition: opacity 0.22s ease;
    white-space: nowrap;
    font-weight: 700;
  }
`;

export const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 8px;
`;

export const NavItem = styled(NavLink)<{ $collapsed: boolean }>`
  display: flex;
  align-items: center;
  padding: 10px 12px;
  border-radius: 10px;
  text-decoration: none;
  color: inherit;
  height: 48px;
  box-sizing: border-box;
  gap: 12px;

  .label {
    display: inline-block;
    white-space: nowrap;
    overflow: hidden;
    width: ${(p) => (p.$collapsed ? "0px" : "160px")};
    opacity: ${(p) => (p.$collapsed ? 0 : 1)};
    transform: ${(p) => (p.$collapsed ? "translateX(-6px)" : "translateX(0)")};
    transition: opacity 0.22s ease, width 0.22s ease, transform 0.22s ease;
    font-size: 14px;
  }

  &.active {
    font-weight: 600;
  }
`;

/* Footer area */
export const FooterRow = styled.div<{ $collapsed: boolean }>`
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-bottom: 16px;

  .theme {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 12px;
    border-radius: 10px;
    cursor: pointer;
    height: 44px;
    box-sizing: border-box;

    .label {
      width: ${(p) => (p.$collapsed ? "0px" : "140px")};
      opacity: ${(p) => (p.$collapsed ? 0 : 1)};
      overflow: hidden;
      transition: opacity 0.22s ease, width 0.22s ease;
      white-space: nowrap;
      font-size: 13px;
    }
  }

  .version {
    text-align: center;
    color: rgba(255, 255, 255, 0.5);
    font-size: 12px;
  }
`;
