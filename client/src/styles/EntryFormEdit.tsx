import styled from "styled-components";


export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  input, select {
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
        background: #6b7280; // muted gray for cancel
        color: white;
      }
    }
  }
`;