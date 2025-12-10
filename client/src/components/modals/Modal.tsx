import React from "react";
import { Overlay, Content, CloseButton } from "../../styles/Modal";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <Overlay>
      <Content>
        <CloseButton onClick={onClose}>✕</CloseButton>
        {children}
      </Content>
    </Overlay>
  );
};

export default Modal;
