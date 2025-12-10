import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 50;
`;

export const Content = styled.div`
  background: ${(p) => p.theme.surface}; // use theme surface
  color: ${(p) => p.theme.text};         // use theme text
  padding: 24px;
  border-radius: 12px;
  box-shadow: ${(p) => p.theme.cardShadow};
  width: 90%;
  max-width: 640px;
  position: relative;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  color: ${(p) => p.theme.muted};
  background: transparent;
  border: none;
  font-size: 18px;
  cursor: pointer;

  &:hover {
    color: ${(p) => p.theme.text};
  }
`;
