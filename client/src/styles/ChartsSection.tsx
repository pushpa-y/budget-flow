import styled from "styled-components";
import { motion } from "framer-motion";

export const ChartCard = styled(motion.div)`
  background: ${({ theme }) => theme.cardBg || "white"};
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  gap: 12px;
  min-height: 360px;

  transition: 0.25s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
  }
`;

export const ChartsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 24px;
  margin-bottom: 20px;
`;

export const MonthSelector = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
`;

export const MonthButton = styled.button<{ $active: boolean }>`
  padding: 8px 18px;
  border-radius: 999px;
  border: none;
  cursor: pointer;
  font-size: 14px;

  background: ${({ $active }) =>
    $active ? "#6366f1" : "rgba(0,0,0,0.06)"};
  color: ${({ $active }) => ($active ? "white" : "#333")};

  transition: all 0.2s ease;

  &:hover {
    background: ${({ $active }) =>
      $active ? "#4f46e5" : "rgba(0,0,0,0.1)"};
  }
`;
export const ChartTitle = styled.h3`
  font-size: 15px;
  font-weight: 600;
  color: #111827;
  margin-bottom: 4px;
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #6b7280;
  font-size: 16px;
`;
