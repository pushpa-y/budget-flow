import styled from "styled-components";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  input,
  select {
    padding: 8px;
    border-radius: 8px;
    border: 1px solid ${(p) => p.theme.glassBorder};
    background: ${(p) => p.theme.surface};
    color: ${(p) => p.theme.text};
    outline: none;

    &::placeholder {
      color: ${(p) => p.theme.muted};
    }
  }

  /* ---------- Entry Type Buttons ---------- */
 .entry-type-buttons {
  display: flex;
  gap: 0.5rem;

  button {
    flex: 1;
    padding: 10px 0;
    border-radius: 8px;
    border: 1px solid ${(p) => p.theme.glassBorder};
    font-weight: 500;
    cursor: pointer;
    transition: 0.2s ease;

    /* Always visible colors */
    &.income {
      background: rgba(22, 163, 74, 0.2);
      color: #166534;
    }

    &.expense {
      background: rgba(220, 38, 38, 0.2);
      color: #7f1d1d;
    }

    &.transfer {
      background: rgba(37, 99, 235, 0.2);
      color: #1e3a8a;
    }

    /* Active = solid color */
    &.active.income {
      background: #16a34a;
      color: white;
    }

    &.active.expense {
      background: #dc2626;
      color: white;
    }

    &.active.transfer {
      background: #2563eb;
      color: white;
    }
  }
}


  .row {
    display: flex;
    gap: 0.5rem;
  }

  .actions {
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;

    button {
      padding: 8px 12px;
      border-radius: 8px;
      border: none;
      font-weight: 500;
      cursor: pointer;

      &.primary {
        background: ${(p) => p.theme.accent};
        color: white;
      }

      &.secondary {
        background: #6b7280;
        color: white;
      }
    }
  }
`;
