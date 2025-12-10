import styled from "styled-components";

export const AccountsCard = styled.div`
  background: ${(p) => p.theme.cardBg || "white"};
  border-radius: 14px;
  padding: 18px 20px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  margin-bottom: 20px;
`;

export const AccountsWrapper = styled.div`
  padding: 16px;
  background: ${(p) => p.theme.cardBg || "rgba(255,255,255,0.1)"};
  display: grid;
  //grid-template-columns: repeat(3, 1fr);   /* ⬅️ 3 columns */
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));

  gap: 12px; /* spacing between items */

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr); /* Tablet */
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr; /* Mobile */
  }
`;

export const AccountItem = styled.div<{ $active: boolean }>`
  padding: 14px;
  position: relative;
  border-radius: 12px;
  background: ${(p) =>
    p.$active ? "rgba(99,102,241,0.15)" : "rgba(255,255,255,0.5)"};
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: 0.2s ease;

  &:hover {
    background: ${(p) =>
      p.$active ? "rgba(99,102,241,0.25)" : "rgba(255,255,255,0.8)"};
  }
`;

export const AddAccountButton = styled.button`
  padding: 10px;
  border-radius: 10px;
  background: #6366f1;
  color: white;
  border: none;
  cursor: pointer;
  margin-top: 6px;
  transition: 0.2s;

  &:hover {
    background: #4f46e5;
  }
`;
export const AllAccountsLink = styled.a`
  display: block;
  text-align: center;
  margin-top: 16px;
  cursor: pointer;
  font-size: 15px;
  font-weight: 500;
  color: "#6366f1";
  text-decoration: underline;

   &:hover {
    opacity: 0.8;
  }
`;

export const FloatingAddButton = styled.button`
  position: fixed;
  right: 32px;
  bottom: 32px;
  background: #6366f1;
  width: 65px;
  height: 65px;
  border-radius: 50%;
  border: none;
  color: white;
  font-size: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
  cursor: pointer;
  transition: 0.25s ease;

  &:hover {
    transform: scale(1.08);
    background: #4f46e5;
  }
`;

export const DotsWrapper = styled.div`
  padding: 4px 8px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 20px;
  user-select: none;
  margin-left: 8px;

  &:hover {
    background: rgba(0, 0, 0, 0.08);
  }
`;

export const AccountMenu = styled.div`
  position: absolute;
  top: 46px;
  right: 14px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  padding: 8px 0;
  width: 150px;
  z-index: 999;
`;

export const MenuItem = styled.div`
  padding: 10px 14px;
  font-size: 14px;
  cursor: pointer;
  transition: 0.15s;

  &:hover {
    background: #f3f4f6;
  }
`;
