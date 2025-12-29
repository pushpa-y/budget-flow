import styled from "styled-components";
import formbg from "../assets/formbg.png";

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(8px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const Modal = styled.div`
 position: relative;
  width: 760px;
  height: 460px;
  background: #fff;
  border-radius: 16px;
  display: flex;
  overflow: hidden;
`;

export const ImageSection = styled.div`
  flex: 1;
  flexshrink: 0;
  background-image: url(${formbg});
  background-size: cover;
  background-position: center;
`;

export const FormSection = styled.div`
  flex: 1;
  padding: 48px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const BrandTitle = styled.h1`
  font-size: 26px;
  font-weight: 700;
  margin-bottom: 6px;
`;

export const BrandSubtitle = styled.p`
  font-size: 14px;
  color: #6b7280;
  margin-bottom: 24px;
`;

export const Title = styled.h2`
  font-size: 18px;
  margin-bottom: 16px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px 12px;
  margin-bottom: 12px;
  border-radius: 8px;
  border: 1px solid #d1d5db;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #6366f1;
  }
`;

export const Button = styled.button`
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  border: none;
  font-weight: 600;
  background: #6366f1;
  color: white;
  cursor: pointer;
  margin-top: 8px;

  &:hover {
    opacity: 0.9;
  }
`;

export const SwitchText = styled.p`
  margin-top: 16px;
  font-size: 13px;
  color: #6b7280;
  text-align: center;

  span {
    color: #6366f1;
    font-weight: 600;
    cursor: pointer;
  }
`;
export const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: transparent;
  border: none;
  font-size: 22px;
  font-weight: 500;
  color: black;
  cursor: pointer;

  &:hover {
    color: #111827;
  }
`;
