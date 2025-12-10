import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalBox = styled.div`
  background: white;
  padding: 22px 26px;
  border-radius: 12px;
  width: 360px;
  text-align: center;
  box-shadow: 0 4px 16px rgba(0,0,0,0.2);

  h3 {
    margin-bottom: 8px;
    font-size: 18px;
  }
  p {
    color: #555;
    font-size: 14px;
    margin-bottom: 20px;
  }
`;

export const Buttons = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
`;

export const Cancel = styled.button`
  background: #e5e7eb;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;

  &:hover { background: #d1d5db; }
`;

export const Confirm = styled.button`
  background: #ef4444;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;

  &:hover { background: #dc2626; }
`;
