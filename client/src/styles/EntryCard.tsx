import styled from "styled-components";
import { motion } from "framer-motion";

export const Card = styled(motion.div)`
  padding: 16px;
  border-radius: 12px;
  cursor: pointer;
  margin-bottom: 12px;
  display: block;
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  .muted {
    color: #6b7280;
    font-size: 13px;
  }

  .bold {
    font-weight: 600;
  }
`;

export const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const RightColumn = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
`;

export const CategoryRow = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const AmountDate = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 2px;

  .amount.income {
    color: #16a34a;
  }

  .amount.expense {
    color: #dc2626;
  }

  .amount.other {
    color: #2563eb;
  }
`;

export const MenuButtonWrapper = styled.div`
  position: relative;

  button {
    background: transparent;
    border: none;
    cursor: pointer;
    font-size: 20px;
  }

  .menu {
    position: absolute;
    top: 120%;
    right: 0;
    background: white;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.2);
    border-radius: 8px;
    padding: 8px 0;
    z-index: 100;
    min-width: 120px;

    div {
      padding: 8px 12px;
      cursor: pointer;
    }

    .delete {
      color: red;
    }
  }
`;
