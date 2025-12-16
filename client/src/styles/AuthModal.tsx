import styled from "styled-components";
import onboarding_background from "../assets/onboarding_background.png";
import Authbg from "../assets/Authbg.png"
export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background-image: url(${Authbg});
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const Modal = styled.div`
  position: relative;
  width: 600px;
  height: 440px;
  background: #fff;
  border-radius: 12px;
  display: flex;
  overflow: hidden;
`;


export const Section = styled.div`
  flex: 1;
  padding: 100px 32px;
`;
export const BrandWrapper = styled.div`
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
`;
export const BrandTitle = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: #111827; /* near black */
`;

export const BrandSubtitle = styled.p`
  font-size: 13px;
  color: #6b7280; /* gray */
`;
export const Title = styled.h2`
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 16px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 12px;
  border-radius: 6px;
  border: 1px solid #d1d5db;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #2563eb;
  }
`;

export const Button = styled.button<{ variant?: "login" | "register" }>`
  width: 100%;
  padding: 10px;
  border-radius: 6px;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
  border: none;

  background: ${({ variant }) =>
    variant === "register" ? "#16a34a" : "#2563eb"};

  &:hover {
    opacity: 0.9;
  }
`;

export const Text = styled.p`
  font-size: 13px;
  color: #6b7280;
  margin-top: 10px;
`;
