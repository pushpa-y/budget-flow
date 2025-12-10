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
    margin-top: 8px;
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

